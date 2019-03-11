import { replace } from '..'

describe('replace', () => {

  it('parcel build prefix none postfix comma', () => {
    expect(replace(`seconds ":"")+(s?s+" ms ":"")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkThrow=r,`)).toBe(`seconds ":"")+(s?s+" ms ":"")}1,exports.checkThrow=r,`)
  })

  it('parcel build prefix none postfix semicolon', () => {
    expect(replace(`ototype&&e.prototype.render}Object.defineProperty(e,"__esModule",{value:!0});var w=G;functio`)).toBe(`ototype&&e.prototype.render};var w=G;functio`)
  })

  describe('parcel no experimental build', () => {
  it('parcel build prefix semicolon postfix comma', () => {
    expect(replace(`[function(require,module,exports) {"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.language=exports.conf=void 0;var`))
      .toBe(`[function(require,module,exports) {"use strict";1,exports.language=exports.conf=void 0;var`)
  })
})

  describe('use strict', () => {
  it('should remove use strict if explicit in config', () => {
    expect(replace(`exports) {"use strict";var a`, {useStrict: true}))
      .toBe(`exports) {var a`)
  })
  it('should not remove use strict if not explicit in config', () => {
    expect(replace(`[function(require,module,exports) {"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.language=exports.conf=void 0;var`, {useStrict: false}))
    .toBe(`[function(require,module,exports) {"use strict";1,exports.language=exports.conf=void 0;var`)

  })

  it('should not remove use strict if it\'s not follosed by semicolon and not preceding by {', () => {

    function test(s: string) {
      expect(replace(s, {useStrict: true}))    .toBe(s)
    }
    test(`|(o|=1536),o&&e.setEmitFlags(a,o),a}function p(t){return e.isStringLiteral(t.expression)&&"use strict"===t.expression.text}function f(t,r,n){e.Debug.assert(0===t.length,"Prologue directives should be a`)

    test(`e.createStatement(e.createLiteral("use strict")))),a}function m`)

    test(`(e.createLiteral("use strict")))].concat(t)),t)},`)

    test(`"Parse_in_strict_mode_and_emit_use_strict_for_each_source_file_6141",'Parse in strict mode and emit "use strict" for each source file.'),`)
  })

  it('should SUPPORT SINGLE and double quotes', () => {
    expect(replace(`exports) {"use strict";var a`, {useStrict: true}))
      .toBe(`exports) {var a`)
    expect(replace(`exports) {'use strict';var a`, {useStrict: true}))
      .toBe(`exports) {var a`)
  })

})

  it('error (0,o.default) is not a function', () => {
  const s = `[function(require,module,exports) {
    "use strict";function e(e){var o,r=e.Symbol;return"function"==typeof r?r.observable?o=r.observable:(o=r("observable"),r.observable=o):o="@@observable",o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
    },{}],"LkZ7":[function(require,module,exports) {
    var global = arguments[3];
    var e=arguments[3];Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var d,o=t(require("./ponyfill.js"));function t(e){return e&&e.__esModule?e:{default:e}}d="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof module?module:Function("return this")();var u=(0,o.default)(d),n=u;exports.default=n;
    },{"./ponyfill.js":"JZ8d"}],"aV+f":[function(require,module,exports) {
    "use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createStore=i,exports.combineReducers=f,exports.bindActionCreators=l,exports.applyMiddleware=b,exports.compose=y,exports.__DO_NOT_USE__ActionTypes=void 0;var e=t(require("symbol-observable"));function t(e){return e&&e.__esModule?e:{default:e}}var r=function(){return Math.random().toString(36).substring(7).split("").join(".")},n={INIT:"@@redux/INIT"+r(),REPLACE:"@@redux/REPLACE"+r(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+r()}};function o(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)`
})

  // `Object.defineProperty(exports, "__esModule", { value: true });
  // "use strict";
  // exports.__esModule = true;`
  // })
})
// TODO
// rototype&&t.prototype.render}function e(t){return r(t)||n(t)}function n(t){return t&&t.setAttribute}function r(t){return t&&t.cont
