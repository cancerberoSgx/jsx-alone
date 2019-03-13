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
})({"Cvzj":[function(require,module,exports) {
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
  // the default separators except `@$`
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
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
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
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
  }, {
    open: '<',
    close: '>'
  }],
  folding: {
    markers: {
      start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
      end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")
    }
  }
};
exports.conf = conf;
var keywords = ['abstract', 'activate', 'and', 'any', 'array', 'as', 'asc', 'assert', 'autonomous', 'begin', 'bigdecimal', 'blob', 'boolean', 'break', 'bulk', 'by', 'case', 'cast', 'catch', 'char', 'class', 'collect', 'commit', 'const', 'continue', 'convertcurrency', 'decimal', 'default', 'delete', 'desc', 'do', 'double', 'else', 'end', 'enum', 'exception', 'exit', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'from', 'future', 'get', 'global', 'goto', 'group', 'having', 'hint', 'if', 'implements', 'import', 'in', 'inner', 'insert', 'instanceof', 'int', 'interface', 'into', 'join', 'last_90_days', 'last_month', 'last_n_days', 'last_week', 'like', 'limit', 'list', 'long', 'loop', 'map', 'merge', 'native', 'new', 'next_90_days', 'next_month', 'next_n_days', 'next_week', 'not', 'null', 'nulls', 'number', 'object', 'of', 'on', 'or', 'outer', 'override', 'package', 'parallel', 'pragma', 'private', 'protected', 'public', 'retrieve', 'return', 'returning', 'rollback', 'savepoint', 'search', 'select', 'set', 'short', 'sort', 'stat', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'system', 'testmethod', 'then', 'this', 'this_month', 'this_week', 'throw', 'throws', 'today', 'tolabel', 'tomorrow', 'transaction', 'transient', 'trigger', 'true', 'try', 'type', 'undelete', 'update', 'upsert', 'using', 'virtual', 'void', 'volatile', 'webservice', 'when', 'where', 'while', 'yesterday']; // create case variations of the keywords - apex is case insensitive, but we can't make the highlighter case insensitive
// because we use a heuristic to assume that identifiers starting with an upper case letter are types.

var uppercaseFirstLetter = function (lowercase) {
  return lowercase.charAt(0).toUpperCase() + lowercase.substr(1);
};

var keywordsWithCaseVariations = [];
keywords.forEach(function (lowercase) {
  keywordsWithCaseVariations.push(lowercase);
  keywordsWithCaseVariations.push(lowercase.toUpperCase());
  keywordsWithCaseVariations.push(uppercaseFirstLetter(lowercase));
});
var language = {
  defaultToken: '',
  tokenPostfix: '.apex',
  keywords: keywordsWithCaseVariations,
  operators: ['=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// identifiers and keywords
    [/[a-z_$][\w$]*/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': 'identifier'
      }
    }], // assume that identifiers starting with an uppercase letter are types
    [/[A-Z][\w\$]*/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': 'type.identifier'
      }
    }], // whitespace
    {
      include: '@whitespace'
    }, // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'delimiter',
        '@default': ''
      }
    }], // @ annotations.
    [/@\s*[a-zA-Z_\$][\w\$]*/, 'annotation'], // numbers
    [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'], [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'], [/(@digits)[fFdD]/, 'number.float'], [/(@digits)[lL]?/, 'number'], // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/'([^'\\]|\\.)*$/, 'string.invalid'], [/"/, 'string', '@string."'], [/'/, 'string', '@string.\''], // characters
    [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    whitespace: [[/[ \t\r\n]+/, ''], [/\/\*\*(?!\/)/, 'comment.doc', '@apexdoc'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
    // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
    [/\*\//, 'comment', '@pop'], [/[\/*]/, 'comment']],
    //Identical copy of comment above, except for the addition of .doc
    apexdoc: [[/[^\/*]+/, 'comment.doc'], [/\*\//, 'comment.doc', '@pop'], [/[\/*]/, 'comment.doc']],
    string: [[/[^\\"']+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }]]
  }
};
exports.language = language;
},{}]},{},["Cvzj"], null)