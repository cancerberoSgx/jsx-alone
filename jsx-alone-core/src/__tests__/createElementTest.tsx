import {  JSXAloneJsonImpl as JSXAlone, JsonImplOutputEl} from '../JsonImpl';
import { ElementLike, JSXAloneElement } from '../types';
describe('createElement', () => {
  describe('updateElement', () => {
    it('should u', () => {
      const e = <div>1</div> as any as ElementLike<any>
      expect(e.tag).toBe('div')
      expect(e.attrs.className).toBe(undefined)
      expect(e.children).toHaveLength(1)
      expect((e.children[0]as any).content).toBe('1')
      JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'])
      expect(e.tag).toBe('p')
      expect(e.attrs.className).toBe('seba')
      expect((e.children[0]as any).content).toBe('2')
      expect(e.children).toHaveLength(1)

    })

    it('should append child if create=true', () => {
      const e = <div>1</div> as any as ElementLike<any>
      expect(e.tag).toBe('div')
      expect(e.attrs.className).toBe(undefined)
      expect(e.children).toHaveLength(1)
      expect((e.children[0]as any).content).toBe('1')
      JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'], true)
      expect(e.tag).toBe('p')
      expect(e.attrs.className).toBe('seba')
      expect(e.children).toHaveLength(2)
      expect((e.children[0]as any).content).toBe('1')
      expect((e.children[1]as any).content).toBe('2')

    })

    // it('should help on updating el class', () => {
    //   class C extends JsonImplElementClass<{ people: { name: string; age: number }[] }> {
    //     render() {
    //       return (
    //         <ul>
    //           {this.props.people.map(p => (
    //             <li>
    //               {p.name} has half of {Math.trunc(p.age / 2)} years old
    //           </li>
    //           ))}
    //         </ul>
    //       )
    //     }
    //   }

    //   const e = <div>1</div> as any as ElementLike<any>
    //   JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'], true)
    //   expect(e.tag).toBe('p')
    //   expect(e.attrs.className).toBe('seba')
    //   expect(e.children).toHaveLength(2)
    //   expect((e.children[0]as any).content).toBe('1')
    //   expect((e.children[1]as any).content).toBe('2')

    // })

  })
})
