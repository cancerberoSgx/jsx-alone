import { installJSXAloneAsGlobal } from 'jsx-alone-core';
import { EventManager, JSXAlone } from 'jsx-alone-dom';
import { createStore, Action } from 'redux';
import { Component } from './component';
import { reducers, AllActions } from './store/store';
import { State } from './store/types';
import { Styles } from './style/styles';
import { App } from './ui/app';

installJSXAloneAsGlobal(JSXAlone)

class Main extends Component<{ state: State }> {
  render() {
    return <div>
      <App state={this.props.state} />
      <Styles theme={this.props.state.layout.theme} />
    </div>
  }
}

const store = createStore(reducers)
let eventManager: EventManager

store.subscribe(() => {
  const state = store.getState()
    main && main.updateProps({state})
})

export function getState(): State{
  return store.getState()
}

export function dispatch(action: AllActions){
  store.dispatch(action)
}

let main: Main

function start() {
  eventManager && eventManager.uninstall()
  main = new Main({ state: store.getState() })
  const el = JSXAlone.render(main.asJSXElement()) as HTMLElement
  eventManager = JSXAlone.lastEventManager!
  document.body.appendChild(el)
  eventManager.onAppendToDom()
}

start()
