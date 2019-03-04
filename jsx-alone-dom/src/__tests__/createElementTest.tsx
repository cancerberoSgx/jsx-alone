import { ElementLike } from '../types';
import {JSXAlone} from '..'
import { ElementClass } from '../elementClass';
import { ElementLikeImpl } from '../elementImpl';
import { objectMap } from 'jsx-alone-core';
import { prepareRenderParent } from './testUtil';
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
    //   interface P{name: string }
    //   class C extends ElementClass<P> {
    //     state: P
    //     containerEl: HTMLElement|undefined
    //     constructor(p: P) {
    //       super(p)
    //       this.state = { ...p }
    //     }
    //     containerLike: JSX.Element|undefined
    //     render() {
    //       this.containerLike= <p><i className="changed">{this.state.name}</i><i className="same"></i></p>
    //       return this.containerLike
    //     }
    //     afterRender(containerEl: HTMLElement){
    //       this.containerEl = containerEl
    //     }
    //     updateUi(){
    //       if(this.containerEl){
    //         const o = JSXAlone.render(this.asJSXElement()) as HTMLElement
    //         const newEl = this.updateFromLast(this.containerEl)
    //         JSXAlone.updateElement(this.containerLike as any, newEl.tag, newEl.attrs, newEl.children)
    //       }
    //     }
    //     updateFromLast(o:HTMLElement, e:ElementLike= new ElementLikeImpl(o.tagName)){
    //       e.tag=e.tag
    //       e.attrs = objectMap(e.attrs||{}, (k:string,v:any)=>{
    //         return typeof v==='undefined'?e.attrs[k] : v
    //       })
    //       e.children = e.children.map((c, i)=>{
    //         if( i<o.children.length){
    //           return this.updateFromLast( o.children[i] as any, c as any)
    //         }
    //         return c
    //       }) as any
    //       return e
    //     }
    //   }
    //   const c = new C({name: 'seba'})
    //   const o1 = JSXAlone.render(c.asJSXElement()) as HTMLElement
    //   const p =prepareRenderParent()
    //   p.appendChild(o1)
    //   console.log(p.outerHTML);
    //   // console.log(JSON.stringify(c.printOutput(), null, 2));
    //   // expect(c.getOutput().children[0].children[0].content).toBe('seba')
    //   // const same = c.getOutput().children[0].children[1]
    //   // const notSame =  c.getOutput().children[0].children[0]
    //   c.state.name='lau'
    //   c.updateUi()   
    //   console.log(p.outerHTML);
              
    //   // expect(c.getOutput().children[0].children[0].content).toBe('lau')
    //   // expect(c.getOutput().children[0].children[1]).toBe(same)
    //   // expect(c.getOutput().children[0].children[0]).not.toBe(notSame)
    //   // console.log(JSON.stringify(c.printOutput(), null, 2));
      
    // })


  })
})
