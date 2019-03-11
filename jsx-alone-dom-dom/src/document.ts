import { MNode } from './node'
import { MElement } from './element'
import { MTextNode } from './text'

export class MDocument extends MNode {
  constructor() {
    super(MNode.DOCUMENT_TYPE_NODE)
    this.head = new MHeadElement('head', this)
    this.body = new MBodyElement('body', this)
  }
  head: MHeadElement
  body: MBodyElement
  createElement(t: string) {
    return new MElement(t, this)
  }
  createTextNode(content: string) {
    return new MTextNode(content, this)
  }
}

class MHeadElement extends MElement {
  // constructor(public readonly tagName: string) {
  //   super(tagName)
  // }
}

class MBodyElement extends MElement {
  // constructor(public readonly tagName: string) {
  //   super(tagName)
  // }
}
