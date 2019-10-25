"use strict;"
var use = require('bayrell').use;
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
if (typeof Runtime == 'undefined') Runtime = {};
var use = require('bayrell').use; use.platform = "nodejs";
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
if (typeof Runtime == 'undefined') Runtime = {};
Runtime._Collection = function()
{
	Array.call(this);
	for (var i=1; i<arguments.length; i++) Array.prototype.push.call(this, arguments[i]);
	this.__uq__ = Symbol();
}
Runtime._Collection.prototype = Object.create(Array.prototype);
Runtime._Collection.prototype.constructor = Runtime._Collection;
Object.assign(Runtime._Collection.prototype,
{
	toStr: function(value)
	{
		return use("Runtime.rtl").toStr(value);
	},
	getClassName: function(){ return "Runtime._Collection"; },
});
Object.assign(Runtime._Collection,
{
	from: function(arr)
	{
		var res = this.Instance();
		if (arr == undefined && arr == null) return this.Instance();
		
		if (arr instanceof Array)
		{
			var new_arr = arr.slice();
			Object.setPrototypeOf(new_arr, this.prototype);
			return new_arr;
		}
		
		var res = this.Instance();
		if (
			arr instanceof Int8Array ||
			arr instanceof Uint8Array ||
			arr instanceof Int16Array ||
			arr instanceof Uint16Array ||
			arr instanceof Int32Array ||
			arr instanceof Uint32Array ||
			arr instanceof Float32Array ||
			arr instanceof Float64Array
		)
		{
			for (var i=0; i<arr.length; i++)
			{
				Array.prototype.push.call(res, arr[i]);
			}
		}
		
		return res;	
	},
	getCurrentNamespace: function(){ return "Runtime"; },
	getCurrentClassName: function(){ return "Runtime._Collection"; },
	getParentClassName: function(){ return ""; },
});
use.add(Runtime._Collection);
Runtime.Collection = function(__ctx)
{
	use("Runtime._Collection").apply(this, arguments);
};
Runtime.Collection.prototype = Object.create(use("Runtime._Collection").prototype);
Runtime.Collection.prototype.constructor = Runtime.Collection;
Object.assign(Runtime.Collection.prototype,
{
	/**
	 * Returns copy of Collectiom
	 * @param int pos - position
	 */
	copy: function(__ctx)
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Convert to collection
	 */
	toCollection: function(__ctx)
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function(__ctx)
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(__ctx, pos, default_value)
	{
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(__ctx, pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(__ctx);
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function(__ctx)
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(__ctx, value)
	{
		for (var i=0; i<this.count(__ctx); i++)
		{
			if (this[i] == value)
				return i;
		}
		return -1;
	},
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	indexOfRange: function(__ctx, value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(__ctx, default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;	
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(__ctx, default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		if (pos == undefined) pos = -1;
		if (this.length == 0) return default_value;
		if (this.length + pos + 1 == 0) return default_value;	
		return this[this.length + pos];
	},
	/**
	 * Get last item
	 */
	getLastItem: function(__ctx, default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		return this.last(__ctx, default_value, pos);
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(__ctx, value)
	{
		var arr = this.copy();
		Array.prototype.push.call(arr, value);
		return arr;
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm: function(__ctx, value)
	{
		var arr = this.copy();
		Array.prototype.unshift.call(arr, value);
		return arr;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm: function(__ctx)
	{
		var arr = Array.prototype.slice.call(this, 0, -1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	removeFirstIm: function(__ctx)
	{
		var arr = Array.prototype.slice.call(this, 1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm: function(__ctx, pos, value)
	{
		var arr = this.copy(__ctx);
		arr.splice(pos, 0, value);
		return arr;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removeIm: function(__ctx, pos, count)
	{
		if (count == undefined) count = 1;
		if (count == undefined) count = 1;
		var arr = this.copy(__ctx);
		arr.splice(pos, count);
		return arr;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm: function(__ctx, pos_begin, pos_end)
	{
		var arr = this.copy(__ctx);
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(__ctx, pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(__ctx);
		}
		var arr = this.copy(__ctx);
		arr[pos] = value;
		return arr;
	},
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	appendIm: function(__ctx, value)
	{
		return this.pushIm(__ctx, value);
	},
	/**
	 * Insert first value to begin of the vector
	 * @return T value
	 */
	prependIm: function(__ctx, value)
	{
		return this.unshiftIm(__ctx, value);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendCollectionIm: function(__ctx, arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.copy(__ctx);
		for (var i=0; i<arr.length; i++)
		{
			Array.prototype.push.call(res, arr[i]);
		}
		return res;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependCollectionIm: function(__ctx, arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.copy(__ctx);
		for (var i=arr.length-1; i>=0; i--)
		{
			Array.prototype.unshift.call(res, arr[i]);
		}
		return res;
	},
	/**
	 * Remove value
	 */
	removeValueIm: function(__ctx, value)
	{
		var index = this.indexOf(__ctx, value);
		if (index != -1)
		{
			return this.removeIm(__ctx, index);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeItemIm: function(__ctx, value)
	{
		return this.removeValueIm(__ctx, value);
	},
	/**
	 * Remove value
	 */
	removeItemsIm: function(__ctx, values)
	{
		var res = this;
		for (var i = 0;i < values.count(__ctx);i++)
		{
			res = res.removeItem(__ctx, values.item(__ctx, i));
		}
		return res;
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(__ctx, f)
	{
		var arr = this.copy(__ctx);
		for (var i=0; i<arr.length; i++)
		{
			arr[i] = f(__ctx, arr[i], i);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(__ctx, f)
	{
		var res = this.constructor.Instance(__ctx);
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = f(__ctx, item, i);
			if (flag)
			{
				Array.prototype.push.call(res, item);
			}
		}
		return res;
	},
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	transition: function(__ctx, f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict();
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(__ctx, value, i);
			d[p[1]] = p[0];
		}
		return d;
	},
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(__ctx, f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(__ctx, init_value, item, i);
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(__ctx, f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(__ctx, item, i);
		}
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	concat: function(__ctx, arr)
	{
		if (arr == undefined) arr = null;
		if (arr == null && arr == undefined)
		{
			return this;
		}
		var new_arr = Array.prototype.slice.call(this).concat(arr);
		Object.setPrototypeOf(new_arr, this.constructor.prototype);
		return new_arr;
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	intersect: function(__ctx, arr)
	{
		return this.filter(__ctx, (__ctx, item) => 
		{
			return arr.indexOf(__ctx, item) >= 0;
		});
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(__ctx, offset, length)
	{
		if (length == undefined) length = null;
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			if (offset == 0) return this;
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (offset == 0 && length == this.length) return this;
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Reverse array
	 */
	reverseIm: function(__ctx)
	{
		var arr = this.copy(__ctx);
		Array.prototype.reverse.call(arr);
		return arr;
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sortIm: function(__ctx, f)
	{
		if (f == undefined) f = null;
		var arr = this.copy(__ctx);
		if (f == undefined) Array.prototype.sort.call(arr);
		Array.prototype.sort.call(arr, f);
		return arr;
	},
	/**
	 * Remove dublicate values
	 */
	removeDublicatesIm: function(__ctx)
	{
		var res = this.constructor.Instance(__ctx);
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(__ctx, this[i]);
			if (p == -1)
			{
				Array.prototype.push.call(res, this[i]);
			}
		}
		return res;
	},
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	find: function(__ctx, f)
	{
		for (var i=0; i<this.length; i++)
		{
			var flag = f(__ctx, this[i]);
			if (flag) return i;
		}
		return -1;
	},
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	findItem: function(__ctx, f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(__ctx, f);
		return this.get(__ctx, pos, def_value);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Collection"))
		{
		}
		use("Runtime._Collection").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Runtime._Collection").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime._Collection").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Collection";
	},
});
Object.assign(Runtime.Collection, use("Runtime._Collection"));
Object.assign(Runtime.Collection,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(__ctx)
	{
		var __v0 = use("Runtime.Collection");
		return new __v0(__ctx);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(__ctx, arr)
	{
		return this.from(arr);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Collection";
	},
	getParentClassName: function()
	{
		return "Runtime._Collection";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Collection",
			"name": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Collection);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Collection = Runtime.Collection;