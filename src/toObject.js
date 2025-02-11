import { isArray, isEmpty, isNullOrUndefined, isString } from "@locustjs/base";

function toObjectKeyValue(arr) {
  let result = {};

  for (let item of arr) {
    if (isArray(item) && item.length == 2) {
      if (isArray(item[1])) {
        result[item[0]] = toObjectKeyValue(item[1]);
      } else {
        result[item[0]] = item[1];
      }
    }
  }

  return result;
}

function toObjectSchema(arr) {
  let result = {};

  for (let item of arr) {
    if (isArray(item)) {
      if (item.length == 2 && isArray(item[1])) {
        result[item[0]] = toObjectSchema(item[1]);
      }
    } else {
      result[item] = undefined;
    }
  }

  return result;
}

function toObjectValues(arr, schema) {
  let result = {};

  if (isArray(arr) && isArray(schema) && arr.length == schema.length) {
    for (let i = 0; i < schema.length; i++) {
      const key = schema[i];

      if (isArray(key)) {
        if (key.length == 2 && isArray(key[1])) {
          result[key[0]] = toObjectValues(arr[i], key[1]);
        }
      } else {
        result[key] = arr[i];
      }
    }
  }

  return result;
}

function toObject(arr, type, schema) {
  let result;

  if (isArray(arr)) {
    if (arr.length == 1) {
      result = arr[0];
    } else {
      if (isArray(type) && isNullOrUndefined(schema)) {
        schema = type;
        type = "values";
      }

      if (isEmpty(type)) {
        if (
          arr.length == arr.filter(isArray).length &&
          arr.length == arr.filter((x) => x.length == 2).length
        ) {
          type = "keyvalue";
        } else if (
          arr.length == arr.filter((x) => isString(x) || isArray(x)).length
        ) {
          type = "schema";
        } else {
          type = "values";
        }
      }

      switch (type) {
        case "keyvalue":
        case "key/value":
        case "key-value":
          result = toObjectKeyValue(arr);

          break;
        case "values":
          result = toObjectValues(arr, schema);

          break;
        case "keys":
        case "schema":
          result = toObjectSchema(arr);

          break;
      }
    }
  }

  return result;
}

export default toObject;
