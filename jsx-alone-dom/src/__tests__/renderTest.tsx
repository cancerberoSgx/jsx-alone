import { JSXAlone, ElementClass } from '..'
import { render, prepareRenderParent, query } from './testUtil'
import { unique } from 'jsx-alone-core';
import { ElementLikeImpl } from '../elementImpl';
describe('render', () => {
  describe('updateExisting', () => {
    it('should update existing elements if updateExisting is passed', () => {
      interface P { name: string }
      class C extends ElementClass<P> {
        state: P
        constructor(p: P) {
          super(p)
          this.state = { ...p }
        }
        render() {
          return <p>{this.state.name}<i>{this.state.name.length}</i></p>
        }
      }
      const c = new C({ name: 'seba' })
      const el = JSXAlone.render(c.render()) as HTMLElement
      const parent = prepareRenderParent()
      parent.append(el)
      expect(parent.outerHTML).toEqual(`<div id="test-root"><p>seba<i>4</i></p></div>`)

      c.state.name = 'lau'
      const el2 = JSXAlone.render(c.render(), {
        updateExisting: el
      }) as HTMLElement
      expect(parent.outerHTML).toEqual(`<div id="test-root"><p>lau<i>3</i></p></div>`)
    })

    it('a component should be able to update just the elements that changed', () => {
      interface P { name: string }
      class C extends ElementClass<P> {
        state: P
        containerEl: HTMLElement | undefined
        constructor(p: P) {
          super(p)
          this.state = { ...p }
        }
        render() {
          return <p><i className="changed">{this.state.name}</i><i className="same"></i></p>
        }
        afterRender(containerEl: HTMLElement) {
          this.containerEl = containerEl
        }
        updateUI() { // we don't want to implement update() on purpose here!
          JSXAlone.render(this.render(), {
            updateExisting: this.containerEl
          })
        }
      }
      const c = new C({ name: 'seba' })
      const parent = prepareRenderParent()
      const el = JSXAlone.render(c.asJSXElement(), { parent }) as HTMLElement
      
      const s1 = parent.querySelector('.same')!
      const c1 = parent.querySelector('.changed')!
      const c1Text = c1.textContent + ''

      c.state.name = 'lau'
      c.updateUI()

      const s2 = parent.querySelector('.same')!
      const c2 = parent.querySelector('.changed')!
      expect(s1).toBe(s2)
      expect(c1).toBe(c2)
      expect(c1.textContent).toBe(c2.textContent)
      expect(c1.textContent).not.toEqual(c1Text)

    })
  })
})
