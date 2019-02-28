import { RefObject, unique } from 'jsx-alone-core';
import { ElementClass } from '.';

export class RefObjectImpl<T extends Element & ElementClass> implements RefObject<T> {
  _current: T | string | null = null
  public get current(): T | null {
    return typeof this._current === 'string' ? getMarkedElement(this._current) : this._current
  }
}
export function markElement(e: HTMLElement, label = '_jsxa_') {
  let key = e.getAttribute(`data-${label}`)
  if (!key) {
    key = unique(label)
    e.setAttribute(`data-${label}`, key)
  }
  return key
}
export function getElementMark(e: HTMLElement, label = '_jsxa_') {
  return e.getAttribute(`data-${label}`)
}

export function getMarkedElement<T extends Element=Element>(key: string, parent = document, label = '_jsxa_') {
  return parent.querySelector<T>(`[data-${label}="${key}"]`)
}