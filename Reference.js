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
		var __v0 = use("Runtime.rtl");
		this.uq = __v0.unique(ctx);
		this.ref = null;
		use("Runtime.BaseObject").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Reference"))
		{
			this.uq = o.uq;
			this.ref = o.ref;
		}
		use("Runtime.BaseObject").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uq")this.uq = v;
		else if (k == "ref")this.ref = v;
		else use("Runtime.BaseObject").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uq")return this.uq;
		else if (k == "ref")return this.ref;
		return use("Runtime.BaseObject").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Reference";
	},
});
Object.assign(Runtime.Reference, use("Runtime.BaseObject"));
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
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
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Reference",
			"name": "Runtime.Reference",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
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
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "uq") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Reference",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ref") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Reference",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
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
});use.add(Runtime.Reference);
module.exports = Runtime.Reference;