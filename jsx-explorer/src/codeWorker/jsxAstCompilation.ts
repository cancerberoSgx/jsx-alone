// adapted from https://github.com/CompuIves/codesandbox-client/blob/196301c919dd032dccc08cbeb48cf8722eadd36b/packages/app/src/app/components/CodeEditor/Monaco/workers/syntax-highlighter.js

import Project, { Node as tsNode, ts } from 'ts-simple-ast'
import { CodeWorkerRequest, CodeWorkerRequestJsxAst, CodeWorkerResponseJsxAsNode, CodeWorkerResponseJsxAst, CodeWorkerResponseJsxAstDiagnostic } from '../store/types'
import { createProject, getChildrenForEachChild } from './ts-simple-ast'

function buildJsxAstDiagnostics(project: Project): CodeWorkerResponseJsxAstDiagnostic[] {
  const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
  return f.getPreEmitDiagnostics().map(tsd => {
    const d: CodeWorkerResponseJsxAstDiagnostic = {
      message: ts.flattenDiagnosticMessageText(tsd.compilerObject.messageText, '\n'),
      code: tsd.getCode(),
      length: tsd.getLength(),
      lineNumber: tsd.getLineNumber(),
      start: tsd.getStart()
    }
    return d
  })
}

export function doJSXAst(data: CodeWorkerRequest): CodeWorkerResponseJsxAst {
  const project = createProject([{
    fileName: 't1.tsx',
    content: data.code
  }])
  const config = data.jsxAst || {}
  const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
  const ast = buildJsxAstNode(f, config)
  const diagnostics = config.showDiagnostics ? buildJsxAstDiagnostics(project) : []
  return { ast, diagnostics }
}

function buildJsxAstNode(n: tsNode, config: CodeWorkerRequestJsxAst): CodeWorkerResponseJsxAsNode {
  let text = n.getText().trim()
  const children = config.mode === 'forEachChild' ? getChildrenForEachChild(n) : n.getChildren()
  text = text.substring(0, Math.max(config.nodeTextLength || 20, text.length))
  const node: CodeWorkerResponseJsxAsNode = {
    kind: n.getKindName(),
    type: 'TODO',
    text,
    start: n.getStart(),
    end: n.getEnd(),
    startColumn: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getStart()).character + 1,
    startLineNumber: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getStart()).line + 1,
    endColumn: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getEnd()).character + 1,
    endLineNumber: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getEnd()).line + 1,
    children: children.map(c => buildJsxAstNode(c, config))
  }
  return node
}
