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
  createTextNode(content: string) {
    return new TextNode(content)
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


class TextNode extends Node {
  constructor(protected readonly content: string) {
    super(Node.TEXT_NODE)
  }
}