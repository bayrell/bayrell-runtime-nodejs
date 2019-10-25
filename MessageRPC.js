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
Runtime.MessageRPC = function(__ctx)
{
	use("Runtime.Message").apply(this, arguments);
};
Runtime.MessageRPC.prototype = Object.create(use("Runtime.Message").prototype);
Runtime.MessageRPC.prototype.constructor = Runtime.MessageRPC;
Object.assign(Runtime.MessageRPC.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__code = 0;
		if (a.indexOf("code") == -1) defProp(this, "code");
		this.__error = "";
		if (a.indexOf("error") == -1) defProp(this, "error");
		this.__response = null;
		if (a.indexOf("response") == -1) defProp(this, "response");
		this.__logs = null;
		if (a.indexOf("logs") == -1) defProp(this, "logs");
		use("Runtime.Message").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.MessageRPC"))
		{
			this.__code = o.__code;
			this.__error = o.__error;
			this.__response = o.__response;
			this.__logs = o.__logs;
		}
		use("Runtime.Message").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "code")this.__code = v;
		else if (k == "error")this.__error = v;
		else if (k == "response")this.__response = v;
		else if (k == "logs")this.__logs = v;
		else use("Runtime.Message").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "code")return this.__code;
		else if (k == "error")return this.__error;
		else if (k == "response")return this.__response;
		else if (k == "logs")return this.__logs;
		return use("Runtime.Message").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
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
	isSuccess: function(__ctx, msg)
	{
		var __v0 = use("Runtime.RuntimeConstant");
		return msg.code >= __v0.ERROR_OK;
	},
	/**
	 * Set success result
	 * @param primitive res
	 * @return Message
	 */
	success: function(__ctx, response)
	{
		var __v0 = use("Runtime.Message");
		var __v1 = use("Runtime.RuntimeConstant");
		return new __v0(__ctx, use("Runtime.Dict").from({"code":__v1.ERROR_OK,"error":"","response":response}));
	},
	/**
	 * Set fail result
	 * @param primitive res
	 * @return Message
	 */
	fail: function(__ctx, error, code, response)
	{
		if (error == undefined) error = "";
		if (code == undefined) code = -1;
		if (response == undefined) response = null;
		var __v0 = use("Runtime.Message");
		return new __v0(__ctx, use("Runtime.Dict").from({"code":code,"error":error,"response":response}));
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
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.MessageRPC",
			"name": "Runtime.MessageRPC",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("code");
			a.push("error");
			a.push("response");
			a.push("logs");
		}
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
});use.add(Runtime.MessageRPC);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.MessageRPC = Runtime.MessageRPC;