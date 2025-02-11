import { throwIfNotArray } from "@locustjs/exception";

const sortBy = function (arr, ...fns) {
  throwIfNotArray(arr, "arr");

  if (fns.length == 0) {
    throw `please specify sortBy function`;
  }

  const sort_fn = function (a, b) {
    let result = 0;

    for (let fn of fns) {
      const fn_a = fn(a);
      const fn_b = fn(b);

      if (fn_a > fn_b) {
        result = 1;
        break;
      }

      if (fn_a < fn_b) {
        result = -1;
        break;
      }
    }

    return result;
  };

  return arr.sort(sort_fn);
};
export default sortBy;
