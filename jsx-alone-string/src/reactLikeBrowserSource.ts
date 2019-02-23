


import { printObjectAndScope, printSource, printNamespace } from '../introspection/printThisScopeSource';
import * as ReactLike from './createElement';
import * as elementImpl from './elementImpl';
import { getObjectKeys } from '../introspection/objectExplorer';


export function reactLikeBrowserSource() {
  // var elementImpl_1 = ${printObjectAndScope(elementImpl.i, true)};
  // ${printObjectAndScope(elementImpl.isElementLike, true)}

  // var createElement__ = ${printObjectAndScope(ReactLike, false)};
  // var ReactLike = createElement__.ReactLike
  const code = `
${assignCode}
${printNamespace(elementImpl, 'elementImpl_1')}
${printNamespace(ReactLike, 'createElement_1')}
ReactLike = createElement_1.ReactLike
createElement_1 = {ReactLike: ReactLike}
  `
  return code.trim()
}


const assignCode = `
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};
`


function aux() {
  const c = { a: 1 }
  const b = { ...c, ...{ d: 2 } }
  new elementImpl.ElementLikeImpl('asd')
}


// console.log(reactLikeBrowserSource());
