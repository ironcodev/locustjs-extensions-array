import { min, max } from "../src";

const tests = [
  [
    "min: 1",
    function (expect) {
      const arr = [10, 15, 9, 14]
      const result = min(arr);

      expect(result).toBe(9);
    },
  ],
  [
    "min: 2",
    function (expect) {
      const arr = [
        { id: 100, no: 10 },
        { id: 103, no: 8 },
        { id: 108, no: 15 },
        { id: 112, no: 11 },
        { id: 119, no: 17 },
        { id: 120, no: 12 },
      ]
      const result = min(arr, x => x.no);

      expect(result).toBe(8);
    },
  ],
  [
    "max: 1",
    function (expect) {
      const arr = [10, 15, 9, 14]
      const result = max(arr);

      expect(result).toBe(15);
    },
  ],
  [
    "max: 2",
    function (expect) {
      const arr = [
        { id: 100, no: 10 },
        { id: 103, no: 8 },
        { id: 108, no: 15 },
        { id: 112, no: 11 },
        { id: 119, no: 17 },
        { id: 120, no: 12 },
      ]
      const result = max(arr, x => x.no);

      expect(result).toBe(17);
    },
  ]
];

export default tests;
