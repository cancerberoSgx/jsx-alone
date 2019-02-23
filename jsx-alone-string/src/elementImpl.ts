// heads up - we want this file to be independent, that's why we didn't use misc utilities!

import { ReactLikeComponent, NodeLike, ElementLike, TextNodeLIke, RenderConfig, Predicate, ReactLike } from './jsx'
// import * as RL from './createElement'

export function isReactLikeComponent(c: any): c is ReactLikeComponent {
  return c.prototype && c.prototype.render
}

export function isNode(n: any): n is NodeLike {
  return isTextNodeLike(n) || isElementLike(n)
}

export function isElementLike(n: any): n is ElementLike {
  return n && n.setAttribute
}

export function isTextNodeLike(n: any): n is TextNodeLIke {
  return n && n.content && !isElementLike(n)
}

export class TextNodeLikeImpl implements TextNodeLIke {
  constructor(public content: string) { }
  render(config: RenderConfig = defaultRenderConfig): string {
    return `${this.content}`
  }
}
// declare var ReactLike: ReactLike&{indent: any}

export class ElementLikeImpl implements ElementLike {
  private innerHtml: string | undefined
  attrs: {
    [name: string]: string
  }
  children: NodeLike[]
  parentElement?: ElementLike
  constructor(public tag: string) {
    this.attrs = {}
    this.children = []
  }
  render(config: RenderConfig = defaultRenderConfig): string {
    const newLine = config.indent ? `\n` : ``
    const content = this.innerHtml ||
      `${newLine}${this.indent({ ...config, indentLevel: (config.indentLevel || 0) + 1 })}${
        this.children
        .map(c => `${c.render({ ...config, indentLevel: (config.indentLevel || 0) + 1 })}`)
        .join('')}${newLine}${this.indent(config)}`
    return `<${this.tag}${Object.keys(this.attrs).map(a => ` ${a}="${this.attrs[a]}"`).join('')}>${content}</${this.tag}>`
  }

  protected indent(config:{indentLevel?: number, indentTabSize? : number}) {
    // return config.indent ? _indent(config.indentLevel || 0, config.indentTabSize || 2) : ''
    // const tabSize = config.indentTabSize || 2
    const L = (config.indentLevel || 0) * (config.indentTabSize || 2)
    const a=[]
    for (let i = 0; i < L; i++) {
      a.push(' ')
    }
    return a.join('')
  }
  setAttribute(name: string, value: string): void {
    this.attrs[name] = value
  }
  appendChild(c: NodeLike): void {
    this.children.push(c)
    if (isElementLike(c)) {
      c.parentElement = this
      // this.children.push(c)
    }
  }
  dangerouslySetInnerHTML(s: string): void {
    this.innerHtml = s
  }

  findDescendant(p: Predicate): ElementLike | undefined {
    let found: ElementLike | undefined
    this.children.some(c => {
      if (isElementLike(c)) {
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

  findAscendant(p: Predicate<ElementLike>): ElementLike | undefined {
    if (this.parentElement) {
      if (p(this.parentElement)) {
        return this.parentElement
      }
      return this.parentElement.findAscendant(p)
    }
  }

  getAscendants(): ElementLike[]  {
    return this.parentElement ? [...this.parentElement.getAscendants(), this.parentElement] : []
  }

  getRootAscendant(): ElementLike {
    const r =  this.parentElement ? this.findAscendant(n=>!n.parentElement) : this
    return checkThrow(r, 'No root ascendant found in element like tree!')
  }

  getSiblings(): NodeLike[]{
    if(this.parentElement){
      return this.parentElement.children.filter(c=>c!==this)
    }
    return []
  }

  findSibling(p: Predicate): NodeLike | undefined {
    return this.getSiblings().find(p)
  }

  find(p: Predicate): NodeLike|undefined {
    // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
    return this.getRootAscendant().findDescendant(p)
  }
}

const defaultRenderConfig = { indentLevel: 0, indentTabSize: 2 }


// heads up - we want this file to be independent, that's why we did't use misc utilities!


// heads up - we want this file to be independent, that's why we did't use misc utilities!

function checkThrow<T>(r?: T, msg = 'Throwing on undefined value'): T {
  if (!r) { throw new Error(msg) }
  return r
}

// function _indent(i: number = 1, tabSize = 2): string {
//   const a=[]
//   for (let i = 0; i < i*tabSize; i++) {
//     a.push(' ')
//   }
//   return a.join('')
// }


