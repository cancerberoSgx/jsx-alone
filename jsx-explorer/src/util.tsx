import { JSXAloneJsonImpl, JsonImplOutputEl } from 'jsx-alone-core'
import * as ts from 'typescript'

export function evaluate(jsx: string) {
  const JSXAlone = JSXAloneJsonImpl // cannot put the name as named import because transpilation changes it
  const compiled = compileTs(jsx)
  let r: JsonImplOutputEl = null as any
  const s = `(${compiled})()`
  try {
    const jsxLike = eval(s)
    r = JSXAlone.render(jsxLike) as any
    removeCircles(r)
  } catch (e) {
    e.evaluated = s
    throw e
  }
  return r
}
function removeCircles(r: any): any {
  if (r) {
    delete r.parentElement;
    (r.children || []).forEach((c: any) => removeCircles(c))
  }
}
export function compileTs(code: string) {
  let res = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.None,
      jsx: 'react',
      jsxFactory: 'JSXAlone.createElement'
    }
  } as any)
  return res.outputText
}

export function query<T extends HTMLElement= HTMLElement>(s: string): T {
  return document.querySelector<T>(s)!
}
