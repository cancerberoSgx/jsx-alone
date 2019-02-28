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

## Extras

WARNING - **Not ready for production yet**

So jsx-alone-dom and jsx-alone-string take care of rendering JSX and are as small, fast and simple as possible with some APIs to hook in and extend they behavior. 

For that reason, advanced features such as function attributes, (like `onClick` event handlers), have very limited support in both. This is why, `extra` packages, like `jsx-dom-extra`, provide these features that, although they are cool, add some overhead both in code size and render speed.

`jsx-alone-dom-extra` package has support for cool features like function attributes and stateful components (WIP):

```jsx
import { JSXAlone, StatefulElementClass } from 'jsx-alone-dom-extra'
interface RepeaterP {
  value: string
}
class Repeater extends StatefulElementClass<RepeaterP, RepeaterP> {
  render() {
    return <div className="Repeater">
      Write something:
      <input value={this.state.value} onKeyUp={e => {
          this.setState({ value: e.currentTarget.value })
        }}/>
      <div>
        Will be repeated: <span>{this.state.value}</span>
      </div>
    </div>    
  }
}
interface P {
  people: {
    name: string
  }[]
}
class App extends StatefulElementClass<P, P> {
  render() {
    return  <div className="App">
      <button id="add" onClick={e => this.setState({ people: 
        [...this.state.people, { name: 'random name ' + Math.random() }] })}>          
        add</button>
      <ul>
        {this.state.people.map(p => (
          <li data-id={p.name}>
            <Repeater value={p.name} />
            <button className="remove" onClick={e => {
                this.setState({ people: this.state.people.filter(p2 => p2.name !== p.name) })
              }}
            > remove </button>
          </li>
        ))}
      </ul>
    </div>    
  }
}
// render the App and append the generated element to body
const tasks = ['Wash dishes', 'Go outside', 'Play soccer']
const app = <App name="John Doe" tasks={tasks} />
const el = JSXAlone.render(app)
document.body.appendChild(el)
```

[See it in action (DOM implementation)](https://cancerberosgx.github.io/jsx-alone/jsx-alone-dom-extra/statefulElementClassTestMain/index-min.html)

## State implementations

### DestructiveDomRenderComponent 

WIP

Component state implementation that destroy its current DOM nodes when the state changes and recreates them all again. Has some hacks to maintain current focus and children state. 

### UpdateDomComponent

(Idea)

Component state implementation by biding state properties with DOM elements and changes the DOM only if necessary. (is the contrary to DestructiveDomRenderComponent)


### DestructiveStringRenderComponent

(Idea)

Similar to DestructiveDomRenderComponent, but uses the string implementation. Has some hacks for maintain current focus. 

## The problem of removeEventListener / Component state and life cycle

 * all state implementations will need an api to dispose an elementclass
 * the first need is to callremoveEventListener on nodes that need to be detached
 * introduce a new API destroy() (or componentWill/Did/Mount) - impls will have the change to call removeEventListener now or scheduled in the future

### solution 1

 * elementclass have a collection of refs to those nodes that were addEventListener (if nor user's then we automatically create it)

### solution 2

 * simlar to previouw but in a centraliced Manager independent of elementclass 