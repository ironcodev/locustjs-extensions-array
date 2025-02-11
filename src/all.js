import { isFunction } from "@locustjs/base";
import { throwIfNotArray } from "@locustjs/exception";

const all = function (arr, fn) {
  throwIfNotArray(arr, "arr");

  if (!isFunction(fn)) {
    throw "no callback function is given or the argument is not a function";
  }

  let result = true;

  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) {
      result = false;
      break;
    }
  }

  return result;
};

export default all;
