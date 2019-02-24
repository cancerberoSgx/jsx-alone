import { NodeLike, JSXAlone as JSXAloneType, createCreateElement } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig } from './config';
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';


const Module = {
  
  createElement: createCreateElement<HTMLElement|Text>(ElementLikeImpl, TextNodeLikeImpl),

  render(el: JSX.Element, config: ElementLikeImplRenderConfig) {
    const casted : NodeLike<HTMLElement|Text> = el as any
    const rendered = casted.render(config)
    return rendered
  }
}


export const JSXAlone: JSXAloneType<HTMLElement|Text> = Module

//@ts-ignore
JSXAlone = Module // creates a global variable needed so emitted .js calls work. See tsconfig.json `"jsxFactory": "JSXAlone.createElement",`


