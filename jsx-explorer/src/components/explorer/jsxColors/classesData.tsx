import { Base } from './jsxColorsTypes';
/** 
 * Represents class names supported for styling JSX code which is implemented using CSS matching 
 * HTML classes existing in monaco-editor HTML nodes.
 * 
 * Besides defining name and description of a node kind, it defines how to build the CSS selector
 * that match the correct nodes in monaco-editor.
 * 
 */
export interface JsxColorsClass extends Base {

  /** 
   * Identifies a node kind like tag name, attribute name, etc. 
   */
  name: ClassName

  /** 
   * If not defined then just the class in `name` property will be used to build the selector. 
   * 
   * If defined, the style will be built with a selector based on classes in on this property instead of using `name`. 
   * 
   * If a class name in `value` references a class with `value` defined, then also those classes will be used 
   * to build the CSS selector 
   * 
   */
  value?: ClassName[];

  /** 
   * In case value is not null, the selector will be built with classes in values. 
   * 
   * Default is 'intersection'
   *
   * If selectorMode is 'union' then the selector will be `.name1, .name2, .name3, ...` 
   *
   * while if selectorMode is 'intersection' then the selector will be `.name1.name2.name3...` 
   * 
   */
  selectorMode?: 'intersection' | 'union'

}

/** not all classNames exists in the DOM - only thhose used in  Class.value or Class.jsxValue properties */
export enum ClassName {
  'JsxText' = 'JsxText',
  'JsxTagName' = 'JsxTagName',
  'JsxTagNameOpeningElement' = 'JsxTagNameOpeningElement',
  'JsxTagNameClosingElement' = 'JsxTagNameClosingElement',
  'JsxTagNameSelfClosingElement' = 'JsxTagNameSelfClosingElement',
  'JsxAttributesOpeningElement' = 'JsxAttributesOpeningElement',
  'tagName-of-JsxOpeningElement' = 'tagName-of-JsxOpeningElement',
  'tagName-of-JsxClosingElement' = 'tagName-of-JsxClosingElement',
  'tagName-of-JsxSelfClosingElement' = 'tagName-of-JsxSelfClosingElement',
  'JsxElement' = "JsxElement",

  'closingElement-of-JsxElement' = 'closingElement-of-JsxElement',
  'openingElement-of-JsxElement' = 'openingElement-of-JsxElement',

  'JsxExpression' = "JsxExpression",

  'JsxAttribute' = 'JsxAttribute',
  'JsxAttributeName' = 'JsxAttributeName',
  'name-of-JsxAttribute' = 'name-of-JsxAttribute',
  'JsxAttributeNameOpeningElement' = 'JsxAttributeNameOpeningElement',
  'attributes-of-JsxOpeningElement' = 'attributes-of-JsxOpeningElement',
  'initializer-of-JsxAttribute' = 'initializer-of-JsxAttribute',
  'JsxAttributeInitializer' = 'JsxAttributeInitializer',
  'JsxAttributeEqualsToken' = 'JsxAttributeEqualsToken',
  'EqualsToken' = 'EqualsToken',
  'JSXTagGreaterThanTokenSelfClosingElement' = 'JSXTagGreaterThanTokenSelfClosingElement',

  'JsxSelfClosingElement' = 'JsxSelfClosingElement',
  'GreaterThanToken' = 'GreaterThanToken',
  'JSXTagLessThanTokenSelfClosingElement' = 'JSXTagLessThanTokenSelfClosingElement',
  'LessThanToken' = 'LessThanToken',
  'JSXTagSlashTokenSelfClosingElement' = 'JSXTagSlashTokenSelfClosingElement',
  'SlashToken' = 'SlashToken',

  'JSXTagGreaterThanTokenOpeningElement' = 'JSXTagGreaterThanTokenOpeningElement',
  'JSXTagLessThanTokenOpeningElement' = 'JSXTagLessThanTokenOpeningElement',
  'JSXTagGreaterThanTokenClosingElement' = 'JSXTagGreaterThanTokenClosingElement',
  'JSXTagLessThanTokenClosingElement' = 'JSXTagLessThanTokenClosingElement',
  'JSXTagSlashTokenClosingElement' = 'JSXTagSlashTokenClosingElement',

  'JSXTagGreaterThanToken' = 'JSXTagGreaterThanToken',
  'JSXTagLessThanToken' = 'JSXTagLessThanToken',
  'JSXTagSlashToken' = 'JSXTagSlashToken',
   
  'JSXTagLessThanOrGreaterThanToken' = 'JSXTagLessThanOrGreaterThanToken',
  
