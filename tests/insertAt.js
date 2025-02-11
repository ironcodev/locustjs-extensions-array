import { insertAt } from "../src";

const tests = [
  [
    "insertAt: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      insertAt(arr, 0, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[0]).toBe("Nima");
      expect(arr[1]).toBe("Ali");
    },
  ],
  [
    "insertAt: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      insertAt(arr, 1, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[0]).toBe("Ali");
      expect(arr[1]).toBe("Nima");
      expect(arr[2]).toBe("Reza");
    },
  ],
  [
    "insertAt: 3",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      insertAt(arr, 2, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[2]).toBe("Nima");
      expect(arr[3]).toBe("Saeed");
    },
  ],
  [
    "insertAt: 4",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      insertAt(arr, 3, "Nima");

      expect(arr.length).toBe(4);
      expect(arr[2]).toBe("Saeed");
      expect(arr[3]).toBe("Nima");
    },
  ]
];

export default tests;
