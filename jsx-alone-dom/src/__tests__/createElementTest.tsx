import { ElementLike } from '../types';
import {JSXAlone} from '..'
describe('createElement', () => {
  
  describe('updateElement', () => {
    it('should u', () => {
      const e = <div>1</div> as any as ElementLike<any>
      // console.log(e) 
      expect(e.tag).toBe('div')
      expect(e.attrs.className).toBe(undefined)
      expect(e.children).toHaveLength(1)
      expect((e.children[0]as any).content).toBe('1')
      JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'])
      // console.log(e) 
      expect(e.tag).toBe('p')
      expect(e.attrs.className).toBe('seba')
      expect((e.children[0]as any).content).toBe('2')
      expect(e.children).toHaveLength(1)

    })

    it('should append child if create=true', () => {
      const e = <div>1</div> as any as ElementLike<any>
      // console.log(e) 
      expect(e.tag).toBe('div')
      expect(e.attrs.className).toBe(undefined)
      expect(e.children).toHaveLength(1)
      expect((e.children[0]as any).content).toBe('1')
      JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'], true)
      // console.log(e) 
      expect(e.tag).toBe('p')
      expect(e.attrs.className).toBe('seba')
      expect(e.children).toHaveLength(2)
      expect((e.children[0]as any).content).toBe('1')
      expect((e.children[1]as any).content).toBe('2')

    })

  })
})
