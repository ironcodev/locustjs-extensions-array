import { isArray } from "@locustjs/base";
import { configureArrayExtensions } from "../src";

configureArrayExtensions("range");

const tests = [
  [
    "Array.range: 1",
    function (expect) {
      const arr = Array.range(10, 20);

      expect(isArray(arr)).toBeTrue();
      expect(arr.length).toBe(10);
      expect(arr[0]).toBe(10);
      expect(arr[9]).toBe(19);
    },
  ]
];

export default tests;
