import { NodeLike, ElementLike } from './types';
import { isElementLike } from './elementImpl';

export type ElementClassProps<P> = (Readonly<{ children?: JSX.Element }> & Readonly<P>)

export interface IElementClass<T, P={}> {
  props: ElementClassProps<P>
  render(): JSX.Element
}

/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */
export abstract class AbstractElementClass<T, P={}> implements IElementClass<T, P> {

  constructor(public readonly props: ElementClassProps<P>) {
  }

  abstract render(): JSX.Element

  protected childrenAsArray(): NodeLike<P>[] {
    return (Array.isArray(this.props.children) ? this.props.children : [this.props.children]) as NodeLike<P>[];
  }

  protected childrenElementsAsArray(): ElementLike<P>[] {
    return this.childrenAsArray().filter(c => isElementLike<P>(c)) as ElementLike<P>[]
  }

  protected firstChildElement(): ElementLike<P> | undefined {
    return this.childrenAsArray().find(e => true) as ElementLike<P> | undefined
  }
}

