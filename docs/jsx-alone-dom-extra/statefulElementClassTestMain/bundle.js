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
var _1 = require("./");
var StatefulComponent_1 = require("./StatefulComponent");
var DestructiveDomRenderComponent = (function (_super) {
    __extends(DestructiveDomRenderComponent, _super);
    function DestructiveDomRenderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DestructiveDomRenderComponent.prototype.setState = function (s) {
        _super.prototype.setState.call(this, s);
        if (!this.containerEl) {
            throw new Error('this.containerEl is undefined - cannot DestructiveDomRender');
        }
        var activePath;
        var selection = { start: 0, end: 0 };
        if (document.activeElement) {
            activePath = getXPathOfElement(document.activeElement);
            selection = {
                start: document.activeElement.selectionStart || 0,
                end: document.activeElement.selectionEnd || 0,
                direction: document.activeElement.selectionDirection || undefined
            };
        }
        var jsx = this.render();
        var el = _1.JSXAlone.render(jsx);
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
}(StatefulComponent_1.StatefulComponent));
exports.DestructiveDomRenderComponent = DestructiveDomRenderComponent;
function getXPathOfElement(el) {
    if (typeof el == 'string') {
        return document.evaluate(el, document, null, 0, null) + '';
    }
    if (!el || el.nodeType != 1) {
        return '';
    }
    if (el.id)
        return '//*[@id=\'' + el.id + '\']';
    if (el.parentNode) {
        var sames = Array.from(el.parentNode.children).filter(function (x) { return x.tagName == el.tagName; });
        return (getXPathOfElement(el.parentNode) +
            '/' +
            (el.tagName || '').toLowerCase() +
            (sames.length > 1 ? '[' + (sames.indexOf(el) + 1) + ']' : ''));
    }
    else {
        return undefined;
    }
}
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
    }
    catch (e) {
        alert('Error: Document tree modified during iteration ' + e);
    }
}

},{"./":14,"./StatefulComponent":10}],10:[function(require,module,exports){
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
var StatefulComponent = (function (_super) {
    __extends(StatefulComponent, _super);
    function StatefulComponent(p) {
        var _this = _super.call(this, p) || this;
        _this.state = {};
        _this.state = __assign({}, p);
        return _this;
    }
    StatefulComponent.prototype.setState = function (s) {
        this.state = __assign({}, this.state, s);
    };
    StatefulComponent.prototype.afterRender = function (containerEl) {
        this.containerEl = containerEl;
    };
    return StatefulComponent;
}(_1.ElementClass));
exports.StatefulComponent = StatefulComponent;

},{"./":14}],11:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var statefulElementClassTestRenderApp_1 = require("./statefulElementClassTestRenderApp");
statefulElementClassTestRenderApp_1.statefulElementClassTestRenderApp();

},{"./statefulElementClassTestRenderApp":12}],12:[function(require,module,exports){
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
var __1 = require("..");
var DestructiveDomRenderComponent_1 = require("../DestructiveDomRenderComponent");
function statefulElementClassTestRenderApp() {
    var parent = document.createElement('div');
    document.body.appendChild(parent);
    var el = __1.JSXAlone.render(__1.JSXAlone.createElement(App, { people: [{ name: 'seba' }, { name: 'lau' }] }), { parent: parent });
    parent.appendChild(el);
    return parent;
}
exports.statefulElementClassTestRenderApp = statefulElementClassTestRenderApp;
var Repeater = (function (_super) {
    __extends(Repeater, _super);
    function Repeater(p) {
        var _this = _super.call(this, p) || this;
        _this.state = __assign({}, p);
        return _this;
    }
    Repeater.prototype.render = function () {
        var _this = this;
        return (__1.JSXAlone.createElement("div", { className: "Repeater" },
            "Write something:",
            __1.JSXAlone.createElement("input", { value: this.state.value, onKeyUp: function (e) {
                    _this.setState({ value: e.currentTarget.value });
                } }),
            __1.JSXAlone.createElement("br", null),
            "Will be repeated: ",
            __1.JSXAlone.createElement("span", null, this.state.value),
            ' '));
    };
    return Repeater;
}(DestructiveDomRenderComponent_1.DestructiveDomRenderComponent));
var App = (function (_super) {
    __extends(App, _super);
    function App(p) {
        var _this = _super.call(this, p) || this;
        _this.state = __assign({}, p);
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (__1.JSXAlone.createElement("div", { className: "App" },
            __1.JSXAlone.createElement("button", { id: "add", onClick: function (e) { return _this.setState({ people: _this.state.people.concat([{ name: 'random name ' + Math.random() }]) }); } }, "add"),
            __1.JSXAlone.createElement("ul", null, this.state.people.map(function (p) { return (__1.JSXAlone.createElement("li", { "data-id": p.name },
                __1.JSXAlone.createElement(Repeater, { value: p.name }),
                __1.JSXAlone.createElement("button", { className: "remove", onClick: function (e) {
                        _this.setState({ people: _this.state.people.filter(function (p2) { return p2.name !== p.name; }) });
                    } }, "remove"))); }))));
    };
    App.prototype.setState = function (s) {
        this.state = __assign({}, this.state, s);
        this.containerEl.innerHTML = '';
        this.containerEl.appendChild(__1.JSXAlone.render(this.render()));
    };
    return App;
}(DestructiveDomRenderComponent_1.DestructiveDomRenderComponent));

},{"..":14,"../DestructiveDomRenderComponent":9}],13:[function(require,module,exports){
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
var jsx_alone_dom_1 = require("jsx-alone-dom");
exports.ElementClass = jsx_alone_dom_1.ElementClass;
exports.createCreateConfig = __assign({}, jsx_alone_dom_1.getCreateCreateElementConfig(), { impl: jsx_alone_dom_1.ElementLikeImpl, textNodeImpl: jsx_alone_dom_1.TextNodeLikeImpl });
exports.JSXAlone = {
    createElement: jsx_alone_core_1.createCreateElement(exports.createCreateConfig),
    updateElement: jsx_alone_dom_1.JSXAlone.updateElement,
    render: jsx_alone_dom_1.JSXAlone.render,
    createRef: jsx_alone_dom_1.JSXAlone.createRef,
    _Impl: 'domExtra'
};

},{"jsx-alone-core":5,"jsx-alone-dom":19}],14:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./createElement"));
__export(require("./StatefulComponent"));
__export(require("./DestructiveDomRenderComponent"));

},{"./DestructiveDomRenderComponent":9,"./StatefulComponent":10,"./createElement":13}],15:[function(require,module,exports){
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
var _1 = require(".");
var event_1 = require("./event");
var refs_1 = require("./refs");
function buildJSXALone() {
    var Module = {
        createElement: jsx_alone_core_1.createCreateElement(getCreateCreateElementConfig()),
        updateElement: function (element, tag, attrs, children, create) { return jsx_alone_core_1.updateElement(element, _1.TextNodeLikeImpl, tag, attrs, children, create); },
        render: function (elementLike, config) {
            var el = elementLike;
            var almostCompleteConfig = __assign({}, config, { rootElementLike: el });
            var updateExisting = el._elementClassInstance && el._elementClassInstance.eventManager && config && config.updateExisting;
            var rootHTMLElement = updateExisting || el.buildRootElement(almostCompleteConfig);
            var eventManager = updateExisting ? (el._elementClassInstance.eventManager || Module.lastEventManager) : new event_1.RootEventManager(rootHTMLElement);
            var completeConfig = __assign({}, almostCompleteConfig, { eventManager: eventManager, rootHTMLElement: rootHTMLElement });
            Module.lastEventManager = eventManager;
            return el.render(completeConfig);
        },
        createRef: function () {
            return new refs_1.RefObjectImpl();
        },
        _Impl: 'DOM'
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
            }
        };
    }
    return createCreateElementConfig;
}
exports.getCreateCreateElementConfig = getCreateCreateElementConfig;
exports.JSXAlone = buildJSXALone();

},{".":19,"./event":18,"./refs":21,"jsx-alone-core":5}],16:[function(require,module,exports){
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
var jsx_alone_core_1 = require("jsx-alone-core");
var ElementClass = (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.neverUpdate = false;
        return _this;
    }
    Object.defineProperty(ElementClass.prototype, "eventManager", {
        get: function () {
            return this._eventManager;
        },
        enumerable: true,
        configurable: true
    });
    ElementClass.prototype.afterRender = function (containerEl) {
    };
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;
function isElementClass(c) {
    return !!(c.render && c.afterRender);
}
exports.isElementClass = isElementClass;

},{"jsx-alone-core":5}],17:[function(require,module,exports){
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
var refs_1 = require("./refs");
var ElementLikeImpl = (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.buildRootElement = function (config) {
        return isSvgTag(this.tag)
            ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
            : document.createElement(this.tag);
    };
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        var dontUpdate = config.updateExisting && this._elementClassInstance && this._elementClassInstance.neverUpdate;
        var el = config.updateExisting || config.rootHTMLElement || this.buildRootElement(config);
        if (!dontUpdate) {
            Object.keys(this.attrs).forEach(function (attribute) {
                var value = _this.attrs[attribute];
                if (attribute === 'className') {
                    el.setAttribute('class', value);
                }
                else if (attribute === 'style') {
                    el.setAttribute('style', jsx_alone_core_1.printStyleHtmlAttribute(value));
                }
                else if (typeof value === 'function') {
                    config.eventManager.addEventListener(el, attribute.replace(/^on/, '').toLowerCase(), value);
                }
                else {
                    el.setAttribute(attribute, value);
                }
            });
            if (this._innerHtml) {
                el.innerHTML = this._innerHtml;
            }
            else {
                var childrenCountDiffer_1 = config.updateExisting && el.childNodes.length !== this.children.length;
                if (childrenCountDiffer_1) {
                    el.innerHTML = '';
                }
                this.children.forEach(function (c, i) {
                    var existingChildToUpdate = !childrenCountDiffer_1 && el.childNodes.item(i);
                    var cel = c.render(__assign({}, config, { updateExisting: existingChildToUpdate || undefined, rootHTMLElement: existingChildToUpdate || undefined }));
                    if (!existingChildToUpdate) {
                        el.appendChild(cel);
                    }
                    else if (existingChildToUpdate && !existingChildToUpdate.isEqualNode(cel)) {
                        existingChildToUpdate.replaceWith(cel);
                        config.eventManager.updateEventListeners(_this._elementClassInstance || config.rootElementLike._elementClassInstance, config.updateExisting, el, _this);
                    }
                });
            }
            if (config.parent && !config.updateExisting) {
                config.parent.appendChild(el);
            }
            if (this.ref) {
                refs_1.setRef({ elementLike: this, el: el, value: this.ref });
            }
        }
        var elementClassWithContainer = this._elementClassInstance || config.rootElementLike._elementClassInstance;
        if (elementClassWithContainer) {
            elementClassWithContainer._eventManager = config.eventManager;
            if (this._elementClassInstance) {
                this._elementClassInstance.afterRender(el);
            }
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
function isSvgTag(t) {
    var r = new RegExp("^" + t + "$", 'i');
    return SvgTags.some(function (name) { return r.test(name); });
}
var SvgTags = ['path', 'svg', 'use', 'g'];

},{"./refs":21,"jsx-alone-core":5}],18:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var mark_1 = require("./mark");
var RootEventManager = (function () {
    function RootEventManager(root, debug) {
        this.root = root;
        this.debug = debug;
        this.registeredByType = {};
        this.appendToDomListeners = [];
        this.mark = '_jsxa_e' + jsx_alone_core_1.unique('_');
        this.rootListener = this.rootListener.bind(this);
    }
    RootEventManager.prototype.markElement = function (el) {
        return mark_1.markElement(el, this.mark);
    };
    RootEventManager.prototype.getElementMark = function (e) {
        return mark_1.getElementMark(e, this.mark);
    };
    RootEventManager.prototype.removeElementMark = function (e) {
        return mark_1.removeElementMark(e, this.mark);
    };
    RootEventManager.prototype.getMarkedElement = function (mark) {
        return mark_1.getMarkedElement(mark, this.root, this.mark);
    };
    RootEventManager.prototype.getMarkedDescendants = function (e) {
        return mark_1.getMarkedDescendants(e, this.mark);
    };
    RootEventManager.prototype.rootListener = function (e) {
        if (e.target) {
            var mark_2 = this.getElementMark(e.target);
            var entry = mark_2 && (this.registeredByType[e.type.toLowerCase()] || []).find(function (e) { return e.mark === mark_2; });
            if (entry) {
                entry.fn(new E(e));
            }
        }
    };
    RootEventManager.prototype.addAppendToDomListener = function (l) {
        this.appendToDomListeners.push(l);
    };
    RootEventManager.prototype.onAppendToDom = function () {
        this.appendToDomListeners.forEach(function (l) { return l(); });
    };
    RootEventManager.prototype.addEventListener = function (el, type, fn) {
        type = type.toLowerCase();
        var ls = this.registeredByType[type];
        if (!ls) {
            ls = this.registeredByType[type] = [];
            this.root.addEventListener(type, this.rootListener);
        }
        var mark = this.markElement(el);
        var entry = ls.find(function (e) { return e.mark === mark; });
        if (!entry) {
            entry = { mark: mark, fn: fn, type: type };
            ls.push(entry);
        }
        else {
            entry.fn = fn;
        }
    };
    RootEventManager.prototype.updateEventListeners = function (ec, oldEl, newEl, elLike) {
        if (!oldEl || !ec || !newEl || !oldEl.getAttribute || !newEl.getAttribute) {
            return;
        }
        var mark = this.getElementMark(oldEl);
        if (!mark) {
            return;
        }
        Object.values(this.registeredByType).forEach(function (v) {
            v.filter(function (e) { return e.mark === mark; }).forEach(function (e) {
                e.fn = elLike.attrs["on" + e.type.substring(0, 1).toUpperCase() + e.type.substring(1, e.type.length)].bind(ec);
            });
        });
    };
    RootEventManager.prototype.removeListeners = function (el, andDescendants, types) {
        var _this = this;
        if (andDescendants === void 0) { andDescendants = false; }
        (this.getElementMark(el) ? [el] : []).concat((andDescendants ? this.getMarkedDescendants(el) : [])).filter(function (m) { return m; })
            .forEach(function (el) {
            var mark = _this.getElementMark(el);
            if (!mark) {
                return;
            }
            (types || Object.keys(_this.registeredByType)
                .map(function (t) { return t.toLowerCase(); }))
                .forEach(function (t) {
                _this.registeredByType[t] = (_this.registeredByType[t] || []).filter(function (e) { return e.mark !== mark; });
            });
            _this.removeElementMark(el);
        });
    };
    RootEventManager.prototype.uninstall = function (removeElementMarks, types) {
        var _this = this;
        if (removeElementMarks === void 0) { removeElementMarks = false; }
        (types || Object.keys(this.registeredByType).map(function (t) { return t.toLowerCase(); })).forEach(function (t) {
            _this.root.removeEventListener(t, _this.rootListener);
            if (removeElementMarks) {
                _this.registeredByType[t].forEach(function (e) {
                    var el = _this.getMarkedElement(e.mark);
                    if (el) {
                        el.removeEventListener(e.type, e.fn, e.options);
                    }
                });
            }
            _this.registeredByType[t] = [];
        });
    };
    return RootEventManager;
}());
exports.RootEventManager = RootEventManager;
var E = (function () {
    function E(e) {
        this.e = e;
        return new Proxy(this, this);
    }
    E.prototype.get = function (target, prop) {
        if (prop === 'currentTarget') {
            return this.e.target;
        }
        return this.e[prop];
    };
    return E;
}());

},{"./mark":20,"jsx-alone-core":5}],19:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./elementImpl"));
__export(require("./createElement"));
__export(require("./event"));
__export(require("./elementClass"));
__export(require("./util"));
__export(require("./updatablePropsComponent"));

},{"./createElement":15,"./elementClass":16,"./elementImpl":17,"./event":18,"./updatablePropsComponent":22,"./util":23}],20:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
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
function isElementMarked(e, label) {
    if (label === void 0) { label = '_jsxa_'; }
    return !!getElementMark(e, label);
}
exports.isElementMarked = isElementMarked;
function getDescendantsMarks(e, label) {
    if (label === void 0) { label = '_jsxa_'; }
    return getMarkedDescendants(e, label).map(function (d) { return getElementMark(d, label); });
}
exports.getDescendantsMarks = getDescendantsMarks;
function removeElementMark(e, label) {
    if (label === void 0) { label = '_jsxa_'; }
    e.removeAttribute("data-" + label);
}
exports.removeElementMark = removeElementMark;
function getMarkedDescendants(e, label) {
    if (label === void 0) { label = '_jsxa_'; }
    return Array.from(e.querySelectorAll(getMarkSSelector(label)));
}
exports.getMarkedDescendants = getMarkedDescendants;
function getMarkedElement(key, parent, label) {
    if (parent === void 0) { parent = document; }
    if (label === void 0) { label = '_jsxa_'; }
    return parent.querySelector(getMarkSSelector(label, key));
}
exports.getMarkedElement = getMarkedElement;
function getMarkSSelector(label, key) {
    return key ? "[data-" + label + "=\"" + key + "\"]" : "[data-" + label + "]";
}
exports.getMarkSSelector = getMarkSSelector;

},{"jsx-alone-core":5}],21:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var mark_1 = require("./mark");
var RefObjectImpl = (function () {
    function RefObjectImpl() {
        this._current = null;
    }
    Object.defineProperty(RefObjectImpl.prototype, "current", {
        get: function () {
            return typeof this._current === 'string' ? mark_1.getMarkedElement(this._current) : this._current;
        },
        enumerable: true,
        configurable: true
    });
    return RefObjectImpl;
}());
exports.RefObjectImpl = RefObjectImpl;
function setRef(_a) {
    var el = _a.el, value = _a.value, elementLike = _a.elementLike;
    value._current = elementLike._elementClassInstance || mark_1.markElement(el);
}
exports.setRef = setRef;

},{"./mark":20}],22:[function(require,module,exports){
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
var _1 = require(".");
var UpdatablePropsComponent = (function (_super) {
    __extends(UpdatablePropsComponent, _super);
    function UpdatablePropsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.removeChildrenOnUpdate = false;
        return _this;
    }
    UpdatablePropsComponent.prototype.afterRender = function (containerElement) {
        this.containerElement = containerElement;
    };
    UpdatablePropsComponent.prototype.updateProps = function (s) {
        this._props = __assign({}, this._props, s);
        var el = this.render();
        el._elementClassInstance = this;
        _1.JSXAlone.render(el, {
            updateExisting: this.containerElement
        });
    };
    UpdatablePropsComponent.prototype.getComponentName = function () {
        return this.constructor.name;
    };
    UpdatablePropsComponent.prototype.query = function (s) {
        return this.containerElement && this.containerElement.querySelector(s);
    };
    UpdatablePropsComponent.prototype.queryAll = function (s) {
        return Array.from(this.containerElement.querySelectorAll(s));
    };
    return UpdatablePropsComponent;
}(_1.ElementClass));
exports.UpdatablePropsComponent = UpdatablePropsComponent;
var UpdatablePropsDestructiveComponent = (function (_super) {
    __extends(UpdatablePropsDestructiveComponent, _super);
    function UpdatablePropsDestructiveComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.removeChildrenOnUpdate = true;
        return _this;
    }
    return UpdatablePropsDestructiveComponent;
}(UpdatablePropsComponent));
exports.UpdatablePropsDestructiveComponent = UpdatablePropsDestructiveComponent;
var UpdatablePropsNonDestructiveComponent = (function (_super) {
    __extends(UpdatablePropsNonDestructiveComponent, _super);
    function UpdatablePropsNonDestructiveComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.removeChildrenOnUpdate = false;
        return _this;
    }
    return UpdatablePropsNonDestructiveComponent;
}(UpdatablePropsComponent));
exports.UpdatablePropsNonDestructiveComponent = UpdatablePropsNonDestructiveComponent;

},{".":19}],23:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
function emptyAllChildren(e) {
    Array.from(e.children).forEach(function (c) { emptyAllChildren(c); e.removeChild(c); });
    e.innerHTML = '';
}
exports.emptyAllChildren = emptyAllChildren;
function isSvgTag(t) {
    var r = new RegExp("^" + t + "$", 'i');
    return SvgTags.some(function (name) { return r.test(name); });
}
exports.isSvgTag = isSvgTag;
var SvgTags = ['path', 'svg', 'use', 'g'];

},{}]},{},[11]);
