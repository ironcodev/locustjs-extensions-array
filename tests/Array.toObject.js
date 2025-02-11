import { isObject } from "@locustjs/base";
import { configureArrayExtensions } from "../src";

configureArrayExtensions("toObject");

const tests = [
  [
    "Array.toObject: key/value",
    function (expect) {
      const keyValues = [
        ["name", "ali"],
        ["age", 23],
        [
          "address",
          [
            ["city", "Tehran"],
            ["code", "123"],
          ],
        ],
      ];
      const obj = keyValues.toObject("keyvalue");

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
  [
    "Array.toObject: schema",
    function (expect) {
      const schema = ["name", "age", ["address", ["city", "code"]]];
      const obj = schema.toObject("schema");

      expect(obj).toBeDefined();
      expect(obj.name).toBeUndefined();
      expect(obj.age).toBeUndefined();
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBeUndefined();
      expect(obj.address.code).toBeUndefined();
    },
  ],
  [
    "Array.toObject: values",
    function (expect) {
      const values = ["ali", 23, ["Tehran", "123"]];
      const schema = ["name", "age", ["address", ["city", "code"]]];
      const obj = values.toObject("values", schema);

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
  [
    "Array.toObject: key/value - no type",
    function (expect) {
      const keyValues = [
        ["name", "ali"],
        ["age", 23],
        [
          "address",
          [
            ["city", "Tehran"],
            ["code", "123"],
          ],
        ],
      ];
      const obj = keyValues.toObject();

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
  [
    "Array.toObject: schema - no type",
    function (expect) {
      const schema = ["name", "age", ["address", ["city", "code"]]];
      const obj = schema.toObject();

      expect(obj).toBeDefined();
      expect(obj.name).toBeUndefined();
      expect(obj.age).toBeUndefined();
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBeUndefined();
      expect(obj.address.code).toBeUndefined();
    },
  ],
  [
    "Array.toObject: values - no type",
    function (expect) {
      const values = ["ali", 23, ["Tehran", "123"]];
      const schema = ["name", "age", ["address", ["city", "code"]]];
      const obj = values.toObject(schema);

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
];

export default tests;
