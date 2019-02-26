import {  createCreateElement, JSXAloneTag, JSXAloneAttrs, AbstractElementLike } from 'jsx-alone-core'
import { ElementLikeImplRenderConfig } from './config'
import { createCreateElementConfig } from './elementImpl'
import { NodeLike } from './types';

const Module: JSXAloneType = {
  createElement: createCreateElement<HTMLElement | Text>(createCreateElementConfig),

  render  (el, config={}){
    return ((el as any) as NodeLike).render({...config, initialContext: this})
  }
}
type CreateElementFunction =(tag: JSXAloneTag, attrs?: JSXAloneAttrs<string> | undefined, ...children: any[]) => AbstractElementLike<HTMLElement | Text>
type RenderFunction = (el: JSX.Element, config?: ElementLikeImplRenderConfig)=> HTMLElement | Text
type JSXAloneType={render: RenderFunction, createElement: CreateElementFunction} 
export const JSXAlone: JSXAloneType = Module

// //@ts-ignore
// if(typeof React !=='undefined'){  React = Module}
