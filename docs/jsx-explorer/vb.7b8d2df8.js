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
})({"kRCM":[function(require,module,exports) {
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
    lineComment: '\'',
    blockComment: ['/*', '*/']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>'], ['addhandler', 'end addhandler'], ['class', 'end class'], ['enum', 'end enum'], ['event', 'end event'], ['function', 'end function'], ['get', 'end get'], ['if', 'end if'], ['interface', 'end interface'], ['module', 'end module'], ['namespace', 'end namespace'], ['operator', 'end operator'], ['property', 'end property'], ['raiseevent', 'end raiseevent'], ['removehandler', 'end removehandler'], ['select', 'end select'], ['set', 'end set'], ['structure', 'end structure'], ['sub', 'end sub'], ['synclock', 'end synclock'], ['try', 'end try'], ['while', 'end while'], ['with', 'end with'], ['using', 'end using'], ['do', 'loop'], ['for', 'next']],
  autoClosingPairs: [{
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
  }, {
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '<',
    close: '>',
    notIn: ['string', 'comment']
  }],
  folding: {
    markers: {
      start: new RegExp("^\\s*#Region\\b"),
      end: new RegExp("^\\s*#End Region\\b")
    }
  }
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.vb',
  ignoreCase: true,
  brackets: [{
    token: 'delimiter.bracket',
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
  }, {
    token: 'delimiter.angle',
    open: '<',
    close: '>'
  }, // Special bracket statement pairs
  // according to https://msdn.microsoft.com/en-us/library/tsw2a11z.aspx
  {
    token: 'keyword.tag-addhandler',
    open: 'addhandler',
    close: 'end addhandler'
  }, {
    token: 'keyword.tag-class',
    open: 'class',
    close: 'end class'
  }, {
    token: 'keyword.tag-enum',
    open: 'enum',
    close: 'end enum'
  }, {
    token: 'keyword.tag-event',
    open: 'event',
    close: 'end event'
  }, {
    token: 'keyword.tag-function',
    open: 'function',
    close: 'end function'
  }, {
    token: 'keyword.tag-get',
    open: 'get',
    close: 'end get'
  }, {
    token: 'keyword.tag-if',
    open: 'if',
    close: 'end if'
  }, {
    token: 'keyword.tag-interface',
    open: 'interface',
    close: 'end interface'
  }, {
    token: 'keyword.tag-module',
    open: 'module',
    close: 'end module'
  }, {
    token: 'keyword.tag-namespace',
    open: 'namespace',
    close: 'end namespace'
  }, {
    token: 'keyword.tag-operator',
    open: 'operator',
    close: 'end operator'
  }, {
    token: 'keyword.tag-property',
    open: 'property',
    close: 'end property'
  }, {
    token: 'keyword.tag-raiseevent',
    open: 'raiseevent',
    close: 'end raiseevent'
  }, {
    token: 'keyword.tag-removehandler',
    open: 'removehandler',
    close: 'end removehandler'
  }, {
    token: 'keyword.tag-select',
    open: 'select',
    close: 'end select'
  }, {
    token: 'keyword.tag-set',
    open: 'set',
    close: 'end set'
  }, {
    token: 'keyword.tag-structure',
    open: 'structure',
    close: 'end structure'
  }, {
    token: 'keyword.tag-sub',
    open: 'sub',
    close: 'end sub'
  }, {
    token: 'keyword.tag-synclock',
    open: 'synclock',
    close: 'end synclock'
  }, {
    token: 'keyword.tag-try',
    open: 'try',
    close: 'end try'
  }, {
    token: 'keyword.tag-while',
    open: 'while',
    close: 'end while'
  }, {
    token: 'keyword.tag-with',
    open: 'with',
    close: 'end with'
  }, // Other pairs
  {
    token: 'keyword.tag-using',
    open: 'using',
    close: 'end using'
  }, {
    token: 'keyword.tag-do',
    open: 'do',
    close: 'loop'
  }, {
    token: 'keyword.tag-for',
    open: 'for',
    close: 'next'
  }],
  keywords: ['AddHandler', 'AddressOf', 'Alias', 'And', 'AndAlso', 'As', 'Async', 'Boolean', 'ByRef', 'Byte', 'ByVal', 'Call', 'Case', 'Catch', 'CBool', 'CByte', 'CChar', 'CDate', 'CDbl', 'CDec', 'Char', 'CInt', 'Class', 'CLng', 'CObj', 'Const', 'Continue', 'CSByte', 'CShort', 'CSng', 'CStr', 'CType', 'CUInt', 'CULng', 'CUShort', 'Date', 'Decimal', 'Declare', 'Default', 'Delegate', 'Dim', 'DirectCast', 'Do', 'Double', 'Each', 'Else', 'ElseIf', 'End', 'EndIf', 'Enum', 'Erase', 'Error', 'Event', 'Exit', 'False', 'Finally', 'For', 'Friend', 'Function', 'Get', 'GetType', 'GetXMLNamespace', 'Global', 'GoSub', 'GoTo', 'Handles', 'If', 'Implements', 'Imports', 'In', 'Inherits', 'Integer', 'Interface', 'Is', 'IsNot', 'Let', 'Lib', 'Like', 'Long', 'Loop', 'Me', 'Mod', 'Module', 'MustInherit', 'MustOverride', 'MyBase', 'MyClass', 'NameOf', 'Namespace', 'Narrowing', 'New', 'Next', 'Not', 'Nothing', 'NotInheritable', 'NotOverridable', 'Object', 'Of', 'On', 'Operator', 'Option', 'Optional', 'Or', 'OrElse', 'Out', 'Overloads', 'Overridable', 'Overrides', 'ParamArray', 'Partial', 'Private', 'Property', 'Protected', 'Public', 'RaiseEvent', 'ReadOnly', 'ReDim', 'RemoveHandler', 'Resume', 'Return', 'SByte', 'Select', 'Set', 'Shadows', 'Shared', 'Short', 'Single', 'Static', 'Step', 'Stop', 'String', 'Structure', 'Sub', 'SyncLock', 'Then', 'Throw', 'To', 'True', 'Try', 'TryCast', 'TypeOf', 'UInteger', 'ULong', 'UShort', 'Using', 'Variant', 'Wend', 'When', 'While', 'Widening', 'With', 'WithEvents', 'WriteOnly', 'Xor'],
  tagwords: ['If', 'Sub', 'Select', 'Try', 'Class', 'Enum', 'Function', 'Get', 'Interface', 'Module', 'Namespace', 'Operator', 'Set', 'Structure', 'Using', 'While', 'With', 'Do', 'Loop', 'For', 'Next', 'Property', 'Continue', 'AddHandler', 'RemoveHandler', 'Event', 'RaiseEvent', 'SyncLock'],
  // we include these common regular expressions
  symbols: /[=><!~?;\.,:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  integersuffix: /U?[DI%L&S@]?/,
  floatsuffix: /[R#F!]?/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [// whitespace
    {
      include: '@whitespace'
    }, // special ending tag-words
    [/next(?!\w)/, {
      token: 'keyword.tag-for'
    }], [/loop(?!\w)/, {
      token: 'keyword.tag-do'
    }], // usual ending tags
    [/end\s+(?!for|do)([a-zA-Z_]\w*)/, {
      token: 'keyword.tag-$1'
    }], // identifiers, tagwords, and keywords
    [/[a-zA-Z_]\w*/, {
      cases: {
        '@tagwords': {
          token: 'keyword.tag-$0'
        },
        '@keywords': {
          token: 'keyword.$0'
        },
        '@default': 'identifier'
      }
    }], // Preprocessor directive
    [/^\s*#\w+/, 'keyword'], // numbers
    [/\d*\d+e([\-+]?\d+)?(@floatsuffix)/, 'number.float'], [/\d*\.\d+(e[\-+]?\d+)?(@floatsuffix)/, 'number.float'], [/&H[0-9a-f]+(@integersuffix)/, 'number.hex'], [/&0[0-7]+(@integersuffix)/, 'number.octal'], [/\d+(@integersuffix)/, 'number'], // date literal
    [/#.*#/, 'number'], // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/@symbols/, 'delimiter'], // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, 'string', '@string']],
    whitespace: [[/[ \t\r\n]+/, ''], [/(\'|REM(?!\w)).*$/, 'comment']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"C?/, 'string', '@pop']]
  }
};
exports.language = language;
},{}]},{},["kRCM"], null)