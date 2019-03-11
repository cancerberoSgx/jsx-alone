import { Action, Reducer } from 'redux'
import { lightTheme } from '../style/theme'
import { Layout, Theme } from './types'

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
