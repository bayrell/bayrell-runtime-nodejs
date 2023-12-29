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
Runtime.Callback = function(ctx, obj)
{
	if (obj == undefined) obj = null;
	var __v0 = use("Runtime.Dict");
	if (!(obj instanceof __v0))
	{
		var args = null;
		obj = use("Runtime.Map").from({"obj":args.get(ctx, 0),"name":args.get(ctx, 1)});
	}
	use("Runtime.BaseStruct").call(this, ctx, obj);
	this.checkExists(ctx);
};
Runtime.Callback.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.Callback.prototype.constructor = Runtime.Callback;
Object.assign(Runtime.Callback.prototype,
{
	/**
	 * Check if method exists
	 */
	checkExists: function(ctx)
	{
		var __v0 = use("Runtime.rtl");
		if (!__v0.method_exists(ctx, this.obj, this.name))
		{
			var __v1 = use("Runtime.Exceptions.RuntimeException");
			var __v2 = use("Runtime.rtl");
			throw new __v1(ctx, "Method '" + use("Runtime.rtl").toStr(this.name) + use("Runtime.rtl").toStr("' not found in ") + use("Runtime.rtl").toStr(__v2.get_class_name(ctx, this.obj)))
		}
	},
	/**
	 * Call function
	 */
	call: function(ctx, args)
	{
		if (args == undefined) args = null;
		obj = this.obj;
		
		if (typeof(obj) == "string")
		{
			obj = Runtime.rtl.find_class(obj);
		}
		
		return Runtime.rtl.apply(obj[this.name].bind(obj), args);
	},
	/**
	 * Call function
	 */
	callAsync: async function(ctx, args)
	{
		if (args == undefined) args = null;
		obj = this.obj;
		
		if (typeof(obj) == "string")
		{
			obj = Runtime.rtl.find_class(obj);
		}
		
		return await Runtime.rtl.applyAsync(obj[this.name].bind(obj), args);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.obj = null;
		this.name = null;
		this.tag = null;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "obj")return this.obj;
		else if (k == "name")return this.name;
		else if (k == "tag")return this.tag;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.Callback, use("Runtime.BaseStruct"));
Object.assign(Runtime.Callback,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Callback";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		a.push("obj");
		a.push("name");
		a.push("tag");
		return use("Runtime.Vector").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
		];
		return use("Runtime.Vector").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Callback);
module.exports = Runtime.Callback;