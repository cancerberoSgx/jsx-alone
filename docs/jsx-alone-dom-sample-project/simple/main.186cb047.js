// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"X94W":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export function flatDeep<T = any>(arr1: T[][] | T[]): T[] {
//   return (arr1 as any[]).reduce((acc, val) => (Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val)), [])
// }
function flatDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val), []);
}
exports.flatDeep = flatDeep;
function flat(arr) {
    return arr.reduce((a, b) => a.concat(b));
}
exports.flat = flat;
function flatReadOnly(arr) {
    return arr && arr.length ? arr.reduce((a, b) => a.concat(b)) : [];
}
exports.flatReadOnly = flatReadOnly;

},{}],"wbWF":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function array(n, sample) {
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(typeof sample === 'undefined' ? i : sample);
    }
    return a;
}
exports.array = array;
function dedup(a, p) {
    return a.reduce((x, y) => x.find(i => p(i, y)) ? x : [...x, y], []);
}
exports.dedup = dedup;
function asArray(selectors) {
    return Array.isArray(selectors) ? selectors : [selectors];
}
exports.asArray = asArray;
function unionEquals(left, right, equals) {
    return left.concat(right).reduce((acc, element) => {
        //@ts-ignore
        return acc.some(elt => equals(elt, element)) ? acc : acc.concat(element);
    }, []);
}
exports.unionEquals = unionEquals;
function seq(start = 0, step = 1, max = 0) {
    const result = [];
    for (let i = start; i < max; i += step) {
        result.push(i);
    }
    return result;
}
exports.seq = seq;

},{}],"eW/z":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayPrototypeFind(a, predicate, thisArg) {
    for (let i = 0; i < a.length; i++) {
        const v = a[i];
        if (predicate.apply(thisArg, [v, i, a])) {
            return v;
        }
    }
}
exports.arrayPrototypeFind = arrayPrototypeFind;
function installArrayPrototypeFind(force = false) {
    Array.prototype.find = (typeof Array.prototype.find === 'undefined' || force) ? function (predicate, thisArg) {
        //@ts- ignore
        return arrayPrototypeFind(this, predicate, thisArg);
    } : Array.prototype.find;
}
exports.installArrayPrototypeFind = installArrayPrototypeFind;

},{}],"XwTw":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./flat":"X94W","./array":"wbWF","./prototypeFind":"eW/z"}],"9x/c":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function changeText(text, toInsert) {
    let s = text.split('');
    let indexIncr = 0;
    toInsert.forEach(data => {
        data.toAdd = data.toAdd || '';
        data.toRemove = data.toRemove || '';
        s.splice(data.pos + indexIncr, data.toRemove.length, ...data.toAdd.split(''));
        indexIncr += data.toAdd.length - data.toRemove.length;
    });
    return s.join('');
}
exports.changeText = changeText;

},{}],"ZdIq":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPreviousMatchingPos(text, pos, condition) {
    pos = text.length <= pos ? text.length : pos;
    if (typeof condition === 'string') {
        const s = condition;
        condition = (c) => c === s;
    }
    while (pos >= 0) {
        const char = text[pos];
        if (!condition(char)) {
            pos--;
        }
        else {
            break;
        }
    }
    return pos;
}
exports.getPreviousMatchingPos = getPreviousMatchingPos;

},{}],"4jU9":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function quote(s, q = '"') {
    return q + s.replace(new RegExp(q, 'g'), '\\' + q) + q;
}
exports.quote = quote;

},{}],"Eajz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** try to parse given json string. return undefined in case there is an error. */
function parseJSON(s, defaultValue) {
    try {
        return JSON.parse(s);
    }
    catch (error) {
        return defaultValue;
    }
}
exports.parseJSON = parseJSON;
function clone(a) {
    return JSON.parse(JSON.stringify(a));
}
exports.clone = clone;
// export function jsonParseOr<K>(s: string, defaultValue: K): K {
//   return parseJSON(s) || defaultValue
// }

},{}],"8PXe":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shorter(text, much = 10) {
    return text.trim().substring(0, Math.min(text.length, much)) + '...';
}
exports.shorter = shorter;

},{}],"5H12":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escapeHtmlAttribute(code) {
    return code.replace(/\"/gmi, '&quot;');
}
exports.escapeHtmlAttribute = escapeHtmlAttribute;
function unEscapeHtmlAttribute(code) {
    return code.replace(/\&quot\;/gmi, '"');
}
exports.unEscapeHtmlAttribute = unEscapeHtmlAttribute;

},{}],"7sk5":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../array");
__export(require("./changeText"));
__export(require("./getPreviousMatchingPos"));
__export(require("./quote"));
__export(require("./json"));
__export(require("./shorter"));
__export(require("./html"));
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i = 1, tabSize = 2) {
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith = ' ') {
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;

},{"../array":"XwTw","./changeText":"9x/c","./getPreviousMatchingPos":"ZdIq","./quote":"4jU9","./json":"Eajz","./shorter":"8PXe","./html":"5H12"}],"SsZz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _unique = 0;
function unique(prefix = '_') {
    return prefix + _unique++;
}
exports.unique = unique;
function objectKeys(o) {
    return Object.keys(o);
}
exports.objectKeys = objectKeys;
function randomIntBetween(a, b) {
    return Math.floor(Math.random() * b) + a;
}
exports.randomIntBetween = randomIntBetween;
function checkThrow(r, msg = 'Throwing on undefined value') {
    if (!r) {
        throw new Error(msg);
    }
    return r;
}
exports.checkThrow = checkThrow;
function tryTo(f) {
    try {
        return f();
    }
    catch (error) {
    }
}
exports.tryTo = tryTo;

},{}],"Q0O7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date, format) {
    if (typeof date === 'string') { // happens when serializing dates to json for testing
        date = new Date(date);
    }
    var dd = date.getDay();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (format === 'YYYY-MM-DD') {
        return yyyy + '-' + mm + '-' + dd;
    }
    else {
        return `${mm}/${dd}/${yyyy}`;
    }
}
exports.formatDate = formatDate;
function formatDateTime(date, format) {
    if (typeof date === 'string') { // happens when serializing dates to json for testing
        date = new Date(date);
    }
    let hh = `${date.getHours()}`.length < 2 ? `0${date.getHours()}` : `${date.getHours()}`;
    let mm = `${date.getMinutes()}`.length < 2 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return `${formatDate(date, 'YYYY-MM-DD')}T${hh}:${mm}`;
}
exports.formatDateTime = formatDateTime;

},{}],"X9nH":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printMs(ms, config = { minutes: false, seconds: true, ms: true }) {
    config = Object.assign({ minutes: false, seconds: true, ms: true }, config);
    const seconds = config.seconds && Math.floor(ms / 1000);
    const minutes = config.minutes && seconds && Math.floor(seconds / 60);
    const milliseconds = config.ms && Math.floor(ms % 1000 || ms);
    return `${minutes ? `${minutes} minutes ` : ''}${seconds ? `${seconds} seconds ` : ''}${milliseconds ? `${milliseconds} milliseconds ` : ''}`;
}
exports.printMs = printMs;

},{}],"dEbF":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
exports.sleep = sleep;
exports.wait = sleep;
function withTime(label, fn) {
    console.time(label);
    const r = fn();
    console.timeEnd(label);
    return r;
}
exports.withTime = withTime;

},{}],"PJyN":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));
__export(require("./time"));

},{"./formatDate":"Q0O7","./printMs":"X9nH","./time":"dEbF"}],"dgX+":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./time"));

},{"./string":"7sk5","./array":"XwTw","./misc":"SsZz","./time":"PJyN"}],"vmAk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");

