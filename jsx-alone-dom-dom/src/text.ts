import { MNode } from './node';
export class MTextNode extends MNode {
  constructor(protected _textContent: string) {
    super(MNode.TEXT_NODE);
  }
  get textContent(){
    return this._textContent
  }
  set textContent(c:string){
    this._textContent=c
  }
}
