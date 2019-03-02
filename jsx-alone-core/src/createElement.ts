import { ElementClass } from './elementClass'
import { isElementClassConstructor, isNode, isElementClass } from './elementImpl'
import { CreateCreateElementConfig, ElementLike, JSXAlone, JSXAloneAttrs, JSXAloneTag } from './types'

export function createCreateElement<T, R extends ElementLike<T>= ElementLike<T>>(config: CreateCreateElementConfig<T, R>) {

  const { impl, textNodeImpl, onElementReady, onElementCreated: onElementCreate } = config

  const createElement: CreateElementFunction<T, R> = function (tag, attrs = {}, ...children: any[]) {
    let element: R
    let elementClassInstance: ElementClass | undefined
    const tagIsString = typeof tag === 'string'

    attrs = attrs || {}

    if (tagIsString) {
      element = new impl(tag as string)
    }
    else if (isElementClassConstructor(tag)) {
      elementClassInstance = new tag({ ...attrs, children })
      element = elementClassInstance.render() as any as R
    }
    else {
      element = (tag as any)({ ...attrs, children })
    }

    if (onElementCreate) {
      onElementCreate({ elementLike: element, elementClassInstance, attrs })
    }

    updateElement<T, R>(element, textNodeImpl, tag, attrs, children, true);

    if (onElementReady) {
      onElementReady({ elementLike: element })
    }
    return element
  }
  return createElement
}

export function updateElement<T, R extends ElementLike<T> = ElementLike<T>>(element: R, textNodeImpl: CreateCreateElementConfig<T, R>['textNodeImpl'], tag: JSXAloneTag, attrs: JSXAloneAttrs<string>, children: any[], create = false) {
  // HEADS UP non intrinsic els are responsible of rendering their own attributes and children

  if (typeof tag === 'string') {
    
    element.tag=tag

    Object.keys(attrs).forEach(name => {
      const value = attrs[name];
      const type = typeof value;
      if (type === 'string' || type === 'number') {
        element.setAttribute(name, value);
      }
      else if (type === 'function') {
        element.setAttribute(name, value);
      }
      else if (value === false) {
        // do nothing
      }
      else if (value === true) {
        element.setAttribute(name, name);
      }
      else if (name === 'dangerouslySetInnerHTML' && value) {
        element.dangerouslySetInnerHTML(value.__html);
      }
      else {
        element.setAttribute(name, value);
      }
    });
    children
      .forEach((child, i) => {
        if (!child) {
          return
        }
        if (isNode<T>(child)) {
          
          if (!create && i < element.children.length) {
            element.replaceChild(i, child)
          }
          else {
            element.appendChild(child);
          }
        }
        else if (Array.isArray(child)) {
          child.forEach((c, j) => {
            if (isNode<T>(c)) {
              if (!create && i + j < child.length) {
                element.replaceChild(i + j, c)
              }
              else {
                element.appendChild(c);
              }
            }
            else {
              if (!create && i+j < child.length) {
                element.replaceChild(i, new textNodeImpl(c));
              }
              else {
                element.appendChild(new textNodeImpl(c));
              }
            }
          });
        }
        else {
          if (!create && i < element.children.length) {
            element.replaceChild(i, new textNodeImpl(child));
          }
          else {
            element.appendChild(new textNodeImpl(child));
          }
        }
      });
  }
}

export const AbstractJSXAlone: JSXAlone<any> = null as any

export type CreateElementFunction<T, R= ElementLike<T>> = (
  tag: JSXAloneTag,
  attrs?: JSXAloneAttrs<string> | undefined,
  ...children: any[]
) => R

const throwOnUnrecognized = false


export function debug(err: string) {
  if (throwOnUnrecognized) {
    throw err
  } else {
    console.error(err)
  }
}
