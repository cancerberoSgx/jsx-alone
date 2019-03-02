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

    const el = config.updateExisting||config.rootHTMLElement || this.buildRootElement(config)

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
      }
      else {
        el.setAttribute(attribute, value)
      }
    })
    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }
    else {
      this.children.forEach((c, i) => {
        // Heads up: if config.updateExisting then we don't append new child, just render it and replace the existing child only if !isEqualNode
        const existingChildToUpdate = config.updateExisting&& config.updateExisting!.childNodes.item(i)
        const cel = c.render({ ...config, 
          updateExisting: existingChildToUpdate||undefined ,
          rootHTMLElement: existingChildToUpdate||undefined ,
        }) as HTMLElement
        if(!existingChildToUpdate){
          el.appendChild(cel)
        }
        else if(!existingChildToUpdate.isEqualNode(cel)) {
            existingChildToUpdate.replaceWith(cel)
        }
        // otherwise means node to update is equals to the new one
      })
    }
    if (config.parent &&!config.updateExisting) {
      config.parent.appendChild(el)
    }
    console.log(this._elementClassInstance, config.rootElementLike._elementClassInstance);
    
    if (this.ref) {
      setRef({ elementLike: this as any, el, value: this.ref as RefObjectImpl<any> })
    }
    const elementClassWithContainer = this._elementClassInstance || config.rootElementLike._elementClassInstance
    if (elementClassWithContainer) {
      (elementClassWithContainer as any)._eventManager = config.eventManager
      elementClassWithContainer.setContainerEl(el)
      if (this._elementClassInstance) {
        this._elementClassInstance.afterRender()
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
