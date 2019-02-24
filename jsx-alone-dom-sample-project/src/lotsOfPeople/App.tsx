import { ElementClass } from 'jsx-alone-dom'
import { Person } from './types'
import { Children, JSXAlone } from 'jsx-alone-dom'
import { MODEL_CONFIG } from './model';

export class App extends ElementClass<{ people: Person[], peopleCount:number, friendsCount: number }> {
  render() {
    return <div id="lotsOfPeopleRoot">
      <h1>Lots of people to print</h1>
      <p>
        People count: <input id="peopleCount" value={this.props.peopleCount+''} type="number"></input>
      </p>
      <p>
        Friends count: <input id="friendsCount" value={this.props.friendsCount+''} type="number"></input>
      </p>
      <button onClick={e=>{
        const peopleCount = document.querySelector<HTMLInputElement>('#peopleCount')!.valueAsNumber
        const friendsCount = document.querySelector<HTMLInputElement>('#friendsCount')!.valueAsNumber;
        (window as any).renderAppLotsOfPeople({peopleCount, friendsCount})
      }}>Render!</button>
      <h4>Timings</h4>
      <ul>
        <li>onload: <strong id="timings_onload"></strong></li>
        <li>buildModel: <strong id="timings_buildModel"></strong></li>
        <li>JSXAlone.createElement: <strong id="timings_JSXAloneCreateElement"></strong></li>
        <li>JSXAlone.render: <strong id="timings_JSXAloneRender"></strong></li>        
      </ul>
      <People people={this.props.people} />
    </div>
  }
}

const EditButton = (props: { name: string; children: Children }) => (
  <button data-name={props.name}
    onClick={e => {
      alert(`
No context here that's why we need to do the following: 
Name: "${e.currentTarget.getAttribute('data-name')}"
`.trim())
      debugger
    }}>
    {props.children}
  </button>
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
          </li>
        ))}
      </ul>
    </td>
    <td>
      <EditButton name={props.name}>Edit</EditButton>
    </td>
  </tr>
)

const People = (props: { people: Person[] }) => (
  <table className="person">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Friends</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.people.map(p => (
        <Person {...p} />
      ))}
    </tbody>
  </table>
)
