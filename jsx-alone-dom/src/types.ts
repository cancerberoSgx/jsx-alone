import { ElementLike as BaseElementLike, NodeLike as BaseNodeLike, TextNodeLike as BaseTextNodeLike, RefObject, RenderConfig ,  IElementClass as ICoreElementClass, MouseEvent, AbstractCoreMouseEvent } from 'jsx-alone-core'
import { RootEventManager } from './event'

export interface NodeLike<T extends RenderOutput= RenderOutput > extends  BaseNodeLike<T > {}

export interface ElementLike<T extends RenderOutput = RenderOutput >  extends  BaseElementLike<T>, NodeLike<T> {
  _elementClassInstance?: IElementClass
  ref?: RefObject<IElementClass&Element>
  buildRootElement(config: ElementLikeImplRenderConfig<ElementLike>): HTMLElement
  render(config?: ElementLikeImplRenderConfig):T
}

export interface TextNodeLike extends  BaseTextNodeLike<RenderOutput> {}

export interface IElementClass<P = {}> extends ICoreElementClass<P> {
  destroy(): void
  onAppendToDom():void
  afterRender(containerEl: HTMLElement):void
  asJSXElement():JSX.Element
  readonly eventManager?: RootEventManager
}

export type RenderOutput = HTMLElement | Text

export interface ElementLikeImplRenderConfigNoRoot<R extends ElementLike = ElementLike> extends RenderConfig<RenderOutput, R> {
  parent?: Node
  debug?: boolean
  updateExisting?: HTMLElement
}
export interface ElementLikeImplRenderConfig<R extends ElementLike = ElementLike> extends ElementLikeImplRenderConfigNoRoot< R> {
  rootElementLike: ElementLike
}

export interface HandleAttributeOptions<R extends ElementLike = ElementLike> {
  config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute: string, value: any, elementLike: R
}


// /** high level interface on top of DOM Event type so it's easy to declare types of currentTarget and target */
// export interface DelegatedEvent<T extends  EventTarget =  EventTarget> extends Event {
//   target: T
// }
// export interface DelegatedMouseEvent<T extends EventTarget =  EventTarget> extends MouseEvent<AbstractCoreMouseEvent,T>  {
//   target: T
// }
