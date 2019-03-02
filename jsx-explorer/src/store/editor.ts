import { Action, Reducer, compose } from 'redux';
import { State, Theme, Editor } from './types';
const initialState ={
  code: `
function render() {
var people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
return <div>
  <h1>People</h1>
  <ul>{people.map(p => 
    <li>
      <strong>{p.name}</strong> is {p.age} years old
    </li>)}
  </ul>
</div>
}
    `.trim(),
}
export const changeCode: Reducer<Editor, ChangeCodeAction> = (state=initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CODE':
      return { ...state, code: action.code }
    default:
      return state;
  }
};
export interface ChangeCodeAction extends Action<'CHANGE_CODE'> {
  type: 'CHANGE_CODE'
  code:string
}
