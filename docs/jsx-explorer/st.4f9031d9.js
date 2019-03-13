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
})({"CPTR":[function(require,module,exports) {
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
    blockComment: ['(*', '*)']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['var', 'end_var'], ['var_input', 'end_var'], ['var_output', 'end_var'], ['var_in_out', 'end_var'], ['var_temp', 'end_var'], ['var_global', 'end_var'], ['var_access', 'end_var'], ['var_external', 'end_var'], ['type', 'end_type'], ['struct', 'end_struct'], ['program', 'end_program'], ['function', 'end_function'], ['function_block', 'end_function_block'], ['action', 'end_action'], ['step', 'end_step'], ['initial_step', 'end_step'], ['transaction', 'end_transaction'], ['configuration', 'end_configuration'], ['tcp', 'end_tcp'], ['recource', 'end_recource'], ['channel', 'end_channel'], ['library', 'end_library'], ['folder', 'end_folder'], ['binaries', 'end_binaries'], ['includes', 'end_includes'], ['sources', 'end_sources']],
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
    open: '/*',
    close: '*/'
  }, {
    open: '\'',
    close: '\'',
    notIn: ['string_sq']
  }, {
    open: '"',
    close: '"',
    notIn: ['string_dq']
  }, {
    open: 'var',
    close: 'end_var'
  }, {
    open: 'var_input',
    close: 'end_var'
  }, {
    open: 'var_output',
    close: 'end_var'
  }, {
    open: 'var_in_out',
    close: 'end_var'
  }, {
    open: 'var_temp',
    close: 'end_var'
  }, {
    open: 'var_global',
    close: 'end_var'
  }, {
    open: 'var_access',
    close: 'end_var'
  }, {
    open: 'var_external',
    close: 'end_var'
  }, {
    open: 'type',
    close: 'end_type'
  }, {
    open: 'struct',
    close: 'end_struct'
  }, {
    open: 'program',
    close: 'end_program'
  }, {
    open: 'function',
    close: 'end_function'
  }, {
    open: 'function_block',
    close: 'end_function_block'
  }, {
    open: 'action',
    close: 'end_action'
  }, {
    open: 'step',
    close: 'end_step'
  }, {
    open: 'initial_step',
    close: 'end_step'
  }, {
    open: 'transaction',
    close: 'end_transaction'
  }, {
    open: 'configuration',
    close: 'end_configuration'
  }, {
    open: 'tcp',
    close: 'end_tcp'
  }, {
    open: 'recource',
    close: 'end_recource'
  }, {
    open: 'channel',
    close: 'end_channel'
  }, {
    open: 'library',
    close: 'end_library'
  }, {
    open: 'folder',
    close: 'end_folder'
  }, {
    open: 'binaries',
    close: 'end_binaries'
  }, {
    open: 'includes',
    close: 'end_includes'
  }, {
    open: 'sources',
    close: 'end_sources'
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
    open: 'var',
    close: 'end_var'
  }, {
    open: 'var_input',
    close: 'end_var'
  }, {
    open: 'var_output',
    close: 'end_var'
  }, {
    open: 'var_in_out',
    close: 'end_var'
  }, {
    open: 'var_temp',
    close: 'end_var'
  }, {
    open: 'var_global',
    close: 'end_var'
  }, {
    open: 'var_access',
    close: 'end_var'
  }, {
    open: 'var_external',
    close: 'end_var'
  }, {
    open: 'type',
    close: 'end_type'
  }, {
    open: 'struct',
    close: 'end_struct'
  }, {
    open: 'program',
    close: 'end_program'
  }, {
    open: 'function',
    close: 'end_function'
  }, {
    open: 'function_block',
    close: 'end_function_block'
  }, {
    open: 'action',
    close: 'end_action'
  }, {
    open: 'step',
    close: 'end_step'
  }, {
    open: 'initial_step',
    close: 'end_step'
  }, {
    open: 'transaction',
    close: 'end_transaction'
  }, {
    open: 'configuration',
    close: 'end_configuration'
  }, {
    open: 'tcp',
    close: 'end_tcp'
  }, {
    open: 'recource',
    close: 'end_recource'
  }, {
    open: 'channel',
    close: 'end_channel'
  }, {
    open: 'library',
    close: 'end_library'
  }, {
    open: 'folder',
    close: 'end_folder'
  }, {
    open: 'binaries',
    close: 'end_binaries'
  }, {
    open: 'includes',
    close: 'end_includes'
  }, {
    open: 'sources',
    close: 'end_sources'
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
  defaultToken: '',
  tokenPostfix: '.st',
  ignoreCase: true,
  brackets: [{
    token: 'delimiter.curly',
    open: '{',
    close: '}'
  }, {
    token: 'delimiter.parenthesis',
    open: '(',
    close: ')'
  }, {
    token: 'delimiter.square',
    open: '[',
    close: ']'
  }],
  keywords: ['if', 'end_if', 'elsif', 'else', 'case', 'of', 'to', 'do', 'with', 'by', 'while', 'repeat', 'end_while', 'end_repeat', 'end_case', 'for', 'end_for', 'task', 'retain', 'non_retain', 'constant', 'with', 'at', 'exit', 'return', 'interval', 'priority', 'address', 'port', 'on_channel', 'then', 'iec', 'file', 'uses', 'version', 'packagetype', 'displayname', 'copyright', 'summary', 'vendor', 'common_source', 'from'],
  constant: ['false', 'true', 'null'],
  defineKeywords: ['var', 'var_input', 'var_output', 'var_in_out', 'var_temp', 'var_global', 'var_access', 'var_external', 'end_var', 'type', 'end_type', 'struct', 'end_struct', 'program', 'end_program', 'function', 'end_function', 'function_block', 'end_function_block', 'configuration', 'end_configuration', 'tcp', 'end_tcp', 'recource', 'end_recource', 'channel', 'end_channel', 'library', 'end_library', 'folder', 'end_folder', 'binaries', 'end_binaries', 'includes', 'end_includes', 'sources', 'end_sources', 'action', 'end_action', 'step', 'initial_step', 'end_step', 'transaction', 'end_transaction'],
  typeKeywords: ['int', 'sint', 'dint', 'lint', 'usint', 'uint', 'udint', 'ulint', 'real', 'lreal', 'time', 'date', 'time_of_day', 'date_and_time', 'string', 'bool', 'byte', 'world', 'dworld', 'array', 'pointer', 'lworld'],
  operators: ['=', '>', '<', ':', ':=', '<=', '>=', '<>', '&', '+', '-', '*', '**', 'MOD', '^', 'or', 'and', 'not', 'xor', 'abs', 'acos', 'asin', 'atan', 'cos', 'exp', 'expt', 'ln', 'log', 'sin', 'sqrt', 'tan', 'sel', 'max', 'min', 'limit', 'mux', 'shl', 'shr', 'rol', 'ror', 'indexof', 'sizeof', 'adr', 'adrinst', 'bitadr', 'is_valid'],
  builtinVariables: [],
  builtinFunctions: ['sr', 'rs', 'tp', 'ton', 'tof', 'eq', 'ge', 'le', 'lt', 'ne', 'round', 'trunc', 'ctd', 'сtu', 'ctud', 'r_trig', 'f_trig', 'move', 'concat', 'delete', 'find', 'insert', 'left', 'len', 'replace', 'right', 'rtc'],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [[/(T|DT|TOD)#[0-9:-_shmyd]*/, 'tag'], [/[A-Za-z]{1,6}#[0-9]*/, 'tag'], [/\%(I|Q|M)(X|B|W|D|L)[0-9\.]*/, 'tag'], [/\%(I|Q|M)[0-9\.]*/, 'tag'], [/(TO_|CTU_|CTD_|CTUD_|MUX_|SEL_)[A_Za-z]*/, 'predefined'], [/[A_Za-z]*(_TO_)[A_Za-z]*/, 'predefined'], // identifiers and keywords
    [/[a-zA-Z_]\w*/, {
      cases: {
        '@operators': 'operators',
        '@keywords': 'keyword',
        '@typeKeywords': 'type',
        '@defineKeywords': 'variable',
        '@constant': 'constant',
        '@builtinVariables': 'predefined',
        '@builtinFunctions': 'predefined',
        '@default': 'identifier'
      }
    }], {
      include: '@whitespace'
    }, [/[;.]/, 'delimiter'], [/[{}()\[\]]/, '@brackets'], [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/16#[0-9a-fA-F]+/, 'number.hex'], [/2#[0-9_]+/, 'number.binary'], [/\d+/, 'number'], [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, {
      token: 'string.quote',
      bracket: '@open',
      next: '@string_dq'
    }], [/'/, {
      token: 'string.quote',
      bracket: '@open',
      next: '@string_sq'
    }], [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    comment: [[/[^\/*]+/, 'comment'], [/\/\*/, 'comment', '@push'], ["\\*/", 'comment', '@pop'], [/[\/*]/, 'comment']],
    comment2: [[/[^\(*]+/, 'comment'], [/\(\*/, 'comment', '@push'], ["\\*\\)", 'comment', '@pop'], [/[\(*]/, 'comment']],
    whitespace: [[/[ \t\r\n]+/, 'white'], [/\/\/.*$/, 'comment'], [/\/\*/, 'comment', '@comment'], [/\(\*/, 'comment', '@comment2']],
    string_dq: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, {
      token: 'string.quote',
      bracket: '@close',
      next: '@pop'
    }]],
    string_sq: [[/[^\\']+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/'/, {
      token: 'string.quote',
      bracket: '@close',
      next: '@pop'
    }]]
  }
};
exports.language = language;
},{}]},{},["CPTR"], null)