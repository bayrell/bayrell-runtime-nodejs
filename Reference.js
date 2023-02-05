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
Runtime.Reference = function(ctx, ref)
{
	if (ref == undefined) ref = null;
	use("Runtime.BaseObject").call(this, ctx);
	this.ref = ref;
};
Runtime.Reference.prototype = Object.create(use("Runtime.BaseObject").prototype);
Runtime.Reference.prototype.constructor = Runtime.Reference;
Object.assign(Runtime.Reference.prototype,
{
	/**
	 * Assign and clone data from other object
	 * @param BaseObject obj
	 */
	assignObject1: function(ctx, obj)
	{
		var __v0 = use("Runtime.Reference");
		if (obj instanceof __v0)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		use("Runtime.BaseObject").prototype.assignObject1.call(this, ctx, obj);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseObject").prototype._init.call(this,ctx);
		var __v0 = use("Runtime.rtl");
		this.uq = __v0.unique(ctx);
		this.ref = null;
	},
});
Object.assign(Runtime.Reference, use("Runtime.BaseObject"));
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Reference";
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
		if ((f&2)==2)
		{
			a.push("uq");
			a.push("ref");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "uq") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ref") return Dict.from({
			"t": "T",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
			"constructor",
			"assignObject1",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Reference);
module.exports = Runtime.Reference;