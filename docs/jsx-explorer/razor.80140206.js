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
})({"iQJG":[function(require,module,exports) {
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

var EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
var conf = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
  comments: {
    blockComment: ['<!--', '-->']
  },
  brackets: [['<!--', '-->'], ['<', '>'], ['{', '}'], ['(', ')']],
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
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }, {
    open: '<',
    close: '>'
  }],
  onEnterRules: [{
    beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
    afterText: /^<\/(\w[\w\d]*)\s*>$/i,
    action: {
      indentAction: _monaco.languages.IndentAction.IndentOutdent
    }
  }, {
    beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
    action: {
      indentAction: _monaco.languages.IndentAction.Indent
    }
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '',
  // ignoreCase: true,
  // The main tokenizer for our languages
  tokenizer: {
    root: [[/@@/], [/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.root'
    }], [/<!DOCTYPE/, 'metatag.html', '@doctype'], [/<!--/, 'comment.html', '@comment'], [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']], [/(<)(script)/, ['delimiter.html', {
      token: 'tag.html',
      next: '@script'
    }]], [/(<)(style)/, ['delimiter.html', {
      token: 'tag.html',
      next: '@style'
    }]], [/(<)([:\w]+)/, ['delimiter.html', {
      token: 'tag.html',
      next: '@otherTag'
    }]], [/(<\/)(\w+)/, ['delimiter.html', {
      token: 'tag.html',
      next: '@otherTag'
    }]], [/</, 'delimiter.html'], [/[ \t\r\n]+/], [/[^<@]+/]],
    doctype: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.comment'
    }], [/[^>]+/, 'metatag.content.html'], [/>/, 'metatag.html', '@pop']],
    comment: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.comment'
    }], [/-->/, 'comment.html', '@pop'], [/[^-]+/, 'comment.content.html'], [/./, 'comment.content.html']],
    otherTag: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.otherTag'
    }], [/\/?>/, 'delimiter.html', '@pop'], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/[ \t\r\n]+/]],
    // -- BEGIN <script> tags handling
    // After <script
    script: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.script'
    }], [/type/, 'attribute.name', '@scriptAfterType'], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/>/, {
      token: 'delimiter.html',
      next: '@scriptEmbedded.text/javascript',
      nextEmbedded: 'text/javascript'
    }], [/[ \t\r\n]+/], [/(<\/)(script\s*)(>)/, ['delimiter.html', 'tag.html', {
      token: 'delimiter.html',
      next: '@pop'
    }]]],
    // After <script ... type
    scriptAfterType: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.scriptAfterType'
    }], [/=/, 'delimiter', '@scriptAfterTypeEquals'], [/>/, {
      token: 'delimiter.html',
      next: '@scriptEmbedded.text/javascript',
      nextEmbedded: 'text/javascript'
    }], [/[ \t\r\n]+/], [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <script ... type =
    scriptAfterTypeEquals: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.scriptAfterTypeEquals'
    }], [/"([^"]*)"/, {
      token: 'attribute.value',
      switchTo: '@scriptWithCustomType.$1'
    }], [/'([^']*)'/, {
      token: 'attribute.value',
      switchTo: '@scriptWithCustomType.$1'
    }], [/>/, {
      token: 'delimiter.html',
      next: '@scriptEmbedded.text/javascript',
      nextEmbedded: 'text/javascript'
    }], [/[ \t\r\n]+/], [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <script ... type = $S2
    scriptWithCustomType: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.scriptWithCustomType.$S2'
    }], [/>/, {
      token: 'delimiter.html',
      next: '@scriptEmbedded.$S2',
      nextEmbedded: '$S2'
    }], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/[ \t\r\n]+/], [/<\/script\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    scriptEmbedded: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInEmbeddedState.scriptEmbedded.$S2',
      nextEmbedded: '@pop'
    }], [/<\/script/, {
      token: '@rematch',
      next: '@pop',
      nextEmbedded: '@pop'
    }]],
    // -- END <script> tags handling
    // -- BEGIN <style> tags handling
    // After <style
    style: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.style'
    }], [/type/, 'attribute.name', '@styleAfterType'], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/>/, {
      token: 'delimiter.html',
      next: '@styleEmbedded.text/css',
      nextEmbedded: 'text/css'
    }], [/[ \t\r\n]+/], [/(<\/)(style\s*)(>)/, ['delimiter.html', 'tag.html', {
      token: 'delimiter.html',
      next: '@pop'
    }]]],
    // After <style ... type
    styleAfterType: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.styleAfterType'
    }], [/=/, 'delimiter', '@styleAfterTypeEquals'], [/>/, {
      token: 'delimiter.html',
      next: '@styleEmbedded.text/css',
      nextEmbedded: 'text/css'
    }], [/[ \t\r\n]+/], [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <style ... type =
    styleAfterTypeEquals: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.styleAfterTypeEquals'
    }], [/"([^"]*)"/, {
      token: 'attribute.value',
      switchTo: '@styleWithCustomType.$1'
    }], [/'([^']*)'/, {
      token: 'attribute.value',
      switchTo: '@styleWithCustomType.$1'
    }], [/>/, {
      token: 'delimiter.html',
      next: '@styleEmbedded.text/css',
      nextEmbedded: 'text/css'
    }], [/[ \t\r\n]+/], [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    // After <style ... type = $S2
    styleWithCustomType: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInSimpleState.styleWithCustomType.$S2'
    }], [/>/, {
      token: 'delimiter.html',
      next: '@styleEmbedded.$S2',
      nextEmbedded: '$S2'
    }], [/"([^"]*)"/, 'attribute.value'], [/'([^']*)'/, 'attribute.value'], [/[\w\-]+/, 'attribute.name'], [/=/, 'delimiter'], [/[ \t\r\n]+/], [/<\/style\s*>/, {
      token: '@rematch',
      next: '@pop'
    }]],
    styleEmbedded: [[/@[^@]/, {
      token: '@rematch',
      switchTo: '@razorInEmbeddedState.styleEmbedded.$S2',
      nextEmbedded: '@pop'
    }], [/<\/style/, {
      token: '@rematch',
      next: '@pop',
      nextEmbedded: '@pop'
    }]],
    // -- END <style> tags handling
    razorInSimpleState: [[/@\*/, 'comment.cs', '@razorBlockCommentTopLevel'], [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'], [/(@)(\s*[\w]+)/, ['metatag.cs', {
      token: 'identifier.cs',
      switchTo: '@$S2.$S3'
    }]], [/[})]/, {
      token: 'metatag.cs',
      switchTo: '@$S2.$S3'
    }], [/\*@/, {
      token: 'comment.cs',
      switchTo: '@$S2.$S3'
    }]],
    razorInEmbeddedState: [[/@\*/, 'comment.cs', '@razorBlockCommentTopLevel'], [/@[{(]/, 'metatag.cs', '@razorRootTopLevel'], [/(@)(\s*[\w]+)/, ['metatag.cs', {
      token: 'identifier.cs',
      switchTo: '@$S2.$S3',
      nextEmbedded: '$S3'
    }]], [/[})]/, {
      token: 'metatag.cs',
      switchTo: '@$S2.$S3',
      nextEmbedded: '$S3'
    }], [/\*@/, {
      token: 'comment.cs',
      switchTo: '@$S2.$S3',
      nextEmbedded: '$S3'
    }]],
    razorBlockCommentTopLevel: [[/\*@/, '@rematch', '@pop'], [/[^*]+/, 'comment.cs'], [/./, 'comment.cs']],
    razorBlockComment: [[/\*@/, 'comment.cs', '@pop'], [/[^*]+/, 'comment.cs'], [/./, 'comment.cs']],
    razorRootTopLevel: [[/\{/, 'delimiter.bracket.cs', '@razorRoot'], [/\(/, 'delimiter.parenthesis.cs', '@razorRoot'], [/[})]/, '@rematch', '@pop'], {
      include: 'razorCommon'
    }],
    razorRoot: [[/\{/, 'delimiter.bracket.cs', '@razorRoot'], [/\(/, 'delimiter.parenthesis.cs', '@razorRoot'], [/\}/, 'delimiter.bracket.cs', '@pop'], [/\)/, 'delimiter.parenthesis.cs', '@pop'], {
      include: 'razorCommon'
    }],
    razorCommon: [[/[a-zA-Z_]\w*/, {
      cases: {
        '@razorKeywords': {
          token: 'keyword.cs'
        },
        '@default': 'identifier.cs'
      }
    }], // brackets
    [/[\[\]]/, 'delimiter.array.cs'], // whitespace
    [/[ \t\r\n]+/], // comments
    [/\/\/.*$/, 'comment.cs'], [/@\*/, 'comment.cs', '@razorBlockComment'], // strings
    [/"([^"]*)"/, 'string.cs'], [/'([^']*)'/, 'string.cs'], // simple html
    [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']], [/(<)(\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']], [/(<\/)(\w+)(>)/, ['delimiter.html', 'tag.html', 'delimiter.html']], // delimiters
    [/[\+\-\*\%\&\|\^\~\!\=\<\>\/\?\;\:\.\,]/, 'delimiter.cs'], // numbers
    [/\d*\d+[eE]([\-+]?\d+)?/, 'number.float.cs'], [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float.cs'], [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.cs'], [/0[0-7']*[0-7]/, 'number.octal.cs'], [/0[bB][0-1']*[0-1]/, 'number.binary.cs'], [/\d[\d']*/, 'number.cs'], [/\d/, 'number.cs']]
  },
  razorKeywords: ['abstract', 'as', 'async', 'await', 'base', 'bool', 'break', 'by', 'byte', 'case', 'catch', 'char', 'checked', 'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'descending', 'explicit', 'event', 'extern', 'else', 'enum', 'false', 'finally', 'fixed', 'float', 'for', 'foreach', 'from', 'goto', 'group', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'into', 'is', 'lock', 'long', 'nameof', 'new', 'null', 'namespace', 'object', 'operator', 'out', 'override', 'orderby', 'params', 'private', 'protected', 'public', 'readonly', 'ref', 'return', 'switch', 'struct', 'sbyte', 'sealed', 'short', 'sizeof', 'stackalloc', 'static', 'string', 'select', 'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using', 'var', 'virtual', 'volatile', 'void', 'when', 'while', 'where', 'yield', 'model', 'inject' // Razor specific
  ],
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/
};
exports.language = language;
},{}]},{},["iQJG"], null)