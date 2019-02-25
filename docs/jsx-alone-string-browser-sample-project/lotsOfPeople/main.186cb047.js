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
})({"/5mC":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

function array(n, sample) {
  var a = [];

  for (var i = 0; i < n; i++) {
    a.push(typeof sample === 'undefined' ? i : sample);
  }

  return a;
}

exports.array = array;

function printMs(ms, config) {
  if (config === void 0) {
    config = {
      minutes: false,
      seconds: true,
      ms: true
    };
  }

  config = __assign({
    minutes: false,
    seconds: true,
    ms: true
  }, config);
  var seconds = config.seconds && Math.floor(ms / 1000);
  var minutes = config.minutes && seconds && Math.floor(seconds / 60);
  var milliseconds = config.ms && Math.floor(ms % 1000 || ms);
  return "" + (minutes ? minutes + " minutes " : '') + (seconds ? seconds + " seconds " : '') + (milliseconds ? milliseconds + " milliseconds " : '');
}

exports.printMs = printMs;
},{}],"+IjQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomIntBetween(a, b) {
    return Math.floor(Math.random() * b) + a;
}
exports.randomIntBetween = randomIntBetween;
function randomItem(array) {
    return array[randomIntBetween(0, array.length)];
}
exports.randomItem = randomItem;

},{}],"GIpK":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstNames = [
    "William",
    "Jack",
    "Oliver",
    "Joshua",
    "Thomas",
    "Lachlan",
    "Cooper",
    "Noah",
    "Ethan",
    "Lucas",
    "James",
    "Samuel",
    "Jacob",
    "Liam",
    "Alexander",
    "Benjamin",
    "Max",
    "Isaac",
    "Daniel",
    "Riley",
    "Ryan",
    "Charlie",
    "Tyler",
    "Jake",
    "Matthew",
    "Xavier",
    "Harry",
    "Jayden",
    "Nicholas",
    "Harrison",
    "Levi",
    "Luke",
    "Adam",
    "Henry",
    "Aiden",
    "Dylan",
    "Oscar",
    "Michael",
    "Jackson",
    "Logan",
    "Joseph",
    "Blake",
    "Nathan",
    "Connor",
    "Elijah",
    "Nate",
    "Archie",
    "Bailey",
    "Marcus",
    "Cameron",
    "Jordan",
    "Zachary",
    "Caleb",
    "Hunter",
    "Ashton",
    "Toby",
    "Aidan",
    "Hayden",
    "Mason",
    "Hamish",
    "Edward",
    "Angus",
    "Eli",
    "Sebastian",
    "Christian",
    "Patrick",
    "Andrew",
    "Anthony",
    "Luca",
    "Kai",
    "Beau",
    "Alex",
    "George",
    "Callum",
    "Finn",
    "Zac",
    "Mitchell",
    "Jett",
    "Jesse",
    "Gabriel",
    "Leo",
    "Declan",
    "Charles",
    "Jasper",
    "Jonathan",
    "Aaron",
    "Hugo",
    "David",
    "Christopher",
    "Chase",
    "Owen",
    "Justin",
    "Ali",
    "Darcy",
    "Lincoln",
    "Cody",
    "Phoenix",
    "Sam",
    "John",
    "Joel",
    "Isabella",
    "Ruby",
    "Chloe",
    "Olivia",
    "Charlotte",
    "Mia",
    "Lily",
    "Emily",
    "Ella",
    "Sienna",
    "Sophie",
    "Amelia",
    "Grace",
    "Ava",
    "Zoe",
    "Emma",
    "Sophia",
    "Matilda",
    "Hannah",
    "Jessica",
    "Lucy",
    "Georgia",
    "Sarah",
    "Abigail",
    "Zara",
    "Eva",
    "Scarlett",
    "Jasmine",
    "Chelsea",
    "Lilly",
    "Ivy",
    "Isla",
    "Evie",
    "Isabelle",
    "Maddison",
    "Layla",
    "Summer",
    "Annabelle",
    "Alexis",
    "Elizabeth",
    "Bella",
    "Holly",
    "Lara",
    "Madison",
    "Alyssa",
    "Maya",
    "Tahlia",
    "Claire",
    "Hayley",
    "Imogen",
    "Jade",
    "Ellie",
    "Sofia",
    "Addison",
    "Molly",
    "Phoebe",
    "Alice",
    "Savannah",
    "Gabriella",
    "Kayla",
    "Mikayla",
    "Abbey",
    "Eliza",
    "Willow",
    "Alexandra",
    "Poppy",
    "Samantha",
    "Stella",
    "Amy",
    "Amelie",
    "Anna",
    "Piper",
    "Gemma",
    "Isabel",
    "Victoria",
    "Stephanie",
    "Caitlin",
    "Heidi",
    "Paige",
    "Rose",
    "Amber",
    "Audrey",
    "Claudia",
    "Taylor",
    "Madeline",
    "Angelina",
    "Natalie",
    "Charli",
    "Lauren",
    "Ashley",
    "Violet",
    "Mackenzie",
    "Abby",
    "Skye",
    "Lillian",
    "Alana",
    "Lola",
    "Leah",
    "Eve",
    "Kiara"
];

},{}],"63kX":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastNames = [
    "Smith",
    "Jones",
    "Williams",
    "Brown",
    "Wilson",
    "Taylor",
    "Johnson",
    "White",
    "Martin",
    "Anderson",
    "Thompson",
    "Nguyen",
    "Thomas",
    "Walker",
    "Harris",
    "Lee",
    "Ryan",
    "Robinson",
    "Kelly",
    "King",
    "Davis",
    "Wright",
    "Evans",
    "Roberts",
    "Green",
    "Hall",
    "Wood",
    "Jackson",
    "Clarke",
    "Patel",
    "Khan",
    "Lewis",
    "James",
    "Phillips",
    "Mason",
    "Mitchell",
    "Rose",
    "Davies",
    "Rodriguez",
    "Cox",
    "Alexander",
    "Garden",
    "Campbell",
    "Johnston",
    "Moore",
    "Smyth",
    "O'neill",
    "Doherty",
    "Stewart",
    "Quinn",
    "Murphy",
    "Graham",
    "Mclaughlin",
    "Hamilton",
    "Murray",
    "Hughes",
    "Robertson",
    "Thomson",
    "Scott",
    "Macdonald",
    "Reid",
    "Clark",
    "Ross",
    "Young",
    "Watson",
    "Paterson",
    "Morrison",
    "Morgan",
    "Griffiths",
    "Edwards",
    "Rees",
    "Jenkins",
    "Owen",
    "Price",
    "Moss",
    "Richards",
    "Abbott",
    "Adams",
    "Armstrong",
    "Bahringer",
    "Bailey",
    "Barrows",
    "Bartell",
    "Bartoletti",
    "Barton",
    "Bauch",
    "Baumbach",
    "Bayer",
    "Beahan",
    "Beatty",
    "Becker",
    "Beier",
    "Berge",
    "Bergstrom",
    "Bode",
    "Bogan",
    "Borer",
    "Bosco",
    "Botsford",
    "Boyer",
    "Boyle",
    "Braun",
    "Bruen",
    "Carroll",
    "Carter",
    "Cartwright",
    "Casper",
    "Cassin",
    "Champlin",
    "Christiansen",
    "Cole",
    "Collier",
    "Collins",
    "Connelly",
    "Conroy",
    "Corkery",
    "Cormier",
    "Corwin",
    "Cronin",
    "Crooks",
    "Cruickshank",
    "Cummings",
    "D'amore",
    "Daniel",
    "Dare",
    "Daugherty",
    "Dickens",
    "Dickinson",
    "Dietrich",
    "Donnelly",
    "Dooley",
    "Douglas",
    "Doyle",
    "Durgan",
    "Ebert",
    "Emard",
    "Emmerich",
    "Erdman",
    "Ernser",
    "Fadel",
    "Fahey",
    "Farrell",
    "Fay",
    "Feeney",
    "Feil",
    "Ferry",
    "Fisher",
    "Flatley",
    "Gibson",
    "Gleason",
    "Glover",
    "Goldner",
    "Goodwin",
    "Grady",
    "Grant",
    "Greenfelder",
    "Greenholt",
    "Grimes",
    "Gutmann",
    "Hackett",
    "Hahn",
    "Haley",
    "Hammes",
    "Hand",
    "Hane",
    "Hansen",
    "Harber",
    "Hartmann",
    "Harvey",
    "Hayes",
    "Heaney",
    "Heathcote",
    "Heller",
    "Hermann",
    "Hermiston",
    "Hessel",
    "Hettinger",
    "Hickle",
    "Hill",
    "Hills",
    "Hoppe",
    "Howe",
    "Howell",
    "Hudson",
    "Huel",
    "Hyatt",
    "Jacobi",
    "Jacobs",
    "Jacobson",
    "Jerde",
    "Johns",
    "Keeling",
    "Kemmer",
    "Kessler",
    "Kiehn",
    "Kirlin",
    "Klein",
    "Koch",
    "Koelpin",
    "Kohler",
    "Koss",
    "Kovacek",
    "Kreiger",
    "Kris",
    "Kuhlman",
    "Kuhn",
    "Kulas",
    "Kunde",
    "Kutch",
    "Lakin",
    "Lang",
    "Langworth",
    "Larkin",
    "Larson",
    "Leannon",
    "Leffler",
    "Little",
    "Lockman",
    "Lowe",
    "Lynch",
    "Mann",
    "Marks",
    "Marvin",
    "Mayer",
    "Mccullough",
    "Mcdermott",
    "Mckenzie",
    "Miller",
    "Mills",
    "Monahan",
    "Morissette",
    "Mueller",
    "Muller",
    "Nader",
    "Nicolas",
    "Nolan",
    "O'connell",
    "O'conner",
    "O'hara",
    "O'keefe",
    "Olson",
    "O'reilly",
    "Parisian",
    "Parker",
    "Quigley",
    "Reilly",
    "Reynolds",
    "Rice",
    "Ritchie",
    "Rohan",
    "Rolfson",
    "Rowe",
    "Russel",
    "Rutherford",
    "Sanford",
    "Sauer",
    "Schmidt",
    "Schmitt",
    "Schneider",
    "Schroeder",
    "Schultz",
    "Shields",
    "Smitham",
    "Spencer",
    "Stanton",
    "Stark",
    "Stokes",
    "Swift",
    "Tillman",
    "Towne",
    "Tremblay",
    "Tromp",
    "Turcotte",
    "Turner",
    "Walsh",
    "Walter",
    "Ward",
    "Waters",
    "Weber",
    "Welch",
    "West",
    "Wilderman",
    "Wilkinson",
    "Williamson",
    "Windler",
    "Wolf"
];

},{}],"Cs+a":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const firstNames_1 = require("./firstNames");
const lastNames_1 = require("./lastNames");
exports.names = {
    firstName() {
        return util_1.randomItem(firstNames_1.firstNames);
    },
    lastName() {
        return util_1.randomItem(lastNames_1.lastNames);
    }
};

},{"../util":"+IjQ","./firstNames":"GIpK","./lastNames":"63kX"}],"6NJ8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.numbers = {
    integer(min, max) {
        return util_1.randomIntBetween(min, max);
    }
};

},{"./util":"+IjQ"}],"6Y+3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var names_1 = require("./names");
exports.names = names_1.names;
var numbers_1 = require("./numbers");
exports.numbers = numbers_1.numbers;

},{"./names":"Cs+a","./numbers":"6NJ8"}],"45O1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var util_1 = require("../util");

