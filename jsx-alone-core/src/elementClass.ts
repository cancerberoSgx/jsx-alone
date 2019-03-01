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

  // protected childrenAsArray(): NodeLike<P>[] {
  //   return (Array.isArray(this.props.children) ? this.props.children : [this.props.children]) as NodeLike<P>[];
  // }

  // protected childrenElementsAsArray(): ElementLike<P>[] {
  //   return this.childrenAsArray().filter(c => isElementLike<P>(c)) as ElementLike<P>[]
  // }

  // protected firstChildElement(): ElementLike<P> | undefined {
  //   return this.childrenAsArray().find(e => true) as ElementLike<P> | undefined
  // }
}
export abstract class AbstractElementClass<P= {}> extends ElementClass< P> {}
