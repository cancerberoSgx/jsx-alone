import { RefObject, unique } from 'jsx-alone-core';
import { ElementClass } from '.';
import { ElementLike } from './types';

export class RefObjectImpl<T extends Element & ElementClass> implements RefObject<T> {
  _current: T | string | null = null
  public get current(): T | null {
    return typeof this._current === 'string' ? getMarkedElement(this._current) : this._current
  }
}

  // /** @internal */
export function setRef<T extends ElementClass & Element>({ el, value, elementLike }: { el: HTMLElement, value: RefObjectImpl<T>, elementLike: ElementLike }) {
    // console.log('__addRef', elementLike._elementClassInstance || markElement(el));
    value._current = elementLike._elementClassInstance || markElement(el) as any
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