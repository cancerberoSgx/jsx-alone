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
})({"bkfw":[function(require,module,exports) {
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
  tokenPostfix: '.rust',
  defaultToken: 'invalid',
  keywords: ['as', 'box', 'break', 'const', 'continue', 'crate', 'else', 'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self', 'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while', 'catch', 'default', 'union', 'static', 'abstract', 'alignof', 'become', 'do', 'final', 'macro', 'offsetof', 'override', 'priv', 'proc', 'pure', 'sizeof', 'typeof', 'unsized', 'virtual', 'yield'],
  typeKeywords: ['Self', 'm32', 'm64', 'm128', 'f80', 'f16', 'f128', 'int', 'uint', 'float', 'char', 'bool', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'i8', 'i16', 'i32', 'i64', 'str', 'Option', 'Either', 'c_float', 'c_double', 'c_void', 'FILE', 'fpos_t', 'DIR', 'dirent', 'c_char', 'c_schar', 'c_uchar', 'c_short', 'c_ushort', 'c_int', 'c_uint', 'c_long', 'c_ulong', 'size_t', 'ptrdiff_t', 'clock_t', 'time_t', 'c_longlong', 'c_ulonglong', 'intptr_t', 'uintptr_t', 'off_t', 'dev_t', 'ino_t', 'pid_t', 'mode_t', 'ssize_t'],
  constants: ['true', 'false', 'Some', 'None', 'Left', 'Right', 'Ok', 'Err'],
  supportConstants: ['EXIT_FAILURE', 'EXIT_SUCCESS', 'RAND_MAX', 'EOF', 'SEEK_SET', 'SEEK_CUR', 'SEEK_END', '_IOFBF', '_IONBF', '_IOLBF', 'BUFSIZ', 'FOPEN_MAX', 'FILENAME_MAX', 'L_tmpnam', 'TMP_MAX', 'O_RDONLY', 'O_WRONLY', 'O_RDWR', 'O_APPEND', 'O_CREAT', 'O_EXCL', 'O_TRUNC', 'S_IFIFO', 'S_IFCHR', 'S_IFBLK', 'S_IFDIR', 'S_IFREG', 'S_IFMT', 'S_IEXEC', 'S_IWRITE', 'S_IREAD', 'S_IRWXU', 'S_IXUSR', 'S_IWUSR', 'S_IRUSR', 'F_OK', 'R_OK', 'W_OK', 'X_OK', 'STDIN_FILENO', 'STDOUT_FILENO', 'STDERR_FILENO'],
  supportMacros: ['format!', 'print!', 'println!', 'panic!', 'format_args!', 'unreachable!', 'write!', 'writeln!'],
  operators: ['!', '!=', '%', '%=', '&', '&=', '&&', '*', '*=', '+', '+=', '-', '-=', '->', '.', '..', '...', '/', '/=', ':', ';', '<<', '<<=', '<', '<=', '=', '==', '=>', '>', '>=', '>>', '>>=', '@', '^', '^=', '|', '|=', '||', '_', '?', '#'],
  escapes: /\\([nrt0\"''\\]|x\h{2}|u\{\h{1,6}\})/,
  delimiters: /[,]/,
  symbols: /[\#\!\%\&\*\+\-\.\/\:\;\<\=\>\@\^\|_\?]+/,
  intSuffixes: /[iu](8|16|32|64|128|size)/,
  floatSuffixes: /f(32|64)/,
  tokenizer: {
    root: [[/[a-zA-Z][a-zA-Z0-9_]*!?|_[a-zA-Z0-9_]+/, {
      cases: {
        '@typeKeywords': 'keyword.type',
        '@keywords': 'keyword',
        '@supportConstants': 'keyword',
        '@supportMacros': 'keyword',
        '@constants': 'keyword',
        '@default': 'identifier'
      }
    }], // Designator
    [/\$/, 'identifier'], // Lifetime annotations
    [/'[a-zA-Z_][a-zA-Z0-9_]*(?=[^\'])/, 'identifier'], // Byte literal
    [/'\S'/, 'string.byteliteral'], // Strings
    [/"/, {
      token: 'string.quote',
      bracket: '@open',
      next: '@string'
    }], {
      include: '@numbers'
    }, // Whitespace + comments
    {
      include: '@whitespace'
    }, [/@delimiters/, {
      cases: {
        '@keywords': 'keyword',
        '@default': 'delimiter'
      }
    }], [/[{}()\[\]<>]/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'operator',
        '@default': ''
      }
    }]],
    whitespace: [[/[ \t\r\n]+/, 'white'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], [/\/\*/, 'comment', '@push'], ["\\*/", 'comment', '@pop'], [/[\/*]/, 'comment']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, {
      token: 'string.quote',
      bracket: '@close',
      next: '@pop'
    }]],
    numbers: [//Octal
    [/(0o[0-7_]+)(@intSuffixes)?/, {
      token: 'number'
    }], //Binary
    [/(0b[0-1_]+)(@intSuffixes)?/, {
      token: 'number'
    }], //Exponent
    [/[\d][\d_]*(\.[\d][\d_]*)?[eE][+-][\d_]+(@floatSuffixes)?/, {
      token: 'number'
    }], //Float
    [/\b(\d\.?[\d_]*)(@floatSuffixes)?\b/, {
      token: 'number'
    }], //Hexadecimal
    [/(0x[\da-fA-F]+)_?(@intSuffixes)?/, {
      token: 'number'
    }], //Integer
    [/[\d][\d_]*(@intSuffixes?)?/, {
      token: 'number'
    }]]
  }
};
exports.language = language;
},{}]},{},["bkfw"], null)