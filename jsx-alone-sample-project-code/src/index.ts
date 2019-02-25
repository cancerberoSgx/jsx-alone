import { ElementLike } from 'jsx-alone-core';

export {renderApp as lotsOfPeople} from './lotsOfPeople/renderApp' 
// export {renderApp as simple} from './simple/renderApp' 

export type Renderer<C=any> = (el: JSX.Element, config?: C)=>void

export * from './util'
export * from './lotsOfPeople/types'