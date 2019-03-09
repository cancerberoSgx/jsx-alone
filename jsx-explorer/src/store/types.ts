
import { AllActions } from './store';

export interface State {
  readonly layout: Layout
  readonly editor: Editor
  readonly compiled: Compiled
  readonly options: Options
}

export interface Options {
  readonly logs: string[]
  readonly autoApply: boolean
  
}

export interface Layout {
  readonly theme: Theme
}

export interface Editor {
  readonly code: string
  readonly version: number
}

export interface Theme {
  readonly name: string,
  readonly colors: {
    readonly bg: Color
    readonly fg: Color
    readonly brand: Color
  }
}

type Color = string

export interface Compiled{
  response?: CodeWorkerResponse
  request?: CodeWorkerRequest

  jsxAstOptions: CodeWorkerRequestJsxAst
}


export interface Saga<T extends AllActions['type']> {
  type: T
  /** if an action is returned then it will be dispatched */
  actionDispatched(action: ActionForType<T>, state: State): AllActions | void
}

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R ? R extends AllActions ? T extends R['type'] ? R : never : never : never






import { Classification } from '../codeWorker/extractCodeDecorations';
import { JsonImplOutputEl } from 'jsx-alone-core';

export interface CodeWorkerResponse {
  version: number;
  jsxSyntaxHighLight: {
    classifications: Classification[];
  };
  evaluate: {
    result?: JsonImplOutputEl;
    error?: CodeWorkerError;
    evaluated: string;
  };
  jsxAst: CodeWorkerResponseJsxAst;
  totalTime: number
}
export interface EvaluateTimes {
  eval?: number
  render?: number
}
export interface CodeWorkerResponseJsxAst {
  diagnostics: CodeWorkerResponseJsxAstDiagnostic[];
  ast: CodeWorkerResponseJsxAsNode;
}
export interface CodeWorkerRequest {
  code: string;
  title: string;
  version: number;
  jsxAst?: CodeWorkerRequestJsxAst;
}
export interface CodeWorkerRequestJsxAst {
  showDiagnostics?: boolean;
  mode?: 'forEachChild' | 'getChildren';
  nodeTextLength?: number;
}
export interface CodeWorkerResponseJsxAsNode {
  type: string;
  text: string;
  kind: string;
  start: number;
  end: number;
  startColumn: number;
  startLineNumber: number;
  endColumn: number;
  endLineNumber: number;
  children: CodeWorkerResponseJsxAsNode[];
}
export type CodeWorkerResponseJsxAstDiagnostic = {
  message: string;
  lineNumber: number | undefined;
  start: number | undefined;
  length: number | undefined;
  // category: DiagnosticCategory;
  code: number;
};
export type CodeWorkerError = {
  message: string;
  stack?: string;
  name: string;
};
export type CodeWorkerListener = (e: {
  data: CodeWorkerResponse;
}) => void;
