import { createCreateElement, CreateElementFunction, CreateCreateElementConfig } from 'jsx-alone-core';
import {  ElementClass, getCreateCreateElementConfig, ElementLike, ElementLikeImpl, ElementLikeImplRenderConfig, RenderOutput, TextNodeLikeImpl, JSXAlone as JSXAloneBase} from 'jsx-alone-dom';

// type RenderFunction = (el: JSX.Element, config?: FunctionAttributeRenderConfig) => RenderOutput

// type JSXAloneType = { 
//   // render: RenderFunction; 
//   // createElement: CreateElementFunction<RenderOutput, ElementLike> 
// }&typeof JSXAloneBase

// export interface FunctionAttributesElement<T extends ElementClass=ElementClass> extends ElementLikeImpl {
  // _elementClassInstance?: T | undefined
// }

// export interface CreateCreateElementDomConfig<R extends ElementLike = ElementLike> extends CreateCreateElementDomConfig<R> {
//   // extraRenderConfig?: ElementLikeImplRenderConfig
// }

// export interface FunctionAttributeRenderConfig extends ElementLikeImplRenderConfig {
  // initialContext?: any
// }

// function buildExtraConfig(
//   // rootElementLike: ElementLike,
//   // extraConfig?: ElementLikeImplRenderConfig
// ): ElementLikeImplRenderConfig<ElementLike> {

//   const configHooks: ElementLikeImplRenderConfig<ElementLike> = {
//     // handleAttribute(options){
//     //   if(options.attribute==='ref'){
//     //     // const elementClassWithContainer = options.elementLike._elementClassInstance|| rootElementLike._elementClassInstance as any
//     //     // if(elementClassWithContainer&&elementClassWithContainer.__addRef) {
//     //     //   // if(!options.value){

//     //     //   // }
//     //     //   elementClassWithContainer.__addRef(options)
//     //     // }
//     //     return true
//     //   }
//     //   return false
//     // },
//     // handleAfterRender({ el, elementLike }: { el: HTMLElement; elementLike: ElementLike }) {
//     //   // const elementClassWithContainer =  elementLike._elementClassInstance || rootElementLike._elementClassInstance
//     //   // if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
//     //     // const elementClassWithContainer =  elementLike._elementClassInstance || rootElementLike._elementClassInstance
//     //     if (elementLike._elementClassInstance && elementLike._elementClassInstance.setContainerEl) {
//     //       elementLike._elementClassInstance.setContainerEl(el)
//     //       // elementClassWithContainer.setContainerEl(el)
//     //   }
//     //   // elementLike._elementClassInstance// = undefined // forget the reference
//     //   return true
//     // }
//   }
//   return configHooks
// }

export const createCreateConfig: CreateCreateElementConfig<RenderOutput, ElementLike> = {
  ...getCreateCreateElementConfig(),

  impl: ElementLikeImpl as any as ElementLike & { new(tag: string): ElementLike },

  textNodeImpl: TextNodeLikeImpl,

  // onElementCreated(config) {
  //   if (config.elementClassInstance) {
  //     config.elementLike._elementClassInstance = config.elementClassInstance as any
  //   }
  // }
}

export const JSXAlone  =JSXAloneBase
// : typeof JSXAloneBase = {

//   createElement: createCreateElement<RenderOutput, ElementLike>(createCreateConfig),

//   render(el, config: ElementLikeImplRenderConfig = {}) {
//     const elementLike: ElementLike = el as any
//     return elementLike.render({ ...config, 
//       // ...buildExtraConfig(
//       // elementLike
//       // )
//      })
//   },

//   createRef: JSXAloneBase.createRef
//   // createRef<T extends Element&ElementClass>(): RefObject<T>{
//   //   return new RefObjectImpl<T>()
//   // }
  
// }

// export const JSXAlone: JSXAloneType = Module

export { ElementClass };

