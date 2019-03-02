import { ElementClass } from './'

export abstract class StatefulComponent<P = {}, S = P> extends ElementClass<P> {
  state: S = {} as any

  constructor(p: P) {
    super(p)
    this.state = {...(p as any)}
  }

  /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
   * Notice that descendant elements will be destroyed and */
  setState(  s: Partial<S>) {
    // @ts-ignore
    this.state = { ...this.state, ...s }
  }
  afterRender(containerEl: HTMLElement) {
    this.containerEl=containerEl
  }
  protected containerEl: HTMLElement|undefined

}
