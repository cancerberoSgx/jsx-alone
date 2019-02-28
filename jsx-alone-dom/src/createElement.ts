import { createCreateElement, CreateCreateElementConfig, CreateElementFunction, RefObject } from 'jsx-alone-core'
import { ElementLikeImpl, TextNodeLikeImpl, ElementLike } from '.'
import { NodeLike, RenderOutput, ElementLikeImplRenderConfig, IElementClass, ElementLikeImplRenderConfigNoRoot } from './types';
import { RefObjectImpl, setRef } from './Refs';
import { RootEventManager } from './rootEventManager';

function buildJSXALone(): JSXAloneType<RenderOutput, ElementLike> {

  // let callId = 1
  const Module: JSXAloneType<RenderOutput, ElementLike> = {

    createElement: createCreateElement<RenderOutput, ElementLike>(getCreateCreateElementConfig()),

    render(elementLike, config) {
      const el = elementLike as any as ElementLike
      const almostCompleteConfig = { ...config, rootElementLike: el, 
        // renderCallId: callId++ 
      }
      const rootHTMLElement = el.buildRootElement(almostCompleteConfig)
      const eventManager = new RootEventManager(rootHTMLElement)
      const completeConfig = {...almostCompleteConfig, eventManager, rootHTMLElement}
      return el.render(completeConfig)
    },
    
    createRef<T extends Element & IElementClass>(): RefObject<T> {
      return new RefObjectImpl<T>()
    }

  }
  return Module
}

type RenderFunction<OO extends RenderOutput=RenderOutput, R extends ElementLike=ElementLike> = (el: JSX.Element, config?: ElementLikeImplRenderConfigNoRoot<R>) => OO

type JSXAloneType<T extends RenderOutput = RenderOutput, R extends ElementLike = ElementLike> = {
  render: RenderFunction<T, R>
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
