import { installJSXAloneAsGlobal } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { Main } from './components/main'
import { initMonacoWorkers } from './monaco/monaco'
import { installCodeWWorker as installCodeWorker } from './codeWorker/codeWorkerManager'
import { State, } from './store/types';
import { AnyAction, combineReducers, createStore, Store, ReducersMapObject } from 'redux';
import { changeTheme } from './store/theme';
import { changeCode } from './store/editor';
import { optionsReducer } from './store/options';
import { compiled } from './store/compiled';
import { setStore, AllActions } from './store/store';

const reducerStateMap: ReducersMapObject<State, AllActions> = {
  layout: changeTheme,
  editor: changeCode,
  options: optionsReducer,
  compiled: compiled
};

const reducers = combineReducers<State>(reducerStateMap);

const store = createStore(reducers);
setStore(store)

installCodeWorker()
installJSXAloneAsGlobal(JSXAlone)
initMonacoWorkers()

const main = new Main({ state: store.getState() })
JSXAlone.render(main.asJSXElement(), { parent: document.body }) as HTMLElement
JSXAlone.lastEventManager!.onAppendToDom()

store.subscribe(() => {
  const state = store.getState()
  if (stateChanged(state)) {
    setTimeout(() => {
      main && main.onStateUpdate(state)
    }, 0)
  }
  else {
    console.log('where equals');
  }
});


let lastState: string|undefined
function stateChanged(state: State) {
  const stateS = JSON.stringify({ ...state, compiled: { ...state.compiled, response: undefined } })
  const r = (stateS !== lastState)
  if (r) {
    lastState = stateS
  }
  return r
}

