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
})({"b1wc":[function(require,module,exports) {
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
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#%\^\&\*\(\)\=\$\-\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  comments: {
    blockComment: ['###', '###'],
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
  ignoreCase: true,
  tokenPostfix: '.coffee',
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
  }],
  regEx: /\/(?!\/\/)(?:[^\/\\]|\\.)*\/[igm]*/,
  keywords: ['and', 'or', 'is', 'isnt', 'not', 'on', 'yes', '@', 'no', 'off', 'true', 'false', 'null', 'this', 'new', 'delete', 'typeof', 'in', 'instanceof', 'return', 'throw', 'break', 'continue', 'debugger', 'if', 'else', 'switch', 'for', 'while', 'do', 'try', 'catch', 'finally', 'class', 'extends', 'super', 'undefined', 'then', 'unless', 'until', 'loop', 'of', 'by', 'when'],
  // we include these common regular expressions
  symbols: /[=><!~?&%|+\-*\/\^\.,\:]+/,
  escapes: /\\(?:[abfnrtv\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// identifiers and keywords
    [/\@[a-zA-Z_]\w*/, 'variable.predefined'], [/[a-zA-Z_]\w*/, {
      cases: {
        'this': 'variable.predefined',
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': ''
      }
    }], // whitespace
    [/[ \t\r\n]+/, ''], // Comments
    [/###/, 'comment', '@comment'], [/#.*$/, 'comment'], // regular expressions
    ['///', {
      token: 'regexp',
      next: '@hereregexp'
    }], [/^(\s*)(@regEx)/, ['', 'regexp']], [/(\()(\s*)(@regEx)/, ['@brackets', '', 'regexp']], [/(\,)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\=)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\:)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\[)(\s*)(@regEx)/, ['@brackets', '', 'regexp']], [/(\!)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\&)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\|)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\?)(\s*)(@regEx)/, ['delimiter', '', 'regexp']], [/(\{)(\s*)(@regEx)/, ['@brackets', '', 'regexp']], [/(\;)(\s*)(@regEx)/, ['', '', 'regexp']], // delimiters
    [/}/, {
      cases: {
        '$S2==interpolatedstring': {
          token: 'string',
          next: '@pop'
        },
        '@default': '@brackets'
      }
    }], [/[{}()\[\]]/, '@brackets'], [/@symbols/, 'delimiter'], // numbers
    [/\d+[eE]([\-+]?\d+)?/, 'number.float'], [/\d+\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/0[xX][0-9a-fA-F]+/, 'number.hex'], [/0[0-7]+(?!\d)/, 'number.octal'], [/\d+/, 'number'], // delimiter: after number because of .\d floats
    [/[,.]/, 'delimiter'], // strings:
    [/"""/, 'string', '@herestring."""'], [/'''/, 'string', '@herestring.\'\'\''], [/"/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string."'
        }
      }
    }], [/'/, {
      cases: {
        '@eos': 'string',
        '@default': {
          token: 'string',
          next: '@string.\''
        }
      }
    }]],
    string: [[/[^"'\#\\]+/, 'string'], [/@escapes/, 'string.escape'], [/\./, 'string.escape.invalid'], [/\./, 'string.escape.invalid'], [/#{/, {
      cases: {
        '$S2=="': {
          token: 'string',
          next: 'root.interpolatedstring'
        },
        '@default': 'string'
      }
    }], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }], [/#/, 'string']],
    herestring: [[/("""|''')/, {
      cases: {
        '$1==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': 'string'
      }
    }], [/[^#\\'"]+/, 'string'], [/['"]+/, 'string'], [/@escapes/, 'string.escape'], [/\./, 'string.escape.invalid'], [/#{/, {
      token: 'string.quote',
      next: 'root.interpolatedstring'
    }], [/#/, 'string']],
    comment: [[/[^#]+/, 'comment'], [/###/, 'comment', '@pop'], [/#/, 'comment']],
    hereregexp: [[/[^\\\/#]+/, 'regexp'], [/\\./, 'regexp'], [/#.*$/, 'comment'], ['///[igm]*', {
      token: 'regexp',
      next: '@pop'
    }], [/\//, 'regexp']]
  }
};
exports.language = language;
},{}]},{},["b1wc"], null)