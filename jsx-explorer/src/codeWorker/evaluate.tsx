import { JsonImplOutputEl, isJsonImplOutputEl, objectMap } from 'jsx-alone-core'
import { compileTs } from './typescript'
import { CodeWorkerError, EvaluateTimes } from '../store/types'
import { JSXAloneJsonImpl, JsonImplElementClass as ElementClassJson, getGlobal } from 'jsx-alone-core'
import { JSXAlone as JSXAloneStringImpl, ElementClass as ElementClassString } from 'jsx-alone-string'
import { JSXAlone as JSXAloneDomImpl, ElementClass as ElementClassDom } from 'jsx-alone-dom'
import { lastRequest } from './codeWorker'

export interface EvaluateResult<T = JsonImplOutputEl> {
  result?: T, error?:
  CodeWorkerError,
  evaluated: string
}

let results: EvaluateResult

export function evaluate<T = JsonImplOutputEl>(jsx: string, impl: 'json' | 'dom' | 'string' = 'json', times?: EvaluateTimes): EvaluateResult<T> {
  if (lastRequest && jsx === lastRequest.code) {
    return results as any
  }
  const jsxFixed = jsx.substring(jsx.indexOf('function'), jsx.length)
  const emitted = compileTs(jsxFixed)
  const s = `(${emitted})()`

  const { result, error } = evaluateOnly(s, impl, times)

  results = { result, error, evaluated: s }
  return results as any
}

function renderWithImpl<T>(fn: () => JSX.Element, impl: 'json' | 'dom' | 'string', config?: any): T {
  const JSXAlone = getGlobal().JSXAlone = impl === 'dom' ? JSXAloneDomImpl : impl === 'string' ? JSXAloneStringImpl : JSXAloneJsonImpl
  return JSXAlone.render(fn(), config as any) as any
}
function evaluateOnly<T = JsonImplOutputEl>(s: string, impl: 'json' | 'dom' | 'string' = 'json', times?: EvaluateTimes): {
  result?: T;
  error?: CodeWorkerError
} {
  let error: CodeWorkerError | undefined
  let result: T | undefined
  try {
    // The import statement in tests forces us to declare following names here:
    // import {JSXAlone, JSXAloneDom, JSXAloneString, JSXAloneJson,
    //   ElementClassDom, ElementClassJson, ElementClassString } from '.'
    const JSXAlone = getGlobal().JSXAlone = impl === 'dom' ? JSXAloneDomImpl : impl === 'string' ? JSXAloneStringImpl : JSXAloneJsonImpl
    const JSXAloneDom = getGlobal().JSXAloneDom = JSXAloneDomImpl
    const JSXAloneString = getGlobal().JSXAloneString = JSXAloneStringImpl
    const JSXAloneJson = getGlobal().JSXAloneJson = JSXAloneJsonImpl
    const ElementClass = getGlobal().ElementClass = impl === 'dom' ? ElementClassDom : impl === 'string' ? ElementClassString : ElementClassJson
    getGlobal().JSXAloneString = JSXAloneString
    getGlobal().JSXAloneJson = JSXAloneJson
    getGlobal().JSXAloneDom = JSXAloneDom
    getGlobal().renderWithImpl = renderWithImpl

    const evalT0 = Date.now()
    const jsxElementOrString = eval(s)
    times && (times.eval = Date.now() - evalT0)
    const renderT0 = Date.now()
    result = (typeof jsxElementOrString === 'string') ?
      JSXAlone.render(<div id="test-returned-string">{jsxElementOrString}</div>) as T :
      JSXAlone.render(jsxElementOrString) as T

    times && (times.render = Date.now() - renderT0)

    impl === 'json' && removeCirclesJsonImplOutput(result)
  } catch (ex) {
    error = { message: ex.message || ex + '', stack: ex.stack, name: ex.name || ex + '' }
    console.error('Error in worker: ', ex);
    
    // throw   ex
  }
  return { result, error }
}

function removeCirclesJsonImplOutput(r: any): any {
  if (r && isJsonImplOutputEl(r)) {
    delete (r as any).parentElement
    // r.attrs = objectMap(r.attrs||{}, (a,v)=>typeof v === 'function' ? v.toString() :v) // TODO: if we do this - seems it's evaluated with the example and error foo_foo.objectMap is not a function is thrown !!!
    Object.keys(r.attrs).forEach(a => {
      r.attrs[a] = typeof r.attrs[a] === 'function' ? r.attrs[a].toString() : r.attrs[a]
    });
    (r.children || []).forEach((c: any) => removeCirclesJsonImplOutput(c))

  }
}