  'JSXTagTokens'='JSXTagTokens',  
  'JSXTagTokensSelfClosingElement'='JSXTagTokensSelfClosingElement',  
  'JSXTagTokensOpeningElement'='JSXTagTokensOpeningElement',  
  'JSXTagTokensClosingElement'='JSXTagTokensClosingElement',  

     

}

export const jsxColorsClasses: JsxColorsClass[] = [

  {
    name: ClassName['JsxText'],
    description: 'Text in JSX elements body. THe equivalent to HTMLTextNode. For example the expression `<i>hello</i>` has the JSXText `hello`'
  },


  {
    name: ClassName['JsxTagName'],
    description: 'Any tagname in a JSX expression (opening, closing or self closing elements)',
    value: [
      ClassName['tagName-of-JsxOpeningElement'],
      ClassName['tagName-of-JsxClosingElement'],
      ClassName['tagName-of-JsxSelfClosingElement']
    ],
    selectorMode: 'union'
  },


  {
    name: ClassName['JsxAttributeName'],
    description: 'Any attribute name. Can be on an opening tag or on a self closing element tag.',
    value: [ClassName['name-of-JsxAttribute']]

  },
  {
    name: ClassName['JsxAttributeInitializer'],
    description: 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`',
    value: [ClassName['initializer-of-JsxAttribute']]
  },
  {
    name: ClassName['JsxAttributeEqualsToken'],
    description: 'Equals token (`=`) in a JSX attribute assignment like `id="foo"`',
    value: [
      ClassName['JsxAttribute'],
      ClassName['EqualsToken']
    ],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JsxExpression'],
    description: 'JSxExpression is the JavaScript code wrapped with braces inside JSX. For example: `<h1>{props.title}</h1> jas a JSXExpression `{props.title}`. Expressions can exists as text or attribute values. Note: This class has impact only on the braces, not on the inner code.'
  },


  // TOKENS
  {
    name: ClassName['JSXTagTokens'],
    description: `The '<', '>' or '/' characters in any JSX element tag like '<p>', '</p>' or '<br/>'`,
    value: [
      ClassName['JSXTagLessThanTokenOpeningElement'],
      ClassName['JSXTagLessThanTokenClosingElement'],
      ClassName['JSXTagLessThanTokenSelfClosingElement'],
      ClassName['JSXTagGreaterThanTokenOpeningElement'],
      ClassName['JSXTagGreaterThanTokenClosingElement'],
      ClassName['JSXTagGreaterThanTokenSelfClosingElement'],
      ClassName['JSXTagSlashTokenClosingElement'],
      ClassName['JSXTagSlashTokenSelfClosingElement']
    ],
    selectorMode: 'union'
  },
 
  {
    name: ClassName['JSXTagLessThanOrGreaterThanToken'],
    description: `The '<' or '>' characters in any JSX element tag like '<p>', '</p>' or '<br/>'`,
    value: [
      ClassName['JSXTagLessThanTokenOpeningElement'],
      ClassName['JSXTagLessThanTokenClosingElement'],
      ClassName['JSXTagLessThanTokenSelfClosingElement'],
      ClassName['JSXTagGreaterThanTokenOpeningElement'],
      ClassName['JSXTagGreaterThanTokenClosingElement'],
      ClassName['JSXTagGreaterThanTokenSelfClosingElement']
    ],
    selectorMode: 'union'
  },
  {
    name: ClassName['JSXTagLessThanToken'],
    description: `The '<' character in any JSX element tag like '<p>', '</p>' or '<br/>'`,
    value: [
      ClassName['JSXTagLessThanTokenOpeningElement'],
      ClassName['JSXTagLessThanTokenClosingElement'],
      ClassName['JSXTagLessThanTokenSelfClosingElement']
    ],
    selectorMode: 'union'
  },
  {
    name: ClassName['JSXTagSlashToken'],
    description: `The '/' character in a JSX element tag like '</p>' or '<br/>'`,
    value: [
      ClassName['JSXTagSlashTokenClosingElement'],
      ClassName['JSXTagSlashTokenSelfClosingElement']
    ],
    selectorMode: 'union'
  },
  {
    name: ClassName['JSXTagGreaterThanToken'],
    description: `The '>' character in any JSX element tag like '<p>', '</p>' or '<br/>'`,
    value: [
      ClassName['JSXTagGreaterThanTokenOpeningElement'],
      ClassName['JSXTagGreaterThanTokenClosingElement'],
      ClassName['JSXTagGreaterThanTokenSelfClosingElement']
    ],
    selectorMode: 'union'
  },

  {
    name: ClassName['JSXTagTokensOpeningElement'],
    description: `The '<', '>' characters in a JSX opening element tag like '<p>'`,
    value: [
      ClassName['JSXTagLessThanTokenOpeningElement'],
      ClassName['JSXTagGreaterThanTokenOpeningElement'],
    ],
    selectorMode: 'union'
  },
  {
    name: ClassName['JSXTagTokensClosingElement'],
    description: `The '<', '>' or '/' characters in a JSX closing element tag like '</p>'`,
    value: [
      ClassName['JSXTagLessThanTokenClosingElement'],
      ClassName['JSXTagGreaterThanTokenClosingElement'],
      ClassName['JSXTagSlashTokenClosingElement'],
    ],
    selectorMode: 'union'
  },
  {
    name: ClassName['JSXTagTokensSelfClosingElement'],
    description: `The '<', '>' or '/' characters in a JSX self closing element tag like '</p>'`,
    value: [
      ClassName['JSXTagLessThanTokenSelfClosingElement'],
      ClassName['JSXTagGreaterThanTokenSelfClosingElement'],
      ClassName['JSXTagSlashTokenSelfClosingElement'],
    ],
    selectorMode: 'union'
  },
  // LessThanToken JsxSelfClosingElement  -  mtk1 
  // openingElement-of-JsxElement LessThanToken 

  // //  *  JsxSelfClosingElement GreaterThanToken
  //  * SlashToken  JsxSelfClosingElement

  // DotDotDotToken JsxSpreadAttribute 
  // OpenBraceToken JsxSpreadAttribute   (the first '{' in `{...{p}}`)
  // expression-of-JsxSpreadAttribute OpenBraceToken (the second '{' in `{...{p}}`)
  //  expression-of-JsxSpreadAttribute CloseBraceToken 
  // OpenBraceToken JsxSpreadAttribute  ( the second '}' in   `{...{p}}`)

  // more refined tagName:
  {
    name: ClassName['JsxTagNameOpeningElement'],
    description: 'Tag name of an opening element.',
    value: [ClassName['tagName-of-JsxOpeningElement']],
  },
  {
    name: ClassName['JsxTagNameClosingElement'],
    description: 'Tag name of an closing element.',
    value: [ClassName['tagName-of-JsxClosingElement']],
  },

  {
    name: ClassName['JsxTagNameSelfClosingElement'],
    description: 'Tag name of self closing elements.',
    value: [ClassName['tagName-of-JsxSelfClosingElement']],
  },




  // more refined attributes


  {
    name: ClassName['JsxAttributeNameOpeningElement'],
    description: 'Attribute names only in opening elements (not in self closing elements). tagName of an closing element (identifier)',
    value: [
      ClassName['attributes-of-JsxOpeningElement'],
      ClassName['name-of-JsxAttribute']
    ],
    selectorMode: 'intersection'

  },
  {
    name: ClassName['JsxAttributesOpeningElement'],
    description: 'Attributes on opening element (not on self closing element).',
    value: [ClassName['attributes-of-JsxOpeningElement']]
  },





  {
    name: ClassName['JsxElement'],
    description: 'Parent JSX Element node that contains an entire tag, with attributes, children, text and the closing tag. etc'
  },

  {
    name: ClassName['JsxAttribute'],
    description: 'Attribute expressions in any JSX Element.',
  },




 // more refined tokens

  {
    name: ClassName['JSXTagGreaterThanTokenOpeningElement'],
    description: `The '>' character in a JSX opening element tag like '<p>'`,
    value: [ClassName['openingElement-of-JsxElement'], ClassName['GreaterThanToken']],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagLessThanTokenOpeningElement'],
    description: `The '<' character in a JSX opening element tag like '<p>'`,
    value: [ClassName['openingElement-of-JsxElement'], ClassName['LessThanToken']],
    selectorMode: 'intersection'
  },

  {
    name: ClassName['JSXTagGreaterThanTokenClosingElement'],
    description: `The '>' character in a JSX closing element tag like '</div>'`,
    value: [ClassName['closingElement-of-JsxElement'], ClassName['GreaterThanToken']],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagLessThanTokenClosingElement'],
    description: `The '<' character in a JSX closing element tag like '</div>'`,
    value: [ClassName['closingElement-of-JsxElement'], ClassName['LessThanToken']],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagSlashTokenClosingElement'],
    description: `The '/' character in a JSX closing element tag like '</div>'`,
    value: [ClassName['closingElement-of-JsxElement'], ClassName['SlashToken']],
    selectorMode: 'intersection'
  },

  {
    name: ClassName['JSXTagGreaterThanTokenSelfClosingElement'],
    description: `The '>' character in a JSX self closing element tag like '<br/>'`,
    value: [ClassName['JsxSelfClosingElement'], ClassName['GreaterThanToken']],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagLessThanTokenSelfClosingElement'],
    description: `The '<' character in a JSX self closing element tag like '<br/>'`,
    value: [ClassName['JsxSelfClosingElement'], ClassName['LessThanToken']],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagSlashTokenSelfClosingElement'],
    description: `The '/' character in a JSX self closing element tag like '<br/>'`,
    value: [ClassName['JsxSelfClosingElement'], ClassName['SlashToken']],
    selectorMode: 'intersection'
  },

  // mtk1 SlashToken expression-of-ReturnStatement JsxSelfClosingElement
  // LessThanToken GreaterThanToken SlashToken
  // * LessThanToken JsxSelfClosingElement  - 
  //  *  JsxSelfClosingElement GreaterThanToken
  //  * 
  // SlashToken  JsxSelfClosingElement

  // openingElement-of-JsxElement GreaterThanToken

  // LessThanToken closingElement-of-JsxElement 
  // GreaterThanToken closingElement-of-JsxElement 

  // SlashToken

  // t LessThanToken GreaterThanToken SlashToken
]

