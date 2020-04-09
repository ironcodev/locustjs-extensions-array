import { isArray, isFunction } from 'locustjs-base'
import { configureOptions, shouldExend } from 'locustjs-extensions-options'
import { deepAssign } from 'locust-extensions-object'

function configureArrayExtensions(options) {
	const _options = configureOptions(options)
	
	if (!Array.prototype.clone || shouldExend('clone', _options)) {
		Array.prototype.clone = function () {
			return this.slice(0);
		}
	}
	
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	if (!Array.prototype.shuffle || shouldExend('shuffle', _options)) {
		Array.prototype.shuffle = function () {
			let currentIndex = this.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = this[currentIndex];
				this[currentIndex] = this[randomIndex];
				this[randomIndex] = temporaryValue;
			}

			return this;
		}
	}
	
	if (!Array.prototype.insertAt || shouldExend('insertAt', _options)) {
		Array.prototype.insertAt = function (index, item) {
			return this.splice(index, 0, item);
		}
	}
	
	if (!Array.prototype.removeAt || shouldExend('removeAt', _options)) {
		Array.prototype.removeAt = function (index) {
			return this.splice(index, 1)[0];
		}
	}
	
	if (!Array.range || shouldExend('range', _options)) {
		Array.range = function (from, to) {
		let result = new Array(to - from);

		for (let i = from; i < to; i++) {
			result.push(i)
		}

		return result;
		}
	}
	
	if (!Array.prototype.all || shouldExend('all', _options)) {
		Array.prototype.all = function (fn) {
			let result = true;
			
			if (!isFunction(fn)) {
				throw 'no function is given or the argument is not a function';
			} else {
				for (let i = 0; i < this.length; i++) {
					if (!fn(this[i])) {
						result = false;
						break;
					}
				}
			}
			return result;
		}
	}
	
	if (!Array.prototype.any || shouldExend('any', _options)) {
		Array.prototype.any = function (fn) {
			let result = false;
			
			if (!isFunction(fn)) {
				throw 'no function is given or the argument is not a function';
			} else {
				for (let i = 0; i < this.length; i++) {
					if (!fn(this[i])) {
						result = true;
						break;
					}
				}
			}
			return result;
		}
	}
	
	if (!Array.prototype.fromIndexOf || shouldExend('fromIndexOf', _options)) {
		Array.prototype.fromIndexOf = function (x, startIndex) {
			let result = -1;
			let start = 0;
			let isFn = isFunction(x);

			if (typeof startIndex == 'number') {
				start = startIndex;
			}

			for (let i = start; i < this.length; i++) {
				if (isFn) {
					if (x(this[i])) {
						result = i;
						break;
					}
				} else if (this[i] === x) {
					result = i;
					break;
				}
			}

			return result;
		}
	}

	
	if (!Array.prototype.Objectify || shouldExend('Objectify', _options)) {
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
			let result;
			let arr = this;
			
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
						
						if (Object.keys(temp).length == (temp1 ? Object.keys(temp1).length : 0) + (temp2 ? Object.keys(temp2).length: 0)) {
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
	}
}

export default configureArrayExtensions;