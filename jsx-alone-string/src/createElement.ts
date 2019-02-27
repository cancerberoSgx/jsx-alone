import { NodeLike, JSXAlone as JSXAloneType, createCreateElement, CreateCreateElementConfig } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig, defaultRenderConfig } from './config';
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';

const createCreateElementConfig: CreateCreateElementConfig<string, ElementLikeImpl> = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl, 
  functionAttributes: 'toString',
  // escapeAttributes: (s: string)=>s.replace(/\"/gim, '&quot;')
}

const Module = {
  
  createElement: createCreateElement<string>(createCreateElementConfig),

  render(el: JSX.Element, config: ElementLikeImplRenderConfig = defaultRenderConfig): string {
    return `${((el as any) as NodeLike<string>).render(config)}`
  }

}

export const JSXAlone: JSXAloneType<string>&{render(el: JSX.Element, config?: ElementLikeImplRenderConfig):string} = Module

