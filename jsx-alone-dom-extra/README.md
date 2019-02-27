# JSX Alone DOM Extra implementation

WARNING: **Not ready for production yet**

## About

To be sincere, `jsx-alone-dom-extra` is now more a research project of mine to research how JSX based Components could be implemented. So the following is just updated of this research and some ideas also.

This research is mostly about how to implement Component state , in different ways and compare different aspects of each other  such as:

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
