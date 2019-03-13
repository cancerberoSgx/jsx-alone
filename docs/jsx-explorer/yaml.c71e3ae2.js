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
})({"hmPW":[function(require,module,exports) {
"use strict";

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
    offSide: true
  }
};
exports.conf = conf;
var language = {
  tokenPostfix: '.yaml',
  brackets: [{
    token: 'delimiter.bracket',
    open: '{',
    close: '}'
  }, {
    token: 'delimiter.square',
    open: '[',
    close: ']'
  }],
  keywords: ['true', 'True', 'TRUE', 'false', 'False', 'FALSE', 'null', 'Null', 'Null', '~'],
  numberInteger: /(?:0|[+-]?[0-9]+)/,
  numberFloat: /(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,
  numberOctal: /0o[0-7]+/,
  numberHex: /0x[0-9a-fA-F]+/,
  numberInfinity: /[+-]?\.(?:inf|Inf|INF)/,
  numberNaN: /\.(?:nan|Nan|NAN)/,
  numberDate: /\d{4}-\d\d-\d\d([Tt ]\d\d:\d\d:\d\d(\.\d+)?(( ?[+-]\d\d?(:\d\d)?)|Z)?)?/,
  escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  tokenizer: {
    root: [{
      include: '@whitespace'
    }, {
      include: '@comment'
    }, // Directive
    [/%[^ ]+.*$/, 'meta.directive'], // Document Markers
    [/---/, 'operators.directivesEnd'], [/\.{3}/, 'operators.documentEnd'], // Block Structure Indicators
    [/[-?:](?= )/, 'operators'], {
      include: '@anchor'
    }, {
      include: '@tagHandle'
    }, {
      include: '@flowCollections'
    }, {
      include: '@blockStyle'
    }, // Numbers
    [/@numberInteger(?![ \t]*\S+)/, 'number'], [/@numberFloat(?![ \t]*\S+)/, 'number.float'], [/@numberOctal(?![ \t]*\S+)/, 'number.octal'], [/@numberHex(?![ \t]*\S+)/, 'number.hex'], [/@numberInfinity(?![ \t]*\S+)/, 'number.infinity'], [/@numberNaN(?![ \t]*\S+)/, 'number.nan'], [/@numberDate(?![ \t]*\S+)/, 'number.date'], // Key:Value pair
    [/(".*?"|'.*?'|.*?)([ \t]*)(:)( |$)/, ['type', 'white', 'operators', 'white']], {
      include: '@flowScalars'
    }, // String nodes
    [/.+$/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'string'
      }
    }]],
    // Flow Collection: Flow Mapping
    object: [{
      include: '@whitespace'
    }, {
      include: '@comment'
    }, // Flow Mapping termination
    [/\}/, '@brackets', '@pop'], // Flow Mapping delimiter
    [/,/, 'delimiter.comma'], // Flow Mapping Key:Value delimiter
    [/:(?= )/, 'operators'], // Flow Mapping Key:Value key
    [/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/, 'type'], // Start Flow Style
    {
      include: '@flowCollections'
    }, {
      include: '@flowScalars'
    }, // Scalar Data types
    {
      include: '@tagHandle'
    }, {
      include: '@anchor'
    }, {
      include: '@flowNumber'
    }, // Other value (keyword or string)
    [/[^\},]+/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'string'
      }
    }]],
    // Flow Collection: Flow Sequence
    array: [{
      include: '@whitespace'
    }, {
      include: '@comment'
    }, // Flow Sequence termination
    [/\]/, '@brackets', '@pop'], // Flow Sequence delimiter
    [/,/, 'delimiter.comma'], // Start Flow Style
    {
      include: '@flowCollections'
    }, {
      include: '@flowScalars'
    }, // Scalar Data types
    {
      include: '@tagHandle'
    }, {
      include: '@anchor'
    }, {
      include: '@flowNumber'
    }, // Other value (keyword or string)
    [/[^\],]+/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'string'
      }
    }]],
    // First line of a Block Style
    multiString: [[/^( +).+$/, 'string', '@multiStringContinued.$1']],
    // Further lines of a Block Style
    //   Workaround for indentation detection
    multiStringContinued: [[/^( *).+$/, {
      cases: {
        '$1==$S2': 'string',
        '@default': {
          token: '@rematch',
          next: '@popall'
        }
      }
    }]],
    whitespace: [[/[ \t\r\n]+/, 'white']],
    // Only line comments
    comment: [[/#.*$/, 'comment']],
    // Start Flow Collections
    flowCollections: [[/\[/, '@brackets', '@array'], [/\{/, '@brackets', '@object']],
    // Start Flow Scalars (quoted strings)
    flowScalars: [[/"([^"\\]|\\.)*$/, 'string.invalid'], [/'([^'\\]|\\.)*$/, 'string.invalid'], [/'[^']*'/, 'string'], [/"/, 'string', '@doubleQuotedString']],
    doubleQuotedString: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, 'string', '@pop']],
    // Start Block Scalar
    blockStyle: [[/[>|][0-9]*[+-]?$/, 'operators', '@multiString']],
    // Numbers in Flow Collections (terminate with ,]})
    flowNumber: [[/@numberInteger(?=[ \t]*[,\]\}])/, 'number'], [/@numberFloat(?=[ \t]*[,\]\}])/, 'number.float'], [/@numberOctal(?=[ \t]*[,\]\}])/, 'number.octal'], [/@numberHex(?=[ \t]*[,\]\}])/, 'number.hex'], [/@numberInfinity(?=[ \t]*[,\]\}])/, 'number.infinity'], [/@numberNaN(?=[ \t]*[,\]\}])/, 'number.nan'], [/@numberDate(?=[ \t]*[,\]\}])/, 'number.date']],
    tagHandle: [[/\![^ ]*/, 'tag']],
    anchor: [[/[&*][^ ]+/, 'namespace']]
  }
};
exports.language = language;
},{}]},{},["hmPW"], null)