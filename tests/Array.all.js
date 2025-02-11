import { configureArrayExtensions } from "../src";

configureArrayExtensions("all");

const tests = [
  [
    "Array.all: 1",
    function (expect) {
      const arr = [10, 15, 9, 14];
      const result = arr.all((x) => x % 2 == 0);

      expect(result).toBeFalse();
    },
  ],
  [
    "Array.all: 2",
    function (expect) {
      const arr = [10, 15, 19, 14];
      const result = arr.all((x) => x >= 10);

      expect(result).toBeTrue();
    },
  ],
];

export default tests;
