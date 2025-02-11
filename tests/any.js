import { any } from "../src";

const tests = [
  [
    "any: 1",
    function (expect) {
      const arr = [10, 15, 9, 14]
      const result = any(arr, x => x % 2 == 0);

      expect(result).toBeTrue();
    },
  ],
  [
    "any: 2",
    function (expect) {
      const arr = [10, 15, 19, 14]
      const result = any(arr, x => x < 10);

      expect(result).toBeFalse();
    },
  ],
];

export default tests;
