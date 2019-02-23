import { ClientCode, ElementLike, NodeLike, ReactLike as ReactLikeType, ReactLikeAttrs, ReactLikeChild, ReactLikeTag, RenderConfig,  isNode, isReactLikeComponent, TextNodeLIke } from 'jsx-alone-core'
import * as jsx from 'jsx-alone-core'
import { ElementLikeImpl, TextNodeLikeImpl } from './elementImpl';
import { defaultRenderConfig , ElementLikeImplRenderConfig} from './config';

const throwOnUnrecognized = false
function debug(err: string) {
  if (throwOnUnrecognized) {
    throw err
  }
  else {
    console.error(err);

  }
}

const Module = {
  createElement(tag: ReactLikeTag, attrs: ReactLikeAttrs = {}, ...children: ReactLikeChild[]): ElementLikeImpl {
    var element: ElementLikeImpl;
    if (typeof tag === 'string') {
      element = new ElementLikeImpl(tag)
    }
    else {
      if (isReactLikeComponent(tag)) {
        element = new tag({ ...attrs, children: children }).render()
      }
      else {
        element = tag({ ...attrs, children: children })
      }
      attrs = {}
    }
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        var value: any = attrs[name]

        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name, name)
          }
        }
        else if (typeof value === 'function') {
          const code = `_this = __this__ = this; (${value.toString()}).apply(_this, arguments)`
          const escaped = code.replace(/\"/gmi, '&quot;');
          element.setAttribute(name, escaped)
        }
        else if (value !== false && value != null) {
          if (name === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value)
            }
            else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '))
            }
            else {
              debug(`unrecognized className value ${typeof value} ${value}`)
            }
          }
          else {
            element.setAttribute(name, value.toString())
          }
        }
        else if (typeof value === 'object') {
          if (name === 'style') {
            element.setAttribute('style', `${Object.keys(value).map(p => `${p}: ${value[p]}`).join('; ')}`)
          }
          else if (name === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html)
          }
          else {
            debug(`unrecognized object attribute "${name}" - the only object attribute supported is "style"`)
          }
        }
        else {
          debug(`unrecognized attribute "${name}" with type ${typeof value}`)
        }
      }
    }

    children.filter(c => c).forEach(child => {
      if (isNode<string>(child)) {
        element.appendChild(child)
      }
      else if (Array.isArray(child)) {
        child.forEach(c => {
          if (typeof c === 'string') {
            element.appendChild(new TextNodeLikeImpl(c))
          }
          else if (isNode<string>(c)) {
            element.appendChild(c)
          }
          else {
            debug(`Child is not a node or string: ${c} , tag: ${tag}`)
          }
        })
      }
      else {
        element.appendChild(new TextNodeLikeImpl(child))
      }
    })
    return element
  },

  _renderConfig: undefined as RenderConfig | undefined,

//   render(el: JSX.Element, config: ElementLikeImplRenderConfig = {}): string {
//     return `
// ${config.renderClientCode ? `<script>${Module.getClientCode().map(c => c.code).join('\n')}<${''}/`+`script>` : ``}
// ${(el as any as NodeLike<string>).render(config)}
// `.trim()
//   },
  render(el: JSX.Element, config: ElementLikeImplRenderConfig = {}): string {
    return `${(el as any as NodeLike<string>).render(config)}`
  },

  // registerClientCode(f: ClientCode) {
  //   clientCode.push(f)
  // },

  // getClientCode(): ClientCode[] {
  //   return clientCode
  // },

}

// const clientCode: ClientCode[] = []

export const ReactLike: ReactLikeType<string> = Module

//@ts-ignore
ReactLike = Module // creates a global variable needed so emitted .js calls work. See tsconfig.json `"jsxFactory": "ReactLike.createElement",`