// function buildClass(name: ClassName, description = name + ': TODO', value?: ClassName[], // , isVirtual = false, //
// jsxValue = value, selectorMode: 'exclude' | 'include' = 'exclude') {return {name, value, // jsxValue, description,
// selectorMode
//   };
// }
/*
*
* open/close tag-names : tagName-of-JsxOpeningElement.JsxText - tagName-of-JsxClosingElement Tag's less-.then
* greater-than: : LessThanToken closingElement-of-JsxElement JsxElement closingElement-of-JsxElement GreaterThanToken
* JsxElement     * Tag's slash token (/) :  SlashToken closingElement-of-JsxElement JsxElement
*
* ## Attributes
*
* attribute name:mtk1 name-of-JsxAttribute attributes-of-JsxOpeningElement attribute's
 * equal token: mtk1 JsxAttribute EqualsToken JsxText attribute
 * value (string):  initializer-of-JsxAttribute  body-of-FunctionDeclaration attribute's
* braces, a={'{'}}, : initializer-of-JsxAttribute OpenBraceToken attributes-of-JsxOpeningElement attribute expression's
* braces (the inner one in a={'{'}{'{'}}) :  expression-of-JsxExpression OpenBraceToken JsxText attribute's expression
* body: (have a JsxText class): name-of-PropertyAssignment JsxText   , JsxText head-of-TemplateExpression space/text in
* between attributes : .JxtText.openingElement-of-JsxElement or closingElement-of-JsxElement text inside element:
* JsxElement JsxText attribute expressions without name (like {'<'}p {'{'}...this.props} >) :
*   * OpenBraceToken JsxSpreadAttribute
*   * expression-of-JsxSpreadAttribute DotToken
*   *  JsxSpreadAttribute CloseBraceToken
*
* ## Self closing elements
*
* tagname:  tagName-of-JsxSelfClosingElement  initializer-of-VariableDeclaration attribute name: name-of-JsxAttribute
* * attr equals token :  JsxAttribute EqualsToken attr expression brace: equals token: initializer-of-JsxAttribute
*   OpenBraceToken less-greater-than tokens of sel closing elements : LessThanToken JsxSelfClosingElement  -
*   JsxSelfClosingElement GreaterThanToken slash token of self closing elements: SlashToken  JsxSelfClosingElement
*/




// type ClassNames = Exclude<keyof typeof classNames, number> type ClassNames =ValueOfStringKeyInArray<typeof t, 'name'>
// Exclude< (typeof t)[keyof typeof t],( (...args: any[])=>any)|number>['name'] Exclude<Extract< (typeof t)[keyof typeof
// t], {name:any}>, Function>['name']

// const classNames=  {'JsxText': {name: 'JsxText', description: 'any HTMLText inside elements. TODO'},
//   'tagName-of-JsxOpeningElement': {name: 'tagName-of-JsxOpeningElement', description: 'any HTMLText inside elements.
//   TODO'}, // 'tagName-of-JsxClosingElement'='tagName-of-JsxClosingElement',
// }

// type tt = ValueOfStringKeyInArray<typeof t, 'name'>/// (typeof t)[Extract<keyof typeof t, number>][

// ClassNames['name']] ['name']



// type fff = ValueOfStringKeyInArray<typeof t, 'name'>

// type ff =  ValueOfStringKeyInArray<typeof t, arrayItemKeyUnion<typeof t>>

// NameOfStringKeyInArray<[{f: 1}, {f: 2}], 'f'> will be 1|2

