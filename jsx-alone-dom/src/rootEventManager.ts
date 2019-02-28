import { getElementMark, markElement } from './mark';


export interface MEvent<C extends EventTarget | HTMLElement = any, T extends EventTarget | HTMLElement = any> extends Event {
  // nativeEvent: E;
  currentTarget: C;
  target: T;
}

export type EventListener<C extends EventTarget | HTMLElement = any, T extends EventTarget | HTMLElement = any> = (e: MEvent) => any

interface Entry {
  mark: string,
  fn: EventListener
  type: string
  options?: boolean | AddEventListenerOptions
}

// listener: , options?: boolean | AddEventListenerOptions
const defaultConfig = {
}
const MARK = '_jsxa_e_'
const registeredByType: { [type: string]: Entry[] } = {}

/** provides event delegation management to all nodes generated in a render() call, using the 
 * root element (the one returned bu JSXAlone.render() call) */
export class RootEventManager {
  constructor(private root: HTMLElement, private config = defaultConfig) {
    this.rootListener = this.rootListener.bind(this)
  }
  private registeredByType: { [type: string]: Entry[] } = {}

  /** handles all events */
  private rootListener(e: MEvent): any {
    if (e.target) {
      const mark = this.getElementMark(e.target)
      const entry = mark && (this.registeredByType[e.type.toLowerCase()] || []).find(e => e.mark === mark)
      if (entry) {
        entry.fn.apply(e.target, [e])
      }
    }
  }
  private markElement(el: HTMLElement) {
    return markElement(el, MARK)
  }
  private getElementMark(e: HTMLElement) {
    return getElementMark(e, MARK)
  }

  addEventListener(el: HTMLElement, type: string, fn: EventListener) {
    type = type.toLowerCase()
    let ls = this.registeredByType[type]
    if (!ls) {
      ls = this.registeredByType[type] = []
      this.root.addEventListener(type, this.rootListener) // TODO: options   
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
    const mark = this.getElementMark(el);
    if (mark) {
      (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
        this.registeredByType[t] = (this.registeredByType[t] || []).filter(e => e.mark !== mark)
      })
    }
  }

  uninstall(types?: []) {
    (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
      (this.registeredByType[t] || []).map(e => e.fn).forEach(listener => {
        this.root.removeEventListener(t, listener)// TODO: options
      })
    })
  }
}

