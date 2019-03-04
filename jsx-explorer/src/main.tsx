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
  updateProps(p: { state: State }){
    this._props = {...this._props, ...p}
  }
}

const store = createStore(reducers)
let eventManager: EventManager

store.subscribe(() => {
  const state = store.getState()
  // if(JSON.stringify(main.state.state)!==JSON.stringify(state)) {
    console.log('subscribe', state.layout.theme.name);
    
    main && main.updateProps({state})
    main && main.setState({state})
  // }
})

export function getState(): State{
  return store.getState()
}

export function dispatch(action: AllActions){
  // lastAction=action.type
  // console.log(action  );
  
  store.dispatch(action)
  // if(action.type!==lastAction){
  //   store.dispatch({type: 'PUSH_LOG', log: 'dispatch: '+JSON.stringify(getState())})
  // }
}
// let lastAction:string=''

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


// setTimeout(() => {
//   store.dispatch({ type: 'PUSH_LOG', log: 'hellokajhsd' })
// }, 1000);