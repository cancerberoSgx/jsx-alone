
import Project, { Node as tsNode, ts, SourceFile } from 'ts-simple-ast'
import { CodeWorkerRequest, CodeWorkerRequestJsxAst, CodeWorkerResponseJsxAsNode, CodeWorkerResponseJsxAst, CodeWorkerResponseJsxAstDiagnostic } from '../store/types'
import { createProject, getChildrenForEachChild } from './ts-simple-ast'
import { lastRequest } from './codeWorker'

export let jsxAstLastResult: CodeWorkerResponseJsxAst
export let jsxAstLastSourceFile: SourceFile

export function doJSXAst(data: CodeWorkerRequest): CodeWorkerResponseJsxAst {
  if (lastRequest && data.code === lastRequest.code && JSON.stringify(data.jsxAst || {}) === JSON.stringify(lastRequest.jsxAst || {})) {
    return jsxAstLastResult
  }
  const project = createProject([{
    fileName: 't1.tsx',
    content: data.code
  }])
  const config = data.jsxAst || {}
  const sourceFile = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
  const ast = buildJsxAstNode(sourceFile, config)
  const diagnostics = config.showDiagnostics ? buildJsxAstDiagnostics(project) : []
  jsxAstLastResult = { ast, diagnostics, config: data.jsxAst } as any
  jsxAstLastSourceFile = sourceFile
  return jsxAstLastResult
}

function buildJsxAstDiagnostics(project: Project): CodeWorkerResponseJsxAstDiagnostic[] {
  const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
  return f.getPreEmitDiagnostics().map(tsd => {
    const d: CodeWorkerResponseJsxAstDiagnostic = {
      message: ts.flattenDiagnosticMessageText(tsd.compilerObject.messageText, '\n'),
      code: tsd.getCode(),
      length: tsd.getLength(),
      lineNumber: tsd.getLineNumber(),
      start: tsd.getStart(),
      startColumn: ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()!).character + 1,
      startLineNumber: ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()!).line + 1,
      endColumn: ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()! + tsd.getLength()!).character + 1,
      endLineNumber: ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()! + tsd.getLength()!).line + 1
    }
    return d
  })
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
