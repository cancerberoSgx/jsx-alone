import { JSXAloneComponent, NodeLike, ElementLike, TextNodeLike, RenderConfig } from '.'
import { ElementClassProps, ElementClass } from './elementClass';
import { ComponentClass, FunctionComponent } from './declarations/domElementDeclarations';

export function isElementClassConstructor(c: any): c is {new(props: ElementClassProps<any>): ElementClass} {
  return c.prototype && c.prototype.render
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
  // type: string | ComponentClass<P> | FunctionComponent<P>;
  // props: P;
  // key: Key | null;
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
  
  abstract dangerouslySetInnerHTML(s: string): void
  
}
