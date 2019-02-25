
# Limitations

## function attributes (event handlers)

This feature is out of scope for JSX rendering. Some considerations:

 * in both implementations, the functions will be evaluated in a complete different context (the DOM element event handler). None of the variables in the current scope , with exception of `this`,  will be present. 
   * in the dom implementation  globals will be available also, but in string implementation only `this` 
   * in string implementation, even if `this` is available, if a method is called (`this.method()`) it might happen that it ends up calling code that is not available (like a method or function in another file), so be careful.
 * the functions are rendered using Function.prototype.toString() . and the transpiled function code will be printed not the real one.

## non standard React attributes

the library includes HTML typings that were adapted from react. So they declare react non standard things like HTMLInputElement defaultValue attribute. These currently won't work - they will be rendered as attributes and because are non standard won't have effect on the visuals. 
