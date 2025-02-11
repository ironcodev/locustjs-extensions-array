import ExtensionHelper from "@locustjs/extensions-options";
import all from "./all";
import any from "./any";
import contains from "./contains";
import insertAt from "./insertAt";
import joins from "./joins";
import max from "./max";
import min from "./min";
import range from "./range";
import removeAt from "./removeAt";
import shuffle from "./shuffle";
import sortBy from "./sortBy";
import toObject from "./toObject";

const isEqualityComparer = (x) => isObject(x) && isFunction(x.equals);
const objectify = (arr) => toObject(arr, "key-value");

function configureArrayExtensions(options, logger) {
  const eh = new ExtensionHelper(options, logger);

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

  eh.extend(Array, "contains", function (...args) {
    return contains(this, ...args);
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

  eh.extend(Array, "joins", function (...args) {
    return joins(this, ...args);
  });

  eh.extend(Array, "sortBy", function (...fns) {
    return sortBy(this, ...fns);
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
  const _array_find = Array.prototype.find;

  eh.extend(Array, "find", function (arg, thisArg) {
    if (isFunction(arg)) {
      return _array_find.call(this, arg, thisArg);
    }

    return _array_find(
      (x) => (isEqualityComparer(thisArg) ? thisArg.equals(x, arg) : x == arg),
      thisArg
    );
  });
  
  const _array_findIndex = Array.prototype.findIndex;

  eh.extend(Array, "findIndex", function (arg, thisArg) {
    if (isFunction(arg)) {
      return _array_findIndex.call(this, arg, thisArg);
    }

    return _array_findIndex(
      (x) => (isEqualityComparer(thisArg) ? thisArg.equals(x, arg) : x == arg),
      thisArg
    );
  });
}

export {
  configureArrayExtensions,
  shuffle,
  range,
  insertAt,
  removeAt,
  all,
  any,
  objectify,
  joins,
  sortBy,
  contains,
  min,
  max,
  toObject,
};
