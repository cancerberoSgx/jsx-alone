
# Performance

## interesting moments in rendering

There are two important moments when code with JSX is executed. Take for example: 

```jsx
const app = <div></div>
const output = jSXAlone(app)
```

which is translated to something like 

```js
const app = JSXAlone.createElement("div", { className: "foo" },
    "age: ", JSXAlone.createElement("span", null, 1 + 1));
const result = JSXAlone.render(app);
);
```
I call these two statements: 

 * The first one : **"JSXAlone.createElement"** - will call `JSXAlone.createElement()` recursively through all the JSX.Element tree  and the result is tree of `JSXAlone.NodeLike` instances. This is mostly implemented in `jsx-alone-core` package
 * The second one : **"JSXAlone.render"** - will call `JSXAlone.NodeLike.render()` recursively and the result could be `string` or a `HTMLElement` depending on the implementation used. This is implemented mostly in implementation packages `jsx-alone-string` or `jsx-alone-dom` packages
 * In general also there will be a third moment, this is appending the result element to the DOM, or writing the result string to filesystem or to response stream. But this is not relevant to JSX rendering.

Expectedly, DOM `JSXAlone.render()` implementation is slower than string's while rendering lots of nodes (more than 10000). 

For example, for rendering 100000 nodes, running in the same browser, these are the numbers:

DOM implementation: 
```
JSXAlone.createElement: 174 ms
JSXAlone.render: 644 ms
````

String implementation:

```
JSXAlone.createElement: 177 ms
JSXAlone.render: 302 ms
````

Also DOM implementation memory consumption is a little bit higher than HTML implementation (5% more)

