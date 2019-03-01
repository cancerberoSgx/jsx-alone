import { JSXAlone, ElementClass } from '..'
import { fireEvent, render, test, query } from './testUtil'
import { Children } from 'jsx-alone-core'

describe('function attributes', () => {
  describe('output', () => {
    test({
      label: 'intrinsic element attribute should not be printed',
      e: (
        <button
          onClick={e => {
            alert('click')
          }}
        >
          click
        </button>
      ),
      expected: `alert`,
      asCodeNotContains: true,
      caseInsensitive: true

    })

    const f1 = (props: { name: string }) => (
      <button
        onClick={e => {
          alert(props.name)
        }}
      />
    )
    test({
      label: 'function element attribute should not be printed ',
      e: f1({ name: 'hello' }),
      asCodeNotContains: true,
      expected: `alert`,
      caseInsensitive: true
    })
  })

  describe('context', () => {
    it('intrinsic element', () => {
      const fn1 = jest.fn(e => {
        return var1 + e
      })
      const var1 = 'var1'
      const var2 = 'var2'
      const handler = jest.fn(e => {
        fn1(var2)
      })
      expect(handler).toBeCalledTimes(0)
      expect(fn1).toBeCalledTimes(0)
      const button = render(<button onClick={handler} />)
      button.click()
      expect(handler).toBeCalledTimes(1)
      expect(fn1).toBeCalledTimes(1)
      expect(fn1).lastCalledWith(var2)
      expect(fn1).lastReturnedWith(var1 + var2)
    })

    it('arrow el', () => {
      const fn1 = jest.fn(e => {
        return var1 + e
      })
      const var1 = 'var1'
      const var2 = 'var2'
      const handler = jest.fn(e => {
        fn1(var2)
      })
      expect(handler).toBeCalledTimes(0)
      expect(fn1).toBeCalledTimes(0)
      const F = (props: {}) => (
        <div>
          <button id="b2" onClick={handler} />
        </div>
      )
      const el = render(
        <div>
          <F />
        </div>
      )
      const button = el.querySelector<HTMLButtonElement>('#b2')!
      button.click()
      expect(handler).toBeCalledTimes(1)
      expect(fn1).toBeCalledTimes(1)
      expect(fn1).lastCalledWith(var2)
      expect(fn1).lastReturnedWith(var1 + var2)
    })

    xit('function attribute accessing this.prop and prototype prop should work in extras by default', () => {
      const fn1 = jest.fn()
      const var1 = 'var1'
      const expected = `foo_bar_var1`
      expect(fn1).toBeCalledTimes(0)
      function F(this: { bar: string }, props: {}) {
        this.bar = 'bar'
        const foo = 'foo'
        expect(foo + '_' + this.bar + '_' + var1).toBe(expected)
        return <div>
          <button id="b2" onClick={e => fn1(foo + '_' + this.bar + '_' + var1)} />
        </div>
      }
      render(<F />)
      const button = query<HTMLButtonElement>('#b2')
      button.click()
      expect(fn1).toBeCalledTimes(1)
      expect(fn1).lastCalledWith(expected)
    })

    it('class el with intrinsic', () => {
      const fn1 = jest.fn(e => {
        return var1 + e
      })
      const var1 = 3
      expect(fn1).toBeCalledTimes(0)

      class Container extends ElementClass<{ children: Children }> {
        render() {
          return <div>{this.props.children}</div>
        }
      }
      class App extends ElementClass {
        bar = 2
        render() {
          const foo = 1
          return (
            <div>
              <Container>
                <button id="b1" onClick={e => fn1(this.bar + foo)} />
              </Container>
              <button id="b2" onClick={e => fn1(this.bar + foo + 1)} />
            </div>
          )
        }
      }
      const el = render(<App />)
      const button = el.querySelector<HTMLButtonElement>('#b1')!
      fireEvent(button, 'click')
      expect(fn1).toBeCalledTimes(1)
      expect(fn1).lastCalledWith(1 + 2)
      expect(fn1).lastReturnedWith(var1 + 1 + 2)
    })

    fit('event object is accessible', () => {
      const handler = jest.fn(e => {
        // HEADS UP - because we use event delegation , currentTarget is not the real target, it's target!
        return e.type + e.target.id// return e.type + e.currentTarget.id

      })
      const el = render(
        <div>
          <button id="b1" onClick={handler}>
            asd
          </button>
          <input id="i1" value="foo" onChange={handler} />
        </div>
      )
      const button = el.querySelector<HTMLButtonElement>('#b1')!
      expect(handler).toHaveBeenCalledTimes(0)
      fireEvent(button, 'click')
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).lastReturnedWith('clickb1')
      const input = el.querySelector<HTMLInputElement>('#i1')!
      fireEvent(input, 'change')
      expect(handler).toHaveBeenCalledTimes(2)
      expect(handler).lastReturnedWith('changei1')
    })

    xit('every standard on* event works', () => {

    })

    xit('event listeners are disposed on re-rendering - intrinsic elements', () => {
      // ISSUE
      const handler = jest.fn(e => {
        return e.type + e.currentTarget.id
      })
      const d = (
        <div>
          <button id="b1" onClick={handler}>
            asd
          </button>
          <input id="i1" value="foo" onChange={handler} />
        </div>
      )
      const el = render(d)
      expect(handler).toHaveBeenCalledTimes(0)
      const button = el.querySelector<HTMLButtonElement>('#b1')!
      fireEvent(button, 'click')
      expect(handler).toHaveBeenCalledTimes(1)
      el.remove()
      el.parentElement!.removeChild(el)
      el.innerHTML = '' // this don't work
      fireEvent(button, 'click')
      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
