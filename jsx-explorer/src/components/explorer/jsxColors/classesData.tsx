import { Base } from './jsxColorsTypes';
/** 
 * Represents class names supported for styling JSX code which is implemented using CSS matching HTML classes existing
 * in monaco-editor HTML nodes.
 *
 * Besides defining name and description of a node kind, it defines how to build the CSS selector that match the correct
 * nodes in monaco-editor.
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
   * If a class name in `value` references a class with `value` defined, then also those classes will be used to build
   * the CSS selector 
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

  /**
   * similar to value and selector mode, but just writing the css selector as string. Try to reference names in
   * ClassName enum to avoid incompatibilties in future versions. ie:
   * `.${ClassName['JsxOpeningElement']}.${ClassName['Identifier']}` instead of just `.JsxOpeningElement.Identifier`
   */
  selector?: string

}

/** not all classNames exists in the DOM - only thhose used in  Class.value or Class.jsxValue properties */
export enum ClassName {
  'JsxText' = 'JsxText',
  'JsxTagName' = 'JsxTagName',
  'JsxTagNameOpeningElement' = 'JsxTagNameOpeningElement',
  'JsxTagNameClosingElement' = 'JsxTagNameClosingElement',
  'JsxTagNameSelfClosingElement' = 'JsxTagNameSelfClosingElement',
  'JsxAttributesOpeningElement' = 'JsxAttributesOpeningElement',
  // // 'tagName-of-JsxOpeningElement' = 'tagName-of-JsxOpeningElement', // 'tagName-of-JsxClosingElement' =
  // 'tagName-of-JsxClosingElement', // 'tagName-of-JsxSelfClosingElement' = 'tagName-of-JsxSelfClosingElement',
  'JsxElement' = "JsxElement",

  // // 'closingElement-of-JsxElement' = 'closingElement-of-JsxElement', // 'openingElement-of-JsxElement' =
  // 'openingElement-of-JsxElement',

  'JsxExpression' = "JsxExpression",

  'JsxAttribute' = 'JsxAttribute',
  'JsxAttributeName' = 'JsxAttributeName',
  // // 'name-of-JsxAttribute' = 'name-of-JsxAttribute',
  // 'JsxAttributeNameOpeningElement' = 'JsxAttributeNameOpeningElement',
  // // 'attributes-of-JsxOpeningElement' = 'attributes-of-JsxOpeningElement', // 'initializer-of-JsxAttribute' =
  // 'initializer-of-JsxAttribute',
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

  'JSXTagTokens' = 'JSXTagTokens',
  'JSXTagTokensSelfClosingElement' = 'JSXTagTokensSelfClosingElement',
  'JSXTagTokensOpeningElement' = 'JSXTagTokensOpeningElement',
  'JSXTagTokensClosingElement' = 'JSXTagTokensClosingElement',
  'JsxSpreadAttribute' = 'JsxSpreadAttribute',
  'JsxExpressionTokens' = 'JsxExpressionTokens',
  // // 'expression-of-JsxSpreadAttribute' = 'expression-of-JsxSpreadAttribute',

  'JsxSpreadAttributeDotDotToken' = 'JsxSpreadAttributeDotDotToken',
  'DotDotDotToken' = 'DotDotDotToken',
  'JsxSpreadAttributeOpenBraceToken' = 'JsxSpreadAttributeOpenBraceToken',
  'OpenBraceToken' = 'OpenBraceToken',
  'CloseBraceToken' = 'CloseBraceToken',
  
  'JSXFragmentToken' = 'JSXFragmentToken',
  // // 'openingFragment-of-JsxFragment' = 'openingFragment-of-JsxFragment', // 'closingFragment-of-JsxFragment' =
  // 'closingFragment-of-JsxFragment',
  'JSXOpeningFragmentToken' = 'JSXOpeningFragmentToken',
  'JSXClosingFragmentToken' = 'JSXClosingFragmentToken',

  'JsxSpreadAttributeExpressionOpenBraceToken' = 'JsxSpreadAttributeExpressionOpenBraceToken',
  'JsxSpreadAttributeCloseBraceToken' = 'JsxSpreadAttributeCloseBraceToken',
  'JsxSpreadAttributeExpressionCloseBraceToken' = 'JsxSpreadAttributeExpressionCloseBraceToken',

  'JsxIntrinsicElementTagName' = 'JsxIntrinsicElementTagName',
  'JSXIntrinsicElementChild' = 'JSXIntrinsicElementChild',
  'JsxNonIntrinsicElementTagName' = 'JsxNonIntrinsicElementTagName',
  'JSXNonIntrinsicElementChild' = 'JSXNonIntrinsicElementChild',
  'Identifier' = 'Identifier',
  'JsxOpeningElement' = 'JsxOpeningElement',
  'JsxClosingElement' = 'JsxClosingElement',

}

