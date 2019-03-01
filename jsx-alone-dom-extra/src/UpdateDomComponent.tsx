import { JSXAlone } from './'
import { StatefulComponent } from './StatefulComponent'
import { ClassAttributes, Children, RefObject } from 'jsx-alone-core'

/**
 * Component state implementation by biding state properties with DOM elements and changes the DOM only if necessary.
 * (is the contrary to DestructiveDomRenderComponent)
 */
export abstract class UpdateDomComponent<P = {}, S = Partial<P>> extends StatefulComponent<P, S> {
  setState(s: Partial<S>) {
    super.setState(s)
  }

  bindState(stateTarget: keyof S, domTarget: string): JSX.IntrinsicAttributes {
    return null as any
  }
}

// class Box extends UpdateDomComponent<{ text: string }> {
//   render() {
//     return <div className="box" {...this.bindState('text', 'innerHTML')}>  <input {...this.bindState('name', 'value')}></input></div>
//   }
// }

// class Box extends UpdateDomComponent<{ text: string }> {
//   render() {
//     return <div className="box">**{this.state.text||''}**</div>
//   }
// }
// class App extends UpdateDomComponent<{} ,{ name:string }> {
//   textInput:RefObject<HTMLInputElement>;
//   box: RefObject<Box>;
//   constructor(...args: any[]){
//     super(args)
//     this.textInput = JSXAlone.createRef<HTMLInputElement>()
//     this.box = JSXAlone.createRef<Box>()
//   }
//   render(){
//     return <div>
//       <input ref={this.textInput}></input><button id="changeInput" onClick={e=>this.textInput.current!.value=Date.now()+''}>change input</button>
//       <Box ref={this.box} text="hello"></Box><button id="changeBox" onClick={e=>this.box.current!.setState({text: this.textInput.current!.value=Date.now()+''})}>change box</button>
//     </div>
//   }
// }
