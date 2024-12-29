"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertAt = exports["default"] = exports.contains = exports.any = exports.all = void 0;
exports.joins = joins;
exports.sortBy = exports.shuffle = exports.removeAt = exports.range = exports.objectify = exports.min = exports.max = void 0;
exports.toObject = toObject;
var _base = require("@locustjs/base");
var _extensionsObject = require("@locustjs/extensions-object");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var throwArrayExpectedException = function throwArrayExpectedException(x) {
  if (!(0, _base.isArray)(x)) {
    throw "Array expected but received ".concat(_typeof(x), ".");
  }
};
var shuffle = exports.shuffle = function shuffle(arr) {
  throwArrayExpectedException(arr);
  var currentIndex = arr.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
};
var range = exports.range = function range(from, to) {
  from = parseInt(from);
  to = parseInt(to);
  var result = [];
  for (var i = from; i < to; i++) {
    result.push(i);
  }
  return result;
};
var insertAt = exports.insertAt = function insertAt(arr, index, item) {
  throwArrayExpectedException(arr);
  return arr.splice(index, 0, item);
};
var removeAt = exports.removeAt = function removeAt(arr, index) {
  throwArrayExpectedException(arr);
  return arr.splice(index, 1)[0];
};
var all = exports.all = function all(arr, fn) {
  throwArrayExpectedException(arr);
  if (!(0, _base.isFunction)(fn)) {
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
var any = exports.any = function any(arr, fn) {
  throwArrayExpectedException(arr);
  if (!(0, _base.isFunction)(fn)) {
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
function joins(arr, delimiters) {
  var result = [];
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if ((0, _base.isArray)(item)) {
        result.push(joins(item, delimiters.slice(1)));
      } else {
        result.push(item);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result.join(delimiters[0]);
}
var sortBy = exports.sortBy = function sortBy(arr) {
  for (var _len = arguments.length, fns = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }
  throwArrayExpectedException(arr);
  if (fns.length == 0) {
    throw "please specify sortBy function";
  }
  var sort_fn = function sort_fn(a, b) {
    var result = 0;
    for (var _i = 0, _fns = fns; _i < _fns.length; _i++) {
      var fn = _fns[_i];
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
    return result;
  };
  return arr.sort(sort_fn);
};
var contains = exports.contains = function contains(arr) {
  throwArrayExpectedException(arr);
  var result = [];
  for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    values[_key2 - 1] = arguments[_key2];
  }
  for (var i = 0; i < values.length; i++) {
    if ((0, _base.isPrimitive)(values[i])) {
      values[i] = values[i].toString().toLowerCase();
    }
  }
  for (var _i2 = 0; _i2 < arr.length; _i2++) {
    if ((0, _base.isPrimitive)(arr[_i2])) {
      for (var j = 0; j < values.length; j++) {
        if (arr[_i2].toString().toLowerCase() == values[j]) {
          result.push(true);
        }
      }
    } else {
      for (var _j = 0; _j < values.length; _j++) {
        if ((0, _base.equals)(arr[_i2], values[_j])) {
          result.push(true);
        }
      }
    }
  }
  return result.length == values.length;
};
var min = exports.min = function min(arr, mapper) {
  throwArrayExpectedException(arr);
  if (!(0, _base.isFunction)(mapper)) {
    throw 'no mapping function is given or the argument is not a function';
  }
  var result = Infinity;
  for (var i = 0; i < arr.length; i++) {
    var item = (0, _base.isFunction)(mapper) ? mapper(arr[i]) : arr[i];
    if (item < result) {
      result = item;
    }
  }
  return result;
};
var max = exports.max = function max(arr, mapper) {
  throwArrayExpectedException(arr);
  if (!(0, _base.isFunction)(mapper)) {
    throw 'no mapping function is given or the argument is not a function';
  }
  var result = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    var item = (0, _base.isFunction)(mapper) ? mapper(arr[i]) : arr[i];
    if (item > result) {
      result = item;
    }
  }
  return result;
};
function toObjectKeyValue(arr) {
  var result = {};
  var _iterator2 = _createForOfIteratorHelper(arr),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      if ((0, _base.isArray)(item) && item.length == 2) {
        if ((0, _base.isArray)(item[1])) {
          result[item[0]] = toObjectKeyValue(item[1]);
        } else {
          result[item[0]] = item[1];
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return result;
}
function toObjectSchema(arr) {
  var result = {};
  var _iterator3 = _createForOfIteratorHelper(arr),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var item = _step3.value;
      if ((0, _base.isArray)(item)) {
        if (item.length == 2 && (0, _base.isArray)(item[1])) {
          result[item[0]] = toObjectSchema(item[1]);
        }
      } else {
        result[item] = undefined;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return result;
}
function toObjectValues(arr, schema) {
  var result = {};
  if ((0, _base.isArray)(arr) && (0, _base.isArray)(schema) && arr.length == schema.length) {
    for (var i = 0; i < schema.length; i++) {
      var key = schema[i];
      if ((0, _base.isArray)(key)) {
        if (key.length == 2 && (0, _base.isArray)(key[1])) {
          result[key[0]] = toObjectValues(arr[i], key[1]);
        }
      } else {
        result[key] = arr[i];
      }
    }
  }
  return result;
}
function toObject(arr, type, schema) {
  var result;
  if ((0, _base.isArray)(arr)) {
    if (arr.length == 1) {
      result = arr[0];
    } else {
      switch (type) {
        case 'keyvalue':
        case 'key/value':
        case 'key-value':
          result = toObjectKeyValue(arr);
          break;
        case 'values':
          result = toObjectValues(arr, schema);
          break;
        case 'keys':
        case 'schema':
          result = toObjectSchema(arr);
          break;
      }
    }
  } else {
    result = arr;
  }
  return result;
}
var objectify = exports.objectify = function objectify(arr) {
  return toObject(arr, 'key-value');
};
function configureArrayExtensions(options) {
  var eh = new ExtensionHelper(options, console);
  eh.extend(Array, 'clone', function () {
    return this.slice(0);
  });

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  eh.extend(Array, 'shuffle', function () {
    return shuffle(this);
  });
  eh.extend(Array, 'insertAt', function (index, item) {
    return insertAt(this, index, item);
  });
  eh.extend(Array, 'removeAt', function (index) {
    return removeAt(this, index);
  });
  if (Array.range === undefined || eh.shouldExtend('range')) {
    Array.range = range;
  }
  eh.extend(Array, 'all', function (fn) {
    return all(this, fn);
  });
  eh.extend(Array, 'any', function (fn) {
    return any(this, fn);
  });
  eh.extend(Array, 'contains', function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return contains.apply(void 0, [this].concat(args));
  });
  eh.extend(Array, 'objectify', function () {
    return objectify(this);
  });

  /*	this method has close relation with splits() function in @locustjs/extensions-string
  	examples:
  	joins([
  		["a", 1],
  		["b", "ali"]
  	], '&', '=')
  	
  	output: a=1&b=ali
  	
  	input:
  		[
  			[ ["a",1], ["b", "ali"] ],
  			[ ["a",2], ["b", "reza"], ["c", true] ],
  			[ ["a",3], ["b"], ["c", false] ],
  			[ ["b", "saeed"], ["c", true] ]
  		]
  	output: "a=1:b=ali&a=2:b=reza:c=true&a=3:b=:c=false&b=saeed:c=true"
  */

  eh.extend(Array, 'joins', function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return joins.apply(void 0, [this].concat(args));
  });
  eh.extend(Array, 'sortBy', function () {
    for (var _len5 = arguments.length, fns = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      fns[_key5] = arguments[_key5];
    }
    return sortBy.apply(void 0, [this].concat(fns));
  });
  eh.extend(Array, 'min', function (mapper) {
    return min(this, mapper);
  });
  eh.extend(Array, 'max', function (mapper) {
    return max(this, mapper);
  });
  eh.extend(Object, 'toObject', function (type, schema) {
    return toObject(this, type, schema);
  });
  /*	this method has close relation with toArray() function in @locustjs/extensions-object
  	examples:
  	exmaple 1: key-value
  	input:
  	[
  		["a", 1],
  		["b", "ali"]
  	]
  	output: { "a": 1, "b": "ali" }
  */
}
var _default = exports["default"] = configureArrayExtensions;
