import { JSXAlone, ElementClass } from '..'
import { render, prepareRenderParent, query } from './testUtil'
import { unique } from 'jsx-alone-core'
import { ElementLikeImpl } from '../elementImpl'
describe('updateExisting', () => {

  abstract class StatefulComponent<P= {}> extends ElementClass<P> {
    state: P
    containerEl: HTMLElement | undefined
    constructor(p: P) {
      super(p)
      this.state = { ...p }
    }
    afterRender(containerEl: HTMLElement) {
      this.containerEl = containerEl
    }
    protected updateUI() {
      const el = this.render()
      // @ts-ignore
      el._elementClassInstance = this
      JSXAlone.render(el, {
        updateExisting: this.containerEl
      })
    }
    setState(s: Partial<P>) {
      this.state = { ...this.state, ...s }
      this.updateUI()
    }
  }

  it('should update existing elements if updateExisting is passed', () => {
    interface P { name: string }
    class C extends StatefulComponent<P> {
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
    class C extends StatefulComponent<P> {
      render() {
        return <p><i className="changed">{this.state.name}</i><i className="same"></i></p>
      }
    }
    const c = new C({ name: 'seba' })
    const parent = prepareRenderParent()
    const el = JSXAlone.render(c.asJSXElement(), { parent }) as HTMLElement

    const s1 = parent.querySelector('.same')!
    const c1 = parent.querySelector('.changed')!
    const c1Text = c1.textContent + ''

    c.setState({ name: 'lau' })

    const s2 = parent.querySelector('.same')!
    const c2 = parent.querySelector('.changed')!
    expect(s1).toBe(s2)
    expect(c1).toBe(c2)
    expect(c1.textContent).toBe(c2.textContent)
    expect(c1.textContent).not.toEqual(c1Text)
  })

  it('should update descendant components', () => {
    class C2 extends StatefulComponent<{ text: string }> {
      render() {
        return <p>{this.state.text}</p>
      }
    }
    class C extends StatefulComponent<{ name: string, text: string }> {
      render() {
        return <p>
          <i className="changed">{this.state.name}</i><i className="same"></i>
          <div className="shouldNotChange"><C2 text={this.state.text}></C2></div>
        </p>
      }
    }

    const c = new C({ name: 'seba', text: 'hello' })
    const parent = prepareRenderParent()
    const el = JSXAlone.render(c.asJSXElement(), { parent }) as HTMLElement
    const shouldNotChange = parent.querySelector('.shouldNotChange')!
    c.setState({ name: 'lau', text: 'world' })

    expect(el.outerHTML).toBe(`<p><i class=\"changed\">lau</i><i class=\"same\"></i><div class=\"shouldNotChange\"><p>world</p></div></p>`)
    expect(shouldNotChange).toBe(parent.querySelector('.shouldNotChange'))
  })

  it('event handlers should keep working after update', () => {
    let counter = 0
    class C2 extends StatefulComponent<{ text: string }> {
      render() {
        return <button onClick={e => {
          counter++
          e.currentTarget.setAttribute('data-id', this.state.text || 'NOTFOUND')
        }}>{this.state.text}</button>
      }
    }
    class C extends StatefulComponent<{ name: string, text: string }> {
      render() {
        return <p>
          <i>{this.state.name}</i><i className="same"></i>
          <div><C2 text={this.state.text}></C2></div>
        </p>
      }
    }

    const c = new C({ name: 'seba', text: 'hello' })
    const parent = prepareRenderParent()
    const el = JSXAlone.render(c.asJSXElement(), { parent }) as HTMLElement
    expect(el.outerHTML).toContain(`>hello</button></div></p>`)

    expect(parent.querySelector('button')!.getAttribute('data-id')).toBe(null)
    parent.querySelector('button')!.click()
    expect(parent.querySelector('button')!.getAttribute('data-id')).toBe('hello')

    c.setState({ name: 'lau', text: 'world' })

    expect(parent.querySelector('button')!.getAttribute('data-id')).toBe('hello')
    parent.querySelector('button')!.click()
    expect(parent.querySelector('button')!.getAttribute('data-id')).toBe('world')

    expect(counter).toBe(2)
  })

})