var misc_utils_of_mine_random_data_1 = require("misc-utils-of-mine-random-data");

exports.MODEL_CONFIG = {
  peopleCount: 100,
  friendsCount: 20
};

function buildModel(config) {
  return {
    people: makePeople(config)
  };
}

exports.buildModel = buildModel;

function makePeople(config) {
  return util_1.array(config.peopleCount).map(function (i) {
    return {
      name: misc_utils_of_mine_random_data_1.names.firstName() + " " + misc_utils_of_mine_random_data_1.names.firstName() + " " + misc_utils_of_mine_random_data_1.names.lastName() + " " + misc_utils_of_mine_random_data_1.names.lastName(),
      age: misc_utils_of_mine_random_data_1.numbers.integer(0, 100),
      friends: []
    };
  }).map(function (p, i, a) {
    p.friends = util_1.array(misc_utils_of_mine_random_data_1.numbers.integer(Math.trunc(config.friendsCount / 2), config.friendsCount)).map(function (i) {
      return a[misc_utils_of_mine_random_data_1.numbers.integer(0, a.length - 1)];
    });
    return p;
  });
}
},{"../util":"/5mC","misc-utils-of-mine-random-data":"6Y+3"}],"+2od":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export function flatDeep<T = any>(arr1: T[][] | T[]): T[] {
//   return (arr1 as any[]).reduce((acc, val) => (Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val)), [])
// }
function flatDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val), []);
}
exports.flatDeep = flatDeep;
function flat(arr) {
    return arr.reduce((a, b) => a.concat(b));
}
exports.flat = flat;
function flatReadOnly(arr) {
    return arr && arr.length ? arr.reduce((a, b) => a.concat(b)) : [];
}
exports.flatReadOnly = flatReadOnly;

},{}],"PTjC":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function array(n, sample) {
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(typeof sample === 'undefined' ? i : sample);
    }
    return a;
}
exports.array = array;
function dedup(a, p) {
    return a.reduce((x, y) => x.find(i => p(i, y)) ? x : [...x, y], []);
}
exports.dedup = dedup;
function asArray(selectors) {
    return Array.isArray(selectors) ? selectors : [selectors];
}
exports.asArray = asArray;
function unionEquals(left, right, equals) {
    return left.concat(right).reduce((acc, element) => {
        //@ts-ignore
        return acc.some(elt => equals(elt, element)) ? acc : acc.concat(element);
    }, []);
}
exports.unionEquals = unionEquals;
function seq(start = 0, step = 1, max = 0) {
    const result = [];
    for (let i = start; i < max; i += step) {
        result.push(i);
    }
    return result;
}
exports.seq = seq;

},{}],"vHoL":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayPrototypeFind(a, predicate, thisArg) {
    for (let i = 0; i < a.length; i++) {
        const v = a[i];
        if (predicate.apply(thisArg, [v, i, a])) {
            return v;
        }
    }
}
exports.arrayPrototypeFind = arrayPrototypeFind;
function installArrayPrototypeFind(force = false) {
    Array.prototype.find = (typeof Array.prototype.find === 'undefined' || force) ? function (predicate, thisArg) {
        //@ts- ignore
        return arrayPrototypeFind(this, predicate, thisArg);
    } : Array.prototype.find;
}
exports.installArrayPrototypeFind = installArrayPrototypeFind;

},{}],"3GSJ":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./flat":"+2od","./array":"PTjC","./prototypeFind":"vHoL"}],"Jo5K":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function changeText(text, toInsert) {
    let s = text.split('');
    let indexIncr = 0;
    toInsert.forEach(data => {
        data.toAdd = data.toAdd || '';
        data.toRemove = data.toRemove || '';
        s.splice(data.pos + indexIncr, data.toRemove.length, ...data.toAdd.split(''));
        indexIncr += data.toAdd.length - data.toRemove.length;
    });
    return s.join('');
}
exports.changeText = changeText;

},{}],"dKNz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPreviousMatchingPos(text, pos, condition) {
    pos = text.length <= pos ? text.length : pos;
    if (typeof condition === 'string') {
        const s = condition;
        condition = (c) => c === s;
    }
    while (pos >= 0) {
        const char = text[pos];
        if (!condition(char)) {
            pos--;
        }
        else {
            break;
        }
    }
    return pos;
}
exports.getPreviousMatchingPos = getPreviousMatchingPos;

},{}],"YTm+":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function quote(s, q = '"') {
    return q + s.replace(new RegExp(q, 'g'), '\\' + q) + q;
}
exports.quote = quote;

},{}],"wN23":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** try to parse given json string. return undefined in case there is an error. */
function parseJSON(s, defaultValue) {
    try {
        return JSON.parse(s);
    }
    catch (error) {
        return defaultValue;
    }
}
exports.parseJSON = parseJSON;
function clone(a) {
    return JSON.parse(JSON.stringify(a));
}
exports.clone = clone;
// export function jsonParseOr<K>(s: string, defaultValue: K): K {
//   return parseJSON(s) || defaultValue
// }

},{}],"mBGu":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shorter(text, much = 10) {
    return text.trim().substring(0, Math.min(text.length, much)) + '...';
}
exports.shorter = shorter;

},{}],"QVJl":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escapeHtmlAttribute(code) {
    return code.replace(/\"/gmi, '&quot;');
}
exports.escapeHtmlAttribute = escapeHtmlAttribute;
function unEscapeHtmlAttribute(code) {
    return code.replace(/\&quot\;/gmi, '"');
}
exports.unEscapeHtmlAttribute = unEscapeHtmlAttribute;

},{}],"uyIU":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../array");
__export(require("./changeText"));
__export(require("./getPreviousMatchingPos"));
__export(require("./quote"));
__export(require("./json"));
__export(require("./shorter"));
__export(require("./html"));
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i = 1, tabSize = 2) {
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith = ' ') {
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;

},{"../array":"3GSJ","./changeText":"Jo5K","./getPreviousMatchingPos":"dKNz","./quote":"YTm+","./json":"wN23","./shorter":"mBGu","./html":"QVJl"}],"oHCM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _unique = 0;
function unique(prefix = '_') {
    return prefix + _unique++;
}
exports.unique = unique;
function objectKeys(o) {
    return Object.keys(o);
}
exports.objectKeys = objectKeys;
function randomIntBetween(a, b) {
    return Math.floor(Math.random() * b) + a;
}
exports.randomIntBetween = randomIntBetween;
function checkThrow(r, msg = 'Throwing on undefined value') {
    if (!r) {
        throw new Error(msg);
    }
    return r;
}
exports.checkThrow = checkThrow;
function tryTo(f) {
    try {
        return f();
    }
    catch (error) {
    }
}
exports.tryTo = tryTo;

},{}],"MN8/":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date, format) {
    if (typeof date === 'string') { // happens when serializing dates to json for testing
        date = new Date(date);
    }
    var dd = date.getDay();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (format === 'YYYY-MM-DD') {
        return yyyy + '-' + mm + '-' + dd;
    }
    else {
        return `${mm}/${dd}/${yyyy}`;
    }
}
exports.formatDate = formatDate;
function formatDateTime(date, format) {
    if (typeof date === 'string') { // happens when serializing dates to json for testing
        date = new Date(date);
    }
    let hh = `${date.getHours()}`.length < 2 ? `0${date.getHours()}` : `${date.getHours()}`;
    let mm = `${date.getMinutes()}`.length < 2 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return `${formatDate(date, 'YYYY-MM-DD')}T${hh}:${mm}`;
}
exports.formatDateTime = formatDateTime;

},{}],"1aZv":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printMs(ms, config = { minutes: false, seconds: true, ms: true }) {
    config = Object.assign({ minutes: false, seconds: true, ms: true }, config);
    const seconds = config.seconds && Math.floor(ms / 1000);
    const minutes = config.minutes && seconds && Math.floor(seconds / 60);
    const milliseconds = config.ms && Math.floor(ms % 1000 || ms);
    return `${minutes ? `${minutes} minutes ` : ''}${seconds ? `${seconds} seconds ` : ''}${milliseconds ? `${milliseconds} milliseconds ` : ''}`;
}
exports.printMs = printMs;

},{}],"ix8C":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
exports.sleep = sleep;
exports.wait = sleep;
function withTime(label, fn) {
    console.time(label);
    const r = fn();
    console.timeEnd(label);
    return r;
}
exports.withTime = withTime;

},{}],"t3aM":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));
__export(require("./time"));

},{"./formatDate":"MN8/","./printMs":"1aZv","./time":"ix8C"}],"+QMZ":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./time"));

},{"./string":"uyIU","./array":"3GSJ","./misc":"oHCM","./time":"t3aM"}],"3p56":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");

