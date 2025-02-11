# About
This library contains extensions for Array.

## Current Version
```
2.2.0
```

# Install
```
npm i @locustjs/extensions-array
```

# Usage

CommonJs
```javascript
var someFn = require('@locustjs/extensions-array').someFn;
```

ES6
```javascript
import { someFn } from '@locustjs/extensions-array'
```

# Functions
- `shuffle`
- `range`
- `insertAt`
- `removeAt`
- `all`
- `any`
- `objectify`
- `joins`
- `sortBy`
- `contains`
- `min`
- `max`
- `toObject`

## shuffle(array)
Shuffles items of an array.

```javascript
import { shuffle } from '@locustjs/extensions-array'

const source = [10, 23, 14, 9, 31];
const shuffled = shuffle(source);

console.log(shuffled);  // e.g.: 14, 10, 31, 23, 9
```

## range(from, to)
Generates an array of integer numbers starting from 'from' and ending at 'to - 1'.

```javascript
import { range } from '@locustjs/extensions-array'

const arr = range(5, 10);

console.log(arr);  // 5, 6, 7, 8, 9
```

## insertAt(array, index, item)
Inserts given item at the specified index into an array.

```javascript
import { insertAt } from '@locustjs/extensions-array'

const arr = ['red', 'green'];

insertAt(arr, 1, 'blue');

console.log(arr);  // 'red', 'blue', 'green'
```

## removeAt(array, index)
Removes item of the specified index from an array.

```javascript
import { removeAt } from '@locustjs/extensions-array'

const arr = ['red', 'green', 'blue'];

removeAt(arr, 1);

console.log(arr);  // 'red', 'blue'
```

## all(array, fn)
Iterates over an array and checks whether all items conform to a condition by calling a given function on each item.

```javascript
import { all } from '@locustjs/extensions-array'

const arr = [10, 20, 30, 40];

console.log(all(arr, x => x % 2 == 0));  // true
console.log(all(arr, x => x < 40));  // false
```

Signature of the `fn` callback is:

```javascript
fn(value, index, array)
```

## any(array, fn)
Iterates over an array and checks if at least one item conforms to a condition by calling given function on each item.

```javascript
import { any } from '@locustjs/extensions-array'

const arr = [10, 20, 30, 40];

console.log(any(arr, x => x % 2 == 0));  // true
console.log(all(arr, x => x > 40));  // false
```

Signature of the `fn` callback is:

```javascript
fn(value, index, array)
```

## objectify(array)
Converts an array into an object.

```
  input:
  [
    ["a", 1],
    ["b", "ali"]
  ]
  output: { "a": 1, "b": "ali" }

  input:
    [
      [ ["a",1],["b", "ali"] ],
      [ ["a",2],["b", "reza"],["c", true] ],
      [ ["a",3],["b"],["c", false] ],
      [ ["b", "saeed"],["c", true] ]
    ]
  output:
    [
      { "a": 1, "b": "ali" },
      { "a": 2, "b": "reza" , "c": true },
      { "a": 3, "b": null, "c": false },
      { "b": "saeed", "c": true}
    ]
```

## sortBy(array, ...fns)
Sorts an array of objects based on different properties in those objects.

```javascript
import { sortBy } from '@locustjs/extensions-array'

var arr = [
	{code: 10, parent: 1, name: 'item 1' },
	{code: 8 , parent: 2, name: 'item 2' },
	{code: 19, parent: 1, name: 'item 3' },
	{code: 3 , parent: 1, name: 'item 4' },
	{code: 5 , parent: 3, name: 'item 5' },
	{code: 11, parent: 1, name: 'item 6' },
	{code: 21, parent: 2, name: 'item 7' },
	{code: 4 , parent: 3, name: 'item 8' },
	{code: 17, parent: 2, name: 'item 9' },
	{code: 9 , parent: 1, name: 'item 10'},
	{code: 15, parent: 2, name: 'item 11'},
	{code: 16, parent: 1, name: 'item 12'}
];

var arr2 = sortBy([...arr], x => x.parent, x => x.code);

for (let item of arr2) {
	console.log(item);
}
```

