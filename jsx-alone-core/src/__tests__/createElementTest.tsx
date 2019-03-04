import {  JSXAloneJsonImpl as JSXAlone, JsonImplOutputEl, JsonImplElementClass, JsonImplElementLikeImpl} from '../JsonImpl';
import { ElementLike, JSXAloneElement } from '../types';
import { unique, objectMap } from '../util';
import { isElementClass } from '../elementImpl';
describe('createElement', () => {
  describe('updateElement', () => {
    // it('should u', () => {
    //   const e = <div>1</div> as any as ElementLike<any>
    //   expect(e.tag).toBe('div')
    //   expect(e.attrs.className).toBe(undefined)
    //   expect(e.children).toHaveLength(1)
    //   expect((e.children[0]as any).content).toBe('1')
    //   JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'])
    //   expect(e.tag).toBe('p')
    //   expect(e.attrs.className).toBe('seba')
    //   expect((e.children[0]as any).content).toBe('2')
    //   expect(e.children).toHaveLength(1)

    // })

    // it('should append child if create=true', () => {
    //   const e = <div>1</div> as any as ElementLike<any>
    //   expect(e.tag).toBe('div')
    //   expect(e.attrs.className).toBe(undefined)
    //   expect(e.children).toHaveLength(1)
    //   expect((e.children[0]as any).content).toBe('1')
    //   JSXAlone.updateElement(e as any, 'p', {className: 'seba'}, ['2'], true)
    //   expect(e.tag).toBe('p')
    //   expect(e.attrs.className).toBe('seba')
    //   expect(e.children).toHaveLength(2)
    //   expect((e.children[0]as any).content).toBe('1')
    //   expect((e.children[1]as any).content).toBe('2')

    // })

    it('should help on updating el class', () => {
      interface P{name: string }
      class C extends JsonImplElementClass<P> {
        state: P
        constructor(p: P) {
          super(p)
          this.state = { ...p }
        }
        containerEl: JSX.Element|undefined
        render() {
          this.containerEl= <p><i className="changed">{this.state.name}</i><i className="same"></i></p>
          return this.containerEl
        }
        updateUi(){
          if(this.containerEl){
            debugger
            const o = JSXAlone.render(this.asJSXElement()) as JsonImplOutputEl
            const newEl = this.update(o)
            JSXAlone.updateElement(this.containerEl as any, newEl.tag, newEl.attrs, newEl.children)
          }
        }
        update(o:JsonImplOutputEl, e:JsonImplElementLikeImpl= new JsonImplElementLikeImpl(o.tag)){
          e.tag=e.tag
          e.attrs = objectMap(e.attrs||{}, (k:string,v:any)=>{
            return typeof v==='undefined'?e.attrs[k] : v
          })
          e.children = e.children.map((c, i)=>{
            if( i<o.children.length){
              return this.update( o.children[i] as any, c as any)
            }
            return c
          }) as any
          return e
        }
        getOutput(){
          return this.containerEl as any
        }
        printOutput(e: any=this.containerEl as any as JsonImplElementLikeImpl): any{
          if(e){
            const p = {...e,   children:( (e as any as JsonImplElementLikeImpl).children||[]).map(c=>this.printOutput(c as any as JsonImplElementLikeImpl))}

            delete p.parentElement
            delete p.containerEl
            delete p._elementClassInstance
            if(p.children.length===0){
              delete p.children
            }
            return p
          }
        }
      }
      const c = new C({name: 'seba'})
      JSXAlone.render(c.asJSXElement())
      // console.log(JSON.stringify(c.printOutput(), null, 2));
      expect(c.getOutput().children[0].children[0].content).toBe('seba')
      const same = c.getOutput().children[0].children[1]
      const notSame =  c.getOutput().children[0].children[0]
      c.state.name='lau'
      c.updateUi()           
      expect(c.getOutput().children[0].children[0].content).toBe('lau')
      expect(c.getOutput().children[0].children[1]).toBe(same)
      expect(c.getOutput().children[0].children[0]).not.toBe(notSame)
      // console.log(JSON.stringify(c.printOutput(), null, 2));
      
    })

  })
})
