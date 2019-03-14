import { Base } from './jsxColorsTypes';
/** this is like css but here the selectors are ClassName (that target node types/like) and properties are SyntaxSkinProperty*/
interface Class extends Base {
  /** a human name to identify this kind of node/class. It doesn't need to exist in the DOM , unlink value and jsxValue */
  name: ClassName
  /** 
   * the pure class name for any node that can appear in a jsx expression. These classes need to exist in the DOM . 
   * Remember that are nodes that can also appear outside, like `LessThanToken` , GreaterThanToken, SlashToken., etc So if you use this class alone you could effecting the rest of the code. If you only want to affect JSX nodes, then use jsxName
   */
  value: ClassName[];
  /** 
   * Use this multiple class to make sure you wont affect non JSX nodes in the code. See docfor `value`  .The selector  should bemore or as equal as specific to value's
   */
  jsxValue: ClassName[];

  /** if true this name won't be available as a HTML class name in the editor. Was creating to add better/simple  names and will be resolved on non-virtual  `value` or jsx-value` selectors  */
  isVirtual?: boolean

  /** How virtual class names are implemented.  If 'exclude' (default), than the element must match all `values` . Example: `.class1.class2.class3`. If include, then any element that match at least one selector in `value` will match the virtual class name. */
  selectorMode: 'exclude'|'include'
}

/** not all classNames exists in the DOM - only thhose used in  Class.value or Class.jsxValue properties */
export enum ClassName {
  'JsxText' = 'JsxText',
  'tagName' = 'tagName',
  'tagName-of-JsxOpeningElement' = 'tagName-of-JsxOpeningElement',
  'tagName-of-JsxClosingElement' = 'tagName-of-JsxClosingElement',
  'tagName-of-JsxSelfClosingElement'='tagName-of-JsxSelfClosingElement',
  'JsxElement' = "JsxElement",
  'closingElement-of-JsxElement' = 'closingElement-of-JsxElement',
  'JsxExpression' = "JsxExpression",

  'JsxAttribute'='JsxAttribute',  
  'JsxAttributeName'='JsxAttributeName',
  'name-of-JsxAttribute'='name-of-JsxAttribute',
  'attributeNameOpeningElement'='attributeNameOpeningElement',
  'attributes-of-JsxOpeningElement'='attributes-of-JsxOpeningElement',
  // 'attributes-of-JsxOpeningElement'='attributes-of-JsxOpeningElement',
'initializer-of-JsxAttribute'='initializer-of-JsxAttribute',
'JsxAttributeInitializer'='JsxAttributeInitializer',
'JsxAttributeEqualsToken'='JsxAttributeEqualsToken',
'EqualsToken'= 'EqualsToken'

}

function buildClass(name: ClassName, description = name + ': TODO', value: ClassName[]=[name], isVirtual=false, jsxValue = value, selectorMode: 'exclude'|'include'='exclude' ) {
  return {
    name,
    value,
    jsxValue,
    description,
    selectorMode
  };
}
const classes: Class[] = [

  buildClass(ClassName.JsxText, 'any HTMLText inside elements. THe equivalent to HTMLTextNode'),


  buildClass(ClassName.JsxElement, 'Parent JSX Element node that contains an entire tag, with attributes, children, text and the closing tag. etc'),
  // buildClass(ClassName.JsxSelfClosingElement, 'Like JSX Element but for self closing elements. '),
  

  buildClass(ClassName['tagName'], 'Any tagname in a JSX expression (opening, closing or self closing element tag names)', [ClassName['tagName-of-JsxOpeningElement'], ClassName['closingElement-of-JsxElement']], true),

  buildClass(ClassName['tagName-of-JsxOpeningElement'], 'tagName of an opening element (identifier)'),

  buildClass(ClassName['tagName-of-JsxClosingElement'], 'tagName of an closing element (identifier). Also applies to self closing element tag names.'),

  buildClass(ClassName['tagName-of-JsxSelfClosingElement'], 'tagName of self closing element.'),



  buildClass(ClassName['JsxAttribute'], 'A parent tag for attributes in any element.'),
  buildClass(ClassName['JsxAttributeName'], 'Any attribute name. Can be on an opening tag or on a sel closing element tag.', [ClassName['name-of-JsxAttribute']], true),

  buildClass(ClassName['attributeNameOpeningElement'], 'Attribute names only in opening elements (not in self closing elements). tagName of an closing element (identifier)', [ClassName['attributes-of-JsxOpeningElement'],ClassName['name-of-JsxAttribute']]),

buildClass(ClassName['attributes-of-JsxOpeningElement'], 'attributes on opening element (not on self closing element) '),

buildClass(ClassName['initializer-of-JsxAttribute'], 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`'),


buildClass(ClassName['JsxAttributeInitializer'], 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`', [ClassName['initializer-of-JsxAttribute']]),


buildClass(ClassName['JsxAttributeEqualsToken'], 'equals (=) token in attribute assignment', [ClassName['JsxAttribute'], ClassName['EqualsToken']]),






buildClass(ClassName.JsxExpression, 'The inner braces on JSX attribute expressions like `<button onClick={e=>}`'),



//   LessThanToken JsxSelfClosingElement  - 
//  *  JsxSelfClosingElement GreaterThanToken
// * slash token of self closing elements: SlashToken  JsxSelfClosingElement

  


// LessThanToken closingElement-of-JsxElement 

// LessThanToken

// SlashToken

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

