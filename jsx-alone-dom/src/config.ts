import { RenderConfig } from 'jsx-alone-core';
import { NodeLike } from './types';
import { ElementLikeImpl } from './elementImpl';
import { RenderOutput } from './createElement';

export interface ElementLikeImplRenderConfig<R extends ElementLikeImpl = ElementLikeImpl> extends RenderConfig<RenderOutput, R> {
  parent?: HTMLElement
  handleAttribute? (options: {config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute:string, value:any, elementLike: R}):boolean
  handleChildRender?(options: {config: ElementLikeImplRenderConfig<R>, parent: HTMLElement, child: NodeLike , elementLike: R}):boolean
  handleAfterRender?(options: {config: ElementLikeImplRenderConfig<R>, el: HTMLElement, elementLike: R }):boolean
}
