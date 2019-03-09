import { install, uninstall } from '../install';
import { MDocument } from '../document';
import { MElement } from '../element';
import { MNode } from '../node';
import { isElement } from '../util';

export function testNoDom(el?: Element) {
  it('should run in clean environment', () => {
    //@ts-ig nore
    expectNoDom(el);
  })
}


export function expectNoDom(el?: Element) {
  expect(typeof document).toBe('undefined');
  //@ts-ign ore
  expect(typeof Node).toBe('undefined');
}

export function checkDomIsImplementation(el: Element) {
  expect(typeof document.querySelectorAll).toBe('undefined');
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

function cloneNode(d: Node, doc: MDocument): MNode {
  if (d.nodeType === Node.TEXT_NODE && d.textContent) {
    return doc.createTextNode(d.textContent)
  }
  else if (isElement(d)) {
    const o = doc.createElement(d.tagName)
    Array.from(d.attributes).forEach(a => o.getAttribute(a.name) && o.setAttribute(a.name, o.getAttribute(a.name)!))
    Array.from(d.childNodes).forEach(c => {
      o.appendChild(cloneNode(c, doc))
    })
    return o
  }
  else {
    throw 'node type not supported ' + d.nodeType
  }

}
