import { Action, Reducer } from 'redux';
import { all, takeEvery, put } from 'redux-saga/effects';
import { buildCssForSkin } from '../components/explorer/jsxColors/jsxColorsCssBuilder';
import { JsxColorsState, JsxColorsTools, JsxSyntaxSkin } from "../components/explorer/jsxColors/jsxColorsTypes";
import { jsxColorSkins } from '../components/explorer/jsxColors/skinsData';
import { dispatch } from './store';
import { registerStyle } from '../style/styles';
import { JsxColorSkins } from '../components/explorer/jsxColors/JsxColorSkins';


const initialState: JsxColorsState = {
  predefined: jsxColorSkins,
}

export enum JSX_COLORS_ACTIONS {
  CHANGE_TOOL = 'JSX_COLORS_CHANGE_TOOL',
  SELECT_SKIN = 'JSX_COLORS_SELECT_SKIN',
  EDITOR_SKIN_CHANGED = 'EDITOR_CHANGE_PROP_VALUE'
}

export const jsxColorsReducer: Reducer<JsxColorsState, ChangeToolAction | SelectSkinAction | EditorChangePropValueAction> = (state = initialState, action) => {
  switch (action.type) {

    case JSX_COLORS_ACTIONS.CHANGE_TOOL:
      return { ...state, ...action.payload, selected: action.payload.tool === 'skins' ? undefined : state.selected }

    case JSX_COLORS_ACTIONS.SELECT_SKIN:
      return { ...state, ...action.payload }

    case JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED:
      return { ...state, selected: { ...state.selected, ...action.payload.changed } }
    default:
      return state
  }
}

export interface ChangeToolAction extends Action<JSX_COLORS_ACTIONS.CHANGE_TOOL> {
  type: JSX_COLORS_ACTIONS.CHANGE_TOOL
  payload: { tool: JsxColorsTools }
}

export interface SelectSkinAction extends Action<JSX_COLORS_ACTIONS.SELECT_SKIN> {
  type: JSX_COLORS_ACTIONS.SELECT_SKIN
  payload: { selected: JsxSyntaxSkin }
}

export interface EditorChangePropValueAction extends Action<JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED> {
  type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED
  payload: { changed: JsxSyntaxSkin }
}



function* watchForSkinSelected() {
  // when skin is selected we change the tool to editor
  yield takeEvery(JSX_COLORS_ACTIONS.SELECT_SKIN,
    function* skinSelected(action: SelectSkinAction) {

      yield dispatch({ type: JSX_COLORS_ACTIONS.CHANGE_TOOL, payload: { tool: 'editor' } })

    }
  )
}


function* watchForEditorSkinChange() {
  // when user modifies the skin (current) in the editor we update the styles
  yield takeEvery(JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED,
    function* skinSelected(action: EditorChangePropValueAction) {
      debugger

      const { lightStyles, darkStyles } = buildCssForSkin(action.payload.changed)

      debugger
      yield registerStyle(lightStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs ' + l : l).join('\n'))

      yield registerStyle(darkStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs-dark ' + l : l).join('\n'))

    }
  )
}

export function* jsxColorsSagas() {
  yield all([
    watchForSkinSelected(),
    watchForEditorSkinChange()
  ])
}
