import { AbstractElementLike, AbstractTextNodeLike, ElementClass as AbstractElementClass, printStyleHtmlAttribute, RefObject } from 'jsx-alone-core'
import { RefObjectImpl, setRef } from './Refs'
import { ElementLike, ElementLikeImplRenderConfig, IElementClass, RenderOutput } from './types'
import { RootEventManager } from './event'

export class ElementLikeImpl<T extends ElementClass= ElementClass> extends AbstractElementLike<RenderOutput> implements ElementLike<T> {
  private _innerHtml: string | undefined
  ref?: RefObject<IElementClass & Element>
  _elementClassInstance: T | undefined

  buildRootElement(config: ElementLikeImplRenderConfig<ElementLikeImpl>): HTMLElement {
    return isSvgTag(this.tag)
      ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
      : document.createElement(this.tag) as any
  }

  render(config: ElementLikeImplRenderConfig<ElementLikeImpl> & {
    eventManager: RootEventManager, rootHTMLElement: HTMLElement
  }): RenderOutput {

    const el = config.rootHTMLElement || this.buildRootElement(config)

    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if (attribute === 'className') {
        el.setAttribute('class', value)
      }
      else if (attribute === 'style') {
        el.setAttribute('style', printStyleHtmlAttribute(value))
      }
      else if (typeof value === 'function') {
        config.eventManager.addEventListener(el, attribute.replace(/^on/, '').toLowerCase(), value.bind(this))
        // el.addEventListener(attribute.replace(/^on/, '').toLowerCase(), value.bind(this))
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
        c.render({ ...config, parent, rootHTMLElement: undefined })
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
      (elementClassWithContainer as any)._eventManager = config.eventManager
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
  destroy() {
  }
  protected _eventManager: RootEventManager = undefined as any
  get eventManager() {
    return this, this._eventManager
  }
}

function isSvgTag(t: string) {
  const r = new RegExp(`^${t}$`, 'i')
  return SvgTags.some(name => r.test(name))
}
const SvgTags = ['path', 'svg', 'use', 'g']
