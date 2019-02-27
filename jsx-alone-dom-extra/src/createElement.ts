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
}

export interface CreateCreateElementDomConfig<R extends FunctionAttributesElement = FunctionAttributesElement> extends CreateCreateElementDomConfig<R> {
  extraRenderConfig?: ElementLikeImplRenderConfig
}
export interface FunctionAttributeRenderConfig extends ElementLikeImplRenderConfig {
  initialContext?: any
}
function buildExtraConfig(
  rootElementLike: FunctionAttributesElement,
  extraConfig: FunctionAttributeRenderConfig
): ElementLikeImplRenderConfig<FunctionAttributesElement> {

  const configHooks: ElementLikeImplRenderConfig<FunctionAttributesElement> = {

    handleAfterRender({ el, elementLike }: { el: HTMLElement; elementLike: FunctionAttributesElement }) {
      const elementClassWithContainer =  elementLike._elementClassInstance || rootElementLike._elementClassInstance
      if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
        elementClassWithContainer.setContainerEl(el)
      }
      elementLike._elementClassInstance = undefined // forget the reference
      return true
    }
  }

  return configHooks
}

export const createCreateConfig: CreateCreateElementDomConfig<FunctionAttributesElement> = {
  ...createCreateElementConfig,

  impl: ElementLikeImpl as any as FunctionAttributesElement & { new(tag: string): FunctionAttributesElement },

  textNodeImpl: TextNodeLikeImpl,

  onElementCreated(config) {
    if (config.elementClassInstance) {
      config.elementLike._elementClassInstance = config.elementClassInstance as any
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

export { ElementClass }
