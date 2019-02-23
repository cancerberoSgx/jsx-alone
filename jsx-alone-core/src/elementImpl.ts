import { ReactLikeComponent, NodeLike, ElementLike, TextNodeLIke, RenderConfig, Predicate, ReactLike } from '.'
import {checkThrow} from 'misc-utils-of-mine-generic'
export function isReactLikeComponent(c: any): c is ReactLikeComponent {
  return c.prototype && c.prototype.render
}

export function isNode<T>(n: any): n is NodeLike<T> {
  return isTextNodeLike(n) || isElementLike(n)
}

export function isElementLike<T>(n: any): n is ElementLike<T> {
  return n && n.setAttribute
}

export function isTextNodeLike<T>(n: any): n is TextNodeLIke<T> {
  return n && n.content && !isElementLike(n)
}


export abstract class AbstractTextNodeLike<T> implements TextNodeLIke<T> {
  constructor(public content: string) {}
  abstract render(config?: RenderConfig): T
}
export abstract class AbstractElementLike<T> implements ElementLike<T> {
  attrs: {
    [name: string]: string
  }
  children: NodeLike<T>[]
  parentElement?: ElementLike<T>
  constructor(public tag: string) {
    this.attrs = {}
    this.children = []
  }
  abstract render(config?: RenderConfig): T
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

  findDescendant(p: Predicate<T>): ElementLike<T> | undefined {
    let found: ElementLike<T> | undefined
    this.children.some(c => {
      if (isElementLike<T>(c)) {
        if (p(c)) {
          found = c
        }
        else {
          found = c.findDescendant(p)
        }
      }
      return !!found
    })
    return found
  }

  findAscendant(p: Predicate<T>): ElementLike<T> | undefined {
    if (this.parentElement) {
      if (p(this.parentElement)) {
        return this.parentElement
      }
      return this.parentElement.findAscendant(p)
    }
  }

  getAscendants(): ElementLike<T>[]  {
    return this.parentElement ? [...this.parentElement.getAscendants(), this.parentElement] : []
  }

  getRootAscendant(): ElementLike<T> {
    const r =  this.parentElement ? this.findAscendant(n=>isElementLike(n) && !n.parentElement) : this
    return checkThrow(r, 'No root ascendant found in element like tree!')
  }

  getSiblings(): NodeLike<T>[]{
    if(this.parentElement){
      return this.parentElement.children.filter(c=>c!==this)
    }
    return []
  }

  findSibling(p: Predicate<T>): NodeLike<T> | undefined {
    return this.getSiblings().find(p)
  }

  find(p: Predicate<T>): NodeLike<T>|undefined {
    // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
    return this.getRootAscendant().findDescendant(p)
  }
}