function isJSXAloneComponent(c) {
  return c.prototype && c.prototype.render;
}

exports.isJSXAloneComponent = isJSXAloneComponent;

function isNode(n) {
  return isTextNodeLike(n) || isElementLike(n);
}

exports.isNode = isNode;

function isElementLike(n) {
  return n && n.setAttribute;
}

exports.isElementLike = isElementLike;

function isTextNodeLike(n) {
  return n && n.content && !isElementLike(n);
}

exports.isTextNodeLike = isTextNodeLike;

var AbstractTextNodeLike =
/** @class */
function () {
  function AbstractTextNodeLike(content) {
    this.content = content;
  }

  return AbstractTextNodeLike;
}();

exports.AbstractTextNodeLike = AbstractTextNodeLike;

var AbstractElementLike =
/** @class */
function () {
  function AbstractElementLike(tag) {
    this.tag = tag;
    this.attrs = {};
    this.children = [];
  }

  AbstractElementLike.prototype.setAttribute = function (name, value) {
    this.attrs[name] = value;
  };

  AbstractElementLike.prototype.appendChild = function (c) {
    this.children.push(c);

    if (isElementLike(c)) {
      c.parentElement = this;
    }
  };

  AbstractElementLike.prototype.findDescendant = function (p) {
    var found;
    this.children.some(function (c) {
      if (isElementLike(c)) {
        if (p(c)) {
          found = c;
        } else {
          found = c.findDescendant(p);
        }
      }

      return !!found;
    });
    return found;
  };

  AbstractElementLike.prototype.findAscendant = function (p) {
    if (this.parentElement) {
      if (p(this.parentElement)) {
        return this.parentElement;
      }

      return this.parentElement.findAscendant(p);
    }
  };

  AbstractElementLike.prototype.getAscendants = function () {
    return this.parentElement ? this.parentElement.getAscendants().concat([this.parentElement]) : [];
  };

  AbstractElementLike.prototype.getRootAscendant = function () {
    var r = this.parentElement ? this.findAscendant(function (n) {
      return isElementLike(n) && !n.parentElement;
    }) : this;
    return misc_utils_of_mine_generic_1.checkThrow(r, 'No root ascendant found in element like tree!');
  };

  AbstractElementLike.prototype.getSiblings = function () {
    var _this = this;

    if (this.parentElement) {
      return this.parentElement.children.filter(function (c) {
        return c !== _this;
      });
    }

    return [];
  };

  AbstractElementLike.prototype.findSibling = function (p) {
    return this.getSiblings().find(p);
  };

  AbstractElementLike.prototype.find = function (p) {
    // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
    return this.getRootAscendant().findDescendant(p);
  };

  return AbstractElementLike;
}();

