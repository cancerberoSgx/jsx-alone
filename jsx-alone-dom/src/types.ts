import { ElementLike as BaseElementLike, NodeLike as BaseNodeLike, TextNodeLike as BaseTextNodeLike, RefObject, RenderConfig ,  IElementClass as ICoreElementClass, } from 'jsx-alone-core';

export interface NodeLike extends  BaseNodeLike<RenderOutput>{}

export interface ElementLike<T=RenderOutput >  extends  BaseElementLike<RenderOutput>{
  _elementClassInstance?: IElementClass
  ref?: RefObject<IElementClass&Element>

}

// export interface IElementClass<P = {}> extends ICoreElementClass<P>{
//   containerEl: HTMLElement |undefined
//   /** element classes in DOM implementation will be given its container element.  */
//   setContainerEl(el: HTMLElement):void
// }

export interface TextNodeLike extends  BaseTextNodeLike<RenderOutput>{}


export type RenderOutput = HTMLElement | Text


export interface ElementLikeImplRenderConfig<R extends ElementLike = ElementLike> extends RenderConfig<RenderOutput, R> {
  parent?: HTMLElement
  handleAttribute? (options: HandleAttributeOptions<R>):boolean
  handleChildRender?(options: {config: ElementLikeImplRenderConfig<R>, parent: HTMLElement, child: NodeLike , elementLike: R}):boolean
  handleAfterRender?(options: {config: ElementLikeImplRenderConfig<R>, el: HTMLElement, elementLike: R }):boolean
}
export interface HandleAttributeOptions<R extends ElementLike = ElementLike>{
  config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute:string, value:any, elementLike: R
}
export interface IElementClass<P = {}> extends ICoreElementClass<P>{
  containerEl: HTMLElement |undefined
  /** element classes in DOM implementation will be given its container element.  */
  setContainerEl(el: HTMLElement):void
  __addRef<T extends IElementClass&Element>({el, value, elementLike}: {el: HTMLElement, value:RefObject<T>, elementLike: ElementLike}):void
}
