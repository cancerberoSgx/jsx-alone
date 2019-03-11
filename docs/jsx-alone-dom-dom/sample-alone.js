(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("../document");
const doc = new document_1.MDocument();
const d = doc.createElement('div');
d.setAttribute('id', 'i1');
doc.body.appendChild(d);
const c = doc.createElement('span');
d.setAttribute('class', 'ccc');
d.appendChild(c);
c.appendChild(doc.createTextNode('This was generated using jsx-alone-dom-dom little DOM  implementation'));
window.document.getElementById('output').innerText = d.outerHTML;

},{"../document":2}],2:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const element_1 = require("./element");
const text_1 = require("./text");
class MDocument extends node_1.MNode {
    constructor() {
        super(node_1.MNode.DOCUMENT_TYPE_NODE);
        this.head = new MHeadElement('head', this);
        this.body = new MBodyElement('body', this);
    }
    createElement(t) {
        return new element_1.MElement(t, this);
    }
    createTextNode(content) {
        return new text_1.MTextNode(content, this);
    }
}
exports.MDocument = MDocument;
class MHeadElement extends element_1.MElement {
}
class MBodyElement extends element_1.MElement {
}

},{"./element":3,"./node":5,"./text":6}],3:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
class MElement extends node_1.MNode {
    constructor(tagName, ownerDocument) {
        super(node_1.MNode.ELEMENT_NODE);
        this.tagName = tagName;
        this.children = new ElementList(this._children);
        this._ownerDocument = ownerDocument;
    }
    get textContent() {
        return !this.childNodes || this.childNodes.length === 0 ? '' : Array.from(this.childNodes || []).map(c => c.textContent).join('');
    }
    set textContent(c) {
        this._textContent = c;
    }
    get id() {
        return this.getAttribute('id');
    }
    set id(id) {
        this.setAttribute('id', id);
    }
}
exports.MElement = MElement;
class ElementList {
    constructor(list) {
        this.list = list;
    }
    item(i) {
        return this.list[i] || undefined;
    }
    get length() {
        return this.list.length;
    }
}

},{"./node":5}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
class MEventTarget {
    addEventListener(type, listener, options) {
        throw new Error('not implemented');
    }
    removeEventListener(type, callback, options) {
        throw new Error('not implemented');
    }
}
exports.MEventTarget = MEventTarget;

},{}],5:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
const nodeHtml_1 = require("./util/nodeHtml");
class MNode extends event_1.MEventTarget {
    constructor(nodeType) {
        super();
        this.nodeType = nodeType;
        this._attributes = {};
        this._children = [];
        this._ownerDocument = null;
        this._textContent = null;
        this._parentNode = null;
        this._children = [];
        this.childNodes = new NodeList(this._children);
        this.attributes = new NamedNodeMap(this._attributes);
    }
    get ownerDocument() {
        return this._ownerDocument;
    }
    get textContent() {
        return this._textContent;
    }
    set textContent(c) {
        this._textContent = c;
    }
    get parentNode() {
        return this._parentNode;
    }
    get innerHTML() {
        return nodeHtml_1.nodeHtml(this, false);
    }
    set innerHTML(id) {
        throw 'not implemented';
    }
    get outerHTML() {
        return nodeHtml_1.nodeHtml(this, true);
    }
    set outerHTML(id) {
        throw 'not implemented';
    }
    getAttribute(a) {
        return this._attributes[a] ? this._attributes[a].value : null;
    }
    setAttribute(a, v) {
        return this._attributes[a] = { value: v, name: a };
    }
    appendChild(c) {
        this._children.push(c);
        c._parentNode = this;
    }
    isEqualNode(otherNode) {
        return false;
    }
    replaceWith(...nodes) {
        const children = this._parentNode._children;
        children.splice(children.indexOf(this), 1, ...nodes.map(n => typeof n === 'string' ? this.ownerDocument.createTextNode(n) : n));
    }
}
MNode.DOCUMENT_TYPE_NODE = 10;
MNode.TEXT_NODE = 3;
MNode.ELEMENT_NODE = 1;
MNode._WATERMARK = 'jsx-alone-dom-dom';
exports.MNode = MNode;
class NodeList {
    constructor(list) {
        this.list = list;
    }
    [Symbol.iterator]() {
        return this.list[Symbol.iterator]();
    }
    get length() {
        return this.list.length;
    }
    item(i) {
        return this.list[i] || null;
    }
}
class NamedNodeMap {
    constructor(map) {
        this.map = map;
    }
    [Symbol.iterator]() {
        return Object.values(this.map)[Symbol.iterator]();
    }
    get length() {
        return Object.keys(this.map).length;
    }
    item(i) {
        return Object.values(this.map)[i] || null;
    }
}

},{"./event":4,"./util/nodeHtml":7}],6:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
class MTextNode extends node_1.MNode {
    constructor(_textContent, ownerDocument) {
        super(node_1.MNode.TEXT_NODE);
        this._textContent = _textContent;
        this._ownerDocument = ownerDocument;
    }
}
exports.MTextNode = MTextNode;

},{"./node":5}],7:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
const nodeUtil_1 = require("./nodeUtil");
function nodeHtml(node, outer = true) {
    if (!nodeUtil_1.isElement(node)) {
        return node.textContent + '';
    }
    const attrs = Array.from(node.attributes);
    return `${outer ? `<${node.tagName.toLowerCase()}${attrs.length ? ' ' : ''}${attrs.map(a => a.value && `${a.name}="${a.value.toString ? a.value.toString() : a.value}"`)
        .filter(a => a)
        .join(' ')}>` : ``}${Array.from(node.childNodes).map(c => nodeHtml(c)).join('')}${outer ? `</${node.tagName.toLowerCase()}>` : ``}`;
}
exports.nodeHtml = nodeHtml;

},{"./nodeUtil":8}],8:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", { value: true });
function nodeTypes(n) {
    const o = [];
    visitChildNodes(n, c => o.push(c.nodeType));
    return o;
}
exports.nodeTypes = nodeTypes;
function nodeTexts(n) {
    return mapChildNodes(n, c => c.textContent);
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
    return mapChildNodes(n, c => {
        if (isElement(c)) {
            const attrs = [];
            Array.from(c.attributes).forEach(a => attrs.push({ name: a.name, value: a.value }));
            return attrs;
        }
        else {
            return null;
        }
    });
}
exports.nodeAttributes = nodeAttributes;
function visitChildNodes(n, v) {
    v(n);
    Array.from(n.childNodes).forEach(c => visitChildNodes(c, v));
}
exports.visitChildNodes = visitChildNodes;
function mapChildNodes(n, v) {
    const o = [];
    visitChildNodes(n, c => o.push(v(c)));
    return o;
}
exports.mapChildNodes = mapChildNodes;

},{}]},{},[1]);
