import { RefObject, unique } from 'jsx-alone-core'
import { ElementClass } from '.'
import { ElementLike } from './types'
import { getMarkedElement, markElement } from './mark'

/** @internal */
export class RefObjectImpl<T extends Element & ElementClass> implements RefObject<T> {
  _current: T | string | null = null
  public get current(): T | null {
    return typeof this._current === 'string' ? getMarkedElement(this._current) : this._current
  }
}

/** @internal */
export function setRef<T extends ElementClass & Element>({ el, value, elementLike }: { el: HTMLElement, value: RefObjectImpl<T>, elementLike: ElementLike }) {
    value._current = elementLike._elementClassInstance || markElement(el) as any
  }
