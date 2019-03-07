import { Action, Reducer } from 'redux'
import { examples } from '../examples/examples'
import { Editor } from './types'

const initialState = {
  code: examples[0].code
}

export const changeCode: Reducer<Editor, ChangeCodeAction> = (state= initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CODE':
      return { ...state, code: action.code }
    default:
      return state
  }
}

export interface ChangeCodeAction extends Action<'CHANGE_CODE'> {
  type: 'CHANGE_CODE'
  code: string
}
