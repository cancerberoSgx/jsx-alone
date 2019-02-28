import { ElementClass } from './'

export abstract class StatefulComponent<P = {}, S =P> extends ElementClass<P> {
  state: S ={} as any

  constructor(p: P) {
    super(p)
    this.state ={...(p as any)}
  }
  // protected containerEl: HTMLElement = undefined as any

  // /** called by ElementLike.render() */
  // setContainerEl(el: HTMLElement) {
  //   this.containerEl = el
  // }

  /** changes the state, clean up containerEl and renders the element again and append it to containerEl. 
   * Notice that descendant elements will be destroyed and */
  setState(  s: Partial<S>) {
    //@ts-ignore
    this.state = { ...this.state, ...s }  
  }

  // protected __addRef<T extends Element&ElementClass>({el, attribute, value, elementLike}: {el: HTMLElement, attribute:string, value:RefObjectImpl<T>, elementLike: FunctionAttributesElement<T>}){
  //   // console.log('CUCUCUCUC', value && value._current);
  //   value._current=elementLike._elementClassInstance || markElement(el)
    
  //   // const key = markElement(el)
  //   // value._current = 
  // }
}

// {config: ElementLikeImplRenderConfig<R>, el: HTMLElement, attribute:string, value:any, elementLike: R}
// export function isStatefulComponent(c: any): c is StatefulComponent {
//   return c && c.setState
// }
