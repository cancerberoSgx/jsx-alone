import { JsonImplOutputEl } from 'jsx-alone-core';
import Project, { Node as tsNode, ts } from 'ts-simple-ast';
import { CodeWorkerError, CodeWorkerRequest, CodeWorkerRequestJsxAst, CodeWorkerResponse, CodeWorkerResponseJsxAst, CodeWorkerResponseJsxAstDiagnostic, Node } from './codeWorkerManager';
import { extractCodeDecorations } from './monaco/extractCodeDecorations';
import { evaluate } from './util/evaluate';
import { createProject, getChildrenForEachChild } from './util/ts-simple-ast';

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
  let error: CodeWorkerError | undefined;
  let result: JsonImplOutputEl | undefined;
  try {
    result = evaluate(data.code);
    error = undefined;
  }
  catch (ex) {
    error = {message: ex.message||ex+'', stack: ex.stack, evaluated: ex.evaluated, name: ex.name||ex+''}
  }
  return { error, result };
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
  // const ast = buildJsxAstNode(f, config)
  // const diagnostics = config.showDiagnostics ? buildJsxAstDiagnostics(project) : []

  return {
    ast: {type: 'asd', text: 'as', children: [], kind: 'asd'},
    diagnostics: []
  }
}

function buildJsxAstNode(n: tsNode, config: CodeWorkerRequestJsxAst): Node {
  let text = n.getText().trim()
  const children = config.mode === 'forEachChild' ? getChildrenForEachChild(n) : n.getChildren()

  text = text.substring(0, Math.max(config.nodeTextLength || 20, text.length))
  const node: Node = {
    kind: n.getKindName(),
    type: n.getType().getApparentType().getText(),
    text,
    children: children.map(c => buildJsxAstNode(c, config))
  }
  return node
}