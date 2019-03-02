import { ElementClass } from './elementClass'

export interface JSXAloneAttrs<ClassName extends string = string> {
  [k: string]: any
  className?: ClassName | ClassName[]
}

export type JSXAloneChild = JSXAloneElement | string

export type JSXAloneProps = JSXAloneAttrs & JSX.ElementChildrenAttribute

export type JSXAloneValue = string | boolean | number

export type JSXAloneElement = any

export interface JSXAloneComponent {
  new(props: JSXAloneProps): JSXAloneComponent
  render(): JSXAloneElement
}

export type JSXAloneFunction = (props: JSXAloneProps) => JSXAloneElement

export type JSXAloneTag = string | JSXAloneComponent | JSXAloneFunction

export interface NodeLike<T, R extends ElementLike<T> = ElementLike<T>> {
  render(config?: RenderConfig<T, R>): T
}

export interface TextNodeLike<T> extends NodeLike<T> {
  content: string
}

// TODO: this should BE or implementing JSX.Element where tag is type, attrs is props
export interface ElementLike<T> extends NodeLike<T> {
  tag: string
  attrs: { [name: string]: any }
  children: NodeLike<T>[]
  setAttribute(name: string, value: string): void
  dangerouslySetInnerHTML(s: string): void
  appendChild(c: NodeLike<T>): void
  replaceChild(i: number, c: NodeLike<T>): void
  parentElement?: ElementLike<T>
  // destroy: ()=>void
  // findDescendant(p: Predicate<T>): ElementLike<T> | undefined
  // findAscendant(p: Predicate<T>): ElementLike<T> | undefined
  // getSiblings(): NodeLike<T>[]
  // findSibling(p: Predicate<T>): NodeLike<T> | undefined
  // getRootAscendant(): ElementLike<T>
  // getAscendants(): ElementLike<T>[]
  // find(p: Predicate<T>): NodeLike<T> | undefined
}

export interface JSXAlone<T, R extends ElementLike<T> = ElementLike<T>> {
  createElement(tag: JSXAloneTag, attrs: JSXAloneAttrs, ...children: JSXAloneChild[]): R
   updateElement(element: R,   tag: JSXAloneTag, attrs:  JSXAloneAttrs<string>, children: any[], create?: boolean):void
  render(el: JSX.Element, config?: RenderConfig<T, R>): T
}

export interface RenderConfig<T, R extends ElementLike<T> = ElementLike<T>> {

}

export interface CreateCreateElementConfig<T, R extends ElementLike<T> = ElementLike<T>, C extends ElementClass = ElementClass> extends RenderConfig<T, R> {

  /** implementation of TextNodeLike */
  impl: new(tag: string) => R

  /** implementation of TextNodeLike */
  textNodeImpl: new(content: string) => any

  /** let implementations grab the created HTML element and its associated ElementClass, if any, when their are just created (before processing attrs and children). Needs to be fast. TODO: expose function element context */
  onElementCreated?(event: {
    elementLike: R, elementClassInstance?: C,
    attrs: JSXAloneAttrs<string>
  }): void

  /** called when render () ends for an element . Needs to be fast.*/
  onElementReady?(event: { elementLike: R }): void
}
