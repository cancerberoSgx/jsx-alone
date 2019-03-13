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
})({"EQOq":[function(require,module,exports) {
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
    open: '[',
    close: ']'
  }, {
    open: '{',
    close: '}'
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
    notIn: ['string']
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
      start: new RegExp("^\\s*#pragma\\s+region\\b"),
      end: new RegExp("^\\s*#pragma\\s+endregion\\b")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.cpp',
  brackets: [{
    token: 'delimiter.curly',
    open: '{',
    close: '}'
  }, {
    token: 'delimiter.parenthesis',
    open: '(',
    close: ')'
  }, {
    token: 'delimiter.square',
    open: '[',
    close: ']'
  }, {
    token: 'delimiter.angle',
    open: '<',
    close: '>'
  }],
  keywords: ['abstract', 'amp', 'array', 'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const', 'constexpr', 'const_cast', 'continue', 'cpu', 'decltype', 'default', 'delegate', 'delete', 'do', 'double', 'dynamic_cast', 'each', 'else', 'enum', 'event', 'explicit', 'export', 'extern', 'false', 'final', 'finally', 'float', 'for', 'friend', 'gcnew', 'generic', 'goto', 'if', 'in', 'initonly', 'inline', 'int', 'interface', 'interior_ptr', 'internal', 'literal', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', '__nullptr', 'operator', 'override', 'partial', 'pascal', 'pin_ptr', 'private', 'property', 'protected', 'public', 'ref', 'register', 'reinterpret_cast', 'restrict', 'return', 'safe_cast', 'sealed', 'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'tile_static', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'where', 'while', '_asm', '_based', '_cdecl', '_declspec', '_fastcall', '_if_exists', '_if_not_exists', '_inline', '_multiple_inheritance', '_pascal', '_single_inheritance', '_stdcall', '_virtual_inheritance', '_w64', '__abstract', '__alignof', '__asm', '__assume', '__based', '__box', '__builtin_alignof', '__cdecl', '__clrcall', '__declspec', '__delegate', '__event', '__except', '__fastcall', '__finally', '__forceinline', '__gc', '__hook', '__identifier', '__if_exists', '__if_not_exists', '__inline', '__int128', '__int16', '__int32', '__int64', '__int8', '__interface', '__leave', '__m128', '__m128d', '__m128i', '__m256', '__m256d', '__m256i', '__m64', '__multiple_inheritance', '__newslot', '__nogc', '__noop', '__nounwind', '__novtordisp', '__pascal', '__pin', '__pragma', '__property', '__ptr32', '__ptr64', '__raise', '__restrict', '__resume', '__sealed', '__single_inheritance', '__stdcall', '__super', '__thiscall', '__try', '__try_cast', '__typeof', '__unaligned', '__unhook', '__uuidof', '__value', '__virtual_inheritance', '__w64', '__wchar_t'],
  operators: ['=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
  floatsuffix: /[fFlL]?/,
  encoding: /u|u8|U|L/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// C++ 11 Raw String
    [/@encoding?R\"(?:([^ ()\\\t]*))\(/, {
      token: 'string.raw.begin',
      next: '@raw.$1'
    }], // identifiers and keywords
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
    [/\[\[.*\]\]/, 'annotation'], [/^\s*#include/, {
      token: 'keyword.directive.include',
      next: '@include'
    }], // Preprocessor directive
    [/^\s*#\s*\w+/, 'keyword'], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'delimiter',
        '@default': ''
      }
    }], // numbers
    [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'], [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'], [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'], [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'], [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'], [/\d[\d']*\d(@integersuffix)/, 'number'], [/\d(@integersuffix)/, 'number'], // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, 'string', '@string'], // characters
    [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    whitespace: [[/[ \t\r\n]+/, ''], [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], [/\*\//, 'comment', '@pop'], [/[\/*]/, 'comment']],
    //Identical copy of comment above, except for the addition of .doc
    doccomment: [[/[^\/*]+/, 'comment.doc'], [/\*\//, 'comment.doc', '@pop'], [/[\/*]/, 'comment.doc']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, 'string', '@pop']],
    raw: [[/(.*)(\))(?:([^ ()\\\t]*))(\")/, {
      cases: {
        '$3==$S2': ['string.raw', 'string.raw.end', 'string.raw.end', {
          token: 'string.raw.end',
          next: '@pop'
        }],
        '@default': ['string.raw', 'string.raw', 'string.raw', 'string.raw']
      }
    }], [/.*/, 'string.raw']],
    include: [[/(\s*)(<)([^<>]*)(>)/, ['', 'keyword.directive.include.begin', 'string.include.identifier', {
      token: 'keyword.directive.include.end',
      next: '@pop'
    }]], [/(\s*)(")([^"]*)(")/, ['', 'keyword.directive.include.begin', 'string.include.identifier', {
      token: 'keyword.directive.include.end',
      next: '@pop'
    }]]]
  }
};
exports.language = language;
},{}]},{},["EQOq"], null)