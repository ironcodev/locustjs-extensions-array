import { throwIfNotBetween } from "@locustjs/exception";
import { throwIfNotArray } from "@locustjs/exception";

const insertAt = function (arr, index, item) {
  throwIfNotArray(arr, "arr");
  throwIfNotBetween(index, 0, arr.length);
  
  return arr.splice(index, 0, item);
};

export default insertAt;