function isJSXAloneComponent(c) {
  return c.prototype && c.prototype.render;
}

exports.isJSXAloneComponent = isJSXAloneComponent;

function isNode(n) {
  return isTextNodeLike(n) || isElementLike(n);
}

exports.isNode = isNode;

function isElementLike(n) {
  return n && n.setAttribute;
}

exports.isElementLike = isElementLike;

function isTextNodeLike(n) {
  return n && n.content && !isElementLike(n);
}

exports.isTextNodeLike = isTextNodeLike;

var AbstractTextNodeLike =
/** @class */
function () {
  function AbstractTextNodeLike(content) {
    this.content = content;
  }

  return AbstractTextNodeLike;
}();

exports.AbstractTextNodeLike = AbstractTextNodeLike;

var AbstractElementLike =
/** @class */
function () {
  function AbstractElementLike(tag) {
    this.tag = tag;
    this.attrs = {};
    this.children = [];
  }

  AbstractElementLike.prototype.setAttribute = function (name, value) {
    this.attrs[name] = value;
  };

  AbstractElementLike.prototype.appendChild = function (c) {
    this.children.push(c);

    if (isElementLike(c)) {
      c.parentElement = this;
    }
  };

  AbstractElementLike.prototype.findDescendant = function (p) {
    var found;
    this.children.some(function (c) {
      if (isElementLike(c)) {
        if (p(c)) {
          found = c;
        } else {
          found = c.findDescendant(p);
        }
      }

      return !!found;
    });
    return found;
  };

  AbstractElementLike.prototype.findAscendant = function (p) {
    if (this.parentElement) {
      if (p(this.parentElement)) {
        return this.parentElement;
      }

      return this.parentElement.findAscendant(p);
    }
  };

  AbstractElementLike.prototype.getAscendants = function () {
    return this.parentElement ? this.parentElement.getAscendants().concat([this.parentElement]) : [];
  };

  AbstractElementLike.prototype.getRootAscendant = function () {
    var r = this.parentElement ? this.findAscendant(function (n) {
      return isElementLike(n) && !n.parentElement;
    }) : this;
    return misc_utils_of_mine_generic_1.checkThrow(r, 'No root ascendant found in element like tree!');
  };

  AbstractElementLike.prototype.getSiblings = function () {
    var _this = this;

    if (this.parentElement) {
      return this.parentElement.children.filter(function (c) {
        return c !== _this;
      });
    }

    return [];
  };

  AbstractElementLike.prototype.findSibling = function (p) {
    return this.getSiblings().find(p);
  };

  AbstractElementLike.prototype.find = function (p) {
    // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
    return this.getRootAscendant().findDescendant(p);
  };

  return AbstractElementLike;
}();

exports.AbstractElementLike = AbstractElementLike;
},{"misc-utils-of-mine-generic":"+QMZ"}],"+nOU":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");
/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */


var ElementClass =
/** @class */
function () {
  function ElementClass(props) {
    this.props = props;
  }

  ElementClass.prototype.childrenAsArray = function () {
    return Array.isArray(this.props.children) ? this.props.children : [this.props.children];
  };

  ElementClass.prototype.childrenElementsAsArray = function () {
    return this.childrenAsArray().filter(function (c) {
      return elementImpl_1.isElementLike(c);
    });
  };

  ElementClass.prototype.firstChildElement = function () {
    return this.childrenAsArray().find(function (e) {
      return true;
    });
  };

  return ElementClass;
}();

exports.ElementClass = ElementClass;

var AbstractElementClass =
/** @class */
function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{"./elementImpl":"3p56"}],"rCe5":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");

var throwOnUnrecognized = false;

function debug(err) {
  if (throwOnUnrecognized) {
    throw err;
  } else {
    console.error(err);
  }
}

exports.debug = debug;

function createCreateElement(_a) {
  var impl = _a.impl,
      textNodeImpl = _a.textNodeImpl,
      escapeAttributes = _a.escapeAttributes;
  return function createElement(tag, attrs) {
    if (attrs === void 0) {
      attrs = {};
    }

    var children = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }

    var element;

    if (typeof tag === 'string') {
      element = new impl(tag);
    } else {
      if (elementImpl_1.isJSXAloneComponent(tag)) {
        element = new tag(__assign({}, attrs, {
          children: children
        })).render();
      } else {
        element = tag(__assign({}, attrs, {
          children: children
        }));
      }

      attrs = {};
    }

    for (var name_1 in attrs) {
      if (name_1 && attrs.hasOwnProperty(name_1)) {
        var value = attrs[name_1];

        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name_1, name_1);
          }
        } else if (typeof value === 'function') {
          var code = "_this = __this__ = this; (" + value.toString() + ").apply(_this, arguments)";
          var escaped = escapeAttributes ? escapeAttributes(code) : code;
          element.setAttribute(name_1, escaped);
        } else if (value !== false && value != null) {
          if (name_1 === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value);
            } else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '));
            } else {
              debug("unrecognized className value " + _typeof(value) + " " + value);
            }
          } else {
            element.setAttribute(name_1, value.toString());
          }
        } else if (_typeof(value) === 'object') {
          if (name_1 === 'style') {
            element.setAttribute('style', "" + Object.keys(value).map(function (p) {
              return p + ": " + value[p];
            }).join('; '));
          } else if (name_1 === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html);
          } else {
            debug("unrecognized object attribute \"" + name_1 + "\" - the only object attribute supported is \"style\"");
          }
        } else {
          debug("unrecognized attribute \"" + name_1 + "\" with type " + _typeof(value));
        }
      }
    }

    if (typeof tag === 'string') {
      // don't render children for function or classes since they are responsible of render their own children
      children.filter(function (c) {
        return c;
      }).forEach(function (child) {
        if (elementImpl_1.isNode(child)) {
          element.appendChild(child);
        } else if (Array.isArray(child)) {
          child.forEach(function (c) {
            if (typeof c === 'string') {
              element.appendChild(new textNodeImpl(c));
            } else if (elementImpl_1.isNode(c)) {
              element.appendChild(c);
            } else {
              debug("Child is not a node or string: " + c + " , tag: " + tag);
            }
          });
        } else {
          element.appendChild(new textNodeImpl(child));
        }
      });
    }

    return element;
  };
}

