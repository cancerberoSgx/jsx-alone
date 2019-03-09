import { EventTargetImpl } from './event';

export class Node extends EventTargetImpl {
  protected attrs: {
    [k: string]: string;
  } = {};
  children: Node[] = [];
  childNodes: NodeList

  constructor(protected readonly nodeType: NodeType) {
    super();
    this.children = []
    this.childNodes = new NodeList(this.children)
  }
  getAttribute(a: string) {
    return this.attrs[a] || null;
  }
  setAttribute(a: string, v: string) {
    return this.attrs[a] = v;
  }
  appendChild(c: Node) {
    this.children.push(c);
  }
  static DOCUMENT_TYPE_NODE: NodeType = 10;
  static TEXT_NODE: NodeType = 3;
  static ELEMENT_NODE: NodeType = 1;
  static _WATERMARK = 'jsx-alone-dom-dom'
}
type NodeType = 10 | 3 | 1;
class NodeList<T extends Node = Node> {
  constructor(protected list: T[]) {

  }
  item(i: number): T | undefined {
    return this.list[i] || undefined
  }
  get length() {
    return this.list.length
  }
}