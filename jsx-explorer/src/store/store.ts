import { combineReducers, createStore, ReducersMapObject } from 'redux';
import { compiled, RenderCompiledAction, FetchCompiledAction } from './compiled';
import { changeCode, RequestCodeChangeAction, EditorModelChangedAction, editorModelChangedSaga, requestEditorChangeSaga } from './editor';
import { status, PushLogAction } from './status';
import { changeTheme, ChangeThemeAction } from './theme';
import { ActionForType, Saga, State } from './types';


export type AllActions = RequestCodeChangeAction | EditorModelChangedAction | PushLogAction | RequestCodeChangeAction | ChangeThemeAction | FetchCompiledAction | RenderCompiledAction


const reducerStateMap: ReducersMapObject<State, AllActions> = {
  layout: changeTheme,
  editor: changeCode,
  status,
  compiled: compiled
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


type OnAfterActionDispatchListener<T extends AllActions['type']=AllActions['type']> = (action: ActionForType<T>, state: State) => void


const allSagas = [
  editorModelChangedSaga, requestEditorChangeSaga 
]

allSagas.forEach(saga => registerSaga(saga))




// type SubStates =  State[SubStateNames]
// type SubStateNames = keyof typeof reducerStateMap
// type AllStateNames =  keyof typeof reducerStateMap
// type AllReducers = (typeof reducerStateMap)[AllStateNames]





// export type NamedMemberValueOf<T extends any, K extends NamedMemberNamesOf<T>> = ValueOfStringKey<Extended<T>, K>;

// export type NamedMemberValuesOf<T extends any, K extends Extended<T> = Extended<T>> = ValueOfStringKey<K, NamedMemberNamesOf<K>>;
// export type ValueOfStringKey<T extends {
// 	[k: string]: any;
// }, K extends string> = T[K];
// export type NamedMemberNamesOf<T extends any, K extends Extended<T> = Extended<T>> = StringKeyOf<K>;
// export type Extended<T extends any, K extends any = any> = T extends K ? T : never;
// export type StringKeyOf<T extends any> = Extract<keyof T, string>;




// type ReducerForAction<T extends AllActions['type'], 
// SV extends NamedMemberValuesOf<typeof reducerStateMap> = NamedMemberValuesOf<typeof reducerStateMap>, 
// R extends Reducer<SV,  ActionForType<T>> = Reducer<SV,  ActionForType<T>>
// R extends AllReducers = AllReducers
// > =Reducer<SubStates,  ActionForType<T>>  extends infer R ? R extends Reducer<SubStates,  ActionForType<T>>  ? Parameters<R> : never : never//  R extends Reducer<SubStates,  ActionForType<T>> ? R : never : never: never
//  R extends infer RI ? RI extends R ? RI : never : never 
// >=
// 
//  AllReducers extends infer R ? R extends AllReducers ? 
// Parameters<R>[1] extends infer A ? A extends Parameters<R>[1] ? ActionForType<T> extends A ? A extends ActionForType<T> ? R : never: never:  never: never: never: never
// T ? T extends Parameters<R>[1]['type'] ?  R : never: never// extends AllActions && infer A ? A['type']    Parameters<R>[1]['type'] extends ActionForType<T> ? R: never:never: never: never
// AllReducers extends infer R ? R extends AllReducers ?
// ActionForType<T> extends Parameters<R>[1] ? Parameters<R>[1] extends ActionForType<T> ? R: never: never: never : never //: never//[T] extends infer T2 ? T extends T2 ? R : never : never//? R : never//extends ActionForType<T> ?  R : never

//  A extends ActionForType<T>, M extends ReducersMapObject<State, A>,
  // S extends NamedMemberValuesOf<typeof reducerStateMap>
  // > = R extends infer I ? I extends R ? I : never : never

// type rr = ReducerForAction<'CHANGE_CODE'>