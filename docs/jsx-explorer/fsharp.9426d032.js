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
})({"X2GG":[function(require,module,exports) {
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
    blockComment: ['(*', '*)']
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
    open: '"',
    close: '"'
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
      start: new RegExp("^\\s*//\\s*#region\\b|^\\s*\\(\\*\\s*#region(.*)\\*\\)"),
      end: new RegExp("^\\s*//\\s*#endregion\\b|^\\s*\\(\\*\\s*#endregion\\s*\\*\\)")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.fs',
  keywords: ['abstract', 'and', 'atomic', 'as', 'assert', 'asr', 'base', 'begin', 'break', 'checked', 'component', 'const', 'constraint', 'constructor', 'continue', 'class', 'default', 'delegate', 'do', 'done', 'downcast', 'downto', 'elif', 'else', 'end', 'exception', 'eager', 'event', 'external', 'extern', 'false', 'finally', 'for', 'fun', 'function', 'fixed', 'functor', 'global', 'if', 'in', 'include', 'inherit', 'inline', 'interface', 'internal', 'land', 'lor', 'lsl', 'lsr', 'lxor', 'lazy', 'let', 'match', 'member', 'mod', 'module', 'mutable', 'namespace', 'method', 'mixin', 'new', 'not', 'null', 'of', 'open', 'or', 'object', 'override', 'private', 'parallel', 'process', 'protected', 'pure', 'public', 'rec', 'return', 'static', 'sealed', 'struct', 'sig', 'then', 'to', 'true', 'tailcall', 'trait', 'try', 'type', 'upcast', 'use', 'val', 'void', 'virtual', 'volatile', 'when', 'while', 'with', 'yield'],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\^%;\.,\/]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  integersuffix: /[uU]?[yslnLI]?/,
  floatsuffix: /[fFmM]?/,
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
    }, // [< attributes >].
    [/\[<.*>\]/, 'annotation'], // Preprocessor directive
    [/^#(if|else|endif)/, 'keyword'], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, 'delimiter'], // numbers
    [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'], [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'], [/0x[0-9a-fA-F]+LF/, 'number.float'], [/0x[0-9a-fA-F]+(@integersuffix)/, 'number.hex'], [/0b[0-1]+(@integersuffix)/, 'number.bin'], [/\d+(@integersuffix)/, 'number'], // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"""/, 'string', '@string."""'], [/"/, 'string', '@string."'], // literal string
    [/\@"/, {
      token: 'string.quote',
      next: '@litstring'
    }], // characters
    [/'[^\\']'B?/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    whitespace: [[/[ \t\r\n]+/, ''], [/\(\*(?!\))/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\*]+/, 'comment'], [/\*\)/, 'comment', '@pop'], [/\*/, 'comment']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/("""|"B?)/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }]],
    litstring: [[/[^"]+/, 'string'], [/""/, 'string.escape'], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }]]
  }
};
exports.language = language;
},{}]},{},["X2GG"], null)