exports.createCreateElement = createCreateElement;
exports.AbstractJSXAlone = null;
},{"./elementImpl":"3p56"}],"URgR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // import { AbstractJSXAlone as  } from './createElement';

var _1 = require("."); // export type Props = { children: Children }
// TODO: like React.Fragment


exports.Fragment = function (props) {
  return _1.AbstractJSXAlone.createElement("span", null, props.children);
};

function Js(props) {
  var r = props.children();
  console.log(r);
  return r ? _1.AbstractJSXAlone.createElement(exports.Fragment, null, r) : null;
}

exports.Js = Js;
/** if as statement. children need to be in a function and the function accepts a parameter which value is given condition `c` but casted to NotFalsy<C> so there's no need of type guards in the body. Example:
```
<If c={type}>{type =>
  <select multiple={true}>{names[type].map(c =>
      <option value={c.id}>{c.label}</option>)}
  </select>
</If>
```

No error thrown on second line because parameter type is not falsy but keep the original type (excluding falsy values)

Other example:

```
export class ErrorComponent extends React.Component<ErrorOptions> {
  public render() {
    return <div>
      <If c={this.props.error}>{error =>
        <React.Fragment>
          <h2>Error</h2>
          <If c={typeof error === 'string'}>{e =>
            <h3>{e}</h3>}
          </If>
          <If c={typeof error === 'object'}>{e =>
            <React.Fragment>
              <h5>{error!.name}</h5>
              <p>{error!.message}</p>
              <If c={error.stack}>{e =>
                <ul>
                  {e.split('\n').map(e =>
                    <li>{e}</li>)}
                </ul>}
              </If>
            </React.Fragment>}
          </If>
          <If c={this.props.responseText}>{responseText =>
            <iframe css={{ border: 0, width: '100%', height: '400px' }} srcDoc={responseText}>
            </iframe>}
          </If>
        </React.Fragment>}
      </If>
    </div>
  }
}

```
*/

function If(props) {
  //TODO: issue in dom implementation, children is an array 
  var f = Array.isArray(props.children) ? props.children[0] : props.children;
  var c = props.c,
      p = props.p;
  if (isNotFalsy(c)) return f.apply(null, (p ? [p] : []).concat([c]));else {
    return null;
  }
}

exports.If = If;

function isNotFalsy(a) {
  return !!a;
}
},{".":"USgY"}],"USgY":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./elementImpl"));

__export(require("./elementClass"));

__export(require("./createElement"));

var elementImpl_1 = require("./elementImpl");

exports.AbstractTextNodeLike = elementImpl_1.AbstractTextNodeLike;
exports.AbstractElementLike = elementImpl_1.AbstractElementLike;

__export(require("./misc"));
},{"./elementImpl":"3p56","./elementClass":"+nOU","./createElement":"rCe5","./misc":"URgR"}],"C/Rc":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./flat":"+2od","./array":"PTjC","./prototypeFind":"vHoL"}],"mWoT":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../array");
__export(require("./changeText"));
__export(require("./getPreviousMatchingPos"));
__export(require("./quote"));
__export(require("./json"));
__export(require("./shorter"));
__export(require("./html"));
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i = 1, tabSize = 2) {
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith = ' ') {
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;

},{"../array":"C/Rc","./changeText":"Jo5K","./getPreviousMatchingPos":"dKNz","./quote":"YTm+","./json":"wN23","./shorter":"mBGu","./html":"QVJl"}],"NfZW":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));
__export(require("./time"));

},{"./formatDate":"MN8/","./printMs":"1aZv","./time":"ix8C"}],"8QnR":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./time"));

},{"./string":"mWoT","./array":"C/Rc","./misc":"oHCM","./time":"NfZW"}],"D56h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");

function isJSXAloneComponent(c) {
  return c.prototype && c.prototype.render;
}

exports.isJSXAloneComponent = isJSXAloneComponent;

function isNode(n) {
  return isTextNodeLike(n) || isElementLike(n);
}

exports.isNode = isNode;

function isElementLike(n) {
  return n && n.setAttribute;
}

exports.isElementLike = isElementLike;

function isTextNodeLike(n) {
  return n && n.content && !isElementLike(n);
}

exports.isTextNodeLike = isTextNodeLike;

var AbstractTextNodeLike =
/** @class */
function () {
  function AbstractTextNodeLike(content) {
    this.content = content;
  }

  return AbstractTextNodeLike;
}();

exports.AbstractTextNodeLike = AbstractTextNodeLike;

var AbstractElementLike =
/** @class */
function () {
  function AbstractElementLike(tag) {
    this.tag = tag;
    this.attrs = {};
    this.children = [];
  }

  AbstractElementLike.prototype.setAttribute = function (name, value) {
    this.attrs[name] = value;
  };

  AbstractElementLike.prototype.appendChild = function (c) {
    this.children.push(c);

    if (isElementLike(c)) {
      c.parentElement = this;
    }
  };

  AbstractElementLike.prototype.findDescendant = function (p) {
    var found;
    this.children.some(function (c) {
      if (isElementLike(c)) {
        if (p(c)) {
          found = c;
        } else {
          found = c.findDescendant(p);
        }
      }

      return !!found;
    });
    return found;
  };

  AbstractElementLike.prototype.findAscendant = function (p) {
    if (this.parentElement) {
      if (p(this.parentElement)) {
        return this.parentElement;
      }

      return this.parentElement.findAscendant(p);
    }
  };

  AbstractElementLike.prototype.getAscendants = function () {
    return this.parentElement ? this.parentElement.getAscendants().concat([this.parentElement]) : [];
  };

  AbstractElementLike.prototype.getRootAscendant = function () {
    var r = this.parentElement ? this.findAscendant(function (n) {
      return isElementLike(n) && !n.parentElement;
    }) : this;
    return misc_utils_of_mine_generic_1.checkThrow(r, 'No root ascendant found in element like tree!');
  };

  AbstractElementLike.prototype.getSiblings = function () {
    var _this = this;

    if (this.parentElement) {
      return this.parentElement.children.filter(function (c) {
        return c !== _this;
      });
    }

    return [];
  };

  AbstractElementLike.prototype.findSibling = function (p) {
    return this.getSiblings().find(p);
  };

  AbstractElementLike.prototype.find = function (p) {
    // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
    return this.getRootAscendant().findDescendant(p);
  };

  return AbstractElementLike;
}();

exports.AbstractElementLike = AbstractElementLike;
},{"misc-utils-of-mine-generic":"8QnR"}],"LbiZ":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");
/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */


var ElementClass =
/** @class */
function () {
  function ElementClass(props) {
    this.props = props;
  }

  ElementClass.prototype.childrenAsArray = function () {
    return Array.isArray(this.props.children) ? this.props.children : [this.props.children];
  };

  ElementClass.prototype.childrenElementsAsArray = function () {
    return this.childrenAsArray().filter(function (c) {
      return elementImpl_1.isElementLike(c);
    });
  };

  ElementClass.prototype.firstChildElement = function () {
    return this.childrenAsArray().find(function (e) {
      return true;
    });
  };

  return ElementClass;
}();

exports.ElementClass = ElementClass;

var AbstractElementClass =
/** @class */
function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{"./elementImpl":"D56h"}],"TYq4":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");

var throwOnUnrecognized = false;

function debug(err) {
  if (throwOnUnrecognized) {
    throw err;
  } else {
    console.error(err);
  }
}

exports.debug = debug;

