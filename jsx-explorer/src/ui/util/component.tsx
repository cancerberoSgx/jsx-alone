// import { ElementClass, JSXAlone, ElementLikeImpl } from 'jsx-alone-dom'
// import { emptyAllChildren } from '../../util/util'

export {UpdatablePropsNonDestructiveComponent as Component} from 'jsx-alone-dom'
// /** 
//  * the abstract component that supports updating its properties and when it happens update the DOM. store.subscribe()
//  * handlers will call updateProps() on the top level component (Main) and this will trigger a recursive re-render and
//  * props propagation through all the elements 
//  */
// export abstract class Component<P= {}> extends UpdatablePropsComponent<P> {

//   beforeRender(containerEl: HTMLElement) {
//     this.containerEl = containerEl
//     if (this.removeChildrenOnUpdate && this.containerEl) {
//       this._eventManager && this._eventManager.removeListeners(this.containerEl, true)
//       emptyAllChildren(this.containerEl)
//     }
//   }

//   afterRender(containerEl: HTMLElement) {
//     this.containerEl = containerEl
//   }

//   updateProps(s: Partial<P>) {
//     this._props = { ...this._props, ...s }
//     const el = this.render();
//     (el as any as ElementLikeImpl)._elementClassInstance = this
//     JSXAlone.render(el, {
//       updateExisting: this.containerEl,
//       updateExistingRemoveChildrenIfCountDiffer: this.removeChildrenOnUpdate
//     })
//   }

//   protected removeChildrenOnUpdate = false
// }
