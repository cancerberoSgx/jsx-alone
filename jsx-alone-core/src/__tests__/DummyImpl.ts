import { RenderConfig, ElementLike,  TextNodeLike } from '..';
import { AbstractElementLike, AbstractTextNodeLike } from '..';
import { AbstractElementClass, JSXAlone as JSXAloneType } from '..';
import { createCreateElement } from '../createElement';

export interface OutputEl {
  tag: string
  attrs: { [name: string]: any }
  children: Output[]
  innerHtml:string|undefined
}
interface OutputText{
  content?: string
}
type Output = OutputEl|OutputText

interface Config extends RenderConfig<Output> {
}

export class ElementLikeImpl extends AbstractElementLike<Output> implements ElementLike<Output> {
  innerHtml:string|undefined
  render(config: Config = {}): Output {
    return {
      tag: this.tag,
      innerHtml: this.innerHtml, 
      attrs: this.attrs,
      children: this.children.map(c=>({...c,  parentElement: undefined})) as any
    }
  }

  dangerouslySetInnerHTML(s: string): void {
    this.innerHtml = s
  }
}

export class TextNodeLikeImpl extends AbstractTextNodeLike<Output> implements TextNodeLike<Output> {
  render(config?: Config): Output {
    return {content: this.content}
  }
}

export abstract class ElementClass<P = {}> extends AbstractElementClass< P> { }

export const DummyImpl:JSXAloneType<Output,  ElementLike<Output>> = {

  createElement: createCreateElement<Output, ElementLikeImpl>({impl: ElementLikeImpl, textNodeImpl :TextNodeLikeImpl}),

  render(el, config = {}) {
    return (el as any as ElementLikeImpl).render(config)
  }

}
