import { Action, Reducer } from 'redux';
import { CodeWorkerResponse, CodeWorkerRequest } from '../codeWorkerManager';
import { Compiled } from './types';

const initialState: Compiled = {
  jsxAstOptions: {

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
      return { ...state, ...action.payload }
    case COMPILED_ACTION.RENDER_COMPILED:
      return { ...state,...action.payload }
    default:
      return state
  }
}

export interface FetchCompiledAction extends Action<COMPILED_ACTION.FETCH_COMPILED> {
  type: COMPILED_ACTION.FETCH_COMPILED
  payload: {request: CodeWorkerRequest}
}

export interface RenderCompiledAction extends Action<COMPILED_ACTION.RENDER_COMPILED> {
  type: COMPILED_ACTION.RENDER_COMPILED
  payload: {response: CodeWorkerResponse}
}

// registerSaga({
//   // after a FETCH_COMPILED we dispatch RENDER_COMPILED action
//   type: COMPILED_ACTION.FETCH_COMPILED,
//   actionDispatched(action, state) {
//     return { type: COMPILED_ACTION.RENDER_COMPILED, payload: {response: action.payload} }
//   }
// })