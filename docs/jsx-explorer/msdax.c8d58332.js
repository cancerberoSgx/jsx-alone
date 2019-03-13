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
})({"dlA5":[function(require,module,exports) {
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
  brackets: [['[', ']'], ['(', ')'], ['{', '}']],
  autoClosingPairs: [{
    open: '"',
    close: '"',
    notIn: ['string', 'comment']
  }, {
    open: '\'',
    close: '\'',
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
    open: '{',
    close: '}',
    notIn: ['string', 'comment']
  }]
};
exports.conf = conf;
var language = {
  defaultToken: '',
  tokenPostfix: '.msdax',
  ignoreCase: true,
  brackets: [{
    open: '[',
    close: ']',
    token: 'delimiter.square'
  }, {
    open: '{',
    close: '}',
    token: 'delimiter.brackets'
  }, {
    open: '(',
    close: ')',
    token: 'delimiter.parenthesis'
  }],
  keywords: [// Query keywords
  'VAR', 'RETURN', 'NOT', 'EVALUATE', 'DATATABLE', 'ORDER', 'BY', 'START', 'AT', 'DEFINE', 'MEASURE', 'ASC', 'DESC', 'IN', // Datatable types
  'BOOLEAN', 'DOUBLE', 'INTEGER', 'DATETIME', 'CURRENCY', 'STRING'],
  functions: [// Relational
  'CLOSINGBALANCEMONTH', 'CLOSINGBALANCEQUARTER', 'CLOSINGBALANCEYEAR', 'DATEADD', 'DATESBETWEEN', 'DATESINPERIOD', 'DATESMTD', 'DATESQTD', 'DATESYTD', 'ENDOFMONTH', 'ENDOFQUARTER', 'ENDOFYEAR', 'FIRSTDATE', 'FIRSTNONBLANK', 'LASTDATE', 'LASTNONBLANK', 'NEXTDAY', 'NEXTMONTH', 'NEXTQUARTER', 'NEXTYEAR', 'OPENINGBALANCEMONTH', 'OPENINGBALANCEQUARTER', 'OPENINGBALANCEYEAR', 'PARALLELPERIOD', 'PREVIOUSDAY', 'PREVIOUSMONTH', 'PREVIOUSQUARTER', 'PREVIOUSYEAR', 'SAMEPERIODLASTYEAR', 'STARTOFMONTH', 'STARTOFQUARTER', 'STARTOFYEAR', 'TOTALMTD', 'TOTALQTD', 'TOTALYTD', 'ADDCOLUMNS', 'ADDMISSINGITEMS', 'ALL', 'ALLEXCEPT', 'ALLNOBLANKROW', 'ALLSELECTED', 'CALCULATE', 'CALCULATETABLE', 'CALENDAR', 'CALENDARAUTO', 'CROSSFILTER', 'CROSSJOIN', 'CURRENTGROUP', 'DATATABLE', 'DETAILROWS', 'DISTINCT', 'EARLIER', 'EARLIEST', 'EXCEPT', 'FILTER', 'FILTERS', 'GENERATE', 'GENERATEALL', 'GROUPBY', 'IGNORE', 'INTERSECT', 'ISONORAFTER', 'KEEPFILTERS', 'LOOKUPVALUE', 'NATURALINNERJOIN', 'NATURALLEFTOUTERJOIN', 'RELATED', 'RELATEDTABLE', 'ROLLUP', 'ROLLUPADDISSUBTOTAL', 'ROLLUPGROUP', 'ROLLUPISSUBTOTAL', 'ROW', 'SAMPLE', 'SELECTCOLUMNS', 'SUBSTITUTEWITHINDEX', 'SUMMARIZE', 'SUMMARIZECOLUMNS', 'TOPN', 'TREATAS', 'UNION', 'USERELATIONSHIP', 'VALUES', 'SUM', 'SUMX', 'PATH', 'PATHCONTAINS', 'PATHITEM', 'PATHITEMREVERSE', 'PATHLENGTH', 'AVERAGE', 'AVERAGEA', 'AVERAGEX', 'COUNT', 'COUNTA', 'COUNTAX', 'COUNTBLANK', 'COUNTROWS', 'COUNTX', 'DISTINCTCOUNT', 'DIVIDE', 'GEOMEAN', 'GEOMEANX', 'MAX', 'MAXA', 'MAXX', 'MEDIAN', 'MEDIANX', 'MIN', 'MINA', 'MINX', 'PERCENTILE.EXC', 'PERCENTILE.INC', 'PERCENTILEX.EXC', 'PERCENTILEX.INC', 'PRODUCT', 'PRODUCTX', 'RANK.EQ', 'RANKX', 'STDEV.P', 'STDEV.S', 'STDEVX.P', 'STDEVX.S', 'VAR.P', 'VAR.S', 'VARX.P', 'VARX.S', 'XIRR', 'XNPV', // Scalar
  'DATE', 'DATEDIFF', 'DATEVALUE', 'DAY', 'EDATE', 'EOMONTH', 'HOUR', 'MINUTE', 'MONTH', 'NOW', 'SECOND', 'TIME', 'TIMEVALUE', 'TODAY', 'WEEKDAY', 'WEEKNUM', 'YEAR', 'YEARFRAC', 'CONTAINS', 'CONTAINSROW', 'CUSTOMDATA', 'ERROR', 'HASONEFILTER', 'HASONEVALUE', 'ISBLANK', 'ISCROSSFILTERED', 'ISEMPTY', 'ISERROR', 'ISEVEN', 'ISFILTERED', 'ISLOGICAL', 'ISNONTEXT', 'ISNUMBER', 'ISODD', 'ISSUBTOTAL', 'ISTEXT', 'USERNAME', 'USERPRINCIPALNAME', 'AND', 'FALSE', 'IF', 'IFERROR', 'NOT', 'OR', 'SWITCH', 'TRUE', 'ABS', 'ACOS', 'ACOSH', 'ACOT', 'ACOTH', 'ASIN', 'ASINH', 'ATAN', 'ATANH', 'BETA.DIST', 'BETA.INV', 'CEILING', 'CHISQ.DIST', 'CHISQ.DIST.RT', 'CHISQ.INV', 'CHISQ.INV.RT', 'COMBIN', 'COMBINA', 'CONFIDENCE.NORM', 'CONFIDENCE.T', 'COS', 'COSH', 'COT', 'COTH', 'CURRENCY', 'DEGREES', 'EVEN', 'EXP', 'EXPON.DIST', 'FACT', 'FLOOR', 'GCD', 'INT', 'ISO.CEILING', 'LCM', 'LN', 'LOG', 'LOG10', 'MOD', 'MROUND', 'ODD', 'PERMUT', 'PI', 'POISSON.DIST', 'POWER', 'QUOTIENT', 'RADIANS', 'RAND', 'RANDBETWEEN', 'ROUND', 'ROUNDDOWN', 'ROUNDUP', 'SIGN', 'SIN', 'SINH', 'SQRT', 'SQRTPI', 'TAN', 'TANH', 'TRUNC', 'BLANK', 'CONCATENATE', 'CONCATENATEX', 'EXACT', 'FIND', 'FIXED', 'FORMAT', 'LEFT', 'LEN', 'LOWER', 'MID', 'REPLACE', 'REPT', 'RIGHT', 'SEARCH', 'SUBSTITUTE', 'TRIM', 'UNICHAR', 'UNICODE', 'UPPER', 'VALUE'],
  tokenizer: {
    root: [{
      include: '@comments'
    }, {
      include: '@whitespace'
    }, {
      include: '@numbers'
    }, {
      include: '@strings'
    }, {
      include: '@complexIdentifiers'
    }, [/[;,.]/, 'delimiter'], [/[({})]/, '@brackets'], [/[a-z_][a-zA-Z0-9_]*/, {
      cases: {
        '@keywords': 'keyword',
        '@functions': 'keyword',
        '@default': 'identifier'
      }
    }], [/[<>=!%&+\-*/|~^]/, 'operator']],
    whitespace: [[/\s+/, 'white']],
    comments: [[/\/\/+.*/, 'comment'], [/\/\*/, {
      token: 'comment.quote',
      next: '@comment'
    }]],
    comment: [[/[^*/]+/, 'comment'], [/\*\//, {
      token: 'comment.quote',
      next: '@pop'
    }], [/./, 'comment']],
    numbers: [[/0[xX][0-9a-fA-F]*/, 'number'], [/[$][+-]*\d*(\.\d*)?/, 'number'], [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']],
    strings: [[/N"/, {
      token: 'string',
      next: '@string'
    }], [/"/, {
      token: 'string',
      next: '@string'
    }]],
    string: [[/[^"]+/, 'string'], [/""/, 'string'], [/"/, {
      token: 'string',
      next: '@pop'
    }]],
    complexIdentifiers: [[/\[/, {
      token: 'identifier.quote',
      next: '@bracketedIdentifier'
    }], [/'/, {
      token: 'identifier.quote',
      next: '@quotedIdentifier'
    }]],
    bracketedIdentifier: [[/[^\]]+/, 'identifier'], [/]]/, 'identifier'], [/]/, {
      token: 'identifier.quote',
      next: '@pop'
    }]],
    quotedIdentifier: [[/[^']+/, 'identifier'], [/''/, 'identifier'], [/'/, {
      token: 'identifier.quote',
      next: '@pop'
    }]]
  }
};
exports.language = language;
},{}]},{},["dlA5"], null)