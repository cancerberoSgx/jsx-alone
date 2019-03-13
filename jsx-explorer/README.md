# JSX Explorer

Allow to write JSX code (TypeScript or JavaScript), parse it and then show the structure of the code in different ways:

 * Elements Explorer shows the result JSX expressions translated to React.createElement() or similar call.
 * JSX AST Explorer shows the abstract syntax tree of the JavaScript code

This project was just a test to see how easy and viable was to build a real world react-like application using JSXAlone DOM implementations to render a redux based application. Also to discover bugs or limitations in jsx-alone packages.  

While JSXAlone is a lightweight library, this application is not since it loads bulma.css, monaco-editor, redux, TypeScript compiler, and ts-simple-ast library.


# TODO

 * finish src/codeWorker/typeStructure.ts and put it in another repo
 * syntax highlight could be improved : by using hierarchy we dont repeat classes and we have more flexibnilty - test if monaco supports it - is monaco supports adding a classname to a range ?
 * add "Working..." on the state so we show visual progress feedback
 * move test src/__tests__/compileAndEvaluateJsxTest.tsx to a independent project since is good test  of all impls
 * lots of props in both explorers are not managed by the store.
 * another explorer that shows emitted js code with the createElements
 * use monaco to highlight html snippets : https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-syntax-highlighting-for-html-elements

 * issue to ts-simple-ast: getEndLinePos doesn't exist
 * idea for better representing and understanding Types: could be a feature for ts-simple-ast Type.getStructure() : see src/codeWorker/typeStructure.ts 
# Notes



<!-- export NODE_PATH=~/.npm-prefix/lib/node_modules/:../jsx-alone-dom-dom/node_modules/:../../ts-simple-ast/node_modules/ && rm -rf node_modules/ && npm i --prefer-offline -->


    <!-- "preset": "ts-jest/presets/js-with-ts",
    "modulePaths": [
      "<rootDir>/node_modules/",
      "<rootDir>/src",
      "<rootDir>",
      "<rootDir>/dist/",
      "<rootDir>/dist/src/"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json",
      "jsx",
      "node"
    ],
    "browser": true,
    "roots": [
      "<rootDir>",
      "<rootDir>/src",
      "<rootDir>/dist",
      "<rootDir>/dist/src"
    ] -->



    <!-- "test-functional": "npx jest --testRegex \"/__tests__/.*\\.*TestFunctional\\.[t]sx?$\" -c ./jest-functional.config.js",
    "test-functional-watch": "npm run test-functional -- --watch ", -->