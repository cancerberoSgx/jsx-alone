import { JSXAlone } from '..'
import { ElementClass } from '../elementClass'
import { RootEventManager } from '..'
import { query, render } from './testUtil'
import { MouseEvent, unique } from 'jsx-alone-core'

describe('events', () => {

  describe('RootEventManager', () => {

    it('should: notify after added, dont notify after removed, work onclick is not declared, currentTarget correct', () => {

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
      const fna = jest.fn((e: Event) => { })
      const fnb = jest.fn((e: Event) => { })
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

    it('currentTarget', () => {
      const id = unique()
      const fnc = jest.fn((e: MouseEvent<HTMLButtonElement>) => {
        return e.currentTarget.id === id
      })
      render(<div><button id={id} onClick={fnc}></button></div>)

      expect(fnc).toBeCalledTimes(0)
      query(`#${id}`).click()
      expect(fnc).toBeCalledTimes(1)

      expect(fnc).lastReturnedWith(true)

    })
  })

})
