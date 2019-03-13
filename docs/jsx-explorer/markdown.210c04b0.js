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
})({"Hqec":[function(require,module,exports) {
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
    blockComment: ['<!--', '-->']
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
    open: '<',
    close: '>',
    notIn: ['string']
  }],
  surroundingPairs: [{
    open: '(',
    close: ')'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '`',
    close: '`'
  }],
  folding: {
    markers: {
      start: new RegExp("^\\s*<!--\\s*#?region\\b.*-->"),
      end: new RegExp("^\\s*<!--\\s*#?endregion\\b.*-->")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.md',
  // escape codes
  control: /[\\`*_\[\]{}()#+\-\.!]/,
  noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
  escapes: /\\(?:@control)/,
  // escape codes for javascript/CSS strings
  jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  // non matched elements
  empty: ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'],
  tokenizer: {
    root: [// headers (with #)
    [/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ['white', 'keyword', 'keyword', 'keyword']], // headers (with =)
    [/^\s*(=+|\-+)\s*$/, 'keyword'], // headers (with ***)
    [/^\s*((\*[ ]?)+)\s*$/, 'meta.separator'], // quote
    [/^\s*>+/, 'comment'], // list (starting with * or number)
    [/^\s*([\*\-+:]|\d+\.)\s/, 'keyword'], // code block (4 spaces indent)
    [/^(\t|[ ]{4})[^ ].*$/, 'string'], // code block (3 tilde)
    [/^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/, {
      token: 'string',
      next: '@codeblock'
    }], // github style code blocks (with backticks and language)
    [/^\s*```\s*((?:\w|[\/\-#])+)\s*$/, {
      token: 'string',
      next: '@codeblockgh',
      nextEmbedded: '$1'
    }], // github style code blocks (with backticks but no language)
    [/^\s*```\s*$/, {
      token: 'string',
      next: '@codeblock'
    }], // markup within lines
    {
      include: '@linecontent'
    }],
    codeblock: [[/^\s*~~~\s*$/, {
      token: 'string',
      next: '@pop'
    }], [/^\s*```\s*$/, {
      token: 'string',
      next: '@pop'
    }], [/.*$/, 'variable.source']],
    // github style code blocks
    codeblockgh: [[/```\s*$/, {
      token: 'variable.source',
      next: '@pop',
      nextEmbedded: '@pop'
    }], [/[^`]+/, 'variable.source']],
    linecontent: [// escapes
    [/&\w+;/, 'string.escape'], [/@escapes/, 'escape'], // various markup
    [/\b__([^\\_]|@escapes|_(?!_))+__\b/, 'strong'], [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, 'strong'], [/\b_[^_]+_\b/, 'emphasis'], [/\*([^\\*]|@escapes)+\*/, 'emphasis'], [/`([^\\`]|@escapes)+`/, 'variable'], // links
    [/\{+[^}]+\}+/, 'string.target'], [/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/, ['string.link', '', 'string.link']], [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, 'string.link'], // or html
    {
      include: 'html'
    }],
    // Note: it is tempting to rather switch to the real HTML mode instead of building our own here
    // but currently there is a limitation in Monarch that prevents us from doing it: The opening
    // '<' would start the HTML mode, however there is no way to jump 1 character back to let the
    // HTML mode also tokenize the opening angle bracket. Thus, even though we could jump to HTML,
    // we cannot correctly tokenize it in that mode yet.
    html: [// html tags
    [/<(\w+)\/>/, 'tag'], [/<(\w+)/, {
      cases: {
        '@empty': {
          token: 'tag',
          next: '@tag.$1'
        },
        '@default': {
          token: 'tag',
          next: '@tag.$1'
        }
      }
    }], [/<\/(\w+)\s*>/, {
      token: 'tag'
    }], [/<!--/, 'comment', '@comment']],
    comment: [[/[^<\-]+/, 'comment.content'], [/-->/, 'comment', '@pop'], [/<!--/, 'comment.content.invalid'], [/[<\-]/, 'comment.content']],
    // Almost full HTML tag matching, complete with embedded scripts & styles
    tag: [[/[ \t\r\n]+/, 'white'], [/(type)(\s*=\s*)(")([^"]+)(")/, ['attribute.name.html', 'delimiter.html', 'string.html', {
      token: 'string.html',
      switchTo: '@tag.$S2.$4'
    }, 'string.html']], [/(type)(\s*=\s*)(')([^']+)(')/, ['attribute.name.html', 'delimiter.html', 'string.html', {
      token: 'string.html',
      switchTo: '@tag.$S2.$4'
    }, 'string.html']], [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name.html', 'delimiter.html', 'string.html']], [/\w+/, 'attribute.name.html'], [/\/>/, 'tag', '@pop'], [/>/, {
      cases: {
        '$S2==style': {
          token: 'tag',
          switchTo: 'embeddedStyle',
          nextEmbedded: 'text/css'
        },
        '$S2==script': {
          cases: {
            '$S3': {
              token: 'tag',
              switchTo: 'embeddedScript',
              nextEmbedded: '$S3'
            },
            '@default': {
              token: 'tag',
              switchTo: 'embeddedScript',
              nextEmbedded: 'text/javascript'
            }
          }
        },
        '@default': {
          token: 'tag',
          next: '@pop'
        }
      }
    }]],
    embeddedStyle: [[/[^<]+/, ''], [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop',
      nextEmbedded: '@pop'
    }], [/</, '']],
    embeddedScript: [[/[^<]+/, ''], [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop',
      nextEmbedded: '@pop'
    }], [/</, '']]
  }
};
exports.language = language;
},{}]},{},["Hqec"], null)