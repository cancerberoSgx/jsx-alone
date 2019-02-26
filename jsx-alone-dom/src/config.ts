import { RenderConfig } from 'jsx-alone-core';
import { NodeLike } from './types';
import { ElementLikeImpl } from './elementImpl';

export interface ElementLikeImplRenderConfig extends RenderConfig {
  parent?: HTMLElement
  handleAttribute? (options: {config: ElementLikeImplRenderConfig, el: HTMLElement, attribute:string, value:any, elementLike: ElementLikeImpl}):boolean
  handleChildRender?(options: {config: ElementLikeImplRenderConfig, parent: HTMLElement, child: NodeLike , elementLike: ElementLikeImpl}):boolean
  handleAfterRender?(options: {config: ElementLikeImplRenderConfig, el: HTMLElement, elementLike: ElementLikeImpl }):boolean
}

// export const defaultRenderConfig: ElementLikeImplRenderConfig = { 
// };
