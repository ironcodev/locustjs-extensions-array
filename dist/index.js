'use strict';

var ExtensionHelper = require('@locustjs/extensions-options');
var base = require('@locustjs/base');
var exception = require('@locustjs/exception');

var all = function all(arr, fn) {
  exception.throwIfNotArray(arr, "arr");
  if (!base.isFunction(fn)) {
    throw "no callback function is given or the argument is not a function";
  }
  var result = true;
  for (var i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) {
      result = false;
      break;
    }
  }
  return result;
};

var any = function any(arr, fn) {
  exception.throwIfNotArray(arr, "arr");
  if (!base.isFunction(fn)) {
    throw "no callback function is given or the argument is not a function";
  }
  var result = false;
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      result = true;
      break;
    }
  }
  return result;
};

var contains = function contains(arr) {
  exception.throwIfNotArray(arr, "arr");
  var result = [];
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  for (var i = 0; i < values.length; i++) {
    if (base.isPrimitive(values[i])) {
      values[i] = values[i].toString().toLowerCase();
    }
  }
  for (var _i = 0; _i < arr.length; _i++) {
    if (base.isPrimitive(arr[_i])) {
      for (var j = 0; j < values.length; j++) {
        if (arr[_i].toString().toLowerCase() == values[j]) {
          result.push(true);
        }
      }
    } else {
      for (var _j = 0; _j < values.length; _j++) {
        if (base.equals(arr[_i], values[_j])) {
          result.push(true);
        }
      }
    }
  }
  return result.length == values.length;
};

var insertAt = function insertAt(arr, index, item) {
  exception.throwIfNotArray(arr, "arr");
  exception.throwIfNotBetween(index, 0, arr.length);
  return arr.splice(index, 0, item);
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
  }
}

