import { createCreateElement, CreateElementFunction, CreateCreateElementConfig } from 'jsx-alone-core'
import {  ElementClass, getCreateCreateElementConfig, ElementLike, ElementLikeImpl, ElementLikeImplRenderConfig, RenderOutput, TextNodeLikeImpl, JSXAlone as JSXAloneBase} from 'jsx-alone-dom'

export const createCreateConfig: CreateCreateElementConfig<RenderOutput, ElementLike> = {
  ...getCreateCreateElementConfig(),

  impl: ElementLikeImpl,

  textNodeImpl: TextNodeLikeImpl
}

export const JSXAlone: typeof JSXAloneBase = {

  createElement: createCreateElement<RenderOutput, ElementLike>(createCreateConfig),
  updateElement: JSXAloneBase.updateElement,
  render : JSXAloneBase.render,
  createRef: JSXAloneBase.createRef,
  _Impl:'domExtra'

}

export { ElementClass }
