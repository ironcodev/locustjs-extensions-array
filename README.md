# About
This library contains extensions for Array.

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
## shuffle(array)
Shuffles items of an array.

```javascript
import { shuffle } from 'locustjs-extensions-array'

const source = [10, 23, 14, 9, 31];
const shuffled = shuffle(source);

console.log(shuffled);  // e.g.: 14, 10, 31, 23, 9
```

## range(from, to)
Generates an array of integer numbers starting from 'from' and ending at 'to - 1'.

```javascript
import { range } from 'locustjs-extensions-array'

const arr = range(5, 10);

console.log(arr);  // 5, 6, 7, 8, 9
```

## insertAt(array, index, item)
Inserts given item at the specified index into an array.

```javascript
import { insertAt } from 'locustjs-extensions-array'

const arr = ['red', 'green'];
insertAt(arr, 1, 'blue');

console.log(arr);  // 'red', 'blue', 'green'
```

## removeAt(array, index)
Removes item of the specified index from an array.

```javascript
import { removeAt } from 'locustjs-extensions-array'

const arr = ['red', 'green', 'blue'];
removeAt(arr, 1);

console.log(arr);  // 'red', 'blue'
```

## all(array, fn)
Iterates over an array and checks whether all items conform to a condition by calling a given function on each item.

```javascript
import { all } from 'locustjs-extensions-array'

const arr = [10, 20, 30, 40];

console.log(all(arr, x => x % 2 == 0));  // true
console.log(all(arr, x => x < 40));  // false
```

## any(array, fn)
Iterates over an array and checks if at least one item conforms to a condition by calling given function on each item.

```javascript
import { any } from 'locustjs-extensions-array'

const arr = [10, 20, 30, 40];

console.log(any(arr, x => x % 2 == 0));  // true
console.log(all(arr, x => x > 40));  // false
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
import { sortBy } from 'locustjs-extensions-array'

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
import { contains } from 'locustjs-extensions-array'

var arr = [ 10, 14, 23, 9, 5, 34, 30, 18 ];

console.log(contains(arr, 23));   // true
console.log(contains(arr, 23, 30));   // true
console.log(contains(arr, 23, 30, 400));   // false
```


## `toObject(arr, type, schema?)`
This method carries out reverse of `toArray`. It converts an array to an object. The result depends on `type`. Possible values are as follows:

- `key-value`: converts an array of key/value items into an object, where each key/value is an array with 2 items, the first item is key, the second is value.
- `values`: converts an array of values into an object. `schema` parameter is obligatory in this type. `schema` can be generated using `toArray` with `keys` or `schema` value.
- `keys` or `schema`: converts an array into an object whose properties are all `undefined`.

`toObject` is similar to `Object.fromEntries()`. It performs a recursive/nested invokation on array items.

Example:
```javascript
let arr, x;

arr = [
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

// ==== type: key-value =====
// call directly
x = toObject(arr, `key-value`);
console.log(x);
// as an extension method
x = arr.toObject(`key-value`);
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

// ==== type: values =====

arr = [
    "ali",
	[
        [10, "Tehran"],
		"123456789"
	],
	23
];
const schema = x.toArray('schema');

// call directly
x = toObject(arr, 'values', schema);
console.log(x);
// as an extension method
x = arr.toObject('values', schema);
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

// ==== type: schema =====
// call directly
x = toObject(arr, 'schema');
console.log(x);
// as an extension method
x = arr.toObject('schema');
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

This function carries out reverse of `toArray()` extension method in [`@locustjs/extensions-object`](https://github.com/ironcodev/locustjs-extensions-object).