function joins(arr, delimiters) {
  var result = [];
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (base.isArray(item)) {
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

var max = function max(arr, mapper) {
  exception.throwIfNotArray(arr, "arr");
  if (!base.isNullOrUndefined(mapper) && !base.isFunction(mapper)) {
    throw "the argument is not a mapping function";
  }
  var result = -Infinity;
  var isFunc = base.isFunction(mapper);
  for (var i = 0; i < arr.length; i++) {
    var item = isFunc ? mapper(arr[i], i, arr) : arr[i];
    if (item > result) {
      result = item;
    }
  }
  return result;
};

var min = function min(arr, mapper) {
  exception.throwIfNotArray(arr, "arr");
  if (!base.isNullOrUndefined(mapper) && !base.isFunction(mapper)) {
    throw "the argument is not a mapping function";
  }
  var result = Infinity;
  var isFunc = base.isFunction(mapper);
  for (var i = 0; i < arr.length; i++) {
    var item = isFunc ? mapper(arr[i], i, arr) : arr[i];
    if (item < result) {
      result = item;
    }
  }
  return result;
};

var range = function range(from, to) {
  exception.throwIfNotInt(from, "from");
  exception.throwIfNotInt(to, "to");
  from = parseInt(from);
  to = parseInt(to);
  var result = [];
  for (var i = from; i < to; i++) {
    result.push(i);
  }
  return result;
};

var removeAt = function removeAt(arr, index) {
  exception.throwIfNotArray(arr, "arr");
  exception.throwIfNotBetween(index, 0, arr.length - 1);
  return arr.splice(index, 1)[0];
};

var shuffle = function shuffle(arr) {
  exception.throwIfNotArray(arr, "arr");
  var currentIndex = arr.length,
    temp,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};

var sortBy = function sortBy(arr) {
  for (var _len = arguments.length, fns = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }
  exception.throwIfNotArray(arr, "arr");
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

function toObjectKeyValue(arr) {
  var result = {};
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (base.isArray(item) && item.length == 2) {
        if (base.isArray(item[1])) {
          result[item[0]] = toObjectKeyValue(item[1]);
        } else {
          result[item[0]] = item[1];
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
function toObjectSchema(arr) {
  var result = {};
  var _iterator2 = _createForOfIteratorHelper(arr),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      if (base.isArray(item)) {
        if (item.length == 2 && base.isArray(item[1])) {
          result[item[0]] = toObjectSchema(item[1]);
        }
      } else {
        result[item] = undefined;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return result;
}
function toObjectValues(arr, schema) {
  var result = {};
  if (base.isArray(arr) && base.isArray(schema) && arr.length == schema.length) {
    for (var i = 0; i < schema.length; i++) {
      var key = schema[i];
      if (base.isArray(key)) {
        if (key.length == 2 && base.isArray(key[1])) {
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
  if (base.isArray(arr)) {
    if (arr.length == 1) {
      result = arr[0];
    } else {
      switch (type) {
        case "keyvalue":
        case "key/value":
        case "key-value":
          result = toObjectKeyValue(arr);
          break;
        case "values":
          result = toObjectValues(arr, schema);
          break;
        case "keys":
        case "schema":
          result = toObjectSchema(arr);
          break;
      }
    }
  }
  return result;
}

var isEqualityComparer = function isEqualityComparer(x) {
  return isObject(x) && isFunction(x.equals);
};
var objectify = function objectify(arr) {
  return toObject(arr, "key-value");
};
function configureArrayExtensions(options, logger) {
  var eh = new ExtensionHelper(options, logger);
  eh.extend(Array, "clone", function () {
    return this.slice(0);
  });

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  eh.extend(Array, "shuffle", function () {
    return shuffle(this);
  });
  eh.extend(Array, "insertAt", function (index, item) {
    return insertAt(this, index, item);
  });
  eh.extend(Array, "removeAt", function (index) {
    return removeAt(this, index);
  });
  eh.extend(Array, "range", range, true);
  eh.extend(Array, "all", function (fn) {
    return all(this, fn);
  });
  eh.extend(Array, "any", function (fn) {
    return any(this, fn);
  });
  eh.extend(Array, "contains", function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return contains.apply(undefined, [this].concat(args));
  });
  eh.extend(Array, "objectify", function () {
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

  eh.extend(Array, "joins", function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return joins.apply(undefined, [this].concat(args));
  });
  eh.extend(Array, "sortBy", function () {
    for (var _len3 = arguments.length, fns = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      fns[_key3] = arguments[_key3];
    }
    return sortBy.apply(undefined, [this].concat(fns));
  });
  eh.extend(Array, "min", function (mapper) {
    return min(this, mapper);
  });
  eh.extend(Array, "max", function (mapper) {
    return max(this, mapper);
  });
  eh.extend(Object, "toObject", function (type, schema) {
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
  var _array_find = Array.prototype.find;
  eh.extend(Array, "find", function (arg, thisArg) {
    if (isFunction(arg)) {
      return _array_find.call(this, arg, thisArg);
    }
    return _array_find(function (x) {
      return isEqualityComparer(thisArg) ? thisArg.equals(x, arg) : x == arg;
    }, thisArg);
  });
  var _array_findIndex = Array.prototype.findIndex;
  eh.extend(Array, "findIndex", function (arg, thisArg) {
    if (isFunction(arg)) {
      return _array_findIndex.call(this, arg, thisArg);
    }
    return _array_findIndex(function (x) {
      return isEqualityComparer(thisArg) ? thisArg.equals(x, arg) : x == arg;
    }, thisArg);
  });
}

exports.all = all;
exports.any = any;
exports.configureArrayExtensions = configureArrayExtensions;
exports.contains = contains;
exports.insertAt = insertAt;
exports.joins = joins;
exports.max = max;
exports.min = min;
exports.objectify = objectify;
exports.range = range;
exports.removeAt = removeAt;
exports.shuffle = shuffle;
exports.sortBy = sortBy;
exports.toObject = toObject;
