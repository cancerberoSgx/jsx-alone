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
  debug?: boolean
}
export interface ElementLikeImplRenderConfig<R extends ElementLike = ElementLike> extends ElementLikeImplRenderConfigNoRoot< R> {
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
  readonly eventManager?: RootEventManager
}

/** high level interface on top of DOM Event type so it's easy to declare types of currentTarget and target */
export interface DelegatedEvent<T extends EventTarget | HTMLElement =  HTMLElement> extends Event {
  target: T
}
