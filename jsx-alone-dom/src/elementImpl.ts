import {
  AbstractElementLike,
  AbstractTextNodeLike,
  ElementClass as AbstractElementClass,
  CreateCreateElementConfig,
  JSXAloneComponent
} from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'

export class ElementLikeImpl extends AbstractElementLike<HTMLElement | Text> {
  private _innerHtml: string | undefined
  _elementClassInstance: JSXAloneComponent | undefined
  render(config: ElementLikeImplRenderConfig = {}): HTMLElement | Text {
    const el = document.createElement(this.tag)
    // this is the context in which  function attributes of this and descendants will be evaluated. It's set up by createCreateElementConfig see below.
    const elementClassInstance =
      (this.parentElement && (this.parentElement as ElementLikeImpl)._elementClassInstance) || this._elementClassInstance

    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if (typeof value === 'function') {
        let fn = elementClassInstance ? value.bind(elementClassInstance) : value
        el.addEventListener(attribute.substring(2, attribute.length).toLowerCase(), fn) 
      } else {
        el.setAttribute(attribute, value)
      }
    })
    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }
    this.children.forEach(c => {
      if (elementClassInstance) {
        ;(c as ElementLikeImpl)._elementClassInstance = elementClassInstance || (c as ElementLikeImpl)._elementClassInstance
      }
      c.render({ ...config, parent: el })
    })
    if (config.parent) {
      config.parent.appendChild(el)
    }
    delete this._elementClassInstance
    return el
  }

  dangerouslySetInnerHTML(s: string): void {
    this._innerHtml = s
  }
}

export class TextNodeLikeImpl extends AbstractTextNodeLike<HTMLElement | Text> {
  render(config: ElementLikeImplRenderConfig = {}): HTMLElement | Text {
    const text = document.createTextNode(this.content)
    if (config.parent) {
      config.parent.appendChild(text)
    }
    return text
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<HTMLElement | Text, P> {}

export const createCreateElementConfig: CreateCreateElementConfig = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl,
  functionAttributes: 'preserve',

  onElementCreate({ elementLike, elementClassInstance }: { elementLike: ElementLikeImpl; elementClassInstance?: JSXAloneComponent }) {
    if (elementClassInstance) {
      elementLike._elementClassInstance = elementClassInstance
    }
  }
}
