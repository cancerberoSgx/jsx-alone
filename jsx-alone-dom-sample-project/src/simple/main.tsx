import { JSXAlone, ElementClass } from 'jsx-alone-dom'

// example element function
const TaskPageLink = (props: { children: string; task: string }) => 
  <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>

// example element class that renders some given information and uses Button
class App extends ElementClass<{ name: string; tasks: string[] }> {
  render() {
    return <article>
      <h3>Welcome {this.props.name}!</h3>
      <p>These are your tasks:</p>
      <ul>{this.props.tasks.map(task => 
          <li>
            <TaskPageLink task={task}>{task}</TaskPageLink>
          </li>
        )}
      </ul>
    </article>
  }
}

// render the App and append the generated element to body
const app = <App name="John Doe" 
  tasks={['Wash dishes', 'Go outside', 'Play soccer']} 
  />
const el = JSXAlone.render(app)
document.body.appendChild(el)



// import { JSXAlone, ElementClass } from 'jsx-alone-dom'

// const Button = (props: { name: string; children: JSX.Element, onClick: ()=>void }) => (
//   <button
//     onClick={e=>props.onClick()}
//   >{props.children}</button>
// )

// const model: Model = {
// }
// interface Model {
//   todos: TODO[]
// }
// interface TODO{
//   name: string
//   description?: string
// }
// export class App extends ElementClass<Model> {
//   render() {
//     return <article>
//       <h3>Welcome {this.props.name}!</h3>

//     </article>
//   }
// }
