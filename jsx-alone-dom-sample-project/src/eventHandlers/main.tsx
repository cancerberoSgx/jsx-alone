import { AbstractCoreMouseEvent, Children, MouseEvent } from 'jsx-alone-core'
import { ElementClass, JSXAlone } from 'jsx-alone-dom'
import { printMs } from 'jsx-alone-sample-project-code'

class Button extends ElementClass<{ onClick: (event: MouseEvent<HTMLButtonElement, AbstractCoreMouseEvent>) => void; children: string }> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>
  }
}

class Container extends ElementClass<{ children: Children }> {
  render() {
    return <div>{this.props.children}</div>
  }
}

class App extends ElementClass<{
  name: string
  tasks: string[]
}> {
  foo() {
    return printMs(Date.now())
  }
  render() {
    const foo = 'hello'
    return (
      <div>
        <Container>
          <p>
            just some tests for function attributes context
            <button
              onClick={e => {
                console.log(this, this.props.name, this.foo(), foo)
                // debugger
              }}>
              Render!
            </button>
            <Container>
              <button
                onClick={e => {
                  console.log(this, this.props.name, this.foo(), foo)
                  // debugger
                }}>
                sss!
              </button>
            </Container>
            <Button
              onClick={e => {
                console.log(this, this.props.name, this.foo(), foo)
                // debugger
              }}>
              second
            </Button>
          </p>
        </Container>
      </div>
    )
  }
}

const bar = 'bar'
// render the App and append the generated element to body
const app = (
  <div>
    <button
      onClick={e => {
        //@ts-ignore
        console.log(this, printMs(Date.now()), bar)
        // debugger
      }}>
      no root element class2
    </button>

    <Container>
      <button
        onClick={e => {
          //@ts-ignore
          console.log(this, printMs(Date.now()), bar)
          // debugger
        }}>
        should not override this with Container
      </button>
    </Container>

    <App name="John Doe" tasks={['Wash dishes', 'Go outside', 'Play soccer']} />
  </div>
)
const el = JSXAlone.render(app)
document.body.appendChild(el)
