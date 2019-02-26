import {
  AbstractElementLike,
  AbstractTextNodeLike,
  ElementClass as AbstractElementClass,
} from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'


export class ElementLikeImpl extends AbstractElementLike<HTMLElement | Text> {
  private _innerHtml: string | undefined
 
  render(config: ElementLikeImplRenderConfig = {}): HTMLElement | Text {
    const el = document.createElement(this.tag)
    Object.keys(this.attrs).forEach(attribute => {
      const value = this.attrs[attribute]
      if(!config.handleAttribute||!config.handleAttribute({config, el, attribute, value, elementLike: this})){
        if (typeof value === 'function') {
            el.setAttribute(attribute, value.toString())
          }   else {
          el.setAttribute(attribute, value + '')
        }
      }      
    })
    if (this._innerHtml) {
      el.innerHTML = this._innerHtml
    }
    this.children.forEach(c => {
      if(!config.handleChildRender || !config.handleChildRender({config, parent: el, child: c, elementLike: this})){
        c.render({ ...config, parent: el })
      }
    })
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
}

// export interface ElementLikeImplRenderConfig extends ElementLikeImplRenderConfig {
//   parent?: HTMLElement,
//   dontAddEventListeners?: boolean
//   initialContext?: any
// }

// class AttributeHandlerElement extends ElementLikeImpl {
//   _elementClassInstance: ElementClass | undefined
//   _originalElementClassInstance: ElementClass | undefined

//   render(config: ElementLikeImplRenderConfig = {}): HTMLElement | Text {

//     // this is the context in which  function attributes of this and descendants will be evaluated. It's set up by createCreateElementConfig see below.
//     const elementClassInstance =
//       (this.parentElement && (this.parentElement as ElementLikeImpl)._elementClassInstance) || this._elementClassInstance
//     const functionAttributeContext = elementClassInstance || config.initialContext

//     if (typeof value === 'function') {
//       if (config.dontAddEventListeners) {
//         el.setAttribute(attribute, value.toString())
//       } else {
//         let fn = functionAttributeContext ? value.bind(functionAttributeContext) : value
//         //TODO: el.removeEventListener??
//         el.addEventListener(attribute.substring(2, attribute.length).toLowerCase(), fn)
//         this.attrs[attribute] = undefined // forget the attribute
//       }

//     }

//     // handleChildRender
//       if (isElementLikeImpl(c) && functionAttributeContext) {
//         c._originalElementClassInstance =c._elementClassInstance
//         c._elementClassInstance = elementClassInstance || c._elementClassInstance
//       }
//       c.render({ ...config, parent: el })



//       // .handleAfterRender
//     const elementClassWithContainer = this._originalElementClassInstance || this._elementClassInstance
//     if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
//       elementClassWithContainer.setContainerEl(el)
//     }
//     this._elementClassInstance = undefined // forget the reference
//     this._originalElementClassInstance = undefined // forget the reference



//     // create create config
    
//   onElementCreate({ elementLike, elementClassInstance }: { elementLike: ElementLikeImpl; elementClassInstance?: JSXAloneComponent }) {
//     if (elementClassInstance) {
//       elementLike._elementClassInstance = (elementClassInstance as any) as ElementClass
//     }
//   }
//   }
// }

export class TextNodeLikeImpl extends AbstractTextNodeLike<HTMLElement | Text> {
  render(config: ElementLikeImplRenderConfig = {}): HTMLElement | Text {
    const text = document.createTextNode(this.content)
    if (config.parent) {
      config.parent.appendChild(text)
    }
    return text
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass<HTMLElement | Text, P> {
  /** element classes in DOM implementation will be given its container element. The default implementation just ignore this to keep it lightweight, but other implementations could overwrite this method */
  setContainerEl(el: HTMLElement) {}
}
