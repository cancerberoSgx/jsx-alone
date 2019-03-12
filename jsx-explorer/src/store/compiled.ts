import { all as merge } from 'deepmerge';
import { Action, Reducer } from 'redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { requestCodeCompile } from '../codeWorker/codeWorkerManager';
import { dispatchSyntaxHighlight } from '../monaco/jsxSyntaxHighlight';
import { OPTIONS_ACTIONS } from './options';
import { dispatch } from './store';
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
        request: merge([state.request || {}, action.payload.request]) as CodeWorkerRequest
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

function* watchFetchCompiled() {
  yield takeEvery(COMPILED_ACTION.FETCH_COMPILED,
    function* fetchCompiled(action: FetchCompiledAction) {
      yield put({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
      const state = yield select()
      const m: CodeWorkerRequest = {
        ...state.compiled.request,
        code: state.editor.code,
        version: state.editor.version
      }
      requestCodeCompile(m)
    })
}

function* watchRenderCompile() {
  yield takeEvery(COMPILED_ACTION.RENDER_COMPILED,
    function* renderCompile(action: RenderCompiledAction) {
      yield call(() => dispatchSyntaxHighlight(action.payload.response))
      yield put({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: false } })
    })
}

function* watchErrorCompiled() {
  yield takeEvery(COMPILED_ACTION.ERROR_COMPILED,
    function* errorCompiled(action: ErrorCompiledAction) {
      yield put({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: false } })
    }
  )
}

export function* compiledSagas() {
  yield all([
    watchFetchCompiled(), watchRenderCompile(), watchErrorCompiled()
  ])
}
