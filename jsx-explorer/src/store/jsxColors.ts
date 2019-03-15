import { Action, Reducer } from 'redux';
import { all, takeEvery } from 'redux-saga/effects';
import { buildCssForSkin } from '../components/explorer/jsxColors/jsxColorsCssBuilder';
import { JsxColorsSkinStyles, JsxColorsState, JsxColorsTools, JsxSyntaxSkin } from "../components/explorer/jsxColors/jsxColorsTypes";
import { jsxColorSkins } from '../components/explorer/jsxColors/skinsData';
import { registerStyle } from '../style/styles';
import { dispatch } from './store';

const initialState: JsxColorsState = {
  predefined: jsxColorSkins,
}

export enum JSX_COLORS_ACTIONS {
  CHANGE_TOOL = 'JSX_COLORS_CHANGE_TOOL',
  SELECT_SKIN = 'JSX_COLORS_SELECT_SKIN',
  EDITOR_SKIN_CHANGED = 'JSX_COLORS_EDITOR_SKIN_CHANGED',
  APPLY_SKIN_STYLES = 'JSX_COLORS_APPLY_SKIN_STYLES'

}

export const jsxColorsReducer: Reducer<JsxColorsState, ChangeToolAction | SelectSkinAction | EditorChangePropValueAction | ApplySkinStylesAction> = (state = initialState, action) => {
  switch (action.type) {
    case JSX_COLORS_ACTIONS.CHANGE_TOOL:
      return { ...state, ...action.payload, selected: action.payload.tool === 'skins' ? undefined : state.selected }
    case JSX_COLORS_ACTIONS.SELECT_SKIN:
      return { ...state, ...action.payload }
    case JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED:
      return { ...state, selected: { ...state.selected, ...action.payload.changed } }
    case JSX_COLORS_ACTIONS.APPLY_SKIN_STYLES:
      return { ...state, selectedSkinCurrentStyles: action.payload }
    default:
      return state
  }
}

interface ChangeToolAction extends Action<JSX_COLORS_ACTIONS.CHANGE_TOOL> {
  type: JSX_COLORS_ACTIONS.CHANGE_TOOL
  payload: { tool: JsxColorsTools }
}

interface SelectSkinAction extends Action<JSX_COLORS_ACTIONS.SELECT_SKIN> {
  type: JSX_COLORS_ACTIONS.SELECT_SKIN
  payload: { selected: JsxSyntaxSkin }
}

interface EditorChangePropValueAction extends Action<JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED> {
  type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED
  payload: { changed: JsxSyntaxSkin }
}

interface ApplySkinStylesAction extends Action<JSX_COLORS_ACTIONS.APPLY_SKIN_STYLES> {
  type: JSX_COLORS_ACTIONS.APPLY_SKIN_STYLES
  payload: JsxColorsSkinStyles
}

export type JSXColorsActions = ChangeToolAction | SelectSkinAction | EditorChangePropValueAction | ApplySkinStylesAction

function* watchForSkinSelected() {
  // when skin is selected we change the tool to editor and make sure selected skin is applied (by dispatching EDITOR_SKIN_CHANGED)
  yield takeEvery(JSX_COLORS_ACTIONS.SELECT_SKIN,
    function* skinSelected(action: SelectSkinAction) {
      yield dispatch({ type: JSX_COLORS_ACTIONS.CHANGE_TOOL, payload: { tool: 'editor' } })
      yield dispatch({ type: JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED, payload: { changed: action.payload.selected } })
    }
  )
}

function* watchForEditorSkinChange() {
  // when user modifies the skin (current) in the editor we update the styles
  yield takeEvery(JSX_COLORS_ACTIONS.EDITOR_SKIN_CHANGED,
    function* skinSelected(action: EditorChangePropValueAction) {
      yield dispatch({ type: JSX_COLORS_ACTIONS.APPLY_SKIN_STYLES, payload: buildCssForSkin(action.payload.changed) })
    }
  )
}

function* watchForCssChange() {
  // when there is new styles to apply we use registerStyle to render them in the DOM
  yield takeEvery(JSX_COLORS_ACTIONS.APPLY_SKIN_STYLES,
    function* skinSelected(action: ApplySkinStylesAction) {
      yield registerStyle(action.payload.styles.split('\n').map(l => l.trim().startsWith('.') ? '.vs ' + l : l).join('\n'))
      // yield registerStyle(action.payload.darkStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs-dark ' + l : l).join('\n'))
    }
  )
}

export function* jsxColorsSagas() {
  yield all([
    watchForSkinSelected(),
    watchForEditorSkinChange(),
    watchForCssChange()
  ])
}
