import test11 from "./all";
import test12 from "./Array.all";
import test21 from "./any";
import test22 from "./Array.any";
import test31 from "./contains";
import test32 from "./Array.contains";
import test41 from "./insertAt";
import test42 from "./Array.insertAt";
import test51 from "./min-max";
import test52 from "./Array.min-max";
import test61 from "./removeAt";
import test62 from "./Array.removeAt";
import test71 from "./range";
import test72 from "./Array.range";
import test81 from "./sortBy";
import test82 from "./Array.sortBy";
import test91 from "./toObject";
import test92 from "./Array.toObject";
import test101 from "./containsAny";
import test102 from "./Array.containsAny";
import test111 from "./Array.find";
import test121 from "./Array.findIndex";
import { TestRunner } from "@locustjs/test";

const tests = [
  ...test11,
  ...test12,
  ...test21,
  ...test22,
  ...test31,
  ...test32,
  ...test41,
  ...test42,
  ...test51,
  ...test52,
  ...test61,
  ...test62,
  ...test71,
  ...test72,
  ...test81,
  ...test82,
  ...test91,
  ...test92,
  ...test101,
  ...test102,
  ...test111,
  ...test121
];

TestRunner.start(tests, true);
