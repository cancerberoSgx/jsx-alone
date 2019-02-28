import { DummyImpl as JSXAlone, ElementClass, OutputEl } from './DummyImpl'
describe('DummyImpl', () => {

  it('intrinsic', () => {
    expect(
      JSXAlone.render(<div className="foo">hello</div>))
      .toEqual(
        {
          tag: 'div',
          innerHtml: undefined,
          attrs: { className: 'foo' },
          children: [{ content: 'hello' }]
        }
      )
  })


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
    it('element class without parents or children', () => {

      expect(
        JSXAlone.render(<C people={[{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }]} />))
        .toEqual(
          {
            "tag": "ul",
            "attrs": {},
            "children": [
              {
                "tag": "li",
                "attrs": {},
                "children": [{ "content": "seba" }, { "content": " has half of " }, 
                { "content": 9 }, { "content": " years old" }]
              },
              {
                "tag": "li",
                "attrs": {},
                "children": [{ "content": "laura" }, { "content": " has half of " }, 
                { "content": 16 }, { "content": " years old" }]
              }
            ]
          }

        )
    })

  })



})
