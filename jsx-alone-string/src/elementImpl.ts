import { AbstractElementLike, AbstractTextNodeLike, ElementClass as AbstractElementClass, styleObjectToCss } from 'jsx-alone-core';
import { defaultRenderConfig, ElementLikeImplRenderConfig } from './config';
import { ElementLike, TextNodeLike } from './types';
import { indent } from './util';

export class ElementLikeImpl extends AbstractElementLike<string> implements ElementLike {

  private innerHtml: string | undefined

  render(config: ElementLikeImplRenderConfig = defaultRenderConfig): string {
    const newLine = config.indent ? `\n` : ``
    const content =
      this.innerHtml ||
      `${newLine}${indent({ ...config, indentLevel: (config.indentLevel || 0) + 1 })}${
      this.children
        .map(c => `${(c as ElementLikeImpl).render({ ...config, indentLevel: (config.indentLevel || 0) + 1 })}`)
        .join('')}${newLine}${indent(config)}`
    return `<${this.tag}${
      Object.keys(this.attrs)
        .map(a => ` ${printHtmlAttribute(a, this.attrs[a])}`)
        .join('')
      }>${content}</${this.tag}>`
  }

  dangerouslySetInnerHTML(s: string): void {
    this.innerHtml = s
  }
}

function printHtmlAttribute(a: string, value: any) {
  if (a === 'style') {
    value = styleObjectToCss(value)
  }
  else if (a === 'className') {
    a = 'class'
  }
  else if (typeof value === 'function') {
    // we reassign _this because typescript emitted code will change the function body "this" for "_this"
    value = `(${value.toString()}).apply(_this=this,arguments)`
  }
  else {
    value = value + ''
  }
  value = value.replace(/\"/gim, '&quot;') // replace(/\"/g, '\\"')
  return `${a}="${value}"`
}

export class TextNodeLikeImpl extends AbstractTextNodeLike<string> implements TextNodeLike {
  render(config?: ElementLikeImplRenderConfig): string {
    return `${this.content}`
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<P> { }
