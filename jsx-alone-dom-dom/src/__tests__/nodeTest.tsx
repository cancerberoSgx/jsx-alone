/**
 * @jest-environment jsdom
 */

 import { fromHtml, nodeAttributesPretty } from './testUtil'
 import { MDocument } from '../document'
 import { MNode } from '../node'
 import { nodeTypes, nodeTexts, nodeAttributes } from '../util/nodeUtil'

 test('node attributes', () => {
  const doc = new MDocument()
  const el = doc.createElement('div')
  el.setAttribute('a1', 'a1')
  expect(el.getAttribute('a1')).toBe('a1')
  expect(el.getAttribute('a2')).toBe(null)
  expect(Array.from(el.attributes)).toEqual([{name: 'a1', value: 'a1'}])
})
