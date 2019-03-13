import Project, { ts, SourceFile, TypeChecker, createWrappedNode, Node, TypeGuards } from 'ts-simple-ast'
import { lastRequest } from './codeWorker'
import { CodeWorkerRequest } from '../store/types'

type Modifier = string//'readonly'
type Type = string//'name'|'type'

export interface Classification {
  start: number
  modifiers?: Modifier[]
  end: number
  kind: string
  parentKind: string
  type?: Type
  startLine: number
  endLine: number
  nodeType?: string
}

let classifications: Classification[] = []

export function extractCodeDecorations(data: CodeWorkerRequest, sourceFile: SourceFile, project: Project ) {
  if (lastRequest && data.code === lastRequest.code) {
    return classifications
  }
  classifications = []
  // const sourceFile = sf && !sf.wasForgotten() ? sf  : 
  // jsxAstLastSourceFile && !jsxAstLastSourceFile.wasForgotten() ? jsxAstLastSourceFile.compilerNode :
  
  // tsAstSourceFile.compilerNode
  
  //  && jsxAstLastSourceFile.compilerNode
  //   ? jsxAstLastSourceFile.compilerNode 
    
     
  //   // && tsAstSourceFile.compilerNode 
  //   // ? tsAstSourceFile.compilerNode : 
    // undefined
  
  if(!sourceFile){
    throw `extractCodeDecorations now needs a tsa sourceFile`
  }
  // ts.createSourceFile(data.title, data.code, ts.ScriptTarget.ES2016, true)

  const lines = sourceFile.getFullText().split('\n').map(line => line.length)
  addChildNodes(sourceFile, lines, classifications, sourceFile)
  return classifications
}

function getLineNumberAndOffset(start: number, lines: number[]) {
  let line = 0
  let offset = 0
  while (offset + lines[line] < start) {
    offset += lines[line] + 1
    line += 1
  }
  return { line: line + 1, offset }
}

function nodeToRange(node: ts.Node) {
  if (
    typeof node.getStart === 'function' &&
    typeof node.getEnd === 'function'
  ) {
    return [node.getStart(), node.getEnd()]
  }
  else if (
    typeof node.pos !== 'undefined' &&
    typeof node.end !== 'undefined'
  ) {
    return [node.pos, node.end]
  }
  return [0, 0]
}

function getNodeType(parent: any, node: ts.Node) {
  return Object.keys(parent).find(key => parent[key] === node)
}

function getParentRanges(node: ts.Node) {
  const ranges = []
  const [start, end] = nodeToRange(node)
  let lastEnd = start
  ts.forEachChild(node, child => {
    const [start, end] = nodeToRange(child)
    ranges.push({
      start: lastEnd,
      end: start
    })
    lastEnd = end
  })
  if (lastEnd !== end) {  
    ranges.push({
      start: lastEnd,
      end
    })
  }
  return ranges
}

function jsxRelatedDescendants(n: Node){
  if(n.getKindName()!.toLowerCase().includes('jsx')){
    return true
  }
  const parentK = n.getParent()&&n.getParent()!.getKindName()
  return parentK && parentK.toLowerCase().includes('jsx')
}
function addChildNodes(node: Node, lines: number[], classifications: Classification[], f?: SourceFile ) {
  const parentKind = node.getKindName()

// console.log('name1sssss: ' + f!.getDescendants().filter(e=>e.getKindName()!.toLowerCase().includes('jsx')).map(e=>e.getType().getText() + ' - '+e.getKindName()))

node.getDescendants()
.filter(jsxRelatedDescendants)
.forEach(id=>{

// })
  // node.forEachDescendant(id=>{

  // })
  // node.forEachChild(id=> {

  const nodeType = id.getType().getText()
    const cid = id.compilerNode
    const modifiers = cid.modifiers ? cid.modifiers.map(n=>n.getText()) : [] as any

  // }
  // ts.forEachChild(node, id => {
    const type = getNodeType(node, cid)
    // const nodeType = getType(tc, id, f) 

    classifications.push(
      ...getParentRanges(cid)
      .map(({ start, end }) => {
        const { offset, line: startLine } = getLineNumberAndOffset(
          start,
          lines
        )
        const { line: endLine } = getLineNumberAndOffset(end, lines)
        return {
          start: start + 1 - offset,
          end: end + 1 - offset,
          modifiers,
          kind: id.getKindName(),
          parentKind, 
          type: type as any,
          // text: id.getText(),
          nodeType,
          startLine,
          endLine
        }
      })
    )
    // addChildNodes(id, lines, classifications)
  })
}
// }
// function getType(tc: TypeChecker | undefined, id: Node, f?: SourceFile) : string|undefined{

//   // if(tc){
    
//     // given an existing node and type checker
//     // const classNode: ts.ClassDeclaration = ...;
//     // const compilerTypeChecker: ts.TypeChecker = ...;
    
//     // create and use a wrapped node
//     // const n = createWrappedNode(id, { typeChecker: tc.compilerObject })
//     // n.getDescendants()
//     // n.getAncestors()
//     return id.getType().getText()
//     // Node
    
//     // console.log(classDec.getPropertyOrThrow("propName").getType().getText()); // ok, because a type checker was provided

// //     // const n = id as any
// // //     let symbol = tc.compilerObject.getSymbolAtLocation(id) ||tc.compilerObject.getSymbolAtLocation((id as any).name)

// // // let type = symbol && tc.compilerObject.typeToString(tc.compilerObject.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
// // // return type

// //   const nodeType = tc ? tc.compilerObject!.typeToString(tc.compilerObject.getTypeAtLocation(id)) : undefined

// //   return nodeType

// // }

// // function getttt(n: any) {}

// // let details = serializeSymbol(symbol);

//         // };

 
//   // const nodeType = tc ? tc.compilerObject!.typeToString(tc.compilerObject.getTypeAtLocation(id)) : undefined
//   // let nodeType = tc ? tc.compilerObject.typeToString(tc.compilerObject.getApparentType(tc.compilerObject.getTypeAtLocation(id))) : undefined 
// // if(!nodeType){
// //   nodeType = tc ? tc.compilerObject.typeToString(
// //     tc.compilerObject.getApparentType(id.s)
// //     // tc.compilerObject.getTypeAtLocation(id.parent)
// //     )) : undefined 
// // }
//   // return nodeType
// }

