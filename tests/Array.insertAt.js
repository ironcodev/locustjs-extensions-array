import { configureArrayExtensions } from "../src";

configureArrayExtensions("insertAt");

const tests = [
  [
    "Array.insertAt: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      arr.insertAt(0, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[0]).toBe("Nima");
      expect(arr[1]).toBe("Ali");
    },
  ],
  [
    "Array.insertAt: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      arr.insertAt(1, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[0]).toBe("Ali");
      expect(arr[1]).toBe("Nima");
      expect(arr[2]).toBe("Reza");
    },
  ],
  [
    "Array.insertAt: 3",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      arr.insertAt(2, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[2]).toBe("Nima");
      expect(arr[3]).toBe("Saeed");
    },
  ],
  [
    "Array.insertAt: 4",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      arr.insertAt(3, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[2]).toBe("Saeed");
      expect(arr[3]).toBe("Nima");
    },
  ],
];

export default tests;
