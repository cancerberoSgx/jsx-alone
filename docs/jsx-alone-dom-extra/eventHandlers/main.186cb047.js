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
})({"Urqt":[function(require,module,exports) {
;

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
},{}],"qWxh":[function(require,module,exports) {
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

var elementImpl_1 = require("./elementImpl");

var ElementClass = function () {
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

var AbstractElementClass = function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{"./elementImpl":"Urqt"}],"Nzec":[function(require,module,exports) {
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

    var element;
    var elementClassInstance;

    if (typeof tag === 'string') {
      element = new impl(tag);
    } else {
      if (elementImpl_1.isJSXAloneComponent(tag)) {
        elementClassInstance = new tag(__assign({}, attrs, {
          children: children
        }));
        element = elementClassInstance.render();
      } else {
        if (_typeof(tag.prototype) !== undefined && config.evaluateFunctionsWithNew) {
          element = new tag(__assign({}, attrs, {
            children: children
          }));
        } else {
          element = tag(__assign({}, attrs, {
            children: children
          }));
        }
      }

      attrs = {};
    }

    if (onElementCreate) {
      onElementCreate({
        elementLike: element,
        elementClassInstance: elementClassInstance
      });
    }

    Object.keys(attrs || {}).forEach(function (name) {
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

    if (typeof tag === 'string') {
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
},{"./elementImpl":"Urqt"}],"h+Y6":[function(require,module,exports) {
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
},{".":"6FnY"}],"dHmX":[function(require,module,exports) {
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
},{}],"6FnY":[function(require,module,exports) {
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
},{"./elementImpl":"Urqt","./elementClass":"qWxh","./createElement":"Nzec","./misc":"h+Y6","./util":"dHmX"}],"0Bvz":[function(require,module,exports) {
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

var elementImpl_1 = require("./elementImpl");

var ElementClass = function () {
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

var AbstractElementClass = function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{"./elementImpl":"Urqt"}],"fbNL":[function(require,module,exports) {
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

    var element;
    var elementClassInstance;

    if (typeof tag === 'string') {
      element = new impl(tag);
    } else {
      if (elementImpl_1.isJSXAloneComponent(tag)) {
        elementClassInstance = new tag(__assign({}, attrs, {
          children: children
        }));
        element = elementClassInstance.render();
      } else {
        if (_typeof(tag.prototype) !== undefined && config.evaluateFunctionsWithNew) {
          element = new tag(__assign({}, attrs, {
            children: children
          }));
        } else {
          element = tag(__assign({}, attrs, {
            children: children
          }));
        }
      }

      attrs = {};
    }

    if (onElementCreate) {
      onElementCreate({
        elementLike: element,
        elementClassInstance: elementClassInstance
      });
    }

    Object.keys(attrs || {}).forEach(function (name) {
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

    if (typeof tag === 'string') {
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
},{"./elementImpl":"Urqt"}],"k98/":[function(require,module,exports) {
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
},{".":"BB47"}],"BB47":[function(require,module,exports) {
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
},{"./elementImpl":"Urqt","./elementClass":"0Bvz","./createElement":"fbNL","./misc":"k98/","./util":"dHmX"}],"gNvY":[function(require,module,exports) {
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
var ElementLikeImpl = (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var el = isSvgTag(this.tag)
            ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
            : document.createElement(this.tag);
        Object.keys(this.attrs).forEach(function (attribute) {
            var value = _this.attrs[attribute];
            if (!config.handleAttribute || !config.handleAttribute({ config: config, el: el, attribute: attribute, value: value, elementLike: _this })) {
                if (attribute === 'className') {
                    el.setAttribute('class', value);
                }
                else if (attribute === 'style') {
                    el.setAttribute('class', jsx_alone_core_1.printStyleHtmlAttribute(value));
                }
                else if (typeof value === 'function') {
                    el.addEventListener(attribute.replace(/^on/, '').toLowerCase(), value.bind(_this));
                }
                else {
                    el.setAttribute(attribute, value);
                }
            }
        });
        if (this._innerHtml) {
            el.innerHTML = this._innerHtml;
        }
        else {
            this.children.forEach(function (c) {
                if (!config.handleChildRender || !config.handleChildRender({ config: config, parent: el, child: c, elementLike: _this })) {
                    c.render(__assign({}, config, { parent: el }));
                }
            });
        }
        if (config.parent) {
            config.parent.appendChild(el);
        }
        if (config.handleAfterRender) {
            config.handleAfterRender({ config: config, el: el, elementLike: this });
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
        if (config === void 0) { config = {}; }
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
    ElementClass.prototype.setContainerEl = function (el) { };
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;
function isSvgTag(t) {
    var r = new RegExp("^" + t + "$", 'i');
    return SvgTags.some(function (name) { return r.test(name); });
}
var SvgTags = ['path', 'svg', 'use', 'g'];

},{"jsx-alone-core":"BB47"}],"S0OW":[function(require,module,exports) {
;
var jsx_alone_core_1 = require("jsx-alone-core");
var elementImpl_1 = require("./elementImpl");
exports.createCreateElementConfig = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl,
};
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(exports.createCreateElementConfig),
    render: function (el, config) {
        if (config === void 0) { config = {}; }
        return el.render(config);
    }
};
exports.JSXAlone = Module;

},{"jsx-alone-core":"BB47","./elementImpl":"gNvY"}],"MNUJ":[function(require,module,exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./createElement"));
__export(require("./elementImpl"));

},{"./createElement":"S0OW","./elementImpl":"gNvY"}],"kwGG":[function(require,module,exports) {
"use strict";

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

exports.__esModule = true;

var jsx_alone_core_1 = require("jsx-alone-core");

var jsx_alone_dom_1 = require("jsx-alone-dom");

exports.ElementClass = jsx_alone_dom_1.ElementClass;
var warn1Once = false;

function buildExtraConfig(rootElementLike, extraConfig) {
  var configHooks = {
    handleAttribute: function handleAttribute(_a) {
      var value = _a.value,
          el = _a.el,
          attribute = _a.attribute,
          elementLike = _a.elementLike;

      if (typeof value === 'function' && !extraConfig.dontAddEventListeners) {
        if (!warn1Once && typeof value.prototype !== 'undefined') {
          console.warn('Warning, function attributes in a function are partially supported, `this` won\'t be available.\n Better use an arrow function!');
          warn1Once = true; // do this better with a helper
        }

        var functionAttributeContext = getFunctionAttributeContextObjects(elementLike, extraConfig.initialContext).functionAttributeContext;
        var listener = functionAttributeContext ? value.bind(functionAttributeContext) : value;
        var eventType = attribute.substring(2, attribute.length).toLowerCase();
        var options = undefined;
        el.addEventListener(eventType, listener, options);
        elementLike.attrs[attribute] = undefined; // forget the reference

        return true;
      }

      return false;
    },
    handleChildRender: function handleChildRender(config) {
      var child = config.child,
          parent = config.parent,
          elementLike = config.elementLike;

      var _a = getFunctionAttributeContextObjects(elementLike, extraConfig.initialContext),
          functionAttributeContext = _a.functionAttributeContext,
          elementClassInstance = _a.elementClassInstance;

      if (functionAttributeContext && isFunctionAttributeElement(child)) {
        child._originalElementClassInstance = child._elementClassInstance;
        child._elementClassInstance = elementClassInstance || child._elementClassInstance;
      }

      child.render(__assign({}, config, configHooks, {
        parent: parent
      }));
      return true;
    },
    handleAfterRender: function handleAfterRender(_a) {
      var el = _a.el,
          elementLike = _a.elementLike;
      var elementClassWithContainer = elementLike._originalElementClassInstance || elementLike._elementClassInstance || rootElementLike._elementClassInstance;

      if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
        elementClassWithContainer.setContainerEl(el);
      }

      elementLike._elementClassInstance = undefined; // forget the reference

      elementLike._originalElementClassInstance = undefined; // forget the reference

      return true;
    }
  };
  return configHooks;

  function getFunctionAttributeContextObjects(elementLike, initialContext) {
    var elementClassInstance = elementLike.parentElement && elementLike._elementClassInstance || rootElementLike._elementClassInstance;
    return {
      functionAttributeContext: elementClassInstance || initialContext,
      elementClassInstance: elementClassInstance
    };
  }
}

exports.createCreateConfig = __assign({}, jsx_alone_dom_1.createCreateElementConfig, {
  impl: jsx_alone_dom_1.ElementLikeImpl,
  textNodeImpl: jsx_alone_dom_1.TextNodeLikeImpl,
  evaluateFunctionsWithNew: true,
  onElementCreated: function onElementCreated(_a) {
    var elementLike = _a.elementLike,
        elementClassInstance = _a.elementClassInstance;

    if (elementClassInstance) {
      elementLike._elementClassInstance = elementClassInstance;
    }
  }
});
var Module = {
  createElement: jsx_alone_core_1.createCreateElement(exports.createCreateConfig),
  render: function render(el, config) {
    if (config === void 0) {
      config = {};
    }

    var elementLike = el;
    return elementLike.render(__assign({}, config, buildExtraConfig(elementLike, {
      initialContext: config.initialContext || this
    })));
  }
};
exports.JSXAlone = Module;

function isFunctionAttributeElement(a) {
  return jsx_alone_core_1.isElementLike(a);
}
},{"jsx-alone-core":"6FnY","jsx-alone-dom":"MNUJ"}],"4eCq":[function(require,module,exports) {
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

exports.__esModule = true;

var _1 = require("./");

var StatefulComponent =
/** @class */
function (_super) {
  __extends(StatefulComponent, _super);

  function StatefulComponent(p) {
    var _this = _super.call(this, p) || this;

    _this.state = {};
    _this.containerEl = undefined;
    _this.state = {};
    return _this;
  }
  /** called by ElementLike.render() */


  StatefulComponent.prototype.setContainerEl = function (el) {
    this.containerEl = el;
  };
  /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
   * Notice that descendant elements will be destroyed and */


  StatefulComponent.prototype.setState = function (s) {
    //@ts-ignore
    this.state = __assign({}, this.state, s);
  };

  return StatefulComponent;
}(_1.ElementClass);

exports.StatefulComponent = StatefulComponent;
},{"./":"o2+O"}],"cbxI":[function(require,module,exports) {
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

var _1 = require("./");

var StatefulComponent_1 = require("./StatefulComponent");
/** implement stateful -ness by re-rendering it self agin and agin when the stat changes. Preserves focus.
 * TODO: parent re-render actually resets the children (ISSUE)
 */


var DestructiveDomRenderComponent =
/** @class */
function (_super) {
  __extends(DestructiveDomRenderComponent, _super);

  function DestructiveDomRenderComponent() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
   * Notice that descendant elements will be destroyed and */


  DestructiveDomRenderComponent.prototype.setState = function (s) {
    _super.prototype.setState.call(this, s);

    var activePath;
    var selection = {
      start: 0,
      end: 0
    };

    if (document.activeElement) {
      activePath = getXPathOfElement(document.activeElement);
      selection = {
        start: document.activeElement.selectionStart || 0,
        end: document.activeElement.selectionEnd || 0,
        direction: document.activeElement.selectionDirection || undefined
      };
    }

    var jsx = this.render();

    var el = _1.JSXAlone.render(jsx, {
      initialContext: this
    });

    this.containerEl.parentElement.replaceChild(el, this.containerEl);
    this.containerEl = el;

    if (activePath) {
      var activeEl = getElementByXPath(activePath + '');

      if (activeEl && selection) {
        activeEl.focus();

        if (activeEl.setSelectionRange) {
          activeEl.setSelectionRange(selection.start, selection.end, selection.direction);
        }
      }
    }
  };

  return DestructiveDomRenderComponent;
}(StatefulComponent_1.StatefulComponent);

exports.DestructiveDomRenderComponent = DestructiveDomRenderComponent; //  TODO: move to misc

function getXPathOfElement(el) {
  if (typeof el == 'string') {
    return document.evaluate(el, document, null, 0, null) + '';
  }

  if (!el || el.nodeType != 1) {
    return '';
  }

  if (el.id) return "//*[@id='" + el.id + "']";

  if (el.parentNode) {
    var sames = Array.from(el.parentNode.children).filter(function (x) {
      return x.tagName == el.tagName;
    });
    return getXPathOfElement(el.parentNode) + '/' + (el.tagName || '').toLowerCase() + (sames.length > 1 ? '[' + (sames.indexOf(el) + 1) + ']' : '');
  } else {
    return undefined;
  }
} //  TODO: move to misc


function getElementByXPath(path, predicate) {
  var p = document.evaluate(path, document, null, 0, null);

  if (!predicate) {
    return p.iterateNext();
  }

  try {
    var n = void 0;
    var n2 = void 0;

    while ((n = p.iterateNext()) && !predicate(n)) {
      n2 = n;
    }

    return n2;
  } catch (e) {
    alert('Error: Document tree modified during iteration ' + e);
  }
}
},{"./":"o2+O","./StatefulComponent":"4eCq"}],"o2+O":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

exports.__esModule = true;

__export(require("./createElement"));

__export(require("./StatefulComponent"));

__export(require("./DestructiveDomRenderComponent"));
},{"./createElement":"kwGG","./StatefulComponent":"4eCq","./DestructiveDomRenderComponent":"cbxI"}],"wdqJ":[function(require,module,exports) {
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

var _this = this;

exports.__esModule = true;

var jsx_alone_core_1 = require("jsx-alone-core");

var __1 = require("../..");

var Button =
/** @class */
function (_super) {
  __extends(Button, _super);

  function Button() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Button.prototype.render = function () {
    return __1.JSXAlone.createElement("button", {
      onClick: this.props.onClick
    }, this.props.children);
  };

  return Button;
}(__1.ElementClass);

var Container =
/** @class */
function (_super) {
  __extends(Container, _super);

  function Container() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Container.prototype.render = function () {
    return __1.JSXAlone.createElement("div", null, this.props.children);
  };

  return Container;
}(__1.ElementClass);

var App =
/** @class */
function (_super) {
  __extends(App, _super);

  function App() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  App.prototype.foo = function () {
    return jsx_alone_core_1.printMs(Date.now());
  };

  App.prototype.render = function () {
    var _this = this;

    var foo = 'hello';
    return __1.JSXAlone.createElement("div", null, __1.JSXAlone.createElement(Container, null, __1.JSXAlone.createElement("p", null, "just some tests for function attributes context - most doesn't work because don't use extras, just core dom implementation", __1.JSXAlone.createElement("button", {
      onClick: function onClick(e) {
        console.log(_this, _this.props.name, _this.foo(), foo); // debugger
      }
    }, "Render!"), __1.JSXAlone.createElement(Container, null, __1.JSXAlone.createElement("button", {
      onClick: function onClick(e) {
        console.log(_this, _this.props.name, _this.foo(), foo); // debugger
      }
    }, "sss!")), __1.JSXAlone.createElement(Button, {
      onClick: function onClick(e) {
        console.log(_this, _this.props.name, _this.foo(), foo); // debugger
      }
    }, "second"))));
  };

  return App;
}(__1.ElementClass);

var bar = 'bar'; // render the App and append the generated element to body

var app = __1.JSXAlone.createElement("div", null, __1.JSXAlone.createElement("button", {
  onClick: function onClick(e) {
    //@ts-ignore
    console.log(_this, jsx_alone_core_1.printMs(Date.now()), bar);
  }
}, "no root element class2"), __1.JSXAlone.createElement(Container, null, __1.JSXAlone.createElement("button", {
  onClick: function onClick(e) {
    //@ts-ignore
    console.log(_this, jsx_alone_core_1.printMs(Date.now()), bar);
  }
}, "should not override this with Container")), __1.JSXAlone.createElement(App, {
  name: "John Doe",
  tasks: ['Wash dishes', 'Go outside', 'Play soccer']
}));

var el = __1.JSXAlone.render(app);

document.body.appendChild(el);
},{"jsx-alone-core":"6FnY","../..":"o2+O"}]},{},["wdqJ"], null)
//# sourceMappingURL=main.186cb047.map