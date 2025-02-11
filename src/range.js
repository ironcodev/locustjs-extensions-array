import { throwIfNotInt } from "@locustjs/exception";

const range = function (from, to) {
  throwIfNotInt(from, "from");
  throwIfNotInt(to, "to");

  from = parseInt(from);
  to = parseInt(to);

  let result = [];

  for (let i = from; i < to; i++) {
    result.push(i);
  }

  return result;
};

export default range;
