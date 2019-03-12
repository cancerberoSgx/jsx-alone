import { Action, Reducer } from 'redux'
import { isMobile } from '../util/media'
import { ExplorerName, Options } from './types'

const initialState: Options = {
  logs: [],
  autoApply: true,
  selectedExplorer: isMobile() ? 'editor' : 'elements',
  working: false
}

export enum OPTIONS_ACTIONS {
  PUSH_LOG = 'PUSH_LOG',
  CHANGE_AUTO_APPLY = 'CHANGE_AUTO_APPLY',
  SELECT_EXPLORER = 'SELECT_EXPLORER',
  SET_WORKING= 'SET_WORKING'
}

export const optionsReducer: Reducer<Options, PushLogAction | ChangeAutoApply | SelectExplorer|SetWorking> = (state = initialState, action) => {

  switch (action.type) {

    case OPTIONS_ACTIONS.PUSH_LOG:
      return { ...state, logs: [...state.logs, action.payload.log] }

    case OPTIONS_ACTIONS.CHANGE_AUTO_APPLY:
      return { ...state, autoApply: action.payload.autoApply }

    case OPTIONS_ACTIONS.SELECT_EXPLORER:
      return { ...state, selectedExplorer: action.payload.selectedExplorer }

    case OPTIONS_ACTIONS.SET_WORKING:

    // TODO: to be faster we do this hack:
    if (action.payload.working) {
      document.body.classList.add('working')
    }
    else {
      document.body.classList.remove('working')
    }
    return state
      // return { ...state, working: action.payload.working }

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

export interface SelectExplorer extends Action<OPTIONS_ACTIONS.SELECT_EXPLORER> {
  type: OPTIONS_ACTIONS.SELECT_EXPLORER,
  payload: { selectedExplorer: ExplorerName }
}

export interface SetWorking extends Action<OPTIONS_ACTIONS.SET_WORKING> {
  type: OPTIONS_ACTIONS.SET_WORKING,
  payload: { working: boolean }
}
