import { MNode } from '../node'
import { isElement } from './nodeUtil'
export function nodeHtml(node: MNode, outer = true): string {
  if (!isElement(node)) {
    return node.textContent + ''
  }
  const attrs = Array.from(node.attributes)
  return `${outer ? `<${node.tagName.toLowerCase()}${attrs.length ? ' ' : ''}${attrs.map(a => a.value && `${a.name}="${a.value.toString ? a.value.toString() : a.value}"`)
    .filter(a => a)
    .join(' ')}>` : ``}${Array.from(node.childNodes).map(c => nodeHtml(c)).join('')}${outer ? `</${node.tagName.toLowerCase()}>` : ``}`
}
