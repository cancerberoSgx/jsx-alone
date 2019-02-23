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


export abstract class AbstractElementLike<T> implements ElementLike<T> {
  // private innerHtml: string | undefined
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
  // render(config: RenderConfig = defaultRenderConfig): string {
  //   const newLine = config.indent ? `\n` : ``
  //   const content = this.innerHtml ||
  //     `${newLine}${this.indent({ ...config, indentLevel: (config.indentLevel || 0) + 1 })}${
  //       this.children
  //       .map(c => `${c.render({ ...config, indentLevel: (config.indentLevel || 0) + 1 })}`)
  //       .join('')}${newLine}${this.indent(config)}`
  //   return `<${this.tag}${Object.keys(this.attrs).map(a => ` ${a}="${this.attrs[a]}"`).join('')}>${content}</${this.tag}>`
  // }

  // protected indent(config:{indentLevel?: number, indentTabSize? : number}) {
  //   // return config.indent ? _indent(config.indentLevel || 0, config.indentTabSize || 2) : ''
  //   // const tabSize = config.indentTabSize || 2
  //   const L = (config.indentLevel || 0) * (config.indentTabSize || 2)
  //   const a=[]
  //   for (let i = 0; i < L; i++) {
  //     a.push(' ')
  //   }
  //   return a.join('')
  // }
  setAttribute(name: string, value: string): void {
    this.attrs[name] = value
  }
  appendChild(c: NodeLike<T>): void {
    this.children.push(c)
    if (isElementLike<T>(c)) {
      c.parentElement = this
      // this.children.push(c)
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

// const defaultRenderConfig = { indentLevel: 0, indentTabSize: 2 }


// // heads up - we want this file to be independent, that's why we did't use misc utilities!


// // heads up - we want this file to be independent, that's why we did't use misc utilities!

// function checkThrow<T>(r?: T, msg = 'Throwing on undefined value'): T {
//   if (!r) { throw new Error(msg) }
//   return r
// }

// function _indent(i: number = 1, tabSize = 2): string {
//   const a=[]
//   for (let i = 0; i < i*tabSize; i++) {
//     a.push(' ')
//   }
//   return a.join('')
// }


