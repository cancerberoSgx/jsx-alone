import { JSXAlone, StatefulComponent } from '..'
import { DestructiveDomRenderComponent } from '../DestructiveDomRenderComponent';

export function statefulElementClassTestRenderApp(this: any) {
  const parent = document.createElement('div')
  document.body.appendChild(parent)
  const el = JSXAlone.render(<App people={[{ name: 'seba' }, { name: 'lau' }]} />, { parent  }) as HTMLElement
  parent.appendChild(el)
  return parent
}

interface RepeaterP{
  value: string
}
class Repeater extends DestructiveDomRenderComponent<RepeaterP, RepeaterP> {
  constructor(p: RepeaterP) {
    super(p)
    this.state = { ...p }
  }
  render() {
    return (
      <div className="Repeater">
        Write something:
        <input
          value={this.state.value}
          onKeyUp={e => {
            this.setState({ value: e.currentTarget.value })
          }}
        />
        <br />
        Will be repeated: <span>{this.state.value}</span>{' '}
      </div>
    )
  }
}

interface P {
  people: {
    name: string
  }[]
}

class App extends DestructiveDomRenderComponent<P, P> {
  constructor(p: P) {
    super(p)
    this.state = { ...p }
  }
  render() {
    return (
      <div className="App">
        <button id="add" onClick={e => this.setState({ people: [...this.state.people, { name: 'random name ' + Math.random() }] })}>
          add
        </button>
        <ul>
          {this.state.people.map(p => (
            <li data-id={p.name}>
              <Repeater value={p.name} />
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
      </div>
    )
  }
  setState(s: Partial<P>) {
    this.state = { ...this.state, ...s };
    this.containerEl!.innerHTML = '';
    this.containerEl!.appendChild(JSXAlone.render(this.render()));
  }
}