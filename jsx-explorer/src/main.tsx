import { installJSXAloneAsGlobal, Style } from 'jsx-alone-core'
import { JSXAlone  } from 'jsx-alone-dom'
import { createStore, Action, Store } from 'redux'
// import '../node_modules/bulma/bulma.sass'
import { App } from './ui/app'
import { reducers } from './store/store'
import { State } from './store/types'
import { EventManager } from 'jsx-alone-dom'
import { Styles } from './style/styles';
import { Component } from './component';

installJSXAloneAsGlobal(JSXAlone)

export const store = createStore(reducers)
const s  =  store.getState()
let rootElement: HTMLElement
let eventManager: EventManager

let main:Main
function render() {
  eventManager && eventManager.uninstall()
  // const main = <Main state={store.getState()} />
  main = new Main({state: store.getState()})
  const el = JSXAlone.render( main.render()) as HTMLElement
  eventManager = JSXAlone.lastEventManager!
  if (rootElement) {
    rootElement.replaceWith(el)
  }
  else {
    document.body.appendChild(el)
  }
  eventManager.onAppendToDom()
  rootElement = el
}

render()

store.subscribe(() => {
  // render()
})

class Main extends Component<{state: State}> {
  render() {
    return <div>
    <App state={this.props.state} />
    <Styles theme={this.props.state.layout.theme}/>
  </div>
  }
}

// const Main = (props: {state: State}) =>
//   <div>
//     <App state={props.state} />
//     <Styles theme={props.state.layout.theme}/>
//   </div>
// function editor() {
//   let code = store.getState().editor.code
//   const ed = create({
//     container: query('#editorContainer'),
//     code,
//     theme: store.getState().layout.theme.name === 'dark' ? 'dark' : 'light'
//   })
//   ed.getModel()!.onDidChangeContent(e => {
//     code = ed.getModel()!.getValue()
//     store.dispatch({type: 'CHANGE_CODE', code})
//   })
// }



// interface BaseProps { state: State }
// type ElementFunction<P=BaseProps> = (props: P) => ElementLike

// export function withState<P extends BaseProps>(elements: ElementClass<P> | ElementFunction<P>, store: Store) {
//   let parentNode: HTMLElement
//   let nextProps: P

//   store.subscribe(() => {
//     if(elements instanceof App){
//       eventManager.uninstall()
//       rootElement.remove()
//       rootElement = JSXAlone.render(elements as any)
//       eventManager = JSXAlone.lastEventManager!
//     }

//     // updateElement(parentNode, nextNode, parentNode.firstChild)
//   })

//   // return (props: P) => {
//   //   nextProps = props
//   //   return dom(
//   //     'span',
//   //     {
//   //       ref: node => {
//   //         parentNode = node
//   //       },
//   //     },
//   //     elements(props),
//   //   )
//   // }
// }

// function updateElement(parent, next, prev) {
//   // later virtualDOM mods
//   if (!next.isEqualNode(prev)) {
//     parent.replaceChild(next, parent.firstChild)
//   }
// }

// store.subscribe(()=>{

// })
// type KnownActions
// export function dispatch(action: Action){
//   store.dispatch(action)
// }
