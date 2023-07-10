import { isArray, isFunction, isPrimitive, equals } from '@locustjs/base';
import { merge } from '@locustjs/extensions-object';
const throwArrayExpectedException = x => {
  if (!isArray(x)) {
    throw `Array expected but received ${typeof x}.`;
  }
};
const shuffle = function (arr) {
  throwArrayExpectedException(arr);
  let currentIndex = arr.length,
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
const range = function (from, to) {
  from = parseInt(from);
  to = parseInt(to);
  let result = [];
  for (let i = from; i < to; i++) {
    result.push(i);
  }
  return result;
};
const insertAt = function (arr, index, item) {
  throwArrayExpectedException(arr);
  return arr.splice(index, 0, item);
};
const removeAt = function (arr, index) {
  throwArrayExpectedException(arr);
  return arr.splice(index, 1)[0];
};
const all = function (arr, fn) {
  throwArrayExpectedException(arr);
  if (!isFunction(fn)) {
    throw 'no callback function is given or the argument is not a function';
  }
  let result = true;
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result = false;
      break;
    }
  }
  return result;
};
const any = function (arr, fn) {
  throwArrayExpectedException(arr);
  if (!isFunction(fn)) {
    throw 'no function is given or the argument is not a function';
  }
  let result = false;
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result = true;
      break;
    }
  }
  return result;
};
function joins(arr, delimiters) {
  let result = [];
  for (let item of arr) {
    if (isArray(item)) {
      result.push(joins(item, delimiters.slice(1)));
    } else {
      result.push(item);
    }
  }
  return result.join(delimiters[0]);
}
const sortBy = function (arr, ...fns) {
  throwArrayExpectedException(arr);
  if (fns.length == 0) {
    throw `please specify sortBy function`;
  }
  const sort_fn = function (a, b) {
    let result = 0;
    for (let fn of fns) {
      const fn_a = fn(a);
      const fn_b = fn(b);
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
const contains = function (arr, ...values) {
  throwArrayExpectedException(arr);
  let result = [];
  for (let i = 0; i < values.length; i++) {
    if (isPrimitive(values[i])) {
      values[i] = values[i].toString().toLowerCase();
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (isPrimitive(arr[i])) {
      for (let j = 0; j < values.length; j++) {
        if (arr[i].toString().toLowerCase() == values[j]) {
          result.push(true);
        }
      }
    } else {
      for (let j = 0; j < values.length; j++) {
        if (equals(arr[i], values[j])) {
          result.push(true);
        }
      }
    }
  }
  return result.length == values.length;
};
const min = function (arr, mapper) {
  throwArrayExpectedException(arr);
  if (!isFunction(mapper)) {
    throw 'no mapping function is given or the argument is not a function';
  }
  let result = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const item = isFunction(mapper) ? mapper(arr[i]) : arr[i];
    if (item < result) {
      result = item;
    }
  }
  return result;
};
const max = function (arr, mapper) {
  throwArrayExpectedException(arr);
  if (!isFunction(mapper)) {
    throw 'no mapping function is given or the argument is not a function';
  }
  let result = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    const item = isFunction(mapper) ? mapper(arr[i]) : arr[i];
    if (item > result) {
      result = item;
    }
  }
  return result;
};
function toObjectKeyValue(arr) {
  let result = {};
  for (let item of arr) {
    if (isArray(item) && item.length == 2) {
      if (isArray(item[1])) {
        result[item[0]] = toObjectKeyValue(item[1]);
      } else {
        result[item[0]] = item[1];
      }
    }
  }
  return result;
}
function toObjectSchema(arr) {
  let result = {};
  for (let item of arr) {
    if (isArray(item)) {
      if (item.length == 2 && isArray(item[1])) {
        result[item[0]] = toObjectSchema(item[1]);
      }
    } else {
      result[item] = undefined;
    }
  }
  return result;
}
function toObjectValues(arr, schema) {
  let result = {};
  if (isArray(arr) && isArray(schema) && arr.length == schema.length) {
    for (let i = 0; i < schema.length; i++) {
      const key = schema[i];
      if (isArray(key)) {
        if (key.length == 2 && isArray(key[1])) {
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
  let result;
  if (isArray(arr)) {
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
const objectify = arr => toObject(arr, 'key-value');
function configureArrayExtensions(options) {
  const eh = new ExtensionHelper(options, console);
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
  eh.extend(Array, 'contains', function (...args) {
    return contains(this, ...args);
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

  eh.extend(Array, 'joins', function (...args) {
    return joins(this, ...args);
  });
  eh.extend(Array, 'sortBy', function (...fns) {
    return sortBy(this, ...fns);
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

export default configureArrayExtensions;
export { shuffle, range, insertAt, removeAt, all, any, objectify, joins, sortBy, contains, min, max, toObject };
