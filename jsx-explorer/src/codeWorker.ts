import { JsonImplOutputEl } from 'jsx-alone-core';
import Project, { Node as tsNode, ts , TypeGuards} from 'ts-simple-ast';
import { CodeWorkerError, CodeWorkerRequest, CodeWorkerRequestJsxAst, CodeWorkerResponse, CodeWorkerResponseJsxAst, CodeWorkerResponseJsxAstDiagnostic, CodeWorkerResponseJsxAsNode } from './codeWorkerManager';
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
  // let error: CodeWorkerError | undefined;
  // let result: JsonImplOutputEl | undefined;
  // try {
    const {result, error, evaluated} = evaluate(data.code);
  //   error = undefined;
  // }
  // catch (ex) {
  //   error = {message: ex.message||ex+'', stack: ex.stack, evaluated: ex.evaluated, name: ex.name||ex+''}
  // }
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
  // return {
  //   ast: {type: 'asd', text: 'as', children: [], kind: 'asd'},
  //   diagnostics: []
  // }
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