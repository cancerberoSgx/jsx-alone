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
})({"aNCu":[function(require,module,exports) {
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
    lineComment: ';;'
  },
  brackets: [['(', ')'], ['[', ']'], ['{', '}']],
  autoClosingPairs: [{
    open: '(',
    close: ')'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '{',
    close: '}'
  }, {
    open: '"',
    close: '"'
  }],
  surroundingPairs: [{
    open: '(',
    close: ')'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '{',
    close: '}'
  }, {
    open: '"',
    close: '"'
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  ignoreCase: true,
  tokenPostfix: '.clj',
  brackets: [{
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }, {
    open: '{',
    close: '}',
    token: 'delimiter.curly'
  }, {
    open: '[',
    close: ']',
    token: 'delimiter.square'
  }],
  specialForms: ['.', 'catch', 'def', 'do', 'if', 'monitor-enter', 'monitor-exit', 'new', 'quote', 'recur', 'set!', 'throw', 'try', 'var'],
  coreSymbols: ['*', '*\'', '*1', '*2', '*3', '*agent*', '*allow-unresolved-vars*', '*assert*', '*clojure-version*', '*command-line-args*', '*compile-files*', '*compile-path*', '*compiler-options*', '*data-readers*', '*default-data-reader-fn*', '*e', '*err*', '*file*', '*flush-on-newline*', '*fn-loader*', '*in*', '*math-context*', '*ns*', '*out*', '*print-dup*', '*print-length*', '*print-level*', '*print-meta*', '*print-namespace-maps*', '*print-readably*', '*read-eval*', '*reader-resolver*', '*source-path*', '*suppress-read*', '*unchecked-math*', '*use-context-classloader*', '*verbose-defrecords*', '*warn-on-reflection*', '+', '+\'', '-', '-\'', '->', '->>', '->ArrayChunk', '->Eduction', '->Vec', '->VecNode', '->VecSeq', '-cache-protocol-fn', '-reset-methods', '..', '/', '<', '<=', '=', '==', '>', '>=', 'EMPTY-NODE', 'Inst', 'StackTraceElement->vec', 'Throwable->map', 'accessor', 'aclone', 'add-classpath', 'add-watch', 'agent', 'agent-error', 'agent-errors', 'aget', 'alength', 'alias', 'all-ns', 'alter', 'alter-meta!', 'alter-var-root', 'amap', 'ancestors', 'and', 'any?', 'apply', 'areduce', 'array-map', 'as->', 'aset', 'aset-boolean', 'aset-byte', 'aset-char', 'aset-double', 'aset-float', 'aset-int', 'aset-long', 'aset-short', 'assert', 'assoc', 'assoc!', 'assoc-in', 'associative?', 'atom', 'await', 'await-for', 'await1', 'bases', 'bean', 'bigdec', 'bigint', 'biginteger', 'binding', 'bit-and', 'bit-and-not', 'bit-clear', 'bit-flip', 'bit-not', 'bit-or', 'bit-set', 'bit-shift-left', 'bit-shift-right', 'bit-test', 'bit-xor', 'boolean', 'boolean-array', 'boolean?', 'booleans', 'bound-fn', 'bound-fn*', 'bound?', 'bounded-count', 'butlast', 'byte', 'byte-array', 'bytes', 'bytes?', 'case', 'cast', 'cat', 'char', 'char-array', 'char-escape-string', 'char-name-string', 'char?', 'chars', 'chunk', 'chunk-append', 'chunk-buffer', 'chunk-cons', 'chunk-first', 'chunk-next', 'chunk-rest', 'chunked-seq?', 'class', 'class?', 'clear-agent-errors', 'clojure-version', 'coll?', 'comment', 'commute', 'comp', 'comparator', 'compare', 'compare-and-set!', 'compile', 'complement', 'completing', 'concat', 'cond', 'cond->', 'cond->>', 'condp', 'conj', 'conj!', 'cons', 'constantly', 'construct-proxy', 'contains?', 'count', 'counted?', 'create-ns', 'create-struct', 'cycle', 'dec', 'dec\'', 'decimal?', 'declare', 'dedupe', 'default-data-readers', 'definline', 'definterface', 'defmacro', 'defmethod', 'defmulti', 'defn', 'defn-', 'defonce', 'defprotocol', 'defrecord', 'defstruct', 'deftype', 'delay', 'delay?', 'deliver', 'denominator', 'deref', 'derive', 'descendants', 'destructure', 'disj', 'disj!', 'dissoc', 'dissoc!', 'distinct', 'distinct?', 'doall', 'dorun', 'doseq', 'dosync', 'dotimes', 'doto', 'double', 'double-array', 'double?', 'doubles', 'drop', 'drop-last', 'drop-while', 'eduction', 'empty', 'empty?', 'ensure', 'ensure-reduced', 'enumeration-seq', 'error-handler', 'error-mode', 'eval', 'even?', 'every-pred', 'every?', 'ex-data', 'ex-info', 'extend', 'extend-protocol', 'extend-type', 'extenders', 'extends?', 'false?', 'ffirst', 'file-seq', 'filter', 'filterv', 'find', 'find-keyword', 'find-ns', 'find-protocol-impl', 'find-protocol-method', 'find-var', 'first', 'flatten', 'float', 'float-array', 'float?', 'floats', 'flush', 'fn', 'fn?', 'fnext', 'fnil', 'for', 'force', 'format', 'frequencies', 'future', 'future-call', 'future-cancel', 'future-cancelled?', 'future-done?', 'future?', 'gen-class', 'gen-interface', 'gensym', 'get', 'get-in', 'get-method', 'get-proxy-class', 'get-thread-bindings', 'get-validator', 'group-by', 'halt-when', 'hash', 'hash-combine', 'hash-map', 'hash-ordered-coll', 'hash-set', 'hash-unordered-coll', 'ident?', 'identical?', 'identity', 'if-let', 'if-not', 'if-some', 'ifn?', 'import', 'in-ns', 'inc', 'inc\'', 'indexed?', 'init-proxy', 'inst-ms', 'inst-ms*', 'inst?', 'instance?', 'int', 'int-array', 'int?', 'integer?', 'interleave', 'intern', 'interpose', 'into', 'into-array', 'ints', 'io!', 'isa?', 'iterate', 'iterator-seq', 'juxt', 'keep', 'keep-indexed', 'key', 'keys', 'keyword', 'keyword?', 'last', 'lazy-cat', 'lazy-seq', 'let', 'letfn', 'line-seq', 'list', 'list*', 'list?', 'load', 'load-file', 'load-reader', 'load-string', 'loaded-libs', 'locking', 'long', 'long-array', 'longs', 'loop', 'macroexpand', 'macroexpand-1', 'make-array', 'make-hierarchy', 'map', 'map-entry?', 'map-indexed', 'map?', 'mapcat', 'mapv', 'max', 'max-key', 'memfn', 'memoize', 'merge', 'merge-with', 'meta', 'method-sig', 'methods', 'min', 'min-key', 'mix-collection-hash', 'mod', 'munge', 'name', 'namespace', 'namespace-munge', 'nat-int?', 'neg-int?', 'neg?', 'newline', 'next', 'nfirst', 'nil?', 'nnext', 'not', 'not-any?', 'not-empty', 'not-every?', 'not=', 'ns', 'ns-aliases', 'ns-imports', 'ns-interns', 'ns-map', 'ns-name', 'ns-publics', 'ns-refers', 'ns-resolve', 'ns-unalias', 'ns-unmap', 'nth', 'nthnext', 'nthrest', 'num', 'number?', 'numerator', 'object-array', 'odd?', 'or', 'parents', 'partial', 'partition', 'partition-all', 'partition-by', 'pcalls', 'peek', 'persistent!', 'pmap', 'pop', 'pop!', 'pop-thread-bindings', 'pos-int?', 'pos?', 'pr', 'pr-str', 'prefer-method', 'prefers', 'primitives-classnames', 'print', 'print-ctor', 'print-dup', 'print-method', 'print-simple', 'print-str', 'printf', 'println', 'println-str', 'prn', 'prn-str', 'promise', 'proxy', 'proxy-call-with-super', 'proxy-mappings', 'proxy-name', 'proxy-super', 'push-thread-bindings', 'pvalues', 'qualified-ident?', 'qualified-keyword?', 'qualified-symbol?', 'quot', 'rand', 'rand-int', 'rand-nth', 'random-sample', 'range', 'ratio?', 'rational?', 'rationalize', 're-find', 're-groups', 're-matcher', 're-matches', 're-pattern', 're-seq', 'read', 'read-line', 'read-string', 'reader-conditional', 'reader-conditional?', 'realized?', 'record?', 'reduce', 'reduce-kv', 'reduced', 'reduced?', 'reductions', 'ref', 'ref-history-count', 'ref-max-history', 'ref-min-history', 'ref-set', 'refer', 'refer-clojure', 'reify', 'release-pending-sends', 'rem', 'remove', 'remove-all-methods', 'remove-method', 'remove-ns', 'remove-watch', 'repeat', 'repeatedly', 'replace', 'replicate', 'require', 'reset!', 'reset-meta!', 'reset-vals!', 'resolve', 'rest', 'restart-agent', 'resultset-seq', 'reverse', 'reversible?', 'rseq', 'rsubseq', 'run!', 'satisfies?', 'second', 'select-keys', 'send', 'send-off', 'send-via', 'seq', 'seq?', 'seqable?', 'seque', 'sequence', 'sequential?', 'set', 'set-agent-send-executor!', 'set-agent-send-off-executor!', 'set-error-handler!', 'set-error-mode!', 'set-validator!', 'set?', 'short', 'short-array', 'shorts', 'shuffle', 'shutdown-agents', 'simple-ident?', 'simple-keyword?', 'simple-symbol?', 'slurp', 'some', 'some->', 'some->>', 'some-fn', 'some?', 'sort', 'sort-by', 'sorted-map', 'sorted-map-by', 'sorted-set', 'sorted-set-by', 'sorted?', 'special-symbol?', 'spit', 'split-at', 'split-with', 'str', 'string?', 'struct', 'struct-map', 'subs', 'subseq', 'subvec', 'supers', 'swap!', 'swap-vals!', 'symbol', 'symbol?', 'sync', 'tagged-literal', 'tagged-literal?', 'take', 'take-last', 'take-nth', 'take-while', 'test', 'the-ns', 'thread-bound?', 'time', 'to-array', 'to-array-2d', 'trampoline', 'transduce', 'transient', 'tree-seq', 'true?', 'type', 'unchecked-add', 'unchecked-add-int', 'unchecked-byte', 'unchecked-char', 'unchecked-dec', 'unchecked-dec-int', 'unchecked-divide-int', 'unchecked-double', 'unchecked-float', 'unchecked-inc', 'unchecked-inc-int', 'unchecked-int', 'unchecked-long', 'unchecked-multiply', 'unchecked-multiply-int', 'unchecked-negate', 'unchecked-negate-int', 'unchecked-remainder-int', 'unchecked-short', 'unchecked-subtract', 'unchecked-subtract-int', 'underive', 'unquote', 'unquote-splicing', 'unreduced', 'unsigned-bit-shift-right', 'update', 'update-in', 'update-proxy', 'uri?', 'use', 'uuid?', 'val', 'vals', 'var-get', 'var-set', 'var?', 'vary-meta', 'vec', 'vector', 'vector-of', 'vector?', 'volatile!', 'volatile?', 'vreset!', 'vswap!', 'when', 'when-first', 'when-let', 'when-not', 'when-some', 'while', 'with-bindings', 'with-bindings*', 'with-in-str', 'with-loading-context', 'with-local-vars', 'with-meta', 'with-open', 'with-out-str', 'with-precision', 'with-redefs', 'with-redefs-fn', 'xml-seq', 'zero?', 'zipmap'],
  constants: ['true', 'false', 'nil'],
  symbolCharacter: /[!#'*+\-.\/:<=>?_\w\xa1-\uffff]/,
  numbers: /[+\-]?\d+(?:(?:N|(?:[eE][+\-]?\d+))|(?:\.?\d*(?:M|(?:[eE][+\-]?\d+))?)|\/\d+|[xX][0-9a-fA-F]+|r[0-9a-zA-Z]+)?/,
  characters: /\\(?:backspace|formfeed|newline|return|space|tab|x[0-9A-Fa-f]{4}|u[0-9A-Fa-f]{4}|o[0-7]{3}|@symbolCharacter|[\\"()\[\]{}])/,
  tokenizer: {
    root: [// whitespaces and comments
    {
      include: '@whitespace'
    }, // numbers
    [/@numbers/, 'number'], // characters
    [/@characters/, 'string'], // strings
    {
      include: '@string'
    }, // brackets
    [/[()\[\]{}]/, '@brackets'], // regular expressions
    [/\/#"(?:\.|(?:")|[^"\n])*"\/g/, 'regexp'], // reader macro characters
    [/[#'@^`~]/, 'meta'], // keywords
    [/:@symbolCharacter+/, 'constant'], // symbols
    [/@symbolCharacter+/, {
      cases: {
        '@specialForms': 'keyword',
        '@coreSymbols': 'keyword',
        '@constants': 'constant',
        '@default': 'identifier'
      }
    }]],
    whitespace: [[/\s+/, 'white'], [/;.*$/, 'comment'], [/\(comment/, 'comment', '@comment']],
    comment: [[/\(/, 'comment', '@push'], [/\)/, 'comment', '@pop'], [/[^)]/, 'comment']],
    string: [[/"/, 'string', '@multiLineString']],
    multiLineString: [[/[^\\"]+/, 'string'], [/@characters/, 'string'], [/"/, 'string', '@pop']]
  }
};
exports.language = language;
},{}]},{},["aNCu"], null)