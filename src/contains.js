import { isPrimitive, equals } from "@locustjs/base";
import { throwIfNotArray } from "@locustjs/exception";

const contains = function (arr, ...values) {
  throwIfNotArray(arr, "arr");

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

export default contains;
