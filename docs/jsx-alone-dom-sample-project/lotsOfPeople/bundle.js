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
;
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
;
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
;
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

},{"./JsonImpl":1,"./createElement":2,"./elementClass":3,"./elementImpl":4,"./misc":6,"./style":7,"./util":8}],6:[function(require,module,exports){
(function (global){
;
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
;
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

},{}],9:[function(require,module,exports){
;
const jsx_alone_dom_1 = require("jsx-alone-dom");
const jsx_alone_core_1 = require("jsx-alone-core");
exports.lotsOfPeopleRenderer = (app, config) => {
    const onloadT0 = Date.now();
    window.onload = () => {
        const onloadT = Date.now() - onloadT0;
        document.getElementById('timings_onload').innerHTML = jsx_alone_core_1.printMs(onloadT);
        document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
        document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
        document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
    };
    const JSXAloneRenderT0 = Date.now();
    const el = jsx_alone_dom_1.JSXAlone.render(app);
    const JSXAloneRenderT = Date.now() - JSXAloneRenderT0;
    let root = document.getElementById('jsx-alone-sample-project-code');
    if (root) {
        root.remove();
    }
    root = document.createElement('div');
    root.setAttribute('id', 'jsx-alone-sample-project-code');
    root.appendChild(el);
    document.body.appendChild(root);
    document.getElementById('timings_onload').innerHTML = 'N/E';
    document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
    document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
    document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
    return { el: root, JSXAloneRenderT };
};

},{"jsx-alone-core":5,"jsx-alone-dom":15}],10:[function(require,module,exports){
;
const jsx_alone_sample_project_code_1 = require("jsx-alone-sample-project-code");
const lotsOfPeopleRenderer_1 = require("./lotsOfPeopleRenderer");
const jsx_alone_dom_1 = require("jsx-alone-dom");
jsx_alone_sample_project_code_1.lotsOfPeople(lotsOfPeopleRenderer_1.lotsOfPeopleRenderer, undefined, jsx_alone_dom_1.JSXAlone);

},{"./lotsOfPeopleRenderer":9,"jsx-alone-dom":15,"jsx-alone-sample-project-code":18}],11:[function(require,module,exports){
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
var event_1 = require("./event");
var refs_1 = require("./refs");
function buildJSXALone() {
    var Module = {
        createElement: jsx_alone_core_1.createCreateElement(getCreateCreateElementConfig()),
        render: function (elementLike, config) {
            var el = elementLike;
            var almostCompleteConfig = __assign({}, config, { rootElementLike: el });
            var rootHTMLElement = el.buildRootElement(almostCompleteConfig);
            var eventManager = new event_1.RootEventManager(rootHTMLElement);
            var completeConfig = __assign({}, almostCompleteConfig, { eventManager: eventManager, rootHTMLElement: rootHTMLElement });
            Module.lastEventManager = eventManager;
            return el.render(completeConfig);
        },
        createRef: function () {
            return new refs_1.RefObjectImpl();
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
            }
        };
    }
    return createCreateElementConfig;
}
exports.getCreateCreateElementConfig = getCreateCreateElementConfig;
exports.JSXAlone = buildJSXALone();

},{".":15,"./event":14,"./refs":17,"jsx-alone-core":5}],12:[function(require,module,exports){
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
;
var jsx_alone_core_1 = require("jsx-alone-core");
var ElementClass = (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ElementClass.prototype, "eventManager", {
        get: function () {
            return this._eventManager;
        },
        enumerable: true,
        configurable: true
    });
    ElementClass.prototype.setContainerEl = function (el) {
        this.containerEl = el;
    };
    ElementClass.prototype.destroy = function () {
        this.eventManager && this.eventManager.uninstall();
    };
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;

},{"jsx-alone-core":5}],13:[function(require,module,exports){
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
;
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
        var el = config.rootHTMLElement || this.buildRootElement(config);
        Object.keys(this.attrs).forEach(function (attribute) {
            var value = _this.attrs[attribute];
            if (attribute === 'className') {
                el.setAttribute('class', value);
            }
            else if (attribute === 'style') {
                el.setAttribute('style', jsx_alone_core_1.printStyleHtmlAttribute(value));
            }
            else if (typeof value === 'function') {
                config.eventManager.addEventListener(el, attribute.replace(/^on/, '').toLowerCase(), value.bind(_this));
            }
            else {
                el.setAttribute(attribute, value);
            }
        });
        if (this._innerHtml) {
            el.innerHTML = this._innerHtml;
        }
        else {
            var parent_1 = config.appendChildrenInDocumentFragment ? document.createDocumentFragment() : el;
            this.children.forEach(function (c) {
                c.render(__assign({}, config, { parent: parent_1, rootHTMLElement: undefined }));
            });
            if (el !== parent_1) {
                el.appendChild(parent_1);
            }
        }
        if (config.parent) {
            config.parent.appendChild(el);
        }
        var elementClassWithContainer = this._elementClassInstance || config.rootElementLike._elementClassInstance;
        if (this.ref) {
            refs_1.setRef({ elementLike: this, el: el, value: this.ref });
        }
        if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
            elementClassWithContainer._eventManager = config.eventManager;
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
function isSvgTag(t) {
    var r = new RegExp("^" + t + "$", 'i');
    return SvgTags.some(function (name) { return r.test(name); });
}
var SvgTags = ['path', 'svg', 'use', 'g'];

},{"./refs":17,"jsx-alone-core":5}],14:[function(require,module,exports){
;
var mark_1 = require("./mark");
var jsx_alone_core_1 = require("jsx-alone-core");
var RootEventManager = (function () {
    function RootEventManager(root, debug) {
        this.root = root;
        this.debug = debug;
        this.registeredByType = {};
        this.mark = '_jsxa_e' + jsx_alone_core_1.unique('_');
        this.rootListener = this.rootListener.bind(this);
    }
    RootEventManager.prototype.markElement = function (el) {
        return mark_1.markElement(el, this.mark);
    };
    RootEventManager.prototype.getElementMark = function (e) {
        return mark_1.getElementMark(e, this.mark);
    };
    RootEventManager.prototype.rootListener = function (e) {
        if (e.target) {
            var mark_2 = this.getElementMark(e.target);
            var entry = mark_2 && (this.registeredByType[e.type.toLowerCase()] || []).find(function (e) { return e.mark === mark_2; });
            if (entry) {
                entry.fn(e);
            }
        }
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
    };
    RootEventManager.prototype.removeListeners = function (el, types) {
        var _this = this;
        var mark = this.getElementMark(el);
        if (mark) {
            (types || Object.keys(this.registeredByType).map(function (t) { return t.toLowerCase(); })).forEach(function (t) {
                _this.registeredByType[t] = (_this.registeredByType[t] || []).filter(function (e) { return e.mark !== mark; });
            });
        }
    };
    RootEventManager.prototype.uninstall = function (types) {
        var _this = this;
        (types || Object.keys(this.registeredByType).map(function (t) { return t.toLowerCase(); })).forEach(function (t) {
            _this.registeredByType[t].map(function (e) { return e.fn; }).forEach(function (listener) {
                _this.root.removeEventListener(t, listener);
            });
            _this.registeredByType[t] = [];
        });
    };
    return RootEventManager;
}());
exports.RootEventManager = RootEventManager;

},{"./mark":16,"jsx-alone-core":5}],15:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./elementImpl"));
__export(require("./createElement"));
var event_1 = require("./event");
exports.RootEventManager = event_1.RootEventManager;
__export(require("./elementClass"));

},{"./createElement":11,"./elementClass":12,"./elementImpl":13,"./event":14}],16:[function(require,module,exports){
;
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

},{"jsx-alone-core":5}],17:[function(require,module,exports){
;
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

},{"./mark":16}],18:[function(require,module,exports){
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
var renderApp_1 = require("./lotsOfPeople/renderApp");
exports.lotsOfPeople = renderApp_1.renderApp;
__export(require("./util"));

},{"./lotsOfPeople/renderApp":21,"./util":22}],19:[function(require,module,exports){
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
;
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

},{"jsx-alone-core":5}],20:[function(require,module,exports){
;
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

},{"../util":22,"jsx-alone-core":5}],21:[function(require,module,exports){
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

},{"./App":19,"./model":20,"jsx-alone-core":5}],22:[function(require,module,exports){
;
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

},{"jsx-alone-core":5}]},{},[10]);
