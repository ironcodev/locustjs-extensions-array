import { isArray, isFunction } from 'locustjs-base'
import { configureOptions, shouldExtend } from 'locustjs-extensions-options'
import { deepAssign } from 'locustjs-extensions-object'

const shuffle = function (arr) {
	if (!isArray(arr)) {
		throw `expected an array`
	}
	
	let currentIndex = arr.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temporaryValue;
	}

	return arr;
}
const range = function (from, to) {
	from = parseInt(from);
	to = parseInt(to);
	
	let result = [];

	for (let i = from; i < to; i++) {
		result.push(i)
	}

	return result;
}
const insertAt = function(arr, index, item) {
	if (!isArray(arr)) {
		throw `expected array but received ${typeof arr}`
	}
	
	return arr.splice(index, 0, item);
}
const removeAt = function(arr, index) {
	if (!isArray(arr)) {
		throw `expected array but received ${typeof arr}`
	}
	
	return arr.splice(index, 1)[0];
}
const all = function (arr, fn) {
	if (!isArray(arr)) {
		throw `expected array but received ${typeof arr}`
	}
	
	if (!isFunction(fn)) {
		throw 'no callback function is given or the argument is not a function';
	}
	
	let result = true;
	
	for (let i = 0; i < arr.length; i++) {
		if (!fn(arr[i])) {
			result = false;
			break;
		}
	}

	return result;
}
const any = function (arr, fn) {
	if (!isArray(arr)) {
		throw `expected array but received ${typeof arr}`
	}
	
	if (!isFunction(fn)) {
		throw 'no function is given or the argument is not a function';
	}
	
	let result = false;
	
	for (let i = 0; i < arr.length; i++) {
		if (!fn(arr[i])) {
			result = true;
			break;
		}
	}
	
	return result;
}
const Objectify = function (arr) {
	if (!isArray(arr)) {
		throw `expected array but received ${typeof arr}`
	}
	
	let result;
	
	if (!isArray(arr)) {
		result = {};
		result[arr.toString()] = null;
		
		return result;
	}
	if (arr.length == 0)
		return null;
	if (arr.length == 1) {
		result = {};
		result[arr[0].toString()] = null;
		
		return result;
	}
	
	for (let i = 0; i < arr.length; i += 2) {
		let key = arr[i];
		let value = (i + 1 < arr.length) ? arr[i + 1]: null;

		if (i == 0) {
			result = (isArray(key))?[]:{};
		}
		
		if (isArray(key)) {
			let temp1 = key.Objectify();
			let temp2;
			let temp = {};
			
			if (value) {
				if (isArray(value))
					temp2 = value.Objectify();
				else
					temp2 = value;
			}
			
			if (!isArray(temp1)) {
				temp = deepAssign(temp, temp1, temp2);
				
				if (Object.keys(temp).length == (temp1 ? Object.keys(temp1).length : 0) + (temp2 ? 
Object.keys(temp2).length: 0)) {
					if (isArray(result)) {
						result = temp;
						continue;
					}
				}
			}
			
			if (isArray(result)) {
				result.push(temp1);
				
				if (temp2)
					result.push(temp2);
			} else {
				deepAssign(result, temp1);
				deepAssign(result, temp2);
			}
		} else {
			if (isArray(value))
				result[key] = value.Objectify();
			else
				result[key] = value;
		}
	}
	
	if (isArray(result) && result.length == 1) {
		result = result[0];
	}
	
	return result;
}
const sortBy = function (arr, ...fns) {
	if (fns.length == 0) {
		throw `please specify sortBy function`;
	}
	
	const sort_fn = function(a, b) {
		let result = 0;
		
		for (let fn of fns) {
			const fn_a = fn(a);
			const fn_b = fn(b);
			
			if (fn_a > fn_b) {
				result = 1;
				break;
			}
			
			if (fn_a < fn_b) {
				result = -1;
				break;
			}
		}
		
		return result;
	}
	
	return arr.sort(sort_fn);
}

function configureArrayExtensions(options) {
	const _options = configureOptions(options)
	
	if (!Array.prototype.clone || shouldExtend('clone', _options)) {
		Array.prototype.clone = function () {
			return this.slice(0);
		}
	}
	
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	if (!Array.prototype.shuffle || shouldExtend('shuffle', _options)) {
		Array.prototype.shuffle = function () {
			return shuffle(this);
		}
	}
	
	if (!Array.prototype.insertAt || shouldExtend('insertAt', _options)) {
		Array.prototype.insertAt = function (index, item) {
			return insertAt(this, index, item);
		}
	}
	
	if (!Array.prototype.removeAt || shouldExtend('removeAt', _options)) {
		Array.prototype.removeAt = function (index) {
			return removeAt(this, index);
		}
	}
	
	if (!Array.range || shouldExtend('range', _options)) {
		Array.range = range;
	}
	
	if (!Array.prototype.all || shouldExtend('all', _options)) {
		Array.prototype.all = function (fn) {
			return all(this, fn);
		}
	}
	
	if (!Array.prototype.any || shouldExtend('any', _options)) {
		Array.prototype.any = function (fn) {
			return any(this, fn);
		}
	}
	
	if (!Array.prototype.Objectify || shouldExtend('Objectify', _options)) {
		/*	this method has close relation with String.prototype.nestedSplit in locustjs-extensions-string
			examples
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
		*/
		
		Array.prototype.Objectify = function () {
			return Objectify(this);
		}
	}
	
	if (!Array.prototype.sortBy || shouldExtend('sortBy', _options)) {
		Array.prototype.sortBy = function (...fns) {
			return sortBy(this, ...fns);
		}
	}
}

export default configureArrayExtensions;
export {
	shuffle,
	range,
	insertAt,
	removeAt,
	all,
	any,
	Objectify
}
