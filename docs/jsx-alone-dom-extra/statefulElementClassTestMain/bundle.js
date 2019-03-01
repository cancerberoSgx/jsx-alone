(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
;
const _1 = require("./");
const createElement_1 = require("./createElement");
const elementClass_1 = require("./elementClass");
class JsonImplElementLikeImpl extends _1.AbstractElementLike {
    render(config = {}) {
        return {
            tag: this.tag,
            innerHtml: this.innerHtml,
            attrs: this.attrs,
            children: this.children.map(c => (Object.assign({}, c, { parentElement: undefined })))
        };
    }
    dangerouslySetInnerHTML(s) {
        this.innerHtml = s;
    }
}
exports.JsonImplElementLikeImpl = JsonImplElementLikeImpl;
class JsonImplTextNodeLikeImpl extends _1.AbstractTextNodeLike {
    render(config) {
        return { content: this.content };
    }
}
exports.JsonImplTextNodeLikeImpl = JsonImplTextNodeLikeImpl;
class JsonImplElementClass extends elementClass_1.AbstractElementClass {
}
exports.JsonImplElementClass = JsonImplElementClass;
exports.JSXAloneJsonImpl = {
    createElement: createElement_1.createCreateElement({ impl: JsonImplElementLikeImpl, textNodeImpl: JsonImplTextNodeLikeImpl }),
    render(el, config = {}) {
        return el.render(config);
    }
};

},{"./":5,"./createElement":2,"./elementClass":3}],2:[function(require,module,exports){
"use strict";
;
const elementImpl_1 = require("./elementImpl");
function createCreateElement(config) {
    const { impl, textNodeImpl, onElementReady, onElementCreated: onElementCreate } = config;
    const createElement = function (tag, attrs = {}, ...children) {
        let element;
        let elementClassInstance;
        const tagIsString = typeof tag === 'string';
        attrs = attrs || {};
        if (tagIsString) {
            element = new impl(tag);
        }
        else if (elementImpl_1.isElementClassConstructor(tag)) {
            elementClassInstance = new tag(Object.assign({}, attrs, { children }));
            element = elementClassInstance.render();
        }
        else {
            element = tag(Object.assign({}, attrs, { children }));
        }
        if (onElementCreate) {
            onElementCreate({ elementLike: element, elementClassInstance, attrs });
        }
        // HEADS UP non intrinsic els are responsible of rendering their own attributes and children
        if (tagIsString) {
            Object.keys(attrs).forEach(name => {
                const value = attrs[name];
                const type = typeof value;
                if (type === 'string' || type === 'number') {
                    element.setAttribute(name, value);
                }
                else if (type === 'function') {
                    element.setAttribute(name, value);
                }
                else if (value === false) {
                    // do nothing
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
                .filter(c => c)
                .forEach(child => {
                if (elementImpl_1.isNode(child)) {
                    element.appendChild(child);
                }
                else if (Array.isArray(child)) {
                    child.forEach(c => {
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

},{"./elementImpl":4}],3:[function(require,module,exports){
"use strict";
;
/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */
class ElementClass {
    constructor(props) {
        this.props = props;
    }
}
exports.ElementClass = ElementClass;
class AbstractElementClass extends ElementClass {
}
exports.AbstractElementClass = AbstractElementClass;

},{}],4:[function(require,module,exports){
"use strict";
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
}
exports.AbstractElementLike = AbstractElementLike;

},{}],5:[function(require,module,exports){
"use strict";
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
"use strict";
;
const _1 = require(".");
// // TODO: like React.Fragment
// export const Fragment = (props: { children: Children }) => <span>{props.children}</span>
function Js(props) {
    const r = props.children();
    console.log(r);
    return r ? _1.AbstractJSXAlone.createElement("span", null, r) : null;
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
    // TODO: issue in dom implementation, children is an array
    const f = Array.isArray(props.children) ? props.children[0] : props.children;
    const { c, p } = props;
    if (isNotFalsy(c))
        return f.apply(null, [...(p ? [p] : []), c]);
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
"use strict";
;
const _1 = require(".");
/** Render the <style> tag with all classes and styles inside. Usage example:
```
const fieldTable: ClassRule = {
  selectorPostfix: ' td',
  border: '1px solid #aaaaaa',
  padding: '2px'
}
const sublistFieldTable: ClassRule = {
  ...fieldTable,
  fontSize: '0.95em',
  border: '1px solid #ededed'
}
const messageFromRedirect: ClassRule = {
  border: '2px solid green'
}
const { styles, classes } = Styles({ fieldTable, sublistFieldTable, messageFromRedirect})
return <div>
  <Style classes={styles}></Style>
  <p className={classes.messageFromRedirect}>{props.msg}</p>
    ```
*/
exports.Style = (props) => {
    function indent(n) {
        return props.renderConfig && props.renderConfig.indent ? _1.indent(n) : '';
    }
    function fixProperty(s) {
        let t;
        while (t = /([A-Z])/.exec(s)) {
            s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
        }
        return s;
    }
    // return new AbstractElementLike()
    return JSXAlone.createElement("style", null, Object.keys(props.classes).map(c => `${indent(1)}.${c}${(props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '')} {${Object.keys(props.classes[c]).filter(p => p !== 'selectorPostfix').map(p => `
${indent(2)}${fixProperty(p)}: ${props.classes[c][p]};`).join(``)}
}`).join('\n'));
};
/** build a styles and classnames from a class styles mapped object so is easy to type-check classnames and use them . See `Style` for usage example */
function Styles(styles) {
    const classes = {};
    Object.keys(styles).forEach(k => {
        classes[k] = k;
    });
    return {
        styles, classes
    };
}
exports.Styles = Styles;

},{".":5}],8:[function(require,module,exports){
"use strict";
;
function checkThrow(r, msg = 'Throwing on undefined value') {
    if (!r) {
        throw new Error(msg);
    }
    return r;
}
exports.checkThrow = checkThrow;
// export function tryTo<F extends (...args: any[]) => any>(f: F): ReturnType<F> | undefined {
//   try {
//     return f()
//   } catch (error) {
//   }
// }
function array(n, sample) {
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(typeof sample === 'undefined' ? i : sample);
    }
    return a;
}
exports.array = array;
function repeat(n, s) {
    return array(n, s).join('');
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
function randomIntBetween(a, b) {
    return Math.floor(Math.random() * b) + a;
}
exports.randomIntBetween = randomIntBetween;
function randomItem(array) {
    return array[randomIntBetween(0, array.length)];
}
exports.randomItem = randomItem;
function printMs(ms, config = { minutes: false, seconds: true, ms: true }) {
    config = Object.assign({ minutes: false, seconds: true, ms: true }, config);
    const seconds = config.seconds && Math.floor(ms / 1000);
    const minutes = config.minutes && seconds && Math.floor(seconds / 60);
    const milliseconds = config.ms && Math.floor(ms % 1000 || ms);
    return `${minutes ? `${minutes} minutes ` : ''}${seconds ? `${seconds} seconds ` : ''}${milliseconds ? `${milliseconds} ms ` : ''}`;
}
exports.printMs = printMs;
function printStyleHtmlAttribute(value) {
    return `${Object.keys(value)
        .map(p => `${p}: ${value[p]}`)
        .join('; ')}`;
}
exports.printStyleHtmlAttribute = printStyleHtmlAttribute;
let _unique = 0;
function unique(prefix = '_') {
    return prefix + _unique++;
}
exports.unique = unique;

},{}],9:[function(require,module,exports){
"use strict";
;
const _1 = require("./");
const StatefulComponent_1 = require("./StatefulComponent");
/**
 * implements stateful-ness by re-rendering it self again and again when the state changes. So it destroy its current
 * DOM nodes when the state changes and recreates them all again. Has some hacks to maintain current focus and children
 * state.
 *
 * Preserves focus.
 *
 * TODO: event listeners are not removed
 *
 * TODO: parent re-render actually resets the children (ISSUE)
 */
class DestructiveDomRenderComponent extends StatefulComponent_1.StatefulComponent {
    /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
     * Notice that descendant elements will be destroyed and */
    setState(s) {
        super.setState(s);
        if (!this.containerEl) {
            throw new Error('this.containerEl is undefined - cannot DestructiveDomRender');
        }
        let activePath;
        let selection = { start: 0, end: 0 };
        if (document.activeElement) {
            activePath = getXPathOfElement(document.activeElement);
            selection = {
                start: document.activeElement.selectionStart || 0,
                end: document.activeElement.selectionEnd || 0,
                direction: document.activeElement.selectionDirection || undefined
            };
        }
        const jsx = this.render();
        const el = _1.JSXAlone.render(jsx);
        this.containerEl.parentElement.replaceChild(el, this.containerEl);
        this.containerEl = el;
        if (activePath) {
            const activeEl = getElementByXPath(activePath + '');
            if (activeEl && selection) {
                activeEl.focus();
                if (activeEl.setSelectionRange) {
                    activeEl.setSelectionRange(selection.start, selection.end, selection.direction);
                }
            }
        }
    }
}
exports.DestructiveDomRenderComponent = DestructiveDomRenderComponent;
//  TODO: move to misc
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
        const sames = Array.from(el.parentNode.children).filter(x => x.tagName == el.tagName);
        return (getXPathOfElement(el.parentNode) +
            '/' +
            (el.tagName || '').toLowerCase() +
            (sames.length > 1 ? '[' + (sames.indexOf(el) + 1) + ']' : ''));
    }
    else {
        return undefined;
    }
}
//  TODO: move to misc
function getElementByXPath(path, predicate) {
    const p = document.evaluate(path, document, null, 0, null);
    if (!predicate) {
        return p.iterateNext();
    }
    try {
        let n;
        let n2;
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
"use strict";
;
const _1 = require("./");
class StatefulComponent extends _1.ElementClass {
    constructor(p) {
        super(p);
        this.state = {};
        this.state = Object.assign({}, p);
    }
    /** changes the state, clean up containerEl and renders the element again and append it to containerEl.
     * Notice that descendant elements will be destroyed and */
    setState(s) {
        // @ts-ignore
        this.state = Object.assign({}, this.state, s);
    }
}
exports.StatefulComponent = StatefulComponent;

},{"./":14}],11:[function(require,module,exports){
"use strict";
;
const statefulElementClassTestRenderApp_1 = require("./statefulElementClassTestRenderApp");
statefulElementClassTestRenderApp_1.statefulElementClassTestRenderApp();

},{"./statefulElementClassTestRenderApp":12}],12:[function(require,module,exports){
"use strict";
;
const __1 = require("..");
const DestructiveDomRenderComponent_1 = require("../DestructiveDomRenderComponent");
function statefulElementClassTestRenderApp() {
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    const el = __1.JSXAlone.render(__1.JSXAlone.createElement(App, { people: [{ name: 'seba' }, { name: 'lau' }] }), { parent });
    parent.appendChild(el);
    return parent;
}
exports.statefulElementClassTestRenderApp = statefulElementClassTestRenderApp;
class Repeater extends DestructiveDomRenderComponent_1.DestructiveDomRenderComponent {
    constructor(p) {
        super(p);
        this.state = Object.assign({}, p);
    }
    render() {
        return (__1.JSXAlone.createElement("div", { className: "Repeater" },
            "Write something:",
            __1.JSXAlone.createElement("input", { value: this.state.value, onKeyUp: e => {
                    this.setState({ value: e.currentTarget.value });
                } }),
            __1.JSXAlone.createElement("br", null),
            "Will be repeated: ",
            __1.JSXAlone.createElement("span", null, this.state.value),
            ' '));
    }
}
class App extends DestructiveDomRenderComponent_1.DestructiveDomRenderComponent {
    constructor(p) {
        super(p);
        this.state = Object.assign({}, p);
    }
    render() {
        return (__1.JSXAlone.createElement("div", { className: "App" },
            __1.JSXAlone.createElement("button", { id: "add", onClick: e => this.setState({ people: [...this.state.people, { name: 'random name ' + Math.random() }] }) }, "add"),
            __1.JSXAlone.createElement("ul", null, this.state.people.map(p => (__1.JSXAlone.createElement("li", { "data-id": p.name },
                __1.JSXAlone.createElement(Repeater, { value: p.name }),
                __1.JSXAlone.createElement("button", { className: "remove", onClick: e => {
                        this.setState({ people: this.state.people.filter(p2 => p2.name !== p.name) });
                    } }, "remove")))))));
    }
    setState(s) {
        this.state = Object.assign({}, this.state, s);
        this.containerEl.innerHTML = '';
        this.containerEl.appendChild(__1.JSXAlone.render(this.render()));
    }
}

},{"..":14,"../DestructiveDomRenderComponent":9}],13:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
const jsx_alone_dom_1 = require("jsx-alone-dom");
exports.ElementClass = jsx_alone_dom_1.ElementClass;
exports.createCreateConfig = Object.assign({}, jsx_alone_dom_1.getCreateCreateElementConfig(), { impl: jsx_alone_dom_1.ElementLikeImpl, textNodeImpl: jsx_alone_dom_1.TextNodeLikeImpl });
exports.JSXAlone = {
    createElement: jsx_alone_core_1.createCreateElement(exports.createCreateConfig),
    render: jsx_alone_dom_1.JSXAlone.render,
    createRef: jsx_alone_dom_1.JSXAlone.createRef
};

},{"jsx-alone-core":5,"jsx-alone-dom":19}],14:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./createElement"));
__export(require("./StatefulComponent"));
__export(require("./DestructiveDomRenderComponent"));
// export * from './UpdateDomComponent'

},{"./DestructiveDomRenderComponent":9,"./StatefulComponent":10,"./createElement":13}],15:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
const _1 = require(".");
const event_1 = require("./event");
const refs_1 = require("./refs");
function buildJSXALone() {
    const Module = {
        createElement: jsx_alone_core_1.createCreateElement(getCreateCreateElementConfig()),
        render(elementLike, config) {
            const el = elementLike;
            const almostCompleteConfig = Object.assign({}, config, { rootElementLike: el });
            const rootHTMLElement = el.buildRootElement(almostCompleteConfig);
            const eventManager = new event_1.RootEventManager(rootHTMLElement);
            const completeConfig = Object.assign({}, almostCompleteConfig, { eventManager, rootHTMLElement });
            Module.lastEventManager = eventManager;
            return el.render(completeConfig);
        },
        createRef() {
            return new refs_1.RefObjectImpl();
        }
    };
    return Module;
}
let createCreateElementConfig;
function getCreateCreateElementConfig() {
    if (!createCreateElementConfig) {
        createCreateElementConfig = {
            impl: _1.ElementLikeImpl,
            textNodeImpl: _1.TextNodeLikeImpl,
            onElementCreated({ elementLike, elementClassInstance, attrs }) {
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
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
/** Base Element Class. Has support for removing event listeners thought this.eventManager which is assigned as property at render time and is responsible of event delegation. */
class ElementClass extends jsx_alone_core_1.ElementClass {
    get eventManager() {
        return this._eventManager;
    }
    setContainerEl(el) {
        this.containerEl = el;
    }
    destroy() {
        this.eventManager && this.eventManager.uninstall();
    }
}
exports.ElementClass = ElementClass;

},{"jsx-alone-core":5}],17:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
const refs_1 = require("./refs");
class ElementLikeImpl extends jsx_alone_core_1.AbstractElementLike {
    buildRootElement(config) {
        return isSvgTag(this.tag)
            ? document.createElementNS('http://www.w3.org/2000/svg', this.tag)
            : document.createElement(this.tag);
    }
    render(config) {
        const el = config.rootHTMLElement || this.buildRootElement(config);
        Object.keys(this.attrs).forEach(attribute => {
            const value = this.attrs[attribute];
            if (attribute === 'className') {
                el.setAttribute('class', value);
            }
            else if (attribute === 'style') {
                el.setAttribute('style', jsx_alone_core_1.printStyleHtmlAttribute(value));
            }
            else if (typeof value === 'function') {
                config.eventManager.addEventListener(el, attribute.replace(/^on/, '').toLowerCase(), value.bind(this));
            }
            else {
                el.setAttribute(attribute, value);
            }
        });
        if (this._innerHtml) {
            el.innerHTML = this._innerHtml;
        }
        else {
            const parent = config.appendChildrenInDocumentFragment ? document.createDocumentFragment() : el;
            this.children.forEach(c => {
                c.render(Object.assign({}, config, { parent, rootHTMLElement: undefined }));
            });
            if (el !== parent) {
                el.appendChild(parent);
            }
        }
        if (config.parent) {
            config.parent.appendChild(el);
        }
        const elementClassWithContainer = this._elementClassInstance || config.rootElementLike._elementClassInstance;
        if (this.ref) {
            refs_1.setRef({ elementLike: this, el, value: this.ref });
        }
        if (elementClassWithContainer && elementClassWithContainer.setContainerEl) {
            elementClassWithContainer._eventManager = config.eventManager;
            elementClassWithContainer.setContainerEl(el);
        }
        return el;
    }
    dangerouslySetInnerHTML(s) {
        this._innerHtml = s;
    }
}
exports.ElementLikeImpl = ElementLikeImpl;
class TextNodeLikeImpl extends jsx_alone_core_1.AbstractTextNodeLike {
    render(config) {
        const text = document.createTextNode(this.content);
        if (config.parent) {
            config.parent.appendChild(text);
        }
        return text;
    }
}
exports.TextNodeLikeImpl = TextNodeLikeImpl;
function isSvgTag(t) {
    const r = new RegExp(`^${t}$`, 'i');
    return SvgTags.some(name => r.test(name));
}
const SvgTags = ['path', 'svg', 'use', 'g'];

},{"./refs":21,"jsx-alone-core":5}],18:[function(require,module,exports){
"use strict";
;
const mark_1 = require("./mark");
const jsx_alone_core_1 = require("jsx-alone-core");
/**
 * Provides event delegation management to all nodes generated in a render() call, using the root element (the one
 * returned bu JSXAlone.render() call) to addEventListener
 *
 * Notes:
 *
 *  * the event's `currentTarget` will be assigned with `target` (because if not it will be the root el) and this
 * causes errors since the original el is expected and also Event's typings currentTarget is typed and target is not
 *
 *  * The elements are marked with a data attribute
 *
 * TODO: options
 */
class RootEventManager {
    constructor(root, debug) {
        this.root = root;
        this.debug = debug;
        this.registeredByType = {};
        this.mark = '_jsxa_e' + jsx_alone_core_1.unique('_');
        this.rootListener = this.rootListener.bind(this);
    }
    markElement(el) {
        return mark_1.markElement(el, this.mark);
    }
    getElementMark(e) {
        return mark_1.getElementMark(e, this.mark);
    }
    getMarkedElement(mark) {
        return mark_1.getMarkedElement(mark, this.root, this.mark);
    }
    /** private handler for all events */
    rootListener(e) {
        if (e.target) {
            // e.currentTarget=e.target
            const mark = this.getElementMark(e.target);
            const entry = mark && (this.registeredByType[e.type.toLowerCase()] || []).find(e => e.mark === mark);
            if (entry) {
                entry.fn(Object.assign({}, e, { currentTarget: e.target }));
            }
        }
    }
    addEventListener(el, type, fn) {
        type = type.toLowerCase();
        let ls = this.registeredByType[type];
        if (!ls) {
            ls = this.registeredByType[type] = [];
            this.root.addEventListener(type, this.rootListener); //
        }
        const mark = this.markElement(el);
        let entry = ls.find(e => e.mark === mark);
        if (!entry) {
            entry = { mark, fn, type };
            ls.push(entry);
        }
    }
    /** removes event listeners for element inside root */
    removeListeners(el, types) {
        const mark = this.getElementMark(el);
        if (mark) {
            (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
                this.registeredByType[t] = (this.registeredByType[t] || []).filter(e => e.mark !== mark);
            });
        }
    }
    /** uninstall the event listeners in root. Reset the internal state. Optionally, remove the markings on descendant elements  */
    uninstall(removeElementMarks = false, types) {
        (types || Object.keys(this.registeredByType).map(t => t.toLowerCase())).forEach(t => {
            this.root.removeEventListener(t, this.rootListener);
            if (removeElementMarks) {
                this.registeredByType[t].forEach(e => {
                    const el = this.getMarkedElement(e.mark);
                    if (el) {
                        el.removeEventListener(e.type, e.fn, e.options);
                    }
                });
            }
            this.registeredByType[t] = [];
        });
    }
}
exports.RootEventManager = RootEventManager;

},{"./mark":20,"jsx-alone-core":5}],19:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./elementImpl"));
__export(require("./createElement"));
var event_1 = require("./event");
exports.RootEventManager = event_1.RootEventManager;
__export(require("./elementClass"));

},{"./createElement":15,"./elementClass":16,"./elementImpl":17,"./event":18}],20:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
/** returns element mark, if it doesn't have one generates one. It adds an unique data-attribute */
function markElement(e, label = '_jsxa_') {
    let key = e.getAttribute(`data-${label}`);
    if (!key) {
        key = jsx_alone_core_1.unique(label);
        e.setAttribute(`data-${label}`, key);
    }
    return key;
}
exports.markElement = markElement;
function getElementMark(e, label = '_jsxa_') {
    return e.getAttribute(`data-${label}`);
}
exports.getElementMark = getElementMark;
function isElementMarked(e, label = '_jsxa_') {
    return !!getElementMark(e, label);
}
exports.isElementMarked = isElementMarked;
function getMarkedElement(key, parent = document, label = '_jsxa_') {
    return parent.querySelector(getMarkSSelector(label, key));
}
exports.getMarkedElement = getMarkedElement;
function getMarkSSelector(label, key) {
    return key ? `[data-${label}="${key}"]` : `[data-${label}]`;
}
exports.getMarkSSelector = getMarkSSelector;

},{"jsx-alone-core":5}],21:[function(require,module,exports){
"use strict";
;
const mark_1 = require("./mark");
class RefObjectImpl {
    constructor() {
        this._current = null;
    }
    get current() {
        return typeof this._current === 'string' ? mark_1.getMarkedElement(this._current) : this._current;
    }
}
exports.RefObjectImpl = RefObjectImpl;
// /** @internal */
function setRef({ el, value, elementLike }) {
    // console.log('__addRef', elementLike._elementClassInstance || markElement(el));
    value._current = elementLike._elementClassInstance || mark_1.markElement(el);
}
exports.setRef = setRef;

},{"./mark":20}]},{},[11]);