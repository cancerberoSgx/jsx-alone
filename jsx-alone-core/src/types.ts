import { ElementClass } from './elementClass';

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

export interface NodeLike<T,  R extends ElementLike<T> = ElementLike<T>> {
  // new(content:string):this
  render(config?: RenderConfig<T, R>): T
}

export interface TextNodeLike<T> extends NodeLike<T> {
  content: string
}

// TODO: this should BE or implementing JSX.Element where tag is type, attrs is props
export interface ElementLike<T> extends NodeLike<T>  {
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

// export type Predicate<T, N extends NodeLike<T> = NodeLike<T>> = (e: N) => boolean

export interface JSXAlone<T, R extends ElementLike<T> = ElementLike<T>> {
  createElement(tag: JSXAloneTag, attrs: JSXAloneAttrs, ...children: JSXAloneChild[]): R
  render(el: JSX.Element, config?: RenderConfig<T, R>): T
}



export interface RenderConfig<T,  R extends ElementLike<T> = ElementLike<T>> {

  // // escapeAttributes?: (s: string) => string
  // /** 
  //  * * "preserve": will add the attribute value as is, (a function object). Works in DOM
  //  * * "toString": will add the attribute value as value.toString()
  //  * * "toString-this": will add the value as
  //  */
  // functionAttributes?: 'preserve' | 'toString-this' | 'toString'
  // /** we could evaluate a function using `new F()` instead of just calling F() at some performance cost, but this would be the only way of event handlers to have access to the function `this` context */
  // evaluateFunctionsWithNew?: boolean
}



// type FunctionAttributesMode = 'preserve' | 'toString-this' | 'toString'
export interface CreateCreateElementConfig<T, R extends ElementLike<T> = ElementLike<T>, C extends ElementClass = ElementClass> extends RenderConfig<T, R> {
  impl: {
    new (tag: string): R
  }
  textNodeImpl: { new (content: string): any }
  onElementReady?(event: { elementLike: R }): void
  onElementCreated?(event: { elementLike: R, elementClassInstance?: C , 
    attrs: JSXAloneAttrs<string>}): void // TODO: expose function element context
}
