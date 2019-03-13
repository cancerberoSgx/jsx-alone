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
})({"iUJh":[function(require,module,exports) {
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
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.objective-c',
  keywords: ['#import', '#include', '#define', '#else', '#endif', '#if', '#ifdef', '#ifndef', '#ident', '#undef', '@class', '@defs', '@dynamic', '@encode', '@end', '@implementation', '@interface', '@package', '@private', '@protected', '@property', '@protocol', '@public', '@selector', '@synthesize', '__declspec', 'assign', 'auto', 'BOOL', 'break', 'bycopy', 'byref', 'case', 'char', 'Class', 'const', 'copy', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'FALSE', 'false', 'float', 'for', 'goto', 'if', 'in', 'int', 'id', 'inout', 'IMP', 'long', 'nil', 'nonatomic', 'NULL', 'oneway', 'out', 'private', 'public', 'protected', 'readwrite', 'readonly', 'register', 'return', 'SEL', 'self', 'short', 'signed', 'sizeof', 'static', 'struct', 'super', 'switch', 'typedef', 'TRUE', 'true', 'union', 'unsigned', 'volatile', 'void', 'while'],
  decpart: /\d(_?\d)*/,
  decimal: /0|@decpart/,
  tokenizer: {
    root: [{
      include: '@comments'
    }, {
      include: '@whitespace'
    }, {
      include: '@numbers'
    }, {
      include: '@strings'
    }, [/[,:;]/, 'delimiter'], [/[{}\[\]()<>]/, '@brackets'], [/[a-zA-Z@#]\w*/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'identifier'
      }
    }], [/[<>=\\+\\-\\*\\/\\^\\|\\~,]|and\\b|or\\b|not\\b]/, 'operator']],
    whitespace: [[/\s+/, 'white']],
    comments: [['\\/\\*', 'comment', '@comment'], ['\\/\\/+.*', 'comment']],
    comment: [['\\*\\/', 'comment', '@pop'], ['.', 'comment']],
    numbers: [[/0[xX][0-9a-fA-F]*(_?[0-9a-fA-F])*/, 'number.hex'], [/@decimal((\.@decpart)?([eE][\-+]?@decpart)?)[fF]*/, {
      cases: {
        '(\\d)*': 'number',
        '$0': 'number.float'
      }
    }]],
    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [[/'$/, 'string.escape', '@popall'], [/'/, 'string.escape', '@stringBody'], [/"$/, 'string.escape', '@popall'], [/"/, 'string.escape', '@dblStringBody']],
    stringBody: [[/[^\\']+$/, 'string', '@popall'], [/[^\\']+/, 'string'], [/\\./, 'string'], [/'/, 'string.escape', '@popall'], [/\\$/, 'string']],
    dblStringBody: [[/[^\\"]+$/, 'string', '@popall'], [/[^\\"]+/, 'string'], [/\\./, 'string'], [/"/, 'string.escape', '@popall'], [/\\$/, 'string']]
  }
};
exports.language = language;
},{}]},{},["iUJh"], null)