import { configureArrayExtensions } from "../src";

configureArrayExtensions("any");

const tests = [
  [
    "Array.any: 1",
    function (expect) {
      const arr = [10, 15, 9, 14];
      const result = arr.any((x) => x % 2 == 0);

      expect(result).toBeTrue();
    },
  ],
  [
    "Array.any: 2",
    function (expect) {
      const arr = [10, 15, 19, 14];
      const result = arr.any((x) => x < 10);

      expect(result).toBeFalse();
    },
  ],
];

export default tests;
