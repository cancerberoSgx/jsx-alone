import { Base } from './jsxColorsTypes';
/** 
 * Represents all the classnames supporting for styling the code. 
 *
 * Is like css but here the selectors are ClassName (that target node types/like) and properties are SyntaxSkinProperty
 *
 */
export interface JsxColorsClass extends Base {
  /** a human name to identify this kind of node/class. It doesn't need to exist in the DOM , unlink value and jsxValue
   * */
  name: ClassName
  /** 
   * If defined then the style will be built with a selector based on classes in `value` instead of using name. the pure
   * class name for any node that can appear in a jsx expression. These classes need to exist in the DOM . Remember that
   * are nodes that can also appear outside, like `LessThanToken` , GreaterThanToken, SlashToken., etc So if you use
   * this class alone you could effecting the rest of the code. If you only want to affect JSX nodes, then use jsxName
   */
  value?: ClassName[];

  /** 
   * In case value is not null, the selector will be built with classes in values. 
   * 
   * Default is 'union'
   *
   * If selectorMode === 'intersection' then the selector will be `.name1, .name2, .name3, ...` 
   *
   * while if selectorMode is 'union' then the selector will be `.name1.name2.name3...` 
   * 
   */
  selectorMode?: 'intersection' | 'union'
  
  //  /** 
  //  * Use this multiple class to make sure you wont affect non JSX nodes in the code. See docfor `value`  .The
  //    selector  should bemore or as equal as specific to value's
  //    */
  //  jsxValue: ClassName[];

  // /** if true this name won't be available as a HTML class name in the editor. Was creating to add better/simple
  // names and will be resolved on non-virtual  `value` or jsx-value` selectors  */ isVirtual?: boolean

}

/** not all classNames exists in the DOM - only thhose used in  Class.value or Class.jsxValue properties */
export enum ClassName {
  'JsxText' = 'JsxText',
  'JsxTagName' = 'JsxTagName',
  'JsxTagNameOpeningElement'= 'JsxTagNameOpeningElement',
  'JsxTagNameClosingElement'='JsxTagNameClosingElement',
  'JsxTagNameSelfClosingElement'='JsxTagNameSelfClosingElement',
  'JsxAttributesOpeningElement'='JsxAttributesOpeningElement',
  'tagName-of-JsxOpeningElement' = 'tagName-of-JsxOpeningElement',
  'tagName-of-JsxClosingElement' = 'tagName-of-JsxClosingElement',
  'tagName-of-JsxSelfClosingElement' = 'tagName-of-JsxSelfClosingElement',
  'JsxElement' = "JsxElement",
  'closingElement-of-JsxElement' = 'closingElement-of-JsxElement',
  'JsxExpression' = "JsxExpression",

  'JsxAttribute' = 'JsxAttribute',
  'JsxAttributeName' = 'JsxAttributeName',
  'name-of-JsxAttribute' = 'name-of-JsxAttribute',
  'JsxAttributeNameOpeningElement' = 'JsxAttributeNameOpeningElement',
  'attributes-of-JsxOpeningElement' = 'attributes-of-JsxOpeningElement',
  // 'attributes-of-JsxOpeningElement'='attributes-of-JsxOpeningElement',
  'initializer-of-JsxAttribute' = 'initializer-of-JsxAttribute',
  'JsxAttributeInitializer' = 'JsxAttributeInitializer',
  'JsxAttributeEqualsToken' = 'JsxAttributeEqualsToken',
  'EqualsToken' = 'EqualsToken'

}

