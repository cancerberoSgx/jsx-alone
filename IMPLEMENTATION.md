# Implementation details

## Name equivalences with React

 * the *`JSXAlone` namespace would be equivalent to `React`
 * Many `Ract.*` types are available in `JSXAlone.*` (just types)
 * `JSX.Element` - the `JSX` type namespace is the same and provided by TypeScript
 * `React` === `JSXAlone` 
 * `React.createElement` === `JSXAlone.createElement`
 * `React.Element` === `JSXAlone.ElementLike`
 * `React.Component` === `JSXAlone.ElementClass` (similar to, only `props` and `render()` available)

## JSXAlone.ElementClass

 * It's a subset of React.Component that only supports : `this.props` and `this.render()`
  * no this.state / this.setState()
  * no willComponentMount, will ComponentUpdate (nor "dir")
  * no refs, context

## Function attributes (event handlers)

### DOM implementation

Is 100% supported in DOM implementation

 * Current issue: function elements dont' have access to its context (`this`) - 
 
### String implementation

String implementation has serious limitations:

A JSX like the following:

```
<button onClick={e=>{alert("click")}}>click</button>
```

is translated to (dom or string)

```
<button onClick="function(e) { alert(&amp;click&amp;); }">click</button>
```

Notes : 
 * arrow is transformed to function because the target is ES5
 * " is replaced with &amp; so html is not invalid

## attribute values

 * boolean values : true sets the attribute name as value, false doesn't se any value
 * in string implementation attribute values needs to replace `"` with `&amp;`
 * in dom implementation function attributes are not rendered.  