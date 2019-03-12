/**
 * @jest-environment jsdom
 */

 import { fromHtml, nodeAttributesPretty } from './testUtil'
 import { MDocument } from '../document'
 import { MNode } from '../node'
 import { nodeTypes, nodeTexts, nodeAttributes } from '../util/nodeUtil'

 test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
  element.innerHTML = `<p><span></p><p></span></p>`
  document.body.appendChild(element)
  expect(document.body.querySelectorAll('p')).toHaveLength(2)
})

 test('children only returns elements', () => {
  document.body.innerHTML = `text <i>not</i> more <br/> text`
  expect(document.body.children).toHaveLength(2)
})

 test('children returns elements and text', () => {
  document.body.innerHTML = `text <i>not</i> more <br/> text`
  expect(document.body.childNodes).toHaveLength(5)
})

 test('should be able to use jsdom innerHtml to create MNodes', () => {
  const doc = new MDocument()
  const html = `<p id="heh"> foo <br/> bar </p>`
  document.body.innerHTML = html
  expect(nodeTypes(document.body.childNodes[0])).toEqual([1, 3, 1, 3])
  const n = fromHtml(html, doc)
  expect(nodeTypes(n)).toEqual([1, 3, 1, 3])

  const jsdom = nodeTexts(document.body.childNodes[0])
  const ours = nodeTexts(n)
  expect(jsdom).toEqual(ours)
})

 it('attributes', () => {
  const h = `
<p id="foo"> gre eti ngs
  <span data-foo="33as3"> hello
    <input type="checkbox" checked/>
    <i>
      <strong id="d"> good bye</strong>
    </i>
  </span>
</p>`
  document.body.innerHTML = h
  const el = fromHtml(h, new MDocument())
  expect(nodeAttributes(document.body.childNodes[0])).toEqual(nodeAttributes(el))
})

 describe('isEqualNode', () => {
  it('equals', () => {
    document.body.innerHTML =  `<p class="foo">hello</p><p class="foo">hello</p>`
    // console.log(document.body.children[0].outerHTML);
    // console.log(document.body.children[1].outerHTML);
    expect(document.body.children[0].isEqualNode(document.body.children[1])).toBe(true)
  })
  it('attrs', () => {
    document.body.innerHTML =  `<p class="foo">hello</p><p class="bar">hello</p>`
    // console.log(document.body.children[0].outerHTML);
    // console.log(document.body.children[1].outerHTML);
    expect(document.body.children[0].isEqualNode(document.body.children[1])).not.toBe(true)
  })
  it('children', () => {
    document.body.innerHTML =  `<p class="foo">hello</p><p class="foo">world</p>`
    // console.log(document.body.children[0].outerHTML);
    // console.log(document.body.children[1].outerHTML);
    expect(document.body.children[0].isEqualNode(document.body.children[1])).not.toBe(true)
  })
  it('descendants', () => {
    document.body.innerHTML =  `<p class="foo"><i>hello</i></p><p class="foo"><i>world</i></p>`
    // console.log(document.body.children[0].outerHTML);
    // console.log(document.body.children[1].outerHTML);
    expect(document.body.children[0].isEqualNode(document.body.children[1])).not.toBe(true)
  })
})

// describe('replaceChild', ()=>{
//   it('simple', () => {
//     const html = `<p class="foo">hello</p><p class="foo">hello</p>`
//     const doc = new MDocument()
//     const p1 = fromHtml(`<div><p class="foo">hello</p><p class="foo">hello</p></div>`, doc)
//     const c1 = fromHtml(`<div class="child1">new</div>`, doc)
//     p1.childNodes[1].replaceWith(c1)
//     // document.body.innerHTML
//     console.log(p1);

//   })
// })
