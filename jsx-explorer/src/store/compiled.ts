import { Action, Reducer } from 'redux';
import { CodeWorkerResponse } from '../codeWorkerManager';
import { Compiled } from './types';

const initialState = {}

export const changeCompiled: Reducer<Compiled, ChangeCompiledAction> = (state= initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COMPILED':
      return { ...state, ...action.compiled  }
    default:
      return state
  }
}

export interface ChangeCompiledAction extends Action<'CHANGE_COMPILED'> {
  type: 'CHANGE_COMPILED'
  compiled: CodeWorkerResponse
}
