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
})({"Bb2N":[function(require,module,exports) {
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
  wordPattern: /(#?-?\d*\.\d\w*%?)|([@#!.:]?[\w-?]+%?)|[@#!.]/g,
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
  tokenPostfix: '.less',
  identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
  identifierPlus: '-?-?([a-zA-Z:.]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-:.]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
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
      include: '@nestedJSBegin'
    }, ['[ \\t\\r\\n]+', ''], {
      include: '@comments'
    }, {
      include: '@keyword'
    }, {
      include: '@strings'
    }, {
      include: '@numbers'
    }, ['[*_]?[a-zA-Z\\-\\s]+(?=:.*(;|(\\\\$)))', 'attribute.name', '@attribute'], ['url(\\-prefix)?\\(', {
      token: 'tag',
      next: '@urldeclaration'
    }], ['[{}()\\[\\]]', '@brackets'], ['[,:;]', 'delimiter'], ['#@identifierPlus', 'tag.id'], ['&', 'tag'], ['\\.@identifierPlus(?=\\()', 'tag.class', '@attribute'], ['\\.@identifierPlus', 'tag.class'], ['@identifierPlus', 'tag'], {
      include: '@operators'
    }, ['@(@identifier(?=[:,\\)]))', 'variable', '@attribute'], ['@(@identifier)', 'variable'], ['@', 'key', '@atRules']],
    nestedJSBegin: [['``', 'delimiter.backtick'], ['`', {
      token: 'delimiter.backtick',
      next: '@nestedJSEnd',
      nextEmbedded: 'text/javascript'
    }]],
    nestedJSEnd: [['`', {
      token: 'delimiter.backtick',
      next: '@pop',
      nextEmbedded: '@pop'
    }]],
    operators: [['[<>=\\+\\-\\*\\/\\^\\|\\~]', 'operator']],
    keyword: [['(@[\\s]*import|![\\s]*important|true|false|when|iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|hue|saturation|lightness|alpha|lighten|darken|saturate|desaturate|fadein|fadeout|fade|spin|mix|round|ceil|floor|percentage)\\b', 'keyword']],
    urldeclaration: [{
      include: '@strings'
    }, ['[^)\r\n]+', 'string'], ['\\)', {
      token: 'tag',
      next: '@pop'
    }]],
    attribute: [{
      include: '@nestedJSBegin'
    }, {
      include: '@comments'
    }, {
      include: '@strings'
    }, {
      include: '@numbers'
    }, {
      include: '@keyword'
    }, ['[a-zA-Z\\-]+(?=\\()', 'attribute.value', '@attribute'], ['>', 'operator', '@pop'], ['@identifier', 'attribute.value'], {
      include: '@operators'
    }, ['@(@identifier)', 'variable'], ['[)\\}]', '@brackets', '@pop'], ['[{}()\\[\\]>]', '@brackets'], ['[;]', 'delimiter', '@pop'], ['[,=:]', 'delimiter'], ['\\s', ''], ['.', 'attribute.value']],
    comments: [['\\/\\*', 'comment', '@comment'], ['\\/\\/+.*', 'comment']],
    comment: [['\\*\\/', 'comment', '@pop'], ['.', 'comment']],
    numbers: [['(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', {
      token: 'attribute.value.number',
      next: '@units'
    }], ['#[0-9a-fA-F_]+(?!\\w)', 'attribute.value.hex']],
    units: [['(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'attribute.value.unit', '@pop']],
    strings: [['~?"', {
      token: 'string.delimiter',
      next: '@stringsEndDoubleQuote'
    }], ['~?\'', {
      token: 'string.delimiter',
      next: '@stringsEndQuote'
    }]],
    stringsEndDoubleQuote: [['\\\\"', 'string'], ['"', {
      token: 'string.delimiter',
      next: '@popall'
    }], ['.', 'string']],
    stringsEndQuote: [['\\\\\'', 'string'], ['\'', {
      token: 'string.delimiter',
      next: '@popall'
    }], ['.', 'string']],
    atRules: [{
      include: '@comments'
    }, {
      include: '@strings'
    }, ['[()]', 'delimiter'], ['[\\{;]', 'delimiter', '@pop'], ['.', 'key']]
  }
};
exports.language = language;
},{}]},{},["Bb2N"], null)