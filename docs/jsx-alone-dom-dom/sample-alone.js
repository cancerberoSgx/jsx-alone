(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var document_1 = require("../document");
var doc = new document_1.MDocument();
var d = doc.createElement('div');
d.setAttribute('id', 'i1');
doc.body.appendChild(d);
var c = doc.createElement('span');
c.setAttribute('class', 'ccc');
d.appendChild(c);
c.appendChild(doc.createTextNode('This was generated using jsx-alone-dom-dom little DOM  implementation'));
window.document.getElementById('output').innerText = d.outerHTML;

},{"../document":2}],2:[function(require,module,exports){
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
var node_1 = require("./node");
var element_1 = require("./element");
var text_1 = require("./text");
var MDocument = (function (_super) {
    __extends(MDocument, _super);
    function MDocument() {
        var _this = _super.call(this, node_1.MNode.DOCUMENT_TYPE_NODE) || this;
        _this.head = new MHeadElement('head', _this);
        _this.body = new MBodyElement('body', _this);
        return _this;
    }
    MDocument.prototype.createElement = function (t) {
        return new element_1.MElement(t, this);
    };
    MDocument.prototype.createTextNode = function (content) {
        return new text_1.MTextNode(content, this);
    };
    return MDocument;
}(node_1.MNode));
exports.MDocument = MDocument;
var MHeadElement = (function (_super) {
    __extends(MHeadElement, _super);
    function MHeadElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MHeadElement;
}(element_1.MElement));
var MBodyElement = (function (_super) {
    __extends(MBodyElement, _super);
    function MBodyElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MBodyElement;
}(element_1.MElement));

},{"./element":3,"./node":5,"./text":6}],3:[function(require,module,exports){
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
var node_1 = require("./node");
var MElement = (function (_super) {
    __extends(MElement, _super);
    function MElement(tagName, ownerDocument) {
        var _this = _super.call(this, node_1.MNode.ELEMENT_NODE) || this;
        _this.tagName = tagName;
        _this.children = new ElementList(_this._children);
        _this._ownerDocument = ownerDocument;
        return _this;
    }
    Object.defineProperty(MElement.prototype, "textContent", {
        get: function () {
            return !this.childNodes || this.childNodes.length === 0 ? '' : Array.from(this.childNodes || []).map(function (c) { return c.textContent; }).join('');
        },
        set: function (c) {
            this._textContent = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MElement.prototype, "id", {
        get: function () {
            return this.getAttribute('id');
        },
        set: function (id) {
            this.setAttribute('id', id);
        },
        enumerable: true,
        configurable: true
    });
    return MElement;
}(node_1.MNode));
exports.MElement = MElement;
var ElementList = (function () {
    function ElementList(list) {
        this.list = list;
    }
    ElementList.prototype.item = function (i) {
        return this.list[i] || undefined;
    };
    Object.defineProperty(ElementList.prototype, "length", {
        get: function () {
            return this.list.length;
        },
        enumerable: true,
        configurable: true
    });
    return ElementList;
}());

},{"./node":5}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var MEventTarget = (function () {
    function MEventTarget() {
    }
    MEventTarget.prototype.addEventListener = function (type, listener, options) {
    };
    MEventTarget.prototype.removeEventListener = function (type, callback, options) {
    };
    return MEventTarget;
}());
exports.MEventTarget = MEventTarget;

},{}],5:[function(require,module,exports){
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
var event_1 = require("./event");
var nodeHtml_1 = require("./util/nodeHtml");
var MNode = (function (_super) {
    __extends(MNode, _super);
    function MNode(nodeType) {
        var _this = _super.call(this) || this;
        _this.nodeType = nodeType;
        _this._attributes = {};
        _this._children = [];
        _this._ownerDocument = null;
        _this._textContent = null;
        _this._parentNode = null;
        _this._children = [];
        _this.childNodes = new NodeList(_this._children);
        _this.attributes = new NamedNodeMap(_this._attributes);
        return _this;
    }
    Object.defineProperty(MNode.prototype, "ownerDocument", {
        get: function () {
            return this._ownerDocument;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MNode.prototype, "textContent", {
        get: function () {
            return this._textContent;
        },
        set: function (c) {
            this._textContent = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MNode.prototype, "parentNode", {
        get: function () {
            return this._parentNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MNode.prototype, "innerHTML", {
        get: function () {
            return nodeHtml_1.nodeHtml(this, false);
        },
        set: function (id) {
            throw 'not implemented';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MNode.prototype, "outerHTML", {
        get: function () {
            return nodeHtml_1.nodeHtml(this, true);
        },
        set: function (id) {
            throw 'not implemented';
        },
        enumerable: true,
        configurable: true
    });
    MNode.prototype.getAttribute = function (a) {
        return this._attributes[a] ? this._attributes[a].value : null;
    };
    MNode.prototype.setAttribute = function (a, v) {
        return this._attributes[a] = { value: v, name: a };
    };
    MNode.prototype.appendChild = function (c) {
        this._children.push(c);
        c._parentNode = this;
    };
    MNode.prototype.isEqualNode = function (otherNode) {
        return false;
    };
    MNode.prototype.replaceWith = function () {
        var _this = this;
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
        var children = this._parentNode._children;
        children.splice.apply(children, [children.indexOf(this), 1].concat(nodes.map(function (n) { return typeof n === 'string' ? _this.ownerDocument.createTextNode(n) : n; })));
    };
    MNode.DOCUMENT_TYPE_NODE = 10;
    MNode.TEXT_NODE = 3;
    MNode.ELEMENT_NODE = 1;
    MNode._WATERMARK = 'jsx-alone-dom-dom';
    return MNode;
}(event_1.MEventTarget));
exports.MNode = MNode;
var NodeList = (function () {
    function NodeList(list) {
        this.list = list;
    }
    NodeList.prototype[Symbol.iterator] = function () {
        return this.list[Symbol.iterator]();
    };
    Object.defineProperty(NodeList.prototype, "length", {
        get: function () {
            return this.list.length;
        },
        enumerable: true,
        configurable: true
    });
    NodeList.prototype.item = function (i) {
        return this.list[i] || null;
    };
    return NodeList;
}());
var NamedNodeMap = (function () {
    function NamedNodeMap(map) {
        this.map = map;
    }
    NamedNodeMap.prototype[Symbol.iterator] = function () {
        return Object.values(this.map)[Symbol.iterator]();
    };
    Object.defineProperty(NamedNodeMap.prototype, "length", {
        get: function () {
            return Object.keys(this.map).length;
        },
        enumerable: true,
        configurable: true
    });
    NamedNodeMap.prototype.item = function (i) {
        return Object.values(this.map)[i] || null;
    };
    return NamedNodeMap;
}());

},{"./event":4,"./util/nodeHtml":7}],6:[function(require,module,exports){
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
var node_1 = require("./node");
var MTextNode = (function (_super) {
    __extends(MTextNode, _super);
    function MTextNode(_textContent, ownerDocument) {
        var _this = _super.call(this, node_1.MNode.TEXT_NODE) || this;
        _this._textContent = _textContent;
        _this._ownerDocument = ownerDocument;
        return _this;
    }
    return MTextNode;
}(node_1.MNode));
exports.MTextNode = MTextNode;

},{"./node":5}],7:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
var nodeUtil_1 = require("./nodeUtil");
function nodeHtml(node, outer) {
    if (outer === void 0) { outer = true; }
    if (!nodeUtil_1.isElement(node)) {
        return node.textContent + '';
    }
    var attrs = Array.from(node.attributes);
    return "" + (outer ? "<" + node.tagName.toLowerCase() + (attrs.length ? ' ' : '') + attrs.map(function (a) { return a.value && a.name + "=\"" + (a.value.toString ? a.value.toString() : a.value) + "\""; })
        .filter(function (a) { return a; })
        .join(' ') + ">" : "") + Array.from(node.childNodes).map(function (c) { return nodeHtml(c); }).join('') + (outer ? "</" + node.tagName.toLowerCase() + ">" : "");
}
exports.nodeHtml = nodeHtml;

},{"./nodeUtil":8}],8:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
function nodeTypes(n) {
    var o = [];
    visitChildNodes(n, function (c) { return o.push(c.nodeType); });
    return o;
}
exports.nodeTypes = nodeTypes;
function nodeTexts(n) {
    return mapChildNodes(n, function (c) { return c.textContent; });
}
exports.nodeTexts = nodeTexts;
function isElement(n) {
    return n.nodeType === Node.ELEMENT_NODE;
}
exports.isElement = isElement;
function isText(n) {
    return n.nodeType === Node.TEXT_NODE;
}
exports.isText = isText;
function nodeAttributes(n) {
    return mapChildNodes(n, function (c) {
        if (isElement(c)) {
            var attrs_1 = [];
            Array.from(c.attributes).forEach(function (a) { return attrs_1.push({ name: a.name, value: a.value }); });
            return attrs_1;
        }
        else {
            return null;
        }
    });
}
exports.nodeAttributes = nodeAttributes;
function visitChildNodes(n, v) {
    v(n);
    Array.from(n.childNodes).forEach(function (c) { return visitChildNodes(c, v); });
}
exports.visitChildNodes = visitChildNodes;
function mapChildNodes(n, v) {
    var o = [];
    visitChildNodes(n, function (c) { return o.push(v(c)); });
    return o;
}
exports.mapChildNodes = mapChildNodes;

},{}]},{},[1]);
