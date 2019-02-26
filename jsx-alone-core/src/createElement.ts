import { AbstractElementLike, isJSXAloneComponent as isClassElementClass, isNode } from './elementImpl'
import { CreateCreateElementConfig, JSXAlone, JSXAloneAttrs, JSXAloneComponent, JSXAloneTag, ElementLike } from './types'

const throwOnUnrecognized = false

export function debug(err: string) {
  if (throwOnUnrecognized) {
    throw err
  } else {
    console.error(err)
  }
}

export function createCreateElement<T, R extends ElementLike<T>=ElementLike<T>>(config: CreateCreateElementConfig<T, R>) {
  const { impl, textNodeImpl, escapeAttributes, functionAttributes, onElementReady, onElementCreated: onElementCreate } = config

  const createElement: CreateElementFunction<T,R> = function(tag, attrs = {}, ...children: any[]) {
    let element:  R
    let elementClassInstance: JSXAloneComponent | undefined
    if (typeof tag === 'string') {
      element = new impl(tag)
    } else {
      if (isClassElementClass(tag)) {
        elementClassInstance = new tag({ ...attrs, children: children })
        element = elementClassInstance.render()
      } else {
        if (typeof tag.prototype !== undefined && config.evaluateFunctionsWithNew) {
          element = new (tag as any)({ ...attrs, children: children })
        } else {
          element = tag({ ...attrs, children: children })
        }
      }
      attrs = {}
    }
    if (onElementCreate) {
      onElementCreate({ elementLike: element, elementClassInstance })
    }
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value: any = attrs[name]
        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name, name)
          }
        } else if (typeof value === 'function') {
          if (!functionAttributes || functionAttributes === 'preserve') {
            element.setAttribute(name, value)
          } else {
            const code =
              functionAttributes === 'toString-this'
                ? `_this = __this__ = this; (${value.toString()}).apply(_this, arguments)`
                : value.toString()
            const escaped = escapeAttributes ? escapeAttributes(code) : code
            element.setAttribute(name, escaped)
          }
        } else if (value !== false && value != null) {
          if (name === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value)
            } else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '))
            } else {
              debug(`unrecognized className value ${typeof value} ${value}`)
            }
          } else {
            element.setAttribute(name, value.toString())
          }
        } else if (typeof value === 'object') {
          if (name === 'style') {
            element.setAttribute(
              'style',
              `${Object.keys(value)
                .map(p => `${p}: ${value[p]}`)
                .join('; ')}`
            )
          } else if (name === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html)
          } else {
            debug(`unrecognized object attribute "${name}" - the only object attribute supported is "style"`)
          }
        } else {
          debug(`unrecognized attribute "${name}" with type ${typeof value}`)
        }
      }
    }
    if (typeof tag === 'string') {
      // don't render children for function or classes since they are responsible of render their own children
      children
        .filter(c => c)
        .forEach(child => {
          if (isNode<T>(child)) {
            element.appendChild(child)
          } else if (Array.isArray(child)) {
            child.forEach(c => {
              if (typeof c === 'string') {
                element.appendChild(new textNodeImpl(c))
              } else if (isNode<T>(c)) {
                element.appendChild(c)
              } else {
                debug(`Child is not a node or string: ${c} , tag: ${tag}`)
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

export type CreateElementFunction<T, R=AbstractElementLike<T>> = (
  tag: JSXAloneTag,
  attrs?: JSXAloneAttrs<string> | undefined,
  ...children: any[]
) => R
