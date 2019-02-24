import { NodeLike, JSXAlone as JSXAloneType, createCreateElement } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig, defaultRenderConfig } from './config';
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';


const Module = {
  
  createElement: createCreateElement<string>(ElementLikeImpl, TextNodeLikeImpl),

  render(el: JSX.Element, config: ElementLikeImplRenderConfig = defaultRenderConfig): string {
    return `${((el as any) as NodeLike<string>).render(config)}`
  }

}

export const JSXAlone: JSXAloneType<string> = Module

//@ts-ignore
JSXAlone = Module // creates a global variable needed so emitted .js calls work. See tsconfig.json `"jsxFactory": "JSXAlone.createElement",`


