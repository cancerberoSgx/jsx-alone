import { JSXAlone } from 'jsx-alone-dom';

export const WhatsThis = (props: {}) => <article className="content">
  <h1>JSX Explorer</h1>

  <p>Allow to write JSX code (TypeScript or JavaScript), parse it and then show the structure of the code in different ways: </p>
  <ul>
    <li><strong>Elements Explorer</strong> shows the result JSX expressions translated to <code>React.createElement()</code> or similar call. </li>
    <li><strong>JSX AST Explorer</strong> shows the abstract syntax tree of the JavaScript code</li>
  </ul>
  <p>This project was just a test to see how easy and viable was to build a real world react-like application using <a href="https://github.com/cancerberoSgx/jsx-alone">JSXAlone</a></p>

  <p>While JSXAlone is a lightweight library, this application is not since it loads bulma.css, monaco editor, TypeScript compiler, and ts-simple-ast library.</p>

</article>;