function createCreateElement(_a) {
  var impl = _a.impl,
      textNodeImpl = _a.textNodeImpl,
      escapeAttributes = _a.escapeAttributes;
  return function createElement(tag, attrs) {
    if (attrs === void 0) {
      attrs = {};
    }

    var children = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }

    var element;

    if (typeof tag === 'string') {
      element = new impl(tag);
    } else {
      if (elementImpl_1.isJSXAloneComponent(tag)) {
        element = new tag(__assign({}, attrs, {
          children: children
        })).render();
      } else {
        element = tag(__assign({}, attrs, {
          children: children
        }));
      }

      attrs = {};
    }

    for (var name_1 in attrs) {
      if (name_1 && attrs.hasOwnProperty(name_1)) {
        var value = attrs[name_1];

        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name_1, name_1);
          }
        } else if (typeof value === 'function') {
          var code = "_this = __this__ = this; (" + value.toString() + ").apply(_this, arguments)";
          var escaped = escapeAttributes ? escapeAttributes(code) : code;
          element.setAttribute(name_1, escaped);
        } else if (value !== false && value != null) {
          if (name_1 === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value);
            } else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '));
            } else {
              debug("unrecognized className value " + _typeof(value) + " " + value);
            }
          } else {
            element.setAttribute(name_1, value.toString());
          }
        } else if (_typeof(value) === 'object') {
          if (name_1 === 'style') {
            element.setAttribute('style', "" + Object.keys(value).map(function (p) {
              return p + ": " + value[p];
            }).join('; '));
          } else if (name_1 === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html);
          } else {
            debug("unrecognized object attribute \"" + name_1 + "\" - the only object attribute supported is \"style\"");
          }
        } else {
          debug("unrecognized attribute \"" + name_1 + "\" with type " + _typeof(value));
        }
      }
    }

    if (typeof tag === 'string') {
      // don't render children for function or classes since they are responsible of render their own children
      children.filter(function (c) {
        return c;
      }).forEach(function (child) {
        if (elementImpl_1.isNode(child)) {
          element.appendChild(child);
        } else if (Array.isArray(child)) {
          child.forEach(function (c) {
            if (typeof c === 'string') {
              element.appendChild(new textNodeImpl(c));
            } else if (elementImpl_1.isNode(c)) {
              element.appendChild(c);
            } else {
              debug("Child is not a node or string: " + c + " , tag: " + tag);
            }
          });
        } else {
          element.appendChild(new textNodeImpl(child));
        }
      });
    }

    return element;
  };
}

exports.createCreateElement = createCreateElement;
exports.AbstractJSXAlone = null;
},{"./elementImpl":"D56h"}],"TiN9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // import { AbstractJSXAlone as  } from './createElement';

var _1 = require("."); // export type Props = { children: Children }
// TODO: like React.Fragment


exports.Fragment = function (props) {
  return _1.AbstractJSXAlone.createElement("span", null, props.children);
};

function Js(props) {
  var r = props.children();
  console.log(r);
  return r ? _1.AbstractJSXAlone.createElement(exports.Fragment, null, r) : null;
}

exports.Js = Js;
/** if as statement. children need to be in a function and the function accepts a parameter which value is given condition `c` but casted to NotFalsy<C> so there's no need of type guards in the body. Example:
```
<If c={type}>{type =>
  <select multiple={true}>{names[type].map(c =>
      <option value={c.id}>{c.label}</option>)}
  </select>
</If>
```

No error thrown on second line because parameter type is not falsy but keep the original type (excluding falsy values)

Other example:

```
export class ErrorComponent extends React.Component<ErrorOptions> {
  public render() {
    return <div>
      <If c={this.props.error}>{error =>
        <React.Fragment>
          <h2>Error</h2>
          <If c={typeof error === 'string'}>{e =>
            <h3>{e}</h3>}
          </If>
          <If c={typeof error === 'object'}>{e =>
            <React.Fragment>
              <h5>{error!.name}</h5>
              <p>{error!.message}</p>
              <If c={error.stack}>{e =>
                <ul>
                  {e.split('\n').map(e =>
                    <li>{e}</li>)}
                </ul>}
              </If>
            </React.Fragment>}
          </If>
          <If c={this.props.responseText}>{responseText =>
            <iframe css={{ border: 0, width: '100%', height: '400px' }} srcDoc={responseText}>
            </iframe>}
          </If>
        </React.Fragment>}
      </If>
    </div>
  }
}

```
*/

function If(props) {
  //TODO: issue in dom implementation, children is an array 
  var f = Array.isArray(props.children) ? props.children[0] : props.children;
  var c = props.c,
      p = props.p;
  if (isNotFalsy(c)) return f.apply(null, (p ? [p] : []).concat([c]));else {
    return null;
  }
}

exports.If = If;

function isNotFalsy(a) {
  return !!a;
}
},{".":"kF9h"}],"kF9h":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./elementImpl"));

__export(require("./elementClass"));

__export(require("./createElement"));

var elementImpl_1 = require("./elementImpl");

exports.AbstractTextNodeLike = elementImpl_1.AbstractTextNodeLike;
exports.AbstractElementLike = elementImpl_1.AbstractElementLike;

__export(require("./misc"));
},{"./elementImpl":"D56h","./elementClass":"LbiZ","./createElement":"TYq4","./misc":"TiN9"}],"xhWP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderConfig = { indentLevel: 0, indentTabSize: 2 };

},{}],"CLcs":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indent(config) {
    var L = (config.indentLevel || 0) * (config.indentTabSize || 0);
    var a = [];
    for (var i = 0; i < L; i++) {
        a.push(' ');
    }
    return a.join('');
}
exports.indent = indent;

},{}],"/cDs":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var util_1 = require("./util");
var ElementLikeImpl = /** @class */ (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        var newLine = config.indent ? "\n" : "";
        var content = this.innerHtml ||
            "" + newLine + util_1.indent(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })) + this.children
                .map(function (c) { return "" + c.render(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })); })
                .join('') + newLine + util_1.indent(config);
        return "<" + this.tag + Object.keys(this.attrs)
            .map(function (a) { return " " + a + "=\"" + _this.attrs[a] + "\""; })
            .join('') + ">" + content + "</" + this.tag + ">";
    };
    ElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this.innerHtml = s;
    };
    return ElementLikeImpl;
}(jsx_alone_core_1.AbstractElementLike));
exports.ElementLikeImpl = ElementLikeImpl;
var TextNodeLikeImpl = /** @class */ (function (_super) {
    __extends(TextNodeLikeImpl, _super);
    function TextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor(content:string){
    //   super(content)
    // }
    TextNodeLikeImpl.prototype.render = function (config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + this.content;
    };
    return TextNodeLikeImpl;
}(jsx_alone_core_1.AbstractTextNodeLike));
exports.TextNodeLikeImpl = TextNodeLikeImpl;
var ElementClass = /** @class */ (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;

},{"jsx-alone-core":"kF9h","./config":"xhWP","./util":"CLcs"}],"zyVy":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var elementImpl_1 = require("./elementImpl");
var config = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl,
    escapeAttributes: function (s) { return s.replace(/\"/gim, '&quot;'); }
};
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(config),
    render: function (el, config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + el.render(config);
    }
};
exports.JSXAlone = Module;

},{"jsx-alone-core":"kF9h","./config":"xhWP","./elementImpl":"/cDs"}],"9ujb":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./flat":"+2od","./array":"PTjC","./prototypeFind":"vHoL"}],"Yw14":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../array");
__export(require("./changeText"));
__export(require("./getPreviousMatchingPos"));
__export(require("./quote"));
__export(require("./json"));
__export(require("./shorter"));
__export(require("./html"));
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i = 1, tabSize = 2) {
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith = ' ') {
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;

},{"../array":"9ujb","./changeText":"Jo5K","./getPreviousMatchingPos":"dKNz","./quote":"YTm+","./json":"wN23","./shorter":"mBGu","./html":"QVJl"}],"iToV":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));
__export(require("./time"));

},{"./formatDate":"MN8/","./printMs":"1aZv","./time":"ix8C"}],"bTtz":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./time"));

},{"./string":"Yw14","./array":"9ujb","./misc":"oHCM","./time":"iToV"}],"AP0d":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");
var createElement_1 = require("./createElement");
/** Render the <style> tag with all classes and styles inside. Usage example:
```
const fieldTable: ClassRule = {
  selectorPostfix: ' td',
  border: '1px solid #aaaaaa',
  padding: '2px'
}
const sublistFieldTable: ClassRule = {
  ...fieldTable,
  fontSize: '0.95em',
  border: '1px solid #ededed'
}
const messageFromRedirect: ClassRule = {
  border: '2px solid green'
}
const { styles, classes } = Styles({ fieldTable, sublistFieldTable, messageFromRedirect})
return <div>
  <Style classes={styles}></Style>
  <p className={classes.messageFromRedirect}>{props.msg}</p>
    ```
*/
exports.Style = function (props) {
    function indent(n) {
        return props.renderConfig && props.renderConfig.indent ? misc_utils_of_mine_generic_1.indent(n) : '';
    }
    function fixProperty(s) {
        var t;
        while (t = /([A-Z])/.exec(s)) {
            s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
        }
        return s;
    }
    return createElement_1.JSXAlone.createElement("style", null, Object.keys(props.classes).map(function (c) {
        return indent(1) + "." + c + (props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '') + " {" + Object.keys(props.classes[c]).filter(function (p) { return p !== 'selectorPostfix'; }).map(function (p) { return "\n" + indent(2) + fixProperty(p) + ": " + props.classes[c][p] + ";"; }).join("") + "\n}";
    }).join('\n'));
};
/** build a styles and classnames from a class styles mapped object so is easy to type-check classnames and use them . See `Style` for usage example */
function Styles(styles) {
    var classes = {};
    Object.keys(styles).forEach(function (k) {
        classes[k] = k;
    });
    return {
        styles: styles, classes: classes
    };
}
exports.Styles = Styles;

},{"misc-utils-of-mine-generic":"bTtz","./createElement":"zyVy"}],"o3Jh":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./createElement"));
__export(require("./Style"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":"zyVy","./Style":"AP0d","./elementImpl":"/cDs"}],"JVGL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_alone_string_1 = require("jsx-alone-string");

function getJSXAlone() {
  return jsx_alone_string_1.JSXAlone;
}

exports.getJSXAlone = getJSXAlone;
},{"jsx-alone-string":"o3Jh"}],"IAey":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_alone_core_1 = require("jsx-alone-core");

