import { ReactLike } from '..'
import { ElementClass } from '../elementImpl';

describe('render', () => {
  function test({ e, expected, label, expectedTabSize2 }: { e: JSX.Element; expected: string; label: string; expectedTabSize2?: string }) {
    it(label + ' without indent', () => {
      const output = ReactLike.render(e, { indent: false, indentTabSize: 0 })
      expect(output).toBe(expected)
    })
    if (expectedTabSize2) {
      it(label + 'with indentTabSize: 2', () => {
        const output = ReactLike.render(e, { indent: true, indentTabSize: 2 })
        expect(output).toBe(expectedTabSize2)
      })
    }
  }
  describe('elements', () => {
    test({
      label: 'should render element without children',
      e: <div />,
      expected: '<div></div>',
      expectedTabSize2: `<div>
  
</div>`
    })
    test({
      label: 'should render text child',
      e: <p>hello1</p>,
      expected: `<p>hello1</p>`,
      expectedTabSize2: `<p>
  hello1
</p>`
    })
    test({
      label: 'should render text children',
      e: <p>hello world how are you</p>,
      expected: `<p>hello world how are you</p>`,
      expectedTabSize2: `<p>
  hello world how are you
</p>`
    })
    test({
      label: 'should render element children on any depth',
      e: (
        <div>
          <ul>
            <li>one</li>
            <li>
              two: <span>hi</span>
            </li>
          </ul>
        </div>
      ),
      expected: `<div><ul><li>one</li><li>two: <span>hi</span></li></ul></div>`,
      expectedTabSize2: `<div>
  <ul>
    <li>
      one
    </li><li>
      two: <span>
        hi
      </span>
    </li>
  </ul>
</div>`
    })
  })

  describe('functions', () => {
    let f = (props: { people: { name: string; age: number }[] }) => (
      <ul>
        {props.people.map(p => (
          <li>
            {p.name} has half of {Math.trunc(p.age / 2)} years old
          </li>
        ))}
      </ul>
    )
    test({
      label: 'should render element children on any depth',
      e: f({ people: [{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }] }),
      expected: `<ul><li>seba has half of 9 years old</li><li>laura has half of 16 years old</li></ul>`
    })
  })

  
  describe('element class', () => {
    
class C extends ElementClass<{people:{ name: string; age: number }[]}>{
  render(){
    return  <ul>
    {this.props.people.map(p => (
      <li>
        {p.name} has half of {Math.trunc(p.age / 2)} years old
      </li>
    ))}
  </ul>
  }
}
    test({
      label: 'element class without parents or children',
      e: <C people={[{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }]}></C>,
      expected: `<ul><li>seba has half of 9 years old</li><li>laura has half of 16 years old</li></ul>`
    })
  })
})