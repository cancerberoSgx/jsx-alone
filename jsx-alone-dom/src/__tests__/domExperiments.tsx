import { JSXAlone } from '..'
import { ElementClass } from '../elementImpl'
import { test } from './testUtil'

describe('can I query elements that are not attached to the DOM?', () => {
  var d = document.createElement('div')
    d.setAttribute('id', 'doo')
    let e : HTMLElement


  it('getElementById, parentNode, parentElement ownerDocument wont work', ()=>{
    
    let e = document.getElementById('doo')!
    expect(e).toBeNull()
    expect(d.parentElement).toBeNull()
    expect(d.parentNode).toBeNull()

    //other stuff
    expect(d.baseURI).not.toBeNull()
    expect(d.namespaceURI).not.toBeNull()
  })

  it('ownerDocument, document.querySelectorAll(*) works', ()=>{
    
  expect(d.ownerDocument).not.toBeNull()
  expect(d.ownerDocument).toBe(document)
  expect(      Array.from(document.querySelectorAll('*')).filter(e=>e.getAttribute('id')!=='doo')).not.toHaveLength(0)

    
  })
})
