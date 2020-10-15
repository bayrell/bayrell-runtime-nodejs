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
Runtime.PathInfo = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.PathInfo.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.PathInfo.prototype.constructor = Runtime.PathInfo;
Object.assign(Runtime.PathInfo.prototype,
{
	/**
	 * Returns string
	 */
	toString: function(ctx)
	{
		return this.filepath;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.filepath = "";
		this.dirname = "";
		this.basename = "";
		this.extension = "";
		this.filename = "";
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.PathInfo"))
		{
			this.filepath = o.filepath;
			this.dirname = o.dirname;
			this.basename = o.basename;
			this.extension = o.extension;
			this.filename = o.filename;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "filepath")this.filepath = v;
		else if (k == "dirname")this.dirname = v;
		else if (k == "basename")this.basename = v;
		else if (k == "extension")this.extension = v;
		else if (k == "filename")this.filename = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "filepath")return this.filepath;
		else if (k == "dirname")return this.dirname;
		else if (k == "basename")return this.basename;
		else if (k == "extension")return this.extension;
		else if (k == "filename")return this.filename;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.PathInfo";
	},
});
Object.assign(Runtime.PathInfo, use("Runtime.BaseStruct"));
Object.assign(Runtime.PathInfo,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.PathInfo";
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
			"class_name": "Runtime.PathInfo",
			"name": "Runtime.PathInfo",
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
			a.push("filepath");
			a.push("dirname");
			a.push("basename");
			a.push("extension");
			a.push("filename");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "filepath") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dirname") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "basename") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "extension") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "filename") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"t": "string",
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
	__implements__:
	[
		use("Runtime.StringInterface"),
	],
});use.add(Runtime.PathInfo);
module.exports = Runtime.PathInfo;