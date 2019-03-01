# Changelog

I'm making this general changelog for all the projects

## Version before publishing

 * DOM: have 100% support for function attributes (event handlers) - removed from extras
 * BOTH: SVG Support : demos at [string](jsx-alone-string-sample-project/src/simple/main.tsx) and [dom](jsx-alone-dom-sample-project/src/simple/main.tsx)
 * DOM: support for refs: [link](jsx-alone-dom/src/__tests__/refsTest.tsx)
 * CORE: JsonImpl : a simple implementation that renders JSX to JSON - allows me to visualize JSX liks an AST and test generic tools independently
 * DOM event listeners are managed by RootEventManager so we have means of remove them
 * DOM: ElementClass - has destroy and eventManager properties so there's an API for remove event listeners.
 * DOM: JSXAlone provides a property lastEventManager, so callers have an API to remove event listeners.