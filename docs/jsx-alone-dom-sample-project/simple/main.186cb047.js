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
})({"vmAk":[function(require,module,exports) {
;

function isElementClassConstructor(c) {
  return c.prototype && c.prototype.render;
}

exports.isElementClassConstructor = isElementClassConstructor;

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

var AbstractTextNodeLike = function () {
  function AbstractTextNodeLike(content) {
    this.content = content;
  }

  return AbstractTextNodeLike;
}();

exports.AbstractTextNodeLike = AbstractTextNodeLike;

var AbstractElementLike = function () {
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

  return AbstractElementLike;
}();

exports.AbstractElementLike = AbstractElementLike;
},{}],"0Bvz":[function(require,module,exports) {
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

;

var ElementClass = function () {
  function ElementClass(props) {
    this.props = props;
  }

  return ElementClass;
}();

exports.ElementClass = ElementClass;

var AbstractElementClass = function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{}],"fbNL":[function(require,module,exports) {
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

;

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

function createCreateElement(config) {
  var impl = config.impl,
      textNodeImpl = config.textNodeImpl,
      onElementReady = config.onElementReady,
      onElementCreate = config.onElementCreated;

  var createElement = function createElement(tag, attrs) {
    if (attrs === void 0) {
      attrs = {};
    }

    var children = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }

    attrs = attrs || {};
    var element;
    var elementClassInstance;
    var tagIsString = typeof tag === 'string';

    if (tagIsString) {
      element = new impl(tag);
    } else if (elementImpl_1.isElementClassConstructor(tag)) {
      elementClassInstance = new tag(__assign({}, attrs, {
        children: children
      }));
      element = elementClassInstance.render();
    } else {
      element = tag(__assign({}, attrs, {
        children: children
      }));
    }

    if (onElementCreate) {
      onElementCreate({
        elementLike: element,
        elementClassInstance: elementClassInstance,
        attrs: attrs
      });
    }

    attrs = tagIsString ? attrs : {};
    Object.keys(attrs).forEach(function (name) {
      var value = attrs[name];

      var type = _typeof(value);

      if (type === 'string' || type === 'number') {
        element.setAttribute(name, value);
      } else if (type === 'function') {
        element.setAttribute(name, value);
      } else if (value === false) {} else if (value === true) {
        element.setAttribute(name, name);
      } else if (name === 'dangerouslySetInnerHTML' && value) {
        element.dangerouslySetInnerHTML(value.__html);
      } else {
        element.setAttribute(name, value);
      }
    });

    if (tagIsString) {
      children.filter(function (c) {
        return c;
      }).forEach(function (child) {
        if (elementImpl_1.isNode(child)) {
          element.appendChild(child);
        } else if (Array.isArray(child)) {
          child.forEach(function (c) {
            if (elementImpl_1.isNode(c)) {
              element.appendChild(c);
            } else {
              element.appendChild(new textNodeImpl(c));
            }
          });
        } else {
          element.appendChild(new textNodeImpl(child));
        }
      });
    }

    if (onElementReady) {
      onElementReady({
        elementLike: element
      });
    }

    return element;
  };

  return createElement;
}

exports.createCreateElement = createCreateElement;
exports.AbstractJSXAlone = null;
},{"./elementImpl":"vmAk"}],"k98/":[function(require,module,exports) {
var global = arguments[3];
;

var _1 = require(".");

exports.Fragment = function (props) {
  return _1.AbstractJSXAlone.createElement("span", null, props.children);
};

function Js(props) {
  var r = props.children();
  console.log(r);
  return r ? _1.AbstractJSXAlone.createElement(exports.Fragment, null, r) : null;
}

exports.Js = Js;

function If(props) {
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

function getGlobal() {
  return typeof window === 'undefined' && typeof document === 'undefined' ? global : window;
}

exports.getGlobal = getGlobal;

function installJSXAloneAsGlobal(i) {
  getGlobal()['JSXAlone'] = i;
}

exports.installJSXAloneAsGlobal = installJSXAloneAsGlobal;
},{".":"BB47"}],"gOGk":[function(require,module,exports) {
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

;

function checkThrow(r, msg) {
  if (msg === void 0) {
    msg = 'Throwing on undefined value';
  }

  if (!r) {
    throw new Error(msg);
  }

  return r;
}

exports.checkThrow = checkThrow;

function array(n, sample) {
  var a = [];

  for (var i = 0; i < n; i++) {
    a.push(typeof sample === 'undefined' ? i : sample);
  }

  return a;
}

exports.array = array;

function repeat(n, s) {
  return array(n, s).join('');
}

exports.repeat = repeat;

function indent(i, tabSize) {
  if (i === void 0) {
    i = 1;
  }

  if (tabSize === void 0) {
    tabSize = 2;
  }

  return repeat(i * tabSize, ' ');
}

exports.indent = indent;

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

exports.getPosition = getPosition;

function removeWhites(s, replaceWith) {
  if (replaceWith === void 0) {
    replaceWith = ' ';
  }

  return s.replace(/\s+/gm, replaceWith).trim();
}

exports.removeWhites = removeWhites;

function randomIntBetween(a, b) {
  return Math.floor(Math.random() * b) + a;
}

exports.randomIntBetween = randomIntBetween;

function randomItem(array) {
  return array[randomIntBetween(0, array.length)];
}

exports.randomItem = randomItem;

function printMs(ms, config) {
  if (config === void 0) {
    config = {
      minutes: false,
      seconds: true,
      ms: true
    };
  }

  config = __assign({
    minutes: false,
    seconds: true,
    ms: true
  }, config);
  var seconds = config.seconds && Math.floor(ms / 1000);
  var minutes = config.minutes && seconds && Math.floor(seconds / 60);
  var milliseconds = config.ms && Math.floor(ms % 1000 || ms);
  return "" + (minutes ? minutes + " minutes " : '') + (seconds ? seconds + " seconds " : '') + (milliseconds ? milliseconds + " ms " : '');
}

exports.printMs = printMs;

function printStyleHtmlAttribute(value) {
  return "" + Object.keys(value).map(function (p) {
    return p + ": " + value[p];
  }).join('; ');
}

exports.printStyleHtmlAttribute = printStyleHtmlAttribute;
var _unique = 0;

function unique(prefix) {
  if (prefix === void 0) {
    prefix = '_';
  }

  return prefix + _unique++;
}

exports.unique = unique;
},{}],"Grpd":[function(require,module,exports) {
;

var _1 = require(".");

exports.Style = function (props) {
  function indent(n) {
    return props.renderConfig && props.renderConfig.indent ? _1.indent(n) : '';
  }

  function fixProperty(s) {
    var t;

    while (t = /([A-Z])/.exec(s)) {
      s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
    }

    return s;
  }

  return JSXAlone.createElement("style", null, Object.keys(props.classes).map(function (c) {
    return indent(1) + "." + c + (props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '') + " {" + Object.keys(props.classes[c]).filter(function (p) {
      return p !== 'selectorPostfix';
    }).map(function (p) {
      return "\n" + indent(2) + fixProperty(p) + ": " + props.classes[c][p] + ";";
    }).join("") + "\n}";
  }).join('\n'));
};

function Styles(styles) {
  var classes = {};
  Object.keys(styles).forEach(function (k) {
    classes[k] = k;
  });
  return {
    styles: styles,
    classes: classes
  };
}

exports.Styles = Styles;
},{".":"BB47"}],"WOpK":[function(require,module,exports) {
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

;

var _1 = require("./");

var createElement_1 = require("./createElement");

var elementClass_1 = require("./elementClass");

var JsonImplElementLikeImpl = function (_super) {
  __extends(JsonImplElementLikeImpl, _super);

  function JsonImplElementLikeImpl() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  JsonImplElementLikeImpl.prototype.render = function (config) {
    if (config === void 0) {
      config = {};
    }

    return {
      tag: this.tag,
      innerHtml: this.innerHtml,
      attrs: this.attrs,
      children: this.children.map(function (c) {
        return __assign({}, c, {
          parentElement: undefined
        });
      })
    };
  };

  JsonImplElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
    this.innerHtml = s;
  };

  return JsonImplElementLikeImpl;
}(_1.AbstractElementLike);

exports.JsonImplElementLikeImpl = JsonImplElementLikeImpl;

var JsonImplTextNodeLikeImpl = function (_super) {
  __extends(JsonImplTextNodeLikeImpl, _super);

  function JsonImplTextNodeLikeImpl() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  JsonImplTextNodeLikeImpl.prototype.render = function (config) {
    return {
      content: this.content
    };
  };

  return JsonImplTextNodeLikeImpl;
}(_1.AbstractTextNodeLike);

exports.JsonImplTextNodeLikeImpl = JsonImplTextNodeLikeImpl;

var JsonImplElementClass = function (_super) {
  __extends(JsonImplElementClass, _super);

  function JsonImplElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return JsonImplElementClass;
}(elementClass_1.AbstractElementClass);

exports.JsonImplElementClass = JsonImplElementClass;
exports.JSXAloneJsonImpl = {
  createElement: createElement_1.createCreateElement({
    impl: JsonImplElementLikeImpl,
    textNodeImpl: JsonImplTextNodeLikeImpl
  }),
  render: function render(el, config) {
    if (config === void 0) {
      config = {};
    }

    return el.render(config);
  }
};
},{"./":"BB47","./createElement":"fbNL","./elementClass":"0Bvz"}],"BB47":[function(require,module,exports) {
function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

;

__export(require("./elementImpl"));

__export(require("./elementClass"));

__export(require("./createElement"));

var elementImpl_1 = require("./elementImpl");

exports.AbstractTextNodeLike = elementImpl_1.AbstractTextNodeLike;
exports.AbstractElementLike = elementImpl_1.AbstractElementLike;

__export(require("./misc"));

__export(require("./util"));

__export(require("./style"));

__export(require("./JsonImpl"));
},{"./elementImpl":"vmAk","./elementClass":"0Bvz","./createElement":"fbNL","./misc":"k98/","./util":"gOGk","./style":"Grpd","./JsonImpl":"WOpK"}],"uJT8":[function(require,module,exports) {
;
var jsx_alone_core_1 = require("jsx-alone-core");
var RefObjectImpl = (function () {
    function RefObjectImpl() {
        this._current = null;
    }
    Object.defineProperty(RefObjectImpl.prototype, "current", {
        get: function () {
            return typeof this._current === 'string' ? getMarkedElement(this._current) : this._current;
        },
        enumerable: true,
        configurable: true
    });
    return RefObjectImpl;
}());
exports.RefObjectImpl = RefObjectImpl;
function setRef(_a) {
    var el = _a.el, value = _a.value, elementLike = _a.elementLike;
    value._current = elementLike._elementClassInstance || markElement(el);
}
exports.setRef = setRef;
function markElement(e, label) {
    if (label === void 0) { label = '_jsxa_'; }
    var key = e.getAttribute("data-" + label);
    if (!key) {
        key = jsx_alone_core_1.unique(label);
        e.setAttribute("data-" + label, key);
    }
    return key;
}
exports.markElement = markElement;
function getElementMark(e, label) {
    if (label === void 0) { label = '_jsxa_'; }
    return e.getAttribute("data-" + label);
}
exports.getElementMark = getElementMark;
function getMarkedElement(key, parent, label) {
    if (parent === void 0) { parent = document; }
    if (label === void 0) { label = '_jsxa_'; }
    return parent.querySelector("[data-" + label + "=\"" + key + "\"]");
}
exports.getMarkedElement = getMarkedElement;

},{"jsx-alone-core":"BB47"}],"gNvY":[function(require,module,exports) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
;
var jsx_alone_core_1 = require("jsx-alone-core");
var Refs_1 = require("./Refs");
var ElementLikeImpl = (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        var el = isSvgTag(this.tag)
            ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
            : document.createElement(this.tag);
        Object.keys(this.attrs).forEach(function (attribute) {
            var value = _this.attrs[attribute];
            if (attribute === 'className') {
                el.setAttribute('class', value);
            }
            else if (attribute === 'style') {
                el.setAttribute('style', jsx_alone_core_1.printStyleHtmlAttribute(value));
            }
            else if (typeof value === 'function') {
                el.addEventListener(attribute.replace(/^on/, '').toLowerCase(), value.bind(_this));
            }
            else {
                el.setAttribute(attribute, value);
            }
        });
        if (this._innerHtml) {
            el.innerHTML = this._innerHtml;
        }
        else {
            this.children.forEach(function (c) {
                c.render(__assign({}, config, { parent: el }));
            });
        }
        if (config.parent) {
            config.parent.appendChild(el);
        }
        var elementClassWithContainer = this._elementClassInstance || config.rootElementLike._elementClassInstance;
        if (this.ref) {
            Refs_1.setRef({ elementLike: this, el: el, value: this.ref });
        }
        if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
            elementClassWithContainer.setContainerEl(el);
        }
        return el;
    };
    ElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this._innerHtml = s;
    };
    return ElementLikeImpl;
}(jsx_alone_core_1.AbstractElementLike));
exports.ElementLikeImpl = ElementLikeImpl;
var TextNodeLikeImpl = (function (_super) {
    __extends(TextNodeLikeImpl, _super);
    function TextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextNodeLikeImpl.prototype.render = function (config) {
        var text = document.createTextNode(this.content);
        if (config.parent) {
            config.parent.appendChild(text);
        }
        return text;
    };
    return TextNodeLikeImpl;
}(jsx_alone_core_1.AbstractTextNodeLike));
exports.TextNodeLikeImpl = TextNodeLikeImpl;
var ElementClass = (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementClass.prototype.setContainerEl = function (el) {
        this.containerEl = el;
    };
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;
function isSvgTag(t) {
    var r = new RegExp("^" + t + "$", 'i');
    return SvgTags.some(function (name) { return r.test(name); });
}
var SvgTags = ['path', 'svg', 'use', 'g'];

},{"jsx-alone-core":"BB47","./Refs":"uJT8"}],"S0OW":[function(require,module,exports) {
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
;
var jsx_alone_core_1 = require("jsx-alone-core");
var _1 = require(".");
var Refs_1 = require("./Refs");
function buildJSXALone() {
    var Module = {
        createElement: jsx_alone_core_1.createCreateElement(getCreateCreateElementConfig()),
        render: function (el, config) {
            return el.render(__assign({}, config, { rootElementLike: el }));
        },
        createRef: function () {
            return new Refs_1.RefObjectImpl();
        }
    };
    return Module;
}
var createCreateElementConfig;
function getCreateCreateElementConfig() {
    if (!createCreateElementConfig) {
        createCreateElementConfig = {
            impl: _1.ElementLikeImpl,
            textNodeImpl: _1.TextNodeLikeImpl,
            onElementCreated: function (_a) {
                var elementLike = _a.elementLike, elementClassInstance = _a.elementClassInstance, attrs = _a.attrs;
                if (elementClassInstance) {
                    elementLike._elementClassInstance = elementClassInstance;
                }
                elementLike.ref = attrs.ref;
            },
        };
    }
    return createCreateElementConfig;
}
exports.getCreateCreateElementConfig = getCreateCreateElementConfig;
exports.JSXAlone = buildJSXALone();

},{"jsx-alone-core":"BB47",".":"MNUJ","./Refs":"uJT8"}],"MNUJ":[function(require,module,exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./elementImpl"));
__export(require("./createElement"));

},{"./elementImpl":"gNvY","./createElement":"S0OW"}],"wdqJ":[function(require,module,exports) {
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

exports.__esModule = true;

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
    var _this = this;

    return jsx_alone_dom_1.JSXAlone.createElement("article", null, jsx_alone_dom_1.JSXAlone.createElement("h3", null, "Welcome ", this.props.name, "!"), jsx_alone_dom_1.JSXAlone.createElement("p", null, "These are your tasks:"), jsx_alone_dom_1.JSXAlone.createElement("ul", null, this.props.tasks.map(function (task) {
      return jsx_alone_dom_1.JSXAlone.createElement("li", null, jsx_alone_dom_1.JSXAlone.createElement(TaskPageLink, {
        task: task
      }, task));
    })), jsx_alone_dom_1.JSXAlone.createElement("h2", null, "Tests with event handlers"), jsx_alone_dom_1.JSXAlone.createElement("p", null, "Accessing HTMLElement using `this` dont' work because this has the correct context:", jsx_alone_dom_1.JSXAlone.createElement("button", {
      onClick: function onClick(e) {
        return alert(_this.tagName + " text is " + _this.textContent);
      }
    }, "should work")), jsx_alone_dom_1.JSXAlone.createElement("p", null, "Accessing event argument works::", jsx_alone_dom_1.JSXAlone.createElement("button", {
      onClick: function onClick(e) {
        return alert(e.currentTarget.tagName + " text is " + e.currentTarget.textContent);
      }
    }, "should work")), jsx_alone_dom_1.JSXAlone.createElement("p", null, "Accessing variables in scope works:", jsx_alone_dom_1.JSXAlone.createElement("button", {
      onClick: function onClick(e) {
        return alert(dummy('So '));
      }
    }, "don't work")), jsx_alone_dom_1.JSXAlone.createElement("p", null, "Accessing members (this.) works: ", jsx_alone_dom_1.JSXAlone.createElement("button", {
      onClick: function onClick(e) {
        return alert(_this.dummy('So '));
      }
    }, "method")), jsx_alone_dom_1.JSXAlone.createElement("h2", null, "Tests with SVG"), jsx_alone_dom_1.JSXAlone.createElement("svg", {
      viewBox: "0 0 141 41",
      width: "500px",
      height: "300px"
    }, jsx_alone_dom_1.JSXAlone.createElement("text", {
      fill: "green"
    }, "hello world"), jsx_alone_dom_1.JSXAlone.createElement("path", {
      d: "M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z",
      transform: "translate(-241.74 -380.43)",
      style: {
        fill: '#ffcd05'
      }
    })));
  };

  App.prototype.dummy = function (n) {
    return n + '_dummy';
  };

  return App;
}(jsx_alone_dom_1.ElementClass);

function dummy(n) {
  return n + '_dummy';
} // render the App and append the generated element to body


var app = jsx_alone_dom_1.JSXAlone.createElement(App, {
  name: "John Doe",
  tasks: ['Wash dishes', 'Go outside', 'Play soccer']
});
var el = jsx_alone_dom_1.JSXAlone.render(app);
document.body.appendChild(el);
},{"jsx-alone-dom":"MNUJ"}]},{},["wdqJ"], null)
//# sourceMappingURL=main.186cb047.map