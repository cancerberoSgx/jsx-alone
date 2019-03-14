import { AnyAction, Store } from 'redux'
import { ErrorCompiledAction, FetchCompiledAction, RenderCompiledAction } from './compiled'
import { EditorModelChangedAction, RequestCodeChangeAction } from './editor'
import { ChangeAutoApply, PushLogAction, SelectExplorer, SetWorking } from './options'
import { ChangeThemeAction } from './theme'
import { State } from './types'
import { ChangeToolAction, SelectSkinAction, EditorChangePropValueAction } from './jsxColors';

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R ? R extends AllActions ? T extends R['type'] ? R : never : never : never

let store: Store<State, AnyAction>

export function setStore(s: Store) {
  store = s
  const state = s.getState()
  onStoreStartedListeners.forEach(l => l(state))
}

export function onStoreStarted(l: (s: State) => void) {
  onStoreStartedListeners.push(l)
}

const onStoreStartedListeners: ((s: State) => void)[] = []

const onAfterActionDispatchListeners: { listener: OnActionDispatchListener, type: any }[] = []

export function onAfterActionDispatch<T extends AllActions['type']>(type: T, listener: OnActionDispatchListener<T>) {
  onAfterActionDispatchListeners.push({ type, listener })
}
type OnActionDispatchListener<T extends AllActions['type']= AllActions['type']> = (action: ActionForType<T>, state: State) => void

const onBeforeActionDispatchListeners: { listener: OnActionDispatchListener, type: any }[] = []

export function onBeforeActionDispatch<T extends AllActions['type']>(type: T, listener: OnActionDispatchListener<T>) {
  onBeforeActionDispatchListeners.push({ type, listener })
}

export function getState(): State {
  return store.getState()
}

export function dispatch(action: AllActions) {
  const state = store.getState()
  onBeforeActionDispatchListeners!.filter(i => i.type === action.type).forEach(l => l.listener(action, state))
  store.dispatch(action)
  const state2 = store.getState()
  onAfterActionDispatchListeners!.filter(i => i.type === action.type).forEach(l => l.listener(action, state2))
}

export type AllActions = 

RequestCodeChangeAction | EditorModelChangedAction | 

PushLogAction | 

ChangeAutoApply | SelectExplorer | SetWorking | 

ChangeThemeAction | 

FetchCompiledAction | RenderCompiledAction | ErrorCompiledAction | 

ChangeToolAction|SelectSkinAction|EditorChangePropValueAction
