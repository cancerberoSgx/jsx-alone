import { ElementLike as BaseElementLike, NodeLike as BaseNodeLike, TextNodeLike as BaseTextNodeLike, RefObject, RenderConfig ,  IElementClass as ICoreElementClass } from 'jsx-alone-core'
import { RootEventManager } from './event'

export interface NodeLike extends  BaseNodeLike<RenderOutput> {}

export interface ElementLike<T= RenderOutput >  extends  BaseElementLike<RenderOutput> {
  _elementClassInstance?: IElementClass
  ref?: RefObject<IElementClass&Element>
  buildRootElement(config: ElementLikeImplRenderConfig<ElementLike>): HTMLElement
}

export interface TextNodeLike extends  BaseTextNodeLike<RenderOutput> {}

export type RenderOutput = HTMLElement | Text

export interface ElementLikeImplRenderConfigNoRoot<R extends ElementLike = ElementLike> extends RenderConfig<RenderOutput, R> {
  parent?: Node
  appendChildrenInDocumentFragment?: boolean
}
export interface ElementLikeImplRenderConfig<R extends ElementLike = ElementLike> extends ElementLikeImplRenderConfigNoRoot< R> {
  // renderCallId:number
  rootElementLike: ElementLike
}

export interface HandleAttributeOptions<R extends ElementLike = ElementLike> {
  config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute: string, value: any, elementLike: R
}

export interface IElementClass<P = {}> extends ICoreElementClass<P> {
  containerEl: HTMLElement |undefined
  /** element classes in DOM implementation will be given its container element.  */
  setContainerEl(el: HTMLElement): void
  destroy(): void
  readonly eventManager: RootEventManager
}

export interface MEvent<C extends EventTarget | HTMLElement = any, T extends EventTarget | HTMLElement = any> extends Event {
  currentTarget: C
  target: T
}
