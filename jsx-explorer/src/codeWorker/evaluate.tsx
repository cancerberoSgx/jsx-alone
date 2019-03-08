import { JsonImplOutputEl, isJsonImplOutputEl, objectMap } from 'jsx-alone-core'
import { compileTs } from './typescript'
import { evaluateOnly, EvaluateTimes } from '../util/evaluateOnly';
import { CodeWorkerError } from '../store/types';


let evaluateLastInputJson: string | undefined
let evaluateLastOutputJson: any
let evaluateLastInputDom: string | undefined
let evaluateLastOutputDom: any
let evaluateLastInputString: string | undefined
let evaluateLastOutputString: any

/**
 * @param times if an empty object is passed it will be filled with timings and the cache won't be considered
 */
export function evaluate<T = JsonImplOutputEl>(jsx: string, impl: 'json' | 'dom' | 'string' = 'json', times?: EvaluateTimes): {result?: T, error?: CodeWorkerError, evaluated: string} {
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

  const s = `(${emittedFixed})()`

  const {result, error} = evaluateOnly(s, impl, times)

  if (impl === 'json') {
    evaluateLastInputJson = jsx
    evaluateLastOutputJson = result
  }
  if (impl === 'dom') {
    evaluateLastInputDom = jsx
    evaluateLastOutputDom = result
  }
  if (impl === 'string') {
    evaluateLastInputString = jsx
    evaluateLastOutputString = result
  }
  return {result, error, evaluated: s}
}

