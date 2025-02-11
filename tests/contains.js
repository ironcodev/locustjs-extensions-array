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
];

export default tests;
