# JSX Alone DOM implementation

WARNING: **Not ready for production yet**

## About

To be sincere, `jsx-alone-dom-extra` is now more a research project of mine to research how JSX based Components could be implemented. So the following is just updated of this research and some ideas also.

This research is mostly about how to implement Component state and function attributes, in different ways and compare different aspects of each other  such as:

 * API simplicity
 * code maintainability
 * Render speed
 * Memory consumption
 * Library size
 * Behavior after rendering lots of content (responsiveness, CPU, memory, etc).
 * Safety regarding memory leaks 
 * Safety regarding event listeners not removed
 

## Usage


```
npm install jsx-alone-dom-extra
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

Contrarily to core implementations, `jsx-alone-dom-extra` supports function attributes evaluation in the current context so you don't have to worry of function binding ord declare global variables. 

This is possible basically because functions are not rendered, but added as event listeners to DOM Elements when they are created, with the correct context bind.

Even more, by default, `render()` does event delegation so only one event listener is registered. (this can be configured though)

But be careful, right now, this is no ready for production, there is no component life cycle implemented unlike React, so currently **you will be responsible of manually remove event listeners in case the elements are unattached from the DOM**. 






## State implementations

### DestructiveDomRenderComponent 

WIP

Component state implementation that destroy current its current DOM when the state changes and recreates them all again. Has some hacks to maintain current focus and children state. 

### UpdateDomComponent

(Idea)

Component state implementation by biding state properties with DOM elements and changes the DOM only if necessary. (is the contrary to DestructiveDomRenderComponent)


### DestructiveStringRenderComponent

(Idea)

Similar to DestructiveDomRenderComponent, but uses the string implementation. Has some hacks for maintain current focus. 
