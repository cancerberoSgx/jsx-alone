import { ElementLike, NodeLike, RenderConfig, TextNodeLike } from '.';
import { ElementClass, ElementClassProps } from './elementClass';

export function isElementClassConstructor(c: any): c is new(props: ElementClassProps<any>) => ElementClass {
  return c.prototype && c.prototype.render
}
export function isElementClass(c: any): c is ElementClass {
  return c.render && c.afterRender
}
export function isNode<T>(n: any): n is NodeLike<T> {
  return isTextNodeLike(n) || isElementLike(n)
}

export function isElementLike<T>(n: any): n is ElementLike<T> {
  return n && n.setAttribute
}

export function isTextNodeLike<T>(n: any): n is TextNodeLike<T> {
  return n && n.content && !isElementLike(n)
}

export abstract class AbstractTextNodeLike<T> implements TextNodeLike<T> {
  constructor(public content: string) {}
  abstract render(config?: RenderConfig<T>): T
}

export abstract class AbstractElementLike<T> implements ElementLike<T> {
  attrs: {
    [name: string]: any
  }
  children: NodeLike<T>[]
  parentElement?: ElementLike<T>

  constructor(public tag: string) {
    this.attrs = {}
    this.children = []
  }

  abstract render(config?: RenderConfig<T>): T

  setAttribute(name: string, value: string): void {
    this.attrs[name] = value
  }

  appendChild(c: NodeLike<T>): void {
    this.children.push(c)
    if (isElementLike<T>(c)) {
      c.parentElement = this
    }
  }
  
  replaceChild(i: number, c: NodeLike<T>){
    this.children[i]=c
    if (isElementLike<T>(c)) {
      c.parentElement = this
    }
  }

  abstract dangerouslySetInnerHTML(s: string): void

}
