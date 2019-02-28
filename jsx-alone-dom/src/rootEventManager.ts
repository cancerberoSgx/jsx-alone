import { ElementLike, ElementClass } from '.';
import { markElement, getMarkSSelector, getElementMark, getMarkedElement } from "./mark";
type Fn = (e: Event) => any
interface Listener {
  mark: string,
  fn: Fn
  type: string
}


const defaultConfig = {
  delegate: 'root'
}
const MARK = '_jsxa_e_'
const registeredByType: { [type: string]: Listener[] } = {}

/** provides event delegation management to all nodes generated in a render() call, using the root element (the one returned bu JSXAlone.render() call) */
export class RootEventManager {

  constructor(private root: HTMLElement, private config = defaultConfig) {
    this.rootListener.bind(this)
  }

  private registeredByType: { [type: string]: Listener[] } = {}

  private rootListener(e:Event) {

  }

  addEventListener(el: HTMLElement, type: string, fn: Fn) {
    if (this.config.delegate === 'root') {
      let ls = this.registeredByType[type]
      if (!ls) {
        ls = registeredByType[type] = []
        this.root.addEventListener(type, this.rootListener) // TODO: options

      }
      else {
        // need to mark -- not impl
        // ls.push({
        //   mark: markElement(el, MARK), fn, type
        // })
      }
    }
  }

  removeListeners(el: HTMLElement, types?: []) {
    if (this.config.delegate === 'root') {
      // in case of root, we don't need to search further - remove types only if el is root
      if (el === this.root) {
        (types || Object.keys(this.registeredByType)).forEach(t => {
          (this.registeredByType[t] || []).map(e => e.fn).forEach(listener => {
            this.root.removeEventListener(t, listener)// TODO: options
          })
        })
      }
    }
    else {
      // need to select nor supported
      // const mark = getElementMark(el);
      //  ...
      // el.querySelectorAll(getMarkSSelector(MARK)).forEach
    }
  }
}


// interface AddOptions {
//   el: HTMLElement
//   type: string
//   listener: L
// }
// type L = (...args:[])=>any
// interface Config {
//   /** event delegation moode . Righ now we will add event listeners in ElementLikeImplRenderConfig.rootElementLike that is certain to be there and was the root for which JSXLike.render() was called */
//   delegate?:'root'//|'paremtClass'|'self'
// }

  // addEventListener(opts:AddOptions){
  //   //TODO settimeout  - window.requestAnimationFrame scheduled - fastdom ?
  // }

// /** return the closest Element like in the hierarchy going to top, that has a parent element class */
// function findClosestElWithClass(el?: ElementLike): ElementLike|undefined {
//   if(el){
//    return el._elementClassInstance ? el :  findClosestElWithClass(el.parentElement)
//   }
// }

// function findFarthestElWithClass(el?: ElementLike): ElementLike|undefined {
//   if(el){
//     const f1 = findClosestElWithClass(el)
//     if(f1) {
//       return findFarthestElWithClass(f1.parentElement) || f1
//     }
//   }
//   return el && 
// }