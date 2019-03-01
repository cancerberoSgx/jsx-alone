import { unique } from 'jsx-alone-core'

/** returns element mark, if it doesn't have one generates one. It adds an unique data-attribute */
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
export function isElementMarked(e: HTMLElement, label = '_jsxa_') {
  return !!getElementMark(e, label)
}
export function getMarkedElement<T extends Element = Element>(key: string, parent:NodeSelector = document, label = '_jsxa_') {
  return parent.querySelector<T>(getMarkSSelector(label, key))
}
export function getMarkSSelector(label: string, key?: string): string {
  return key ? `[data-${label}="${key}"]` : `[data-${label}]`
}
