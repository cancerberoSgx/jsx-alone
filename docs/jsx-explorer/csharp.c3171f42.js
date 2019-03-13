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
})({"b8Fy":[function(require,module,exports) {
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
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
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
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }, {
    open: '"',
    close: '"',
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
    open: '<',
    close: '>'
  }, {
    open: '\'',
    close: '\''
  }, {
    open: '"',
    close: '"'
  }],
  folding: {
    markers: {
      start: new RegExp("^\\s*#region\\b"),
      end: new RegExp("^\\s*#endregion\\b")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.cs',
  brackets: [{
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.square'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }, {
    open: '<',
    close: '>',
    token: 'delimiter.angle'
  }],
  keywords: ['extern', 'alias', 'using', 'bool', 'decimal', 'sbyte', 'byte', 'short', 'ushort', 'int', 'uint', 'long', 'ulong', 'char', 'float', 'double', 'object', 'dynamic', 'string', 'assembly', 'is', 'as', 'ref', 'out', 'this', 'base', 'new', 'typeof', 'void', 'checked', 'unchecked', 'default', 'delegate', 'var', 'const', 'if', 'else', 'switch', 'case', 'while', 'do', 'for', 'foreach', 'in', 'break', 'continue', 'goto', 'return', 'throw', 'try', 'catch', 'finally', 'lock', 'yield', 'from', 'let', 'where', 'join', 'on', 'equals', 'into', 'orderby', 'ascending', 'descending', 'select', 'group', 'by', 'namespace', 'partial', 'class', 'field', 'event', 'method', 'param', 'property', 'public', 'protected', 'internal', 'private', 'abstract', 'sealed', 'static', 'struct', 'readonly', 'volatile', 'virtual', 'override', 'params', 'get', 'set', 'add', 'remove', 'operator', 'true', 'false', 'implicit', 'explicit', 'interface', 'enum', 'null', 'async', 'await', 'fixed', 'sizeof', 'stackalloc', 'unsafe', 'nameof', 'when'],
  namespaceFollows: ['namespace', 'using'],
  parenFollows: ['if', 'for', 'while', 'switch', 'foreach', 'using', 'catch', 'when'],
  operators: ['=', '??', '||', '&&', '|', '^', '&', '==', '!=', '<=', '>=', '<<', '+', '-', '*', '/', '%', '!', '~', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '>>', '=>'],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  // escape sequences
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// identifiers and keywords
    [/\@?[a-zA-Z_]\w*/, {
      cases: {
        '@namespaceFollows': {
          token: 'keyword.$0',
          next: '@namespace'
        },
        '@keywords': {
          token: 'keyword.$0',
          next: '@qualified'
        },
        '@default': {
          token: 'identifier',
          next: '@qualified'
        }
      }
    }], // whitespace
    {
      include: '@whitespace'
    }, // delimiters and operators
    [/}/, {
      cases: {
        '$S2==interpolatedstring': {
          token: 'string.quote',
          next: '@pop'
        },
        '$S2==litinterpstring': {
          token: 'string.quote',
          next: '@pop'
        },
        '@default': '@brackets'
      }
    }], [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'delimiter',
        '@default': ''
      }
    }], // numbers
    [/[0-9_]*\.[0-9_]+([eE][\-+]?\d+)?[fFdD]?/, 'number.float'], [/0[xX][0-9a-fA-F_]+/, 'number.hex'], [/0[bB][01_]+/, 'number.hex'], [/[0-9_]+/, 'number'], // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, {
      token: 'string.quote',
      next: '@string'
    }], [/\$\@"/, {
      token: 'string.quote',
      next: '@litinterpstring'
    }], [/\@"/, {
      token: 'string.quote',
      next: '@litstring'
    }], [/\$"/, {
      token: 'string.quote',
      next: '@interpolatedstring'
    }], // characters
    [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    qualified: [[/[a-zA-Z_][\w]*/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': 'identifier'
      }
    }], [/\./, 'delimiter'], ['', '', '@pop']],
    namespace: [{
      include: '@whitespace'
    }, [/[A-Z]\w*/, 'namespace'], [/[\.=]/, 'delimiter'], ['', '', '@pop']],
    comment: [[/[^\/*]+/, 'comment'], // [/\/\*/,    'comment', '@push' ],    // no nested comments :-(
    ['\\*/', 'comment', '@pop'], [/[\/*]/, 'comment']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }]],
    litstring: [[/[^"]+/, 'string'], [/""/, 'string.escape'], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }]],
    litinterpstring: [[/[^"{]+/, 'string'], [/""/, 'string.escape'], [/{{/, 'string.escape'], [/}}/, 'string.escape'], [/{/, {
      token: 'string.quote',
      next: 'root.litinterpstring'
    }], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }]],
    interpolatedstring: [[/[^\\"{]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/{{/, 'string.escape'], [/}}/, 'string.escape'], [/{/, {
      token: 'string.quote',
      next: 'root.interpolatedstring'
    }], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }]],
    whitespace: [[/^[ \t\v\f]*#((r)|(load))(?=\s)/, 'directive.csx'], [/^[ \t\v\f]*#\w.*$/, 'namespace.cpp'], [/[ \t\v\f\r\n]+/, ''], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']]
  }
};
exports.language = language;
},{}]},{},["b8Fy"], null)