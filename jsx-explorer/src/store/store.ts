import { combineReducers, createStore, ReducersMapObject } from 'redux'
import { compiled, RenderCompiledAction, FetchCompiledAction } from './compiled'
import { changeCode, RequestCodeChangeAction, EditorModelChangedAction, editorModelChangedSaga, requestEditorChangeSaga } from './editor'
import { optionsReducer, PushLogAction, ChangeAutoApply } from './options'
import { changeTheme, ChangeThemeAction } from './theme'
import { ActionForType, Saga, State } from './types'

export type AllActions =
  RequestCodeChangeAction | EditorModelChangedAction |
  PushLogAction | ChangeAutoApply |
  ChangeThemeAction |
  FetchCompiledAction | RenderCompiledAction

const reducerStateMap: ReducersMapObject<State, AllActions> = {
  layout: changeTheme,
  editor: changeCode,
  options: optionsReducer,
  compiled
}

const reducers = combineReducers<State>(reducerStateMap)

const store = createStore(reducers)

store.subscribe(() => {
  registerSingleStoreSubscriberListener && registerSingleStoreSubscriberListener(store.getState())
})

export function getState(): State {
  return store.getState()
}

export function dispatch(action: AllActions) {
  store.dispatch(action)
  const state = store.getState()
  onAfterActionDispatchListeners.filter(i => i.type === action.type).forEach(l => l.listener(action, state))
}

let registerSingleStoreSubscriberListener: ((state: State) => void) | undefined

export function registerSingleStoreSubscriber(l: (state: State) => void) {
  registerSingleStoreSubscriberListener = l
  return store.getState()
}

const onAfterActionDispatchListeners: { listener: OnAfterActionDispatchListener, type: any }[] = []

export function onAfterActionDispatch<T extends AllActions['type']>(type: T, listener: OnAfterActionDispatchListener<T>) {
  onAfterActionDispatchListeners.push({ type, listener })
}

function registerSaga<T extends AllActions['type']>(saga: Saga<T>) {
  onAfterActionDispatch(saga.type, (action, state) => saga.actionDispatched(action, state))
}

type OnAfterActionDispatchListener<T extends AllActions['type']= AllActions['type']> = (action: ActionForType<T>, state: State) => void

const allSagas = [
  editorModelChangedSaga, requestEditorChangeSaga
]

allSagas.forEach(saga => registerSaga(saga))
