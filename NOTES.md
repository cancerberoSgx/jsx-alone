typescript issue: 

class C<S> {
  a={}
  m(s: S) {
    const b = { ...this.a, ...s } = {   }
  }
}


[9:59:03 AM] File change detected. Starting incremental compilation...

/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:71491
                throw e;
                ^

TypeError: Cannot read property 'kind' of undefined
    at Object.isIdentifier (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:10382:21)
    at getLiteralTypeFromPropertyName (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:32924:23)
    at Object.map (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:378:29)
    at getRestType (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:29004:47)
    at checkObjectLiteralDestructuringPropertyAssignment (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:43034:28)
    at checkObjectLiteralAssignment (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:43003:17)
    at checkDestructuringAssignment (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:43106:24)
    at checkBinaryLikeExpression (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:43186:24)
    at checkBinaryExpression (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:43181:20)
    at checkExpressionWorker (/home/sg/git/jsx-alone/jsx-alone-dom-extra/node_modules/typescript/lib/tsc.js:43743:28)