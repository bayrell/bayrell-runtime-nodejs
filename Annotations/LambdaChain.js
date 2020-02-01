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
if (typeof Runtime.Annotations == 'undefined') Runtime.Annotations = {};
Runtime.Annotations.LambdaChain = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Annotations.LambdaChain.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Annotations.LambdaChain.prototype.constructor = Runtime.Annotations.LambdaChain;
Object.assign(Runtime.Annotations.LambdaChain.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__value = "";
		if (a.indexOf("value") == -1) defProp(this, "value");
		this.__chain = "";
		if (a.indexOf("chain") == -1) defProp(this, "chain");
		this.__pos = 0;
		if (a.indexOf("pos") == -1) defProp(this, "pos");
		this.__is_await = false;
		if (a.indexOf("is_await") == -1) defProp(this, "is_await");
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Annotations.LambdaChain"))
		{
			this.__name = o.__name;
			this.__value = o.__value;
			this.__chain = o.__chain;
			this.__pos = o.__pos;
			this.__is_await = o.__is_await;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.__name = v;
		else if (k == "value")this.__value = v;
		else if (k == "chain")this.__chain = v;
		else if (k == "pos")this.__pos = v;
		else if (k == "is_await")this.__is_await = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.__name;
		else if (k == "value")return this.__value;
		else if (k == "chain")return this.__chain;
		else if (k == "pos")return this.__pos;
		else if (k == "is_await")return this.__is_await;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Annotations.LambdaChain";
	},
});
Object.assign(Runtime.Annotations.LambdaChain, use("Runtime.CoreStruct"));
Object.assign(Runtime.Annotations.LambdaChain,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.LambdaChain";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Annotations.LambdaChain",
			"name": "Runtime.Annotations.LambdaChain",
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
			a.push("name");
			a.push("value");
			a.push("chain");
			a.push("pos");
			a.push("is_await");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Annotations.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Annotations.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "chain") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Annotations.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Annotations.LambdaChain",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_await") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Annotations.LambdaChain",
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
});use.add(Runtime.Annotations.LambdaChain);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Annotations == undefined) module.exports.Runtime.Annotations = {};
module.exports.Runtime.Annotations.LambdaChain = Runtime.Annotations.LambdaChain;