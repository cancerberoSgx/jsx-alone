import { ElementClass } from './elementClass';
import { isElementClassConstructor, isNode } from './elementImpl';
import { CreateCreateElementConfig, ElementLike, JSXAlone, JSXAloneAttrs, JSXAloneTag } from './types';

const throwOnUnrecognized = false

export function debug(err: string) {
  if (throwOnUnrecognized) {
    throw err
  } else {
    console.error(err)
  }
}

export function createCreateElement<T, R extends ElementLike<T>=ElementLike<T>>(config: CreateCreateElementConfig<T, R>) {
  // console.log(config);
  
  const { impl, textNodeImpl, onElementReady, onElementCreated: onElementCreate } = config

  const createElement: CreateElementFunction<T, R> = function (tag, attrs = {}, ...children: any[]) {
    attrs = attrs || {}
    let element: R
    let elementClassInstance: ElementClass | undefined
    const tagIsString = typeof tag === 'string'
    if (tagIsString) {
      element = new impl(tag as string)
    }
    else if (isElementClassConstructor(tag)) {
      elementClassInstance = new tag({ ...attrs, children: children }) 
      element = elementClassInstance.render() as any as R
      // attrs = attrs.ref ? {ref: attrs.ref} : {}
    }
    else {
      element = (tag as any)({ ...attrs, children: children })
      // attrs={}
    }
    if (onElementCreate) {
      onElementCreate({ elementLike: element, elementClassInstance, attrs })
    }
    attrs = tagIsString ? attrs : {}//(isClassElementClass(tag)&&!attrs.ref) ?{ref: attrs.ref}: attrs 

    Object.keys(attrs).forEach(name => {
      const value = attrs[name]
      const type = typeof value
      if (type === 'string' || type === 'number') {
        element.setAttribute(name, value)
      }
      else if (type === 'function') {
        element.setAttribute(name, value)
      }
      else if (value === false) {
        // do nothing
      }
      else if (value === true) {
        element.setAttribute(name, name)
      }
      else if (name === 'dangerouslySetInnerHTML' && value) {
        element.dangerouslySetInnerHTML(value.__html)
      }
      else {
        element.setAttribute(name, value)
      }
    })


    if (tagIsString) {
      // don't render children for function or classes since they are responsible of render their own children
      children
        .filter(c => c)
        .forEach(child => {
          if (isNode<T>(child)) {
            element.appendChild(child)
          } else if (Array.isArray(child)) {
            child.forEach(c => {
              if (isNode<T>(c)) {
                element.appendChild(c)
              }
              else {
                element.appendChild(new textNodeImpl(c))
              }
            })
          } else {
            element.appendChild(new textNodeImpl(child))
          }
        })
    }
    if (onElementReady) {
      onElementReady({ elementLike: element })
    }
    return element
  }
  return createElement
}

export const AbstractJSXAlone: JSXAlone<any> = null as any

export type CreateElementFunction<T, R=ElementLike<T>> = (
  tag: JSXAloneTag,
  attrs?: JSXAloneAttrs<string> | undefined,
  ...children: any[]
) => R
