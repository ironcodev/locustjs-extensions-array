import { containsAny } from "../src";

const tests = [
  [
    "containsAny: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      expect(containsAny(arr, "ali")).toBeTrue();
      expect(containsAny(arr, "reza", "ali")).toBeTrue();
      expect(containsAny(arr, "hamid", "ali", "leila")).toBeTrue();
      expect(containsAny(arr, "hamid", "ramin", "leila")).toBeFalse();
    },
  ],
  [
    "containsAny: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed", "123", 456];

      expect(containsAny(arr, "ali")).toBeTrue();
      expect(containsAny(arr, "reza", "ali")).toBeTrue();
      expect(containsAny(arr, "456", 123)).toBeTrue();
      expect(containsAny(arr, 12, 20, "36")).toBeFalse();
    },
  ],
];

export default tests;
