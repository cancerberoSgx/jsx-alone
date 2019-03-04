import { ElementClass, JSXAlone } from 'jsx-alone-dom';

export abstract class Component<P={}> extends ElementClass<P> {
  state: P
  containerEl: HTMLElement | undefined
  constructor(p: P) {
    super(p)
    this.state = { ...p }
  }
  protected getComponentName() {
    return this.constructor.name
  }
  afterRender(containerEl: HTMLElement) {
    this.containerEl = containerEl
  }
  protected updateUI() { 
    const el = this.render()
    //@ts-ignore
    el._elementClassInstance = this
    JSXAlone.render(el, {
      updateExisting: this.containerEl
    })
  }
  setState(s: Partial<P>) {
    this.state={...this.state, ...s}
    this._props = this.state
    this.updateUI()
  }
}


// export abstract class Component<P> extends ElementClass<P> {

//   state: P
  
//   protected containerEl: HTMLElement | undefined

//   constructor(p: P) {
//     super(p)
//     this.state =p
//   }
  
//   afterRender(containerEl: HTMLElement) {
//     this.containerEl = containerEl
//   }

//   update(props?:P) {
//     if (!this.containerEl) {
//       throw new Error('Cannot update without this.containerEl')
//     }
//     // if(props && JSON.stringify(this.state)!==JSON.stringify(props)){
//       JSXAlone.render(this.render(), {
//         updateExisting: this.containerEl!
//       })
//       // return true
//     // }
//     return true
//   }
// }
