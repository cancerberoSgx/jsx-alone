# JSX Alone 

**Render JSX without libraries like React with 0 overhead**

 * Two implementations: 

   * **string**: to render JSX server side. Compatible with node.js, browser, rhino, Nashorn (and any es5 compatible JS engine).
   * **DOM**: to render JSX in the browser as HTML DOM Elements.

# Usage

## Install

If you want to render in the browser directly creating DOM Nodes directly:

```sh
npm install jsx-alone-dom
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


# Demos

* Generated html pages, using both implementations are available in [samples](https://cancerberosgx.github.io/jsx-alone/index.html). Some are static html pages generated server side with string implementation and other are JS programs rendering JSX in the browser with DOM implementation.

 * [jsx-explorer](https://cancerberosgx.github.io/jsx-alone/jsx-explorer) (WIP). App using redux, bulma.css, as foundation and toolkits like the TypeScript compiler, monaco-editor, and others 100% client-side using the `jsx-alone-dom`. The objective but trying to play with the implementation on a real world to test DOM implementation, find bugs and limitations, etc. Although WIP I think it might be useful... 


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

# Changelog

See [CHANGELOG.md](CHANGELOG.md)

# Limitations

See [LIMITATIONS.md](LIMITATIONS.md)

# DOM Extras

See [jsx-alone-dom-extras/README.md](jsx-alone-dom/README.md)

# Performance

See [PERFORMANCE.md](PERFORMANCE.md)

# Implementation details

See [IMPLEMENTATION.md](IMPLEMENTATION.md)

# TODO

See [TODO.md](TODO.md)