import { contains } from "../src";

const tests = [
  [
    "contains: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      expect(contains(arr, "ali")).toBeTrue();
      expect(contains(arr, "Reza", "ali")).toBeTrue();
      expect(contains(arr, "Reza", "ali", "3")).toBeFalse();
    },
  ],
  [
    "contains: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed", "123", 456];

      expect(contains(arr, "ali")).toBeTrue();
      expect(contains(arr, "Reza", "ali")).toBeTrue();
      expect(contains(arr, "reza", "ali", 123)).toBeTrue();
      expect(contains(arr, "456", 123)).toBeTrue();
      expect(contains(arr, "456", 123, "jake")).toBeFalse();
      expect(contains(arr, 4567)).toBeFalse();
    },
  ],
];

export default tests;
