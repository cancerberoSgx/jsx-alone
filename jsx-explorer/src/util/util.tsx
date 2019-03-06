import { JSXAloneJsonImpl, JsonImplOutputEl } from 'jsx-alone-core'
import { compileTs } from './typescript';
import { JSXAlone as JSXAloneStringImpl } from 'jsx-alone-string'
import { JSXAlone as JSXAloneDomImpl } from 'jsx-alone-dom'

let evaluateLastInputJson: string | undefined
let evaluateLastOutputJson: any
let evaluateLastInputDom: string | undefined
let evaluateLastOutputDom: any
let evaluateLastInputString: string | undefined
let evaluateLastOutputString: any

export function evaluate<T = JsonImplOutputEl>(jsx: string, impl: 'json' | 'dom' | 'string' = 'json'): T {
  if (impl === 'json' && jsx === evaluateLastInputJson && evaluateLastOutputJson) {
    return evaluateLastOutputJson
  }
  if (impl === 'dom' && jsx === evaluateLastInputDom && evaluateLastOutputDom) {
    return evaluateLastOutputDom
  }
  if (impl === 'string' && jsx === evaluateLastInputString && evaluateLastOutputString) {
    return evaluateLastOutputString
  }
  const JSXAlone = impl === 'dom' ? JSXAloneDomImpl : impl === 'string' ? JSXAloneStringImpl : JSXAloneJsonImpl
  const compiled = compileTs(jsx)
  let r: T = null as any
  const s = `(${compiled})()`
  try {
    // const config = impl === 'string' ? {indent: true, indentTabSize: 2}: undefined   as any
    const jsxLike = eval(s)
    r = JSXAlone.render(jsxLike)  as T
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

function removeCirclesJsonImplOutput(r: any): any {
  if (r) {
    delete r.parentElement;
    (r.children || []).forEach((c: any) => removeCirclesJsonImplOutput(c))
  }
}

export function query<T extends HTMLElement= HTMLElement>(s: string): T {
  return document.querySelector<T>(s)!
}
export function queryAll<T extends HTMLElement= HTMLElement>(s: string): T[] {
  return Array.from(document.querySelectorAll<T>(s))
}

export function escapeHtml(html: string) {
  return html.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').trim()
}

export function shorter(s: string, l = 20) {
  return s.trim().substring(0, Math.min(s.length, l))
}

export function emptyAllChildren(e: Element) {
  Array.from(e.children).forEach(c => { emptyAllChildren(c); e.removeChild(c); })
  e.innerHTML = ''
}