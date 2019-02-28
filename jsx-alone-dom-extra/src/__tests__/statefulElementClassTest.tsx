import { statefulElementClassTestRenderApp } from './statefulElementClassTestRenderApp';
import {JSXAlone} from'jsx-alone-dom'
import { query, render } from './testUtil';
import { RefObject } from 'jsx-alone-core';
import { DestructiveDomRenderComponent } from '../DestructiveDomRenderComponent';
describe('stateful element class', () => {
  describe('sample 1', () => {
    it('simple', ()=>{
      statefulElementClassTestRenderApp()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      query<HTMLButtonElement>('#add').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(3)
      query<HTMLButtonElement>('[data-id="seba"] .remove').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(2)
      query<HTMLButtonElement>('[data-id="lau"] .remove').click()
      expect(document.querySelectorAll('[data-id]')).toHaveLength(1)
    })
  })


  describe('refs', () => {

class Box extends DestructiveDomRenderComponent<{ text: string } > {
  render() {
    return <div className="box">{this.state.text}</div>
  }
}
type P = { name:string }
class App extends DestructiveDomRenderComponent<P> {
  textInput:RefObject<HTMLInputElement>;
  box: RefObject<Box>;
  constructor(p:P){
    super(p)
    this.textInput = JSXAlone.createRef<HTMLInputElement>()
    this.box = JSXAlone.createRef<Box>()
  }
  counter=0
  render(){
    return <div id="app">
      <input value="initial" id="input" ref={this.textInput}></input><button id="changeInput" onClick={e=>{debugger; this.textInput.current!.setAttribute('value', 'changed_'+this.counter++)}}>change input</button>
      <Box ref={this.box} text={this.state.name}></Box><button id="changeBox" onClick={e=>{debugger; this.box.current!.setState({text: this.textInput.current!.value='changed_'+this.counter++})}}>change box</button>
    </div>
  }
}
it('simple', ()=>{
  render(<App name="seba" />)
  
  expect(query('#app #input').getAttribute('value')).toBe('initial')
  query('#app #changeInput').click()
  expect(query('#app #input').getAttribute('value')).toBe('changed_0')
  
  
  expect(query('#app .box').textContent).toBe('seba')
  query('#app #changeBox').click()
  expect(query('#app .box').textContent).toBe('changed_1')
})
 
})

   
  })
  



