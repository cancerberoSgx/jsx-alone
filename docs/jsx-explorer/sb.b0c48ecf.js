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
})({"5tDO":[function(require,module,exports) {
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
  comments: {
    lineComment: '\''
  },
  brackets: [['(', ')'], ['[', ']'], ['If', 'EndIf'], ['While', 'EndWhile'], ['For', 'EndFor'], ['Sub', 'EndSub']],
  autoClosingPairs: [{
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '(',
    close: ')',
    notIn: ['string', 'comment']
  }, {
    open: '[',
    close: ']',
    notIn: ['string', 'comment']
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.sb',
  ignoreCase: true,
  brackets: [{
    token: 'delimiter.array',
    open: '[',
    close: ']'
  }, {
    token: 'delimiter.parenthesis',
    open: '(',
    close: ')'
  }, // Special bracket statement pairs
  {
    token: 'keyword.tag-if',
    open: 'If',
    close: 'EndIf'
  }, {
    token: 'keyword.tag-while',
    open: 'While',
    close: 'EndWhile'
  }, {
    token: 'keyword.tag-for',
    open: 'For',
    close: 'EndFor'
  }, {
    token: 'keyword.tag-sub',
    open: 'Sub',
    close: 'EndSub'
  }],
  keywords: ['Else', 'ElseIf', 'EndFor', 'EndIf', 'EndSub', 'EndWhile', 'For', 'Goto', 'If', 'Step', 'Sub', 'Then', 'To', 'While'],
  tagwords: ['If', 'Sub', 'While', 'For'],
  operators: ['>', '<', '<>', '<=', '>=', 'And', 'Or', '+', '-', '*', '/', '='],
  // we include these common regular expressions
  identifier: /[a-zA-Z_][\w]*/,
  symbols: /[=><:+\-*\/%\.,]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// whitespace
    {
      include: '@whitespace'
    }, // classes
    [/(@identifier)(?=[.])/, 'type'], // identifiers, tagwords, and keywords
    [/@identifier/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@operators': 'operator',
        '@default': 'variable.name'
      }
    }], // methods, properties, and events
    [/([.])(@identifier)/, {
      cases: {
        '$2': ['delimiter', 'type.member'],
        '@default': ''
      }
    }], // numbers
    [/\d*\.\d+/, 'number.float'], [/\d+/, 'number'], // delimiters and operators
    [/[()\[\]]/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'operator',
        '@default': 'delimiter'
      }
    }], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, 'string', '@string']],
    whitespace: [[/[ \t\r\n]+/, ''], [/(\').*$/, 'comment']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"C?/, 'string', '@pop']]
  }
};
exports.language = language;
},{}]},{},["5tDO"], null)