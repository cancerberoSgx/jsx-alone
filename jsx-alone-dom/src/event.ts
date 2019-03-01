import { getElementMark, markElement } from './mark'
import { unique } from 'jsx-alone-core'
import { MEvent } from './types'

export type EventListener<C extends EventTarget | HTMLElement = any, T extends EventTarget | HTMLElement = any> = (e: MEvent) => any

interface Entry {
  mark: string,
  fn: EventListener
  type: string
  options?: boolean | AddEventListenerOptions
}

/**
 * Provides event delegation management to all nodes generated in a render()
 * call, using the root element (the one returned bu JSXAlone.render() call) to addEventListener
 *
 * TODO: remove registeredByType tp speed up - we dont really need that.
 *
 * TODO: options
 */
export class RootEventManager {

  constructor(private root: HTMLElement) {
    this.rootListener = this.rootListener.bind(this)
  }

  private registeredByType: { [type: string]: Entry[] } = {}

  private mark = '_jsxa_e' + unique('_')
  private markElement(el: HTMLElement) {
    return markElement(el, this.mark)
  }
  private getElementMark(e: HTMLElement) {
    return getElementMark(e, this.mark)
  }

  /** private handler for all events */
  private rootListener(e: MEvent): any {
    if (e.target) {
      const mark = this.getElementMark(e.target)
      const entry = mark && (this.registeredByType[e.type.toLowerCase()] || []).find(e => e.mark === mark)
      if (entry) {
        entry.fn(e)
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

  uninstall(types?: []) {
    (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
      (this.registeredByType[t] || []).map(e => e.fn).forEach(listener => {
        this.root.removeEventListener(t, listener)
      })
    })
  }

}
