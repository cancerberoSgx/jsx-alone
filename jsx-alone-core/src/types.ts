export type JSXAloneAttrs<ClassName extends string = string> = {
  [k: string]: any
  className?: ClassName|ClassName[]
}

export type JSXAloneChild = JSXAloneElement | string;

export type JSXAloneProps = JSXAloneAttrs & {
  children: JSXAloneChild[];
}

export type JSXAloneValue = string | boolean | number

export type JSXAloneElement = any // HTMLElement

export type JSXAloneComponent = {
  new(props: JSXAloneProps): JSXAloneComponent
  render(): JSXAloneElement
}

export type JSXAloneFunction = (props: JSXAloneProps) => JSXAloneElement

export type JSXAloneTag = string | JSXAloneComponent | JSXAloneFunction

export interface NodeLike<T> {
  // new(content:string):this
  render(config?: RenderConfig): T
}

export interface TextNodeLike<T> extends NodeLike<T> {
  content: string
}

export interface ElementLike<T> extends NodeLike<T> {
  tag: string
  attrs: { [name: string]: any }
  children: NodeLike<T>[]
  setAttribute(name: string, value: string): void
  dangerouslySetInnerHTML(s: string):void
  appendChild(c: NodeLike<T>): void
  parentElement?: ElementLike<T>
  findDescendant(p: Predicate<T>): ElementLike<T>|undefined
  findAscendant(p: Predicate<T>): ElementLike<T> | undefined
  getSiblings(): NodeLike<T>[]
  findSibling(p: Predicate<T>): NodeLike<T> | undefined
  getRootAscendant(): ElementLike<T>
  getAscendants(): ElementLike<T>[]
  find(p: Predicate<T>): NodeLike<T>|undefined
}

export type Predicate<T, N extends NodeLike<T> = NodeLike<T>> = (e:N)=>boolean

export interface RenderConfig {
}

export interface JSXAlone<T> {
  createElement(tag: JSXAloneTag, attrs: JSXAloneAttrs, ...children: JSXAloneChild[]): ElementLike<T>
  render(el: JSX.Element, config?: RenderConfig): T
  // registerClientCode(f: ClientCode): void
  // getClientCode(): ClientCode[]
}

export interface ClientCode {
  name?: string,
  code: string,
  description?: string
}

