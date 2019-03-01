import { getElementMark, markElement, getMarkedElement } from './mark'
import { unique } from 'jsx-alone-core'
import { DelegatedEvent } from './types'

export type EventListener<C extends EventTarget | HTMLElement = any, T extends EventTarget | HTMLElement = any> = (e: DelegatedEvent) => any

interface Entry {
  mark: string,
  fn: EventListener
  type: string
  options?: boolean | AddEventListenerOptions
}

/**
 * Provides event delegation management to all nodes generated in a render() call, using the root element (the one
 * returned bu JSXAlone.render() call) to addEventListener
 *
 * Notes:
 *  
 *  * the event's `currentTarget` will be assigned with `target` (because if not it will be the root el) and this
 * causes errors since the original el is expected and also Event's typings currentTarget is typed and target is not
 * 
 *  * The elements are marked with a data attribute
 * 
 * TODO: options
 */
export class RootEventManager {

  private registeredByType: { [type: string]: Entry[] } = {}

  constructor(private root: HTMLElement, private debug?: boolean) {
    this.rootListener = this.rootListener.bind(this)
  }


  private mark = '_jsxa_e' + unique('_')
  private markElement(el: HTMLElement) {
    return markElement(el, this.mark,)
  }
  private getElementMark(e: HTMLElement) {
    return getElementMark(e, this.mark)
  }
  private getMarkedElement(mark:string) {
    return getMarkedElement(mark, this.root, this.mark)
  }


  /** private handler for all events */
  private rootListener(e: DelegatedEvent<HTMLElement>): any {
    if (e.target) {
      const mark = this.getElementMark(e.target)
      const entry = mark && (this.registeredByType[e.type.toLowerCase()] || []).find(e => e.mark === mark)
      if (entry) {
        // e.currentTarget=e.target // would be ideal but it wont work cause is readonly, instead we have to clone:
        // entry.fn({...e,  currentTarget: e.target, target: e.target})
        entry.fn(e)
        // @ts-ignore
        // entry.fn({...e, currentTarget: e.target})
      }
    }
  }

  addEventListener(el: HTMLElement, type: string, fn: EventListener) {
    type = type.toLowerCase()
    let ls = this.registeredByType[type]
    if (!ls) {
      ls = this.registeredByType[type] = []
      this.root.addEventListener(type, this.rootListener) //
    }
    const mark = this.markElement(el)
    let entry: Entry | undefined = ls.find(e => e.mark === mark)
    if (!entry) {
      entry = { mark, fn, type }
      ls.push(entry)
    }
  }

  /** removes event listeners for element inside root */
  removeListeners(el: HTMLElement, types?: []) {
    const mark = this.getElementMark(el)
    if (mark) {
      (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
        this.registeredByType[t] = (this.registeredByType[t] || []).filter(e => e.mark !== mark)
      })
    }
  }

  /** uninstall the event listeners in root. Reset the internal state. Optionally, remove the markings on descendant elements  */
  uninstall(removeElementMarks=false, types?: []) {
    (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
      this.root.removeEventListener(t, this.rootListener)
      if(removeElementMarks){
        this.registeredByType[t].forEach(e => {
          const el = this.getMarkedElement(e.mark)
          if(el){
            el.removeEventListener(e.type, e.fn, e.options)
          }
        })
      }
      this.registeredByType[t]=[]
    })
  }

}
