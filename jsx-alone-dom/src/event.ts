import { unique } from 'jsx-alone-core';
import { ElementClass } from './elementClass';
import { getElementMark, getMarkedDescendants, getMarkedElement, markElement, removeElementMark } from './mark';
import { ElementLike, EventManager } from './types';

export type EventListener<C extends EventTarget | HTMLElement = any, T extends EventTarget | HTMLElement = any> = (e: Event) => any

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
 *  * the event's `currentTarget` will be assigned with `target` (because if not it will be the root el) and this causes
 *    errors since the original el is expected and also Event's typings currentTarget is typed and target is not. This
 *    is done using es6 Proxy
 *
 *  * The elements are marked with a data attribute
 *
 * TODO: options
 * @internal
 */
export class RootEventManager implements EventManager {

  private registeredByType: { [type: string]: Entry[] } = {}

  private appendToDomListeners: (()=>void)[] = []
  
  mark = '_jsxa_e' + unique('_')

  constructor(private root: HTMLElement, private debug?: boolean) {
    this.rootListener = this.rootListener.bind(this)
  }

  private markElement(el: HTMLElement) {
    return markElement(el, this.mark)
  }

  private getElementMark(e: Element) {
    return getElementMark(e, this.mark)
  }

  private removeElementMark(e: Element) {
    return removeElementMark(e, this.mark)
  }

  private getMarkedElement(mark: string) {
    return getMarkedElement(mark, this.root, this.mark)
  }

  private getMarkedDescendants(e: Element) {
    return getMarkedDescendants(e, this.mark)
  }

  /** private handler for all events */
  private rootListener(e: Event): any {
    if (e.target) {
      const mark = this.getElementMark(e.target as HTMLElement)
      const entry = mark && (this.registeredByType[e.type.toLowerCase()] || []).find(e => e.mark === mark)
      if (entry) {
        // heads up - the user expect e.currentTarget to be the target the target element, but because of event
        // delegation it's the root element. This is why we wrap the event object with a proxy:
        entry.fn(new E(e) as any)
      }
    }
  }

  addAppendToDomListener(l: ()=>void) {
    this.appendToDomListeners.push(l)
  }

  onAppendToDom() {
    this.appendToDomListeners.forEach(l => l())
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
    else {
      // even if it's already registered, we replace fn with the new one since it's bind to an old `this`
      entry.fn = fn
    }
  }

  updateEventListeners(ec: ElementClass, oldEl: HTMLElement, newEl: HTMLElement, elLike: ElementLike): any {
    if (!oldEl || !ec || !newEl || !oldEl.getAttribute || !newEl.getAttribute) {
      return
    }
    const mark = this.getElementMark(oldEl as any)
    if (!mark) { return }
    Object.values(this.registeredByType).forEach(v => {
      v.filter(e => e.mark === mark).forEach(e => {
        e.fn = elLike.attrs[`on${e.type.substring(0, 1).toUpperCase()}${e.type.substring(1, e.type.length)}`].bind(ec)
      })
    })
  }

  removeListeners(el: HTMLElement, andDescendants = false, types?: []) {
    [...(this.getElementMark(el) ? [el] : []), ...(andDescendants ? this.getMarkedDescendants(el) : [])]
      .filter(m => m)
      .forEach(el => {
        const mark = this.getElementMark(el!)
        if (!mark) { return }
        (types || Object.keys(this.registeredByType)
          .map(t => t.toLowerCase()))
          .forEach(t => {
            this.registeredByType[t] = (this.registeredByType[t] || []).filter(e => e.mark !== mark)
          })
        this.removeElementMark(el)
      })
  }

  uninstall(removeElementMarks = false, types?: []) {
    (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
      this.root.removeEventListener(t, this.rootListener)
      if (removeElementMarks) {
        this.registeredByType[t].forEach(e => {
          const el = this.getMarkedElement(e.mark)
          if (el) {
            el.removeEventListener(e.type, e.fn, e.options)
          }
        })
      }
      this.registeredByType[t] = []
    })
  }

}

class E {
  constructor(private e: any) {
    return new Proxy(this, this)
  }
  get(target: any, prop: string) {
    if (prop === 'currentTarget') {
      return this.e.target
    }
    return this.e[prop]
  }
}
