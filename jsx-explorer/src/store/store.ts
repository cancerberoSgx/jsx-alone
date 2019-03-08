import { combineReducers, Reducer } from 'redux'
import { changeCode, ChangeCodeAction } from './editor'
import { status, PushLogAction } from './status'
import { changeTheme, ChangeThemeAction } from './theme'
import { State } from './types'
import { changeCompiled, ChangeCompiledAction } from './compiled';

export const reducers = combineReducers<State>({
  layout: changeTheme,
  editor: changeCode,
  status, 
  compiled: changeCompiled
})

export type AllActions = ChangeCodeAction|PushLogAction|ChangeCodeAction|ChangeThemeAction|ChangeCompiledAction
