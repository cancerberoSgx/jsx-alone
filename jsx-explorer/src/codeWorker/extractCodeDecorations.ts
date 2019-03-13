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

node.getDescendants()
// .filter(jsxRelatedDescendants)
.forEach(id=>{

  const nodeType = id.getType().getText()
    const cid = id.compilerNode
    const modifiers = TypeGuards.isModifierableNode(id) && id.getModifiers().map(m=>m.getText()) || []
    // id.modicid.modifiers ? cid.modifiers.map(n=>n.getText()) : []

    const type = getNodeType(node, cid)

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
          type,
          // text: id.getText(),
          nodeType,
          startLine,
          endLine
        }
      })
    )
  })
}
