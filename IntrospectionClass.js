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
Runtime.IntrospectionClass = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.IntrospectionClass.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.IntrospectionClass.prototype.constructor = Runtime.IntrospectionClass;
Object.assign(Runtime.IntrospectionClass.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.class_name = "";
		this.class_info = null;
		this.fields = null;
		this.methods = null;
		this.interfaces = null;
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.IntrospectionClass"))
		{
			this.class_name = o.class_name;
			this.class_info = o.class_info;
			this.fields = o.fields;
			this.methods = o.methods;
			this.interfaces = o.interfaces;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "class_name")this.class_name = v;
		else if (k == "class_info")this.class_info = v;
		else if (k == "fields")this.fields = v;
		else if (k == "methods")this.methods = v;
		else if (k == "interfaces")this.interfaces = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.class_name;
		else if (k == "class_info")return this.class_info;
		else if (k == "fields")return this.fields;
		else if (k == "methods")return this.methods;
		else if (k == "interfaces")return this.interfaces;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.IntrospectionClass";
	},
});
Object.assign(Runtime.IntrospectionClass, use("Runtime.BaseStruct"));
Object.assign(Runtime.IntrospectionClass,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.IntrospectionClass";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.IntrospectionClass",
			"name": "Runtime.IntrospectionClass",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("class_info");
			a.push("fields");
			a.push("methods");
			a.push("interfaces");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_info") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fields") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "methods") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "interfaces") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.IntrospectionClass",
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
});use.add(Runtime.IntrospectionClass);
module.exports = Runtime.IntrospectionClass;