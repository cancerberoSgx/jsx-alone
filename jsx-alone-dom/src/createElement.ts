import { NodeLike, JSXAlone as JSXAloneType, createCreateElement } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig } from './config';
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';

const config = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl, 
}

const Module = {
  
  createElement: createCreateElement<HTMLElement|Text>(config),

  render(el: JSX.Element, config?: ElementLikeImplRenderConfig) {
    return  (el as any as NodeLike<HTMLElement|Text>).render(config)
  }
}

export const JSXAlone: JSXAloneType<HTMLElement|Text> = Module

