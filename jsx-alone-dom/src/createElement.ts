import { createCreateElement, CreateCreateElementConfig, CreateElementFunction, RefObject } from 'jsx-alone-core';
import { ElementLike, ElementLikeImpl, TextNodeLikeImpl } from '.';
import { ElementClass } from "./elementClass";
import { RootEventManager } from './event';
import { RefObjectImpl } from './refs';
import { ElementLikeImplRenderConfigNoRoot, IElementClass, RenderOutput } from './types';

type RenderFunction<OO extends RenderOutput= RenderOutput, R extends ElementLike= ElementLike> = (el: JSX.Element, config?: ElementLikeImplRenderConfigNoRoot<R>) => OO

interface JSXAloneType<T extends RenderOutput = RenderOutput, R extends ElementLike = ElementLike> {
  render: RenderFunction<T, R>
  createElement: CreateElementFunction<T, R>
  createRef<T>(): RefObject<T>
  /** so render() users have a way of removing event listeners when unattaching rendered html element */
  lastEventManager?: RootEventManager
}

function buildJSXALone(): JSXAloneType<RenderOutput, ElementLike> {

  const Module: JSXAloneType<RenderOutput, ElementLike> = {
    createElement: createCreateElement<RenderOutput, ElementLike>(getCreateCreateElementConfig()),

    render(elementLike, config) {
      const el = elementLike as any as ElementLike
      const almostCompleteConfig = { ...
        config,
        rootElementLike: el
      }
      const rootHTMLElement = el.buildRootElement(almostCompleteConfig)
      const eventManager = new RootEventManager(rootHTMLElement)
      const completeConfig = {...almostCompleteConfig, eventManager, rootHTMLElement}
      Module.lastEventManager = eventManager
      return el.render(completeConfig)
    },

    createRef<T extends Element & ElementClass>(): RefObject<T> {
      return new RefObjectImpl<T>()
    }

  }
  return Module
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
      }
    }
  }
  return createCreateElementConfig
}

export const JSXAlone: JSXAloneType<RenderOutput, ElementLike> = buildJSXALone()
