import { MDocument } from '../document'

const doc = new MDocument()

const d = doc.createElement('div')
d.setAttribute('id', 'i1')
doc.body.appendChild(d)

const c = doc.createElement('span')
c.setAttribute('class', 'ccc')
d.appendChild(c)
c.appendChild(doc.createTextNode('This was generated using jsx-alone-dom-dom little DOM  implementation'))

window.document.getElementById('output')!.innerText = d.outerHTML!
