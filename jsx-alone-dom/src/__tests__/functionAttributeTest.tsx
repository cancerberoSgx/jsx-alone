import { Children } from 'jsx-alone-core';
import { JSXAlone } from '..';
import { ElementClass } from '../elementImpl';
import { fireEvent, render, test } from './testUtil';

describe('function attributes', () => {
  describe('output', () => {
    test({
      label: 'intrinsic element attribute should not be printed',
      e: (
        <button
          onClick={e => {
            alert('click')
          }}>
          click
        </button>
      ),
      expected: `<button>click</button>`,
      asCodeEquals: true,
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
      expected: `<button></button>`,
      asCodeEquals: true,
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

    it('function el', () => {
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

    xit('function attribute in function element context', () => {
      //FAILS
      const fn1 = jest.fn(e => {
        return var1 + e
      })
      const var1 = 321
      expect(fn1).toBeCalledTimes(0)
      function F(this: { foo: number }, props: {}) {
        return (
          <div>
            <button
              id="b2"
              onClick={e => {
                // console.log(this, e);
                fn1(this.foo)
              }}
            />
          </div>
        )
      }
      F.prototype.foo = 123
      const el = render(
        <div>
          <F />
        </div>
      )
      const button = el.querySelector<HTMLButtonElement>('#b2')!
      button.click()
      expect(fn1).toBeCalledTimes(1)
      expect(fn1).lastCalledWith(var1 + 123)
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

    it('event object is accessible', () => {
      const handler = jest.fn(e => {
        return e.type + e.currentTarget.id
      })
      const el = render(
        <div>
          <button id="b1" onClick={handler}>
            asd{' '}
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

    xit('every standard on* event works', () => {})
    it('event listeners are disposed on re-rendering ', () => {
      const handler = jest.fn(e => {
      return e.type + e.currentTarget.id
    })
    const el = render(
      <div>
        <button id="b1" onClick={handler}>
          asd{' '}
        </button>
        <input id="i1" value="foo" onChange={handler} />
      </div>
    ) 
    expect(handler).toHaveBeenCalledTimes(0)
    const button = el.querySelector<HTMLButtonElement>('#b1')!
    fireEvent(button, 'click')
    expect(handler).toHaveBeenCalledTimes(1)
    el.innerHTML=''
    fireEvent(button, 'click')
    expect(handler).toHaveBeenCalledTimes(1)
    })
  })

})
