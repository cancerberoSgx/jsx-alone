import { AbstractElementLike } from './elementImpl';

export type JSXAloneAttrs<ClassName extends string = string> = {
  [k: string]: any
  className?: ClassName | ClassName[]
}

export type JSXAloneChild = JSXAloneElement | string

export type JSXAloneProps = JSXAloneAttrs & JSX.ElementChildrenAttribute

export type JSXAloneValue = string | boolean | number

export type JSXAloneElement = any

export type JSXAloneComponent = {
  new (props: JSXAloneProps): JSXAloneComponent
  render(): JSXAloneElement
}

export type JSXAloneFunction = (props: JSXAloneProps) => JSXAloneElement

export type JSXAloneTag = string | JSXAloneComponent | JSXAloneFunction

export interface NodeLike<T> {
  // new(content:string):this
  render(config?: RenderConfig<T>): T
}

export interface TextNodeLike<T> extends NodeLike<T> {
  content: string
}

export interface ElementLike<T> extends NodeLike<T> {
  tag: string
  attrs: { [name: string]: any }
  children: NodeLike<T>[]
  setAttribute(name: string, value: string): void
  dangerouslySetInnerHTML(s: string): void
  appendChild(c: NodeLike<T>): void
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

export type Predicate<T, N extends NodeLike<T> = NodeLike<T>> = (e: N) => boolean

export interface RenderConfig<T,  R extends ElementLike<T> = ElementLike<T>> {}

export interface JSXAlone<T, R extends ElementLike<T> = ElementLike<T>> {
  createElement(tag: JSXAloneTag, attrs: JSXAloneAttrs, ...children: JSXAloneChild[]): R
  render(el: JSX.Element, config?: RenderConfig<T, R>): T
}

type FunctionAttributesMode = 'preserve' | 'toString-this' | 'toString'
export interface CreateCreateElementConfig<T, R extends ElementLike<T> = ElementLike<T>> {
  impl: {
    new (tag: string): R
  }
  textNodeImpl: { new (content: string): any }
  escapeAttributes?: (s: string) => string
  functionAttributes?: FunctionAttributesMode
  /** we could evaluate a function using `new F()` instead of just calling F() at some performance cost, but this would be the only way of event handlers to have access to the function `this` context */
  evaluateFunctionsWithNew?: boolean
  onElementReady?(event: { elementLike: R }): void
  onElementCreated?(event: { elementLike: R, elementClassInstance?: JSXAloneComponent }): void // TODO: expose function element context
}
