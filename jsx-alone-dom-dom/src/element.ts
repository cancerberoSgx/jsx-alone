import { Node } from './node';

export class Element extends Node {
  constructor(public readonly tagName: string) {
    super(Node.ELEMENT_NODE);
  }
}
