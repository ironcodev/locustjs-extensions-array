"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Objectify = exports.any = exports.all = exports.removeAt = exports.insertAt = exports.range = exports.shuffle = exports.default = void 0;

var _locustjsBase = require("locustjs-base");

var _locustjsExtensionsOptions = require("locustjs-extensions-options");

var _locustjsExtensionsObject = require("locustjs-extensions-object");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var shuffle = function shuffle(arr) {
  if (!(0, _locustjsBase.isArray)(arr)) {
    throw "expected an array";
  }

  var currentIndex = arr.length,
      temporaryValue,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

exports.shuffle = shuffle;

var range = function range(from, to) {
  from = parseInt(from);
  to = parseInt(to);
  var result = [];

  for (var i = from; i < to; i++) {
    result.push(i);
  }

  return result;
};

exports.range = range;

var insertAt = function insertAt(arr, index, item) {
  if (!(0, _locustjsBase.isArray)(arr)) {
    throw "expected array but received ".concat(_typeof(arr));
  }

  return arr.splice(index, 0, item);
};

exports.insertAt = insertAt;

var removeAt = function removeAt(arr, index) {
  if (!(0, _locustjsBase.isArray)(arr)) {
    throw "expected array but received ".concat(_typeof(arr));
  }

  return arr.splice(index, 1)[0];
};

exports.removeAt = removeAt;

var all = function all(arr, fn) {
  if (!(0, _locustjsBase.isArray)(arr)) {
    throw "expected array but received ".concat(_typeof(arr));
  }

  if (!(0, _locustjsBase.isFunction)(fn)) {
    throw 'no callback function is given or the argument is not a function';
  }

  var result = true;

  for (var i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result = false;
      break;
    }
  }

  return result;
};

exports.all = all;

var any = function any(arr, fn) {
  if (!(0, _locustjsBase.isArray)(arr)) {
    throw "expected array but received ".concat(_typeof(arr));
  }

  if (!(0, _locustjsBase.isFunction)(fn)) {
    throw 'no function is given or the argument is not a function';
  }

  var result = false;

  for (var i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result = true;
      break;
    }
  }

  return result;
};

exports.any = any;

var Objectify = function Objectify(arr) {
  if (!(0, _locustjsBase.isArray)(arr)) {
    throw "expected array but received ".concat(_typeof(arr));
  }

  var result;

  if (!(0, _locustjsBase.isArray)(arr)) {
    result = {};
    result[arr.toString()] = null;
    return result;
  }

  if (arr.length == 0) return null;

  if (arr.length == 1) {
    result = {};
    result[arr[0].toString()] = null;
    return result;
  }

  for (var i = 0; i < arr.length; i += 2) {
    var key = arr[i];
    var value = i + 1 < arr.length ? arr[i + 1] : null;

    if (i == 0) {
      result = (0, _locustjsBase.isArray)(key) ? [] : {};
    }

    if ((0, _locustjsBase.isArray)(key)) {
      var temp1 = key.Objectify();
      var temp2 = void 0;
      var temp = {};

      if (value) {
        if ((0, _locustjsBase.isArray)(value)) temp2 = value.Objectify();else temp2 = value;
      }

      if (!(0, _locustjsBase.isArray)(temp1)) {
        temp = (0, _locustjsExtensionsObject.deepAssign)(temp, temp1, temp2);

        if (Object.keys(temp).length == (temp1 ? Object.keys(temp1).length : 0) + (temp2 ? Object.keys(temp2).length : 0)) {
          if ((0, _locustjsBase.isArray)(result)) {
            result = temp;
            continue;
          }
        }
      }

      if ((0, _locustjsBase.isArray)(result)) {
        result.push(temp1);
        if (temp2) result.push(temp2);
      } else {
        (0, _locustjsExtensionsObject.deepAssign)(result, temp1);
        (0, _locustjsExtensionsObject.deepAssign)(result, temp2);
      }
    } else {
      if ((0, _locustjsBase.isArray)(value)) result[key] = value.Objectify();else result[key] = value;
    }
  }

  if ((0, _locustjsBase.isArray)(result) && result.length == 1) {
    result = result[0];
  }

  return result;
};

exports.Objectify = Objectify;

var sortBy = function sortBy(arr, fn) {
  return arr.sort(function (a, b) {
    return fn(a) > fn(b) ? 1 : -1;
  });
};

function configureArrayExtensions(options) {
  var _options = (0, _locustjsExtensionsOptions.configureOptions)(options);

  if (!Array.prototype.clone || (0, _locustjsExtensionsOptions.shouldExtend)('clone', _options)) {
    Array.prototype.clone = function () {
      return this.slice(0);
    };
  } // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array


  if (!Array.prototype.shuffle || (0, _locustjsExtensionsOptions.shouldExtend)('shuffle', _options)) {
    Array.prototype.shuffle = function () {
      return shuffle(this);
    };
  }

  if (!Array.prototype.insertAt || (0, _locustjsExtensionsOptions.shouldExtend)('insertAt', _options)) {
    Array.prototype.insertAt = function (index, item) {
      return insertAt(this, index, item);
    };
  }

  if (!Array.prototype.removeAt || (0, _locustjsExtensionsOptions.shouldExtend)('removeAt', _options)) {
    Array.prototype.removeAt = function (index) {
      return removeAt(this, index);
    };
  }

  if (!Array.range || (0, _locustjsExtensionsOptions.shouldExtend)('range', _options)) {
    Array.range = range;
  }

  if (!Array.prototype.all || (0, _locustjsExtensionsOptions.shouldExtend)('all', _options)) {
    Array.prototype.all = function (fn) {
      return all(this, fn);
    };
  }

  if (!Array.prototype.any || (0, _locustjsExtensionsOptions.shouldExtend)('any', _options)) {
    Array.prototype.any = function (fn) {
      return any(this, fn);
    };
  }

  if (!Array.prototype.Objectify || (0, _locustjsExtensionsOptions.shouldExtend)('Objectify', _options)) {
    /*	this method has close relation with String.prototype.nestedSplit in locustjs-extensions-string
    	examples
    	input:
    	[
    		["a", 1],
    		["b", "ali"]
    	]
    	output: { "a": 1, "b": "ali" }
    	
    	input:
    		[
    			[ ["a",1],["b", "ali"] ],
    			[ ["a",2],["b", "reza"],["c", true] ],
    			[ ["a",3],["b"],["c", false] ],
    			[ ["b", "saeed"],["c", true] ]
    		]
    	output:
    		[
    			{ "a": 1, "b": "ali" },
    			{ "a": 2, "b": "reza" , "c": true },
    			{ "a": 3, "b": null, "c": false },
    			{ "b": "saeed", "c": true}
    		]
    */
    Array.prototype.Objectify = function () {
      return Objectify(this);
    };
  }

  if (!Array.prototype.sortBy || (0, _locustjsExtensionsOptions.shouldExtend)('sortBy', _options)) {
    Array.prototype.sortBy = function (fn) {
      return sortBy(this, fn);
    };
  }
}

var _default = configureArrayExtensions;
exports.default = _default;