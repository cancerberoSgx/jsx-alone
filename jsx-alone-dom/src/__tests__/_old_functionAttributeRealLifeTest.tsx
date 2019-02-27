import { Children } from 'jsx-alone-core'
import { ElementClass, JSXAlone } from '..'
import { render, query } from './testUtil'

describe('function attributes first experiments', () => {
  describe('real life app', () => {
    class Container extends ElementClass<{ children: Children }> {
      render() {
        return <div className="container">{this.props.children}</div>
      }
    }
    interface P {
      people: { name: string }[]
      container: HTMLElement
    }
    class App extends ElementClass<P> {
      state: P
      constructor(p: P) {
        super(p)
        this.state = { ...p }
      }
      render() {
        return (
          <Container>
            <button id="add" onClick={e => this.setState({ people: [...this.state.people, { name: 'random name ' + Math.random() }] })}>
              add
            </button>
            <ul>
              {this.state.people.map(p => (
                <li data-id={p.name}>
                  <div>{p.name}</div>
                  <button
                    className="remove"
                    onClick={e => {
                      this.setState({ people: this.state.people.filter(p2 => p2.name !== p.name) })
                    }}>
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </Container>
        )
      }
      setState(s: Partial<P>) {
        this.state = { ...this.state, ...s }
        this.props.container.innerHTML = ''
        this.props.container.appendChild(JSXAlone.render(this.render()))
      }
    }

    const container = document.createElement('div')
    document.body.appendChild(container)
    const el = JSXAlone.render(<App container={container} people={[{ name: 'seba' }, { name: 'lau' }]} />, { parent:container  }) as HTMLElement
    container.appendChild(el)

    it('events handler should work', ()=>{

      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      query('#add').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(3)
      document.querySelector<HTMLButtonElement>('[data-id="seba"] .remove')!.click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      document.querySelector<HTMLButtonElement>('[data-id="lau"] .remove')!.click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(1)
    })
  })
})