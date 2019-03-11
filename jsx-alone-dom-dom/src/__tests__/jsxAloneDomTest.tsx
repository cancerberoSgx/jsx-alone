import { JSXAlone } from 'jsx-alone-dom'
import { install } from '../install'
import { checkDomIsImplementation, testNoDom, expectNoDom, nodeAttributesPretty } from './testUtil'
import { nodeTypes, nodeTexts, nodeAttributes } from '../util/nodeUtil'

describe('jsx-alone-dom', () => {
  beforeAll(() => {
    expectNoDom()
    install()
  })
  it('should render single text child', () => {
    install()
    checkDomIsImplementation(document.body)
    const c = <p>1</p>
    const r = JSXAlone.render(c, document.body as any)! as HTMLElement
    expect(r.nodeType).toBe(Node.ELEMENT_NODE)
    expect(r.tagName).toBe('p')
    expect(r.childNodes.item(0).nodeType).toBe(Node.TEXT_NODE)
    expect(nodeTypes(r)).toEqual([1, 3])
    // expect(nodeTexts(r)).toEqual( [ ])
    expect(r.childNodes).toHaveLength(1)
    checkDomIsImplementation(r as HTMLElement)
  })

  it('should render nested children', () => {
    install()
    checkDomIsImplementation(document.body)
    const c = <p><span>hello</span> world <p>how <i>are you</i>?<br /></p></p>
    const r = JSXAlone.render(c, document.body as any)!
    expect(r.nodeType).toBe(Node.ELEMENT_NODE)
    expect(nodeTypes(r)).toEqual([1, 1, 3, 3, 1, 3, 1, 3, 3, 1])
    expect(r.childNodes).toHaveLength(3)
    checkDomIsImplementation(r as HTMLElement)
  })

  it('should render attributes', () => {
    install()
    checkDomIsImplementation(document.body)
    const id = '2'
    const c = <p id={id}><span data-foo={1}>>hello <input type="checkbox" checked={true} /><i><strong id="d">good</strong>bye </i></span></p>
    const r = JSXAlone.render(c, document.body as any)!

    checkDomIsImplementation(r as HTMLElement)
    expect(r.nodeType).toBe(Node.ELEMENT_NODE)
    expect(nodeAttributesPretty(r)).toEqual([[
      "id=2"
    ],
    ["data-foo=1"],
      null,
    ["type=checkbox",
      "checked=checked"],
    [],
    ["id=d"],
      null,
      null
    ])

  })
})
