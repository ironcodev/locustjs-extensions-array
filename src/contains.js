import { throwIfNotArray } from "@locustjs/exception";
import { isEqualityComparer, DefaultEqualityComparer } from "@locustjs/base";

const contains = function (arr, ...values) {
  throwIfNotArray(arr, "arr");

  const lastValue = values.length ? values[values.length - 1] : null;

  let equalityComparer = isEqualityComparer(lastValue)
    ? lastValue
    : DefaultEqualityComparer;
  let result = true;

  for (let i = 0; i < values.length; i++) {
    if (arr.findIndex((x) => equalityComparer.equals(x, values[i])) < 0) {
      result = false;
      break;
    }
  }

  return result;
};

export default contains;
