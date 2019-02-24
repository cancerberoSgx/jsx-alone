import { JSXAlone } from '..'
import { ElementClass } from '../elementImpl'
import { test } from './testUtil'

describe('element class', () => {
  class C extends ElementClass<{ people: { name: string; age: number }[] }> {
    render() {
      return (
        <ul>
          {this.props.people.map(p => (
            <li>
              {p.name} has half of {Math.trunc(p.age / 2)} years old
            </li>
          ))}
        </ul>
      )
    }
  }
  test({
    label: 'element class without parents or children',
    e: <C people={[{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }]} />,
    expected: `<ul><li>seba has half of 9 years old</li><li>laura has half of 16 years old</li></ul>`
  })
})