exports.AbstractElementLike = AbstractElementLike;
},{"misc-utils-of-mine-generic":"dgX+"}],"0Bvz":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");
/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */


var ElementClass =
/** @class */
function () {
  function ElementClass(props) {
    this.props = props;
  }

  ElementClass.prototype.childrenAsArray = function () {
    return Array.isArray(this.props.children) ? this.props.children : [this.props.children];
  };

  ElementClass.prototype.childrenElementsAsArray = function () {
    return this.childrenAsArray().filter(function (c) {
      return elementImpl_1.isElementLike(c);
    });
  };

  ElementClass.prototype.firstChildElement = function () {
    return this.childrenAsArray().find(function (e) {
      return true;
    });
  };

  return ElementClass;
}();

exports.ElementClass = ElementClass;

var AbstractElementClass =
/** @class */
function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{"./elementImpl":"vmAk"}],"fbNL":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");

var throwOnUnrecognized = false;

function debug(err) {
  if (throwOnUnrecognized) {
    throw err;
  } else {
    console.error(err);
  }
}

exports.debug = debug;

function createCreateElement(impl, textNodeImpl) {
  return function createElement(tag, attrs) {
    if (attrs === void 0) {
      attrs = {};
    }

    var children = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }

    var element;

    if (typeof tag === 'string') {
      element = new impl(tag);
    } else {
      if (elementImpl_1.isJSXAloneComponent(tag)) {
        element = new tag(__assign({}, attrs, {
          children: children
        })).render();
      } else {
        element = tag(__assign({}, attrs, {
          children: children
        }));
      }

      attrs = {};
    }

    for (var name_1 in attrs) {
      if (name_1 && attrs.hasOwnProperty(name_1)) {
        var value = attrs[name_1];

        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name_1, name_1);
          }
        } else if (typeof value === 'function') {
          var code = "_this = __this__ = this; (" + value.toString() + ").apply(_this, arguments)";
          var escaped = code.replace(/\"/gim, '&quot;');
          element.setAttribute(name_1, escaped);
        } else if (value !== false && value != null) {
          if (name_1 === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value);
            } else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '));
            } else {
              debug("unrecognized className value " + _typeof(value) + " " + value);
            }
          } else {
            element.setAttribute(name_1, value.toString());
          }
        } else if (_typeof(value) === 'object') {
          if (name_1 === 'style') {
            element.setAttribute('style', "" + Object.keys(value).map(function (p) {
              return p + ": " + value[p];
            }).join('; '));
          } else if (name_1 === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html);
          } else {
            debug("unrecognized object attribute \"" + name_1 + "\" - the only object attribute supported is \"style\"");
          }
        } else {
          debug("unrecognized attribute \"" + name_1 + "\" with type " + _typeof(value));
        }
      }
    }

    if (typeof tag === 'string') {
      // don't render children for function or classes since they are responsible of render their own children
      children.filter(function (c) {
        return c;
      }).forEach(function (child) {
        if (elementImpl_1.isNode(child)) {
          element.appendChild(child);
        } else if (Array.isArray(child)) {
          child.forEach(function (c) {
            if (typeof c === 'string') {
              element.appendChild(new textNodeImpl(c));
            } else if (elementImpl_1.isNode(c)) {
              element.appendChild(c);
            } else {
              debug("Child is not a node or string: " + c + " , tag: " + tag);
            }
          });
        } else {
          element.appendChild(new textNodeImpl(child));
        }
      });
    }

    return element;
  };
}

