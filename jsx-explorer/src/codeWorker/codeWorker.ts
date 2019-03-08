import Project, { Node as tsNode, ts } from 'ts-simple-ast';
import { CodeWorkerRequest, CodeWorkerRequestJsxAst, CodeWorkerResponse, CodeWorkerResponseJsxAsNode, CodeWorkerResponseJsxAst, CodeWorkerResponseJsxAstDiagnostic } from '../store/types';
import { evaluate } from './evaluate';
import { extractCodeDecorations } from './extractCodeDecorations';
import { createProject, getChildrenForEachChild } from './ts-simple-ast';

self.addEventListener('message', ({ data }: { data: CodeWorkerRequest }) => {
  const m: CodeWorkerResponse = {
    version: data.version,
    jsxSyntaxHighLight: {
      classifications: extractCodeDecorations(data.code, data.title),
    },
    evaluate: doEvaluate(data),
    jsxAst: doJSXAst(data)
  }
  //@ts-ignore
  self.postMessage(m)
})

function doEvaluate(data: CodeWorkerRequest) {
    const {result, error, evaluated} = evaluate(data.code);
  return { error, result, evaluated };
}

function buildJsxAstDiagnostics(project: Project): CodeWorkerResponseJsxAstDiagnostic[] {
  return project.getPreEmitDiagnostics().map(tsd => {
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

function doJSXAst(data: CodeWorkerRequest): CodeWorkerResponseJsxAst {
  const project = createProject([{
    fileName: 't1.tsx',
    content: data.code
  }])
  const config = data.jsxAst || {}
  const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
  const ast = buildJsxAstNode(f, config)
  const diagnostics = config.showDiagnostics ? buildJsxAstDiagnostics(project) : []
  return {ast, diagnostics}
}

function buildJsxAstNode(n: tsNode, config: CodeWorkerRequestJsxAst): CodeWorkerResponseJsxAsNode {
  let text = n.getText().trim()
  const children = config.mode === 'forEachChild' ? getChildrenForEachChild(n) : n.getChildren()

  text = text.substring(0, Math.max(config.nodeTextLength || 20, text.length))
  const node: CodeWorkerResponseJsxAsNode = {
    kind: n.getKindName(),
    type: 'TODO', //ypeGuards.isSourceFile(n) ? 'SourceFile' : n.getType().getApparentType().getText(),
    text,
    start: n.getStart(),
    end: n.getEnd(),
    startColumn: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getStart()).character+1,
    startLineNumber: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getStart()).line +1,
    endColumn: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getEnd()).character + 1,
    endLineNumber: ts.getLineAndCharacterOfPosition(n.getSourceFile().compilerNode, n.compilerNode.getEnd()).line + 1,

    children: children.map(c => buildJsxAstNode(c, config))
  }
  return node
}