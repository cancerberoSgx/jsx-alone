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
})({"AH+V":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.language = exports.conf = void 0;
var conf = {
  wordPattern: /(#?-?\d*\.\d\w*%?)|([@$#!.:]?[\w-?]+%?)|[@#!.]/g,
  comments: {
    blockComment: ['/*', '*/'],
    lineComment: '//'
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}',
    notIn: ['string', 'comment']
  }, {
    open: '[',
    close: ']',
    notIn: ['string', 'comment']
  }, {
    open: '(',
    close: ')',
    notIn: ['string', 'comment']
  }, {
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }],
  folding: {
    markers: {
      start: new RegExp("^\\s*\\/\\*\\s*#region\\b\\s*(.*?)\\s*\\*\\/"),
      end: new RegExp("^\\s*\\/\\*\\s*#endregion\\b.*\\*\\/")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.scss',
  ws: '[ \t\n\r\f]*',
  identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
  brackets: [{
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.bracket'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }, {
    open: '<',
    close: '>',
    token: 'delimiter.angle'
  }],
  tokenizer: {
    root: [{
      include: '@selector'
    }],
    selector: [{
      include: '@comments'
    }, {
      include: '@import'
    }, {
      include: '@variabledeclaration'
    }, {
      include: '@warndebug'
    }, ['[@](include)', {
      token: 'keyword',
      next: '@includedeclaration'
    }], ['[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)', {
      token: 'keyword',
      next: '@keyframedeclaration'
    }], ['[@](page|content|font-face|-moz-document)', {
      token: 'keyword'
    }], ['[@](charset|namespace)', {
      token: 'keyword',
      next: '@declarationbody'
    }], ['[@](function)', {
      token: 'keyword',
      next: '@functiondeclaration'
    }], ['[@](mixin)', {
      token: 'keyword',
      next: '@mixindeclaration'
    }], ['url(\\-prefix)?\\(', {
      token: 'meta',
      next: '@urldeclaration'
    }], {
      include: '@controlstatement'
    }, {
      include: '@selectorname'
    }, ['[&\\*]', 'tag'], ['[>\\+,]', 'delimiter'], ['\\[', {
      token: 'delimiter.bracket',
      next: '@selectorattribute'
    }], ['{', {
      token: 'delimiter.curly',
      next: '@selectorbody'
    }]],
    selectorbody: [['[*_]?@identifier@ws:(?=(\\s|\\d|[^{;}]*[;}]))', 'attribute.name', '@rulevalue'], {
      include: '@selector'
    }, ['[@](extend)', {
      token: 'keyword',
      next: '@extendbody'
    }], ['[@](return)', {
      token: 'keyword',
      next: '@declarationbody'
    }], ['}', {
      token: 'delimiter.curly',
      next: '@pop'
    }]],
    selectorname: [['#{', {
      token: 'meta',
      next: '@variableinterpolation'
    }], ['(\\.|#(?=[^{])|%|(@identifier)|:)+', 'tag']],
    selectorattribute: [{
      include: '@term'
    }, [']', {
      token: 'delimiter.bracket',
      next: '@pop'
    }]],
    term: [{
      include: '@comments'
    }, ['url(\\-prefix)?\\(', {
      token: 'meta',
      next: '@urldeclaration'
    }], {
      include: '@functioninvocation'
    }, {
      include: '@numbers'
    }, {
      include: '@strings'
    }, {
      include: '@variablereference'
    }, ['(and\\b|or\\b|not\\b)', 'operator'], {
      include: '@name'
    }, ['([<>=\\+\\-\\*\\/\\^\\|\\~,])', 'operator'], [',', 'delimiter'], ['!default', 'literal'], ['\\(', {
      token: 'delimiter.parenthesis',
      next: '@parenthizedterm'
    }]],
    rulevalue: [{
      include: '@term'
    }, ['!important', 'literal'], [';', 'delimiter', '@pop'], ['{', {
      token: 'delimiter.curly',
      switchTo: '@nestedproperty'
    }], ['(?=})', {
      token: '',
      next: '@pop'
    }]],
    nestedproperty: [['[*_]?@identifier@ws:', 'attribute.name', '@rulevalue'], {
      include: '@comments'
    }, ['}', {
      token: 'delimiter.curly',
      next: '@pop'
    }]],
    warndebug: [['[@](warn|debug)', {
      token: 'keyword',
      next: '@declarationbody'
    }]],
    import: [['[@](import)', {
      token: 'keyword',
      next: '@declarationbody'
    }]],
    variabledeclaration: [['\\$@identifier@ws:', 'variable.decl', '@declarationbody']],
    urldeclaration: [{
      include: '@strings'
    }, ['[^)\r\n]+', 'string'], ['\\)', {
      token: 'meta',
      next: '@pop'
    }]],
    parenthizedterm: [{
      include: '@term'
    }, ['\\)', {
      token: 'delimiter.parenthesis',
      next: '@pop'
    }]],
    declarationbody: [{
      include: '@term'
    }, [';', 'delimiter', '@pop'], ['(?=})', {
      token: '',
      next: '@pop'
    }]],
    extendbody: [{
      include: '@selectorname'
    }, ['!optional', 'literal'], [';', 'delimiter', '@pop'], ['(?=})', {
      token: '',
      next: '@pop'
    }]],
    variablereference: [['\\$@identifier', 'variable.ref'], ['\\.\\.\\.', 'operator'], ['#{', {
      token: 'meta',
      next: '@variableinterpolation'
    }]],
    variableinterpolation: [{
      include: '@variablereference'
    }, ['}', {
      token: 'meta',
      next: '@pop'
    }]],
    comments: [['\\/\\*', 'comment', '@comment'], ['\\/\\/+.*', 'comment']],
    comment: [['\\*\\/', 'comment', '@pop'], ['.', 'comment']],
    name: [['@identifier', 'attribute.value']],
    numbers: [['(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', {
      token: 'number',
      next: '@units'
    }], ['#[0-9a-fA-F_]+(?!\\w)', 'number.hex']],
    units: [['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'number', '@pop']],
    functiondeclaration: [['@identifier@ws\\(', {
      token: 'meta',
      next: '@parameterdeclaration'
    }], ['{', {
      token: 'delimiter.curly',
      switchTo: '@functionbody'
    }]],
    mixindeclaration: [// mixin with parameters
    ['@identifier@ws\\(', {
      token: 'meta',
      next: '@parameterdeclaration'
    }], // mixin without parameters
    ['@identifier', 'meta'], ['{', {
      token: 'delimiter.curly',
      switchTo: '@selectorbody'
    }]],
    parameterdeclaration: [['\\$@identifier@ws:', 'variable.decl'], ['\\.\\.\\.', 'operator'], [',', 'delimiter'], {
      include: '@term'
    }, ['\\)', {
      token: 'meta',
      next: '@pop'
    }]],
    includedeclaration: [{
      include: '@functioninvocation'
    }, ['@identifier', 'meta'], [';', 'delimiter', '@pop'], ['(?=})', {
      token: '',
      next: '@pop'
    }], ['{', {
      token: 'delimiter.curly',
      switchTo: '@selectorbody'
    }]],
    keyframedeclaration: [['@identifier', 'meta'], ['{', {
      token: 'delimiter.curly',
      switchTo: '@keyframebody'
    }]],
    keyframebody: [{
      include: '@term'
    }, ['{', {
      token: 'delimiter.curly',
      next: '@selectorbody'
    }], ['}', {
      token: 'delimiter.curly',
      next: '@pop'
    }]],
    controlstatement: [['[@](if|else|for|while|each|media)', {
      token: 'keyword.flow',
      next: '@controlstatementdeclaration'
    }]],
    controlstatementdeclaration: [['(in|from|through|if|to)\\b', {
      token: 'keyword.flow'
    }], {
      include: '@term'
    }, ['{', {
      token: 'delimiter.curly',
      switchTo: '@selectorbody'
    }]],
    functionbody: [['[@](return)', {
      token: 'keyword'
    }], {
      include: '@variabledeclaration'
    }, {
      include: '@term'
    }, {
      include: '@controlstatement'
    }, [';', 'delimiter'], ['}', {
      token: 'delimiter.curly',
      next: '@pop'
    }]],
    functioninvocation: [['@identifier\\(', {
      token: 'meta',
      next: '@functionarguments'
    }]],
    functionarguments: [['\\$@identifier@ws:', 'attribute.name'], ['[,]', 'delimiter'], {
      include: '@term'
    }, ['\\)', {
      token: 'meta',
      next: '@pop'
    }]],
    strings: [['~?"', {
      token: 'string.delimiter',
      next: '@stringenddoublequote'
    }], ['~?\'', {
      token: 'string.delimiter',
      next: '@stringendquote'
    }]],
    stringenddoublequote: [['\\\\.', 'string'], ['"', {
      token: 'string.delimiter',
      next: '@pop'
    }], ['.', 'string']],
    stringendquote: [['\\\\.', 'string'], ['\'', {
      token: 'string.delimiter',
      next: '@pop'
    }], ['.', 'string']]
  }
};
exports.language = language;
},{}]},{},["AH+V"], null)