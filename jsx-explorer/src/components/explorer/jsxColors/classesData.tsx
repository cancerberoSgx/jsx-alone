import { Base } from './jsxColorsTypes';
/** this is like css but here the selectors are ClassName (that target node types/like) and properties are SyntaxSkinProperty*/
interface Class extends Base {
  /** the pure class name for any node that can appear in a jsx expression. Remember that are nodes that can also appear outside, like LessThanToken , GreaterThanToken, SlashToken. So if you use this class alone you could effecting the rest of the code. If you only want to affect JSX nodes, then use jsxName*/
  value: ClassName;
  /** use this multiple class to make sure you wont affect non JSX nodes in the code. See docfor `value` */
  jsxValue: ClassName[];
}

enum ClassName {
  'JsxText' = 'JsxText',
  'tagName-of-JsxOpeningElement' = 'tagName-of-JsxOpeningElement',
  'tagName-of-JsxClosingElement' = 'tagName-of-JsxClosingElement',
  JsxElement = "JsxElement",
  'closingElement-of-JsxElement' = 'closingElement-of-JsxElement'
}

function buildClass(name: ClassName, description = name + ': TODO', jsxValue = [name]) {
  return {
    name: name,
    value: name,
    jsxValue: [name],
    description
  };
}
const classes: Class[] = [
  buildClass(ClassName.JsxElement, 'The root of a JSX expression. It contain all the other JSX* nodes, like the attributes, the tagname, children, etc'),
  buildClass(ClassName.JsxText, 'any HTMLText inside elements. TODO'),
  buildClass(ClassName['tagName-of-JsxOpeningElement'], 'tagName of an opening element (identifier)'),
  buildClass(ClassName['tagName-of-JsxClosingElement'], 'tagName of an closing element (identifier)'),
  buildClass(ClassName.JsxElement, ''),

// t
// LessThanToken 
// GreaterThanToken
// SlashToken
]

/*

* open/close tag-names : tagName-of-JsxOpeningElement.JsxText - tagName-of-JsxClosingElement 
* Tag's less-.then greater-than: :
 * LessThanToken closingElement-of-JsxElement JsxElement  
 * closingElement-of-JsxElement GreaterThanToken JsxElement     * 
* Tag's slash token (/) :  SlashToken closingElement-of-JsxElement JsxElement 

## Attributes

* attribute name:mtk1 name-of-JsxAttribute attributes-of-JsxOpeningElement 
* attribute's equal token: mtk1 JsxAttribute EqualsToken JsxText 
* attribute value (string):  initializer-of-JsxAttribute  body-of-FunctionDeclaration
* attribute's braces, a={'{'}}, : initializer-of-JsxAttribute OpenBraceToken attributes-of-JsxOpeningElement
* attribute expression's braces (the inner one in a={'{'}{'{'}}) :  expression-of-JsxExpression OpenBraceToken JsxText 
* attribute's expression body: (have a JsxText class): name-of-PropertyAssignment JsxText   , JsxText head-of-TemplateExpression 
* space/text in between attributes : .JxtText.openingElement-of-JsxElement or closingElement-of-JsxElement
* text inside element: JsxElement JsxText
* attribute expressions without name (like {'<'}p {'{'}...this.props} >) :
*   * OpenBraceToken JsxSpreadAttribute  
*   * OpenBraceToken JsxSpreadAttribute 
*   * expression-of-JsxSpreadAttribute DotToken  
*   *  JsxSpreadAttribute CloseBraceToken 
* 
## Self closing elements

* tagname:  tagName-of-JsxSelfClosingElement  initializer-of-VariableDeclaration  
* attribute name: name-of-JsxAttribute 
* * attr equals token :  JsxAttribute EqualsToken 
* attr expression brace: equals token: initializer-of-JsxAttribute OpenBraceToken 
* less-greater-than tokens of sel closing elements : 
 * LessThanToken JsxSelfClosingElement  - 
 *  JsxSelfClosingElement GreaterThanToken
* slash token of self closing elements: SlashToken  JsxSelfClosingElement
*/




// type ClassNames = Exclude<keyof typeof classNames, number> 
// type ClassNames =ValueOfStringKeyInArray<typeof t, 'name'>
// Exclude< (typeof t)[keyof typeof t],( (...args: any[])=>any)|number>['name']
// Exclude<Extract< 
// (typeof t)[keyof typeof t]
// , {name:any}>, Function>['name']

// const classNames=  {
//   'JsxText': {name: 'JsxText', description: 'any HTMLText inside elements. TODO'},
//   'tagName-of-JsxOpeningElement': {name: 'tagName-of-JsxOpeningElement', description: 'any HTMLText inside elements. TODO'},
//   // 'tagName-of-JsxClosingElement'='tagName-of-JsxClosingElement',
// }

// type tt = ValueOfStringKeyInArray<typeof t, 'name'>/// (typeof t)[Extract<keyof typeof t, number>][

// ClassNames['name']]
// ['name']



// type fff = ValueOfStringKeyInArray<typeof t, 'name'>

// type ff =  ValueOfStringKeyInArray<typeof t, arrayItemKeyUnion<typeof t>>

// NameOfStringKeyInArray<[{f: 1}, {f: 2}], 'f'> will be 1|2

