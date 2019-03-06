# JSX Explorer

Allow to write JSX code (TypeScript or JavaScript), parse it and then show the structure of the code in different ways:

 * Elements Explorer shows the result JSX expressions translated to React.createElement() or similar call.
 * JSX AST Explorer shows the abstract syntax tree of the JavaScript code

This project was just a test to see how easy and viable was to build a real world react-like application using JSXAlone DOM implementations to render a redux based application. Also to discover bugs or limitations in jsx-alone packages.  

While JSXAlone is a lightweight library, this application is not since it loads bulma.css, monaco-editor, redux, TypeScript compiler, and ts-simple-ast library.


# TODO

 * lots of props in both explorers are not managed by the store.
 * another explorer that shows emitted js code with the createElements

# Notes

issue to ts-simple-ast: getEndLinePos doesn't exist