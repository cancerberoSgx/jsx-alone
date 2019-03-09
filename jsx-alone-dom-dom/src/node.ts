import { MEventTarget } from './event';

export abstract class MNode extends MEventTarget {

  static DOCUMENT_TYPE_NODE: NodeType = 10;
  static TEXT_NODE: NodeType = 3;
  static ELEMENT_NODE: NodeType = 1;
  static _WATERMARK = 'jsx-alone-dom-dom'

  readonly attributes: NamedNodeMap<MAttr>;

  protected _attributes: {
    [k: string]: MAttr;
  } = {};

  protected _children: MNode[] = [];

  childNodes: NodeList<MNode>

  _textContent: string | null = null 

  constructor(readonly nodeType: NodeType) {
    super();
    this._children = []
    this.childNodes = new NodeList(this._children)
    this.attributes = new NamedNodeMap(this._attributes)
  }

  getAttribute(a: string) {
    return this._attributes[a] ?  this._attributes[a].value :null;
  }
  setAttribute(a: string, v: string) {
    return this._attributes[a] = {value: v, name: a};
  }
  appendChild(c: MNode) {
    this._children.push(c);
  }
}

type NodeType = 10 | 3 | 1;

class NodeList<T  > {
  [index: number]: T;

  constructor(protected list: T[]) {

  }
  [Symbol.iterator](){
    return this.list[Symbol.iterator]()
  }
  item(i: number): T | null {
    return this.list[i] || null
  }
  get length() {
    return this.list.length
  }
}



// interface NamedNodeMap {
//   readonly length: number;
//   getNamedItem(qualifiedName: string): Attr | null;
//   getNamedItemNS(namespace: string | null, localName: string): Attr | null;
//   item(index: number): Attr | null;
//   removeNamedItem(qualifiedName: string): Attr;
//   removeNamedItemNS(namespace: string | null, localName: string): Attr;
//   setNamedItem(attr: Attr): Attr | null;
//   setNamedItemNS(attr: Attr): Attr | null;
//   [index: number]: Attr;
// }
// interface Attr extends Node {
//   readonly localName: string;
//   readonly name: string;
//   readonly namespaceURI: string | null;
//   readonly ownerElement: Element | null;
//   readonly prefix: string | null;
//   readonly specified: boolean;
//   value: string;
// }

// type 
export interface MAttr {
  name:string, 
  value:string
}

//TODO: performance - we focus on the map, and not in the array/iteration
class NamedNodeMap<T> {
  [index: number]: T;
  constructor(protected map: {[n:string]:T}) {

  }
  [Symbol.iterator](){
    return Object.values(this.map)[Symbol.iterator]()
  }
  item(i: number): T | null {
    return Object.values(this.map)[i]||null
  }
  get length() {
    return Object.keys(this.map).length
  }
}