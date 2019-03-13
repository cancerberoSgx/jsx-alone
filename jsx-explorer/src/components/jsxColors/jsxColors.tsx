import { JSXAlone } from 'jsx-alone-dom'
import * as monaco from 'monaco-editor'
import { registerStyle } from '../../style/styles';
import { Component } from '../util/component';
import { Color } from '../../store/types';

interface P {
}

registerStyle(`
`)

export class Editor extends Component<P> {

  render() {
    return <div id="editorContainer" className="editorContainer" />
  }

}

/*

# JSX only things: Things : 

## Tags 

 * open/close tag-names : tagName-of-JsxOpeningElement.JsxText - tagName-of-JsxClosingElement 
 * Tag's less-.then greater-than: :
    * LessThanToken closingElement-of-JsxElement JsxElement  
    * closingElement-of-JsxElement GreaterThanToken JsxElement     * 
 * Tag's slash token (/) :  SlashToken closingElement-of-JsxElement JsxElement 

## Attributes

 * attribute name:mtk1 name-of-JsxAttribute attributes-of-JsxOpeningElement 
 * attribute's equal token: mtk1 JsxAttribute EqualsToken JsxText 
 * attribute value (string):  initializer-of-JsxAttribute  body-of-FunctionDeclaration
 * attribute's braces, a={}, : initializer-of-JsxAttribute OpenBraceToken attributes-of-JsxOpeningElement
 * attribute expression's braces (the inner one in a={{}) :  expression-of-JsxExpression OpenBraceToken JsxText 
 * attribute's expression body: (have a JsxText class): name-of-PropertyAssignment JsxText   , JsxText head-of-TemplateExpression 
 * space/text in between attributes : .JxtText.openingElement-of-JsxElement or closingElement-of-JsxElement
 * text inside element: JsxElement JsxText
 * attribute expressions without name (like <p {...this.props} >) :
 *   * OpenBraceToken JsxSpreadAttribute  
 *   * OpenBraceToken JsxSpreadAttribute 
 *   * expression-of-JsxSpreadAttribute DotToken  
 *   *  JsxSpreadAttribute CloseBraceToken 
 ## Self closing elements

 * tagname:  tagName-of-JsxSelfClosingElement  initializer-of-VariableDeclaration  
 * attribute name: name-of-JsxAttribute 
 * * attr equals token :  JsxAttribute EqualsToken 
 * attr expression brace: equals token: initializer-of-JsxAttribute OpenBraceToken 
  * less-greater-than tokens of sel closing elements : 
    * LessThanToken JsxSelfClosingElement  - 
    *  JsxSelfClosingElement GreaterThanToken
  * slash token of self closing elemnts: SlashToken  JsxSelfClosingElement
*/
interface JsxColors {
  text:Color
  expressionBraces: Color
  attrEquals: Color
  openingElement: Color
  closingElement: Color 
  selfClosingElement: Color
}

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