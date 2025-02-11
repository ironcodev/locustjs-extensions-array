import { configureArrayExtensions } from "../src";

configureArrayExtensions("contains");

const tests = [
  [
    "Array.contains: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      expect(arr.contains("ali")).toBeTrue();
      expect(arr.contains("Reza", "ali")).toBeTrue();
      expect(arr.contains("Reza", "ali", "3")).toBeFalse();
    },
  ],
];

export default tests;
