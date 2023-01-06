"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.BaseStruct = function(ctx, obj)
{
	if (obj == undefined) obj = null;
	use("Runtime.BaseObject").call(this, ctx);
	this.constructor._assign(ctx, this, null, obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.BaseStruct.prototype = Object.create(use("Runtime.BaseObject").prototype);
Runtime.BaseStruct.prototype.constructor = Runtime.BaseStruct;
Object.assign(Runtime.BaseStruct.prototype,
{
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		this.constructor._assign(ctx, item, this, obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		return this.copy(ctx, obj);
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return use("Runtime.Dict").from({});
		}
		var __v0 = use("Runtime.Map");
		var obj = new __v0(ctx);
		for (var i = 0;i < fields.count(ctx);i++)
		{
			var field_name = Runtime.rtl.get(ctx, fields, i);
			obj.setValue(ctx, field_name, this.get(ctx, field_name));
		}
		/* Return object */
		var __v1 = use("Runtime.rtl");
		var res = __v1.newInstance(ctx, this.getClassName(ctx), use("Runtime.Collection").from([obj.toDict(ctx)]));
		return res;
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	toDict: function(ctx)
	{
		var __v0 = use("Runtime.Map");
		var values = new __v0(ctx);
		var __v1 = use("Runtime.rtl");
		var names = __v1.getFields(ctx, this.getClassName(ctx));
		for (var i = 0;i < names.count(ctx);i++)
		{
			var variable_name = names.item(ctx, i);
			var value = this.get(ctx, variable_name, null);
			values.setValue(ctx, variable_name, value);
		}
		return values.toDict(ctx);
	},
});
Object.assign(Runtime.BaseStruct, use("Runtime.BaseObject"));
Object.assign(Runtime.BaseStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(ctx, items)
	{
		return new (
			Function.prototype.bind.apply(
				this,
				(typeof ctx != "undefined") ? [null, ctx, items] : [null, items]
			)
		);
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	set: function(ctx, item, path, value)
	{
		var __v0 = use("Runtime.rtl");
		return __v0.setAttr(ctx, item, path, value);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return Dict.from({
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
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
	__implements__:
	[
		use("Runtime.SerializeInterface"),
	],
});use.add(Runtime.BaseStruct);
module.exports = Runtime.BaseStruct;
Runtime.BaseStruct.prototype.get = function(ctx, k, v)
{
	if (v == undefined) v = null;
	return this[k] != undefined ? this[k] : v;
};