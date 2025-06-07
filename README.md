# About
This library contains helpful extensions for arrays. They can be configured as extensions as well to work without being imported or invoked directly on arrays.

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

## Current Version
```
2.4.2
```

# Configuring as extension methods
Using `configureArrayExtensions()` function, we can configure any of the above functions as an extension method on any array instance.

```javascript
import { configureArrayExtensions } from "@locustjs/extensions-array";

configureArrayExtensions("sortBy,min,max");	// only configure 'sortBy', 'min' and 'max'
```

Configuring array extensions should normally happen at the start of an application.

We can then use the extensions anywhere in our application.

For extending native functions such as `find` and `findIndex`, we need to use the following code:

```javascript
import { configureArrayExtensions } from "@locustjs/extensions-array";

configureArrayExtensions({ include: "find,findIndex", force: true });
```

# Functions
- `clone`
- `shuffle`
- `range`
- `insertAt`
- `removeAt`
- `all`
- `any`
- `sortBy`
- `contains`
- `containsAny`
- `min`
- `max`
- `toObject`
- `objectify`

## shuffle(array)
Shuffles items of an array.

```javascript
import { shuffle } from '@locustjs/extensions-array'

const source = [10, 23, 14, 9, 31];
const shuffled = shuffle(source);

console.log(shuffled);  // e.g.: 14, 10, 31, 23, 9
```

As an extension ...

```javascript
const source = [10, 23, 14, 9, 31];
const shuffled = source.shuffle();

console.log(shuffled);  // e.g.: 14, 10, 31, 23, 9
```

## range(from, to)
Generates an array of integer numbers starting from 'from' and ending at 'to - 1'.

```javascript
import { range } from '@locustjs/extensions-array'

const arr = range(5, 10);

console.log(arr);  // 5, 6, 7, 8, 9
```

As an extension ...

```javascript
const arr = Array.range(5, 10);

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

As an extension ...

```javascript
const arr = ['red', 'green'];

arr.insertAt(1, 'blue');

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

As an extension ...

```javascript
const arr = ['red', 'green', 'blue'];

arr.removeAt(1);

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

As an extension ...

```javascript
const arr = [10, 20, 30, 40];

console.log(arr.all(x => x % 2 == 0));  // true
console.log(arr.all(x => x < 40));  // false
```

## any(array, fn)
Iterates over an array and checks if at least one item conforms to a condition by calling given function on each item.

```javascript
import { any } from '@locustjs/extensions-array'

const arr = [10, 20, 30, 40];

console.log(any(arr, x => x % 2 == 0));  // true
console.log(any(arr, x => x > 40));  // false
```

Signature of the `fn` callback is:

```javascript
fn(value, index, array)
```

As an extension ...

```javascript
const arr = [10, 20, 30, 40];

console.log(arr.any(x => x % 2 == 0));  // true
console.log(arr.any(x => x > 40));  // false
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

As an extension ...

```javascript
...
const arr2 = arr.sortBy(x => x.parent, x => x.code);
...
```

## contains(array, ...values)
Checks whether given array contains given elements. It performs case-insensitive string comparison.

Example 1:
```javascript
import { contains } from '@locustjs/extensions-array'

var arr = [ 10, 14, 23, 9, 5, 34, 30, 18 ];

console.log(contains(arr, 23));   // true
console.log(contains(arr, 23, 30));   // true
console.log(contains(arr, 23, 30, 400));   // false
```

As an extension ...

```javascript
...
console.log(arr.contains(23));   // true
console.log(arr.contains(23, 30));   // true
console.log(arr.contains(23, 30, 400));   // false
```

Example 2:
```javascript
import { contains } from '@locustjs/extensions-array'

var arr = [ "Red", "GREEN", "blue" ];

console.log(contains(arr, "red"));   // true
console.log(contains(arr, "red", "green"));   // true
console.log(contains(arr, "red", "green", "Blue"));   // true
console.log(contains(arr, "red", "green", "black"));   // false
```

As an extension ...

```javascript
...
console.log(arr.contains("red"));   // true
console.log(arr.contains("red", "green"));   // true
console.log(arr.contains("red", "green", "Blue"));   // true
console.log(arr.contains("red", "green", "black"));   // false
```

## containsAny(array, ...values)
Checks whether given array contains at least one of the given elements. It performs case-insensitive string comparison.

Example 1:
```javascript
import { containsAny } from '@locustjs/extensions-array'

var arr = [ 10, 14, 23, 9, 5, 34, 30, 18 ];

console.log(containsAny(arr, 23));   // true
console.log(containsAny(arr, 23, 65));   // true
console.log(containsAny(arr, 28, 44, 100));   // false
```

As an extension ...

```javascript
...
console.log(arr.containsAny(23));   // true
console.log(arr.containsAny(23, 65));   // true
console.log(arr.containsAny(28, 44, 100));   // false
```

Example 2:
```javascript
import { containsAny } from '@locustjs/extensions-array'

var arr = [ "Red", "GREEN", "blue" ];

console.log(containsAny(arr, "red"));   // true
console.log(containsAny(arr, "red", "green"));   // true
console.log(containsAny(arr, "black", "white", "Blue"));   // true
console.log(containsAny(arr, "black", "white", "orange"));   // false
```

