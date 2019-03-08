import { JSXAlone } from '..'
import { ElementClass } from '../elementClass'
import { test, query, render } from './testUtil'
import { unique } from 'jsx-alone-core'

describe('element class', () => {

describe('render', () => {
  class C extends ElementClass<{ people: { name: string; age: number }[] }> {
    render() {
      return <ul>{this.props.people.map(p =>
        <li>{p.name} has half of {Math.trunc(p.age / 2)} years old</li>
      )}</ul>
    }
  }
  test({
    label: 'element class without parents or children',
    e: <C people={[{ name: 'seba', age: 18 }, { name: 'laura', age: 33 }]} />,
    expected: `<ul><li>seba has half of 9 years old</li><li>laura has half of 16 years old</li></ul>`
  })
})

describe('destroy', () => {

    // it('event listeners should be removed when destroy() is call on root and non root element classes', () => {
    //   const id = unique(), id2 = unique()
    //   let f = 0
    //   class C extends ElementClass {
    //     render() {
    //       return <div>
    //         <button id={id} onClick={e => {
    //         this.destroy()
    //         expect(f).toBe(0)
    //         expect(this.eventManager).toBeDefined()
    //         f++
    //       }
    //       }></button>
    //       <button id={id2}></button>
    //       </div>
    //     }
    //   }
    //   render(<C></C>)
    //   query(`#${id2}`).click()
    //   expect(f).toBe(0)
    //   const b = query(`#${id}`)
    //   b.click()
    //   query(`#${id2}`).click()
    //   expect(f).toBe(1)
    //   b.click()
    //   query(`#${id2}`).click()
    //   expect(f).toBe(1)
    // })

  })
it('should call afterRender', () => {
    const fn = jest.fn()
    class C extends ElementClass  {
      render() {
        return <div></div>
      }
      afterRender() {
        fn()
      }
    }
    expect(fn).toBeCalledTimes(0)
    JSXAlone.render(<C></C>)
    expect(fn).toBeCalledTimes(1)

  })

})
