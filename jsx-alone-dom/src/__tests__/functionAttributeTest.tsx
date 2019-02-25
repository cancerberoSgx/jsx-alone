import { AbstractCoreMouseEvent, Children, MouseEvent } from 'jsx-alone-core';
import { JSXAlone } from '..';
import { ElementClass } from '../elementImpl';
import { dummy, fireEvent, render, test } from './testUtil';
//TODO: test function attributes scope in jsdom like dom-sample-project/eventHandlers
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

    xit('function with context', () => {
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
  })

  describe('context', () => {
    it('big app with handlers in many levels', () => {
      const handler = jest.fn(function(this: any, e) {
        return this
      })
      class Button extends ElementClass<{
        onClick: (event: MouseEvent<HTMLButtonElement, AbstractCoreMouseEvent>) => void
        children: string
        id?: string
      }> {
        render() {
          return (
            <button id={this.props.id} onClick={this.props.onClick}>
              {this.props.children}
            </button>
          )
        }
      }
      class Container extends ElementClass<{ children: Children }> {
        render() {
          return <div>{this.props.children}</div>
        }
      }
      function aux(s: any) {
        return `**${s}**`
      }
      class App extends ElementClass<{
        name: string
        tasks: string[]
        children: Children
      }> {
        foo() {
          return aux(3322)
        }
        render() {
          const foo = 'hello'
          return (
            <div>
              <button
                id="no-container"
                onClick={e => {
                  console.log(this, this.props.name, this.foo(), foo)
                  // debugger
                }}>
                no-container
              </button>
              <Container>
                <p>
                  just some tests for function attributes context
                  <button
                    id="container-button"
                    onClick={e => {
                      // console.log(this, this.props.name, this.foo(), foo)
                      handler(this.props.name + this.foo() + foo)
                      // debugger
                    }}>
                    container-button
                  </button>
                  <Container>
                    <button
                      id="container-container-button"
                      onClick={e => {
                        handler(this.props.name + this.foo() + foo)
                        // console.log(this, this.props.name, this.foo(), foo)
                        // debugger
                      }}>
                      container-container-button
                    </button>
                  </Container>
                  <Button
                    id="container-button-class-el"
                    onClick={e => {
                      handler(this.props.name + this.foo() + foo)
                      // console.log(this.props.name, this.foo(), foo)
                      // debugger
                    }}>
                    container-button-class-el
                  </Button>
                </p>
              </Container>
              {this.props.children}
            </div>
          )
        }
      }

      const bar = 'bar'
      // render the App and append the generated element to body
      const app = (
        <div>
          <button
            id="no-root-element-class2"
            onClick={e => {
              // //@ts-ignore
              // console.log(this, aux(Date.now()), bar)
              //@ts-ignore
              handler(bar + dummy(1) + aux(65), this && this.props)
              // debugger
            }}>
            no-root-element-class2
          </button>

          <Container>
            <button
              id="should-not-override-this-with-Container"
              onClick={e => {
                // //@ts-ignore
                // console.log(this, aux(65), bar, this&&this.props)
                // @ts-ignore
                handler(bar + dummy(1) + aux(65), this && this.props)
                // debugger
              }}>
              should-not-override-this-with-Container
            </button>
          </Container>

          <App name="John Doe" tasks={['Wash dishes', 'Go outside', 'Play soccer']}>
            <button
              id="should-not-have-ascendant-element-context"
              onClick={e => {
                // //@ts-ignore
                // console.log("should-not-have-app-context", this )
                //@ts-ignore
                handler(this && this.props && this.props.name)
                // debugger
              }}>
              should-not-have-ascendant-element-context
            </button>
          </App>

          <Container>
            <button
              id="should-not-have-app-context"
              onClick={e => {
                // //@ts-ignore
                // console.log("should-not-have-app-context" , this )
                //@ts-ignore
                handler(this && this.props && this.props.name)
                // debugger
              }}>
              should-not-have-app-context
            </button>
          </Container>
        </div>
      )

      const el = JSXAlone.render(app) as HTMLElement

      let b = el.querySelector<HTMLButtonElement>('#should-not-override-this-with-Container')!
      expect(handler).toHaveBeenCalledTimes(0)
      fireEvent(b, 'click')
      expect(handler).lastCalledWith('bar2**65**', undefined)

      b = el.querySelector<HTMLButtonElement>('#no-root-element-class2')!
      fireEvent(b, 'click')
      expect(handler).lastCalledWith('bar2**65**', undefined)

      b = el.querySelector<HTMLButtonElement>('#container-button-class-el')!
      fireEvent(b, 'click')
      expect(handler).lastCalledWith('John Doe**3322**hello')

      b = el.querySelector<HTMLButtonElement>('#should-not-have-app-context')!
      fireEvent(b, 'click')
      expect(handler).lastCalledWith(undefined)

      b = el.querySelector<HTMLButtonElement>('#should-not-have-ascendant-element-context')!
      fireEvent(b, 'click')
      expect(handler).lastCalledWith(undefined)

      b = el.querySelector<HTMLButtonElement>('#container-container-button')!
      fireEvent(b, 'click')
      expect(handler).lastCalledWith('John Doe**3322**hello')

      b = el.querySelector<HTMLButtonElement>('#container-button')!
      fireEvent(b, 'click')
      expect(handler).lastCalledWith('John Doe**3322**hello')
    })
  })
})