As an extension ...

```javascript
...
console.log(arr.containsAny("red"));   // true
console.log(arr.containsAny("red", "green"));   // true
console.log(arr.containsAny("black", "white", "Blue"));   // true
console.log(arr.containsAny("black", "white", "orange"));   // false
```

## `min(array, fn)`, `max(array, fn)`
Returns minimum or maximum of an array.

Example 1:

```javascript
import { min, max } from '@locustjs/extensions-array'

var arr = [ 10, 8, 19, 3, 5, 11, 21, 4, 17, 9, 15, 16 ];

console.log(min(arr));	// 3
console.log(max(arr));	// 21
```

As an extension ...

```javascript
...
console.log(arr.min());	// 3
console.log(arr.max());	// 21
...
```

Example 2:
```javascript
import { min, max } from '@locustjs/extensions-array'

var arr = [
	{ code: 10, name: 'item 1' },
	{ code: 8 , name: 'item 2' },
	{ code: 19, name: 'item 3' },
	{ code: 3 , name: 'item 4' },
	{ code: 5 , name: 'item 5' },
	{ code: 11, name: 'item 6' },
	{ code: 21, name: 'item 7' },
	{ code: 4 , name: 'item 8' },
	{ code: 17, name: 'item 9' },
	{ code: 9 , name: 'item 10'},
	{ code: 15, name: 'item 11'},
	{ code: 16, name: 'item 12'}
];

const arr2Min = min(arr, x => x.code);
const arr2Max = max(arr, x => x.code);

console.log(`min: ${arr2Min}`);
console.log(`max: ${arr2Max}`);
```

As an extension ...

```javascript
...
const arr2Min = arr.min(x => x.code);
const arr2Max = arr.max(x => x.code);
...
```

## toObject(arr, type, schema?)
This method converts an array of values to an object. The result depends on `type` which specifies what type of data the array contains. Possible values are:

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

const x = toObject(arr, "key-value");
// as an extension method ...
// const x = arr.toObject("key-value");

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
const schema = ["name",["address",["id", "name"]],"age"];

const x = toObject(values, 'values', schema);
// as an extension method ...
// const x = values.toObject('values', schema);

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
const schema = ["name",["address",["id", "name"]],"age"];
const x = toObject(schema, 'schema');
// as an extension method ...
// const x = schema.toObject('schema');

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

## objectify(array)
This function is a shorthand for `toObject(arr, "key-value")` invocation.

```javascript
const objectify = (arr) => toObject(arr, "key-value");
```

It converts an array of key/value items into an object.

```javascript
  const arr1 = [
    ["a", 1],
    ["b", "ali"]
  ];

  console.log(objectify(arr1));
  /*
  { "a": 1, "b": "ali" }
  */
```

As an extension ...

```javascript
  ...
  console.log(arr1.objectify());
```

# Other direct extensions on `Array`
## clone(array)
Clones an array.

```javascript
const arr1 = [10, 23, 14, 9, 31];
const arr2 = arr1.clone();

console.log(arr2);
```

## array.find(value, equalityComparer)
Extends functionality of native `arr.find()` based on the signature mentioned above. i.e. it receives the searched value in the first argument and an `equalityComparer` as the second argument that is used to compare array elements.

An `equalityComparer` is any object that has an `equals(x, y)` method that compares equality of its two arguments (`x` and `y`).

Example 1:
```javascript
const MyStringComparer = {
	equals: (x, y) => x.toLowerCase() == y.toLowerCase()
}
const arr = ["Red", "Green", "Blue", "Black", "White"];
const x = arr.find("red", MyStringComparer);

console.log(x);	// Red
```

Example 2:
```javascript
import { equals } from "@locustjs/base";

const arr = [
	{ id: 1, name: "red" },
	{ id: 2, name: "blue" },
	{ id: 3, name: "green" },
];
const MyObjectEqualityCompare = { equals };
const value = { id: "2", name: "blue" };
const x = arr.find(value, MyObjectEqualityCompare);

console.log(x);	// { id: 2, name: "blue" }
```

For more equalityComparers we can use [@locustjs/compare](https://github.com/ironcodev/locustjs-compare.git) library.

## array.findIndex(value, equalityComparer)
Extends functionality of native `arr.findIndex()` based on the signature mentioned above. i.e. it receives the searched value in the first argument and an `equalityComparer` as the second argument that is used to compare array elements.

Example 1:
```javascript
const MyStringComparer = {
	equals: (x, y) => x.toLowerCase() == y.toLowerCase()
}
const arr = ["Red", "Green", "Blue", "Black", "White"];
const x = arr.findIndex("green", MyStringComparer);

console.log(x);	// 1
```

Example 2:
```javascript
import { equals } from "@locustjs/base";

const arr = [
	{ id: 1, name: "red" },
	{ id: 2, name: "blue" },
	{ id: 3, name: "green" },
];
const MyObjectEqualityCompare = { equals };
const value = { id: "2", name: "blue" };
const x = arr.findIndex(value, MyObjectEqualityCompare);

console.log(x);	// 1
```

Again, for more equalityComparers we can use [@locustjs/compare](https://github.com/ironcodev/locustjs-compare.git) library.
