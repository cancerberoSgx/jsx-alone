import { ElementClass as AbstractElementClass } from 'jsx-alone-core'
import { IElementClass } from './types'
import { RootEventManager } from './event'

/** Base Element Class. Has support for removing event listeners thought this.eventManager which is assigned as property at render time and is responsible of event delegation. */
export abstract class ElementClass<P = {}> extends AbstractElementClass<P> implements IElementClass<P> {

  protected _eventManager?: RootEventManager
  
  containerEl: HTMLElement | undefined
  
  get eventManager() {
    return this._eventManager
  }
  
  setContainerEl(el: HTMLElement) {
    this.containerEl = el
  }

  destroy() {
    this.eventManager && this.eventManager.uninstall()
  }
  
  onAppendToDom(){
    
  }

  afterRender(){
    
  }
}
