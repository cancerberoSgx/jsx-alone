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
})({"mVL3":[function(require,module,exports) {
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
    lineComment: '//',
    blockComment: ['/*', '*/']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '`',
    close: '`',
    notIn: ['string']
  }, {
    open: '"',
    close: '"',
    notIn: ['string']
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
    open: '`',
    close: '`'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.go',
  keywords: ['break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface', 'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var', 'bool', 'true', 'false', 'uint8', 'uint16', 'uint32', 'uint64', 'int8', 'int16', 'int32', 'int64', 'float32', 'float64', 'complex64', 'complex128', 'byte', 'rune', 'uint', 'int', 'uintptr', 'string', 'nil'],
  operators: ['+', '-', '*', '/', '%', '&', '|', '^', '<<', '>>', '&^', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '&^=', '&&', '||', '<-', '++', '--', '==', '<', '>', '=', '!', '!=', '<=', '>=', ':=', '...', '(', ')', '', ']', '{', '}', ',', ';', '.', ':'],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// identifiers and keywords
    [/[a-zA-Z_]\w*/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': 'identifier'
      }
    }], // whitespace
    {
      include: '@whitespace'
    }, // [[ attributes ]].
    [/\[\[.*\]\]/, 'annotation'], // Preprocessor directive
    [/^\s*#\w+/, 'keyword'], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'delimiter',
        '@default': ''
      }
    }], // numbers
    [/\d*\d+[eE]([\-+]?\d+)?/, 'number.float'], [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex'], [/0[0-7']*[0-7]/, 'number.octal'], [/0[bB][0-1']*[0-1]/, 'number.binary'], [/\d[\d']*/, 'number'], [/\d/, 'number'], // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, 'string', '@string'], [/`/, "string", "@rawstring"], // characters
    [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    whitespace: [[/[ \t\r\n]+/, ''], [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
    // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
    [/\*\//, 'comment', '@pop'], [/[\/*]/, 'comment']],
    //Identical copy of comment above, except for the addition of .doc
    doccomment: [[/[^\/*]+/, 'comment.doc'], // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
    [/\/\*/, 'comment.doc.invalid'], [/\*\//, 'comment.doc', '@pop'], [/[\/*]/, 'comment.doc']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, 'string', '@pop']],
    rawstring: [[/[^\`]/, "string"], [/`/, "string", "@pop"]]
  }
};
exports.language = language;
},{}]},{},["mVL3"], null)