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
})({"UCoW":[function(require,module,exports) {
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
    lineComment: '//'
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string', 'comment']
  }, {
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
  }],
  folding: {
    offSide: true
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.pug',
  ignoreCase: true,
  brackets: [{
    token: 'delimiter.curly',
    open: '{',
    close: '}'
  }, {
    token: 'delimiter.array',
    open: '[',
    close: ']'
  }, {
    token: 'delimiter.parenthesis',
    open: '(',
    close: ')'
  }],
  keywords: ['append', 'block', 'case', 'default', 'doctype', 'each', 'else', 'extends', 'for', 'if', 'in', 'include', 'mixin', 'typeof', 'unless', 'var', 'when'],
  tags: ['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tracks', 'tt', 'u', 'ul', 'video', 'wbr'],
  // we include these common regular expressions
  symbols: /[\+\-\*\%\&\|\!\=\/\.\,\:]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  tokenizer: {
    root: [// Tag or a keyword at start
    [/^(\s*)([a-zA-Z_-][\w-]*)/, {
      cases: {
        '$2@tags': {
          cases: {
            '@eos': ['', 'tag'],
            '@default': ['', {
              token: 'tag',
              next: '@tag.$1'
            }]
          }
        },
        '$2@keywords': ['', {
          token: 'keyword.$2'
        }],
        '@default': ['', '']
      }
    }], // id
    [/^(\s*)(#[a-zA-Z_-][\w-]*)/, {
      cases: {
        '@eos': ['', 'tag.id'],
        '@default': ['', {
          token: 'tag.id',
          next: '@tag.$1'
        }]
      }
    }], // class
    [/^(\s*)(\.[a-zA-Z_-][\w-]*)/, {
      cases: {
        '@eos': ['', 'tag.class'],
        '@default': ['', {
          token: 'tag.class',
          next: '@tag.$1'
        }]
      }
    }], // plain text with pipe
    [/^(\s*)(\|.*)$/, ''], {
      include: '@whitespace'
    }, // keywords
    [/[a-zA-Z_$][\w$]*/, {
      cases: {
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': ''
      }
    }], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/@symbols/, 'delimiter'], // numbers
    [/\d+\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/\d+/, 'number'], // strings:
    [/"/, 'string', '@string."'], [/'/, 'string', '@string.\'']],
    tag: [[/(\.)(\s*$)/, [{
      token: 'delimiter',
      next: '@blockText.$S2.'
    }, '']], [/\s+/, {
      token: '',
      next: '@simpleText'
    }], // id
    [/#[a-zA-Z_-][\w-]*/, {
      cases: {
        '@eos': {
          token: 'tag.id',
          next: '@pop'
        },
        '@default': 'tag.id'
      }
    }], // class
    [/\.[a-zA-Z_-][\w-]*/, {
      cases: {
        '@eos': {
          token: 'tag.class',
          next: '@pop'
        },
        '@default': 'tag.class'
      }
    }], // attributes
    [/\(/, {
      token: 'delimiter.parenthesis',
      next: '@attributeList'
    }]],
    simpleText: [[/[^#]+$/, {
      token: '',
      next: '@popall'
    }], [/[^#]+/, {
      token: ''
    }], // interpolation
    [/(#{)([^}]*)(})/, {
      cases: {
        '@eos': ['interpolation.delimiter', 'interpolation', {
          token: 'interpolation.delimiter',
          next: '@popall'
        }],
        '@default': ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']
      }
    }], [/#$/, {
      token: '',
      next: '@popall'
    }], [/#/, '']],
    attributeList: [[/\s+/, ''], [/(\w+)(\s*=\s*)("|')/, ['attribute.name', 'delimiter', {
      token: 'attribute.value',
      next: '@value.$3'
    }]], [/\w+/, 'attribute.name'], [/,/, {
      cases: {
        '@eos': {
          token: 'attribute.delimiter',
          next: '@popall'
        },
        '@default': 'attribute.delimiter'
      }
    }], [/\)$/, {
      token: 'delimiter.parenthesis',
      next: '@popall'
    }], [/\)/, {
      token: 'delimiter.parenthesis',
      next: '@pop'
    }]],
    whitespace: [[/^(\s*)(\/\/.*)$/, {
      token: 'comment',
      next: '@blockText.$1.comment'
    }], [/[ \t\r\n]+/, ''], [/<!--/, {
      token: 'comment',
      next: '@comment'
    }]],
    blockText: [[/^\s+.*$/, {
      cases: {
        '($S2\\s+.*$)': {
          token: '$S3'
        },
        '@default': {
          token: '@rematch',
          next: '@popall'
        }
      }
    }], [/./, {
      token: '@rematch',
      next: '@popall'
    }]],
    comment: [[/[^<\-]+/, 'comment.content'], [/-->/, {
      token: 'comment',
      next: '@pop'
    }], [/<!--/, 'comment.content.invalid'], [/[<\-]/, 'comment.content']],
    string: [[/[^\\"'#]+/, {
      cases: {
        '@eos': {
          token: 'string',
          next: '@popall'
        },
        '@default': 'string'
      }
    }], [/@escapes/, {
      cases: {
        '@eos': {
          token: 'string.escape',
          next: '@popall'
        },
        '@default': 'string.escape'
      }
    }], [/\\./, {
      cases: {
        '@eos': {
          token: 'string.escape.invalid',
          next: '@popall'
        },
        '@default': 'string.escape.invalid'
      }
    }], // interpolation
    [/(#{)([^}]*)(})/, ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']], [/#/, 'string'], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'string',
          next: '@pop'
        },
        '@default': {
          token: 'string'
        }
      }
    }]],
    // Almost identical to above, except for escapes and the output token
    value: [[/[^\\"']+/, {
      cases: {
        '@eos': {
          token: 'attribute.value',
          next: '@popall'
        },
        '@default': 'attribute.value'
      }
    }], [/\\./, {
      cases: {
        '@eos': {
          token: 'attribute.value',
          next: '@popall'
        },
        '@default': 'attribute.value'
      }
    }], [/["']/, {
      cases: {
        '$#==$S2': {
          token: 'attribute.value',
          next: '@pop'
        },
        '@default': {
          token: 'attribute.value'
        }
      }
    }]]
  }
};
exports.language = language;
},{}]},{},["UCoW"], null)