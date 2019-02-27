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
})({"3p56":[function(require,module,exports) {
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
},{}],"+nOU":[function(require,module,exports) {
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
},{"./elementImpl":"3p56"}],"rCe5":[function(require,module,exports) {
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
        if (_typeof(tag.prototype) !== undefined) {
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
},{"./elementImpl":"3p56"}],"URgR":[function(require,module,exports) {
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
},{".":"USgY"}],"8yB0":[function(require,module,exports) {
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
},{}],"USgY":[function(require,module,exports) {
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
},{"./elementImpl":"3p56","./elementClass":"+nOU","./createElement":"rCe5","./misc":"URgR","./util":"8yB0"}],"/5mC":[function(require,module,exports) {
;

var jsx_alone_core_1 = require("jsx-alone-core");

exports.names = {
  firstName: function firstName() {
    return jsx_alone_core_1.randomItem(firstNames);
  },
  lastName: function lastName() {
    return jsx_alone_core_1.randomItem(firstNames);
  }
};
exports.numbers = {
  integer: function integer(min, max) {
    return jsx_alone_core_1.randomIntBetween(min, max);
  }
};
var firstNames = ["William", "Jack", "Oliver", "Joshua", "Thomas", "Lachlan", "Cooper", "Noah", "Ethan", "Lucas", "James", "Samuel", "Jacob", "Liam", "Alexander", "Benjamin", "Max", "Isaac", "Daniel", "Riley", "Ryan", "Xavier", "Harry", "Jayden", "Nicholas", "Harrison", "Levi", "Luke", "Adam", "Henry", "Aiden", "Dylan", "Oscar", "Michael", "Jackson", "Logan"];
},{"jsx-alone-core":"USgY"}],"45O1":[function(require,module,exports) {
;

var util_1 = require("../util");

var jsx_alone_core_1 = require("jsx-alone-core");

exports.MODEL_CONFIG = {
  peopleCount: 100,
  friendsCount: 5
};

function buildModel(config) {
  return {
    people: makePeople(config)
  };
}

exports.buildModel = buildModel;

function makePeople(config) {
  return jsx_alone_core_1.array(config.peopleCount).map(function (i) {
    return {
      name: util_1.names.firstName() + " " + util_1.names.firstName() + " " + util_1.names.lastName() + " " + util_1.names.lastName(),
      age: util_1.numbers.integer(0, 100),
      friends: []
    };
  }).map(function (p, i, a) {
    p.friends = jsx_alone_core_1.array(util_1.numbers.integer(Math.trunc(config.friendsCount / 2), config.friendsCount)).map(function (i) {
      return a[util_1.numbers.integer(0, a.length - 1)];
    });
    return p;
  });
}
},{"../util":"/5mC","jsx-alone-core":"USgY"}],"LbiZ":[function(require,module,exports) {
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
},{"./elementImpl":"3p56"}],"TYq4":[function(require,module,exports) {
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
        if (_typeof(tag.prototype) !== undefined) {
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
},{"./elementImpl":"3p56"}],"TiN9":[function(require,module,exports) {
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
},{".":"kF9h"}],"kF9h":[function(require,module,exports) {
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
},{"./elementImpl":"3p56","./elementClass":"LbiZ","./createElement":"TYq4","./misc":"TiN9","./util":"8yB0"}],"xhWP":[function(require,module,exports) {
;
exports.defaultRenderConfig = { indentLevel: 0, indentTabSize: 2, indent: true };

},{}],"CLcs":[function(require,module,exports) {
;
function indent(config) {
    var L = (config.indentLevel || 0) * (config.indentTabSize || 0);
    var a = [];
    for (var i = 0; i < L; i++) {
        a.push(' ');
    }
    return a.join('');
}
exports.indent = indent;

},{}],"/cDs":[function(require,module,exports) {
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
var config_1 = require("./config");
var util_1 = require("./util");
var ElementLikeImpl = (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        var newLine = config.indent ? "\n" : "";
        var content = this.innerHtml ||
            "" + newLine + util_1.indent(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })) + this.children
                .map(function (c) { return "" + c.render(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })); })
                .join('') + newLine + util_1.indent(config);
        return "<" + this.tag + Object.keys(this.attrs)
            .map(function (a) { return " " + printHtmlAttribute(a, _this.attrs[a]); })
            .join('') + ">" + content + "</" + this.tag + ">";
    };
    ElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this.innerHtml = s;
    };
    return ElementLikeImpl;
}(jsx_alone_core_1.AbstractElementLike));
exports.ElementLikeImpl = ElementLikeImpl;
function printHtmlAttribute(a, value) {
    if (a === 'style') {
        value = jsx_alone_core_1.printStyleHtmlAttribute(value);
    }
    else if (a === 'className') {
        a = 'class';
    }
    else if (typeof value === 'function') {
        value = "(" + value.toString() + ").apply(_this=this,arguments)";
    }
    value = value.replace(/\"/gim, '&quot;');
    return a + "=\"" + value + "\"";
}
var TextNodeLikeImpl = (function (_super) {
    __extends(TextNodeLikeImpl, _super);
    function TextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextNodeLikeImpl.prototype.render = function (config) {
        return "" + this.content;
    };
    return TextNodeLikeImpl;
}(jsx_alone_core_1.AbstractTextNodeLike));
exports.TextNodeLikeImpl = TextNodeLikeImpl;
var ElementClass = (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;

},{"jsx-alone-core":"kF9h","./config":"xhWP","./util":"CLcs"}],"zyVy":[function(require,module,exports) {
;
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var elementImpl_1 = require("./elementImpl");
var createCreateElementConfig = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl,
};
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(createCreateElementConfig),
    render: function (el, config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + el.render(config);
    }
};
exports.JSXAlone = Module;

},{"jsx-alone-core":"kF9h","./config":"xhWP","./elementImpl":"/cDs"}],"AP0d":[function(require,module,exports) {
;
var jsx_alone_core_1 = require("jsx-alone-core");
var createElement_1 = require("./createElement");
exports.Style = function (props) {
    function indent(n) {
        return props.renderConfig && props.renderConfig.indent ? jsx_alone_core_1.indent(n) : '';
    }
    function fixProperty(s) {
        var t;
        while (t = /([A-Z])/.exec(s)) {
            s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
        }
        return s;
    }
    return createElement_1.JSXAlone.createElement("style", null, Object.keys(props.classes).map(function (c) {
        return indent(1) + "." + c + (props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '') + " {" + Object.keys(props.classes[c]).filter(function (p) { return p !== 'selectorPostfix'; }).map(function (p) { return "\n" + indent(2) + fixProperty(p) + ": " + props.classes[c][p] + ";"; }).join("") + "\n}";
    }).join('\n'));
};
function Styles(styles) {
    var classes = {};
    Object.keys(styles).forEach(function (k) {
        classes[k] = k;
    });
    return {
        styles: styles, classes: classes
    };
}
exports.Styles = Styles;

},{"jsx-alone-core":"kF9h","./createElement":"zyVy"}],"o3Jh":[function(require,module,exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./createElement"));
__export(require("./Style"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":"zyVy","./Style":"AP0d","./elementImpl":"/cDs"}],"JVGL":[function(require,module,exports) {
;

var jsx_alone_string_1 = require("jsx-alone-string");

function getJSXAlone() {
  return jsx_alone_string_1.JSXAlone;
}

exports.getJSXAlone = getJSXAlone;
},{"jsx-alone-string":"o3Jh"}],"IAey":[function(require,module,exports) {
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

var jsx_alone_core_1 = require("jsx-alone-core");

var impl_1 = require("../impl");

var JSXAlone = impl_1.getJSXAlone();

var App = function (_super) {
  __extends(App, _super);

  function App() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  App.prototype.render = function () {
    var _this = this;

    return JSXAlone.createElement("div", null, JSXAlone.createElement("h1", null, "Lots of people to print"), JSXAlone.createElement(jsx_alone_core_1.If, {
      c: typeof window !== 'undefined'
    }, function () {
      return JSXAlone.createElement("div", null, JSXAlone.createElement("p", null, "People count: ", JSXAlone.createElement("input", {
        id: "peopleCount",
        value: _this.props.peopleCount + '',
        type: "number"
      })), JSXAlone.createElement("p", null, "Friends count: ", JSXAlone.createElement("input", {
        id: "friendsCount",
        value: _this.props.friendsCount + '',
        type: "number"
      })), JSXAlone.createElement("button", {
        onClick: function onClick(e) {
          var peopleCount = document.querySelector('#peopleCount').valueAsNumber;
          var friendsCount = document.querySelector('#friendsCount').valueAsNumber;
          window.renderAppLotsOfPeople({
            peopleCount: peopleCount,
            friendsCount: friendsCount
          });
        }
      }, "Render!"), JSXAlone.createElement("h4", null, "Timings"), JSXAlone.createElement("ul", null, JSXAlone.createElement("li", null, "onload: ", JSXAlone.createElement("strong", {
        id: "timings_onload"
      })), JSXAlone.createElement("li", null, "buildModel: ", JSXAlone.createElement("strong", {
        id: "timings_buildModel"
      })), JSXAlone.createElement("li", null, "JSXAlone.createElement: ", JSXAlone.createElement("strong", {
        id: "timings_JSXAloneCreateElement"
      })), JSXAlone.createElement("li", null, "JSXAlone.render: ", JSXAlone.createElement("strong", {
        id: "timings_JSXAloneRender"
      }))));
    }), JSXAlone.createElement(People, {
      people: this.props.people
    }));
  };

  return App;
}(jsx_alone_core_1.AbstractElementClass);

exports.App = App;

var EditButton = function EditButton(props) {
  return JSXAlone.createElement("button", {
    "data-name": props.name,
    onClick: function onClick(e) {
      alert(("\nNo context here that's why we need to do the following: \nName: \"" + e.currentTarget.getAttribute('data-name') + "\"\n").trim());
    }
  }, props.children);
};

var Person = function Person(props) {
  return JSXAlone.createElement("tr", {
    id: encodeURIComponent(props.name)
  }, JSXAlone.createElement("td", null, props.name), JSXAlone.createElement("td", null, props.age), JSXAlone.createElement("td", null, JSXAlone.createElement("ul", null, props.friends.map(function (f) {
    return JSXAlone.createElement("li", null, JSXAlone.createElement("a", {
      href: "#" + f.name
    }, f.name));
  }))), JSXAlone.createElement("td", null, JSXAlone.createElement(EditButton, {
    name: props.name
  }, "Edit")));
};

var People = function People(props) {
  return JSXAlone.createElement("table", {
    className: "person"
  }, JSXAlone.createElement("thead", null, JSXAlone.createElement("tr", null, JSXAlone.createElement("th", null, "Name"), JSXAlone.createElement("th", null, "Age"), JSXAlone.createElement("th", null, "Friends"), JSXAlone.createElement("th", null, "Actions"))), JSXAlone.createElement("tbody", null, props.people.map(function (p) {
    return JSXAlone.createElement(Person, __assign({}, p));
  })));
};
},{"jsx-alone-core":"USgY","../impl":"JVGL"}],"z8rF":[function(require,module,exports) {
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

var model_1 = require("./model");

var App_1 = require("./App");

var model_2 = require("./model");

var impl_1 = require("../impl");

var JSXAlone = impl_1.getJSXAlone();

function renderApp(renderer, config) {
  if (config === void 0) {
    config = model_2.MODEL_CONFIG;
  }

  renderer_ = renderer;
  var buildModelT0 = Date.now();
  console.time('buildModel');
  var model = model_1.buildModel(config);
  var buildModelT = Date.now() - buildModelT0;
  console.timeEnd('buildModel');
  var JSXAloneCreateElementT0 = Date.now();
  console.time('JSXAlone.createElement');
  var app = JSXAlone.createElement("div", {
    id: "jsx-alone-sample-project-code"
  }, JSXAlone.createElement(App_1.App, __assign({}, model, config)), ";");
  var JSXAloneCreateElementT = Date.now() - JSXAloneCreateElementT0;
  console.timeEnd('JSXAlone.createElement');
  renderer(app, {
    buildModelT: buildModelT,
    JSXAloneCreateElementT: JSXAloneCreateElementT
  });
  return app;
}

exports.renderApp = renderApp;
var renderer_;

if (typeof window !== 'undefined') {
  window.renderAppLotsOfPeople = function (config) {
    return renderApp(renderer_, config);
  };
}
},{"./model":"45O1","./App":"IAey","../impl":"JVGL"}],"wC2p":[function(require,module,exports) {
function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

;

var renderApp_1 = require("./lotsOfPeople/renderApp");

exports.lotsOfPeople = renderApp_1.renderApp;

__export(require("./util"));
},{"./lotsOfPeople/renderApp":"z8rF","./util":"/5mC"}],"8O+M":[function(require,module,exports) {
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
},{"./elementImpl":"3p56"}],"MFEV":[function(require,module,exports) {
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
        if (_typeof(tag.prototype) !== undefined) {
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
},{"./elementImpl":"3p56"}],"TXrL":[function(require,module,exports) {
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
},{".":"HpCL"}],"HpCL":[function(require,module,exports) {
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
},{"./elementImpl":"3p56","./elementClass":"8O+M","./createElement":"MFEV","./misc":"TXrL","./util":"8yB0"}],"Y5I1":[function(require,module,exports) {
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
var config_1 = require("./config");
var util_1 = require("./util");
var ElementLikeImpl = (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        var newLine = config.indent ? "\n" : "";
        var content = this.innerHtml ||
            "" + newLine + util_1.indent(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })) + this.children
                .map(function (c) { return "" + c.render(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })); })
                .join('') + newLine + util_1.indent(config);
        return "<" + this.tag + Object.keys(this.attrs)
            .map(function (a) { return " " + printHtmlAttribute(a, _this.attrs[a]); })
            .join('') + ">" + content + "</" + this.tag + ">";
    };
    ElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this.innerHtml = s;
    };
    return ElementLikeImpl;
}(jsx_alone_core_1.AbstractElementLike));
exports.ElementLikeImpl = ElementLikeImpl;
function printHtmlAttribute(a, value) {
    if (a === 'style') {
        value = jsx_alone_core_1.printStyleHtmlAttribute(value);
    }
    else if (a === 'className') {
        a = 'class';
    }
    else if (typeof value === 'function') {
        value = "(" + value.toString() + ").apply(_this=this,arguments)";
    }
    value = value.replace(/\"/gim, '&quot;');
    return a + "=\"" + value + "\"";
}
var TextNodeLikeImpl = (function (_super) {
    __extends(TextNodeLikeImpl, _super);
    function TextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextNodeLikeImpl.prototype.render = function (config) {
        return "" + this.content;
    };
    return TextNodeLikeImpl;
}(jsx_alone_core_1.AbstractTextNodeLike));
exports.TextNodeLikeImpl = TextNodeLikeImpl;
var ElementClass = (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;

},{"jsx-alone-core":"HpCL","./config":"xhWP","./util":"CLcs"}],"PHuq":[function(require,module,exports) {
;
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var elementImpl_1 = require("./elementImpl");
var createCreateElementConfig = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl,
};
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(createCreateElementConfig),
    render: function (el, config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + el.render(config);
    }
};
exports.JSXAlone = Module;

},{"jsx-alone-core":"HpCL","./config":"xhWP","./elementImpl":"Y5I1"}],"V5o3":[function(require,module,exports) {
;
var jsx_alone_core_1 = require("jsx-alone-core");
var createElement_1 = require("./createElement");
exports.Style = function (props) {
    function indent(n) {
        return props.renderConfig && props.renderConfig.indent ? jsx_alone_core_1.indent(n) : '';
    }
    function fixProperty(s) {
        var t;
        while (t = /([A-Z])/.exec(s)) {
            s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
        }
        return s;
    }
    return createElement_1.JSXAlone.createElement("style", null, Object.keys(props.classes).map(function (c) {
        return indent(1) + "." + c + (props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '') + " {" + Object.keys(props.classes[c]).filter(function (p) { return p !== 'selectorPostfix'; }).map(function (p) { return "\n" + indent(2) + fixProperty(p) + ": " + props.classes[c][p] + ";"; }).join("") + "\n}";
    }).join('\n'));
};
function Styles(styles) {
    var classes = {};
    Object.keys(styles).forEach(function (k) {
        classes[k] = k;
    });
    return {
        styles: styles, classes: classes
    };
}
exports.Styles = Styles;

},{"jsx-alone-core":"HpCL","./createElement":"PHuq"}],"idtX":[function(require,module,exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./createElement"));
__export(require("./Style"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":"PHuq","./Style":"V5o3","./elementImpl":"Y5I1"}],"qWxh":[function(require,module,exports) {
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
},{"./elementImpl":"3p56"}],"Nzec":[function(require,module,exports) {
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
        if (_typeof(tag.prototype) !== undefined) {
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
},{"./elementImpl":"3p56"}],"h+Y6":[function(require,module,exports) {
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
},{".":"6FnY"}],"6FnY":[function(require,module,exports) {
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
},{"./elementImpl":"3p56","./elementClass":"qWxh","./createElement":"Nzec","./misc":"h+Y6","./util":"8yB0"}],"wdqJ":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;

var jsx_alone_sample_project_code_1 = require("jsx-alone-sample-project-code");

var jsx_alone_string_1 = require("jsx-alone-string");

var jsx_alone_core_1 = require("jsx-alone-core");

var renderer = function renderer(app, config) {
  // measures onload
  var onloadT0 = Date.now();
  console.time('onload');

  window.onload = function () {
    console.timeEnd('onload');
    var onloadT = Date.now() - onloadT0;
    document.getElementById('timings_onload').innerHTML = jsx_alone_core_1.printMs(onloadT);
    document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
    document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
    document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
  }; // measures render


  var JSXAloneRenderT0 = Date.now();
  console.time('JSXAlone.render()');
  var s = jsx_alone_string_1.JSXAlone.render(app, {
    indent: false,
    indentTabSize: 0,
    indentLevel: 0
  });
  console.log(_typeof(s));
  console.timeEnd('JSXAlone.render()');
  var JSXAloneRenderT = Date.now() - JSXAloneRenderT0; // measures appendChild TODO: timing

  var root = document.getElementById('jsx-alone-sample-project-code');

  if (root) {
    root.remove();
  }

  root = document.createElement('dir');
  root.setAttribute('id', 'jsx-alone-sample-project-code');
  root.innerHTML = s; // setInnerHTML(root, s)

  document.body.appendChild(root);
  document.getElementById('timings_onload').innerHTML = 'N/E';
  document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
  document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
  document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
};

jsx_alone_sample_project_code_1.lotsOfPeople(renderer); // /** sets innerHTML and calls children scripts if any */
// export function setInnerHTML(elm: HTMLElement, html: string) {
//   elm.innerHTML = html;
//   elm.querySelectorAll("script").forEach(function (el) {
//     let newEl = document.createElement("script");
//     el.getAttributeNames().forEach(function (attrName) {
//       newEl.setAttribute(attrName, el.getAttribute(attrName)!)
//     });
//     newEl.appendChild(document.createTextNode(el.innerHTML));
//     el.parentNode!.replaceChild(newEl, el);
//   })
// }
},{"jsx-alone-sample-project-code":"wC2p","jsx-alone-string":"idtX","jsx-alone-core":"6FnY"}]},{},["wdqJ"], null)
//# sourceMappingURL=main.186cb047.map