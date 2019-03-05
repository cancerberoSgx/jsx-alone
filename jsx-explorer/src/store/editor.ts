import { Action, Reducer, compose } from 'redux'
import { State, Theme, Editor } from './types'
const initialState = {
  code: `
function render() {
  const people = [{ name: 'Sebastián', age: 12 }, { name: 'Laura', age: 22 }]
  const t0 = Date.now()
  return <div className="people">
    <h1>People</h1>
    <ul>{people.map(p =>
      <li>
        <strong className="name">{p.name}</strong> is <span className="age">{p.age}</span> years old
      </li>)}
    </ul>
    <p>Listed {people.length} persons in {Date.now()-t0} milliseconds. </p>
    <button className="button is-primary" onClick={e=>submit()}>Submit</button>
  </div>
}
    `.trim()
}
export const changeCode: Reducer<Editor, ChangeCodeAction> = (state= initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CODE':
      return { ...state, code: action.code }
    default:
      return state
  }
}
export interface ChangeCodeAction extends Action<'CHANGE_CODE'> {
  type: 'CHANGE_CODE'
  code: string
}
