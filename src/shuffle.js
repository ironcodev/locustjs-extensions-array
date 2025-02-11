import { throwIfNotArray } from "@locustjs/exception";

const shuffle = function (arr) {
  throwIfNotArray(arr, "arr");

  let currentIndex = arr.length,
    temp,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }

  return arr;
};

export default shuffle;
