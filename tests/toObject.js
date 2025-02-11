import { isObject } from "@locustjs/base";
import { toObject } from "../src";

const tests = [
  [
    "toObject: key/value",
    function (expect) {
      const obj = toObject(
        [
          ["name", "ali"],
          ["age", 23],
          [
            "address",
            [
              ["city", "Tehran"],
              ["code", "123"],
            ],
          ],
        ],
        "keyvalue"
      );

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
  [
    "toObject: schema",
    function (expect) {
      const schema = ["name", "age", ["address", ["city", "code"]]];
      const obj = toObject(schema, "schema");

      expect(obj).toBeDefined();
      expect(obj.name).toBeUndefined();
      expect(obj.age).toBeUndefined();
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBeUndefined();
      expect(obj.address.code).toBeUndefined();
    },
  ],
  [
    "toObject: values",
    function (expect) {
      const obj = toObject(["ali", 23, ["Tehran", "123"]], "values", [
        "name",
        "age",
        ["address", ["city", "code"]],
      ]);

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
  [
    "toObject: key/value - no type",
    function (expect) {
      const obj = toObject(
        [
          ["name", "ali"],
          ["age", 23],
          [
            "address",
            [
              ["city", "Tehran"],
              ["code", "123"],
            ],
          ],
        ]
      );

      expect(obj).toBeDefined();
      expect(obj.name).toBe("ali");
      expect(obj.age).toBe(23);
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBe("Tehran");
      expect(obj.address.code).toBe("123");
    },
  ],
  [
    "toObject: schema - no type",
    function (expect) {
      const schema = ["name", "age", ["address", ["city", "code"]]];
      const obj = toObject(schema);

      expect(obj).toBeDefined();
      expect(obj.name).toBeUndefined();
      expect(obj.age).toBeUndefined();
      expect(isObject(obj.address)).toBeTrue();
      expect(obj.address.city).toBeUndefined();
      expect(obj.address.code).toBeUndefined();
    },
  ],
  [
    "toObject: values - no type",
    function (expect) {
      const obj = toObject(["ali", 23, ["Tehran", "123"]], [
        "name",
        "age",
        ["address", ["city", "code"]],
      ]);

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
