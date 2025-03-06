import { configureArrayExtensions } from "../src";

configureArrayExtensions("containsAny");

const tests = [
  [
    "Array.containsAny: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      expect(arr.containsAny("ali")).toBeTrue();
      expect(arr.containsAny("reza", "ali")).toBeTrue();
      expect(arr.containsAny("hamid", "ali", "leila")).toBeTrue();
      expect(arr.containsAny("hamid", "ramin", "leila")).toBeFalse();
    },
  ],
  [
    "Array.containsAny: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed", "123", 456];

      expect(arr.containsAny("ali")).toBeTrue();
      expect(arr.containsAny("reza", "ali")).toBeTrue();
      expect(arr.containsAny("456", 123)).toBeTrue();
      expect(arr.containsAny(12, 20, "36")).toBeFalse();
    },
  ],
];

export default tests;
