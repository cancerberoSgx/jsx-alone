import { lightTheme, darkTheme } from '../style/theme'
import { State } from './types'
import { changeTheme, ChangeThemeAction } from './theme'
import { compose, Reducer, combineReducers } from 'redux'
import { changeCode, ChangeCodeAction } from './editor'

export const reducers = combineReducers({
  layout: changeTheme,
  editor: changeCode
})

// export const reducers = compose(changeTheme, changeCode);

// type A = ChangeCodeAction | ChangeThemeAction
// const allReducers = [changeCode, changeTheme]
// export const reducers: Reducer<State, A> = (state = initialState, action) => {
//   switch (action.type) {
//     case 'CHANGE_CODE':
//       return changeCode(state, action)
//     case 'CHANGE_THEME':
//       return changeTheme(state, action)
//     default:
//       return state;
//   }
// };
