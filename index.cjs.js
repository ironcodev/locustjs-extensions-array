"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.max = exports.min = exports.contains = exports.sortBy = exports.objectify = exports.any = exports.all = exports.removeAt = exports.insertAt = exports.range = exports.shuffle = exports[
  "default"
] = void 0;

var _locustjsBase = require("locustjs-base");

var _locustjsExtensionsOptions = require("locustjs-extensions-options");

var _locustjsExtensionsObject = require("locustjs-extensions-object");

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

var throwArrayExpectedException = function throwArrayExpectedException(x) {
  if (!(0, _locustjsBase.isArray)(x)) {
    throw "Array expected but received ".concat(_typeof(x), ".");
  }
};

var shuffle = function shuffle(arr) {
  throwArrayExpectedException(arr);
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
  throwArrayExpectedException(arr);
  return arr.splice(index, 0, item);
};

exports.insertAt = insertAt;

var removeAt = function removeAt(arr, index) {
  throwArrayExpectedException(arr);
  return arr.splice(index, 1)[0];
};

exports.removeAt = removeAt;

var all = function all(arr, fn) {
  throwArrayExpectedException(arr);

  if (!(0, _locustjsBase.isFunction)(fn)) {
    throw "no callback function is given or the argument is not a function";
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
  throwArrayExpectedException(arr);

  if (!(0, _locustjsBase.isFunction)(fn)) {
    throw "no function is given or the argument is not a function";
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

var objectify = function objectify(arr) {
  // this method is reverse of toArray() in locustjs-extensions-object
  var result;

  if (!(0, _locustjsBase.isArray)(arr)) {
    return arr;
  }

  if (arr.length == 0) return {};

  if (arr.length == 1) {
    result = arr[0];

    if ((0, _locustjsBase.isArray)(result)) {
      var temp = [];

      var _iterator = _createForOfIteratorHelper(result),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          temp.push(objectify(item));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      result = temp;
    }

    return result;
  }

  result = {};

  for (var i = 0; i < arr.length; i += 2) {
    var key = arr[i];
    var value = i + 1 < arr.length ? arr[i + 1] : null;
    if ((0, _locustjsBase.isArray)(value)) result[key] = objectify(value);
    else result[key] = value;
  }

  return result;
};

exports.objectify = objectify;

var nestedJoin = function nestedJoin(arr) {
  // this method is not complete yet. it has bugs. it is not exported.
  var result;

  if (!(0, _locustjsBase.isArray)(arr)) {
    if (isObject(arr)) {
      result = arr;
    } else {
      result = {};
      result[""] = arr;
    }

    return result;
  }

  if (arr.length == 0) return null;

  if (arr.length == 1) {
    result = {};

    if (isObject(arr[0])) {
      result = arr[0];
    } else {
      result = {};
      result[""] = arr[0];
    }

    return result;
  }

  for (var i = 0; i < arr.length; i += 2) {
    var key = arr[i];
    var value = i + 1 < arr.length ? arr[i + 1] : null;

    if (i == 0) {
      result = (0, _locustjsBase.isArray)(key) ? [] : {};
    }

    if ((0, _locustjsBase.isArray)(key)) {
      var temp1 = nestedJoin(key);
      var temp2 = void 0;
      var temp = {};

      if (value) {
        if ((0, _locustjsBase.isArray)(value)) temp2 = nestedJoin(value);
        else temp2 = value;
      }

      if (!(0, _locustjsBase.isArray)(temp1)) {
        temp = (0, _locustjsExtensionsObject.deepAssign)(temp, temp1, temp2);

        if (
          Object.keys(temp).length ==
          (temp1 ? Object.keys(temp1).length : 0) +
            (temp2 ? Object.keys(temp2).length : 0)
        ) {
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
      if ((0, _locustjsBase.isArray)(value)) result[key] = nestedJoin(value);
      else result[key] = value;
    }
  }

  if ((0, _locustjsBase.isArray)(result) && result.length == 1) {
    result = result[0];
  }

  return result;
};

var sortBy = function sortBy(arr) {
  for (
    var _len = arguments.length,
      fns = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    fns[_key - 1] = arguments[_key];
  }

  throwArrayExpectedException(arr);

  if (fns.length == 0) {
    throw "please specify sortBy function";
  }

  var sort_fn = function sort_fn(a, b) {
    var result = 0;

    var _iterator2 = _createForOfIteratorHelper(fns),
      _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var fn = _step2.value;
        var fn_a = fn(a);
        var fn_b = fn(b);

        if (fn_a > fn_b) {
          result = 1;
          break;
        }

        if (fn_a < fn_b) {
          result = -1;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return result;
  };

  return arr.sort(sort_fn);
};

exports.sortBy = sortBy;

var contains = function contains(arr) {
  throwArrayExpectedException(arr);
  var result = [];

  for (
    var _len2 = arguments.length,
      values = new Array(_len2 > 1 ? _len2 - 1 : 0),
      _key2 = 1;
    _key2 < _len2;
    _key2++
  ) {
    values[_key2 - 1] = arguments[_key2];
  }

  for (var i = 0; i < values.length; i++) {
    if ((0, _locustjsBase.isPrimitive)(values[i])) {
      values[i] = values[i].toString().toLowerCase();
    }
  }

  for (var _i = 0; _i < arr.length; _i++) {
    if ((0, _locustjsBase.isPrimitive)(arr[_i])) {
      for (var j = 0; j < values.length; j++) {
        if (arr[_i].toString().toLowerCase() == values[j]) {
          result.push(true);
        }
      }
    } else {
      for (var _j = 0; _j < values.length; _j++) {
        if ((0, _locustjsBase.equals)(arr[_i], values[_j])) {
          result.push(true);
        }
      }
    }
  }

  return result.length == values.length;
};

exports.contains = contains;

var min = function min(arr, mapper) {
  throwArrayExpectedException(arr);

  if (!(0, _locustjsBase.isFunction)(mapper)) {
    throw "no mapping function is given or the argument is not a function";
  }

  var result = Infinity;

  for (var i = 0; i < arr.length; i++) {
    var item = (0, _locustjsBase.isFunction)(mapper) ? mapper(arr[i]) : arr[i];

    if (item < result) {
      result = item;
    }
  }

  return result;
};

exports.min = min;

var max = function max(arr, mapper) {
  throwArrayExpectedException(arr);

  if (!(0, _locustjsBase.isFunction)(mapper)) {
    throw "no mapping function is given or the argument is not a function";
  }

  var result = -Infinity;

  for (var i = 0; i < arr.length; i++) {
    var item = (0, _locustjsBase.isFunction)(mapper) ? mapper(arr[i]) : arr[i];

    if (item > result) {
      result = item;
    }
  }

  return result;
};

exports.max = max;

function configureArrayExtensions(options) {
  var _options = (0, _locustjsExtensionsOptions.configureOptions)(options);

  if (
    !Array.prototype.clone ||
    (0, _locustjsExtensionsOptions.shouldExtend)("clone", _options)
  ) {
    Array.prototype.clone = function () {
      return this.slice(0);
    };
  } // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  if (
    !Array.prototype.shuffle ||
    (0, _locustjsExtensionsOptions.shouldExtend)("shuffle", _options)
  ) {
    Array.prototype.shuffle = function () {
      return shuffle(this);
    };
  }

  if (
    !Array.prototype.insertAt ||
    (0, _locustjsExtensionsOptions.shouldExtend)("insertAt", _options)
  ) {
    Array.prototype.insertAt = function (index, item) {
      return insertAt(this, index, item);
    };
  }

  if (
    !Array.prototype.removeAt ||
    (0, _locustjsExtensionsOptions.shouldExtend)("removeAt", _options)
  ) {
    Array.prototype.removeAt = function (index) {
      return removeAt(this, index);
    };
  }

  if (
    !Array.range ||
    (0, _locustjsExtensionsOptions.shouldExtend)("range", _options)
  ) {
    Array.range = range;
  }

  if (
    !Array.prototype.all ||
    (0, _locustjsExtensionsOptions.shouldExtend)("all", _options)
  ) {
    Array.prototype.all = function (fn) {
      return all(this, fn);
    };
  }

  if (
    !Array.prototype.any ||
    (0, _locustjsExtensionsOptions.shouldExtend)("any", _options)
  ) {
    Array.prototype.any = function (fn) {
      return any(this, fn);
    };
  }

  if (
    !Array.prototype.contains ||
    (0, _locustjsExtensionsOptions.shouldExtend)("contains", _options)
  ) {
    Array.prototype.contains = function () {
      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3];
      }

      return contains.apply(void 0, [this].concat(args));
    };
  }

  if (
    !Array.prototype.objectify ||
    (0, _locustjsExtensionsOptions.shouldExtend)("objectify", _options)
  ) {
    Array.prototype.objectify = function () {
      return objectify(this);
    };
  }

  if (
    !Array.prototype.nestedJoin ||
    (0, _locustjsExtensionsOptions.shouldExtend)("nestedJoin", _options)
  ) {
    /*	this method has close relation with nestedSplit in locustjs-extensions-string
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
    Array.prototype.nestedJoin = function () {
      for (
        var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;
        _key4 < _len4;
        _key4++
      ) {
        args[_key4] = arguments[_key4];
      }

      return nestedJoin.apply(void 0, [this].concat(args));
    };
  }

  if (
    !Array.prototype.sortBy ||
    (0, _locustjsExtensionsOptions.shouldExtend)("sortBy", _options)
  ) {
    Array.prototype.sortBy = function () {
      for (
        var _len5 = arguments.length, fns = new Array(_len5), _key5 = 0;
        _key5 < _len5;
        _key5++
      ) {
        fns[_key5] = arguments[_key5];
      }

      return sortBy.apply(void 0, [this].concat(fns));
    };
  }

  if (
    !Array.prototype.min ||
    (0, _locustjsExtensionsOptions.shouldExtend)("min", _options)
  ) {
    Array.prototype.min = function (mapper) {
      return min(this, mapper);
    };
  }

  if (
    !Array.prototype.max ||
    (0, _locustjsExtensionsOptions.shouldExtend)("max", _options)
  ) {
    Array.prototype.max = function (mapper) {
      return max(this, mapper);
    };
  }
}

var _default = configureArrayExtensions;
exports["default"] = _default;
