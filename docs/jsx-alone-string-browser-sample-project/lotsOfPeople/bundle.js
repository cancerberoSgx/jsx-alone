(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var util_1 = require("./util");
function isJsonImplOutputEl(a) {
    return a && typeof a.tag === 'string';
}
exports.isJsonImplOutputEl = isJsonImplOutputEl;
function isJsonImplOutputText(a) {
    return a && typeof a.tag === 'undefined';
}
exports.isJsonImplOutputText = isJsonImplOutputText;
var JsonImplElementLikeImpl = (function (_super) {
    __extends(JsonImplElementLikeImpl, _super);
    function JsonImplElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonImplElementLikeImpl.prototype.render = function (config) {
        if (config === void 0) { config = {}; }
        var r = {
            tag: this.tag,
            innerHtml: this.innerHtml,
            attrs: this.attrs,
            children: this.children.map(function (c) {
                var r = __assign({}, c);
                delete r.parentElement;
                return r;
            })
        };
        delete r.parentElement;
        return r;
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
function JsonImplOutputElAsHtml(node, indentLevel) {
    if (indentLevel === void 0) { indentLevel = 0; }
    if (isJsonImplOutputText(node)) {
        return node.content + '';
    }
    return (indentLevel === -1 ? '' : "\n" + util_1.indent(indentLevel)) + "<" + node.tag + (Object.keys(node.attrs).length ? ' ' : '') + Object.keys(node.attrs).map(function (a) { return a + "=\"" + (node.attrs[a].toString ? node.attrs[a].toString() : node.attrs[a]) + "\""; }).join(' ') + ">" + node.children.map(function (c) { return isJsonImplOutputEl(c) ? JsonImplOutputElAsHtml(c, indentLevel + 1) : c.content; }).join('') + (indentLevel === -1 ? '' : "\n" + util_1.indent(indentLevel)) + "</" + node.tag + ">";
}
exports.JsonImplOutputElAsHtml = JsonImplOutputElAsHtml;
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
    updateElement: function (element, tag, attrs, children, create) { return createElement_1.updateElement(element, JsonImplTextNodeLikeImpl, tag, attrs, children, create); },
    render: function (el, config) {
        if (config === void 0) { config = {}; }
        return el.render(config);
    },
    _Impl: 'Json'
};

},{"./":5,"./createElement":2,"./elementClass":3,"./util":8}],2:[function(require,module,exports){
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
        if (onElementCreate && onElementCreate && element) {
            onElementCreate({ elementLike: element, elementClassInstance: elementClassInstance, attrs: attrs });
        }
        updateElement(element, textNodeImpl, tag, attrs, children, true);
        if (onElementReady && element) {
            onElementReady({ elementLike: element });
        }
        return element;
    };
    return createElement;
}
exports.createCreateElement = createCreateElement;
function updateElement(element, textNodeImpl, tag, attrs, children, create) {
    if (create === void 0) { create = false; }
    if (typeof tag === 'string') {
        element.tag = tag;
        Object.keys(attrs).forEach(function (name) {
            var value = attrs[name];
            var type = typeof value;
            if (type === 'string' || type === 'number' || type === 'function') {
                element.setAttribute(name, value);
            }
            else if (type === 'boolean') {
                if (value === true) {
                    element.setAttribute(name, name);
                }
            }
            else if (name === 'dangerouslySetInnerHTML' && value) {
                element.dangerouslySetInnerHTML(value.__html);
            }
            else {
                element.setAttribute(name, value);
            }
        });
        children.forEach(function (child, i) {
            if (!child) {
                return;
            }
            if (elementImpl_1.isNode(child)) {
                if (!create && i < element.children.length) {
                    element.replaceChild(i, child);
                }
                else {
                    element.appendChild(child);
                }
            }
            else if (Array.isArray(child)) {
                var childChildrenCount_1 = child.length;
                child.forEach(function (c, j) {
                    var canUpdate = !create && i + j < childChildrenCount_1;
                    if (elementImpl_1.isNode(c)) {
                        if (canUpdate) {
                            element.replaceChild(i + j, c);
                        }
                        else {
                            element.appendChild(c);
                        }
                    }
                    else {
                        if (canUpdate) {
                            element.replaceChild(i, new textNodeImpl(c));
                        }
                        else {
                            element.appendChild(new textNodeImpl(c));
                        }
                    }
                });
            }
            else {
                if (!create && i < element.children.length) {
                    element.replaceChild(i, new textNodeImpl(child));
                }
                else {
                    element.appendChild(new textNodeImpl(child));
                }
            }
        });
    }
}
exports.updateElement = updateElement;
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
    function ElementClass(_props) {
        this._props = _props;
    }
    Object.defineProperty(ElementClass.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: true,
        configurable: true
    });
    ElementClass.prototype.asJSXElement = function () {
        var el = this.render();
        el._elementClassInstance = this;
        return el;
    };
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
function isElementClass(c) {
    return c.render && c.afterRender;
}
exports.isElementClass = isElementClass;
function isNode(n) {
    return isTextNodeLike(n) || isElementLike(n);
}
exports.isNode = isNode;
function isElementLike(n) {
    return n && n.setAttribute;
}
exports.isElementLike = isElementLike;
function isElementConstructor(c) {
    return c.prototype && c.prototype.render;
}
exports.isElementConstructor = isElementConstructor;
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
    AbstractElementLike.prototype.replaceChild = function (i, c) {
        this.children[i] = c;
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
    return typeof self.onmessage === 'object' ? self : global;
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
function objectMap(o, f) {
    var r = {};
    Object.keys(o).forEach(function (k) {
        r[k] = f(k, o[k]);
    });
    return r;
}
exports.objectMap = objectMap;

},{}],9:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var renderApp_1 = require("./lotsOfPeople/renderApp");
exports.lotsOfPeople = renderApp_1.renderApp;
__export(require("./util"));

},{"./lotsOfPeople/renderApp":12,"./util":13}],10:[function(require,module,exports){
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
function getApp(JSXAlone) {
    var AppImpl = (function (_super) {
        __extends(AppImpl, _super);
        function AppImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppImpl.prototype.render = function () {
            var _this = this;
            return JSXAlone.createElement("div", null,
                JSXAlone.createElement("h1", null, "Lots of people to print"),
                JSXAlone.createElement(jsx_alone_core_1.If, { c: typeof window !== 'undefined' }, function () { return JSXAlone.createElement("div", null,
                    JSXAlone.createElement("p", null,
                        "People count: ",
                        JSXAlone.createElement("input", { id: "peopleCount", value: _this.props.peopleCount + '', type: "number" })),
                    JSXAlone.createElement("p", null,
                        "Friends count: ",
                        JSXAlone.createElement("input", { id: "friendsCount", value: _this.props.friendsCount + '', type: "number" })),
                    JSXAlone.createElement("button", { onClick: function (e) {
                            var peopleCount = document.querySelector('#peopleCount').valueAsNumber;
                            var friendsCount = document.querySelector('#friendsCount').valueAsNumber;
                            window.renderAppLotsOfPeople({ peopleCount: peopleCount, friendsCount: friendsCount });
                        } }, "Render!"),
                    JSXAlone.createElement("h4", null, "Timings"),
                    JSXAlone.createElement("ul", null,
                        JSXAlone.createElement("li", null,
                            "onload: ",
                            JSXAlone.createElement("strong", { id: "timings_onload" })),
                        JSXAlone.createElement("li", null,
                            "buildModel: ",
                            JSXAlone.createElement("strong", { id: "timings_buildModel" })),
                        JSXAlone.createElement("li", null,
                            "JSXAlone.createElement: ",
                            JSXAlone.createElement("strong", { id: "timings_JSXAloneCreateElement" })),
                        JSXAlone.createElement("li", null,
                            "JSXAlone.render: ",
                            JSXAlone.createElement("strong", { id: "timings_JSXAloneRender" })))); }),
                JSXAlone.createElement(People, { people: this.props.people }));
        };
        AppImpl.prototype.afterRender = function (containerEl) {
        };
        return AppImpl;
    }(jsx_alone_core_1.AbstractElementClass));
    var EditButton = function (props) { return (JSXAlone.createElement("button", { "data-name": props.name, onClick: function (e) {
            alert(("\n  No context here that's why we need to do the following:\n  Name: \"" + e.currentTarget.getAttribute('data-name') + "\"\n  ").trim());
        } }, props.children)); };
    var Person = function (props) { return (JSXAlone.createElement("tr", { id: encodeURIComponent(props.name) },
        JSXAlone.createElement("td", null, props.name),
        JSXAlone.createElement("td", null, props.age),
        JSXAlone.createElement("td", null,
            JSXAlone.createElement("ul", null, props.friends.map(function (f) { return (JSXAlone.createElement("li", null,
                JSXAlone.createElement("a", { href: "#" + f.name }, f.name))); }))),
        JSXAlone.createElement("td", null,
            JSXAlone.createElement(EditButton, { name: props.name }, "Edit")))); };
    var People = function (props) { return (JSXAlone.createElement("table", { className: "person" },
        JSXAlone.createElement("thead", null,
            JSXAlone.createElement("tr", null,
                JSXAlone.createElement("th", null, "Name"),
                JSXAlone.createElement("th", null, "Age"),
                JSXAlone.createElement("th", null, "Friends"),
                JSXAlone.createElement("th", null, "Actions"))),
        JSXAlone.createElement("tbody", null, props.people.map(function (p) {
            return JSXAlone.createElement(Person, __assign({}, p));
        })))); };
    return AppImpl;
}
exports.getApp = getApp;

},{"jsx-alone-core":5}],11:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var jsx_alone_core_1 = require("jsx-alone-core");
exports.MODEL_CONFIG = { peopleCount: 100, friendsCount: 5 };
function buildModel(config) {
    return {
        people: makePeople(config)
    };
}
exports.buildModel = buildModel;
function makePeople(config) {
    return jsx_alone_core_1.array(config.peopleCount)
        .map(function (i) { return ({
        name: util_1.names.firstName() + " " + util_1.names.firstName() + " " + util_1.names.lastName() + " " + util_1.names.lastName(),
        age: util_1.numbers.integer(0, 100),
        friends: []
    }); })
        .map(function (p, i, a) {
        p.friends = jsx_alone_core_1.array(util_1.numbers.integer(Math.trunc(config.friendsCount / 2), config.friendsCount)).map(function (i) { return a[util_1.numbers.integer(0, a.length - 1)]; });
        return p;
    });
}

},{"../util":13,"jsx-alone-core":5}],12:[function(require,module,exports){
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
var model_1 = require("./model");
var model_2 = require("./model");
var jsx_alone_core_1 = require("jsx-alone-core");
var App_1 = require("./App");
function renderApp(renderer, config, JSXAlone) {
    if (config === void 0) { config = model_2.MODEL_CONFIG; }
    renderer_ = renderer;
    if (typeof window !== 'undefined') {
        jsx_alone_core_1.getGlobal().renderAppLotsOfPeople = function (config) { return renderApp(renderer_, config, JSXAlone); };
    }
    var buildModelT0 = Date.now();
    var model = model_1.buildModel(config);
    var buildModelT = Date.now() - buildModelT0;
    var JSXAloneCreateElementT0 = Date.now();
    var App = App_1.getApp(JSXAlone);
    var app = JSXAlone.createElement("div", { id: "jsx-alone-sample-project-code" },
        JSXAlone.createElement(App, __assign({}, model, config)),
        ";");
    var JSXAloneCreateElementT = Date.now() - JSXAloneCreateElementT0;
    renderer(app, { buildModelT: buildModelT, JSXAloneCreateElementT: JSXAloneCreateElementT });
    return app;
}
exports.renderApp = renderApp;
var renderer_;

},{"./App":10,"./model":11,"jsx-alone-core":5}],13:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
exports.names = {
    firstName: function () { return jsx_alone_core_1.randomItem(firstNames); }, lastName: function () { return jsx_alone_core_1.randomItem(firstNames); }
};
exports.numbers = {
    integer: function (min, max) { return jsx_alone_core_1.randomIntBetween(min, max); }
};
var firstNames = [
    'William',
    'Jack',
    'Oliver',
    'Joshua',
    'Thomas',
    'Lachlan',
    'Cooper',
    'Noah',
    'Ethan',
    'Lucas',
    'James',
    'Samuel',
    'Jacob',
    'Liam',
    'Alexander',
    'Benjamin',
    'Max',
    'Isaac',
    'Daniel',
    'Riley',
    'Ryan',
    'Xavier',
    'Harry',
    'Jayden',
    'Nicholas',
    'Harrison',
    'Levi',
    'Luke',
    'Adam',
    'Henry',
    'Aiden',
    'Dylan',
    'Oscar',
    'Michael',
    'Jackson',
    'Logan'
];

},{"jsx-alone-core":5}],14:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_sample_project_code_1 = require("jsx-alone-sample-project-code");
var jsx_alone_string_1 = require("jsx-alone-string");
var jsx_alone_core_1 = require("jsx-alone-core");
var renderer = function (app, config) {
    var onloadT0 = Date.now();
    console.time('onload');
    window.onload = function () {
        console.timeEnd('onload');
        var onloadT = Date.now() - onloadT0;
        document.getElementById('timings_onload').innerHTML = jsx_alone_core_1.printMs(onloadT);
        document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
        document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
        document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
    };
    var JSXAloneRenderT0 = Date.now();
    console.time('JSXAlone.render()');
    var s = jsx_alone_string_1.JSXAlone.render(app, { indent: false, indentTabSize: 0, indentLevel: 0 });
    console.log(typeof s);
    console.timeEnd('JSXAlone.render()');
    var JSXAloneRenderT = Date.now() - JSXAloneRenderT0;
    var root = document.getElementById('jsx-alone-sample-project-code');
    if (root) {
        root.remove();
    }
    root = document.createElement('dir');
    root.setAttribute('id', 'jsx-alone-sample-project-code');
    root.innerHTML = s;
    document.body.appendChild(root);
    document.getElementById('timings_onload').innerHTML = 'N/E';
    document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
    document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
    document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
};
jsx_alone_sample_project_code_1.lotsOfPeople(renderer, undefined, jsx_alone_string_1.JSXAlone);

},{"jsx-alone-core":5,"jsx-alone-sample-project-code":9,"jsx-alone-string":18}],15:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderConfig = { indentLevel: 0, indentTabSize: 2, indent: true };

},{}],16:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var elementImpl_1 = require("./elementImpl");
var createCreateElementConfig = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl
};
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(createCreateElementConfig),
    updateElement: function (element, tag, attrs, children, create) { return jsx_alone_core_1.updateElement(element, elementImpl_1.TextNodeLikeImpl, tag, attrs, children, create); },
    render: function (el, config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + el.render(config);
    },
    _Impl: 'string'
};
exports.JSXAlone = Module;

},{"./config":15,"./elementImpl":17,"jsx-alone-core":5}],17:[function(require,module,exports){
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
    else {
        value = value + '';
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

},{"./config":15,"./util":19,"jsx-alone-core":5}],18:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./createElement"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":16,"./elementImpl":17}],19:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
function indent(config) {
    var L = (config.indentLevel || 0) * (config.indentTabSize || 0);
    var a = [];
    for (var i = 0; i < L; i++) {
        a.push(' ');
    }
    return a.join('');
}
exports.indent = indent;

},{}]},{},[14]);
