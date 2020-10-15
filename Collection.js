"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Collection = function(ctx)
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
	cp: function(ctx)
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Convert to collection
	 */
	toCollection: function(ctx)
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function(ctx)
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(ctx, pos, default_value)
	{
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(ctx, pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(ctx, pos);
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function(ctx)
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(ctx, value)
	{
		for (var i=0; i<this.count(ctx); i++)
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
	indexOfRange: function(ctx, value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(ctx, default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;	
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(ctx, default_value, pos)
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
	getLastItem: function(ctx, default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		return this.last(ctx, default_value, pos);
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(ctx, value)
	{
		var arr = this.cp();
		Array.prototype.push.call(arr, value);
		return arr;
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm: function(ctx, value)
	{
		var arr = this.cp();
		Array.prototype.unshift.call(arr, value);
		return arr;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm: function(ctx)
	{
		var arr = Array.prototype.slice.call(this, 0, -1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	removeFirstIm: function(ctx)
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
	insertIm: function(ctx, pos, value)
	{
		var arr = this.cp(ctx);
		arr.splice(pos, 0, value);
		return arr;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removeIm: function(ctx, pos, count)
	{
		if (count == undefined) count = 1;
		if (count == undefined) count = 1;
		var arr = this.cp(ctx);
		arr.splice(pos, count);
		return arr;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm: function(ctx, pos_begin, pos_end)
	{
		var arr = this.cp(ctx);
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(ctx, pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(ctx, pos);
		}
		var arr = this.cp(ctx);
		arr[pos] = value;
		return arr;
	},
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	appendIm: function(ctx, value)
	{
		return this.pushIm(ctx, value);
	},
	/**
	 * Insert first value to begin of the vector
	 * @return T value
	 */
	prependIm: function(ctx, value)
	{
		return this.unshiftIm(ctx, value);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	concatIm: function(ctx, arr)
	{
		return this.appendCollectionIm(ctx, arr);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendCollectionIm: function(ctx, arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp(ctx);
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
	prependCollectionIm: function(ctx, arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp(ctx);
		for (var i=arr.length-1; i>=0; i--)
		{
			Array.prototype.unshift.call(res, arr[i]);
		}
		return res;
	},
	/**
	 * Remove value
	 */
	removeValueIm: function(ctx, value)
	{
		var index = this.indexOf(ctx, value);
		if (index != -1)
		{
			return this.removeIm(ctx, index);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeItemIm: function(ctx, value)
	{
		return this.removeValueIm(ctx, value);
	},
	/**
	 * Remove value
	 */
	removeItemsIm: function(ctx, values)
	{
		var res = this;
		for (var i = 0;i < values.count(ctx);i++)
		{
			res = res.removeItem(ctx, values.item(ctx, i));
		}
		return res;
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(ctx, f)
	{
		var arr = this.cp(ctx);
		for (var i=0; i<arr.length; i++)
		{
			arr[i] = f(ctx, arr[i], i);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(ctx, f)
	{
		var res = this.constructor.Instance(ctx);
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = f(ctx, item, i);
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
	transition: function(ctx, f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict(ctx);
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(ctx, value, i);
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
	reduce: function(ctx, f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(ctx, init_value, item, i);
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(ctx, f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(ctx, item, i);
		}
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	concat: function(ctx, arr)
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
	intersect: function(ctx, arr)
	{
		return this.filter(ctx, (ctx, item) => 
		{
			return arr.indexOf(ctx, item) >= 0;
		});
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(ctx, offset, length)
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
	reverseIm: function(ctx)
	{
		var arr = this.cp(ctx);
		Array.prototype.reverse.call(arr);
		return arr;
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sortIm: function(ctx, f)
	{
		if (f == undefined) f = null;
		var arr = this.cp(ctx);
		if (f == undefined) Array.prototype.sort.call(arr);
		else
		{
			var f1 = (a, b) => { return f(ctx, a, b); };
			Array.prototype.sort.call(arr, f1);
		}
		return arr;
	},
	/**
	 * Remove dublicate values
	 */
	removeDublicatesIm: function(ctx)
	{
		return this.removeDuplicatesIm(ctx);
	},
	removeDuplicatesIm: function(ctx)
	{
		var res = this.constructor.Instance(ctx);
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(ctx, this[i]);
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
	find: function(ctx, f)
	{
		for (var i=0; i<this.length; i++)
		{
			var flag = f(ctx, this[i]);
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
	findItem: function(ctx, f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(ctx, f);
		return this.get(ctx, pos, def_value);
	},
	/**
	 * Join collection to string
	 */
	join: function(ctx, ch)
	{
		var __v0 = use("Runtime.rs");
		return __v0.join(ctx, ch, this);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Collection"))
		{
		}
		use("Runtime._Collection").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime._Collection").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime._Collection").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
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
	Instance: function(ctx)
	{
		var __v0 = use("Runtime.Collection");
		return new __v0(ctx);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(ctx, arr)
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Collection",
			"name": "Runtime.Collection",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Collection);
module.exports = Runtime.Collection;