import { ValueNotBetweenException } from "@locustjs/exception";
import { removeAt } from "../src";

const tests = [
  [
    "removeAt: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      const x = removeAt(arr, 0);

      expect(arr.length).toBe(2);
      expect(x).toBe("Ali");
      expect(arr[0]).toBe("Reza");
    },
  ],
  [
    "removeAt: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      const x = removeAt(arr, 1);

      expect(arr.length).toBe(2);
      expect(x).toBe("Reza");
      expect(arr[1]).toBe("Saeed");
    },
  ],
  [
    "removeAt: 3",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      const x = removeAt(arr, 2);

      expect(arr.length).toBe(2);
      expect(x).toBe("Saeed");
    },
  ],
  [
    "removeAt: 4",
    function (expect) {
      expect(() => {
        const arr = ["Ali", "Reza", "Saeed"];

        removeAt(arr, -1);
      }).toThrow(ValueNotBetweenException);
    },
  ],
  [
    "removeAt: 5",
    function (expect) {
      expect(() => {
        const arr = ["Ali", "Reza", "Saeed"];

        removeAt(arr, 3);
      }).toThrow(ValueNotBetweenException);
    },
  ],
];

export default tests;
