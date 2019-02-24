(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementImpl_1 = require("./elementImpl");
const throwOnUnrecognized = false;
function debug(err) {
    if (throwOnUnrecognized) {
        throw err;
    }
    else {
        console.error(err);
    }
}
exports.debug = debug;
function createCreateElement(impl, textNodeImpl) {
    return function createElement(tag, attrs = {}, ...children) {
        var element;
        if (typeof tag === 'string') {
            element = new impl(tag);
        }
        else {
            if (elementImpl_1.isJSXAloneComponent(tag)) {
                element = new tag(Object.assign({}, attrs, { children: children })).render();
            }
            else {
                element = tag(Object.assign({}, attrs, { children: children }));
            }
            attrs = {};
        }
        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                var value = attrs[name];
                if (typeof value === 'boolean') {
                    if (value === true) {
                        element.setAttribute(name, name);
                    }
                }
                else if (typeof value === 'function') {
                    const code = `_this = __this__ = this; (${value.toString()}).apply(_this, arguments)`;
                    const escaped = code.replace(/\"/gim, '&quot;');
                    element.setAttribute(name, escaped);
                }
                else if (value !== false && value != null) {
                    if (name === 'className') {
                        if (typeof value === 'string') {
                            element.setAttribute('class', value);
                        }
                        else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
                            element.setAttribute('class', value.join(' '));
                        }
                        else {
                            debug(`unrecognized className value ${typeof value} ${value}`);
                        }
                    }
                    else {
                        element.setAttribute(name, value.toString());
                    }
                }
                else if (typeof value === 'object') {
                    if (name === 'style') {
                        element.setAttribute('style', `${Object.keys(value)
                            .map(p => `${p}: ${value[p]}`)
                            .join('; ')}`);
                    }
                    else if (name === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
                        element.dangerouslySetInnerHTML(value.__html);
                    }
                    else {
                        debug(`unrecognized object attribute "${name}" - the only object attribute supported is "style"`);
                    }
                }
                else {
                    debug(`unrecognized attribute "${name}" with type ${typeof value}`);
                }
            }
        }
        if (typeof tag === 'string') {
            // don't render children for function or classes since they are responsible of render their own children
            children
                .filter(c => c)
                .forEach(child => {
                if (elementImpl_1.isNode(child)) {
                    element.appendChild(child);
                }
                else if (Array.isArray(child)) {
                    child.forEach(c => {
                        if (typeof c === 'string') {
                            element.appendChild(new textNodeImpl(c));
                        }
                        else if (elementImpl_1.isNode(c)) {
                            element.appendChild(c);
                        }
                        else {
                            debug(`Child is not a node or string: ${c} , tag: ${tag}`);
                        }
                    });
                }
                else {
                    element.appendChild(new textNodeImpl(child));
                }
            });
        }
        return element;
    };
}
exports.createCreateElement = createCreateElement;

},{"./elementImpl":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementImpl_1 = require("./elementImpl");
/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */
class AbstractElementClass {
    constructor(props) {
        this.props = props;
        this.props = props;
    }
    childrenAsArray() {
        return (Array.isArray(this.props.children) ? this.props.children : [this.props.children]);
    }
    childrenElementsAsArray() {
        return this.childrenAsArray().filter(c => elementImpl_1.isElementLike(c));
    }
    firstChildElement() {
        return this.childrenAsArray().find(e => true);
    }
}
exports.AbstractElementClass = AbstractElementClass;

},{"./elementImpl":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");
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
class AbstractTextNodeLike {
    constructor(content) {
        this.content = content;
    }
}
exports.AbstractTextNodeLike = AbstractTextNodeLike;
class AbstractElementLike {
    constructor(tag) {
        this.tag = tag;
        this.attrs = {};
        this.children = [];
    }
    setAttribute(name, value) {
        this.attrs[name] = value;
    }
    appendChild(c) {
        this.children.push(c);
        if (isElementLike(c)) {
            c.parentElement = this;
        }
    }
    findDescendant(p) {
        let found;
        this.children.some(c => {
            if (isElementLike(c)) {
                if (p(c)) {
                    found = c;
                }
                else {
                    found = c.findDescendant(p);
                }
            }
            return !!found;
        });
        return found;
    }
    findAscendant(p) {
        if (this.parentElement) {
            if (p(this.parentElement)) {
                return this.parentElement;
            }
            return this.parentElement.findAscendant(p);
        }
    }
    getAscendants() {
        return this.parentElement ? [...this.parentElement.getAscendants(), this.parentElement] : [];
    }
    getRootAscendant() {
        const r = this.parentElement ? this.findAscendant(n => isElementLike(n) && !n.parentElement) : this;
        return misc_utils_of_mine_generic_1.checkThrow(r, 'No root ascendant found in element like tree!');
    }
    getSiblings() {
        if (this.parentElement) {
            return this.parentElement.children.filter(c => c !== this);
        }
        return [];
    }
    findSibling(p) {
        return this.getSiblings().find(p);
    }
    find(p) {
        // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
        return this.getRootAscendant().findDescendant(p);
    }
}
exports.AbstractElementLike = AbstractElementLike;

},{"misc-utils-of-mine-generic":12}],4:[function(require,module,exports){
"use strict";
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

},{"./createElement":1,"./elementClass":2,"./elementImpl":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./array":5,"./flat":6,"./prototypeFind":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));

},{"./formatDate":9,"./printMs":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./date"));

},{"./array":7,"./date":10,"./misc":13,"./string":17}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"../array":7,"./changeText":14,"./getPreviousMatchingPos":15,"./html":16,"./json":18,"./quote":19,"./shorter":20}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function quote(s, q = '"') {
    return q + s.replace(new RegExp(q, 'g'), '\\' + q) + q;
}
exports.quote = quote;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shorter(text, much = 10) {
    return text.trim().substring(0, Math.min(text.length, much)) + '...';
}
exports.shorter = shorter;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_alone_dom_1 = require("jsx-alone-dom");
// example element function
const TaskPageLink = (props) => jsx_alone_dom_1.JSXAlone.createElement("a", { href: `pages/tasks/${props.task}_small.html` }, props.children);
// example element class that renders some given information and uses Button
class App extends jsx_alone_dom_1.ElementClass {
    render() {
        return jsx_alone_dom_1.JSXAlone.createElement("article", null,
            jsx_alone_dom_1.JSXAlone.createElement("h3", null,
                "Welcome ",
                this.props.name,
                "!"),
            jsx_alone_dom_1.JSXAlone.createElement("p", null, "These are your tasks:"),
            jsx_alone_dom_1.JSXAlone.createElement("ul", null, this.props.tasks.map(task => jsx_alone_dom_1.JSXAlone.createElement("li", null,
                jsx_alone_dom_1.JSXAlone.createElement(TaskPageLink, { task: task }, task)))));
    }
}
// render the App and append the generated element to body
const app = jsx_alone_dom_1.JSXAlone.createElement(App, { name: "John Doe", tasks: ['Wash dishes', 'Go outside', 'Play soccer'] });
const el = jsx_alone_dom_1.JSXAlone.render(app);
document.body.appendChild(el);
// import { JSXAlone, ElementClass } from 'jsx-alone-dom'
// const Button = (props: { name: string; children: JSX.Element, onClick: ()=>void }) => (
//   <button
//     onClick={e=>props.onClick()}
//   >{props.children}</button>
// )
// const model: Model = {
// }
// interface Model {
//   todos: TODO[]
// }
// interface TODO{
//   name: string
//   description?: string
// }
// export class App extends ElementClass<Model> {
//   render() {
//     return <article>
//       <h3>Welcome {this.props.name}!</h3>
//     </article>
//   }
// }

},{"jsx-alone-dom":24}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_alone_core_1 = require("jsx-alone-core");
const elementImpl_1 = require("./elementImpl");
document.body.insertAdjacentHTML;
const Module = {
    createElement: jsx_alone_core_1.createCreateElement(elementImpl_1.ElementLikeImpl, elementImpl_1.TextNodeLikeImpl),
    render(el, config) {
        return el.render(config);
    }
};
exports.JSXAlone = Module;
// //@ts-ignore
// JSXAlone = Module // creates a global variable needed so emitted .js calls work. See tsconfig.json `"jsxFactory": "JSXAlone.createElement",`

},{"./elementImpl":23,"jsx-alone-core":4}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_alone_core_1 = require("jsx-alone-core");
class ElementLikeImpl extends jsx_alone_core_1.AbstractElementLike {
    // private _element: HTMLElement | undefined
    render(config = {}) {
        // const el = this._getElement()
        const el = document.createElement(this.tag);
        Object.keys(this.attrs).forEach(attribute => {
            el.setAttribute(attribute, this.attrs[attribute]);
        });
        if (this._innerHtml) {
            el.innerHTML = this._innerHtml;
        }
        this.children.forEach(c => {
            c.render(Object.assign({}, config, { parent: el }));
        });
        if (config.parent) {
            config.parent.appendChild(el);
        }
        return el;
    }
    // private _getElement(): HTMLElement {
    //   if (!this._element) {
    //     this._element = document.createElement(this.tag)
    //   }
    //   return this._element
    // }
    dangerouslySetInnerHTML(s) {
        this._innerHtml = s;
    }
}
exports.ElementLikeImpl = ElementLikeImpl;
class TextNodeLikeImpl extends jsx_alone_core_1.AbstractTextNodeLike {
    // private _node: Text | undefined
    render(config = {}) {
        // const n = this._getNode()
        const text = document.createTextNode(this.content);
        if (config.parent) {
            config.parent.appendChild(text);
        }
        return text;
    }
}
exports.TextNodeLikeImpl = TextNodeLikeImpl;
class ElementClass extends jsx_alone_core_1.AbstractElementClass {
}
exports.ElementClass = ElementClass;

},{"jsx-alone-core":4}],24:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./createElement"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;
__export(require("./misc"));

},{"./createElement":22,"./elementImpl":23,"./misc":25}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// TODO: like React.Fragment
exports.Fragment = (props) => _1.JSXAlone.createElement("span", null, props.children);
function Js(props) {
    const r = props.children();
    console.log(r);
    return r ? _1.JSXAlone.createElement(exports.Fragment, null, r) : null;
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
    const { c, p } = props;
    if (isNotFalsy(c))
        return props.children.apply(null, [...(p ? [p] : []), c]);
    else {
        return null;
    }
}
exports.If = If;
function isNotFalsy(a) { return !!a; }

},{".":24}]},{},[21]);
