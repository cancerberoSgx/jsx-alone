import { ElementClass as AbstractElementClass } from 'jsx-alone-core'
import { IElementClass, RootEventManager} from '.'

/** 
 * Base Element Class. Has support for removing event listeners thought this.eventManager which is 
 * assigned as property at render time and is responsible of event delegation. 
 */
export abstract class ElementClass<P = {}> extends AbstractElementClass<P> implements IElementClass<P> {

  protected _eventManager?: RootEventManager

  get eventManager() {
    return this._eventManager
  }

  destroy() {
    this.eventManager && this.eventManager.uninstall()
  }

  afterRender(containerEl: HTMLElement) {
  }
  
  beforeRender(containerEl: HTMLElement) {
  }

}

export function isElementClass(c: any): c is ElementClass {
  return !!((c as ElementClass).render && (c as ElementClass).afterRender)
}

