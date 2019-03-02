import { Action, Reducer, compose } from 'redux';
import { State, Theme } from './types';
import { initialState } from './store';

export const changeTheme: Reducer<State, ChangeThemeAction> = (state: State = initialState, action: ChangeThemeAction) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};
export interface ChangeThemeAction extends Action<'CHANGE_THEME'> {
  theme: Theme;
}
