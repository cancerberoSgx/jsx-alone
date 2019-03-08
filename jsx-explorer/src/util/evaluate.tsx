import { JSXAloneJsonImpl, JsonImplOutputEl, JsonImplElementClass as ElementClassJson, getGlobal } from 'jsx-alone-core'
import { compileTs } from './typescript'
import { JSXAlone as JSXAloneStringImpl, ElementClass as ElementClassString } from 'jsx-alone-string'
import { JSXAlone as JSXAloneDomImpl, ElementClass as ElementClassDom } from 'jsx-alone-dom'


let evaluateLastInputJson: string | undefined
let evaluateLastOutputJson: any
let evaluateLastInputDom: string | undefined
let evaluateLastOutputDom: any
let evaluateLastInputString: string | undefined
let evaluateLastOutputString: any

/**
 * @param times if an empty object is passed it will be filled with timings and the cache won't be considered
 */
export function evaluate<T = JsonImplOutputEl>(jsx: string, impl: 'json' | 'dom' | 'string' = 'json', times?: EvaluateTimes): T {
  if (!times && impl === 'json' && jsx === evaluateLastInputJson && evaluateLastOutputJson) {
    return evaluateLastOutputJson
  }
  if (!times && impl === 'dom' && jsx === evaluateLastInputDom && evaluateLastOutputDom) {
    return evaluateLastOutputDom
  }
  if (!times && impl === 'string' && jsx === evaluateLastInputString && evaluateLastOutputString) {
    return evaluateLastOutputString
  }
  const emittedFixed = compileTs(jsx)

  let r: T = null as any
  const s = `(${emittedFixed})()`

  try {
    
    const JSXAlone = getGlobal().JSXAlone = impl === 'dom' ? JSXAloneDomImpl : impl === 'string' ? JSXAloneStringImpl : JSXAloneJsonImpl // needed by some old examples expecting global
    const ElementClass = getGlobal().ElementClass = impl === 'dom' ? ElementClassDom : impl === 'string' ? ElementClassString : ElementClassJson// needed by some old examples expecting global

    const evalT0 = Date.now()
    const jsxLike = eval(s)

    times && (times.eval = Date.now() - evalT0)
    const renderT0 = Date.now()
    r = JSXAlone.render(jsxLike) as T

    times && (times.render = Date.now() - renderT0)
    impl === 'json' && removeCirclesJsonImplOutput(r)
  } catch (e) {
    e.evaluated = s
    throw e
  }
  if (impl === 'json') {
    evaluateLastInputJson = jsx
    evaluateLastOutputJson = r
  }
  if (impl === 'dom') {
    evaluateLastInputDom = jsx
    evaluateLastOutputDom = r
  }
  if (impl === 'string') {
    evaluateLastInputString = jsx
    evaluateLastOutputString = r
  }
  return r
}

export interface EvaluateTimes {
  eval?: number
  render?: number
}

function removeCirclesJsonImplOutput(r: any): any {
  if (r) {
    delete r.parentElement;
    (r.children || []).forEach((c: any) => removeCirclesJsonImplOutput(c))
  }
}
