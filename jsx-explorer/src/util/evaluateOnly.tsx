import { JSXAloneJsonImpl, JsonImplOutputEl, JsonImplElementClass as ElementClassJson, getGlobal, isJsonImplOutputEl } from 'jsx-alone-core';
import { JSXAlone as JSXAloneStringImpl, ElementClass as ElementClassString } from 'jsx-alone-string';
import { JSXAlone as JSXAloneDomImpl, ElementClass as ElementClassDom } from 'jsx-alone-dom';
import { CodeWorkerError } from '../store/types';

export function evaluateOnly<T = JsonImplOutputEl>(s: string, impl: 'json' | 'dom' | 'string' = 'json', times?: EvaluateTimes): {
  result?: T;
  error?: CodeWorkerError
} {
  let error: CodeWorkerError | undefined;
  let result: T | undefined;
  try {
    const JSXAlone = getGlobal().JSXAlone = impl === 'dom' ? JSXAloneDomImpl : impl === 'string' ? JSXAloneStringImpl : JSXAloneJsonImpl; // needed by some old examples expecting global
    const ElementClass = getGlobal().ElementClass = impl === 'dom' ? ElementClassDom : impl === 'string' ? ElementClassString : ElementClassJson; // needed by some old examples expecting global
    const evalT0 = Date.now();
    const jsxLike = eval(s);
    times && (times.eval = Date.now() - evalT0);
    const renderT0 = Date.now();
    result = JSXAlone.render(jsxLike) as T;
    times && (times.render = Date.now() - renderT0);
    impl === 'json' && removeCirclesJsonImplOutput(result);
  }
  catch (ex) {
    error = { message: ex.message || ex + '', stack: ex.stack, name: ex.name || ex + '' };
  }
  return { result, error };
}


function removeCirclesJsonImplOutput(r: any): any {
  if (r && isJsonImplOutputEl(r)) {
    delete (r as any).parentElement;
    // r.attrs = objectMap(r.attrs||{}, (a,v)=>typeof v === 'function' ? v.toString() :v) // TODO: if we do this - seems it's evaluated with the example and error foo_foo.objectMap is not a function is thrown !!!
    Object.keys(r.attrs).forEach(a=>{
      r.attrs[a] = typeof r.attrs[a] === 'function' ? r.attrs[a].toString() :r.attrs[a]
    });
    (r.children || []).forEach((c: any) => removeCirclesJsonImplOutput(c))

  }
}
export interface EvaluateTimes {
  eval?: number
  render?: number
}