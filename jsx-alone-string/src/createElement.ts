import { NodeLike, JSXAlone as JSXAloneType, createCreateElement, CreateCreateElementConfig, updateElement, JSXAloneTag, JSXAloneAttrs } from 'jsx-alone-core'
import { ElementLikeImplRenderConfig, defaultRenderConfig } from './config'
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl'

const createCreateElementConfig: CreateCreateElementConfig<string, ElementLikeImpl> = {
  impl: ElementLikeImpl,
  textNodeImpl: TextNodeLikeImpl
}

const Module = {

  createElement: createCreateElement<string>(createCreateElementConfig),

  updateElement: (element: ElementLikeImpl, tag: JSXAloneTag, attrs: JSXAloneAttrs<string>, children: any[], create?: boolean) => updateElement(element, TextNodeLikeImpl, tag, attrs, children, create),

  render(el: JSX.Element, config: ElementLikeImplRenderConfig = defaultRenderConfig): string {
    return `${((el as any) as NodeLike<string>).render(config)}`
  },
  
  _Impl: 'string'

}

export const JSXAlone: JSXAloneType<string>&{render(el: JSX.Element, config?: ElementLikeImplRenderConfig): string} = Module
