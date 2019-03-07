import { JSXAloneJsonImpl, JsonImplOutputEl, JsonImplElementClass as ElementClassJson } from 'jsx-alone-core';
import { compileTs } from './typescript';
import { JSXAlone as JSXAloneStringImpl, ElementClass as ElementClassString } from 'jsx-alone-string';
import { JSXAlone as JSXAloneDomImpl , ElementClass as ElementClassDom} from 'jsx-alone-dom';


let evaluateLastInputJson: string | undefined;
let evaluateLastOutputJson: any;
let evaluateLastInputDom: string | undefined;
let evaluateLastOutputDom: any;
let evaluateLastInputString: string | undefined;
let evaluateLastOutputString: any;
/**
 * @param times if an empty object is passed it will be filled with timings and the cache won't be considered
 */
export function evaluate<T = JsonImplOutputEl>(jsx: string, impl: 'json' | 'dom' | 'string' = 'json', times?: EvaluateTimes): T {
  if (!times && impl === 'json' && jsx === evaluateLastInputJson && evaluateLastOutputJson) {
    return evaluateLastOutputJson;
  }
  if (!times && impl === 'dom' && jsx === evaluateLastInputDom && evaluateLastOutputDom) {
    return evaluateLastOutputDom;
  }
  if (!times && impl === 'string' && jsx === evaluateLastInputString && evaluateLastOutputString) {
    return evaluateLastOutputString;
  }
  const compiled = compileTs(jsx);
  //console.log(' -- evaluate -- compileTs');
  
  let r: T = null as any;
  const s = `(${compiled})()`;
  try {
    const JSXAlone = impl === 'dom' ? JSXAloneDomImpl : impl === 'string' ? JSXAloneStringImpl : JSXAloneJsonImpl;
    const ElementClass  = impl === 'dom' ? ElementClassDom : impl === 'string' ? ElementClassString : ElementClassJson;
    // const config = impl === 'string' ? {indent: true, indentTabSize: 2}: undefined   as any
    const evalT0 = Date.now();
    const jsxLike = eval(s);    
    
    //console.log(' -- evaluate -- eval');


    times && (times.eval = Date.now() - evalT0);
    const renderT0 = Date.now();
    r = JSXAlone.render(jsxLike) as T;
    //console.log(' -- evaluate -- JSXAlone.render');

    times && (times.render = Date.now() - renderT0);
    impl === 'json' && removeCirclesJsonImplOutput(r);
  }
  catch (e) {
    e.evaluated = s;
    throw e;
  }
  if (impl === 'json') {
    evaluateLastInputJson = jsx;
    evaluateLastOutputJson = r;
  }
  if (impl === 'dom') {
    evaluateLastInputDom = jsx;
    evaluateLastOutputDom = r;
  }
  if (impl === 'string') {
    evaluateLastInputString = jsx;
    evaluateLastOutputString = r;
  }
  return r;
}
export interface EvaluateTimes {
  eval?: number;
  render?: number;
}
function removeCirclesJsonImplOutput(r: any): any {
  if (r) {
    delete r.parentElement;
    (r.children || []).forEach((c: any) => removeCirclesJsonImplOutput(c));
  }
}
