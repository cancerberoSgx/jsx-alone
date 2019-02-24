import { Children, JSXAlone } from 'jsx-alone-dom';
import { Person } from "./types";

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

export const Comp = (props: {names: string[]})=><ul>{props.names.map(n=><li>{name}</li>)}</ul>

export const People = (props: { people: Person[] }) => (
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
