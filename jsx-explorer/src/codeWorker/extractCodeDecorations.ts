// adapted from https://github.com/CompuIves/codesandbox-client/blob/196301c919dd032dccc08cbeb48cf8722eadd36b/packages/app/src/app/components/CodeEditor/Monaco/workers/syntax-highlighter.js

import Project, { SourceFile, TypeChecker, createWrappedNode, Node, TypeGuards, Type } from 'ts-simple-ast'
import { lastRequest } from './codeWorker'
import { CodeWorkerRequest } from '../store/types'
import { buildBaseKind, buildBaseKindOfNode, ParentShipKind, buildParentShipKind } from './typeStructure';
import { tryTo } from '../util/util';

type Modifier = string//'readonly'

export interface Classification {
  start: number
  // modifiers?: Modifier[]
  end: number
  kind: string
  parentKind?: string
  type?: ParentShipKind
  startLine: number
  endLine: number
  // nodeType?: string
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
  const lines = sourceFile.getFullText().split('\n').map(line => line.length)
  addChildNodes(sourceFile, lines, classifications, sourceFile, project)
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

function nodeToRange(node: Node) {
  if (
    typeof node.getStart === 'function' &&
    typeof node.getEnd === 'function'
  ) {
    return [node.getStart(), node.getEnd()]
  }
  else if (
    typeof node.getPos() !== 'undefined' &&
    typeof node.getEnd() !== 'undefined'
  ) {
    return [node.getPos(), node.getEnd()]
  }
  return [0, 0]
}

function getNodeType(parent: Node, node: Node) {
  return Object.keys(parent.compilerNode).find(key => (parent.compilerNode as any)[key] === node.compilerNode)
}

function getParentRanges(node: Node) {
  const ranges = []
  const [start, end] = nodeToRange(node)
  let lastEnd = start
  node.forEachChild(child => {
    // ts.forEachChild(node, child => {
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

function filterNonJsxRelatedNodes(n: Node) {
  // this is faster - we just dont want syntax list since they pollute a lot the JSX. 
  return n.getKindName()!=='SyntaxList'

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

function addChildNodes(node: Node, lines: number[], classifications: Classification[], sourceFile: SourceFile, project: Project) {

  node.getDescendants()
    .filter(filterNonJsxRelatedNodes)
    .forEach(id => {
      const parent = id.getParent()
      const parentKind = parent && parent.getKindName()
      // const nodeType = [...buildBaseKind({node,project}), ...[]]
      // const modifiers: string[] = []//TypeGuards.isModifierableNode(id) && id.getModifiers().map(m=>m.getText()) || []

      // const type2 = id.getParent() && getNodeType(id.getParent(), id)
      const type = tryTo(() => buildParentShipKind({ node: id, project })[0]) || undefined
      classifications.push(
        ...getParentRanges(id)
          .map(({ start, end }) => {
            const { offset, line: startLine } = getLineNumberAndOffset(
              start,
              lines
            )
            const { line: endLine } = getLineNumberAndOffset(end, lines)
            return {
              start: start + 1 - offset,
              end: end + 1 - offset,
              startLine,
              endLine,
              // modifiers,
              kind: id.getKindName(),
              parentKind,
              type,
              // text: id.getText(),
              // nodeType,
            }
          })
      )
    })
}
