import { EventTargetImpl } from './event';

export class Node extends EventTargetImpl {
  protected attrs: {
    [k: string]: string;
  } = {};

  protected children: Node[] = [];

  get childNodes() {
    return {
      item: (i:number) => this.children[i] || undefined
    }
  }

  constructor(protected readonly nodeType: NodeType) {
    super();
  }

  getAttribute(a: string) {
    return this.attrs[a] || null;
  }
  setAttribute(a: string, v: string) {
    return this.attrs[a] = v;
  }
  appendChild(c: Node) {
    this.children.push();
  }
  static DOCUMENT_TYPE_NODE: NodeType = 10;
  static TEXT_NODE: NodeType = 3;
  static ELEMENT_NODE: NodeType = 1;
  static _WATERMARK='jsx-alone-dom-dom'
}
type NodeType = 10 | 3 | 1;
