import { Action, Reducer } from 'redux';
import { postMessage } from '../codeWorker/codeWorkerManager';
import { examples } from '../examples/examples';
import { Editor, Saga, CodeWorkerRequest } from './types';
import { getMonacoInstance } from '../monaco/monaco';

const initialState = {
  code: examples[0].code,
  version: -1
}

export enum EDITOR_ACTION {
  REQUEST_CODE_CHANGE = 'REQUEST_CODE_CHANGE',
  EDITOR_MODEL_CHANGED = 'EDITOR_MODEL_CHANGED',
}

export const changeCode: Reducer<Editor, RequestCodeChangeAction | EditorModelChangedAction> = (state = initialState, action) => {
  switch (action.type) {
    case EDITOR_ACTION.REQUEST_CODE_CHANGE:
      return { ...state, ...action.payload }
    case EDITOR_ACTION.EDITOR_MODEL_CHANGED:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export interface RequestCodeChangeAction extends Action<EDITOR_ACTION.REQUEST_CODE_CHANGE> {
  type: EDITOR_ACTION.REQUEST_CODE_CHANGE
  payload: {
    code: string
  }
}

export interface EditorModelChangedAction extends Action<EDITOR_ACTION.EDITOR_MODEL_CHANGED> {
  type: EDITOR_ACTION.EDITOR_MODEL_CHANGED
  payload: {
    code: string
    version: number
  }
}

export const editorModelChangedSaga: Saga<EDITOR_ACTION.EDITOR_MODEL_CHANGED> = {
  // after EDITOR_MODEL_CHANGED we request the codeWorker to compile (when it's done a codeWorker listener will dispatch  RENDER_COMPILED)
  type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
  actionDispatched(action, state) {
    if (state.options.autoApply) {
      const m: CodeWorkerRequest = {
        title: 'main.tsx',
        ...action.payload,
        jsxAst: {
          mode: state.compiled.jsxAstOptions.mode,
          showDiagnostics: state.compiled.jsxAstOptions.showDiagnostics
        }
      }
      postMessage(m)
    }
  }
}


export const requestEditorChangeSaga: Saga<EDITOR_ACTION.REQUEST_CODE_CHANGE> = {
  // when REQUEST_CODE_CHANGE we set monaco editor value (when selecting an example)
  type: EDITOR_ACTION.REQUEST_CODE_CHANGE,
  actionDispatched(action, state) {
    getMonacoInstance()!.getModel()!.setValue(action.payload.code)
  }
} 