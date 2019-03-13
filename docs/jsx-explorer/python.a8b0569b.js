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
})({"Qx/T":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict'; // Allow for running under nodejs/requirejs in tests

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.language = exports.conf = void 0;

var _monaco = typeof monaco === 'undefined' ? self.monaco : monaco;

var conf = {
  comments: {
    lineComment: '#',
    blockComment: ['\'\'\'', '\'\'\'']
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
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }],
  onEnterRules: [{
    beforeText: new RegExp("^\\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\\s*$"),
    action: {
      indentAction: _monaco.languages.IndentAction.Indent
    }
  }],
  folding: {
    offSide: true,
    markers: {
      start: new RegExp("^\\s*#region\\b"),
      end: new RegExp("^\\s*#endregion\\b")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.python',
  keywords: ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'self', 'try', 'while', 'with', 'yield', 'int', 'float', 'long', 'complex', 'hex', 'abs', 'all', 'any', 'apply', 'basestring', 'bin', 'bool', 'buffer', 'bytearray', 'callable', 'chr', 'classmethod', 'cmp', 'coerce', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'execfile', 'file', 'filter', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'id', 'input', 'intern', 'isinstance', 'issubclass', 'iter', 'len', 'locals', 'list', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'reversed', 'range', 'raw_input', 'reduce', 'reload', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'unichr', 'unicode', 'vars', 'xrange', 'zip', 'True', 'False', '__dict__', '__methods__', '__members__', '__class__', '__bases__', '__name__', '__mro__', '__subclasses__', '__init__', '__import__'],
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
  }],
  tokenizer: {
    root: [{
      include: '@whitespace'
    }, {
      include: '@numbers'
    }, {
      include: '@strings'
    }, [/[,:;]/, 'delimiter'], [/[{}\[\]()]/, '@brackets'], [/@[a-zA-Z]\w*/, 'tag'], [/[a-zA-Z]\w*/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'identifier'
      }
    }]],
    // Deal with white space, including single and multi-line comments
    whitespace: [[/\s+/, 'white'], [/(^#.*$)/, 'comment'], [/'''/, 'string', '@endDocString'], [/"""/, 'string', '@endDblDocString']],
    endDocString: [[/[^']+/, 'string'], [/\\'/, 'string'], [/'''/, 'string', '@popall'], [/'/, 'string']],
    endDblDocString: [[/[^"]+/, 'string'], [/\\"/, 'string'], [/"""/, 'string', '@popall'], [/"/, 'string']],
    // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
    numbers: [[/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'], [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']],
    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [[/'$/, 'string.escape', '@popall'], [/'/, 'string.escape', '@stringBody'], [/"$/, 'string.escape', '@popall'], [/"/, 'string.escape', '@dblStringBody']],
    stringBody: [[/[^\\']+$/, 'string', '@popall'], [/[^\\']+/, 'string'], [/\\./, 'string'], [/'/, 'string.escape', '@popall'], [/\\$/, 'string']],
    dblStringBody: [[/[^\\"]+$/, 'string', '@popall'], [/[^\\"]+/, 'string'], [/\\./, 'string'], [/"/, 'string.escape', '@popall'], [/\\$/, 'string']]
  }
};
exports.language = language;
},{}]},{},["Qx/T"], null)