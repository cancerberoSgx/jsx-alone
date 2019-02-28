import { createCreateElement,CreateCreateElementConfig,  CreateElementFunction, RefObject } from 'jsx-alone-core'
import { ElementLikeImpl, TextNodeLikeImpl , ElementLike} from '.'
import { NodeLike, RenderOutput, ElementLikeImplRenderConfig, IElementClass } from './types';
// import { RefObjectImpl } from './Refs';

// export interface CreateCreateElementDomConfig<R extends ElementLike = ElementLike> extends CreateCreateElementConfig<RenderOutput, R> {
//   extraRenderConfig?: ElementLikeImplRenderConfig
// }

// console.log(getCreateCreateElementConfig());
function buildJSXALone(): JSXAloneType<RenderOutput, ElementLike>  {

  const Module: JSXAloneType<RenderOutput, ElementLike> = {

    createElement: createCreateElement<RenderOutput, ElementLike>(getCreateCreateElementConfig()),
  
    render(el, config = {}) {
      return (el as any as NodeLike).render(config)
      // return (el as any as ElementLike).render({...config, ...createExtraConfig(el as any as ElementLike)})
    },
    createRef<T extends Element&IElementClass>(): RefObject<T>{
      // return new RefObjectImpl<T>()
      throw 'jkasjksajksakjas'
    }
  
  }
  return Module
}

// function createExtraConfig(rootElementLike: ElementLike){
//   const c: ElementLikeImplRenderConfig = {
    
//     handleAttribute({elementLike, el, value}){
//       const elementClassWithContainer = elementLike._elementClassInstance|| rootElementLike._elementClassInstance
   
//     if(elementClassWithContainer&&elementClassWithContainer.__addRef) {
// //       // if(!options.value){

// //       // }
//       elementClassWithContainer.__addRef({elementLike: elementLike as any, el, value})
//       return true
//     }
//     return false
// },
// handleAfterRender({ el, elementLike }: { el: HTMLElement; elementLike: ElementLike }) {
//   const elementClassWithContainer =  elementLike._elementClassInstance || rootElementLike._elementClassInstance
//   // if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
//     // const elementClassWithContainer =  elementLike._elementClassInstance || rootElementLike._elementClassInstance
//     if (elementLike._elementClassInstance && elementLike._elementClassInstance.setContainerEl) {
//       elementLike._elementClassInstance.setContainerEl(el)
//       // elementClassWithContainer.setContainerEl(el)
//   }
//   // elementLike._elementClassInstance// = undefined // forget the reference
//   return true
// }

//   }
//   return c
// }

type RenderFunction<RenderOutput, R extends ElementLike=ElementLike> = (el: JSX.Element, config?: ElementLikeImplRenderConfig<R>) => RenderOutput

type JSXAloneType<T extends RenderOutput = RenderOutput, R extends ElementLike = ElementLike> = {
  render: RenderFunction<T, R>,
  createElement: CreateElementFunction<T, R>
  createRef<T>(): RefObject<T>
}



let createCreateElementConfig: CreateCreateElementConfig<RenderOutput, ElementLike, IElementClass>
export function getCreateCreateElementConfig(){
  if(!createCreateElementConfig){
    createCreateElementConfig= {
      impl: ElementLikeImpl,
      textNodeImpl: TextNodeLikeImpl,
      onElementCreated({elementLike, elementClassInstance}){
        if (elementClassInstance) {
          elementLike._elementClassInstance = elementClassInstance 
        }
        
        // elementLike  .ref=elementLike.attrs.ref
        // elementLike.attrs.ref=undefined
      },
    }
    
  }
  return createCreateElementConfig
}



export const JSXAlone: JSXAloneType<RenderOutput, ElementLike> = buildJSXALone()
