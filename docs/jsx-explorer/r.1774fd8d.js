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
})({"F1kr":[function(require,module,exports) {
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
    lineComment: '#'
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
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.r',
  roxygen: ['@param', '@return', '@name', '@rdname', '@examples', '@include', '@docType', '@S3method', '@TODO', '@aliases', '@alias', '@assignee', '@author', '@callGraphDepth', '@callGraph', '@callGraphPrimitives', '@concept', '@exportClass', '@exportMethod', '@exportPattern', '@export', '@formals', '@format', '@importClassesFrom', '@importFrom', '@importMethodsFrom', '@import', '@keywords', '@method', '@nord', '@note', '@references', '@seealso', '@setClass', '@slot', '@source', '@title', '@usage'],
  constants: ['NULL', 'FALSE', 'TRUE', 'NA', 'Inf', 'NaN ', 'NA_integer_', 'NA_real_', 'NA_complex_', 'NA_character_ ', 'T', 'F', 'LETTERS', 'letters', 'month.abb', 'month.name', 'pi', 'R.version.string'],
  keywords: ['break', 'next', 'return', 'if', 'else', 'for', 'in', 'repeat', 'while', 'array', 'category', 'character', 'complex', 'double', 'function', 'integer', 'list', 'logical', 'matrix', 'numeric', 'vector', 'data.frame', 'factor', 'library', 'require', 'attach', 'detach', 'source'],
  special: ['\\n', '\\r', '\\t', '\\b', '\\a', '\\f', '\\v', '\\\'', '\\"', '\\\\'],
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
      include: '@numbers'
    }, {
      include: '@strings'
    }, [/[{}\[\]()]/, '@brackets'], {
      include: '@operators'
    }, [/#'/, 'comment.doc', '@roxygen'], [/(^#.*$)/, 'comment'], [/\s+/, 'white'], [/[,:;]/, 'delimiter'], [/@[a-zA-Z]\w*/, 'tag'], [/[a-zA-Z]\w*/, {
      cases: {
        '@keywords': 'keyword',
        '@constants': 'constant',
        '@default': 'identifier'
      }
    }]],
    // Recognize Roxygen comments
    roxygen: [[/@\w+/, {
      cases: {
        '@roxygen': 'tag',
        '@eos': {
          token: 'comment.doc',
          next: '@pop'
        },
        '@default': 'comment.doc'
      }
    }], [/\s+/, {
      cases: {
        '@eos': {
          token: 'comment.doc',
          next: '@pop'
        },
        '@default': 'comment.doc'
      }
    }], [/.*/, {
      token: 'comment.doc',
      next: '@pop'
    }]],
    // Recognize positives, negatives, decimals, imaginaries, and scientific notation
    numbers: [[/0[xX][0-9a-fA-F]+/, 'number.hex'], [/-?(\d*\.)?\d+([eE][+\-]?\d+)?/, 'number']],
    // Recognize operators
    operators: [[/<{1,2}-/, 'operator'], [/->{1,2}/, 'operator'], [/%[^%\s]+%/, 'operator'], [/\*\*/, 'operator'], [/%%/, 'operator'], [/&&/, 'operator'], [/\|\|/, 'operator'], [/<</, 'operator'], [/>>/, 'operator'], [/[-+=&|!<>^~*/:$]/, 'operator']],
    // Recognize strings, including those broken across lines
    strings: [[/'/, 'string.escape', '@stringBody'], [/"/, 'string.escape', '@dblStringBody']],
    stringBody: [[/\\./, {
      cases: {
        '@special': 'string',
        '@default': 'error-token'
      }
    }], [/'/, 'string.escape', '@popall'], [/./, 'string']],
    dblStringBody: [[/\\./, {
      cases: {
        '@special': 'string',
        '@default': 'error-token'
      }
    }], [/"/, 'string.escape', '@popall'], [/./, 'string']]
  }
};
exports.language = language;
},{}]},{},["F1kr"], null)