// adapted from https://github.com/CompuIves/codesandbox-client/blob/196301c919dd032dccc08cbeb48cf8722eadd36b/packages/app/src/app/components/CodeEditor/Monaco/workers/syntax-highlighter.js

import Project, { SourceFile, TypeChecker, createWrappedNode, Node, TypeGuards, Type, ts } from 'ts-simple-ast'
import { lastRequest } from './codeWorker'
import { CodeWorkerRequest } from '../store/types'
import { buildBaseKind, buildBaseKindOfNode, ParentShipKind, buildParentShipKind } from './typeStructure';
import { tryTo } from '../util/util';

type Modifier = string//'readonly'

export interface Classification {
  startColumn: number
  startLineNumber: number
  endLineNumber: number
  // modifiers?: Modifier[]
  endColumn: number
  kind: string
  parentKind?: string
  // type?: ParentShipKind
  // nodeType?: string
  extra?: string[],
}

let classifications: Classification[] = []

export function extractCodeDecorations(data: CodeWorkerRequest, sourceFile: SourceFile, project: Project) {
  if (lastRequest && data.code === lastRequest.code) {
    return classifications
  }
  classifications = []

  if (!sourceFile) {
    throw `extractCodeDecorations now needs a tsa sourceFile`
  }
  addChildNodes(sourceFile, classifications, sourceFile, project)
  return classifications
}


function filterNonJsxRelatedNodes(n: Node) {
  // this is faster - we just dont want syntax list since they pollute a lot the JSX. 
  return n.getKindName() !== 'SyntaxList'

  // But these are other more elegant ways:

  // // only pass those with ancestors or with first-level children which are JSX :
  // if (n.getKindName()!.toLowerCase().includes('jsx')) {
  //   return true
  // }
  // else if(n.getFirstAncestor(a=>a.getKindName()!.toLowerCase().includes('jsx'))){
  //   return true
  // }
  // else {
  //   return n.getFirstChild(a=>a.getKindName()!.toLowerCase().includes('jsx')))
  // }

}

function addChildNodes(node: Node, classifications: Classification[], sourceFile: SourceFile, project: Project) {
  const lines = sourceFile.getFullText().split('\n').map(line => line.length)
  node.getDescendants()
    .filter(filterNonJsxRelatedNodes)
    .forEach(node => {
      const parent = node.getParent()
      const parentKind = parent && parent.getKindName()
      // const type = tryTo(() => buildParentShipKind({ node: node, project })[0]) || undefined
      const kind = node.getKindName()
      const extra = getExtra(node)
      getNodeRangesForMonaco(node, lines).forEach(r => {
        classifications.push(
          {
            ...r,
            kind,
            parentKind,
            // type,
            extra,
          }
        )
      })
    })
}

function getExtra(node: Node) {
  const extras = []
  if (TypeGuards.isJsxTagNamedNode(node)) {
    extras.push(node.getTagNameNode().getText().match(/^[a-z]/) ? 'JSXIntrinsicElement' : 'JSXNonIntrinsicElement')
  }
  const parent = node.getParent()
  if (parent && TypeGuards.isJsxTagNamedNode(parent)) {
    extras.push(parent.getTagNameNode().getText().match(/^[a-z]/) ? 'JSXIntrinsicElementChild' : 'JSXNonIntrinsicElementChild')
  }
  return extras.length ? extras : undefined
}

function getNodeRangesForMonaco(node: Node, lines: number[]) {
  return getParentRanges(node)
    .map(({ start, end }) => {
      const { offset, line: startLineNumber } = getLineNumberAndOffset(start, lines, node)
      const { line: endLineNumber } = getLineNumberAndOffset(end, lines, node)
      return {
        startLineNumber,
        // Heads up : following sum fixes an error of original implementation when JSXText has multiple lines:
        endLineNumber: endLineNumber + (TypeGuards.isJsxText(node) && node.getText().includes('\n') ? -1 : 0),
        startColumn: start + 1 - offset,
        endColumn: end + 1 - offset,
      }
    })
}
function getLineNumberAndOffset(start: number, lines: number[], node: Node) {
  let line = 0
  let offset = 0
  while (offset + lines[line] < start) {
    offset += lines[line] + 1
    line += 1
  }
  return { line: line + 1, offset }
}
function getParentRanges(node: Node) {
  const ranges = []
  const [start, end] = [node.getStart(), node.getEnd()]
  let lastEnd = start
  node.forEachChild(child => {
    const [start, end] = [child.getStart(), child.getEnd()]
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



// function getNodeRangeForMonaco(node: Node, lines: number[]){
//   return {
//     startColumn: node.getStartLinePos()+1,//  n.getst ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getStart()).character + 1,
//     startLineNumber: node.getStartLineNumber()+1,
//     endColumn: ts.getLineAndCharacterOfPosition(node.getSourceFile().compilerNode, node.compilerNode.getEnd()).character + 1,
//     endLineNumber: node.getEndLineNumber()+1////ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getEnd()).line + 1,
//   }
// }
// function getNodeRangesForMonaco2(node: Node, lines: number[]){
//   return [getNodeRangeForMonaco(node, lines)]
//   // const ranges:any[] = []
//   // node.forEachChild(child=>{
//   //   ranges.push(getNodeRangeForMonaco(child, lines))
//   // })
//   // return ranges
// }