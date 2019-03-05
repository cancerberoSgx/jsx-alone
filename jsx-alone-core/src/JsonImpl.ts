import { RenderConfig, ElementLike, TextNodeLike } from './'
import { AbstractElementLike, AbstractTextNodeLike } from './'
import { JSXAlone as JSXAloneType } from './'
import { createCreateElement, updateElement } from './createElement'
import { AbstractElementClass } from './elementClass'

export interface JsonImplOutputEl {
  tag: string
  attrs: { [name: string]: any }
  children: JsonImplOutput[]
  innerHtml: string | undefined
}

export interface JSONImplOutputText {
  content?: string
}

export type JsonImplOutput = JsonImplOutputEl | JSONImplOutputText

export function isJsonImplOutputEl(a:any):a is JsonImplOutputEl{
  return a && typeof a.tag==='string'
}
export function isJsonImplOutputText(a:any):a is JSONImplOutputText{
  return a && a.content
}

export interface JsonImplRenderConfig extends RenderConfig<JsonImplOutput> {
}

export class JsonImplElementLikeImpl extends AbstractElementLike<JsonImplOutput> implements ElementLike<JsonImplOutput> {
  innerHtml: string | undefined
  render(config: JsonImplRenderConfig = {}): JsonImplOutput {
    const r= {
      tag: this.tag,
      innerHtml: this.innerHtml,
      attrs: this.attrs,
      children: this.children.map(c => {
        const r = { ...c }
        delete (r as any).parentElement
        return r
      })
    } as any
    delete r.parentElement
    return r
  }
  dangerouslySetInnerHTML(s: string): void {
    this.innerHtml = s
  }
}

export class JsonImplTextNodeLikeImpl extends AbstractTextNodeLike<JsonImplOutput> implements TextNodeLike<JsonImplOutput> {
  render(config?: JsonImplRenderConfig): JsonImplOutput {
    return { content: this.content }
  }
}
// export function isJsonImplTextNodeLike(a:any):a is JsonImplTextNodeLikeImpl{
//   return a && typeof a.content==='string'
// }
// export function isJsonImplElementLikeImpl(a:any):a is JsonImplElementLikeImpl{
//   return a && typeof a.tag==='string'
// }
export abstract class JsonImplElementClass<P = {}> extends AbstractElementClass<P> { }

export const JSXAloneJsonImpl: JSXAloneType<JsonImplOutput, ElementLike<JsonImplOutput>> = {

  createElement: createCreateElement<JsonImplOutput, JsonImplElementLikeImpl>({ impl: JsonImplElementLikeImpl, textNodeImpl: JsonImplTextNodeLikeImpl }),

  updateElement: (element, tag, attrs, children, create) => updateElement(element, JsonImplTextNodeLikeImpl, tag, attrs, children, create),

  render(el, config = {}) {
    return (el as any as JsonImplElementLikeImpl).render(config)
  }

}
