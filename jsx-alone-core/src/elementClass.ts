import { NodeLike, ElementLike } from './types'
import { isElementLike } from './elementImpl'
import { ReactNode } from './declarations/domElementDeclarations'

export type ElementClassProps<P> = ( Readonly<{ children?: ReactNode}>&Readonly<P> )

export interface IElementClass<P= {}> {
  props: ElementClassProps<P>
  asJSXElement():JSX.Element
  render(): JSX.Element
}

/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */
export abstract class ElementClass<  P= {}> implements IElementClass<P> {
  
  constructor(protected _props: P) {
  }
  
  get props(): P {
    return this._props
  }

  abstract render(): JSX.Element

  asJSXElement() {
    const el = this.render();
    (el as any)._elementClassInstance = this
    return el
  }

}

export abstract class AbstractElementClass<P= {}> extends ElementClass< P> {}
