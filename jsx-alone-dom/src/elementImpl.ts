import { AbstractElementLike, AbstractTextNodeLike, printStyleHtmlAttribute, RefObject } from 'jsx-alone-core'
import { RefObjectImpl, setRef } from './refs'
import { ElementLike, ElementLikeImplRenderConfig, IElementClass, RenderOutput } from './types'
import { RootEventManager } from './event'
import { ElementClass, isElementClass } from './elementClass';

export class ElementLikeImpl<T extends ElementClass= ElementClass> extends AbstractElementLike<RenderOutput> implements ElementLike {

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

    const {updateExisting, updateExistingRemoveChildrenIfCountDiffer, rootHTMLElement, eventManager, rootElementLike, parent} = config

    let el = updateExisting || rootHTMLElement || this.buildRootElement(config)

    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if (attribute === 'className') {
        el.setAttribute('class', value)
      }
      else if (attribute === 'style') {
        el.setAttribute('style', printStyleHtmlAttribute(value))
      }
      else if (typeof value === 'function') {
        eventManager.addEventListener(el, attribute.replace(/^on/, '').toLowerCase(), value)
      }
      else {
        el.setAttribute(attribute, value)
      }
    })

    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }

    else {

      if (updateExistingRemoveChildrenIfCountDiffer && updateExisting && el.childNodes.length !== this.children.length) {
        el.innerHTML = ''
      }
      this.children.forEach((c, i) => {

        // Heads up: if updateExisting then we don't append new child, just render it and replace the existing child only if !isEqualNode
        const existingChildToUpdateRealNode = updateExisting && updateExisting.childNodes.item(i)
        const tagNameDiffers = existingChildToUpdateRealNode && (existingChildToUpdateRealNode as HTMLElement).tagName && (existingChildToUpdateRealNode as HTMLElement).tagName.toLowerCase() !== (c as ElementLike).tag
        const existingChildToUpdate = tagNameDiffers ? undefined : existingChildToUpdateRealNode

        const cel = c.render({
          ...config,
          updateExisting: existingChildToUpdate || undefined,
          rootHTMLElement: existingChildToUpdate || undefined,
        })
        if (!existingChildToUpdate) {
          if (tagNameDiffers && existingChildToUpdateRealNode) {
            el.insertBefore(cel, existingChildToUpdateRealNode)
          }
          else {
            el.appendChild(cel)
          }
        }
        else if (!existingChildToUpdate.isEqualNode(cel)) {
          existingChildToUpdate.replaceWith(cel)
          eventManager.updateEventListeners(this._elementClassInstance || rootElementLike._elementClassInstance as ElementClass, updateExisting as HTMLElement, el as HTMLElement, this)
        }

      })
    }
    if (parent && !updateExisting) {
      parent.appendChild(el)
    }

    if (this.ref) {
      setRef({ elementLike: this as any, el, value: this.ref as RefObjectImpl<any> })
    }

    const elementClassWithContainer = this._elementClassInstance || rootElementLike._elementClassInstance
    if (elementClassWithContainer) {
      (elementClassWithContainer as any)._eventManager = eventManager
      if (this._elementClassInstance) {
        this._elementClassInstance.afterRender(el)
      }
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

function isSvgTag(t: string) {
  const r = new RegExp(`^${t}$`, 'i')
  return SvgTags.some(name => r.test(name))
}
const SvgTags = ['path', 'svg', 'use', 'g']
