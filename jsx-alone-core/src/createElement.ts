import { ReactLikeTag, ReactLikeAttrs, ReactLikeChild, ElementLike, TextNodeLIke } from './types';
import { isReactLikeComponent, isNode, AbstractElementLike, AbstractTextNodeLike } from './elementImpl';

const throwOnUnrecognized = false

export function debug(err: string) {
  if (throwOnUnrecognized) {
    throw err
  } else {
    console.error(err)
  }
}

export function createCreateElement<T>(impl: {new(tag: ReactLikeTag)}, textNodeImpl : {new(content: ReactLikeTag)}) {

  return function createElement(tag: ReactLikeTag, attrs: ReactLikeAttrs = {}, ...children: ReactLikeChild[]):  AbstractElementLike<T> {
    var element:  AbstractElementLike<T>;
    if (typeof tag === 'string') {
      element = new impl(tag);
    }
    else {
      if (isReactLikeComponent(tag)) {
        element = new tag({ ...attrs, children: children }).render();
      }
      else {
        element = tag({ ...attrs, children: children });
      }
      attrs = {};
    }
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        var value: any = attrs[name];
        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name, name);
          }
        }
        else if (typeof value === 'function') {
          const code = `_this = __this__ = this; (${value.toString()}).apply(_this, arguments)`;
          const escaped = code.replace(/\"/gim, '&quot;');
          element.setAttribute(name, escaped);
        }
        else if (value !== false && value != null) {
          if (name === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value);
            }
            else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '));
            }
            else {
              debug(`unrecognized className value ${typeof value} ${value}`);
            }
          }
          else {
            element.setAttribute(name, value.toString());
          }
        }
        else if (typeof value === 'object') {
          if (name === 'style') {
            element.setAttribute('style', `${Object.keys(value)
              .map(p => `${p}: ${value[p]}`)
              .join('; ')}`);
          }
          else if (name === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html);
          }
          else {
            debug(`unrecognized object attribute "${name}" - the only object attribute supported is "style"`);
          }
        }
        else {
          debug(`unrecognized attribute "${name}" with type ${typeof value}`);
        }
      }
    }
    if (typeof tag === 'string') {
      // don't render children for function or classes since they are responsible of render their children
      children
        .filter(c => c)
        .forEach(child => {
          if (isNode<T>(child)) {
            element.appendChild(child);
          }
          else if (Array.isArray(child)) {
            child.forEach(c => {
              if (typeof c === 'string') {
                element.appendChild(new textNodeImpl(c));
              }
              else if (isNode<T>(c)) {
                element.appendChild(c);
              }
              else {
                debug(`Child is not a node or string: ${c} , tag: ${tag}`);
              }
            });
          }
          else {
            element.appendChild(new textNodeImpl(child));
          }
        });
    }
    return element;
  }
  
}