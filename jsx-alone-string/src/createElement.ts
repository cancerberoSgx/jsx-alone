import { NodeLike, JSXAlone as JSXAloneType, createCreateElement } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig, defaultRenderConfig } from './config';
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';

const config = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl, 
  escapeAttributes: (s: string)=>s.replace(/\"/gim, '&quot;')
}

const Module = {
  
  createElement: createCreateElement<string>(config),

  render(el: JSX.Element, config: ElementLikeImplRenderConfig = defaultRenderConfig): string {
    return `${((el as any) as NodeLike<string>).render(config)}`
  }

}

export const JSXAlone: JSXAloneType<string>&{render(el: JSX.Element, config?: ElementLikeImplRenderConfig):string} = Module