var impl_1 = require("../impl");

var JSXAlone = impl_1.getJSXAlone();

var App =
/** @class */
function (_super) {
  __extends(App, _super);

  function App() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  App.prototype.render = function () {
    var _this = this;

    return JSXAlone.createElement("div", null, JSXAlone.createElement("h1", null, "Lots of people to print"), JSXAlone.createElement(jsx_alone_core_1.If, {
      c: typeof window !== 'undefined'
    }, function () {
      return JSXAlone.createElement("div", null, JSXAlone.createElement("p", null, "People count: ", JSXAlone.createElement("input", {
        id: "peopleCount",
        value: _this.props.peopleCount + '',
        type: "number"
      })), JSXAlone.createElement("p", null, "Friends count: ", JSXAlone.createElement("input", {
        id: "friendsCount",
        value: _this.props.friendsCount + '',
        type: "number"
      })), JSXAlone.createElement("button", {
        onClick: function onClick(e) {
          var peopleCount = document.querySelector('#peopleCount').valueAsNumber;
          var friendsCount = document.querySelector('#friendsCount').valueAsNumber;
          window.renderAppLotsOfPeople({
            peopleCount: peopleCount,
            friendsCount: friendsCount
          });
        }
      }, "Render!"), JSXAlone.createElement("h4", null, "Timings"), JSXAlone.createElement("ul", null, JSXAlone.createElement("li", null, "onload: ", JSXAlone.createElement("strong", {
        id: "timings_onload"
      })), JSXAlone.createElement("li", null, "buildModel: ", JSXAlone.createElement("strong", {
        id: "timings_buildModel"
      })), JSXAlone.createElement("li", null, "JSXAlone.createElement: ", JSXAlone.createElement("strong", {
        id: "timings_JSXAloneCreateElement"
      })), JSXAlone.createElement("li", null, "JSXAlone.render: ", JSXAlone.createElement("strong", {
        id: "timings_JSXAloneRender"
      }))));
    }), JSXAlone.createElement(People, {
      people: this.props.people
    }));
  };

  return App;
}(jsx_alone_core_1.AbstractElementClass);

exports.App = App;

var EditButton = function EditButton(props) {
  return JSXAlone.createElement("button", {
    "data-name": props.name,
    onClick: function onClick(e) {
      alert(("\nNo context here that's why we need to do the following: \nName: \"" + e.currentTarget.getAttribute('data-name') + "\"\n").trim()); // debugger
    }
  }, props.children);
};

var Person = function Person(props) {
  return JSXAlone.createElement("tr", {
    id: encodeURIComponent(props.name)
  }, JSXAlone.createElement("td", null, props.name), JSXAlone.createElement("td", null, props.age), JSXAlone.createElement("td", null, JSXAlone.createElement("ul", null, props.friends.map(function (f) {
    return JSXAlone.createElement("li", null, JSXAlone.createElement("a", {
      href: "#" + f.name
    }, f.name));
  }))), JSXAlone.createElement("td", null, JSXAlone.createElement(EditButton, {
    name: props.name
  }, "Edit")));
};

var People = function People(props) {
  return JSXAlone.createElement("table", {
    className: "person"
  }, JSXAlone.createElement("thead", null, JSXAlone.createElement("tr", null, JSXAlone.createElement("th", null, "Name"), JSXAlone.createElement("th", null, "Age"), JSXAlone.createElement("th", null, "Friends"), JSXAlone.createElement("th", null, "Actions"))), JSXAlone.createElement("tbody", null, props.people.map(function (p) {
    return JSXAlone.createElement(Person, __assign({}, p));
  })));
};
},{"jsx-alone-core":"USgY","../impl":"JVGL"}],"z8rF":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var model_1 = require("./model");

var App_1 = require("./App");

var model_2 = require("./model");

var impl_1 = require("../impl");

var JSXAlone = impl_1.getJSXAlone();

function renderApp(renderer, config) {
  if (config === void 0) {
    config = model_2.MODEL_CONFIG;
  }

  renderer_ = renderer; // buildModel

  var buildModelT0 = Date.now();
  console.time('buildModel');
  var model = model_1.buildModel(config);
  var buildModelT = Date.now() - buildModelT0;
  console.timeEnd('buildModel'); // createElement - declaring the JSX element here will end up in code calling JSXAlone.createElement

  var JSXAloneCreateElementT0 = Date.now();
  console.time('JSXAlone.createElement');
  var app = JSXAlone.createElement("div", {
    id: "jsx-alone-sample-project-code"
  }, JSXAlone.createElement(App_1.App, __assign({}, model, config)), ";");
  var JSXAloneCreateElementT = Date.now() - JSXAloneCreateElementT0;
  console.timeEnd('JSXAlone.createElement');
  renderer(app, {
    buildModelT: buildModelT,
    JSXAloneCreateElementT: JSXAloneCreateElementT
  });
}

exports.renderApp = renderApp;
var renderer_;

if (typeof window !== 'undefined') {
  // (window as any).renderAppLotsOfPeople = renderApp
  window.renderAppLotsOfPeople = function (config) {
    return renderApp(renderer_, config);
  };
}
},{"./model":"45O1","./App":"IAey","../impl":"JVGL"}],"wC2p":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var renderApp_1 = require("./lotsOfPeople/renderApp");

exports.lotsOfPeople = renderApp_1.renderApp;

__export(require("./util"));
},{"./lotsOfPeople/renderApp":"z8rF","./util":"/5mC"}],"RQYH":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./flat":"+2od","./array":"PTjC","./prototypeFind":"vHoL"}],"KX5j":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../array");
__export(require("./changeText"));
__export(require("./getPreviousMatchingPos"));
__export(require("./quote"));
__export(require("./json"));
__export(require("./shorter"));
__export(require("./html"));
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i = 1, tabSize = 2) {
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith = ' ') {
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;

},{"../array":"RQYH","./changeText":"Jo5K","./getPreviousMatchingPos":"dKNz","./quote":"YTm+","./json":"wN23","./shorter":"mBGu","./html":"QVJl"}],"fliG":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));
__export(require("./time"));

},{"./formatDate":"MN8/","./printMs":"1aZv","./time":"ix8C"}],"y6pc":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./time"));

},{"./string":"KX5j","./array":"RQYH","./misc":"oHCM","./time":"fliG"}],"TgJL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");

function isJSXAloneComponent(c) {
  return c.prototype && c.prototype.render;
}

exports.isJSXAloneComponent = isJSXAloneComponent;

function isNode(n) {
  return isTextNodeLike(n) || isElementLike(n);
}

exports.isNode = isNode;

function isElementLike(n) {
  return n && n.setAttribute;
}

exports.isElementLike = isElementLike;

function isTextNodeLike(n) {
  return n && n.content && !isElementLike(n);
}

exports.isTextNodeLike = isTextNodeLike;

var AbstractTextNodeLike =
/** @class */
function () {
  function AbstractTextNodeLike(content) {
    this.content = content;
  }

  return AbstractTextNodeLike;
}();

exports.AbstractTextNodeLike = AbstractTextNodeLike;

