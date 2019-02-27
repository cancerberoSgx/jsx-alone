import { createCreateElement, isElementLike, JSXAloneComponent, CreateElementFunction } from 'jsx-alone-core'
import {
  createCreateElementConfig,
  CreateCreateElementDomConfig,
  ElementClass,
  ElementLikeImpl,
  ElementLikeImplRenderConfig,
  TextNodeLikeImpl,
  RenderOutput
} from 'jsx-alone-dom'

type RenderFunction = (el: JSX.Element, config?: FunctionAttributeRenderConfig) => RenderOutput
type JSXAloneType = { render: RenderFunction; createElement: CreateElementFunction<RenderOutput, FunctionAttributesElement> }

export interface FunctionAttributesElement extends ElementLikeImpl {
  _elementClassInstance?: ElementClass | undefined
  _originalElementClassInstance?: ElementClass | undefined
  // _eventListenerList?: EventEntry[]
  // isRoot():boolean
}

// class FunctionAttributesElementImpl extends ElementLikeImpl implements FunctionAttributesElement {
//   _elementClassInstance: ElementClass | undefined
//   _originalElementClassInstance: ElementClass | undefined
//   /** if it has a defined list then we consider this node a root node and it will be responsible of collecting data for un registering event listener of all its "tree" 
//    * TODO: in the future we could also use the root for event delegation.
//   */
//   // _eventListenerList?: EventEntry[]
//   // destroy() {
    
//   // }
//   // isRoot(){
//   //   return this._eventListenerList
//   // }
// }

// type EventEntry<K extends keyof HTMLElementEventMap =  keyof HTMLElementEventMap> = {
//   type: K, 
//   listener: (this: HTMLElement, ev: HTMLElementEventMap[K] ) => any, 
//   options?: boolean | EventListenerOptions
// }

export interface CreateCreateElementDomConfig<R extends FunctionAttributesElement = FunctionAttributesElement> extends CreateCreateElementDomConfig< R> {
  extraRenderConfig?: ElementLikeImplRenderConfig
}
let warn1Once=false
export interface FunctionAttributeRenderConfig extends ElementLikeImplRenderConfig {
  dontAddEventListeners?: boolean
  initialContext?: any
}
function buildExtraConfig(
  rootElementLike: FunctionAttributesElement,
  extraConfig: FunctionAttributeRenderConfig
): ElementLikeImplRenderConfig<FunctionAttributesElement> {

  const configHooks: ElementLikeImplRenderConfig<FunctionAttributesElement> = {
    handleAttribute({ value, el, attribute, elementLike }) {
      if (typeof value === 'function' && !extraConfig.dontAddEventListeners) {
        if(!warn1Once && typeof value.prototype!=='undefined'){
          console.warn('Warning, function attributes in a function are partially supported, `this` won\'t be available.\n Better use an arrow function!')
          warn1Once=true // do this better with a helper
        }
        const { functionAttributeContext } = getFunctionAttributeContextObjects(elementLike, extraConfig.initialContext)
        let listener = functionAttributeContext ? value.bind(functionAttributeContext) : value
        const eventType = attribute.substring(2, attribute.length).toLowerCase() as keyof HTMLElementEventMap
        const options = undefined
        el.addEventListener(eventType, listener, options)
        // if(!elementLike._eventListenerList){
        //   elementLike._eventListenerList = []
        //   // elementLike._destr
        // }
        // elementLike._eventListenerList.push({type: eventType, listener,options})
        // if(!elementLike.){
          // elementLike._eventListenerList = []
        // }

        elementLike.attrs[attribute] = undefined // forget the reference
        return true
      }
      return false
    },
    handleChildRender(config) {
      const { child, parent, elementLike } = config
      const { functionAttributeContext, elementClassInstance } = getFunctionAttributeContextObjects(
        elementLike as FunctionAttributesElement,
        extraConfig.initialContext
      )
      if (functionAttributeContext && isFunctionAttributeElement(child)) {
        child._originalElementClassInstance = child._elementClassInstance
        child._elementClassInstance = elementClassInstance || child._elementClassInstance
      }
      child.render({ ...config, ...configHooks, parent })
      return true
    },
    handleAfterRender({ el, elementLike }: { el: HTMLElement; elementLike: FunctionAttributesElement }) {
      const elementClassWithContainer =
        elementLike._originalElementClassInstance || elementLike._elementClassInstance || rootElementLike._elementClassInstance
      if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
        elementClassWithContainer.setContainerEl(el)
      }
      elementLike._elementClassInstance = undefined // forget the reference
      elementLike._originalElementClassInstance = undefined // forget the reference
      return true
    }
  }

  return configHooks

  function getFunctionAttributeContextObjects(elementLike: FunctionAttributesElement, initialContext: any) {
    const elementClassInstance = (elementLike.parentElement && elementLike._elementClassInstance) || rootElementLike._elementClassInstance
    return { functionAttributeContext: elementClassInstance || initialContext, elementClassInstance }
  }
}

export const createCreateConfig: CreateCreateElementDomConfig<FunctionAttributesElement> = {
  ...createCreateElementConfig,

  // impl: FunctionAttributesElementImpl,
impl: ElementLikeImpl as any as FunctionAttributesElement&{new (tag: string): FunctionAttributesElement },
  textNodeImpl: TextNodeLikeImpl,
  functionAttributes: 'preserve',
  evaluateFunctionsWithNew: true,

  onElementCreated({
    elementLike,
    elementClassInstance
  }: {
    elementLike: FunctionAttributesElement
    elementClassInstance?: JSXAloneComponent
  }) {
    if (elementClassInstance) {
      elementLike._elementClassInstance = (elementClassInstance as any) as ElementClass
    }
  }
}

const Module: JSXAloneType = {
  createElement: createCreateElement<RenderOutput, FunctionAttributesElement>(createCreateConfig),

  render(el, config: FunctionAttributeRenderConfig = {}) {
    const elementLike: FunctionAttributesElement = el as any
    return elementLike.render({ ...config, ...buildExtraConfig(elementLike, { initialContext: config.initialContext || this }) })
  }
}



export const JSXAlone: JSXAloneType = Module

function isFunctionAttributeElement(a: any): a is FunctionAttributesElement {
  return isElementLike(a)
}

export { ElementClass }
