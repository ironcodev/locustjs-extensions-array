import { configureArrayExtensions } from "../src";

configureArrayExtensions("min,max");

const tests = [
  [
    "Array.min: 1",
    function (expect) {
      const arr = [10, 15, 9, 14];
      const result = arr.min();

      expect(result).toBe(9);
    },
  ],
  [
    "Array.min: 2",
    function (expect) {
      const arr = [
        { id: 100, no: 10 },
        { id: 103, no: 8 },
        { id: 108, no: 15 },
        { id: 112, no: 11 },
        { id: 119, no: 17 },
        { id: 120, no: 12 },
      ];
      const result = arr.min((x) => x.no);

      expect(result).toBe(8);
    },
  ],
  [
    "Array.max: 1",
    function (expect) {
      const arr = [10, 15, 9, 14];
      const result = arr.max();

      expect(result).toBe(15);
    },
  ],
  [
    "Array.max: 2",
    function (expect) {
      const arr = [
        { id: 100, no: 10 },
        { id: 103, no: 8 },
        { id: 108, no: 15 },
        { id: 112, no: 11 },
        { id: 119, no: 17 },
        { id: 120, no: 12 },
      ];
      const result = arr.max((x) => x.no);

      expect(result).toBe(17);
    },
  ],
];

export default tests;
