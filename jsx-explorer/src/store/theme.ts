import { Action, Reducer, compose } from 'redux'
import { State, Theme, Layout } from './types'
import { lightTheme } from '../theme'

const initialState = {
  theme: lightTheme
}
export const changeTheme: Reducer<Layout, ChangeThemeAction> =  (state= initialState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { ...state, theme: action.theme }
    default:
      return state
  }
}
export interface ChangeThemeAction extends Action<'CHANGE_THEME'> {
  type: 'CHANGE_THEME'
  theme: Theme
}
