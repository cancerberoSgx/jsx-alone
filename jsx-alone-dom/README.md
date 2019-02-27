# JSX Alone DOM implementation

```
npm install jsx-alone-dom
```


```jsx
import { JSXAlone, ElementClass } from 'jsx-alone-dom'

// example function element
const TaskPageLink = props => 
  <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>

// example class element that uses previous TaskPageLink element
class App extends ElementClass {
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
const tasks = ['Wash dishes', 'Go outside', 'Play soccer']
const app = <App name="John Doe" tasks={tasks} />
const el = JSXAlone.render(app)
document.body.appendChild(el)
```




## Function Attributes (event handlers) implementation

Supports function attributes evaluation in the current context so you don't have to worry of function binding ord declare global variables. 

This is possible basically because functions are not rendered, but added as event listeners to DOM Elements when they are created, with the correct context bind.

Even more, by default, `render()` does event delegation so only one event listener is registered. (this can be configured though)

But be careful, since  there is no component life cycle implemented unlike React, so currently **you will be responsible of manually remove event listeners in case the elements are unattached from the DOM**. 


