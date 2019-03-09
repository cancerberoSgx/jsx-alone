/**
 * @jest-environment jsdom
 */

 import { fromHtml } from './testUtil';
import { MDocument } from '../document';
import { MNode } from '../node';
import { nodeTypes } from '../util';

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
  element.innerHTML=`<p><span></p><p></span></p>`
  document.body.appendChild(element)
  expect(document.body.querySelectorAll('p')).toHaveLength(2)
});


test('children only returns elements', () => {
  document.body.innerHTML=`text <i>not</i> more <br/> text`
  expect(document.body.children).toHaveLength(2)
});

test('children returns elements and text', () => {
  document.body.innerHTML=`text <i>not</i> more <br/> text`
  expect(document.body.childNodes).toHaveLength(5)
});

test('should be able to use jsdom innerHtml to create MNodes', () => {
  const doc = new MDocument()
  const html = `<p id="heh"> foo <br/> bar </p>`
  document.body.innerHTML=html
  expect(nodeTypes(document.body)).toEqual([1, 1, 3, 1, 3])
  const n = fromHtml(html, doc)
  expect(nodeTypes(n)).toEqual([1, 1, 3, 1, 3])
});
