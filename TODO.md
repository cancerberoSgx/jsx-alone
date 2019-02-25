# TODO

 * issue: currently simple example  is combining test utilities so bundle size is big 16 kb and should be no more than 5 kb!
 * test function attributes in DOM with jsdom
 * ISSUE: test that `this` works on function attributes and review if we want that option.
 * ISSUE - <If> in dom impl : props.children is array
 * ISSUE string indentation no new lines
 * performance comparison against other template implementations like js string, handlebars, react, inferno (those that support isomorphic)
 * run dom sample project in jsdom for automatic report
 * React.Fragment
 * createElement is in core and is not extensible. Let implementations hook in attributes, children and text rendering
 * rename ElementLikeImplRenderConfig to ImplRenderConfig
 * remove react non standard attributes from typings or support them
 * rename JSXAloneComponent to JSXAloneClassElement
 * we are escaping attribute values in string impl only for function type - should we do it also for the rest ?


# ideas

 * performance: for text we use document.createTextNode(this.content) - maybe is faster to use insertAdjacentText ? 