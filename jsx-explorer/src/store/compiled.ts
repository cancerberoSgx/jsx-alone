import { all as merge } from 'deepmerge';
import { Action, Reducer } from 'redux';
import { requestCodeCompile } from '../codeWorker/codeWorkerManager';
import { dispatchSyntaxHighlight } from '../monaco/jsxSyntaxHighlight';
import { OPTIONS_ACTIONS } from './options';
import { dispatch, registerSaga, Saga } from './store';
import { CodeWorkerError, CodeWorkerRequest, CodeWorkerResponse, Compiled } from './types';

const initialState: Compiled = {
  request: {
    jsxAst: {
      mode: 'forEachChild'
    },
    code: '',
    title: 'main.tsx',
    version: -1
  },
}

export enum COMPILED_ACTION {
  RENDER_COMPILED = 'RENDER_COMPILED',
  FETCH_COMPILED = 'FETCH_COMPILED',
  ERROR_COMPILED = 'ERROR_COMPILED',
}

export const compiled: Reducer<Compiled, FetchCompiledAction | RenderCompiledAction | ErrorCompiledAction> = (state = initialState, action) => {
  switch (action.type) {
    case COMPILED_ACTION.FETCH_COMPILED:
      const s = {
        ...state,
        request: merge([state.request || action.payload.request, action.payload.request]) as CodeWorkerRequest
      }
      return s
    case COMPILED_ACTION.RENDER_COMPILED:
      return { ...state, ...action.payload }
    case COMPILED_ACTION.ERROR_COMPILED:
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

export interface ErrorCompiledAction extends Action<COMPILED_ACTION.ERROR_COMPILED> {
  type: COMPILED_ACTION.ERROR_COMPILED
  payload: { error: CodeWorkerError }
}


export const fetchCompiledSaga: Saga<COMPILED_ACTION.FETCH_COMPILED> = {
  type: COMPILED_ACTION.FETCH_COMPILED,
  beforeActionDispatch(a, s){
    dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
  },
  afterActionDispatch(action, state) {
    dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
    const m: CodeWorkerRequest = {
      ...state.compiled.request,
      code: state.editor.code,
      version: state.editor.version
    }
    requestCodeCompile(m)
  }
}

export const renderCompiledSaga: Saga<COMPILED_ACTION.RENDER_COMPILED> = {
  type: COMPILED_ACTION.RENDER_COMPILED,
  beforeActionDispatch(a, s){
    dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
  },
  afterActionDispatch(action, state) {
    dispatchSyntaxHighlight(action.payload.response)
    dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: false } })
  }
}

export const errorCompiledSaga: Saga<COMPILED_ACTION.ERROR_COMPILED> = {
  type: COMPILED_ACTION.ERROR_COMPILED,
  afterActionDispatch(action, state) {
    dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: false } })
  }
}

  registerSaga(errorCompiledSaga, fetchCompiledSaga, renderCompiledSaga)