import { Person } from './types'
import { Children, AbstractElementClass as ElementClass, If , AbstractJSXAlone} from 'jsx-alone-core'

type P = {  people: Person[], peopleCount:number, friendsCount: number }
interface App extends ElementClass<P> {
  new(props:P): ElementClass<P>
}
export function getApp(JSXAlone: typeof AbstractJSXAlone): App {
  class AppImpl extends ElementClass<P>  {
    render() {
      return <div>
        <h1>Lots of people to print</h1>
        <If c={typeof window!=='undefined'}>{()=><div>
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
        </div>
  
        }</If>
  
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
        // debugger
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
        {props.people.map(p => 
          <Person {...p} />
        )}
      </tbody>
    </table>
  )

  return AppImpl as any
}