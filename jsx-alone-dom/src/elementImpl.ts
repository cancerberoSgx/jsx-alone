import { AbstractElementClass, AbstractElementLike, AbstractTextNodeLike } from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'

export class ElementLikeImpl extends AbstractElementLike<HTMLElement | Text> {
  protected _element: HTMLElement

  render(config: ElementLikeImplRenderConfig): HTMLElement | Text {
    const el = this._getElement()
    Object.keys(this.attrs).forEach(attribute=>{
      el.setAttribute(attribute, this.attrs[attribute])
    })
    this.children.forEach(c=>{
      c.render({parent: el})
    })
    config.parent.appendChild(el)
    return el
  }

  protected _getElement(): HTMLElement {
    if (!this._element) {
      this._element = document.createElement(this.tag)
    }
    return this._element
  }

  dangerouslySetInnerHTML(s: string): void {
    this._getElement().innerHTML = s
  }
}

export class TextNodeLikeImpl extends AbstractTextNodeLike<HTMLElement | Text> {
  protected _node: Text;
  render(config: ElementLikeImplRenderConfig): HTMLElement | Text {
    debugger
    const n = this._getNode()
    config.parent.appendChild(n)
    return n
  }
  protected _getNode(): Text {
    if(!this._node){
      this._node = document.createTextNode(this.content)
    }
    return this._node
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<HTMLElement|Text, P> {}
