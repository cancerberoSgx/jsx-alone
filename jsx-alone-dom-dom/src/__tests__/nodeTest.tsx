/**
 * @jest-environment jsdom
 */
import { MDocument } from '../document';
import { fromHtml } from './testUtil';

test('attributes', () => {
  const doc = new MDocument()
  const el = doc.createElement('div')
  el.setAttribute('a1', 'a1')
  expect(el.getAttribute('a1')).toBe('a1')
  expect(el.getAttribute('a2')).toBe(null)
  expect(Array.from(el.attributes)).toEqual([{ name: 'a1', value: 'a1' }])
})

xtest('isEqualNode', () => {
  const doc = new MDocument()
  const e1 = doc.createElement('div')
  const e2 = doc.createElement('div')
  expect(e1.isEqualNode(e2)).toBe(true)
})

test('replaceWith', () => {
  const doc = new MDocument()
  const n = fromHtml(`<div class="c1"><p id="foo">hello</p>world</div>`, doc)
  n.childNodes.item(0)!.replaceWith(fromHtml(`<a href="foo">link</a>`, doc))
  expect(n.outerHTML).toBe('<div class="c1"><a href="foo">link</a>world</div>')
}) 

test('innerHTML', () => {
  const doc = new MDocument()
  const html = `<div class="c1"><p id="foo">hello</p>world</div>`
  const n = fromHtml(html, doc)
  expect(n.innerHTML).toBe('<p id="foo">hello</p>world')
  document.body.innerHTML = html
  expect(n.innerHTML).toBe(document.body.children[0].innerHTML)
})

test('outerHtml', () => {
  const doc = new MDocument() 
  const html = `<div class="c1"><p id="foo">hello</p>world</div>`
  const n = fromHtml(html, doc)
  expect(n.outerHTML).toBe('<div class="c1"><p id="foo">hello</p>world</div>')
  document.body.innerHTML = html
  expect(n.outerHTML).toBe(document.body.children[0].outerHTML)
})