var AbstractElementLike =
/** @class */
function () {
  function AbstractElementLike(tag) {
    this.tag = tag;
    this.attrs = {};
    this.children = [];
  }

  AbstractElementLike.prototype.setAttribute = function (name, value) {
    this.attrs[name] = value;
  };

  AbstractElementLike.prototype.appendChild = function (c) {
    this.children.push(c);

    if (isElementLike(c)) {
      c.parentElement = this;
    }
  };

  AbstractElementLike.prototype.findDescendant = function (p) {
    var found;
    this.children.some(function (c) {
      if (isElementLike(c)) {
        if (p(c)) {
          found = c;
        } else {
          found = c.findDescendant(p);
        }
      }

      return !!found;
    });
    return found;
  };

  AbstractElementLike.prototype.findAscendant = function (p) {
    if (this.parentElement) {
      if (p(this.parentElement)) {
        return this.parentElement;
      }

      return this.parentElement.findAscendant(p);
    }
  };

  AbstractElementLike.prototype.getAscendants = function () {
    return this.parentElement ? this.parentElement.getAscendants().concat([this.parentElement]) : [];
  };

  AbstractElementLike.prototype.getRootAscendant = function () {
    var r = this.parentElement ? this.findAscendant(function (n) {
      return isElementLike(n) && !n.parentElement;
    }) : this;
    return misc_utils_of_mine_generic_1.checkThrow(r, 'No root ascendant found in element like tree!');
  };

  AbstractElementLike.prototype.getSiblings = function () {
    var _this = this;

    if (this.parentElement) {
      return this.parentElement.children.filter(function (c) {
        return c !== _this;
      });
    }

    return [];
  };

  AbstractElementLike.prototype.findSibling = function (p) {
    return this.getSiblings().find(p);
  };

  AbstractElementLike.prototype.find = function (p) {
    // TODO: this should start searching in the near children, sibling and parents, and only after that look on far nodes
    return this.getRootAscendant().findDescendant(p);
  };

  return AbstractElementLike;
}();

exports.AbstractElementLike = AbstractElementLike;
},{"misc-utils-of-mine-generic":"y6pc"}],"8O+M":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");
/**
 * A Class able to render() JSX. Similar to React.Component but only supporting properties, without state, context, ref, did/will methods, etc.
 */


var ElementClass =
/** @class */
function () {
  function ElementClass(props) {
    this.props = props;
  }

  ElementClass.prototype.childrenAsArray = function () {
    return Array.isArray(this.props.children) ? this.props.children : [this.props.children];
  };

  ElementClass.prototype.childrenElementsAsArray = function () {
    return this.childrenAsArray().filter(function (c) {
      return elementImpl_1.isElementLike(c);
    });
  };

  ElementClass.prototype.firstChildElement = function () {
    return this.childrenAsArray().find(function (e) {
      return true;
    });
  };

  return ElementClass;
}();

exports.ElementClass = ElementClass;

var AbstractElementClass =
/** @class */
function (_super) {
  __extends(AbstractElementClass, _super);

  function AbstractElementClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AbstractElementClass;
}(ElementClass);

exports.AbstractElementClass = AbstractElementClass;
},{"./elementImpl":"TgJL"}],"MFEV":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var elementImpl_1 = require("./elementImpl");

var throwOnUnrecognized = false;

function debug(err) {
  if (throwOnUnrecognized) {
    throw err;
  } else {
    console.error(err);
  }
}

exports.debug = debug;

function createCreateElement(_a) {
  var impl = _a.impl,
      textNodeImpl = _a.textNodeImpl,
      escapeAttributes = _a.escapeAttributes;
  return function createElement(tag, attrs) {
    if (attrs === void 0) {
      attrs = {};
    }

    var children = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      children[_i - 2] = arguments[_i];
    }

    var element;

    if (typeof tag === 'string') {
      element = new impl(tag);
    } else {
      if (elementImpl_1.isJSXAloneComponent(tag)) {
        element = new tag(__assign({}, attrs, {
          children: children
        })).render();
      } else {
        element = tag(__assign({}, attrs, {
          children: children
        }));
      }

      attrs = {};
    }

    for (var name_1 in attrs) {
      if (name_1 && attrs.hasOwnProperty(name_1)) {
        var value = attrs[name_1];

        if (typeof value === 'boolean') {
          if (value === true) {
            element.setAttribute(name_1, name_1);
          }
        } else if (typeof value === 'function') {
          var code = "_this = __this__ = this; (" + value.toString() + ").apply(_this, arguments)";
          var escaped = escapeAttributes ? escapeAttributes(code) : code;
          element.setAttribute(name_1, escaped);
        } else if (value !== false && value != null) {
          if (name_1 === 'className') {
            if (typeof value === 'string') {
              element.setAttribute('class', value);
            } else if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
              element.setAttribute('class', value.join(' '));
            } else {
              debug("unrecognized className value " + _typeof(value) + " " + value);
            }
          } else {
            element.setAttribute(name_1, value.toString());
          }
        } else if (_typeof(value) === 'object') {
          if (name_1 === 'style') {
            element.setAttribute('style', "" + Object.keys(value).map(function (p) {
              return p + ": " + value[p];
            }).join('; '));
          } else if (name_1 === 'dangerouslySetInnerHTML' && value && typeof value.__html === 'string') {
            element.dangerouslySetInnerHTML(value.__html);
          } else {
            debug("unrecognized object attribute \"" + name_1 + "\" - the only object attribute supported is \"style\"");
          }
        } else {
          debug("unrecognized attribute \"" + name_1 + "\" with type " + _typeof(value));
        }
      }
    }

    if (typeof tag === 'string') {
      // don't render children for function or classes since they are responsible of render their own children
      children.filter(function (c) {
        return c;
      }).forEach(function (child) {
        if (elementImpl_1.isNode(child)) {
          element.appendChild(child);
        } else if (Array.isArray(child)) {
          child.forEach(function (c) {
            if (typeof c === 'string') {
              element.appendChild(new textNodeImpl(c));
            } else if (elementImpl_1.isNode(c)) {
              element.appendChild(c);
            } else {
              debug("Child is not a node or string: " + c + " , tag: " + tag);
            }
          });
        } else {
          element.appendChild(new textNodeImpl(child));
        }
      });
    }

    return element;
  };
}

exports.createCreateElement = createCreateElement;
exports.AbstractJSXAlone = null;
},{"./elementImpl":"TgJL"}],"TXrL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // import { AbstractJSXAlone as  } from './createElement';

var _1 = require("."); // export type Props = { children: Children }
// TODO: like React.Fragment


exports.Fragment = function (props) {
  return _1.AbstractJSXAlone.createElement("span", null, props.children);
};

function Js(props) {
  var r = props.children();
  console.log(r);
  return r ? _1.AbstractJSXAlone.createElement(exports.Fragment, null, r) : null;
}

exports.Js = Js;
/** if as statement. children need to be in a function and the function accepts a parameter which value is given condition `c` but casted to NotFalsy<C> so there's no need of type guards in the body. Example:
```
<If c={type}>{type =>
  <select multiple={true}>{names[type].map(c =>
      <option value={c.id}>{c.label}</option>)}
  </select>
</If>
```

No error thrown on second line because parameter type is not falsy but keep the original type (excluding falsy values)

Other example:

```
export class ErrorComponent extends React.Component<ErrorOptions> {
  public render() {
    return <div>
      <If c={this.props.error}>{error =>
        <React.Fragment>
          <h2>Error</h2>
          <If c={typeof error === 'string'}>{e =>
            <h3>{e}</h3>}
          </If>
          <If c={typeof error === 'object'}>{e =>
            <React.Fragment>
              <h5>{error!.name}</h5>
              <p>{error!.message}</p>
              <If c={error.stack}>{e =>
                <ul>
                  {e.split('\n').map(e =>
                    <li>{e}</li>)}
                </ul>}
              </If>
            </React.Fragment>}
          </If>
          <If c={this.props.responseText}>{responseText =>
            <iframe css={{ border: 0, width: '100%', height: '400px' }} srcDoc={responseText}>
            </iframe>}
          </If>
        </React.Fragment>}
      </If>
    </div>
  }
}

```
*/

function If(props) {
  //TODO: issue in dom implementation, children is an array 
  var f = Array.isArray(props.children) ? props.children[0] : props.children;
  var c = props.c,
      p = props.p;
  if (isNotFalsy(c)) return f.apply(null, (p ? [p] : []).concat([c]));else {
    return null;
  }
}

exports.If = If;

function isNotFalsy(a) {
  return !!a;
}
},{".":"HpCL"}],"HpCL":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./elementImpl"));

__export(require("./elementClass"));

__export(require("./createElement"));

var elementImpl_1 = require("./elementImpl");

exports.AbstractTextNodeLike = elementImpl_1.AbstractTextNodeLike;
exports.AbstractElementLike = elementImpl_1.AbstractElementLike;

