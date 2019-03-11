import { install, uninstall } from '../install'
import { MDocument } from '../document'
import { MElement } from '../element'
import { cloneNode } from '../util/cloneNode'
import { MNode, MAttr } from '../node'
import { nodeAttributes } from '../util/nodeUtil'
import { isArray } from 'util'

export function testNoDom(el?: Element) {
  it('should run in clean environment', () => {
    // @ts-ig nore
    expectNoDom(el)
  })
}

export function expectNoDom(el?: Element) {
  expect(typeof document).toBe('undefined')
  // @ts-ign ore
  expect(typeof Node).toBe('undefined')
}

export function checkDomIsImplementation(el: Element) {
  expect(typeof document.querySelectorAll).toBe('undefined')
  expect(() => el.querySelectorAll('p')).toThrow()
}
export function expectJsdomIsInstalled(el?: Element) {

  expect((Node as any)._WATERMARK).toBeUndefined()
  expect((document as any)._WATERMARK).toBeUndefined()
  expect(typeof document.querySelectorAll).toBeDefined()
  el && expect((el as any)._WATERMARK).toBeUndefined()
}

/** creates MNodes using jsdom innerHtml and cloning */
export function fromHtml(s: string, doc: MDocument) {
  expectJsdomIsInstalled()
  const d = document.createElement('div')
  d.innerHTML = s
  return cloneNode(d, doc)
}

type T = string|null
type Q = T|T[]
export function nodeAttributesPretty(n: MNode | Node): Q {
  function print(a: MAttr[]|MAttr|null): any {
    return a == null ? null : !isArray(a) ?
    `${a.name}=${a.value}` :
    a.map(b => print(b))
  }
  return nodeAttributes(n).map(a => print(a))
}
