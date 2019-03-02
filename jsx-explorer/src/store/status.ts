import { Action, Reducer } from 'redux';
import { Status, State } from './types';
const initialState : Status = {
  logs: []
}
export const status: Reducer<Status, PushLogAction> = (state= initialState, action) => {
  switch (action.type) {
    case 'PUSH_LOG':
    console.log(' pushing log:',action.log );
    
      return { ...state, logs: [...state.logs, action.log] }
    default:
      return state
  }
}
export interface PushLogAction extends Action<'PUSH_LOG'> {
  type: 'PUSH_LOG'
  log: string
}

// export interface PushLogAction extends Action<'PUSH_LOG'> {
//   type: 'PUSH_LOG'
//   state: State
// }
