import { CodeWorkerRequest, CodeWorkerRequestJsxAst, CodeWorkerResponse } from '../codeWorkerManager';
import { AllActions } from './store';

export interface State {
  readonly layout: Layout
  readonly editor: Editor
  readonly compiled: Compiled
  status: Status
}

export interface Status {
  logs: string[]
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

