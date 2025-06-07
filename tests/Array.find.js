import { configureArrayExtensions } from "../src";
import { equals } from "@locustjs/base";

configureArrayExtensions({ include: "find", force: true });

const tests = [
  [
    "Array.find: 1",
    function (expect) {
      const arr = ["Red", "Green", "Blue", "Black", "White"];
      const ec = {
        equals: (x, y) => x.toLowerCase() == y.toLowerCase(),
      };
      const x = arr.find("red", ec);

      expect(x).toBeDefined();
      expect(x).toBe("Red");
    },
  ],
  [
    "Array.find: 2",
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
      const x = arr.find(value, ec);

      expect(x).toBeDefined();
      expect(x.id).toBe(2);
      expect(x.name).toBe("blue");
    },
  ],
];

export default tests;