exports.createCreateElement = createCreateElement;
exports.AbstractJSXAlone = null; // export {AbstractJSXAlone as JSXAlone}
},{"./elementImpl":"vmAk"}],"k98/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // import { AbstractJSXAlone as  } from './createElement';

var _1 = require("."); // export type Props = { children: Children }
// TODO: like React.Fragment


exports.Fragment = function (props) {
  return _1.AbstractJSXAlone.createElement("span", null, props.children);
};

function Js(props) {
  var r = props.children();
  console.log(r);
  return r ? _1.AbstractJSXAlone.createElement(exports.Fragment, null, r) : null;
}

exports.Js = Js;
/** if as statement. children need to be in a function and the function accepts a parameter which value is given condition `c` but casted to NotFalsy<C> so there's no need of type guards in the body. Example:
```
<If c={type}>{type =>
  <select multiple={true}>{names[type].map(c =>
      <option value={c.id}>{c.label}</option>)}
  </select>
</If>
```

No error thrown on second line because parameter type is not falsy but keep the original type (excluding falsy values)

Other example:

```
export class ErrorComponent extends React.Component<ErrorOptions> {
  public render() {
    return <div>
      <If c={this.props.error}>{error =>
        <React.Fragment>
          <h2>Error</h2>
          <If c={typeof error === 'string'}>{e =>
            <h3>{e}</h3>}
          </If>
          <If c={typeof error === 'object'}>{e =>
            <React.Fragment>
              <h5>{error!.name}</h5>
              <p>{error!.message}</p>
              <If c={error.stack}>{e =>
                <ul>
                  {e.split('\n').map(e =>
                    <li>{e}</li>)}
                </ul>}
              </If>
            </React.Fragment>}
          </If>
          <If c={this.props.responseText}>{responseText =>
            <iframe css={{ border: 0, width: '100%', height: '400px' }} srcDoc={responseText}>
            </iframe>}
          </If>
        </React.Fragment>}
      </If>
    </div>
  }
}

```
*/

function If(props) {
  //TODO: issue in dom implementation, children is an array 
  var f = Array.isArray(props.children) ? props.children[0] : props.children;
  var c = props.c,
      p = props.p;
  if (isNotFalsy(c)) return f.apply(null, (p ? [p] : []).concat([c]));else {
    return null;
  }
}

exports.If = If;

function isNotFalsy(a) {
  return !!a;
}
},{".":"BB47"}],"BB47":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./elementImpl"));

__export(require("./elementClass"));

__export(require("./createElement"));

var elementImpl_1 = require("./elementImpl");

