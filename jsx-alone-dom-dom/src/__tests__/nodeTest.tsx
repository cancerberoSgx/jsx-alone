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

test('innerHTML', () => {
  const doc = new MDocument()
  const html = `<div class="c1"><p id="foo">hello</p>world</div>`
  const n = fromHtml(html, doc)
  expect(n.innerHTML).toBe('<div class="c1"><p id="foo">hello</p>world</div>')
  document.body.innerHTML = html
  expect(n.innerHTML).toBe(document.body.innerHTML)
})