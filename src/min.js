import { isFunction, isNullOrUndefined } from "@locustjs/base";
import { throwIfNotArray } from "@locustjs/exception";

const min = function (arr, mapper) {
  throwIfNotArray(arr, "arr");

  if (!isNullOrUndefined(mapper) && !isFunction(mapper)) {
    throw "the argument is not a mapping function";
  }

  let result = Infinity;

  const isFunc = isFunction(mapper);

  for (let i = 0; i < arr.length; i++) {
    const item = isFunc ? mapper(arr[i], i, arr) : arr[i];

    if (item < result) {
      result = item;
    }
  }

  return result;
};

export default min;
