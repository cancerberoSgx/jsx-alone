import { Action, Reducer } from 'redux'
import { Compiled, CodeWorkerRequest, CodeWorkerResponse, Saga } from './types'
import { all as merge } from 'deepmerge'
import { postMessage } from '../codeWorker/codeWorkerManager';

const initialState: Compiled = {
  // jsxAstOptions: {

  // },
  request: {
    jsxAst: {
      mode: 'forEachChild'
    },  
    code: '',
    title: 'main.tsx',
    version: -1
  }
}

export enum COMPILED_ACTION {
  RENDER_COMPILED = 'RENDER_COMPILED',
  FETCH_COMPILED = 'FETCH_COMPILED'
}
// export type COMPILED_ACTION = 'RENDER_COMPILED' | 'FETCH_COMPILED'

export const compiled: Reducer<Compiled, FetchCompiledAction | RenderCompiledAction> = (state = initialState, action) => {
  switch (action.type) {
    case COMPILED_ACTION.FETCH_COMPILED:
    const s = {
      ...state, 
      // ...action.payload,
      // request: merge(state.request||action.payload.request, action.payload.request)
      request: merge([state.request || action.payload.request, action.payload.request]) as CodeWorkerRequest
    }
    // debugger
      return s
    case COMPILED_ACTION.RENDER_COMPILED:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export interface FetchCompiledAction extends Action<COMPILED_ACTION.FETCH_COMPILED> {
  type: COMPILED_ACTION.FETCH_COMPILED
  payload: { request: Partial<CodeWorkerRequest> }
}

export interface RenderCompiledAction extends Action<COMPILED_ACTION.RENDER_COMPILED> {
  type: COMPILED_ACTION.RENDER_COMPILED
  payload: { response: CodeWorkerResponse }
}


export const fetchCompiledSaga: Saga<COMPILED_ACTION.FETCH_COMPILED> = {
  // when FETCH_COMPILED we postMessage to webworker 
  type: COMPILED_ACTION.FETCH_COMPILED,
  actionDispatched(action, state) {
    const m: CodeWorkerRequest = {
      ...state.compiled.request,
      // jsxAst: merge([state.compiled.request || {}, action.payload.request]),
      code: state.editor.code,
      version: state.editor.version
    }
    // debugger
    postMessage(m)
  }
}


// registerSaga({
//   // after a FETCH_COMPILED we dispatch RENDER_COMPILED action
//   type: COMPILED_ACTION.FETCH_COMPILED,
//   actionDispatched(action, state) {
//     return { type: COMPILED_ACTION.RENDER_COMPILED, payload: {response: action.payload} }
//   }
// })
