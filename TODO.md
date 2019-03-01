# TODO


  // tests with lots of event listeners and lots of calls and runner
  // another EventManager that is not root - and compare performance
  // runner - measure also memory consumption
  
 * StateFulComponent sample events are broken

 * ISSUE this is a bad design - we have two layers in rendering that are iterating atributes adnd childrens twice and creating memory objkects twice: Lternatively, we could re- implement diferently - for ex, in DOM elementlike.setAttribute will currently call setattribute on the real element / and in string - it will concat the attrbute to an existing buffer. Then at onElementReady we know it finish and we have everything rendered, instead of re-iterate like we are doing now.

 * ISSUE - <If> in dom impl : props.children is array

 * the problem with dependency injection in sample-code project can be resolved by passing JSXAlone instance from invocator

 * core: interface ElementLike should BE or implementing JSX.Element where tag is type and attrs is props
 
 * improve: stateful element. when parent is updated,children state is reset

 * test in old browsers / rhino (should work on IE8)
 * DOM :  support hook for createelement (is SVG ocument.createElementNS('http://www.w3.org/2000/svg', tagName))
 * DOM create documentFargment and put el and all the children inside:     const fragment = createFragmentFrom
 * performance comparison against other template implementations like js string, handlebars, react, inferno (those that support isomorphic)

 * performance: DOM, could we event delegate instead of installing a listener on each el?

 * React.Fragment

 * createElement is in core and is not extensible. Let implementations hook in attributes, children and text rendering

 * string impl: implement event delegation (another functionattributes mode so the output is smaller)
 * rename ElementLikeImplRenderConfig to ImplRenderConfig

 * remove react non standard attributes from typings or support them. see declaration: 
    // React-specific Attributes
    defaultChecked?: boolean;
    defaultValue?: string | string[];
    suppressContentEditableWarning?: boolean;
    suppressHydrationWarning?: boolean;


 * rename JSXAloneComponent to JSXAloneClassElement

 * we are escaping attribute values in string impl only for function type - should we do it also for the rest ?

# ideas


 * performance: for text we use document.createTextNode(this.content) - maybe is faster to use insertAdjacentText ? 

 * write an app (with DOM impl) that is like an AST viewer for JSX - based on DummyImpl