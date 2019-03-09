import { MNode } from './node';
import { visitChildNodes, mapChildNodes } from './util';

export class MElement extends MNode {

  children: ElementList

  constructor(public readonly tagName: string) {
    super(MNode.ELEMENT_NODE)
    this.children=new ElementList(this._children)
  }

  get textContent(): string|null{
    return !this.childNodes || this.childNodes.length===0 ? '' : Array.from(this.childNodes||[]).map( c=>c.textContent).join('')
  }
  
  set textContent(c:string|null){
  this._textContent=c
  }

  // outerHTML: string;
  
  // id: string; // get/set
  // innerHTML: string;    
  // readonly classList: DOMTokenList;
  // className: string;  // get/set

  // HTMLELEMENT : 
  // click(): void;
  // innerText: string;


}

class ElementList<T extends MNode = MNode> {
  constructor(protected list: T[]) {

  }
  item(i: number): T | undefined {
    return this.list[i] || undefined
  }
  get length() {
    return this.list.length
  }
}