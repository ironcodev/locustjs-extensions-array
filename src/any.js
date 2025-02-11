import { isFunction } from "@locustjs/base";
import { throwIfNotArray } from "@locustjs/exception";

const any = function (arr, fn) {
  throwIfNotArray(arr, "arr");

  if (!isFunction(fn)) {
    throw "no callback function is given or the argument is not a function";
  }

  let result = false;

  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      result = true;
      break;
    }
  }

  return result;
};

export default any;
