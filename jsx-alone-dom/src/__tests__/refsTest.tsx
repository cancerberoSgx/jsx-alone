import { JSXAlone } from '..'
import { query, render, DummyStatefulComponent } from './testUtil';
import { RefObject } from 'jsx-alone-core';
describe('refs', () => {
  describe('case 1', () => {
    class Box extends DummyStatefulComponent<{ text: string }> {
      render() {
        return <div className="box">{this.state.text}</div>
      }
    }
    type P = { name: string }
    class App extends DummyStatefulComponent<P> {
      textInput: RefObject<HTMLInputElement>;
      box: RefObject<Box>;
      constructor(p: P) {
        super(p)
        this.textInput = JSXAlone.createRef<HTMLInputElement>()
        this.box = JSXAlone.createRef<Box>()
      }
      counter = 0
      render() {
        return <div id="app">
          <input value="initial" id="input" ref={this.textInput}></input>
          <button id="changeInput"
            onClick={e => { this.textInput.current!.setAttribute('value', 'changed_' + this.counter++) }}>
            change input</button>
          <Box ref={this.box} text={this.state.name}></Box>
          <button id="changeBox"
            onClick={e => {
              this.box.current!.setState({
                text: this.textInput.current!.value = 'changed_' + this.counter++
              })
            }}>
            change box</button>
        </div>
      }
    }
    beforeEach(() =>
      render(<App name="seba" />))

    it('should work on HTMLElement', () => {
      expect(query('#app #input').getAttribute('value')).toBe('initial')
      query('#app #changeInput').click()
      expect(query('#app #input').getAttribute('value')).toBe('changed_0')
    })

    it('should work on element classes', () => {
      expect(query('#app .box').textContent).toBe('seba')
      query('#app #changeBox').click()
      expect(query('#app .box').textContent).toBe('changed_0')
    })

  })



  describe('static refs to other components different JSXAlone.render() calls', () => {
    let c1Fn: jest.Mock<any, any>, c2Fn: jest.Mock<any, any>, c3Fn: jest.Mock<any, any>

    beforeEach(() => {
      c1Fn = jest.fn()
      class C1 extends DummyStatefulComponent {
        static ref1 = JSXAlone.createRef<HTMLButtonElement>()
        render() {
          return <div id="c1">
            <button ref={C1.ref1} onClick={c1Fn}>click c2</button>
            <button className="trigger" onClick={e => C2.ref2.current!.click()}>trigger</button>
          </div>
        }
      }
      c2Fn = jest.fn()
      class C2 extends DummyStatefulComponent {
        static ref2 = JSXAlone.createRef<HTMLButtonElement>()
        render() {
          return <div id="c2">
            <button ref={C2.ref2} onClick={c2Fn}>click c3</button>
            <button className="trigger" onClick={e => C3.ref3.current!.click()}>trigger</button>
          </div>
        }
      }
      c3Fn = jest.fn()
      class C3 extends DummyStatefulComponent {
        static ref3 = JSXAlone.createRef<HTMLButtonElement>()
        render() {
          return <div id="c3">
            <button ref={C3.ref3} onClick={c3Fn}>click c1</button>
            <button className="trigger" onClick={e => C1.ref1.current!.click()}>trigger</button>
          </div>
        }
      }
      document.body.innerHTML = ''
      document.body.appendChild(JSXAlone.render(<div><C1></C1><C2></C2></div>))
      document.body.appendChild(JSXAlone.render(<div><C3></C3></div>))
    })


    fit('should ref different components in the same render()', () => {
      expect(c1Fn).toBeCalledTimes(0)
      expect(c3Fn).toBeCalledTimes(0)
      expect(c2Fn).toBeCalledTimes(0)
      query('#c1 .trigger').click()
      expect(c2Fn).toBeCalledTimes(1)
      expect(c1Fn).toBeCalledTimes(0)
      expect(c3Fn).toBeCalledTimes(0)
    })

    it('should ref elements that were created in another JSXAlone.render() call ', () => {
      expect(c1Fn).toBeCalledTimes(0)
      expect(c3Fn).toBeCalledTimes(0)
      expect(c2Fn).toBeCalledTimes(0)
      query('#c2 .trigger').click()
      expect(c3Fn).toBeCalledTimes(1)
      expect(c1Fn).toBeCalledTimes(0)
      expect(c2Fn).toBeCalledTimes(0)
      query('#c3 .trigger').click()
      expect(c3Fn).toBeCalledTimes(1)
      expect(c1Fn).toBeCalledTimes(1)
      expect(c2Fn).toBeCalledTimes(0)
      query('#c1 .trigger').click()
      expect(c3Fn).toBeCalledTimes(1)
      expect(c1Fn).toBeCalledTimes(1)
      expect(c2Fn).toBeCalledTimes(1)
    })



  })
})
