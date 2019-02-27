# Limitations

## function attributes (event handlers)

 * Is 100% supported in `jsx-alone-dom-extra` (DOM implementation). 
 * core implementations `jsx-alone-string` and `jsx-alone-dom` have limited support:
   * functions are rendered using `Function.prototype.toString()`
   * Remember that the function is evaluated in a complete different scope / context (the HTML element's) so there's no access to `this` or current scope variables. 
   * this won't be implemented in core implementations since it will make then heavier and slow, but it's implemented on `-*extra` packages (currently only for DOM)


## non standard React attributes

 * the library includes HTML typings that were adapted from React's. So, they declare react non standard things like `defaultValue` attribute. These currently won't work - they will be rendered as attributes and nothing special is currently made for these. Since these are non standard they won't have effect on the visuals. I leave them there because I have plans to support them in `*-extra` packages in the future.


##  function attributes limitations (event handlers) in deept


Is important to understand the difference between JSX rendering, and features beyond that provided by libraries like React. Take for example the following JSX: 

```jsx
const LoginButton = (props: {clicked: (success:boolean)=>void, label: string}) => 
  <button onClick={async e => {
    const success = await loginService() 
    props.clicked(success)
  }}>
  {props.label}</button>
JSXAlone.render(<LoginButton clicked={success => alert(success)} label="login"></LoginButton>)
```

In core implementations, The render() call will returns a string like the following:

```
<button onClick=\"async (e) => {
    const success = await loginService();
    props.clicked(success);
}\">login</button>
```

This wont work because basically because HTML function attributes execute in a totally different context in which only global variables like window, document or alert() will be available. In this example:

 * `loginService` and `props` will be undefined


### how dom-extras solves the problem

If you use `jsx-alone-dom-extra`, the event handlers will be evaluated in the same context as the code. 

This is possible basically because the functions are not rendered in the HTML, but when the DOM Element is created, an event listener is added to it with the correct context bind to the function. 

Even more, often, render() can be configured (and is the default behavior) to do event delegation so only one event listener is registered. 

But be careful, right now, this is no ready for production, there is no component life cycle implemented unlike React, so currently users are be responsible of manually remove those event listeners in case the elements are unattached from the DOM. 

To be sincere, `jsx-alone-dom-extra` is now more a research project of mine to learn and implement several ways in which JSX components could be implemented in the DOM in a lightweight fashion.



### Understanding

If you use babel or TypeScript to transpile your code to older ES versions (and probably you do) then the output could be something like this:

```
<button onClick=\"function (e) { return __awaiter(_this, void 0, void 0, function () {
  var success;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0: return [4 /*yield*/, loginService()];
      case 1:
        success = _a.sent();
        props.clicked(success);
        return [2 /*return*/];
    }
  });
}); }\">login</button>
```