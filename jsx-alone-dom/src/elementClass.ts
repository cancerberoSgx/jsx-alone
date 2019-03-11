import { ElementClass as AbstractElementClass } from 'jsx-alone-core'
import { IElementClass, RootEventManager} from '.'

export abstract class ElementClass<P = {}> extends AbstractElementClass<P> implements IElementClass<P> {

  protected _eventManager?: RootEventManager

  neverUpdate: boolean = false

  get eventManager() {
    return this._eventManager
  }

  afterRender(containerEl: HTMLElement) {

  }

}

export function isElementClass(c: any): c is ElementClass {
  return !!((c as ElementClass).render && (c as ElementClass).afterRender)
}
