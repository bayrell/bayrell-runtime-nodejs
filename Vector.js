"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('./rtl.js');
var Collection = require('./Collection.js');
var IndexOutOfRange = require('./Exceptions/IndexOutOfRange.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof Runtime == "undefined") Runtime = {};
var _Collection = require('./Collection.js');
Runtime.Vector = class extends _Collection
{
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Instance(){
		return new Runtime.Vector();
	}
	
	
	
	/**
	 * Assign all data from other object
	 * @param Vector obj
	 */
	assignObject(obj)
	{
		this.clear();
		obj.each(
			(item)=>{
				if (isBrowser()) this.push( Runtime.rtl._clone(item) );
				else this.push( rtl._clone(item) );
			}
		);
	}
	
	
	
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	push(value)
	{
		super.push(value);
		return this;
	}
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshift(value)
	{
		super.unshift(value);
		return this;
	}
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	pop()
	{
		return super.pop();
	}
	
	
	
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shift()
	{
		return super.shift();
	}
	
	
	
	/**
	 * Insert value size_to position
	 * @param T value
	 * @param int pos - position
	 */
	insert(pos, value)
	{
		super.splice(pos, 0, value);
		return this;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param int pos - position
	 */
	remove(pos, count)
	{
		if (count == undefined) count = 1;
		super.splice(pos, count);
		return this;
	}
	
	
	
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRange(pos_begin, pos_end)
	{
		super.splice(pos_begin, pos_end - pos_begin + 1);
		return this;
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	set(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			if (isBrowser()) throw new Runtime.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		this[pos] = value;
		return this;
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	clear(){
		super.splice(0, this.length);
		return this;
	}
	
	
	
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	append(value)
	{
		this.push(value);
		return this;
	}
	
	
	
	/**
	 * Insert first value to the begin of the vector
	 * @return T value
	 */
	prepend(value)
	{
		this.unshift(value);
		return this;
	}
	
	
	
	/**
	 * Append vector to the end of the vector
	 * @param Vector<T> arr
	 */
	appendVector(arr)
	{
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) super.push(arr[i]);
		return this;
	}
	
	
	
	/**
	 * Prepend vector to the begin of the vector
	 * @param Vector<T> arr
	 */
	prependVector(arr)
	{
		for (var i=0; i<arr.length; i++) super.unshift(arr[i]);
		return this;
	}
	
	
	
	/**
	 * Remove value
	 */
	removeValue(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
			this.remove(index, 1);
		return this;
	}
	
	
	
	/**
	 * Remove value
	 */
	removeItem(value)
	{
		return this.removeValue(value);
	}
	
	
	
	/**
	 * Remove values
	 */
	removeItems(values)
	{
		for (var i=0; i<values.count(); i++)
		{
			this.removeItem( values.item(i) );
		}
		return this;
	}
	
	
	getClassName(){return "Runtime.Vector";}
	static getCurrentClassName(){return "Runtime.Vector";}
	static getParentClassName(){return "Runtime.Collection";}
	
}
if (false){

module.exports = {
	"Vector": Runtime.Vector
}

}
else{

module.exports = Runtime.Vector;

}