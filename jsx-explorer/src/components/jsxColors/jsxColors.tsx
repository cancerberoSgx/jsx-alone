// import { JSXAlone } from 'jsx-alone-dom'
// import * as monaco from 'monaco-editor'
// import { registerStyle } from '../../style/styles';
// import { Component } from '../util/component';
// import { Color } from '../../store/types';

// interface P {
// }

// registerStyle(`
// `)

// export class Editor extends Component<P> {

//   render() {
//     return <div id="editorContainer" className="editorContainer" />
//   }

// }

// interface JsxColors {
//   text:Color
//   expressionBraces: Color
//   attrEquals: Color
//   openingElement: Color
//   closingElement: Color 
//   selfClosingElement: Color
// }

// const lightStyles = `
// .JsxText {
//   color: #5c6773;
// }
// .JsxExpression {  /* the braces {} in an jsx expression */
//   color:  #009900
// }
// .JsxAttribute.JsxText { /* the = in an attribute decl */
//   pink
// }
// .JsxOpeningElement,
// .JsxClosingElement {
//   color: #888811;
// }
// .JsxSelfClosingElement,
// .tagName-of-JsxOpeningElement,
// .tagName-of-JsxClosingElement,
// .tagName-of-JsxSelfClosingElement {
//   color: #41a6d9;
// }
// .name-of-JsxAttribute {
//   color: #f08c36;
// }
// `

//   const darkStyles = `
// .JsxText {
//   color: #8a97b3;
// }
// .JsxExpression {  /* the braces {} in an jsx expression */
//   color:  #00bb00
// }
// .JsxAttribute.JsxText { /* the = in an attribute decl */
//   pink
// }
// .JsxOpeningElement,
// .JsxClosingElement {
//   color: #cccc88;
// }
// .JsxSelfClosingElement,
// .tagName-of-JsxOpeningElement,
// .tagName-of-JsxClosingElement,
// .tagName-of-JsxSelfClosingElement {
//   color: #8dc5d5;
// }
// .name-of-JsxAttribute {
//   color: #f08c36;
// }
// `