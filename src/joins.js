import { isArray } from "@locustjs/base";

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

export default joins;
