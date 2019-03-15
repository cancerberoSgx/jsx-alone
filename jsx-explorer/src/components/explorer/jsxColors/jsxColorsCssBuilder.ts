import { JsxSyntaxSkin, SyntaxSkinProperty } from './jsxColorsTypes';
import { printStyleHtmlAttribute } from 'jsx-alone-dom';
import { CSSProperties, styleObjectToCss } from 'jsx-alone-core';
import { ClassName, JsxColorsClass, jsxColorsClasses } from './classesData';
import { keys } from '../../../util/util';

export function buildCssForSkin(skin: JsxSyntaxSkin): { lightStyles: string, darkStyles: string } {

  const orderedClasses = getOrderedClasses(skin)

  const lightStyles = orderedClasses.map(c => `
${buildSelectorFor(c)} {
  ${styleObjectToCss(skin[c.name]!, '\n  ')}
}
`.trim()).join('\n')

  const darkStyles = `
  `

  return { lightStyles, darkStyles }
}

const classesSafeOrderForCss: ClassName[] = [ClassName.JsxText, ClassName.JsxExpression]

function getOrderedClasses(skin: JsxSyntaxSkin): JsxColorsClass[] {
  return keys<ClassName>(skin)
    .filter(c => skin[c] && typeof skin[c] === 'object' && keys(skin[c]!).length)
    .sort((a, b) => {
      if (classesSafeOrderForCss.includes(a) && classesSafeOrderForCss.includes(b)) {
        return classesSafeOrderForCss.indexOf(a) < classesSafeOrderForCss.indexOf(b) ? -1 : 1;
      }
      else if (classesSafeOrderForCss.includes(a)) {
        return -1;
      }
      else {
        return 1;
      }
    })
    .map(className=>jsxColorsClasses.find(c => c.name === className))
    .filter(c=>c) as JsxColorsClass[]
}

function buildSelectorFor(c: JsxColorsClass): string {
  return (c.value || [c.name]).map(className => {
    const valueClass = jsxColorsClasses.find(c=>c.name===className)
    if(valueClass && valueClass.value){
      if(valueClass.name===c.name){
        throw new Error(`Class ${c.name} is referencing itself in its 'value' property`)
      }
      if(valueClass.selectorMode==='union') {
        throw new Error(`'value' property cannot reference a class with selectorMode===union and class ${c.name} value reference class ${valueClass.name} which does.`)
      }
      return buildSelectorFor(valueClass)
    }
    else {
      return `.${className}`
    }
  })
  .join(c.selectorMode === 'union' ? ',\n' : '')
}

