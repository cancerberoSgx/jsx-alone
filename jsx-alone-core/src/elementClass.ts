import { NodeLike, ElementLike } from './types'
import { isElementLike } from './elementImpl'
import { ReactNode } from './declarations/domElementDeclarations'

export type ElementClassProps<P> = ( Readonly<{ children?: ReactNode}>&Readonly<P> )

export interface IElementClass<P= {}> {
  props: ElementClassProps<P>
  render(): JSX.Element
}

/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */
export abstract class ElementClass<  P= {}> implements IElementClass<P> {

  constructor(public readonly props: ElementClassProps<P>) {
  }

  abstract render(): JSX.Element

}

export abstract class AbstractElementClass<P= {}> extends ElementClass< P> {}
