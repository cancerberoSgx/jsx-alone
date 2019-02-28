import { BaseSyntheticEvent } from 'jsx-alone-core';
import { JSXAlone } from '..';
import { ElementClass } from '../elementImpl';
import { RootEventManager, MEvent } from '../rootEventManager';
import { query } from './testUtil';

describe('eventManager', () => {

  let manager: RootEventManager
  let root: HTMLElement
  // let fna:EventListener

  beforeEach(() => {
    class C extends ElementClass<{ s: string[] }> {
      render() {
        return <ul>{this.props.s.map(s =>
          <li><button className={s}>{s}</button></li>
        )}</ul>
      }
    }

    const app = <div><div id="container"><C s={['a', 'b']}></C></div></div>
    root = JSXAlone.render(app) as HTMLElement
    document.body.appendChild(root)
    // console.log(root.outerHTML);

    manager = new RootEventManager(root as HTMLElement)


  })
  it('should notify only after added and allow removal', () => {
    const a = query('#container .a')
    const b = query('#container .b')
    const fna = jest.fn((e: MEvent) => { })
    const fnb = jest.fn((e: MEvent) => { })
    expect(fna).toBeCalledTimes(0)
    a.click()
    expect(fna).toBeCalledTimes(0)
    expect(fnb).toBeCalledTimes(0)
    manager.addEventListener(a, 'click', fna)
    expect(fna).toBeCalledTimes(0)
    expect(fnb).toBeCalledTimes(0)
    a.click()
    expect(fna).toBeCalledTimes(1)
    expect(fnb).toBeCalledTimes(0)
    manager.addEventListener(b, 'click', fnb)
    a.click()
    expect(fna).toBeCalledTimes(2)
    expect(fnb).toBeCalledTimes(0)
    b.click()
    expect(fna).toBeCalledTimes(2)
    expect(fnb).toBeCalledTimes(1)
    manager.removeListeners(a)
    a.click()
    expect(fna).toBeCalledTimes(2)
    expect(fnb).toBeCalledTimes(1)
    b.click()
    expect(fna).toBeCalledTimes(2)
    expect(fnb).toBeCalledTimes(2)
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
