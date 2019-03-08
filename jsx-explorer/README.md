# JSX Explorer

Allow to write JSX code (TypeScript or JavaScript), parse it and then show the structure of the code in different ways:

 * Elements Explorer shows the result JSX expressions translated to React.createElement() or similar call.
 * JSX AST Explorer shows the abstract syntax tree of the JavaScript code

This project was just a test to see how easy and viable was to build a real world react-like application using JSXAlone DOM implementations to render a redux based application. Also to discover bugs or limitations in jsx-alone packages.  

While JSXAlone is a lightweight library, this application is not since it loads bulma.css, monaco-editor, redux, TypeScript compiler, and ts-simple-ast library.


# TODO

 * in the front we only require   getFile('jsx-alone-core.d.ts') but in the worker we require all files - so big ones are combined in front end - separate them individually so it doesn't happen
 * move test src/__tests__/compileAndEvaluateJsxTest.tsx to a independent project since is good test  of all impls
 * lots of props in both explorers are not managed by the store.
 * another explorer that shows emitted js code with the createElements
 * use monaco to highlight html snippets : https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-syntax-highlighting-for-html-elements

# Notes

issue to ts-simple-ast: getEndLinePos doesn't exist