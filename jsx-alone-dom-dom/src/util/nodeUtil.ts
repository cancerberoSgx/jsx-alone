import { MNode, MAttr } from '../node'
import { MElement } from '../element'
const nodeUtil = 1
export function nodeTypes(n: MNode | Node): number[] {
  const o: number[] = []
  visitChildNodes(n, c => o.push(c.nodeType))
  return o
}
export function nodeTexts(n: MNode | Node): (string | null)[] {
  return mapChildNodes(n, c => c.textContent)
}
export function isElement(n: MNode | Node): n is Element | MElement {
  return n.nodeType === Node.ELEMENT_NODE
}
export function isText(n: MNode | Node): n is Element | MElement {
  return n.nodeType === Node.TEXT_NODE
}
export function nodeAttributes(n: MNode | Node): (MAttr[] | null)[] {
  return mapChildNodes(n, c => {
    if (isElement(c)) {
      const attrs: MAttr[] = []
      Array.from(c.attributes).forEach(a => attrs.push({ name: a.name, value: a.value }))
      return attrs
    }
    else {
      return null
    }
  })
}
export function visitChildNodes(n: MNode | Node, v: (c: MNode | Node) => void) {
  v(n)
  Array.from(n.childNodes as any).forEach(c => visitChildNodes(c as any, v))
}
export function mapChildNodes<T>(n: MNode | Node, v: (c: MNode | Node) => T): T[] {
  const o: T[] = []
  visitChildNodes(n, c => o.push(v(c)))
  return o
}


export function getNodeHtml(node: MNode, indentLevel = 0): string {
  if (!isElement(node)) {
    return node.textContent + ''
  }
  const attrs = Array.from(node.attributes)
  return `<${node.tagName.toLowerCase()}${attrs.length ? ' ' : ''}${
    attrs.map(a =>
      a.value && `${a.name}="${a.value.toString ? a.value.toString() : a.value}"`
    )
      .filter(a => a)
      .join(' ')}>${
    Array.from(node.childNodes).map(c => getNodeHtml(c)).join('')}</${node.tagName.toLowerCase()}>`
}
