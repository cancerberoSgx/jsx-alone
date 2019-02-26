import { AbstractCoreMouseEvent, Children, MouseEvent } from 'jsx-alone-core';
import { JSXAlone } from '..';
import { ElementClass } from '../elementImpl';
import { dummy, fireEvent } from './testUtil';

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
                handler(this.props.name + this.foo() + foo)
                // console.log(this, this.props.name, this.foo(), foo)
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

    b = el.querySelector<HTMLButtonElement>('#no-container')!
    fireEvent(b, 'click')
    expect(handler).lastCalledWith('John Doe**3322**hello')
  })
})
