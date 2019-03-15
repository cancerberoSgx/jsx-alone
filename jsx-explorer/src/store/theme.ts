import { Action, Reducer } from 'redux'
import { lightTheme } from '../style/theme'
import { Layout, Theme } from './types'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { registerStyle } from '../style/styles';
import { jsxColorSkins } from '../components/explorer/jsxColors/skinsData';
import { buildCssForSkin } from '../components/explorer/jsxColors/jsxColorsCssBuilder';

const initialState = {
  theme: lightTheme
}

export enum THEME_ACTIONS {
  CHANGE_THEME = 'THEME_ACTIONS_CHANGE_THEME'
}

export const changeTheme: Reducer<Layout, ChangeThemeAction> = (state = initialState, action) => {
  switch (action.type) {
    case THEME_ACTIONS.CHANGE_THEME:
      return { ...state, theme: action.theme }
    default:
      return state
  }
}

export interface ChangeThemeAction extends Action<THEME_ACTIONS.CHANGE_THEME> {
  type: THEME_ACTIONS.CHANGE_THEME
  theme: Theme
}

function* watchThemeChange() {
  yield takeEvery(THEME_ACTIONS.CHANGE_THEME,
    function* (action: ChangeThemeAction) {
      const skin = action.theme.type === 'dark' ? jsxColorSkins.find(s => s.name === 'Default Dark') : jsxColorSkins.find(s => s.name === 'Default Light')
      const { styles } = buildCssForSkin(skin!)
      yield registerStyle(styles)
    }
  )
}

export function* themeSagas() {
  yield all([
    watchThemeChange()
  ])
}
