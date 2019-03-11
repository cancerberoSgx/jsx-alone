import { ElementLike as BaseElementLike, IElementClass as ICoreElementClass, NodeLike as BaseNodeLike, RefObject, RenderConfig, TextNodeLike as BaseTextNodeLike } from 'jsx-alone-core'
import { RootEventManager } from './event'

export interface NodeLike<T extends RenderOutput= RenderOutput> extends BaseNodeLike<T> { }

export interface ElementLike<T extends RenderOutput = RenderOutput> extends BaseElementLike<T>, NodeLike<T> {
  _elementClassInstance?: IElementClass
  ref?: RefObject<IElementClass & Element>
  buildRootElement(config: ElementLikeImplRenderConfig<ElementLike>): HTMLElement
  render(config?: ElementLikeImplRenderConfig): T
}

export interface TextNodeLike extends BaseTextNodeLike<RenderOutput> { }

/**
 * Base Element Class. Has support for removing event listeners thought this.eventManager which is assigned as property
 * at render time and is responsible of event delegation.
 */
export interface IElementClass<P = {}> extends ICoreElementClass<P> {
  afterRender(containerEl: HTMLElement): void
  readonly eventManager?: RootEventManager
  /**
    * If true, when rendering with `updateExisting` this component and its descendants won't be updated (they will be
    * ignored)
    */
  neverUpdate: boolean
}

export type RenderOutput = HTMLElement | Text

export interface ElementLikeImplRenderConfigNoRoot<R extends ElementLike = ElementLike> extends RenderConfig<RenderOutput, R> {
  parent?: Node
  debug?: boolean
  updateExisting?: HTMLElement
}

export interface ElementLikeImplRenderConfig<R extends ElementLike = ElementLike> extends ElementLikeImplRenderConfigNoRoot<R> {
  rootElementLike: ElementLike
}

export interface HandleAttributeOptions<R extends ElementLike = ElementLike> {
  config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute: string, value: any, elementLike: R
}

/**
 * Provides event delegation management to all nodes generated in a `render()` call. ElementClass instances have a
 * reference to the same `EventManager` instance which is created when `JSXAlone.render()` is called (1 to 1 relation).
 */
export interface EventManager {
  /**
   * Notifies when `onAppendToDom()` was called. See `onAppendToDom`
   */
  addAppendToDomListener(l: () => void): void
  /**
   * For components to be aware when their Nodes are appended to the DOM, users might need to call this method after the
   * root Node is appended to the DOM. The motivation is that some libraries need to be installed only on an attached
   * node.
   */
  onAppendToDom(): void
  /**
   * Has the same result of calling `el.addEventListener(type, fn, options)`
   */
  addEventListener(el: HTMLElement, type: string, fn: EventListener, options?: any): void
  /**
   * Removes event listeners for element inside root
   */
  removeListeners(el: HTMLElement, andDescendants?: boolean, types?: []): void
  /**
   * Uninstall the event listeners in root. Reset the internal state. Optionally, remove the markings on descendant
   * elements
   */
  uninstall(removeElementMarks?: boolean, types?: []): void
}
