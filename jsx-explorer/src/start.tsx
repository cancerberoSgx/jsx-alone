import { installJSXAloneAsGlobal } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { installCodeWWorker as installCodeWorker } from './codeWorker/codeWorkerManager'
import { Main } from './components/main'
import { initMonacoWorkers } from './monaco/monaco'
import { compiled, compiledSagas } from './store/compiled'
import { changeCode, editorSagas } from './store/editor'
import { optionsReducer } from './store/options'
import { AllActions, setStore } from './store/store'
import { changeTheme } from './store/theme'
import { State } from './store/types'
import { jsxColorsReducer, jsxColorsSagas } from './store/jsxColors';

export function start() {

  const reducerStateMap: ReducersMapObject<State, AllActions> = {
    layout: changeTheme,
    editor: changeCode,
    options: optionsReducer,
    compiled, 
    jsxColors: jsxColorsReducer
  }

  const reducers = combineReducers<State>(reducerStateMap)

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(reducers, applyMiddleware(sagaMiddleware))

  setStore(store)

  function* rootSaga() {
    yield all([
      editorSagas(), compiledSagas(), jsxColorsSagas()
    ])
  }
  sagaMiddleware.run(rootSaga)

  installCodeWorker()

  installJSXAloneAsGlobal(JSXAlone)

  initMonacoWorkers()

  const main = new Main({ state: store.getState() })

  JSXAlone.render(main.asJSXElement(), { parent: document.body })

  JSXAlone.lastEventManager!.onAppendToDom()

  store.subscribe(() => {
    const state = store.getState()
    if (stateChanged(state)) {
      setTimeout(() => {
        main.onStateUpdate(state)
      }, 0)
    }
    else {
      console.log('THE SAME')
    }
  })

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

}
