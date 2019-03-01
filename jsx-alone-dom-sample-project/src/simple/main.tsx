import { JSXAlone, ElementClass } from 'jsx-alone-dom'

// example function element
const TaskPageLink = (props: {
  children: string
  task: string
}) => <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>

interface P {
  name: string
  tasks: string[]
}

// example class element that renders given information and uses previous TaskPageLink element
class App extends ElementClass<P> {
  render() {
    return <article>
      <h3>Welcome {this.props.name}!</h3>
      <p>These are your tasks:</p>
      <ul>{this.props.tasks.map(task => <li>
        <TaskPageLink task={task}>{task}</TaskPageLink>
      </li>)}
      </ul>

      <h2>
        Tests with event handlers
          </h2>
      <p>Accessing HTMLElement using `this` dont' work because this has the correct context:<button onClick={e => alert(`${(this as any).tagName} text is ${(this as any).textContent}`)}>should work</button></p>
      <p>Accessing event argument works::<button onClick={e => alert(`${e.currentTarget.tagName} text is ${e.currentTarget.textContent}`)}>should work</button></p>
      <p>Accessing variables in scope works:<button onClick={e => alert(dummy('So '))}>don't work</button></p>
      <p>Accessing members (this.) works: <button onClick={e => alert(this.dummy('So '))}>method</button></p>

      <h2>
        Tests with SVG
          </h2>
      <svg
        viewBox="0 0 141 41"
        width="500px" height="300px">
        <text fill="green">hello world</text>
        <path
          d="M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z"
          transform="translate(-241.74 -380.43)"
          style={{ fill: '#ffcd05' }}
        />
      </svg>

    </article>
  }
  dummy(n: any) { return n + '_dummy' }
}
function dummy(n: any) { return n + '_dummy' }

// render the App and append the generated element to body
const app = <App name="John Doe" tasks={['Wash dishes', 'Go outside', 'Play soccer']} />
const el = JSXAlone.render(app)
document.body.appendChild(el)
