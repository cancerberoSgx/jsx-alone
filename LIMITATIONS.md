
# Limitations

## function attributes (event handlers)

### DOM implementation

Is 100% supported in  DOM implementation
<!-- DOM implementation has acceptable support as long as: 
 * there is a root element class
 * the context of all descendants function attributes will be that root element class instance
 * the scope  of all descendants function attributes will be that root element class instance render() method -->

### String implementation

string implementation has serious limitations:

 * the functions will be evaluated in a complete different context (the DOM element event handler). None of the variables in the current scope , with exception of `this`,  will be present. 
   *  `this` is available, if a method is called (`this.method()`) it might happen that it ends up calling code that is not available (like a method or function in another file), so be careful.
 * the functions are rendered using Function.prototype.toString() . and the transpiled function code will be printed not the real one.

## non standard React attributes

the library includes HTML typings that were adapted from react. So they declare react non standard things like HTMLInputElement defaultValue attribute. These currently won't work - they will be rendered as attributes and because are non standard won't have effect on the visuals. 
