import { JsxSyntaxSkin } from './jsxColorsTypes';
import { printStyleHtmlAttribute } from 'jsx-alone-dom';
import { CSSProperties } from 'jsx-alone-core';

export function buildCssForSkin(s: JsxSyntaxSkin):  {lightStyles: string, darkStyles: string} {

  const lightStyles = `
${s.text ? `
.JsxText {
  ${ printStyleHtmlAttribute(s.text)}
  // color: #5c6773;
}
` : ``}

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
`

  const darkStyles = `
  `

  return {lightStyles, darkStyles}


}



export function getPropertyDefaultValueForType(t?: Type) {
  return t === 'string' ? '' : t === 'date' ? formatDate(new Date()) : t === 'size' ? '1em' : 'sans-serif'
}




// export interface PP<T extends keyof CSSProperties> {
//   // p: SyntaxSkinProperty
//   propertyName: T
//   propertyValue?: CSSProperties[T]
//   propertyType?: Type
// }

export function formatDate(date: Date, format: 'YYYY-MM-DD' | 'MM/DD/YYYY' = 'YYYY-MM-DD'): string {
  if (typeof date === 'string') { // happens when serializing dates to json for testing
    date = new Date(date)
  }
  var dd: any = date.getDay();
  var mm: any = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (format === 'YYYY-MM-DD') {
    return yyyy + '-' + mm + '-' + dd;
  }
  else {
    return `${mm}/${dd}/${yyyy}`;
  }
}

export function formatDateTime(date: Date, format: 'YYYY-MM-DDTHH:MMZ'): string {
  if (typeof date === 'string') { // happens when serializing dates to json for testing
    date = new Date(date)
  }
  let hh = `${date.getHours()}`.length < 2 ? `0${date.getHours()}` : `${date.getHours()}`
  let mm = `${date.getMinutes()}`.length < 2 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  return `${formatDate(date, 'YYYY-MM-DD')}T${hh}:${mm}`
}

type Type = 'string' | 'color' | 'date' | 'size' | 'font'


export interface SupportedProperty<T extends keyof CSSProperties= keyof CSSProperties> {
  // p: SyntaxSkinProperty
  propertyName: T
  propertyValue?: CSSProperties[T]
  propertyType?: Type
}

export const supportedProperties: SupportedProperty[] = [
  { propertyName: 'backgroundColor', propertyType: 'color' },
  { propertyName: 'color', propertyType: 'color' },
  { propertyName: 'fontSize', propertyType: 'string' }
]

// export function jsxSyntaxHighlightInstall(editor: monaco.editor.IStandaloneCodeEditor) {

//   const lightStyles = `
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
//   registerStyle(lightStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs ' + l : l).join('\n'))

//   registerStyle(darkStyles.split('\n').map(l => l.trim().startsWith('.') ? '.vs-dark ' + l : l).join('\n'))

// }

