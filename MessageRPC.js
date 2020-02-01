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
Runtime.MessageRPC = function(ctx)
{
	use("Runtime.Message").apply(this, arguments);
};
Runtime.MessageRPC.prototype = Object.create(use("Runtime.Message").prototype);
Runtime.MessageRPC.prototype.constructor = Runtime.MessageRPC;
Object.assign(Runtime.MessageRPC.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__uri = "";
		if (a.indexOf("uri") == -1) defProp(this, "uri");
		this.__api_name = "";
		if (a.indexOf("api_name") == -1) defProp(this, "api_name");
		this.__space_name = "";
		if (a.indexOf("space_name") == -1) defProp(this, "space_name");
		this.__method_name = "";
		if (a.indexOf("method_name") == -1) defProp(this, "method_name");
		this.__data = null;
		if (a.indexOf("data") == -1) defProp(this, "data");
		this.__code = 0;
		if (a.indexOf("code") == -1) defProp(this, "code");
		this.__error = "";
		if (a.indexOf("error") == -1) defProp(this, "error");
		this.__response = null;
		if (a.indexOf("response") == -1) defProp(this, "response");
		this.__logs = null;
		if (a.indexOf("logs") == -1) defProp(this, "logs");
		this.__have_result = false;
		if (a.indexOf("have_result") == -1) defProp(this, "have_result");
		use("Runtime.Message").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.MessageRPC"))
		{
			this.__uri = o.__uri;
			this.__api_name = o.__api_name;
			this.__space_name = o.__space_name;
			this.__method_name = o.__method_name;
			this.__data = o.__data;
			this.__code = o.__code;
			this.__error = o.__error;
			this.__response = o.__response;
			this.__logs = o.__logs;
			this.__have_result = o.__have_result;
		}
		use("Runtime.Message").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uri")this.__uri = v;
		else if (k == "api_name")this.__api_name = v;
		else if (k == "space_name")this.__space_name = v;
		else if (k == "method_name")this.__method_name = v;
		else if (k == "data")this.__data = v;
		else if (k == "code")this.__code = v;
		else if (k == "error")this.__error = v;
		else if (k == "response")this.__response = v;
		else if (k == "logs")this.__logs = v;
		else if (k == "have_result")this.__have_result = v;
		else use("Runtime.Message").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uri")return this.__uri;
		else if (k == "api_name")return this.__api_name;
		else if (k == "space_name")return this.__space_name;
		else if (k == "method_name")return this.__method_name;
		else if (k == "data")return this.__data;
		else if (k == "code")return this.__code;
		else if (k == "error")return this.__error;
		else if (k == "response")return this.__response;
		else if (k == "logs")return this.__logs;
		else if (k == "have_result")return this.__have_result;
		return use("Runtime.Message").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.MessageRPC";
	},
});
Object.assign(Runtime.MessageRPC, use("Runtime.Message"));
Object.assign(Runtime.MessageRPC,
{
	/**
	 * Returns true if success
	 * @return bool
	 */
	isSuccess: function(ctx, msg)
	{
		var __v0 = use("Runtime.RuntimeConstant");
		return msg.have_result && msg.code >= __v0.ERROR_OK;
	},
	/**
	 * Set success result
	 * @param primitive res
	 * @return Message
	 */
	success: function(ctx, msg, response)
	{
		var __v0 = use("Runtime.RuntimeConstant");
		return msg.copy(ctx, use("Runtime.Dict").from({"code":__v0.ERROR_OK,"error":"","response":response,"have_result":true}));
	},
	/**
	 * Set fail result
	 * @param primitive res
	 * @return Message
	 */
	fail: function(ctx, msg, response, error, code)
	{
		if (error == undefined) error = "";
		if (code == undefined) code = -1;
		return msg.copy(ctx, use("Runtime.Dict").from({"code":code,"error":error,"response":response,"have_result":true}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.MessageRPC";
	},
	getParentClassName: function()
	{
		return "Runtime.Message";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.MessageRPC",
			"name": "Runtime.MessageRPC",
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
			a.push("uri");
			a.push("api_name");
			a.push("space_name");
			a.push("method_name");
			a.push("data");
			a.push("code");
			a.push("error");
			a.push("response");
			a.push("logs");
			a.push("have_result");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "uri") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "api_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "space_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "method_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "data") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "code") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "logs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "have_result") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
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
});use.add(Runtime.MessageRPC);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.MessageRPC = Runtime.MessageRPC;