export const jsxColorsClasses: JsxColorsClass[] = [

  {
    // buildClass(ClassName['JsxText'], 'any HTMLText inside elements. THe equivalent to HTMLTextNode'),
      name: ClassName['JsxText'],
      description: 'Any HTMLText inside elements. THe equivalent to HTMLTextNode'
    },
    
    {
      // buildClass(, 'Parent JSX Element node that contains an entire tag, with attributes, children, text and the
      // closing tag. etc'),
      name: ClassName['JsxElement'],
      description: 'Parent JSX Element node that contains an entire tag, with attributes, children, text and the closing tag. etc'
    },

    {
      // buildClass(ClassName['JsxTagName'], 'Any tagname in a JSX expression (opening, closing or self closing
      // elements)', [ClassName['tagName-of-JsxOpeningElement'], ClassName['tagName-of-JsxClosingElement'],
      // ClassName['tagName-of-JsxSelfClosingElement']], true),
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
      //   buildClass(ClassName['tagName-of-JsxOpeningElement'], 'tagName of an opening element (identifier)'),
      name: ClassName['JsxTagNameOpeningElement'],
      description: 'Tag name of an opening element.',
      value: [ClassName['tagName-of-JsxOpeningElement']],
    },

    {
      // buildClass(ClassName['tagName-of-JsxClosingElement'], 'tagName of an closing element. Also applies to self closing element tag names.'),
      name: ClassName['JsxTagNameClosingElement'],
      description: 'Tag name of an closing element.',
      value: [ClassName['tagName-of-JsxClosingElement']],
    },

    {
      // buildClass(ClassName['tagName-of-JsxSelfClosingElement'], 'tagName of self closing element.'),
      name: ClassName['JsxTagNameSelfClosingElement'],
      description: 'Tag name of self closing elements.',
      value: [ClassName['tagName-of-JsxSelfClosingElement']],

    },



    {
      // buildClass(ClassName['JsxAttribute'], 'A parent tag for attributes in any element.'),
      name: ClassName['JsxAttribute'],
      description: 'Attribute expressions in any JSX Element.',
    },


    {
      // buildClass(ClassName['JsxAttributeName'], 'Any attribute name. Can be on an opening tag or on a sel closing element tag.', [ClassName['name-of-JsxAttribute']], true),
      name: ClassName['JsxAttributeName'],
      description:  'Any attribute name. Can be on an opening tag or on a sel closing element tag.',
      value: [ClassName['name-of-JsxAttribute']]

    },
    {
      // buildClass(ClassName['JsxAttributeNameOpeningElement'], 'Attribute names only in opening elements (not in self closing elements). tagName of an closing element (identifier)', [ClassName['attributes-of-JsxOpeningElement'], ClassName['name-of-JsxAttribute']]),
      name: ClassName['JsxAttributeNameOpeningElement'],
      description:  'Attribute names only in opening elements (not in self closing elements). tagName of an closing element (identifier)',
      value: [ClassName['attributes-of-JsxOpeningElement'], ClassName['name-of-JsxAttribute']],
      selectorMode: 'intersection'

    },
    {
      // buildClass(ClassName['JsxAttribute'], 'A parent tag for attributes in any element.'),
      name: ClassName['JsxAttributesOpeningElement'],
      description: 'Attributes on opening element (not on self closing element).',
      value: [ClassName['attributes-of-JsxOpeningElement']]
    },
    {
      // buildClass(ClassName['JsxAttributeInitializer'], 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`', [ClassName['initializer-of-JsxAttribute']]),
      name: ClassName['JsxAttributeInitializer'],
      description: 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`',
      value: [ClassName['initializer-of-JsxAttribute']]
    },

  // buildClass(ClassName['initializer-of-JsxAttribute'], 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`'),

  {
    // buildClass(ClassName['JsxAttributeEqualsToken'], 'equals (=) token in attribute assignment', [ClassName['JsxAttribute'], ClassName['EqualsToken']]),
    name: ClassName['JsxAttributeEqualsToken'],
    description: 'Equals token (`=`) in a JSX attribute assignment like `id="foo"`',
    value: [ClassName['initializer-of-JsxAttribute']]
  },


  {
    // buildClass(ClassName.JsxExpression, 'The inner braces on JSX attribute expressions like `<button onClick={e=>}`'),
    name: ClassName['JsxExpression'],
    description:'The inner braces on JSX attribute expressions like `<button onClick={e=>}`'
  },






  // * LessThanToken JsxSelfClosingElement  - 
  //  *  JsxSelfClosingElement GreaterThanToken
  //  * 
  //  * 
  //  * text in between attributes JsxElement JsxText

  //   LessThanToken JsxSelfClosingElement  - 
  //   *  JsxSelfClosingElement GreaterThanToken
  //   * slash token of self closing elements: SlashToken  JsxSelfClosingElement




  // LessThanToken closingElement-of-JsxElement 

  // LessThanToken

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
* attribute name:mtk1 name-of-JsxAttribute attributes-of-JsxOpeningElement attribute's equal token: mtk1 JsxAttribute
* EqualsToken JsxText attribute value (string):  initializer-of-JsxAttribute  body-of-FunctionDeclaration attribute's
* braces, a={'{'}}, : initializer-of-JsxAttribute OpenBraceToken attributes-of-JsxOpeningElement attribute expression's
* braces (the inner one in a={'{'}{'{'}}) :  expression-of-JsxExpression OpenBraceToken JsxText attribute's expression
* body: (have a JsxText class): name-of-PropertyAssignment JsxText   , JsxText head-of-TemplateExpression space/text in
* between attributes : .JxtText.openingElement-of-JsxElement or closingElement-of-JsxElement text inside element:
* JsxElement JsxText attribute expressions without name (like {'<'}p {'{'}...this.props} >) :
*   * OpenBraceToken JsxSpreadAttribute
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

