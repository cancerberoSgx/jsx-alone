import { createCreateElement, isElementLike, JSXAloneComponent, CreateElementFunction } from 'jsx-alone-core'
import {
  createCreateElementConfig,
  CreateCreateElementDomConfig,
  ElementClass,
  ElementLikeImpl,
  ElementLikeImplRenderConfig,
  TextNodeLikeImpl
} from 'jsx-alone-dom'

type RenderFunction = (el: JSX.Element, config?: FunctionAttributeRenderConfig) => HTMLElement | Text
type JSXAloneType = { render: RenderFunction; createElement: CreateElementFunction<HTMLElement | Text> }

interface FunctionAttributesElement extends ElementLikeImpl {
  _elementClassInstance?: ElementClass | undefined
  _originalElementClassInstance?: ElementClass | undefined
}

export interface CreateCreateElementDomConfig extends CreateCreateElementDomConfig {
  extraRenderConfig?: ElementLikeImplRenderConfig
}

export interface FunctionAttributeRenderConfig extends ElementLikeImplRenderConfig {
  dontAddEventListeners?: boolean
  initialContext?: any
}
function buildExtraConfig(
  rootElementLike: FunctionAttributesElement,
  extraConfig: FunctionAttributeRenderConfig
): ElementLikeImplRenderConfig {
  const configHooks: ElementLikeImplRenderConfig = {
    handleAttribute({ value, el, attribute, elementLike }) {
      if (typeof value === 'function' && !extraConfig.dontAddEventListeners) {
        const { functionAttributeContext } = getFunctionAttributeContextObjects(elementLike, extraConfig.initialContext)
        let fn = functionAttributeContext ? value.bind(functionAttributeContext) : value
        el.addEventListener(attribute.substring(2, attribute.length).toLowerCase(), fn)
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

export const createCreateConfig: CreateCreateElementDomConfig = {
  ...createCreateElementConfig,

  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl,
  functionAttributes: 'preserve',

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
  createElement: createCreateElement<HTMLElement | Text>(createCreateConfig),

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
