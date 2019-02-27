# JSX Alone 

**Render JSX without libraries like React with 0 overhead**

 * Two implementations: 

   * **string**: to render JSX server side. Compatible with node.js, browser, rhino, Nashorn (and any es5 compatible JS engine)
   * **DOM**: to render JSX in the browser as HTML DOM Elements

# Usage

## Install

If you want to render in the browser directly creating DOM Nodes directly:

```sh
npm install jsx-alone-core jsx-alone-dom
```

Or the same but with a litle bit overhead supporting function attributes (event handlers) 

```sh
npm install jsx-alone-core jsx-alone-dom-extra
```

or for rendering JSx to a string (supports node.js, browser, rhino, and others):

```sh
npm install jsx-alone-string
```

## tsconfig.json

Both implementations needs a `tsconfig.json` with the following properties: 

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "JSXAlone.createElement"
  }
}
```

## render()

```jsx
import { JSXAlone, ElementClass } from 'jsx-alone-dom'

// example function element
const TaskPageLink = props => <a href={`pages/tasks/${props.task}_small.html`}>{props.children}</a>

// render the App and append the generated element to body
const tasks = ['Wash dishes', 'Go outside', 'Play soccer']
const app = <ul>
  {tasks.map(task => <li>
      <TaskPageLink task={task}>{task}</TaskPageLink>
    </li>
  )}
</ul>
const el = JSXAlone.render(app)
document.body.appendChild(el)
```

(See the example: [DOM implementation](https://cancerberosgx.github.io/jsx-alone/jsx-alone-dom-sample-project/simple/index-min.html) and [string implementation](https://cancerberosgx.github.io/jsx-alone/jsx-alone-string-sample-project/simple-indented.html))

Both implementations have very similar API. The only difference is the call to `JSXAlone.render()`:

  * string implementation returns a `string` (that can be returned in a http response)
  * DOM implementation returns a `HTMLElement` (that can appended to the document)
  * `render()` also accepts a an extra parameter for configuration, for example, string implementation can be configured to indent the output code, tab size, etc 

## Extras

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
const app = <App people={[{ name: 'seba' }, { name: 'lau' }]} />
const parent = document.createElement('div')
JSXAlone.render(app, { parent: document.bod, initialContext: this })
```

[See it in action (DOM implementation)](https://cancerberosgx.github.io/jsx-alone/jsx-alone-dom-extra/statefulElementClassTestMain/index-min.html)

# Demos

Generated html pages, using both implementations are available in [samples](https://cancerberosgx.github.io/jsx-alone/index.html). Some are static html pages generated server side with string implementation and other are JS programs rendering JSX in the browser with DOM implementation.


# Motivation / Objectives

 * **JSX rendering only**: Be able to render JSX/TSX without having to use a library that a has lots other features or "way of" doing things 
 * support both DOM rendering and string rendering for server side rendering of static content (stream rendering to come)
 * maintain core implementations lightest and fastest as possible:
   * Light weight DOM implementation: Currently a trivial JSX application using DOM implementation can be bundled in 3KB (gzip).
   * String implementation should be as least as fast as well known template engines like handlebars or lodash's
 * Provide 100% of HTML DOM Typings experience: it contains typings for HTML DOM just like React so you can type-check your HTML templates
 * DOM implementation supports function attributes (event handlers) evaluation access 100% current scope
 * No support for **features beyond JSX**: (so we keep them KISS and lightweight) :
   * No virtual dom
   * No stateful components 
   * String implementation has very limited support function attributes (event handlers) evaluation access current scope (see [limitations](LIMITATIONS.md))
   * *...But expect auxiliary projects that add some of these in the future...*

# String implementation

See  [jsx-alone-string/README.md](jsx-alone-string/README.md)

# DOM implementation

See [jsx-alone-dom/README.md](jsx-alone-dom/README.md)

# Performance

See [PERFORMANCE.md](PERFORMANCE.md)

# Implementation details

See [IMPLEMENTATION.md](IMPLEMENTATION.md)

# Limitations

See [LIMITATIONS.md](LIMITATIONS.md)

# TODO

See [TODO.md](TODO.md)