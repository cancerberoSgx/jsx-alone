import { JSXAlone } from '..'

describe('can I query elements that are not attached to the DOM?', () => {

  var d = document.createElement('div')
  d.setAttribute('id', 'doo')
  let e: HTMLElement

  it('getElementById, parentNode, parentElement ownerDocument wont work', () => {
    let e = document.getElementById('doo')!
    expect(e).toBeNull()
    expect(d.parentElement).toBeNull()
    expect(d.parentNode).toBeNull()
    expect(d.baseURI).not.toBeNull()
    expect(d.namespaceURI).not.toBeNull()
  })

  it('ownerDocument, document.querySelectorAll(*) works', () => {
    expect(d.ownerDocument).not.toBeNull()
    expect(d.ownerDocument).toBe(document)
    expect(Array.from(document.querySelectorAll('*')).filter(e => e.getAttribute('id') !== 'doo')).not.toHaveLength(0)
  })

  it('inlined event handlers are NOT removed when element is unattached automatically', () => {
   
    var d = document.createElement('div')
    document.body.appendChild(d)
    const b = document.createElement('button')
    d.appendChild(b)
    b.setAttribute('data-value', `0`)
    b.setAttribute('onclick', `var v = parseInt(this.getAttribute('data-value')); this.setAttribute('data-value', v+1) `)
    expect(b.getAttribute('data-value')).toBe("0")

    b.click()
    expect(b.getAttribute('data-value')).toBe("1")

    d.removeChild(b)
    b.remove()
    // d.innerHTML=''
    expect(b.getAttribute('data-value')).toBe("1")

    b.click()
    expect(b.getAttribute('data-value')).toBe("2")

    b.removeAttribute('onclick')
    // b.outerHTML='' // this wont work
    b.click()
    expect(b.getAttribute('data-value')).toBe("2")
  })

})

