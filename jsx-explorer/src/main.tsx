import { installJSXAloneAsGlobal } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { Main } from './components/main'
import { initMonacoWorkers } from './monaco/monaco'
import { installCodeWWorker as installCodeWorker } from './codeWorker/codeWorkerManager'
import { State, } from './store/types';
import { AnyAction, combineReducers, createStore, Store, ReducersMapObject, applyMiddleware } from 'redux';
import { changeTheme } from './store/theme';
import { changeCode, editorSagas, watchEditorModelChanged, watchRequestEditorChange } from './store/editor';
import { optionsReducer } from './store/options';
import { compiled, compiledSagas, watchRenderCompile, watchFetchCompiled } from './store/compiled';
import { setStore, AllActions } from './store/store';
import { put, takeEvery, all, select, call } from 'redux-saga/effects'
import { all as merge } from 'deepmerge';

import createSagaMiddleware from 'redux-saga'

const reducerStateMap: ReducersMapObject<State, AllActions> = {
  layout: changeTheme,
  editor: changeCode,
  options: optionsReducer,
  compiled: compiled
};

const reducers = combineReducers<State>(reducerStateMap);
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
setStore(store)


function* rootSaga() {
  yield all([
    // watchFetchCompiled(), watchRenderCompile(),   watchRequestEditorChange(), watchEditorModelChanged()
    editorSagas(), compiledSagas()
  ])
}
sagaMiddleware.run(rootSaga)

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
    console.log('THE SAME');
  }
});


let lastState: State
function stateChanged(state: State) {
  if (lastState && lastState === state) {
    return false
  }
  else {
    lastState = state
    return true
  }
}

