import { JSXAlone, ElementClass, NodeLike } from 'jsx-alone-dom'
// example element function that accept string as a child and a onClick event handler 
const Button = (props: { children: string; onClick: () => void }) => <button onClick={e => props.onClick()}>{props.children}</button>

// example element class that renders some given information and uses Button
class App extends ElementClass<{
  name: string
  tasks: string[]
}> {
  render() {
    return (
      <article>
        <h3>Welcome {this.props.name}!</h3>
        <p>These are your tasks:</p>
        <ul>
          {this.props.tasks.map(task => (
            <li>
              {task} <Button onClick={() => {}}>Remove</Button>
            </li>
          ))}
        </ul>
      </article>
    )
  }
}

// render the App and append it
const el = JSXAlone.render(<App name="John Doe" tasks={['Wash dishes', 'Go outside']}/>)
document.body.appendChild(el)