export const jsxColorsClasses: JsxColorsClass[] = [

  {
    name: ClassName['JsxText'],
    description: 'Text in JSX elements body. THe equivalent to HTMLTextNode. For example the expression `<i>hello</i>` has the JSXText `hello`'
  },


  {
    name: ClassName['JsxTagName'],
    description: 'Any tagname in a JSX expression (opening, closing or self closing elements)',
    selector: `
.${ClassName['JsxOpeningElement']}.${ClassName['Identifier']}, 
.${ClassName['JsxClosingElement']}.${ClassName['Identifier']}, 
.${ClassName['JsxSelfClosingElement']}.${ClassName['Identifier']}
    `
  },

  {
    name: ClassName['JsxIntrinsicElementTagName'],
    description: 'The tag name of intrinsic JSX elements (those tagname starting in lower case). The element can be any of opening, closing or self closing. ',
    value: [
      ClassName['JSXIntrinsicElementChild'],
      ClassName['Identifier'],
    ],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JsxNonIntrinsicElementTagName'],
    description: 'The tag name of intrinsic JSX elements (those with tag name starting in lower case). The element can be any of opening, closing or self closing. ',
    value: [
      ClassName['JSXNonIntrinsicElementChild'],
      ClassName['Identifier'],
    ],
    selectorMode: 'intersection'
  },


  {
    name: ClassName['JsxAttributeName'],
    description: 'Any attribute name. Can be on an opening tag or on a self closing element tag.',
    selector: `.${ClassName['JsxAttribute']}.${ClassName['Identifier']}`

  },
  {
    name: ClassName['JsxAttributeInitializer'],
    description: 'The right-size - initialized expression of an attribute, for example `"foo"` in the expression `<div id="foo"`', 
    selector: `.${ClassName['JsxAttribute']}.${ClassName['Identifier']}`
  },

  // TOKENS
  {
    name: ClassName['JSXTagTokens'],
    description: `The '<', '>' or '/' characters on any JSX element tag like '<p>', '</p>' or '<br/>'`,
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
    name: ClassName['JsxAttributeEqualsToken'],
    description: 'Equals token (`=`) in a JSX attribute assignment like `id="foo"`',
    value: [
      ClassName['JsxAttribute'],
      ClassName['EqualsToken']
    ],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JsxExpressionTokens'],
    description: `The '{', '}' or '.' in JSX expressions like '<C {...props}/>' , '<p style={{margin: 0}}' or '<ul>{list.map(e=><C {...e}/>)}'. Notice that this expressions can appear as attributes and also as text, like in `,
    value: [
      ClassName['JsxExpression'],
      ClassName['JsxSpreadAttribute'],
      // ClassName['expression-of-JsxSpreadAttribute'],
      ClassName['JsxSpreadAttribute']
    ],
    selectorMode: 'union'
  },
  {
    name: ClassName['JsxSpreadAttribute'],
    description: `The characters '{...}' in an JSX attribute expression like '<C {...this.props}/>' on any JSX element tag`,
  },

  {
    name: ClassName['JSXTagLessThanOrGreaterThanToken'],
    description: `The '<' or '>' characters on any JSX element tag like '<p>', '</p>' or '<br/>'`,
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
    description: `The '<' character on any JSX element tag like '<p>', '</p>' or '<br/>'`,
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
    description: `The '>' character on any JSX element tag like '<p>', '</p>' or '<br/>'`,
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

  // more refined tagName:
  {
    name: ClassName['JsxTagNameOpeningElement'],
    description: 'Tag name of an opening element.',
    selector: `.${ClassName['JsxOpeningElement']}.${ClassName['Identifier']}`
  },
  {
    name: ClassName['JsxTagNameClosingElement'],
    description: 'Tag name of an closing element.',
    selector: `.${ClassName['JsxClosingElement']}.${ClassName['Identifier']}`
  },

  {
    name: ClassName['JsxTagNameSelfClosingElement'],
    description: 'Tag name of self closing elements.',
    selector: `.${ClassName['JsxSelfClosingElement']}.${ClassName['Identifier']}`
  },



  // more refined attributes




  {
    name: ClassName['JsxElement'],
    description: 'Parent JSX Element node that contains an entire tag, with attributes, children, text and the closing tag. etc'
  },

  {
    name: ClassName['JsxAttribute'],
    description: 'Attribute expressions on any JSX Element.',
  },




  // more refined tokens

  {
    name: ClassName['JSXTagGreaterThanTokenOpeningElement'],
    description: `The '>' character in a JSX opening element tag like '<p>'`,
    selector: `.${ClassName['JsxOpeningElement']}.${ClassName['GreaterThanToken']}`

    // value: [ClassName['openingElement-of-JsxElement'], ClassName['GreaterThanToken']],
    // selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagLessThanTokenOpeningElement'],
    description: `The '<' character in a JSX opening element tag like '<p>'`,
    selector: `.${ClassName['JsxOpeningElement']}.${ClassName['LessThanToken']}`
    // value: [ClassName['openingElement-of-JsxElement'], ClassName['LessThanToken']],
    // selectorMode: 'intersection'
  },

  {
    name: ClassName['JSXTagGreaterThanTokenClosingElement'],
    description: `The '>' character in a JSX closing element tag like '</div>'`,
    selector: `.${ClassName['JsxClosingElement']}.${ClassName['GreaterThanToken']}`
    // value: [ClassName['closingElement-of-JsxElement'], ClassName['GreaterThanToken']],
    // selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagLessThanTokenClosingElement'],
    description: `The '<' character in a JSX closing element tag like '</div>'`,
    selector: `.${ClassName['JsxClosingElement']}.${ClassName['LessThanToken']}`
    // value: [ClassName['closingElement-of-JsxElement'], ClassName['LessThanToken']],
    // selectorMode: 'intersection'
  },
  {
    name: ClassName['JSXTagSlashTokenClosingElement'],
    description: `The '/' character in a JSX closing element tag like '</div>'`,
    selector: `.${ClassName['JsxClosingElement']}.${ClassName['SlashToken']}`
    // value: [ClassName['closingElement-of-JsxElement'], ClassName['SlashToken']],
    // selectorMode: 'intersection'
  },

  {
    name: ClassName['JSXTagGreaterThanTokenSelfClosingElement'],
    description: `The '>' character in a JSX self closing element tag like '<br/>'`,
    selector: `.${ClassName['JsxSelfClosingElement']}.${ClassName['GreaterThanToken']}`
    // value: [ClassName['JsxSelfClosingElement'], ClassName['GreaterThanToken']],
    // selectorMode: 'intersection'
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

  {
    name: ClassName['JsxSpreadAttributeDotDotToken'],
    description: `The '...' in any JSX expression like '<C {...props}/>'`,
    value: [ClassName['JsxSpreadAttribute'], ClassName['DotDotDotToken']],
    selectorMode: 'intersection'
  },
  {
    name: ClassName['JsxSpreadAttributeOpenBraceToken'],
    description: `The outer (first) '{' character in any JSX expression like '<C {...{...o}}/>'`,
    value: [ClassName['JsxSpreadAttribute'], ClassName['OpenBraceToken']],
    selectorMode: 'intersection'
  },
  // {
  //   name: ClassName['JsxSpreadAttributeExpressionOpenBraceToken'],
  //   description: `The the inner (second) '{' characters in any JSX expression like '<C {...{...o}}/>'`,
  //   value: [ClassName['expression-of-JsxSpreadAttribute'], ClassName['OpenBraceToken']],
  //   selectorMode: 'intersection'
  // },
  // {
  //   name: ClassName['JsxSpreadAttributeCloseBraceToken'],
  //   description: `The outer (first) '{' character in any JSX expression like '<C {...{...o}}/>'`,
  //   value: [ClassName['JsxSpreadAttribute'], ClassName['CloseBraceToken']],
  //   selectorMode: 'intersection'
  // },
  // {
  //   name: ClassName['JsxSpreadAttributeExpressionCloseBraceToken'],
  //   description: `The the inner (second) '{' characters in any JSX expression like '<C {...{...o}}/>'`,
  //   value: [ClassName['expression-of-JsxSpreadAttribute'], ClassName['CloseBraceToken']],
  //   selectorMode: 'intersection'
  // },

  // // fragments
  // {
  //   name: ClassName['JSXFragmentToken'],
  //   description: `The '<', '>' and '/' characters in a JSX Fragment expression like '<>hello</>'`,
  //   value: [ClassName['openingFragment-of-JsxFragment'], ClassName['closingFragment-of-JsxFragment']],
  //   selectorMode: 'union'
  // },
  // {
  //   name: ClassName['JSXOpeningFragmentToken'],
  //   description: `The '<', '>' and '/' characters in a JSX Fragment expression like '<>hello</>'`,
  //   value: [ClassName['openingFragment-of-JsxFragment']],
  // },
  // {
  //   name: ClassName['JSXClosingFragmentToken'],
  //   description: `The '<', '>' and '/' characters in a JSX Fragment expression like '<>hello</>'`,
  //   value: [  ClassName['closingFragment-of-JsxFragment']],
  // },


]
