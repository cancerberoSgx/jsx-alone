import { JsxSyntaxSkin, SyntaxSkinProperty } from './jsxColorsTypes';
import { printStyleHtmlAttribute } from 'jsx-alone-dom';
import { CSSProperties, styleObjectToCss } from 'jsx-alone-core';
import { ClassName, JsxColorsClass, jsxColorsClasses } from './classesData';
import { keys } from '../../../util/util';

export function buildCssForSkin(skin: JsxSyntaxSkin): { lightStyles: string, darkStyles: string } {

  const safeOrder : ClassName[] = [ClassName.JsxText, ClassName.JsxExpression] 
  const orderedClasses = keys<ClassName>(skin)
  .filter(c=>skin[c] && typeof skin[c]==='object' && keys(skin[c]!).length// && jsxColorsClasses.find(cl=>cl.name===c)!.value
  )
  .sort((a, b)=>{
    if(safeOrder.includes(a) && safeOrder.includes(b)) {
      return safeOrder.indexOf(a)<safeOrder.indexOf(b) ? -1 : 1
    }
    else  if(safeOrder.includes(a)){
      return -1
    }
    else {
      return 1
    }
  })
const lightStyles = orderedClasses.map(className=>`
${getSelectorFor(jsxColorsClasses.find(c=>c.name===className))} {
  ${styleObjectToCss(skin[className]!, '\n  ')}
}
`.trim()
  
).join('\n')


// debugger
//   const lightStyles = `
// ${skin.JsxText ? `
// .JsxText {
//   ${ styleObjectToCss(skin.JsxText)}
// }
// ` : ``}

// // .JsxExpression {  /* the braces {} in an jsx expression */
// //   color:  #009900
// // }
// // .JsxAttribute.JsxText { /* the = in an attribute decl */
// //   pink
// // }
// // .JsxOpeningElement,
// // .JsxClosingElement {
// //   color: #888811;
// // }
// ${skin.JsxTagName && `
// .JsxSelfClosingElement,
// .tagName-of-JsxOpeningElement,
// .tagName-of-JsxClosingElement,
// .tagName-of-JsxSelfClosingElement {
//   ${ styleObjectToCss(skin.JsxTagName)}
// }
// `}


// `

  const darkStyles = `
  `

  return { lightStyles, darkStyles }


}



function getSelectorFor(c: JsxColorsClass|undefined) {
  if(!c){
    return '.INVALID_CLASS_'+c
  }
  return (c.value || [c.name]).map(c=>`.${c}`).join(c.selectorMode === 'intersection' ? '' : ', ')
}


export function getPropertyDefaultValueForType(t?: PropertyType) {
  return t === 'string' ? '' : t === 'size' ? '1em' : 'sans-serif'
}

export type PropertyType = 'string' | 'color' | 'size' | 'font'


export interface SupportedProperty<T extends keyof CSSProperties= keyof CSSProperties> {
  // p: SyntaxSkinProperty
  propertyName: T
  propertyValue?: CSSProperties[T]
  propertyType?: PropertyType
}

export const supportedProperties: SupportedProperty[] = [
  { propertyName: 'backgroundColor', propertyType: 'color' },
  { propertyName: 'color', propertyType: 'color' },
  { propertyName: 'fontSize', propertyType: 'size' }
]





// ${skin.JsxAttributeName ? `
// .name-of-JsxAttribute {
//   ${ styleObjectToCss(skin.JsxAttributeName)}
// }
// ` : defaultCssFor(ClassName['JsxAttributeName'])}



// const defaultClassCss
// function defaultCssFor(n: ClassName) {
//   if (n === ClassName.JsxAttributeName) {
//     return `
// .name-of-JsxAttribute {
//   color: #f08c36;
// }
// `
//   }
// }

// function buildCssForClass(c: JsxColorsClass, p: SyntaxSkinProperty){
//   const selector = getSelectorFor(c)
//   return `
// ${getSelectorFor(c)} {
//   ${styleObjectToCss(p)}
// }

//   `
// }


// export function formatDate(date: Date, format: 'YYYY-MM-DD' | 'MM/DD/YYYY' = 'YYYY-MM-DD'): string {
//   if (typeof date === 'string') { // happens when serializing dates to json for testing
//     date = new Date(date)
//   }
//   var dd: any = date.getDay();
//   var mm: any = date.getMonth() + 1; //January is 0!
//   var yyyy = date.getFullYear();
//   if (dd < 10) {
//     dd = '0' + dd;
//   }
//   if (mm < 10) {
//     mm = '0' + mm;
//   }
//   if (format === 'YYYY-MM-DD') {
//     return yyyy + '-' + mm + '-' + dd;
//   }
//   else {
//     return `${mm}/${dd}/${yyyy}`;
//   }
// }

// export function formatDateTime(date: Date, format: 'YYYY-MM-DDTHH:MMZ'): string {
//   if (typeof date === 'string') { // happens when serializing dates to json for testing
//     date = new Date(date)
//   }
//   let hh = `${date.getHours()}`.length < 2 ? `0${date.getHours()}` : `${date.getHours()}`
//   let mm = `${date.getMinutes()}`.length < 2 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
//   return `${formatDate(date, 'YYYY-MM-DD')}T${hh}:${mm}`
// }

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

