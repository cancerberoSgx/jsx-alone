import {  createCreateElement, JSXAloneTag, JSXAloneAttrs, AbstractElementLike, JSXAloneComponent, CreateCreateElementConfig, ElementLike, CreateElementFunction } from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'
import {  ElementLikeImpl, TextNodeLikeImpl } from './elementImpl'
import { NodeLike } from './types';


export interface CreateCreateElementDomConfig<R extends ElementLikeImpl = ElementLikeImpl> extends CreateCreateElementConfig<RenderOutput, R>{
  extraRenderConfig?: ElementLikeImplRenderConfig
}
export const createCreateElementConfig: CreateCreateElementDomConfig = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl,
  functionAttributes: 'toString-this',
  escapeAttributes: (s: string)=>s.replace(/\"/gim, '&quot;')
}

const Module: JSXAloneType<RenderOutput, ElementLikeImpl> = {

  createElement: createCreateElement<RenderOutput, ElementLikeImpl>(createCreateElementConfig),

  render  (el, config={}){
    const elementLike: NodeLike = el as any
    return elementLike.render({config})
  }

}
export type RenderOutput = HTMLElement | Text
type RenderFunction<RenderOutput, R extends ElementLikeImpl=ElementLikeImpl> = (el: JSX.Element, config?: ElementLikeImplRenderConfig<R>)=> RenderOutput
type JSXAloneType<T extends RenderOutput = RenderOutput, R extends ElementLikeImpl = ElementLikeImpl>={
  render: RenderFunction<T, R>, 
  createElement: CreateElementFunction<T, R>
} 



export const JSXAlone: JSXAloneType<RenderOutput,ElementLikeImpl> = Module

