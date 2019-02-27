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
    const el = document.createElement(this.tag)
    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if(!config.handleAttribute||!config.handleAttribute({config, el, attribute, value, elementLike: this})){

        if(attribute==='className'){
          attribute='class'
        }

        // if (typeof value === 'function') {
        //     el.setAttribute(attribute, value.toString())
        //   }   
        //   else {
          el.setAttribute(attribute, value)
        // }
      }      
    })
    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }
    else {
      this.children.forEach(c => {
        if(!config.handleChildRender || !config.handleChildRender({config, parent: el, child: c, elementLike: this})){
          (c as ElementLikeImpl).render({ ...config, parent: el })
        }
      })
    }
    if (config.parent) {
      config.parent.appendChild(el)
    }
    if(config.handleAfterRender){
      config.handleAfterRender({config, el, elementLike: this})
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
  setContainerEl(el: HTMLElement) {}
}
