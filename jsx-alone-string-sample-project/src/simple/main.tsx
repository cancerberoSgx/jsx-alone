import { JSXAlone, ElementClass } from 'jsx-alone-string'

export function renderSimple(indent=false) {
  // example function element
  const TaskPageLink = (props: { children: string; task: string }) => <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>
  // example class element that renders given information and uses previous TaskPageLink element
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
                <TaskPageLink task={task}>{task}</TaskPageLink>
              </li>
            ))}
          </ul>
        </article>
      )
    }
  }

  // render the App and append the generated element to body
  const el = <App name="John Doe" tasks={['Wash dishes', 'Go outside', 'Play soccer']} />
  console.time('render')
  const s = JSXAlone.render(el,indent?{indent: true, indentTabSize:2}:{indent: false, indentTabSize: 0})
  console.timeEnd('render')


  return s
}
