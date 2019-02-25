import { NodeLike, JSXAlone as JSXAloneType, createCreateElement, ElementLike } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig } from './config';
import { createCreateElementConfig } from './elementImpl';

const Module = {
  
  createElement: createCreateElement<HTMLElement|Text>(createCreateElementConfig),

  render(el: JSX.Element, config?: ElementLikeImplRenderConfig) {
    return  (el as any as NodeLike<HTMLElement|Text>).render(config)
  }
}

export const JSXAlone: JSXAloneType<HTMLElement|Text> = Module

