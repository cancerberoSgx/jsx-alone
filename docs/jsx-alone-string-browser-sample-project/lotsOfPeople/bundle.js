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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
var renderApp_1 = require("./lotsOfPeople/renderApp");
exports.lotsOfPeople = renderApp_1.renderApp;
__export(require("./util"));

},{"./lotsOfPeople/renderApp":12,"./util":13}],10:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
function getApp(JSXAlone) {
    class AppImpl extends jsx_alone_core_1.AbstractElementClass {
        render() {
            return JSXAlone.createElement("div", null,
                JSXAlone.createElement("h1", null, "Lots of people to print"),
                JSXAlone.createElement(jsx_alone_core_1.If, { c: typeof window !== 'undefined' }, () => JSXAlone.createElement("div", null,
                    JSXAlone.createElement("p", null,
                        "People count: ",
                        JSXAlone.createElement("input", { id: "peopleCount", value: this.props.peopleCount + '', type: "number" })),
                    JSXAlone.createElement("p", null,
                        "Friends count: ",
                        JSXAlone.createElement("input", { id: "friendsCount", value: this.props.friendsCount + '', type: "number" })),
                    JSXAlone.createElement("button", { onClick: e => {
                            const peopleCount = document.querySelector('#peopleCount').valueAsNumber;
                            const friendsCount = document.querySelector('#friendsCount').valueAsNumber;
                            window.renderAppLotsOfPeople({ peopleCount, friendsCount });
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
                            JSXAlone.createElement("strong", { id: "timings_JSXAloneRender" }))))),
                JSXAlone.createElement(People, { people: this.props.people }));
        }
    }
    const EditButton = (props) => (JSXAlone.createElement("button", { "data-name": props.name, onClick: e => {
            alert(`
  No context here that's why we need to do the following:
  Name: "${e.currentTarget.getAttribute('data-name')}"
  `.trim());
            // debugger
        } }, props.children));
    const Person = (props) => (JSXAlone.createElement("tr", { id: encodeURIComponent(props.name) },
        JSXAlone.createElement("td", null, props.name),
        JSXAlone.createElement("td", null, props.age),
        JSXAlone.createElement("td", null,
            JSXAlone.createElement("ul", null, props.friends.map(f => (JSXAlone.createElement("li", null,
                JSXAlone.createElement("a", { href: `#${f.name}` }, f.name)))))),
        JSXAlone.createElement("td", null,
            JSXAlone.createElement(EditButton, { name: props.name }, "Edit"))));
    const People = (props) => (JSXAlone.createElement("table", { className: "person" },
        JSXAlone.createElement("thead", null,
            JSXAlone.createElement("tr", null,
                JSXAlone.createElement("th", null, "Name"),
                JSXAlone.createElement("th", null, "Age"),
                JSXAlone.createElement("th", null, "Friends"),
                JSXAlone.createElement("th", null, "Actions"))),
        JSXAlone.createElement("tbody", null, props.people.map(p => JSXAlone.createElement(Person, Object.assign({}, p))))));
    return AppImpl;
}
exports.getApp = getApp;

},{"jsx-alone-core":5}],11:[function(require,module,exports){
"use strict";
;
const util_1 = require("../util");
const jsx_alone_core_1 = require("jsx-alone-core");
exports.MODEL_CONFIG = { peopleCount: 100, friendsCount: 5 };
function buildModel(config) {
    return {
        people: makePeople(config)
    };
}
exports.buildModel = buildModel;
function makePeople(config) {
    return jsx_alone_core_1.array(config.peopleCount)
        .map(i => ({
        name: `${util_1.names.firstName()} ${util_1.names.firstName()} ${util_1.names.lastName()} ${util_1.names.lastName()}`,
        age: util_1.numbers.integer(0, 100),
        friends: []
    }))
        .map((p, i, a) => {
        p.friends = jsx_alone_core_1.array(util_1.numbers.integer(Math.trunc(config.friendsCount / 2), config.friendsCount)).map(i => a[util_1.numbers.integer(0, a.length - 1)]);
        return p;
    });
}

},{"../util":13,"jsx-alone-core":5}],12:[function(require,module,exports){
"use strict";
;
const model_1 = require("./model");
const model_2 = require("./model");
const jsx_alone_core_1 = require("jsx-alone-core");
const App_1 = require("./App");
function renderApp(renderer, config = model_2.MODEL_CONFIG, JSXAlone) {
    renderer_ = renderer;
    if (typeof window !== 'undefined') {
        jsx_alone_core_1.getGlobal().renderAppLotsOfPeople = (config) => renderApp(renderer_, config, JSXAlone);
    }
    const buildModelT0 = Date.now();
    // console.time('buildModel');
    const model = model_1.buildModel(config);
    const buildModelT = Date.now() - buildModelT0;
    // console.timeEnd('buildModel');
    // createElement - declaring the JSX element here will end up in code calling JSXAlone.createElement
    const JSXAloneCreateElementT0 = Date.now();
    // console.time('JSXAlone.createElement');
    const App = App_1.getApp(JSXAlone);
    const app = JSXAlone.createElement("div", { id: "jsx-alone-sample-project-code" },
        JSXAlone.createElement(App, Object.assign({}, model, config)),
        ";");
    const JSXAloneCreateElementT = Date.now() - JSXAloneCreateElementT0;
    // console.timeEnd('JSXAlone.createElement');
    renderer(app, { buildModelT, JSXAloneCreateElementT });
    return app;
}
exports.renderApp = renderApp;
let renderer_;

},{"./App":10,"./model":11,"jsx-alone-core":5}],13:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
exports.names = {
    firstName: () => jsx_alone_core_1.randomItem(firstNames), lastName: () => jsx_alone_core_1.randomItem(firstNames)
};
exports.numbers = {
    integer: (min, max) => jsx_alone_core_1.randomIntBetween(min, max)
};
const firstNames = [
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
"use strict";
;
const jsx_alone_sample_project_code_1 = require("jsx-alone-sample-project-code");
const jsx_alone_string_1 = require("jsx-alone-string");
const jsx_alone_core_1 = require("jsx-alone-core");
const renderer = (app, config) => {
    // measures onload
    const onloadT0 = Date.now();
    console.time('onload');
    window.onload = () => {
        console.timeEnd('onload');
        const onloadT = Date.now() - onloadT0;
        document.getElementById('timings_onload').innerHTML = jsx_alone_core_1.printMs(onloadT);
        document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
        document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
        document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
    };
    // measures render
    const JSXAloneRenderT0 = Date.now();
    console.time('JSXAlone.render()');
    const s = jsx_alone_string_1.JSXAlone.render(app, { indent: false, indentTabSize: 0, indentLevel: 0 });
    console.log(typeof s);
    console.timeEnd('JSXAlone.render()');
    const JSXAloneRenderT = Date.now() - JSXAloneRenderT0;
    // measures appendChild TODO: timing
    let root = document.getElementById('jsx-alone-sample-project-code');
    if (root) {
        root.remove();
    }
    root = document.createElement('dir');
    root.setAttribute('id', 'jsx-alone-sample-project-code');
    root.innerHTML = s;
    // setInnerHTML(root, s)
    document.body.appendChild(root);
    document.getElementById('timings_onload').innerHTML = 'N/E';
    document.getElementById('timings_buildModel').innerHTML = jsx_alone_core_1.printMs(config.buildModelT);
    document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_core_1.printMs(config.JSXAloneCreateElementT);
    document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_core_1.printMs(JSXAloneRenderT);
};
jsx_alone_sample_project_code_1.lotsOfPeople(renderer, undefined, jsx_alone_string_1.JSXAlone);
// /** sets innerHTML and calls children scripts if any */
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

},{"jsx-alone-core":5,"jsx-alone-sample-project-code":9,"jsx-alone-string":18}],15:[function(require,module,exports){
"use strict";
;
exports.defaultRenderConfig = { indentLevel: 0, indentTabSize: 2, indent: true };

},{}],16:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
const config_1 = require("./config");
const elementImpl_1 = require("./elementImpl");
const createCreateElementConfig = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl
};
const Module = {
    createElement: jsx_alone_core_1.createCreateElement(createCreateElementConfig),
    render(el, config = config_1.defaultRenderConfig) {
        return `${el.render(config)}`;
    }
};
exports.JSXAlone = Module;

},{"./config":15,"./elementImpl":17,"jsx-alone-core":5}],17:[function(require,module,exports){
"use strict";
;
const jsx_alone_core_1 = require("jsx-alone-core");
const config_1 = require("./config");
const util_1 = require("./util");
class ElementLikeImpl extends jsx_alone_core_1.AbstractElementLike {
    render(config = config_1.defaultRenderConfig) {
        const newLine = config.indent ? `\n` : ``;
        const content = this.innerHtml ||
            `${newLine}${util_1.indent(Object.assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 }))}${this.children
                .map(c => `${c.render(Object.assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 }))}`)
                .join('')}${newLine}${util_1.indent(config)}`;
        return `<${this.tag}${Object.keys(this.attrs)
            .map(a => ` ${printHtmlAttribute(a, this.attrs[a])}`)
            .join('')}>${content}</${this.tag}>`;
    }
    dangerouslySetInnerHTML(s) {
        this.innerHtml = s;
    }
}
exports.ElementLikeImpl = ElementLikeImpl;
function printHtmlAttribute(a, value) {
    if (a === 'style') {
        value = jsx_alone_core_1.printStyleHtmlAttribute(value);
    }
    else if (a === 'className') {
        a = 'class';
    }
    else if (typeof value === 'function') {
        // we reassign _this because typescript emitted code will change the function body "this" for "_this"
        value = `(${value.toString()}).apply(_this=this,arguments)`;
    }
    value = value.replace(/\"/gim, '&quot;'); // replace(/\"/g, '\\"')
    return `${a}="${value}"`;
}
class TextNodeLikeImpl extends jsx_alone_core_1.AbstractTextNodeLike {
    render(config) {
        return `${this.content}`;
    }
}
exports.TextNodeLikeImpl = TextNodeLikeImpl;
class ElementClass extends jsx_alone_core_1.ElementClass {
}
exports.ElementClass = ElementClass;

},{"./config":15,"./util":19,"jsx-alone-core":5}],18:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
;
__export(require("./createElement"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":16,"./elementImpl":17}],19:[function(require,module,exports){
"use strict";
;
function indent(config) {
    const L = (config.indentLevel || 0) * (config.indentTabSize || 0);
    const a = [];
    for (let i = 0; i < L; i++) {
        a.push(' ');
    }
    return a.join('');
}
exports.indent = indent;

},{}]},{},[14]);
