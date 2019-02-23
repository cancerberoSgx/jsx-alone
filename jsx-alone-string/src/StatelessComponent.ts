import { NodeLike, ElementLike } from './jsx';
import { isElementLike } from './elementImpl';

export type StatelessComponentProps<P> = (Readonly<{ children?: JSX.Element }> & Readonly<P>)

export interface IStatelessComponent<P={}> {
  props: StatelessComponentProps<P>
  render(): JSX.Element
}

/**
 * Let declare custom tag components with classes instead of just functions or variables.
 *
 * Notice that differently than React's, it doesn't make any sense to support component's state in SuiteScript
 * back end's scripts (suitelet, restlet, etc) so it's no included. TODO: what about client scripts ?
 */

export class StatelessComponent<P={}> implements IStatelessComponent<P> {

  constructor(public readonly props: StatelessComponentProps<P>) {
    this.props = props
    this.checkRegisteredCode()
  }

  render(): JSX.Element {
    throw new Error('Not Implemented')
  }

  public checkRegisteredCode(){}

  protected childrenAsArray(): NodeLike[] {
    return (Array.isArray(this.props.children) ? this.props.children : [this.props.children]) as NodeLike[];
  }

  protected childrenElementsAsArray(): ElementLike[] {
    return this.childrenAsArray().filter(c => isElementLike(c)) as ElementLike[]
  }

  protected firstChildElement(): ElementLike | undefined {
    return this.childrenAsArray().find(e => true) as ElementLike | undefined
  }


}

