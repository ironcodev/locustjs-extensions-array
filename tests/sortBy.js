import { isArray } from "@locustjs/base";
import { sortBy } from "../src";

const tests = [
  [
    "sortBy: 1",
    function (expect) {
      const arr = [
        { id: 100, no: 10 },
        { id: 103, no: 8 },
        { id: 108, no: 15 },
        { id: 112, no: 11 },
        { id: 119, no: 17 },
        { id: 120, no: 12 },
      ];
      const result = sortBy(arr, (x) => x.no);

      expect(isArray(result)).toBeTrue();
      expect(result.length).toBe(arr.length);
      expect(result[0].no).toBe(8);
      expect(result[result.length - 1].no).toBe(17);
    },
  ],
  [
    "sortBy: 2",
    function (expect) {
      const arr = [
        { id: 103, no: 10 },
        { id: 112, no: 15 },
        { id: 100, no: 10 },
        { id: 120, no: 12 },
        { id: 119, no: 12 },
        { id: 108, no: 15 },
      ];
      const result = sortBy(
        arr,
        (x) => x.no,
        (x) => x.id
      );

      expect(isArray(result)).toBeTrue();
      expect(result.length).toBe(arr.length);
      expect(result[0].no).toBe(10);
      expect(result[0].id).toBe(100);
      expect(result[result.length - 1].no).toBe(15);
      expect(result[result.length - 1].id).toBe(112);
    },
  ],
];

export default tests;
