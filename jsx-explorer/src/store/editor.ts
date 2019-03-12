import { Action, Reducer } from 'redux';
import { examples } from '../examples/examples';
import { getMonacoInstance } from '../monaco/monaco';
import { COMPILED_ACTION, FetchCompiledAction } from './compiled';
import { OPTIONS_ACTIONS } from './options';
import { dispatch, registerSaga, Saga } from './store';
import { Editor, State } from './types';
import { put, takeEvery, all, select, call } from 'redux-saga/effects'

const initialState = {
  code: examples[0].code,
  version: -1
}

export enum EDITOR_ACTION {
  REQUEST_CODE_CHANGE = 'REQUEST_CODE_CHANGE',
  EDITOR_MODEL_CHANGED = 'EDITOR_MODEL_CHANGED'
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

function* editorModelChanged(action: RequestCodeChangeAction) {
  const state:State = yield select() 
  if (state.options.autoApply) {
    const a: FetchCompiledAction = {
      type: COMPILED_ACTION.FETCH_COMPILED,
      payload: {
        request:
        {
          // ...state.compiled.request,
          ...action.payload
        }
      }
    }
    // yield put(a) 
    // debugger
    dispatch(a)
  }
}
export function* watchEditorModelChanged() {
  yield takeEvery(EDITOR_ACTION.EDITOR_MODEL_CHANGED, editorModelChanged)
}

function* requestEditorChange(action: RequestCodeChangeAction) {
  yield put({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
  yield call(() => getMonacoInstance()!.getModel()!.setValue(action.payload.code))
}

export function* watchRequestEditorChange() {
  yield takeEvery(EDITOR_ACTION.REQUEST_CODE_CHANGE, requestEditorChange)
}


export function* editorSagas() {
  yield all([
    watchRequestEditorChange(), watchEditorModelChanged()
  ])
}



// export const editorModelChangedSaga: Saga<EDITOR_ACTION.EDITOR_MODEL_CHANGED> = {
//   // after EDITOR_MODEL_CHANGED we request the codeWorker to compile (when it's done a codeWorker listener will dispatch  RENDER_COMPILED)
//   type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
//   beforeActionDispatch(a, s) {
//     dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
//   },
//   afterActionDispatch(action, state) {
//     if (state.options.autoApply) {
//       dispatch({
//         type: COMPILED_ACTION.FETCH_COMPILED, payload: {
//           request:
//           {
//             ...state.compiled.request,
//             ...action.payload
//           }
//         }
//       })
//     }
//   }
// }

// export const requestEditorChangeSaga: Saga<EDITOR_ACTION.REQUEST_CODE_CHANGE> = {
//   // when REQUEST_CODE_CHANGE we set monaco editor value (when selecting an example)
//   type: EDITOR_ACTION.REQUEST_CODE_CHANGE,
//   beforeActionDispatch(a, s) {
//     dispatch({ type: OPTIONS_ACTIONS.SET_WORKING, payload: { working: true } })
//   },
//   afterActionDispatch(action, state) {
//     getMonacoInstance()!.getModel()!.setValue(action.payload.code)
//   }
// }
// registerSaga(editorModelChangedSaga, requestEditorChangeSaga)
