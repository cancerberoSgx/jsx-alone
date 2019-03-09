import { MNode } from './node';
export class MTextNode extends MNode {
  constructor( _textContent: string | null) {
    super(MNode.TEXT_NODE);
    this._textContent=_textContent
  }

  get textContent(){
    return this._textContent
  }
  set textContent(c:string|null){
    this._textContent=c
  }
}
