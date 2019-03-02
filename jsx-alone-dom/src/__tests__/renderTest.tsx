import { JSXAlone, ElementClass } from '..'
import {render, prepareRenderParent} from './testUtil'
import { unique } from 'jsx-alone-core';
describe('render', () => {
  it('should update existing elements if updateExisting is passed', () => {
    interface P {name: string}
    class C extends ElementClass<P> {
      state:P
      constructor(p:P){
        super(p)
        this.state={...p}
      }
    render(){
      return <p>{this.state.name}<i>{this.state.name.length}</i></p>
    }
  }
    const c = new C({name: 'seba'})
    // const t= c.render()
    const el = JSXAlone.render(c.render()) as HTMLElement
    const parent = prepareRenderParent()
    parent.append(el)
    // console.log(parent.outerHTML);
    
    c.state.name='lau'
    const el2 = JSXAlone.render(c.render(), {
      updateExisting: el, parent
    })as HTMLElement
    // expect(el2).toBe(el)
    // console.log(parent.outerHTML);
expect(parent.outerHTML).toEqual(`<div id="test-root"><p>lau<i>3</i></p></div>`)
  })
})
