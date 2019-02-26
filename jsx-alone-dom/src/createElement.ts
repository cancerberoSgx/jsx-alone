import {  createCreateElement, JSXAloneTag, JSXAloneAttrs, AbstractElementLike, JSXAloneComponent, CreateCreateElementConfig, ElementLike, CreateElementFunction } from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'
import {  ElementLikeImpl, TextNodeLikeImpl } from './elementImpl'
import { NodeLike } from './types';


export interface CreateCreateElementDomConfig extends CreateCreateElementConfig{
  extraRenderConfig?: ElementLikeImplRenderConfig
}
export const createCreateElementConfig: CreateCreateElementDomConfig = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl,
  functionAttributes: 'preserve'
}

const Module: JSXAloneType = {

  createElement: createCreateElement<HTMLElement | Text>(createCreateElementConfig),

  render  (el, config={}){
    const elementLike: NodeLike = el as any
    return elementLike.render({config})
  }

}

type RenderFunction = (el: JSX.Element, config?: ElementLikeImplRenderConfig)=> HTMLElement | Text
type JSXAloneType={render: RenderFunction, createElement: CreateElementFunction<HTMLElement | Text>} 



export const JSXAlone: JSXAloneType = Module

