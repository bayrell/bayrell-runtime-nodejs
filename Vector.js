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
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
Runtime.Vector = function(__ctx)
{
	use("Runtime.Collection").apply(this, arguments);
};
Runtime.Vector.prototype = Object.create(use("Runtime.Collection").prototype);
Runtime.Vector.prototype.constructor = Runtime.Vector;
Object.assign(Runtime.Vector.prototype,
{
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	push: function(__ctx, value)
	{
		Array.prototype.push.call(this, value);
		return this;
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshift: function(__ctx, value)
	{
		Array.prototype.unshift.call(this, value);
		return this;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	pop: function(__ctx)
	{
		return Array.prototype.pop.call(this);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shift: function(__ctx)
	{
		return Array.prototype.shift.call(this);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insert: function(__ctx, pos, value)
	{
		Array.prototype.splice.call(this, pos, 0, value);
		return this;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	remove: function(__ctx, pos, count)
	{
		if (count == undefined) count = 1;
		Array.prototype.splice.call(this, pos, count);
		return this;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRange: function(__ctx, pos_begin, pos_end)
	{
		Array.prototype.splice.call(this, pos_begin, pos_end - pos_begin + 1);
		return this;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	set: function(__ctx, pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var IndexOutOfRange = use ("Runtime.Exceptions.IndexOutOfRange");
			throw new IndexOutOfRange();
		}
		this[pos] = value;
		return this;
	},
	/**
	 * Clear all values from vector
	 */
	clear: function(__ctx)
	{
		Array.prototype.splice.call(this, 0, this.length);
		return this;
	},
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	append: function(__ctx, value)
	{
		this.push(__ctx, value);
		return this;
	},
	/**
	 * Insert first value to begin of the vector
	 * @return T value
	 */
	prepend: function(__ctx, value)
	{
		this.unshift(__ctx, value);
		return this;
	},
	/**
	 * Append vector to the end of the vector
	 * @param Vector<T> arr
	 */
	appendVector: function(__ctx, arr)
	{
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) Array.prototype.push.call(this, arr[i]);
		return this;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Vector<T> arr
	 */
	prependVector: function(__ctx, arr)
	{
		for (var i=0; i<arr.length; i++) Array.prototype.unshift.call(this, arr[i]);
		return this;
	},
	/**
	 * Remove value
	 */
	removeValue: function(__ctx, value)
	{
		var index = this.indexOf(__ctx, value);
		if (index != -1)
		{
			this.remove(__ctx, index, 1);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeItem: function(__ctx, value)
	{
		return this.removeValue(__ctx, value);
	},
	/**
	 * Remove value
	 */
	removeItems: function(__ctx, values)
	{
		for (var i = 0;i < values.count(__ctx);i++)
		{
			this.removeValue(__ctx, values.item(__ctx, i));
		}
		return this;
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Vector"))
		{
		}
		use("Runtime.Collection").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Runtime.Collection").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Collection").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Vector";
	},
});
Object.assign(Runtime.Vector, use("Runtime.Collection"));
Object.assign(Runtime.Vector,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(__ctx)
	{
		var __v0 = use("Runtime.Vector");
		return new __v0(__ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Vector";
	},
	getParentClassName: function()
	{
		return "Runtime.Collection";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Vector",
			"name": "Runtime.Vector",
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
});use.add(Runtime.Vector);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Vector = Runtime.Vector;