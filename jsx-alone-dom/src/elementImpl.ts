import { AbstractElementClass, AbstractElementLike, AbstractTextNodeLike } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig } from './config';

export class ElementLikeImpl extends AbstractElementLike<HTMLElement | Text> {
  private _innerHtml: string|undefined;
  // private _element: HTMLElement | undefined

  render(config: ElementLikeImplRenderConfig={}): HTMLElement | Text {
    // const el = this._getElement()
    const el = document.createElement(this.tag)
    Object.keys(this.attrs).forEach(attribute => {
      el.setAttribute(attribute, this.attrs[attribute])
    })
    if(this._innerHtml){
      el.innerHTML=this._innerHtml
    }
    this.children.forEach(c => {
      c.render({ ...config, parent: el })
    })
    if(config.parent) {
      config.parent.appendChild(el)
    }
    return el
  }

  // private _getElement(): HTMLElement {
  //   if (!this._element) {
  //     this._element = document.createElement(this.tag)
  //   }
  //   return this._element
  // }

  dangerouslySetInnerHTML(s: string): void {
    this._innerHtml= s
  }
}

export class TextNodeLikeImpl extends AbstractTextNodeLike<HTMLElement | Text> {
  // private _node: Text | undefined

  render(config: ElementLikeImplRenderConfig={}): HTMLElement | Text {
    // const n = this._getNode()
    const text = document.createTextNode(this.content)
    if(config.parent) {
      config.parent.appendChild(text)
    }
    return text
  }

  // private _getNode(): Text {
  //   if (!this._node) {
  //     this._node = document.createTextNode(this.content)
  //   }
  //   return this._node
  // }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<HTMLElement | Text, P> {}
