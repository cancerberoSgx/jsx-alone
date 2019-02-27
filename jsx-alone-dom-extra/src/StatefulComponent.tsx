import { ElementClass } from './'

export abstract class StatefulComponent<P = {}, S ={}> extends ElementClass<P> {
  state: S ={} as any

  constructor(p: P) {
    super(p)
    this.state ={} as any
  }
  protected containerEl: HTMLElement = undefined as any

  /** called by ElementLike.render() */
  setContainerEl(el: HTMLElement) {
    this.containerEl = el
  }

  /** changes the state, clean up containerEl and renders the element again and append it to containerEl. 
   * Notice that descendant elements will be destroyed and */
  setState(  s: Partial<S>) {
    //@ts-ignore
    this.state = { ...this.state, ...s }  
  }
}

 
