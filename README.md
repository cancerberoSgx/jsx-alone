# JSX Alone 

**Render JSX without libraries like React with 0 overhead**

 * Two implementations: 

   * **string**: to render JSX server side. Compatible with node.js, browser, rhino, Nashorn (and any es5 compatible JS engine)
   * **DOM**: to render JSX in the browser as HTML DOM Elements

 * Very lightweight
 * HTML DOM Typings: it contains typings for HTML DOM just like React so you can type-check your HTML templates
 * No support for **features beyond JSX**: (so we keep them KISS and lightweight) :
   * No virtual dom
   * No stateful components 
   * limited support for function attributes evaluation (event handlers). See below.        //TODO: link
   * ...But expect auxiliary projects that add some of these in the future...

# Usage

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

# render()

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
Notes: 

 * Both implementations have very similar API. The only difference is the call to `JSXAlone.render()`:
  * string implementation returns a string (that can be returned in a http response)
  * DOM implementation returns a HTMLElement (that can appended to the document)


# String implementation

[See jsx-alone-string/README.md](jsx-alone-string/README.md)

# DOM implementation

[See jsx-alone-dom/README.md](jsx-alone-dom/README.md)

# Performance

## interesting moments in rendering

There are two interesting moments when code with JSX is executed. Take for example: 

```jsx
var app = <div></div>
jSXAlone(app)
```
TODO



# Implementation details

## Name equivalences with React

 * the *`JSXAlone` namespace would be equivalent to "React" 
 * Many Ract.* types are available in JSXAlone.* (just types)
 * JSX.Element - the `JSX` type namespace is the same and provided by TypeScript
 * React === JSXAlone 
 * React.createElement === JSXAlone.createElement
 * React.Element === JSXAlone.ElementLike
 * React.Component === JSXAlone.ElementClass (very limited to JSX scope)

## JSXAlone.ElementClass

 * It's a subset of React.Component that only supports : `this.props` and `this.render()`
  * no this.state / this.setState()
  * no willComponentMount, will ComponentUpdate (nor "dir")
  * no refs, context

## Function attributes (event handlers)

In both implementations JSX like the following:

```
<button onClick={e=>{alert('click')}}>click</button>
```

is translated to (dom or string)

```
<button onClick=\"_this = __this__ = this; (e => { alert('click'); }).apply(_this, arguments)\">click</button>
```

Notes : 
 * `_this` is generated by typescript transpiled code to es5
 * the current 



# Limitations

## function attributes (event handlers)

This feature is out of scope for JSX rendering. Some considerations:

 * the functions are rendered using Function.prototype.toString() so they are not transpiled (to es5), so be careful!
 * in both implementations, the functions will be evaluated in a complete different context (the DOM element event handler). None of the variables in the current scope , with exception of `this`,  will be present. 
   * in the dom implementation  globals will be available also, but in string implementation only `this` 
   * in string implementation, even if `this` is available, if a method is called (`this.method()`) it might happen that it ends up calling code that is not available (like a method or function in another file), so be careful.

## React attributes

the library includes HTML typings that were adapted from react. So they declare react non standard things like HTMLInputElement defaultValue attribute. These currently won't work - they will be rendered as attributes and because are non standard won't have effect on the visuals. 

# TODO

 * ISSUE - <If> in dom impl : props.children is array
 * ISSUE string indentation no new lines
 * issue: currently simple example  is combining test utilities so bundle size is big 16 kb and should be no more than 5 kb!
 * performance comparison against other template implementations like js string, handlebars, react, inferno (those that support isomorphic)
 * run dom sample project in jsdom for automatic report
 * React.Fragment
 * createElement is in core and is not extensible. Let implementations hook in attributes, children and text rendering
 * rename ElementLikeImplRenderConfig to ImplRenderConfig
 * remove react non standard attributes from typings
 * we are escaping attribute values in string impl only for function type - should we do it also for the rest ?
# ideas

 * performance: for text we use document.createTextNode(this.content) - maybe is faster to use insertAdjacentText ? 
 * DOM - support for function attributes - don't render as attributes instead use el.addEventListener and bind to function/variable/class element scope somehow.