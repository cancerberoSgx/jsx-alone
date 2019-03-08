import { Classification } from './monaco/extractCodeDecorations';
import { JsonImplOutputEl } from 'jsx-alone-core';
import { dispatch } from './main';

export interface CodeWorkerResponse {
  version: number
  jsxSyntaxHighLight: {
    classifications: Classification[]
  },
  evaluate: {
    result?: JsonImplOutputEl
    error?: CodeWorkerError
    evaluated: string
  },
  jsxAst: CodeWorkerResponseJsxAst 
}

export interface CodeWorkerResponseJsxAst{
  diagnostics: CodeWorkerResponseJsxAstDiagnostic[]
  ast: CodeWorkerResponseJsxAsNode
}

export interface CodeWorkerRequest {
  code: string,
  title: string,
  version: number
  jsxAst?: CodeWorkerRequestJsxAst
}

export interface CodeWorkerRequestJsxAst{
  showDiagnostics?: boolean
  mode?: 'forEachChild'|'getChildren'
  nodeTextLength?: number
}

export interface CodeWorkerResponseJsxAsNode {
  type: string
  text: string
  kind: string
  children: CodeWorkerResponseJsxAsNode[]
}

export type CodeWorkerResponseJsxAstDiagnostic = {
  message: string
  lineNumber: number | undefined;
  start: number | undefined;
 length: number | undefined;
  // category: DiagnosticCategory;
code: number;
  // source: string|undefined
}

export type CodeWorkerError= {
  message: string
  stack?: string
  name: string 
}

export type CodeWorkerListener = (e: { data: CodeWorkerResponse }) => void

const listeners: CodeWorkerListener[] = []

export function registerWorkerListener(l: CodeWorkerListener) {
  listeners.push(l)
}

export function getWorkerListeners() {
  return listeners
}

let codeWorker: Worker

export function installCodeWWorker() {
  codeWorker = new Worker('./codeWorker.ts')
  // codeWorker.addEventListener('message', codeWorkerListener)
  getWorkerListeners().forEach(l => codeWorker.addEventListener('message', l))
}

export function postMessage(m: CodeWorkerRequest){
  codeWorker.postMessage(m)
}

function codeWorkerListener({ data }: { data: CodeWorkerResponse }) {
  dispatch({type: 'CHANGE_COMPILED', compiled: data})
}

registerWorkerListener(codeWorkerListener)