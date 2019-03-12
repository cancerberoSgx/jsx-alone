import { MNode } from './node'
import { MDocument } from './document'
export class MTextNode extends MNode {
  constructor( _textContent: string | null, ownerDocument: MDocument) {
    super(MNode.TEXT_NODE)
    this._textContent = _textContent
    this._ownerDocument = ownerDocument
  }

}