__export(require("./misc"));
},{"./elementImpl":"TgJL","./elementClass":"8O+M","./createElement":"MFEV","./misc":"TXrL"}],"Y5I1":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var util_1 = require("./util");
var ElementLikeImpl = /** @class */ (function (_super) {
    __extends(ElementLikeImpl, _super);
    function ElementLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementLikeImpl.prototype.render = function (config) {
        var _this = this;
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        var newLine = config.indent ? "\n" : "";
        var content = this.innerHtml ||
            "" + newLine + util_1.indent(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })) + this.children
                .map(function (c) { return "" + c.render(__assign({}, config, { indentLevel: (config.indentLevel || 0) + 1 })); })
                .join('') + newLine + util_1.indent(config);
        return "<" + this.tag + Object.keys(this.attrs)
            .map(function (a) { return " " + a + "=\"" + _this.attrs[a] + "\""; })
            .join('') + ">" + content + "</" + this.tag + ">";
    };
    ElementLikeImpl.prototype.dangerouslySetInnerHTML = function (s) {
        this.innerHtml = s;
    };
    return ElementLikeImpl;
}(jsx_alone_core_1.AbstractElementLike));
exports.ElementLikeImpl = ElementLikeImpl;
var TextNodeLikeImpl = /** @class */ (function (_super) {
    __extends(TextNodeLikeImpl, _super);
    function TextNodeLikeImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor(content:string){
    //   super(content)
    // }
    TextNodeLikeImpl.prototype.render = function (config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + this.content;
    };
    return TextNodeLikeImpl;
}(jsx_alone_core_1.AbstractTextNodeLike));
exports.TextNodeLikeImpl = TextNodeLikeImpl;
var ElementClass = /** @class */ (function (_super) {
    __extends(ElementClass, _super);
    function ElementClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementClass;
}(jsx_alone_core_1.ElementClass));
exports.ElementClass = ElementClass;

},{"jsx-alone-core":"HpCL","./config":"xhWP","./util":"CLcs"}],"PHuq":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_alone_core_1 = require("jsx-alone-core");
var config_1 = require("./config");
var elementImpl_1 = require("./elementImpl");
var config = {
    impl: elementImpl_1.ElementLikeImpl,
    textNodeImpl: elementImpl_1.TextNodeLikeImpl,
    escapeAttributes: function (s) { return s.replace(/\"/gim, '&quot;'); }
};
var Module = {
    createElement: jsx_alone_core_1.createCreateElement(config),
    render: function (el, config) {
        if (config === void 0) { config = config_1.defaultRenderConfig; }
        return "" + el.render(config);
    }
};
exports.JSXAlone = Module;

},{"jsx-alone-core":"HpCL","./config":"xhWP","./elementImpl":"Y5I1"}],"RGsG":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./flat"));
__export(require("./array"));
__export(require("./prototypeFind"));

},{"./flat":"+2od","./array":"PTjC","./prototypeFind":"vHoL"}],"m49I":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../array");
__export(require("./changeText"));
__export(require("./getPreviousMatchingPos"));
__export(require("./quote"));
__export(require("./json"));
__export(require("./shorter"));
__export(require("./html"));
function repeat(n, s) {
    return array_1.array(n, s).join('');
}
exports.repeat = repeat;
function indent(i = 1, tabSize = 2) {
    return repeat(i * tabSize, ' ');
}
exports.indent = indent;
function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}
exports.getPosition = getPosition;
function removeWhites(s, replaceWith = ' ') {
    return s.replace(/\s+/gm, replaceWith).trim();
}
exports.removeWhites = removeWhites;

},{"../array":"RGsG","./changeText":"Jo5K","./getPreviousMatchingPos":"dKNz","./quote":"YTm+","./json":"wN23","./shorter":"mBGu","./html":"QVJl"}],"XQI1":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./formatDate"));
__export(require("./printMs"));
__export(require("./time"));

},{"./formatDate":"MN8/","./printMs":"1aZv","./time":"ix8C"}],"Hxkq":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string"));
__export(require("./array"));
__export(require("./misc"));
__export(require("./time"));

},{"./string":"m49I","./array":"RGsG","./misc":"oHCM","./time":"XQI1"}],"V5o3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");
var createElement_1 = require("./createElement");
/** Render the <style> tag with all classes and styles inside. Usage example:
```
const fieldTable: ClassRule = {
  selectorPostfix: ' td',
  border: '1px solid #aaaaaa',
  padding: '2px'
}
const sublistFieldTable: ClassRule = {
  ...fieldTable,
  fontSize: '0.95em',
  border: '1px solid #ededed'
}
const messageFromRedirect: ClassRule = {
  border: '2px solid green'
}
const { styles, classes } = Styles({ fieldTable, sublistFieldTable, messageFromRedirect})
return <div>
  <Style classes={styles}></Style>
  <p className={classes.messageFromRedirect}>{props.msg}</p>
    ```
*/
exports.Style = function (props) {
    function indent(n) {
        return props.renderConfig && props.renderConfig.indent ? misc_utils_of_mine_generic_1.indent(n) : '';
    }
    function fixProperty(s) {
        var t;
        while (t = /([A-Z])/.exec(s)) {
            s = s.substring(0, t.index) + '-' + t[1].toLowerCase() + s.substring(t.index + 1, s.length);
        }
        return s;
    }
    return createElement_1.JSXAlone.createElement("style", null, Object.keys(props.classes).map(function (c) {
        return indent(1) + "." + c + (props.classes[c] && props.classes[c].selectorPostfix ? props.classes[c].selectorPostfix : '') + " {" + Object.keys(props.classes[c]).filter(function (p) { return p !== 'selectorPostfix'; }).map(function (p) { return "\n" + indent(2) + fixProperty(p) + ": " + props.classes[c][p] + ";"; }).join("") + "\n}";
    }).join('\n'));
};
/** build a styles and classnames from a class styles mapped object so is easy to type-check classnames and use them . See `Style` for usage example */
function Styles(styles) {
    var classes = {};
    Object.keys(styles).forEach(function (k) {
        classes[k] = k;
    });
    return {
        styles: styles, classes: classes
    };
}
exports.Styles = Styles;

},{"misc-utils-of-mine-generic":"Hxkq","./createElement":"PHuq"}],"idtX":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./createElement"));
__export(require("./Style"));
var elementImpl_1 = require("./elementImpl");
exports.ElementClass = elementImpl_1.ElementClass;

},{"./createElement":"PHuq","./Style":"V5o3","./elementImpl":"Y5I1"}],"wdqJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jsx_alone_sample_project_code_1 = require("jsx-alone-sample-project-code");

var jsx_alone_string_1 = require("jsx-alone-string");

var renderer = function renderer(app, config) {
  // measures onload
  var onloadT0 = Date.now();
  console.time('onload');

  window.onload = function () {
    console.timeEnd('onload');
    var onloadT = Date.now() - onloadT0;
    document.getElementById('timings_onload').innerHTML = jsx_alone_sample_project_code_1.printMs(onloadT);
    document.getElementById('timings_buildModel').innerHTML = jsx_alone_sample_project_code_1.printMs(config.buildModelT);
    document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_sample_project_code_1.printMs(config.JSXAloneCreateElementT);
    document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_sample_project_code_1.printMs(JSXAloneRenderT);
  }; // measures render


  var JSXAloneRenderT0 = Date.now();
  console.time('JSXAlone.render()');
  var s = jsx_alone_string_1.JSXAlone.render(app);
  console.timeEnd('JSXAlone.render()');
  var JSXAloneRenderT = Date.now() - JSXAloneRenderT0; // measures appendChild TODO: timing

  var root = document.getElementById('jsx-alone-sample-project-code');

  if (root) {
    root.remove();
  }

  root = document.createElement('dir');
  root.setAttribute('id', 'jsx-alone-sample-project-code');
  root.innerHTML = s;
  document.body.appendChild(root);
  document.getElementById('timings_onload').innerHTML = 'N/E';
  document.getElementById('timings_buildModel').innerHTML = jsx_alone_sample_project_code_1.printMs(config.buildModelT);
  document.getElementById('timings_JSXAloneCreateElement').innerHTML = jsx_alone_sample_project_code_1.printMs(config.JSXAloneCreateElementT);
  document.getElementById('timings_JSXAloneRender').innerHTML = jsx_alone_sample_project_code_1.printMs(JSXAloneRenderT);
};

jsx_alone_sample_project_code_1.lotsOfPeople(renderer);
},{"jsx-alone-sample-project-code":"wC2p","jsx-alone-string":"idtX"}]},{},["wdqJ"], null)
//# sourceMappingURL=main.186cb047.map