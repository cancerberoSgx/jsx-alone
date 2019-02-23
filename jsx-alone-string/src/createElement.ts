import { NodeLike, ReactLike as ReactLikeType, createCreateElement } from 'jsx-alone-core';
import { ElementLikeImplRenderConfig } from './config';
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';


const Module = {
  
  createElement: createCreateElement<string>(ElementLikeImpl, TextNodeLikeImpl),

  render(el: JSX.Element, config: ElementLikeImplRenderConfig = {}): string {
    return `${((el as any) as NodeLike<string>).render(config)}`
  }

}

export const ReactLike: ReactLikeType<string> = Module

//@ts-ignore
ReactLike = Module // creates a global variable needed so emitted .js calls work. See tsconfig.json `"jsxFactory": "ReactLike.createElement",`


