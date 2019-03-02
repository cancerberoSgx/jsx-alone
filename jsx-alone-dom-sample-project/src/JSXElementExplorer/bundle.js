(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsxAloneCore = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var _1 = require("./");
var createElement_1 = require("./createElement");
var elementClass_1 = require("./elementClass");
var JsonImplElementLikeImpl = (function (_super) {
    __extends(JsonImplElementLikeImpl, _super);
    function JsonImplElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonImplElementLikeImpl.prototype.render = function (config) {
        if (config === void 0) { config = {}; }
        return {
            tag: this.tag,
            innerHtml: this.innerHtml,
            attrs: this.attrs,
            children: this.children.map(function (c) { return (__assign({}, c, { parentElement: undefined })); })
        };
    };
    JsonImplElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this.innerHtml = s;
    };
    return JsonImplElementLikeImpl;
}(_1.AbstractElementLike));
exports.JsonImplElementLikeImpl = JsonImplElementLikeImpl;
var JsonImplTextNodeLikeImpl = (function (_super) {
    __extends(JsonImplTextNodeLikeImpl, _super);
    function JsonImplTextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonImplTextNodeLikeImpl.prototype.render = function (config) {
        return { content: this.content };
    };
    return JsonImplTextNodeLikeImpl;
}(_1.AbstractTextNodeLike));
exports.JsonImplTextNodeLikeImpl = JsonImplTextNodeLikeImpl;
var JsonImplElementClass = (function (_super) {
    __extends(JsonImplElementClass, _super);
    function JsonImplElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JsonImplElementClass;
}(elementClass_1.AbstractElementClass));
exports.JsonImplElementClass = JsonImplElementClass;
exports.JSXAloneJsonImpl = {
    createElement: createElement_1.createCreateElement({ impl: JsonImplElementLikeImpl, textNodeImpl: JsonImplTextNodeLikeImpl }),
    render: function (el, config) {
        if (config === void 0) { config = {}; }
        return el.render(config);
    }
};

},{"./":5,"./createElement":2,"./elementClass":3}],2:[function(require,module,exports){
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
var elementImpl_1 = require("./elementImpl");
function createCreateElement(config) {
    var impl = config.impl, textNodeImpl = config.textNodeImpl, onElementReady = config.onElementReady, onElementCreate = config.onElementCreated;
    var createElement = function (tag, attrs) {
        if (attrs === void 0) { attrs = {}; }
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var element;
        var elementClassInstance;
        var tagIsString = typeof tag === 'string';
        attrs = attrs || {};
        if (tagIsString) {
            element = new impl(tag);
        }
        else if (elementImpl_1.isElementClassConstructor(tag)) {
            elementClassInstance = new tag(__assign({}, attrs, { children: children }));
            element = elementClassInstance.render();
        }
        else {
            element = tag(__assign({}, attrs, { children: children }));
        }
        if (onElementCreate) {
            onElementCreate({ elementLike: element, elementClassInstance: elementClassInstance, attrs: attrs });
        }
        if (tagIsString) {
            Object.keys(attrs).forEach(function (name) {
                var value = attrs[name];
                var type = typeof value;
                if (type === 'string' || type === 'number') {
                    element.setAttribute(name, value);
                }
                else if (type === 'function') {
                    element.setAttribute(name, value);
                }
                else if (value === false) {
                }
                else if (value === true) {
                    element.setAttribute(name, name);
                }
                else if (name === 'dangerouslySetInnerHTML' && value) {
                    element.dangerouslySetInnerHTML(value.__html);
                }
                else {
                    element.setAttribute(name, value);
                }
            });
            children
                .filter(function (c) { return c; })
                .forEach(function (child) {
                if (elementImpl_1.isNode(child)) {
                    element.appendChild(child);
                }
                else if (Array.isArray(child)) {
                    child.forEach(function (c) {
                        if (elementImpl_1.isNode(c)) {
                            element.appendChild(c);
                        }
                        else {
                            element.appendChild(new textNodeImpl(c));
                        }
                    });
                }
                else {
                    element.appendChild(new textNodeImpl(child));
                }
            });
        }
        if (onElementReady) {
            onElementReady({ elementLike: element });
        }
        return element;
    };
    return createElement;
}
exports.createCreateElement = createCreateElement;
exports.AbstractJSXAlone = null;
var throwOnUnrecognized = false;
function debug(err) {
    if (throwOnUnrecognized) {
        throw err;
    }
    else {
        console.error(err);
    }
}
exports.debug = debug;

},{"./elementImpl":4}],3:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var ElementClass = (function () {
    function ElementClass(props) {
        this.props = props;
    }
    return ElementClass;
}());
exports.ElementClass = ElementClass;
var AbstractElementClass = (function (_super) {
    __extends(AbstractElementClass, _super);
    function AbstractElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractElementClass;
}(ElementClass));
exports.AbstractElementClass = AbstractElementClass;

},{}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
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
var AbstractTextNodeLike = (function () {
    function AbstractTextNodeLike(content) {
        this.content = content;
    }
    return AbstractTextNodeLike;
}());
exports.AbstractTextNodeLike = AbstractTextNodeLike;
var AbstractElementLike = (function () {
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
}());
exports.AbstractElementLike = AbstractElementLike;

},{}],5:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
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

},{"./JsonImpl":1,"./createElement":2,"./elementClass":3,"./elementImpl":4,"./misc":6,"./style":7,"./util":8}],6:[function(require,module,exports){
(function (global){
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
function Js(props) {
    var r = props.children();
    console.log(r);
    return r ? _1.AbstractJSXAlone.createElement("span", null, r) : null;
}
exports.Js = Js;
function If(props) {
    var f = Array.isArray(props.children) ? props.children[0] : props.children;
    var c = props.c, p = props.p;
    if (isNotFalsy(c))
        return f.apply(null, (p ? [p] : []).concat([c]));
    else {
        return null;
    }
}
exports.If = If;
function isNotFalsy(a) { return !!a; }
function getGlobal() {
    return (typeof window === 'undefined' && typeof document === 'undefined') ? global : window;
}
exports.getGlobal = getGlobal;
function installJSXAloneAsGlobal(i) {
    getGlobal()['JSXAlone'] = i;
}
exports.installJSXAloneAsGlobal = installJSXAloneAsGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{".":5}],7:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
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

},{".":5}],8:[function(require,module,exports){
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
function checkThrow(r, msg) {
    if (msg === void 0) { msg = 'Throwing on undefined value'; }
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
    if (i === void 0) { i = 1; }
    if (tabSize === void 0) { tabSize = 2; }
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith) {
    if (replaceWith === void 0) { replaceWith = ' '; }
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
    if (config === void 0) { config = { minutes: false, seconds: true, ms: true }; }
    config = __assign({ minutes: false, seconds: true, ms: true }, config);
    var seconds = config.seconds && Math.floor(ms / 1000);
    var minutes = config.minutes && seconds && Math.floor(seconds / 60);
    var milliseconds = config.ms && Math.floor(ms % 1000 || ms);
    return "" + (minutes ? minutes + " minutes " : '') + (seconds ? seconds + " seconds " : '') + (milliseconds ? milliseconds + " ms " : '');
}
exports.printMs = printMs;
function printStyleHtmlAttribute(value) {
    return "" + Object.keys(value)
        .map(function (p) { return p + ": " + value[p]; })
        .join('; ');
}
exports.printStyleHtmlAttribute = printStyleHtmlAttribute;
var _unique = 0;
function unique(prefix) {
    if (prefix === void 0) { prefix = '_'; }
    return prefix + _unique++;
}
exports.unique = unique;

},{}]},{},[5])(5)
});
