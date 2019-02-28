import { JSXAlone } from '..'
import { ElementClass } from '../elementImpl';
import { query, render } from './testUtil';
import { markElement } from "../mark";
import { RootEventManager } from '../events';

describe('eventManager', () => {

  it('event delegation', () => {

    class C extends ElementClass<{ s:string[] }> {
      render() {
        return <ul>{this.props.s.map(s =>
          <li><button className={s}>{s}</button></li>
        )}</ul>
      }
    }

    const app = <div><div id="container"><C s={['a', 'b']}></C></div></div>
    const root = JSXAlone.render(app) as HTMLElement
    document.body.appendChild(root)
    const manager = new RootEventManager(root as HTMLElement)
    console.log(root.outerHTML);
    
    const a = query('#container .a')
      const fna = jest.fn(e=>{
    })
    a.click()
    manager.addEventListener(a, 'click', fna)
    expect(fna).toBeCalledTimes(0)
    expect(fna).toBeCalledTimes(1)
 
  
  })
})


    // var d = document.createElement('div')
    // document.body.appendChild(d)
    // c
    // type Fn= (e:Event)=>any
    // interface Listener{
    //   mark:string,
    //   fn: Fn
    //   type:string
    // }
    // const registeredByType:{[type:string]:Listener[]} = {}
    // function register(el: HTMLElement, type:string, fn: Fn) {
    //   let ls = registeredByType[type]
    //   if(!ls){
    //     ls = registeredByType[type] = []
    //     r.addEventListener(type, fn)
        
    //   }
    //   ls.push({
    //     mark: markElement(el),
    //     fn,
    //     type
    //   })
    //   return 
    //   registered.push(type)
    //   const mark = markElement(el)
    // }
    // // const root = JSXAlone.render(app)
  