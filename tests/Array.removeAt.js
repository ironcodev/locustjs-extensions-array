import { ValueNotBetweenException } from "@locustjs/exception";
import { configureArrayExtensions } from "../src";

configureArrayExtensions("removeAt");

const tests = [
  [
    "Array.removeAt: 1",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      const x = arr.removeAt(0);

      expect(arr.length).toBe(2);
      expect(x).toBe("Ali");
      expect(arr[0]).toBe("Reza");
    },
  ],
  [
    "Array.removeAt: 2",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      const x = arr.removeAt(1);

      expect(arr.length).toBe(2);
      expect(x).toBe("Reza");
      expect(arr[1]).toBe("Saeed");
    },
  ],
  [
    "Array.removeAt: 3",
    function (expect) {
      const arr = ["Ali", "Reza", "Saeed"];

      const x = arr.removeAt(2);

      expect(arr.length).toBe(2);
      expect(x).toBe("Saeed");
    },
  ],
  [
    "Array.removeAt: 4",
    function (expect) {
      expect(() => {
        const arr = ["Ali", "Reza", "Saeed"];

        arr.removeAt(-1);
      }).toThrow(ValueNotBetweenException);
    },
  ],
  [
    "Array.removeAt: 5",
    function (expect) {
      expect(() => {
        const arr = ["Ali", "Reza", "Saeed"];

        arr.removeAt(3);
      }).toThrow(ValueNotBetweenException);
    },
  ],
];

export default tests;
