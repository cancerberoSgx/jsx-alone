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
})({"PnJD":[function(require,module,exports) {
/*!---------------------------------------------------------------------------------------------
 *  Copyright (C) David Owens II, owensd.io. All rights reserved.
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
  }, {
    open: '`',
    close: '`'
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
    open: '`',
    close: '`'
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.swift',
  // TODO(owensd): Support the full range of unicode valid identifiers.
  identifier: /[a-zA-Z_][\w$]*/,
  // TODO(owensd): Support the @availability macro properly.
  attributes: ['@autoclosure', '@noescape', '@noreturn', '@NSApplicationMain', '@NSCopying', '@NSManaged', '@objc', '@UIApplicationMain', '@noreturn', '@availability', '@IBAction', '@IBDesignable', '@IBInspectable', '@IBOutlet'],
  accessmodifiers: ['public', 'private', 'internal'],
  keywords: ['__COLUMN__', '__FILE__', '__FUNCTION__', '__LINE__', 'as', 'as!', 'as?', 'associativity', 'break', 'case', 'catch', 'class', 'continue', 'convenience', 'default', 'deinit', 'didSet', 'do', 'dynamic', 'dynamicType', 'else', 'enum', 'extension', 'fallthrough', 'final', 'for', 'func', 'get', 'guard', 'if', 'import', 'in', 'infix', 'init', 'inout', 'internal', 'is', 'lazy', 'left', 'let', 'mutating', 'nil', 'none', 'nonmutating', 'operator', 'optional', 'override', 'postfix', 'precedence', 'prefix', 'private', 'protocol', 'Protocol', 'public', 'repeat', 'required', 'return', 'right', 'self', 'Self', 'set', 'static', 'struct', 'subscript', 'super', 'switch', 'throw', 'throws', 'try', 'try!', 'Type', 'typealias', 'unowned', 'var', 'weak', 'where', 'while', 'willSet', 'FALSE', 'TRUE'],
  symbols: /[=(){}\[\].,:;@#\_&\-<>`?!+*\\\/]/,
  // Moved . to operatorstart so it can be a delimiter
  operatorstart: /[\/=\-+!*%<>&|^~?\u00A1-\u00A7\u00A9\u00AB\u00AC\u00AE\u00B0-\u00B1\u00B6\u00BB\u00BF\u00D7\u00F7\u2016-\u2017\u2020-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u23FF\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3030]/,
  operatorend: /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE00-\uFE0F\uFE20-\uFE2F\uE0100-\uE01EF]/,
  operators: /(@operatorstart)((@operatorstart)|(@operatorend))*/,
  // TODO(owensd): These are borrowed from C#; need to validate correctness for Swift.
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  tokenizer: {
    root: [{
      include: '@comment'
    }, {
      include: '@attribute'
    }, {
      include: '@literal'
    }, {
      include: '@keyword'
    }, {
      include: '@invokedmethod'
    }, {
      include: '@symbol'
    }],
    symbol: [[/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/[.]/, 'delimiter'], [/@operators/, 'operator'], [/@symbols/, 'operator']],
    comment: [[/\/\/\/.*$/, 'comment.doc'], [/\/\*\*/, 'comment.doc', '@commentdocbody'], [/\/\/.*$/, 'comment'], [/\/\*/, 'comment', '@commentbody']],
    commentdocbody: [[/\/\*/, 'comment', '@commentbody'], [/\*\//, 'comment.doc', '@pop'], [/\:[a-zA-Z]+\:/, 'comment.doc.param'], [/./, 'comment.doc']],
    commentbody: [[/\/\*/, 'comment', '@commentbody'], [/\*\//, 'comment', '@pop'], [/./, 'comment']],
    attribute: [[/\@@identifier/, {
      cases: {
        '@attributes': 'keyword.control',
        '@default': ''
      }
    }]],
    literal: [[/"/, {
      token: 'string.quote',
      next: '@stringlit'
    }], [/0[b]([01]_?)+/, 'number.binary'], [/0[o]([0-7]_?)+/, 'number.octal'], [/0[x]([0-9a-fA-F]_?)+([pP][\-+](\d_?)+)?/, 'number.hex'], [/(\d_?)*\.(\d_?)+([eE][\-+]?(\d_?)+)?/, 'number.float'], [/(\d_?)+/, 'number']],
    stringlit: [[/\\\(/, {
      token: 'operator',
      next: '@interpolatedexpression'
    }], [/@escapes/, 'string'], [/\\./, 'string.escape.invalid'], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }], [/./, 'string']],
    interpolatedexpression: [[/\(/, {
      token: 'operator',
      next: '@interpolatedexpression'
    }], [/\)/, {
      token: 'operator',
      next: '@pop'
    }], {
      include: '@literal'
    }, {
      include: '@keyword'
    }, {
      include: '@symbol'
    }],
    keyword: [[/`/, {
      token: 'operator',
      next: '@escapedkeyword'
    }], [/@identifier/, {
      cases: {
        '@keywords': 'keyword',
        '[A-Z][\a-zA-Z0-9$]*': 'type.identifier',
        '@default': 'identifier'
      }
    }]],
    escapedkeyword: [[/`/, {
      token: 'operator',
      next: '@pop'
    }], [/./, 'identifier']],
    //		symbol: [
    //			[ /@symbols/, 'operator' ],
    //			[ /@operators/, 'operator' ]
    //		],
    invokedmethod: [[/([.])(@identifier)/, {
      cases: {
        '$2': ['delimeter', 'type.identifier'],
        '@default': ''
      }
    }]]
  }
};
exports.language = language;
},{}]},{},["PnJD"], null)