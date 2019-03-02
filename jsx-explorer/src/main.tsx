import { installJSXAloneAsGlobal } from 'jsx-alone-core';
import { JSXAlone, ElementClass, ElementLike, RootEventManager } from 'jsx-alone-dom';
import { createStore, Action, Store } from 'redux';
import "../node_modules/bulma/bulma.sass";
import { App } from './ui/app';
import { create } from './monaco';
import { query } from './util';
import { reducers } from './store/store';
import { State } from './store/types';

installJSXAloneAsGlobal(JSXAlone)

export const store = createStore(reducers)
// const app = <App state={store.getState()} />
let rootElement: HTMLElement
let eventManager: RootEventManager
function render(){

  eventManager && eventManager.uninstall()
  rootElement && rootElement.remove()

  rootElement = JSXAlone.render(<App state={store.getState()} />) as HTMLElement
  document.body.appendChild(rootElement)
  eventManager = JSXAlone.lastEventManager!
  create({
    container: query('#editorContainer'),
    code: store.getState().code,
    theme: store.getState().theme.name === 'dark' ? 'dark' : 'light'
  })
}

render()

store.subscribe(() => {
  render()
})

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