## contains(array, ...values)
Checks whether given array contains given elements.

```javascript
import { contains } from '@locustjs/extensions-array'

var arr = [ 10, 14, 23, 9, 5, 34, 30, 18 ];

console.log(contains(arr, 23));   // true
console.log(contains(arr, 23, 30));   // true
console.log(contains(arr, 23, 30, 400));   // false
```


## toObject(arr, type, schema?)
This method carries out reverse of `toArray()` method in `@locustjs/extensions-object` library. It converts an array to an object. The result depends on `type` which specifies what type of data the array contains. Possible values are:

- `key-value`: it means that `arr` contains both `keys` and `values` (object's prop names and prop values). Each entry in the array is in turn two-elemented array (key and value), the first is the key (prop name) and the second is the value.
- `values`: it means that `arr` only contains values (each element is the real value of a prop) and no prop names are already embeded in `arr`. Since, no keys are existed in `arr`, passing `schema` parameter is mandatory, so that `toObject()` knows how it shold construct the object. `schema` can be generated using `toArray()` extension method from `@locustjs/extensions-object` with `keys` or `schema` argument.
- `keys` or `schema`: it means that `arr` is in fact an schema i.e. it contains only prop names and no values are in it. This time, `toObject()` constructs an object whose properties are all `undefined`.

Example 1: passing an array containing prop names/values
```javascript
const arr = [
	["name", "John"],
	[
		"address",
		[
			[
				"city",
				[
					["id", 10],
					["name", "Tehran"]
				]
			],
			["zip", "12345678"]
		]
	],
	["age", 23]
];

const x = toObject(arr, `key-value`); // or arr.toObject(`key-value`) as an extension method
console.log(x);
/*
{
    name: 'John',
    address: {
        city: { id: 10, name: 'Tehran' },
        zip: '12345678'
    },
    age: 23
}
*/
```

Example 2: passing an array containing values only
```javascript
const values = [
    "John",
    [
      [10, "Tehran"],
      "123456789"
    ],
    23
];
const schema = ["name",["address",["id", "name"]],"age"]; // or x.toArray('schema')

const x = toObject(values, 'values', schema); // or values.toObject('values', schema) as an extension method
console.log(x);
/*
{
    name: 'John',
    address: {
        city: { id: 10, name: 'Tehran' },
        zip: '12345678'
    },
    age: 23
}
*/
```

Example 3: passing an array containing prop names only
```javascript
const x = toObject(schema, 'schema'); // or schema.toObject('schema') as an extension method
console.log(x);
/*
{
    name: undefined,
    address: {
        city: { id: undefined, name: undefined },
        zip: undefined
    },
    age: undefined
}
*/
```

It is possible not to specify `type` parameter. In this case, `toObject()` determines `type` based on the structure of the input array.

Example 4: not specifying `type`

```javascript
const arr = [
	["name", "John"],
	[
		"address",
		[
			[
				"city",
				[
					["id", 10],
					["name", "Tehran"]
				]
			],
			["zip", "12345678"]
		]
	],
	["age", 23]
];

const x = arr.toObject();

console.log(x);
```

There is a catch though. If the array contains only values and all of the values are string, `toObject` assumes it to be a schema. In this case, it is necessary to specying `type`.

`toObject()` carries out reverse of `toArray()` extension method from [`@locustjs/extensions-object`](https://github.com/ironcodev/locustjs-extensions-object).

**Note:** `toArray() / toObject()` are similar to `Object.entries() / Object.fromEntries()`. The difference and the benefit is that they perform recursively and produce a more condensced data, whereas `Object.entres()/fromEntries()` do not act recursively (they operate only on the first level).