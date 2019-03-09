import { MNode } from './node';
export class MTextNode extends MNode {
  constructor(protected   _textContent: string | null) {
    super(MNode.TEXT_NODE);
  }
}
