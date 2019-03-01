import { JSXAlone } from '..'
import { ElementClass } from '../elementImpl'
export abstract class DummyStatefulComponent<P = {}, S = P> extends ElementClass<P> {
  state: S
  constructor(p: P) {
    super(p)
    this.state = { ...(p as any) }
  }
  /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
   * Notice that descendant elements will be destroyed and */
  setState(s: Partial<S>) {
    // @ts-ignore
    this.state = { ...this.state, ...s }
    if (!this.containerEl) {
      throw new Error('this.containerEl=== undefined cannot do magic in DummyStatefulComponent')
    }
    const jsx = this.render()
    const el = JSXAlone.render(jsx)
    this.containerEl.parentElement!.replaceChild(el, this.containerEl)
    this.containerEl = el as HTMLElement
  }
}
