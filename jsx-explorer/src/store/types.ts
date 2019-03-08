import { CodeWorkerResponse } from '../codeWorkerManager';

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

export type Compiled =CodeWorkerResponse|{}
export function isCompiledReady(c: Compiled|undefined): c is CodeWorkerResponse {
  return !!c && !!Object.keys(c).length
}