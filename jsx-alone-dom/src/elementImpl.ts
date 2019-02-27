import {
  AbstractElementLike,
  AbstractTextNodeLike,
  ElementClass as AbstractElementClass,
} from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'
import { RenderOutput } from './createElement';


export class ElementLikeImpl extends AbstractElementLike<RenderOutput> {
  private _innerHtml: string | undefined

  render(config: ElementLikeImplRenderConfig<ElementLikeImpl> = {}): RenderOutput {
    // TODO: support hook for createElement (is SVG ocument.createElementNS('http://www.w3.org/2000/svg', tagName))

    //TODO: create documentFragment and put el and all the children inside:     const fragment = createFragmentFrom(children)    element.appendChild(fragment)

    const el: HTMLElement = isSvgTag(this.tag)
      ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
      : document.createElement(this.tag) as any

    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if (!config.handleAttribute || !config.handleAttribute({ config, el, attribute, value, elementLike: this })) {
        if (attribute === 'className') {
          el.setAttribute('class', value)
        }
        else if (typeof value === 'function') {
          el.addEventListener(attribute.replace(/^on/, '').toLowerCase(), value.bind(this))
        }
        else {
          el.setAttribute(attribute, value)
        }
      }
    })
    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }
    else {
      this.children.forEach(c => {
        if (!config.handleChildRender || !config.handleChildRender({ config, parent: el, child: c, elementLike: this })) {
          (c as ElementLikeImpl).render({ ...config, parent: el })
        }
      })
    }
    if (config.parent) {
      config.parent.appendChild(el)
    }
    if (config.handleAfterRender) {
      config.handleAfterRender({ config, el, elementLike: this })
    }
    return el
  }

  dangerouslySetInnerHTML(s: string): void {
    this._innerHtml = s
  }
  // destroy(){}
}

export class TextNodeLikeImpl extends AbstractTextNodeLike<RenderOutput> {
  render(config: ElementLikeImplRenderConfig = {}): RenderOutput {
    const text = document.createTextNode(this.content)
    if (config.parent) {
      config.parent.appendChild(text)
    }
    return text
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<RenderOutput, P> {
  /** element classes in DOM implementation will be given its container element. The default implementation just ignore this to keep it lightweight, but other implementations could overwrite this method */
  setContainerEl(el: HTMLElement) { }
}

function isSvgTag(t: string) {
  const r = new RegExp(`^${t}$`, 'i')
  return SvgTags.some(name => r.test(name))
}
const SvgTags = ['path', 'svg', 'use', 'g']