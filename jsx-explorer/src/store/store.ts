import { lightTheme, darkTheme } from '../theme';
import { State } from './types';
import { changeTheme } from './theme';
import { compose } from 'redux';

export const initialState: State = {
  theme: lightTheme, 
  code:  `
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



export const reducers = compose(changeTheme);