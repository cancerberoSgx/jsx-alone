import { ElementClass, JSXAlone, ElementLikeImpl } from 'jsx-alone-dom';
import { emptyAllChildren } from '../../util/util';

/** the abstract component that supports updating its properties and when it happens update the DOM. store.subscribe() handlers will call updateProps() on the top level component (Main) and this will trigger a recursive re-render and props propagation through all the elements */
export abstract class Component<P={}> extends ElementClass<P> {

  protected containerEl: HTMLElement | undefined

  protected getComponentName() {
    return this.constructor.name
  }

  protected query<T extends HTMLElement=HTMLElement>(s: string): T {
    return this.containerEl!.querySelector(s)! as any
  }
  
  protected queryAll<T extends HTMLElement=HTMLElement>(s: string): T[] {
    return Array.from(this.containerEl!.querySelectorAll(s)) as any
  }

  beforeRender(containerEl: HTMLElement) {
    this.containerEl = containerEl
    if (this.updateExistingRemoveChildrenIfCountDiffer && this.containerEl) {
      emptyAllChildren(this.containerEl)
    }
  }

  afterRender(containerEl: HTMLElement) {
    this.containerEl = containerEl
  }

  updateProps(s: Partial<P>) {
    this._props = { ...this._props, ...s }
    const el = this.render();
    (el as any as ElementLikeImpl)._elementClassInstance = this
    JSXAlone.render(el, {
      updateExisting: this.containerEl,
      updateExistingRemoveChildrenIfCountDiffer: this.updateExistingRemoveChildrenIfCountDiffer
    })
  }

  protected updateExistingRemoveChildrenIfCountDiffer = false
}
