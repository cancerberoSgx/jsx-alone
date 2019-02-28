import { AbstractElementLike, AbstractTextNodeLike, ElementClass as AbstractElementClass, printStyleHtmlAttribute, RefObject } from 'jsx-alone-core';
import { RefObjectImpl, setRef } from './Refs';
import { ElementLike, ElementLikeImplRenderConfig, IElementClass, RenderOutput } from './types';

export class ElementLikeImpl<T extends ElementClass=ElementClass> extends AbstractElementLike<RenderOutput> implements ElementLike<T> {
  private _innerHtml: string | undefined
  ref?: RefObject<IElementClass & Element>
  _elementClassInstance: T | undefined

  render(config: ElementLikeImplRenderConfig<ElementLikeImpl>): RenderOutput {
    // TODO: support hook for createElement (is SVG document.createElementNS('http://www.w3.org/2000/svg', tagName))

    //TODO: create documentFragment and put el and all the children inside:     const fragment = createFragmentFrom(children)    element.appendChild(fragment)

    const el: HTMLElement = isSvgTag(this.tag)
      ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
      : document.createElement(this.tag) as any

    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if (attribute === 'className') {
        el.setAttribute('class', value)
      }
      else if (attribute === 'style') {
        el.setAttribute('style', printStyleHtmlAttribute(value))
      }
      else if (typeof value === 'function') {
        debugger
        el.addEventListener(attribute.replace(/^on/, '').toLowerCase(), value.bind(this))
      }
      else {
        el.setAttribute(attribute, value)
      }
    })
    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }
    else {
      const parent: Node = config.appendChildrenInDocumentFragment ? document.createDocumentFragment() : el
      this.children.forEach(c => {
        c.render({ ...config, parent })
      })
      if (el !== parent) {
        el.appendChild(parent)
      }
    }
    if (config.parent) {
      config.parent.appendChild(el)
    }
    const elementClassWithContainer = this._elementClassInstance || config.rootElementLike._elementClassInstance
    if (this.ref) {
      setRef({ elementLike: this as any, el, value: this.ref as RefObjectImpl<any> })
    }
    if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
      elementClassWithContainer.setContainerEl(el)
    }
    return el
  }

  dangerouslySetInnerHTML(s: string): void {
    this._innerHtml = s
  }

}

export class TextNodeLikeImpl extends AbstractTextNodeLike<RenderOutput> {
  render(config: ElementLikeImplRenderConfig): RenderOutput {
    const text = document.createTextNode(this.content)
    if (config.parent) {
      config.parent.appendChild(text)
    }
    return text
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<P> implements IElementClass<P> {
  containerEl: HTMLElement | undefined
  setContainerEl(el: HTMLElement) {
    this.containerEl = el
  }
}
function isSvgTag(t: string) {
  const r = new RegExp(`^${t}$`, 'i')
  return SvgTags.some(name => r.test(name))
}
const SvgTags = ['path', 'svg', 'use', 'g']