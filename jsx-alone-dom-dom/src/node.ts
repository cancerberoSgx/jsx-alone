import { MEventTarget } from './event'
import { MDocument } from './document';
import { getNodeHtml } from './util/nodeUtil';

export abstract class MNode extends MEventTarget {

  static DOCUMENT_TYPE_NODE: NodeType = 10
  static TEXT_NODE: NodeType = 3
  static ELEMENT_NODE: NodeType = 1
  static _WATERMARK = 'jsx-alone-dom-dom'

  readonly attributes: NamedNodeMap<MAttr>

  protected _attributes: {
    [k: string]: MAttr;
  } = {}

  protected _children: MNode[] = []

  readonly childNodes: NodeList<MNode>

  protected _textContent: string | null = null
  protected _parentNode: Node | null = null
  protected _ownerDocument: MDocument | null = null

  constructor(readonly nodeType: NodeType) {
    super()
    this._children = []
    this.childNodes = new NodeList(this._children)
    this.attributes = new NamedNodeMap(this._attributes)
  }
  get ownerDocument() {
    return this._ownerDocument
  }
  get textContent() {
    return this._textContent
  }
  set textContent(c: string | null) {
    this._textContent = c
  }
  get parentNode() {
    return this._parentNode
  }

  get innerHTML() {
    return getNodeHtml(this)
  }
  set innerHTML(id: string | null) {
    throw 'not implemented'
  }
  
  
  getAttribute(a: string) {
    return this._attributes[a] ? this._attributes[a].value : null
  }
  setAttribute(a: string, v: string | null) {
    return this._attributes[a] = { value: v, name: a }
  }
  appendChild(c: MNode) {
    this._children.push(c)
  }
  /**
   * Returns whether node and otherNode have the same properties.
   */
  isEqualNode(otherNode: MNode | null): boolean {
    return false // TODO
  }
  /**
   * Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes. Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
   */
  replaceWith(...nodes: (MNode | string)[]): void {
    if (this._parentNode) {
      const children = (this._parentNode as any)._children as MNode[]
      children.splice(children.indexOf(this), 1, 
        ...nodes.map(n => typeof n === 'string' ? this.ownerDocument!.createTextNode(n) : n))
    }
  }
}

type NodeType = 10 | 3 | 1

class NodeList<T> {
  [index: number]: T;

  constructor(protected list: T[]) {

  }
  [Symbol.iterator]() {
    return this.list[Symbol.iterator]()
  }
  get length() {
    return this.list.length
  }
  item(i: number): T | null {
    return this.list[i] || null
  }
}

export interface MAttr {
  name: string
  value: string | null
}

// TODO: performance - we focus on the map, and not in the array/iteration
class NamedNodeMap<T extends MAttr> {
  [index: number]: T;
  constructor(protected map: { [n: string]: T }) {

  }
  [Symbol.iterator]() {
    return Object.values(this.map)[Symbol.iterator]()
  }
  get length() {
    return Object.keys(this.map).length
  }
  item(i: number): T | null {
    return Object.values(this.map)[i] || null
  }
}
