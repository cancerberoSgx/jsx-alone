import { installJSXAloneAsGlobal } from 'jsx-alone-core'
import { JSXAlone } from 'jsx-alone-dom'
import { createStore } from 'redux'
import { AllActions, reducers } from './store/store'
import { State } from './store/types'
import { Main } from './ui/main'
import { initMonacoWorkers } from './util/monaco'

const store = createStore(reducers)

store.subscribe(() => {
  const state = store.getState()
  main && main.onStateUpdate( state )
})

export function getState(): State {
  return store.getState()
}

export function dispatch(action: AllActions) {
  store.dispatch(action)
}

installJSXAloneAsGlobal(JSXAlone)
initMonacoWorkers()
const main = new Main({ state: store.getState() })
JSXAlone.render(main.asJSXElement(), { parent: document.body }) as HTMLElement
JSXAlone.lastEventManager!.onAppendToDom()
