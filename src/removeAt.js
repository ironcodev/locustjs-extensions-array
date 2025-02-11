import { throwIfNotArray, throwIfNotBetween } from "@locustjs/exception";

const removeAt = function (arr, index) {
  throwIfNotArray(arr, "arr");
  throwIfNotBetween(index, 0, arr.length - 1);
  
  return arr.splice(index, 1)[0];
};

export default removeAt;