exports.AbstractTextNodeLike = elementImpl_1.AbstractTextNodeLike;
exports.AbstractElementLike = elementImpl_1.AbstractElementLike;

__export(require("./misc"));
},{"./elementImpl":"vmAk","./elementClass":"0Bvz","./createElement":"fbNL","./misc":"k98/"}],"gNvY":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var ElementLikeImpl = /** @class */ (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private _element: HTMLElement | undefined
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        // const el = this._getElement()
        var el = document.createElement(this.tag);
        Object.keys(this.attrs).forEach(function (attribute) {
            el.setAttribute(attribute, _this.attrs[attribute]);
        });
        if (this._innerHtml) {
            el.innerHTML = this._innerHtml;
        }
        this.children.forEach(function (c) {
            c.render(__assign({}, config, { parent: el }));
        });
        if (config.parent) {
            config.parent.appendChild(el);
        }
        return el;
    };
    // private _getElement(): HTMLElement {
    //   if (!this._element) {
    //     this._element = document.createElement(this.tag)
    //   }
    //   return this._element
    // }
    ElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this._innerHtml = s;
    };
    return ElementLikeImpl;
}(jsx_alone_core_1.AbstractElementLike));
exports.ElementLikeImpl = ElementLikeImpl;
var TextNodeLikeImpl = /** @class */ (function (_super) {
    __extends(TextNodeLikeImpl, _super);
    function TextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private _node: Text | undefined
    TextNodeLikeImpl.prototype.render = function (config) {
        if (config === void 0) { config = {}; }
        // const n = this._getNode()
        var text = document.createTextNode(this.content);
        if (config.parent) {
            config.parent.appendChild(text);
        }
        return text;
    };
    return TextNodeLikeImpl;
}(jsx_alone_core_1.AbstractTextNodeLike));
exports.TextNodeLikeImpl = TextNodeLikeImpl;
var ElementClass = /** @class */ (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;

},{"jsx-alone-core":"BB47"}],"S0OW":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var elementImpl_1 = require("./elementImpl");
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(elementImpl_1.ElementLikeImpl, elementImpl_1.TextNodeLikeImpl),
    render: function (el, config) {
        return el.render(config);
    }
};
exports.JSXAlone = Module;
// //@ts-ignore
// JSXAlone = Module // creates a global variable needed so emitted .js calls work. See tsconfig.json `"jsxFactory": "JSXAlone.createElement",`

},{"jsx-alone-core":"BB47","./elementImpl":"gNvY"}],"MNUJ":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./createElement"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":"S0OW","./elementImpl":"gNvY"}],"wdqJ":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_alone_dom_1 = require("jsx-alone-dom"); // example function element


var TaskPageLink = function TaskPageLink(props) {
  return jsx_alone_dom_1.JSXAlone.createElement("a", {
    href: "pages/tasks/" + props.task + "_small.html"
  }, props.children);
}; // example class element that renders given information and uses previous TaskPageLink element


var App =
/** @class */
function (_super) {
  __extends(App, _super);

  function App() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  App.prototype.render = function () {
    return jsx_alone_dom_1.JSXAlone.createElement("article", null, jsx_alone_dom_1.JSXAlone.createElement("h3", null, "Welcome ", this.props.name, "!"), jsx_alone_dom_1.JSXAlone.createElement("p", null, "These are your tasks:"), jsx_alone_dom_1.JSXAlone.createElement("ul", null, this.props.tasks.map(function (task) {
      return jsx_alone_dom_1.JSXAlone.createElement("li", null, jsx_alone_dom_1.JSXAlone.createElement(TaskPageLink, {
        task: task
      }, task));
    })));
  };

  return App;
}(jsx_alone_dom_1.ElementClass); // render the App and append the generated element to body


var app = jsx_alone_dom_1.JSXAlone.createElement(App, {
  name: "John Doe",
  tasks: ['Wash dishes', 'Go outside', 'Play soccer']
});
var el = jsx_alone_dom_1.JSXAlone.render(app);
document.body.appendChild(el);
},{"jsx-alone-dom":"MNUJ"}]},{},["wdqJ"], null)
//# sourceMappingURL=main.186cb047.map