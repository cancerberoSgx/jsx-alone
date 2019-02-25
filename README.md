# JSX Alone 

**Render JSX without libraries like React with 0 overhead**

 * Two implementations: 

   * **string**: to render JSX server side. Compatible with node.js, browser, rhino, Nashorn (and any es5 compatible JS engine)
   * **DOM**: to render JSX in the browser as HTML DOM Elements

# Usage

## Install
```
npm install jsx-alone-core jsx-alone-dom
```

or 

```
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

Both implementations have very similar API. The only difference is the call to `JSXAlone.render()`:

  * string implementation returns a `string` (that can be returned in a http response)
  * DOM implementation returns a `HTMLElement` (that can appended to the document)
  * `render()` also accepts a an extra parameter for configuration, for example, string implementation can be configured to indent the output code, tab size, etc 

# Demos

Generated html pages, using both implementations are available in [samples](https://cancerberosgx.github.io/jsx-alone/index.html). Some are static html pages generated server side with string implementation and other are JS programs rendering JSX in the browser with DOM implementation.


# Motivation

 * **JSX rendering only**: Be able to render JSX/TSX without having to use a library that a has lots other features or "way of" doing things 
 * maintain core implementations lightest and fastest as possible
 * support both DOM rendering and string rendering for server side rendering of static content (stream rendering to come)
 * Provide 100% of HTML DOM Typings experience: it contains typings for HTML DOM just like React so you can type-check your HTML templates
 * No support for **features beyond JSX**: (so we keep them KISS and lightweight) :
   * No virtual dom
   * No stateful components 
   * very limited support for function attributes in string implementation (event handlers) (see [limitations](LIMITATIONS.md))
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