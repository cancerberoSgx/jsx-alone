import { createCreateElement, CreateCreateElementConfig, CreateElementFunction, RefObject, updateElement, JSXAloneTag, JSXAloneAttrs } from 'jsx-alone-core';
import { ElementLike, ElementLikeImpl, TextNodeLikeImpl, isElementClass } from '.';
import { ElementClass } from "./elementClass";
import { RootEventManager, EventManager } from './event';
import { RefObjectImpl } from './refs';
import { ElementLikeImplRenderConfigNoRoot, IElementClass, RenderOutput } from './types';

type RenderFunction<OO extends RenderOutput= RenderOutput, R extends ElementLike= ElementLike> = (el: JSX.Element, config?: ElementLikeImplRenderConfigNoRoot<R>) => OO

interface JSXAloneType<T extends RenderOutput = RenderOutput, R extends ElementLike = ElementLike> {
  render: RenderFunction<T, R>
  createElement: CreateElementFunction<T, R>
  updateElement<T, R>(element: R, tag: JSXAloneTag, attrs: JSXAloneAttrs<string>, children: any[], create?: boolean): void
  createRef<T>(): RefObject<T>
  /** so render() users have a way of removing event listeners when unattaching rendered html element */
  lastEventManager?: EventManager
}

function buildJSXALone(): JSXAloneType<RenderOutput, ElementLike> {

  const Module: JSXAloneType<RenderOutput, ElementLike> = {

    createElement: createCreateElement<RenderOutput, ElementLike>(getCreateCreateElementConfig()),

    // updateElement: ([element, tag, attrs, children, create]: Parameters<typeof updateElement>) => updateElement(element, tag, attrs, children, create),
    
    updateElement: (element,  tag, attrs, children, create) => updateElement(element as any, TextNodeLikeImpl, tag, attrs, children, create),


    render(elementLike, config) {
      const el = elementLike as any as ElementLike
      const almostCompleteConfig = {
        ...
        config,
        rootElementLike: el
      }
      const updateExisting = el._elementClassInstance && el._elementClassInstance!.eventManager && config && config.updateExisting
      const rootHTMLElement = updateExisting || el.buildRootElement(almostCompleteConfig)
      const eventManager = updateExisting ? el._elementClassInstance!.eventManager : new RootEventManager(rootHTMLElement)
      const completeConfig = { ...almostCompleteConfig, eventManager, rootHTMLElement }
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
      },
      // onElementReady({elementLike}){
      //   if(isElementClass(elementLike) && elementLike._elementClassInstance) {
      //     elementLike.setContainerEl(elementLike._elementClassInstance.containerEl)
      //   }
      // }
    }
  }
  return createCreateElementConfig
}

export const JSXAlone: JSXAloneType<RenderOutput, ElementLike> = buildJSXALone()
