import { ElementClass, emptyAllChildren, JSXAlone } from '.';

/**
 * Abstract component that supports updating its properties but triggering a full descendants HTML Elements update or
 * replacement in case `this.removeChildrenOnUpdate` is true. 
 *
 * Also descendant element classes will be re-rendered with the new props passed top-down. It has a reference to its
 * `containerElement` that is updated on each `render()` (in case it changes). 
 *
 * Two modes of update are supported controlled by `removeChildrenOnUpdate` property which subclasses can override. 
 *
 * * if `removeChildrenOnUpdate == true` (the default value)  then all descendant nodes are removed from the node and
 *   dissociated from this instance
 *
 * * if `removeChildrenOnUpdate == false`  then `JSXAlone.render()` will update recursively the nodes that changed.
 *   Unfortunately this update process still has an issue that new nodes are never removed - only updated and appended.
 *   This mode is recommended only the component needs to maintain the same DOM Node instances. 
 *
 * **IMPORTANT** the update mode is given by the root Component that called `updateProps()` on the first place and
 * triggered the update / re-rendering chain. 
 *
 * If they call it with `removeChildrenOnUpdate == true` then all descendant component will be updated in this manner no
 * matter their`removeChildrenOnUpdate` value. If they call it with true then descendant components can still force
 * `removeChildrenOnUpdate == true`
 */
export abstract class UpdatablePropsComponent<P = {}> extends ElementClass<P> {

  /**
   * Reference to the current Dom element into which the `render()` result was attached. It should be defined after the
   * first `render()` call
   */
  protected containerElement: HTMLElement | undefined

  /**
   * Defines the update mode, see class docs.
   */
  protected removeChildrenOnUpdate = false

  beforeRender(containerElement: HTMLElement) {
    this.containerElement = containerElement
    if (this.removeChildrenOnUpdate && this.containerElement) {
      this._eventManager && this._eventManager.removeListeners(this.containerElement, true)
      emptyAllChildren(this.containerElement)
    }
  }

  afterRender(containerElement: HTMLElement) {
    this.containerElement = containerElement
  }

  /** 
   * Update `this.props` and call `JSXAlone.render` on "updateExisting" mode. It will trigger `beforeRender` and
   * `afterRender` on all descendant components and on itself. DOM update mode is given by `removeChildrenOnUpdate`, see
   * class docs.
   */
  protected updateProps(s: Partial<P>) {
    this._props = { ...this._props, ...s }
    const el = this.render();
    (el as any)._elementClassInstance = this // TODO: review this why is needed ?
    JSXAlone.render(el, {
      updateExisting: this.containerElement,
      updateExistingRemoveChildrenIfCountDiffer: this.removeChildrenOnUpdate
    })
  }

  public getComponentName() {
    return this.constructor.name
  }

  /** 
   * Could throw in case this.containerEl is not defined or return undefined in case nothing is found. Not included in
   * signature on purpose 
   */
  protected query<T extends Element= Element>(s: string): T {
    return this.containerElement && this.containerElement.querySelector<T>(s) as any
  }
  /** 
   * Could throw in case this.containerEl is not defined. Not included in signature on purpose 
   */
  protected queryAll<T extends Element= Element>(s: string): T[] {
    return Array.from(this.containerElement!.querySelectorAll(s))
  }

}


export abstract class UpdatablePropsDestructiveComponent<P = {}> extends UpdatablePropsComponent<P>{
  protected removeChildrenOnUpdate = true
}
export abstract class UpdatablePropsNonDestructiveComponent<P = {}> extends UpdatablePropsComponent<P>{
  protected removeChildrenOnUpdate = false
}