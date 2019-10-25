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
Runtime.Map = function(__ctx)
{
	use("Runtime.Dict").apply(this, arguments);
};
Runtime.Map.prototype = Object.create(use("Runtime.Dict").prototype);
Runtime.Map.prototype.constructor = Runtime.Map;
Object.assign(Runtime.Map.prototype,
{
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	set: function(__ctx, key, value)
	{
		key = this.toStr(key);
		this._map["|" + key] = value;
		return this;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	remove: function(__ctx, key)
	{
		key = this.toStr(key);
		if (this.has("|" + key))
		{
			delete this._map["|" + key];
		}
		return this;
	},
	/**
	 * Clear all values from vector
	 * @return self
	 */
	clear: function(__ctx)
	{
		this._map = {};
		return this;
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Map"))
		{
		}
		use("Runtime.Dict").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Runtime.Dict").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Dict").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Map";
	},
});
Object.assign(Runtime.Map, use("Runtime.Dict"));
Object.assign(Runtime.Map,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(__ctx)
	{
		var __v0 = use("Runtime.Map");
		return new __v0(__ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Map";
	},
	getParentClassName: function()
	{
		return "Runtime.Dict";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Map",
			"name": "Runtime.Map",
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
});use.add(Runtime.Map);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Map = Runtime.Map;