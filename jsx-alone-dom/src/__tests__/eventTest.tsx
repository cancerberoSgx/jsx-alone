import { JSXAlone } from '..'
import { ElementClass } from "../elementClass";
import { RootEventManager, HTMLEvent } from '..'
import { query } from './testUtil'

describe('eventManager', () => {

  it('should notify after added and dont after removed', () => {

    let manager: RootEventManager
    let root: HTMLElement
  
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

    manager = new RootEventManager(root as HTMLElement)

    const a = query('#container .a')
    const b = query('#container .b')
    const fna = jest.fn((e: HTMLEvent) => { })
    const fnb = jest.fn((e: HTMLEvent) => { })
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
