export type ReactLikeAttrs<ClassName extends string = string> = {
  [k: string]: any
  className?: ClassName|ClassName[]
}

export type ReactLikeChild = ReactLikeElement | string;

export type ReactLikeProps = ReactLikeAttrs & {
  children: ReactLikeChild[];
}

export type ReactLikeValue = string | boolean | number

export type ReactLikeElement = any // HTMLElement

export type ReactLikeComponent = {
  new(props: ReactLikeProps): ReactLikeComponent
  render(): ReactLikeElement
}

export type ReactLikeFunction = (props: ReactLikeProps) => ReactLikeElement

export type ReactLikeTag = string | ReactLikeComponent | ReactLikeFunction

export interface NodeLike<T> {
  // new(content:string):this
  render(config: RenderConfig): T
}

export interface TextNodeLIke<T> extends NodeLike<T> {
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

export interface ReactLike<T> {
  createElement(tag: ReactLikeTag, attrs: ReactLikeAttrs, ...children: ReactLikeChild[]): ElementLike<T>
  render(el: JSX.Element, config: RenderConfig): T
  // registerClientCode(f: ClientCode): void
  // getClientCode(): ClientCode[]
}

export interface ClientCode {
  name?: string,
  code: string,
  description?: string
}

