import {Document} from '../document'
import { checkNoDom, checkDomIsImplementation } from './testUtil'
import {JSXAlone} from 'jsx-alone-dom'
import { install } from '../install';

describe('jsx-alone-dom', () => {
  checkNoDom()
  it('should render', () => {
    install()
    checkDomIsImplementation(document.body)
    const c = <p>1</p>
    const r = JSXAlone.render(c, document.body as any)!
    console.log(JSON.stringify(document.body));
    expect(r.nodeType).toBe(Node.ELEMENT_NODE)
    expect(r.childNodes.item(0).nodeType).toBe(Node.TEXT_NODE)
    expect(r.childNodes).toHaveLength(1)

    checkDomIsImplementation(r as HTMLElement)
  })
})
