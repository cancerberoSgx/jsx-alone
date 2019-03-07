import { combineReducers, Reducer } from 'redux'
import { changeCode, ChangeCodeAction } from './editor'
import { status, PushLogAction } from './status'
import { changeTheme, ChangeThemeAction } from './theme'
import { State } from './types'

export const reducers = combineReducers<State>({
  layout: changeTheme,
  editor: changeCode,
  status
})

export type AllActions = ChangeCodeAction|PushLogAction|ChangeCodeAction|ChangeThemeAction
