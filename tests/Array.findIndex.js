import { configureArrayExtensions } from "../src";
import { equals } from "@locustjs/base";

configureArrayExtensions({ include: "findIndex", force: true });

const tests = [
  [
    "Array.findIndex: 1",
    function (expect) {
      const arr = ["Red", "Green", "Blue", "Black", "White"];
      const ec = {
        equals: (x, y) => x.toLowerCase() == y.toLowerCase(),
      };
      const x = arr.findIndex("red", ec);
      const y = arr.findIndex("GREEN", ec);
      const z = arr.findIndex("Orange", ec);

      expect(x).toBe(0);
      expect(y).toBe(1);
      expect(z).toBe(-1);
    },
  ],
  [
    "Array.findIndex: 2",
    function (expect) {
      const arr = [
        { id: 1, name: "red" },
        { id: 2, name: "blue" },
        { id: 3, name: "green" },
      ];
      const value = { id: "2", name: "blue" };
      const ec = {
        equals,
      };
      const x = arr.findIndex(value, ec);

      expect(x).toBe(1);
    },
  ],
];

export default tests;
