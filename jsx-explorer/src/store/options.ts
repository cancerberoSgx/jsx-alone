import { Action, Reducer } from 'redux'
import { Options, State } from './types'

const initialState: Options = {
  logs: [],
  autoApply: true
}
export enum OPTIONS_ACTIONS {
  PUSH_LOG = 'PUSH_LOG',
  CHANGE_AUTO_APPLY = 'CHANGE_AUTO_APPLY'
}

export const optionsReducer: Reducer<Options, PushLogAction | ChangeAutoApply> = (state = initialState, action) => {
  switch (action.type) {
    case OPTIONS_ACTIONS.PUSH_LOG:
      return { ...state, logs: [...state.logs, action.payload.log] }

    case OPTIONS_ACTIONS.CHANGE_AUTO_APPLY:
      return { ...state, autoApply: action.payload.autoApply }

    default:
      return state
  }
}
export interface PushLogAction extends Action<OPTIONS_ACTIONS.PUSH_LOG> {
  type: OPTIONS_ACTIONS.PUSH_LOG,

  payload: { log: string }
}
export interface ChangeAutoApply extends Action<OPTIONS_ACTIONS.CHANGE_AUTO_APPLY> {
  type: OPTIONS_ACTIONS.CHANGE_AUTO_APPLY,
  payload: { autoApply: boolean }
}
