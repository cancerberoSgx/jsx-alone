import { ElementClass } from 'jsx-alone-dom';
import { Person } from './types';
import { Children, JSXAlone } from 'jsx-alone-dom';

export class App extends ElementClass<{people: Person[]}> {
  render() {
    return <People people={this.props.people} />;
  }
}

const Button = (props: { name: string; children: Children }) => (
  <button
    onClick={e => {
      alert('hi - no context here')
      debugger
    }}
  >{props.children}</button>
)

const Person = (props: Person) => (
  <tr id={encodeURIComponent(props.name)}>
    <td>{props.name}</td>
    <td>{props.age}</td>
    <td>
      <ul>
        {props.friends.map(f => (
          <li>
            <a href={`#${f.name}`}>{f.name}</a>
            <Button name={f.name}>Edit</Button>
          </li>
        ))}
      </ul>
    </td>
  </tr>
)

const People = (props: { people: Person[] }) => (
  <table className="person">
    <thead>
      <th>
        <td>Name</td>
        <td>Age</td>
        <td>Friends</td>
      </th>
    </thead>
    <tbody>
      {props.people.map(p => (
        <Person {...p} />
      ))}
    </tbody>
  </table>
)


