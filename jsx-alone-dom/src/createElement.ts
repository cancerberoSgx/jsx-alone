import { createCreateElement, CreateCreateElementConfig, CreateElementFunction, RefObject } from 'jsx-alone-core'
import { ElementLikeImpl, TextNodeLikeImpl, ElementLike } from '.'
import { NodeLike, RenderOutput, ElementLikeImplRenderConfig, IElementClass } from './types';
import { RefObjectImpl } from './Refs';

function buildJSXALone(): JSXAloneType<RenderOutput, ElementLike> {

  const Module: JSXAloneType<RenderOutput, ElementLike> = {

    createElement: createCreateElement<RenderOutput, ElementLike>(getCreateCreateElementConfig()),

    render(el, config = {}) {
      return (el as any as ElementLike).render({ ...config, ...createExtraConfig(el as any as ElementLike) })
    },
    createRef<T extends Element & IElementClass>(): RefObject<T> {
      return new RefObjectImpl<T>()
    }

  }
  return Module
}

function createExtraConfig(rootElementLike: ElementLike) {
  const c: ElementLikeImplRenderConfig = {
    handleAfterRender({ el, elementLike }: { el: HTMLElement; elementLike: ElementLike }) {
      const elementClassWithContainer = elementLike._elementClassInstance || rootElementLike._elementClassInstance
      if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
        elementClassWithContainer.setContainerEl(el)
        if (elementLike.ref) {
          elementClassWithContainer.__addRef({ elementLike, el, value: elementLike.ref })
        }
      }
      return true
    }

  }
  return c
}

type RenderFunction<RenderOutput, R extends ElementLike=ElementLike> = (el: JSX.Element, config?: ElementLikeImplRenderConfig<R>) => RenderOutput

type JSXAloneType<T extends RenderOutput = RenderOutput, R extends ElementLike = ElementLike> = {
  render: RenderFunction<T, R>,
  createElement: CreateElementFunction<T, R>
  createRef<T>(): RefObject<T>
}

let createCreateElementConfig: CreateCreateElementConfig<RenderOutput, ElementLike, IElementClass>
export function getCreateCreateElementConfig() {
  if (!createCreateElementConfig) {
    createCreateElementConfig = {
      impl: ElementLikeImpl,
      textNodeImpl: TextNodeLikeImpl,
      onElementCreated({ elementLike, elementClassInstance, attrs }) {
        if (elementClassInstance) {
          elementLike._elementClassInstance = elementClassInstance
        }
        elementLike.ref = attrs.ref
      },
    }

  }
  return createCreateElementConfig
}

export const JSXAlone: JSXAloneType<RenderOutput, ElementLike> = buildJSXALone()
