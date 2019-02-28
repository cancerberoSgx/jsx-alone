// import { RenderConfig } from 'jsx-alone-core';
// import { NodeLike, ElementLike } from './types';
// import { RenderOutput } from './createElement';

// export interface ElementLikeImplRenderConfig<R extends ElementLike = ElementLike> extends RenderConfig<RenderOutput, R> {
//   parent?: HTMLElement
//   handleAttribute? (options: HandleAttributeOptions<R>):boolean
//   handleChildRender?(options: {config: ElementLikeImplRenderConfig<R>, parent: HTMLElement, child: NodeLike , elementLike: R}):boolean
//   handleAfterRender?(options: {config: ElementLikeImplRenderConfig<R>, el: HTMLElement, elementLike: R }):boolean
// }
// export interface HandleAttributeOptions<R extends ElementLike = ElementLike>{
//   config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute:string, value:any, elementLike: R
// }