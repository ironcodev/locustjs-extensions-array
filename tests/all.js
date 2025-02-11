import { all } from "../src";

const tests = [
  [
    "all: 1",
    function (expect) {
      const arr = [10, 15, 9, 14]
      const result = all(arr, x => x % 2 == 0);

      expect(result).toBeFalse();
    },
  ],
  [
    "all: 2",
    function (expect) {
      const arr = [10, 15, 19, 14]
      const result = all(arr, x => x >= 10);

      expect(result).toBeTrue();
    },
  ],
];

export default tests;
