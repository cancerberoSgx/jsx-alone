import { JSXAlone } from 'jsx-alone-dom'


export const Help = () => <article className="content">

  <h1>JSX syntax highlight editor</h1>

  <p>Here, like in no other editor, you will be able to control every aspect of how your code is shown.</p>

  <p>
    Visualize the Language Abstract syntax tree plyaing with existing skings, and when you are ready go and create your own syntax highlight theme.
    </p>

  <p> have 100% control on  Use the menu below to learn how to use it, experiment existing JSx syntax themes and finally make your own!</p>

  <p>Hope you learn something about JSX syntax while visualizing its parts, and don't worry playing with different font sizes , decorations, colors, etc (nobody is watching)</p>

  <p>Also, make sure you test your syntax highlight in both the dark and light application themes</p>

  <h3>CSS classesOF JSX language elements</h3>

  (TODO: visually document these names)

  <h2>Tags </h2>

  <pre dangerouslySetInnerHTML={{
    __html: `
* open/close tag-names : tagName-of-JsxOpeningElement.JsxText - tagName-of-JsxClosingElement
* Tag's less-.then greater-than: :
    * LessThanToken closingElement-of-JsxElement JsxElement
    * closingElement-of-JsxElement GreaterThanToken JsxElement
* Tag's slash token (/) :  SlashToken closingElement-of-JsxElement JsxElement
    `}} />

  <h2>Attributes</h2>
  <pre dangerouslySetInnerHTML={{
    __html: `
* attribute name:mtk1 name-of-JsxAttribute attributes-of-JsxOpeningElement
* attribute's equal token: mtk1 JsxAttribute EqualsToken JsxText
* attribute value (string):  initializer-of-JsxAttribute  body-of-FunctionDeclaration
* attribute's braces, a={'{'}}, : initializer-of-JsxAttribute OpenBraceToken attributes-of-JsxOpeningElement
* attribute expression's braces (the inner one in a={'{'}{'{'}}) :  expression-of-JsxExpression OpenBraceToken JsxText
* attribute's expression body: (have a JsxText class): name-of-PropertyAssignment JsxText   , JsxText head-of-TemplateExpression
* space/text in between attributes : .JxtText.openingElement-of-JsxElement or closingElement-of-JsxElement
* text inside element: JsxElement JsxText
* attribute expressions without name (like {'<'}p {'{'}...this.props} >) :
    * OpenBraceToken JsxSpreadAttribute
    * OpenBraceToken JsxSpreadAttribute
    * expression-of-JsxSpreadAttribute DotToken
    *  JsxSpreadAttribute CloseBraceToken
    `}} />

  <h2>Self closing elements</h2>

  <pre dangerouslySetInnerHTML={{
    __html: `
* tagname:  tagName-of-JsxSelfClosingElement  initializer-of-VariableDeclaration
* attribute name: name-of-JsxAttribute
* * attr equals token :  JsxAttribute EqualsToken
* attr expression brace: equals token: initializer-of-JsxAttribute OpenBraceToken
  * less-greater-than tokens of sel closing elements :
    * LessThanToken JsxSelfClosingElement  -
    *  JsxSelfClosingElement GreaterThanToken
  * slash token of self closing elements: SlashToken  JsxSelfClosingElement
      `}} />


  <h2>Working CSS example</h2>

  <p>
    The following is the current working theme supporting dark and light themes and customizing almost all aspects of JSX nodes:
 </p>

  <pre dangerouslySetInnerHTML={{
    __html: `
 const lightStyles = \`
 .JsxText {
  color: #5c6773;
 }
 .JsxExpression {  /* the braces {} in an jsx expression */
  color:  #009900
 }
 .JsxAttribute.JsxText { /* the = in an attribute decl */
  pink
 }
 .JsxOpeningElement,
 .JsxClosingElement {
  color: #888811;
 }
 .JsxSelfClosingElement,
 .tagName-of-JsxOpeningElement,
 .tagName-of-JsxClosingElement,
 .tagName-of-JsxSelfClosingElement {
  color: #41a6d9;
 }
 .name-of-JsxAttribute {
  color: #f08c36;
 }
 \`
 
  const darkStyles = \`
 .JsxText {
  color: #8a97b3;
 }
 .JsxExpression {  /* the braces {} in an jsx expression */
  color:  #00bb00
 }
 .JsxAttribute.JsxText { /* the = in an attribute decl */
  pink
 }
 .JsxOpeningElement,
 .JsxClosingElement {
  color: #cccc88;
 }
 .JsxSelfClosingElement,
 .tagName-of-JsxOpeningElement,
 .tagName-of-JsxClosingElement,
 .tagName-of-JsxSelfClosingElement {
  color: #8dc5d5;
 }
 .name-of-JsxAttribute {
  color: #f08c36;
 }
 \`
    
`}} />

</article>