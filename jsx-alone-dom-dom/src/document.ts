import { Node } from './node';
import { Element } from './element';

export class Document extends Node {
  constructor() {
    super(Node.DOCUMENT_TYPE_NODE);
    this.head = new HeadElement('head');
    this.body = new BodyElement('body');
  }
  head: HeadElement;
  body: BodyElement;
  createElement(t: string) {
    return new Element(t);
  }
}
class HeadElement extends Element {
  constructor(public readonly tagName: string) {
    super(tagName);
  }
}
class BodyElement extends Element {
  constructor(public readonly tagName: string) {
    super(tagName);
  }
}
