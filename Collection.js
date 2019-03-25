"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('./rtl.js');
var IndexOutOfRange = require('./Exceptions/IndexOutOfRange.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof Runtime == "undefined") Runtime = {};

Runtime.Collection = class extends Array
{
	
	copy()
	{
		return super.slice();
	}
	
	
	
	/**
	 * Convert to dict
	 */
	toCollection()
	{
		var obj = super.slice();
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	}
	
	
	
	/**
	 * Convert to dict
	 */
	toVector()
	{
		var obj = super.slice();
		Object.setPrototypeOf(obj, Runtime.Collection.getVector().prototype);
		return obj;
	}
	
	
	
	/**
	 * Correct items
	 */
	_correctItemsByType(type)
	{
		if (type == "mixed" || type == "primitive" || type == "var") return this;
		
		var arr = this.copy();
		for (var i=0; i<arr.length; i++)
		{
			if (isBrowser()) arr[i] = Runtime.rtl.correct(arr[i], type, null);
			else arr[i] = rtl.correct(arr[i], type, null);
		}
		return arr;
	}
	
	
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static createNewInstance(arr){
		var res = new Runtime.Collection();
		if (arr != undefined && arr != null) res = res.concat(arr);
		return res;
	}
	
	
	
	/**
	 * Collection constructor
	 */
	constructor()
	{
		super();
		for (var i=0; i<arguments.length; i++) super.push( arguments[i] );
		this.__uq__ = Symbol();
	}
	
	
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get(pos, default_value)
	{
		if (pos < 0 || pos >= this.length)
			return default_value;
		return this[pos];
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item(pos)
	{
		if (pos < 0 || pos >= this.length){
			if (isBrowser()) throw new Runtime.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		return this[pos];
	}
	
	
	
	/**
	 * Returns count items in vector
	 */
	count()
	{
		return this.length;
	}
	
	
	
	/**
	 * Find value in array
	 * @param T value
	 * @return  int
	 */
	indexOf(value)
	{
		for (var i=0; i<this.count(); i++){
			if (this[i] == value)
				return i;
		}
		return -1;
	}
	
	
	
	/**
	 * Find value in array in range pos_begin <= pos <= pos_end, and returns position. 
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return int - position
	 */
	indexOfRange(value, pos_begin, pos_end)
	{
		var pos = super.indexOf(value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	}
	
	
	
	/**
	 * Get last item
	 */
	first(default_value)
	{
		if (this.length == 0)
			return default_value;	
		return this[0];
	}
	
	
	
	/**
	 * Get last item
	 */
	last(default_value, pos)
	{
		if (pos == undefined) pos = -1;
		if (this.length == 0)
			return default_value;
		if (this.length + pos + 1 == 0)
			return default_value;	
		return this[this.length + pos];
	}
	getLastItem(default_value, pos)
	{
		return this.last(default_value, pos); 
	}
	
	
	
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	pushIm(value)
	{
		var arr = this.copy();
		arr.push(value);
		return arr;
	}
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm(value)
	{
		var arr = this.copy();
		arr.unshift(value);
		return arr;
	}
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm()
	{
		return this.slice(0, -1);
	}
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeFirstIm()
	{
		return this.slice(1);
	}
	
	
	
	/**
	 * Insert value size_to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm(pos, value)
	{
		var arr = this.copy();
		arr.splice(pos, 0, value);
		return arr;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param int pos - position
	 */
	removeIm(pos, count)
	{
		if (count == undefined) count = 1;
		var arr = this.copy();
		arr.splice(pos, count);
		return arr;
	}
	
	
	
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm(pos_begin, pos_end)
	{
		var arr = this.copy();
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm(pos, value)
	{
		if (pos < 0 || pos >= this.length){
			if (isBrowser()) throw new Runtime.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		var arr = this.copy();
		arr[pos] = value;
		return arr;
	}
	
	
	
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	appendIm(value)
	{
		return this.pushIm(value);
	}
	
	
	
	/**
	 * Insert first value to the begin of the vector
	 * @return T value
	 */
	prependIm(value)
	{
		return this.unshift(value);
	}
	
	
	
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendCollectionIm(arr)
	{
		if (!arr) return this;
		if (arr.length == 0) return this;
		var res = this.copy();
		for (var i=0; i<arr.length; i++)
		{
			res.push(arr[i]);
		}
		return res;
	}
	
	
	
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependCollectionIm(arr)
	{
		var res = this.copy();
		for (var i=0; i<arr.length; i++)
		{
			res.unshift(arr[i]);
		}
		return res;
	}
	
	
	
	/**
	 * Remove value
	 */
	removeValueIm(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			return this.removeIm(index);
		}
		return this;
	}
	
	
	
	/**
	 * Remove value
	 */
	removeItemIm(value)
	{
		return this.removeValueIm(value);
	}
	
	
	
	/**
	 * Remove values
	 */
	removeItemsIm(values)
	{
		var res = this;
		for (var i=0; i<values.count(); i++)
		{
			res = res.removeItem( values.item(i) );
		}
		return res;
	}
	
	
	
	/**
	 * Map
	 * @param func f
	 * @return Collection
	 */
	map(f)
	{
		return super.map(f);
	}
	
	
	
	/**
	 * Filter items
	 * @param func f
	 * @return Collection
	 */
	filter(f)
	{
		return super.filter(f);
	}
	
	
	
	/**
	 * Reduce
	 * @param func f
	 * @param mixed init_value
	 * @return init_value
	 */
	reduce(f, init_value)
	{
		return super.reduce(f, init_value);
	}
	
	
	
	/**
	 * Call function for each item
	 * @param func f
	 */
	each(f)
	{
		super.forEach(f);
		return this;
	}
	
	
	
	/**
	 * Each item recursive
	 * @param func f
	 * @param func childs Returns childs items
	 * @param func kind. 1 - Node item first, -1 - Node item last
	 */
	recurse(f, childs, kind)
	{
		if (kind == undefined) kind=1;
		return this;
	}
	
	
	
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	concat(arr)
	{
		if (arr == null && arr == undefined)
		{
			return this.slice();
		}
		return super.concat(arr);
	}
	
	
	
	/**
	 * Returns Collection
	 * @param int offset
	 * @param int length
	 * @return Collection<T>
	 */
	slice(offset, length)
	{
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			if (offset == 0) return this;
			return super.slice(offset);
		}
		if (offset == 0 && length == this.length) return this;
		if (length >= 0)
		{
			length = this.count() - offset + length - 1;
		}
		return super.slice(offset, length);
	}
	
	
	
	
	/**
	 * Reverse array
	 */
	reverseIm()
	{
		var arr = this.copy();
		arr.reverse();
		return arr;
	}
	
	
	
	/**
	 * Returns sorted vector
	 * @param func f - Sort user function
	 */
	sortIm(f)
	{
		var arr = this.copy();
		if (f == undefined) arr.sort();
		arr.sort(f);
		return this;
	}
	
	
	
	/**
	 * Remove dublicate values
	 */
	removeDublicatesIm()
	{
		var res = this.constructor.createNewInstance();
		for (var i=0; i<this.length; i++)
		{
			if (res.indexOf(this[i]) == -1)
			{
				res.push( this[i] );
			}
		}
		return res;
	}
}
Runtime.Collection.getVector = function(){ return require('./Vector.js'); }
if (false){

module.exports = {
	"Collection": Runtime.Collection
}

}
else{

module.exports = Runtime.Collection;

}