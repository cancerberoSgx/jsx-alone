export {renderApp as lotsOfPeople} from './lotsOfPeople/renderApp' 

export type Renderer<C=any> = (el: JSX.Element, config?: C)=>void

export * from './util'
export * from './lotsOfPeople/types'