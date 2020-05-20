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
		this.uri = "";
		this.api_name = "";
		this.space_name = "";
		this.method_name = "";
		this.data = null;
		this.code = 0;
		this.success_message = "";
		this.error = "";
		this.error_name = "";
		this.error_trace = "";
		this.response = null;
		this.logs = null;
		this.have_answer = false;
		use("Runtime.Message").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.MessageRPC"))
		{
			this.uri = o.uri;
			this.api_name = o.api_name;
			this.space_name = o.space_name;
			this.method_name = o.method_name;
			this.data = o.data;
			this.code = o.code;
			this.success_message = o.success_message;
			this.error = o.error;
			this.error_name = o.error_name;
			this.error_trace = o.error_trace;
			this.response = o.response;
			this.logs = o.logs;
			this.have_answer = o.have_answer;
		}
		use("Runtime.Message").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "uri")this.uri = v;
		else if (k == "api_name")this.api_name = v;
		else if (k == "space_name")this.space_name = v;
		else if (k == "method_name")this.method_name = v;
		else if (k == "data")this.data = v;
		else if (k == "code")this.code = v;
		else if (k == "success_message")this.success_message = v;
		else if (k == "error")this.error = v;
		else if (k == "error_name")this.error_name = v;
		else if (k == "error_trace")this.error_trace = v;
		else if (k == "response")this.response = v;
		else if (k == "logs")this.logs = v;
		else if (k == "have_answer")this.have_answer = v;
		else use("Runtime.Message").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "uri")return this.uri;
		else if (k == "api_name")return this.api_name;
		else if (k == "space_name")return this.space_name;
		else if (k == "method_name")return this.method_name;
		else if (k == "data")return this.data;
		else if (k == "code")return this.code;
		else if (k == "success_message")return this.success_message;
		else if (k == "error")return this.error;
		else if (k == "error_name")return this.error_name;
		else if (k == "error_trace")return this.error_trace;
		else if (k == "response")return this.response;
		else if (k == "logs")return this.logs;
		else if (k == "have_answer")return this.have_answer;
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
		return msg.have_answer && msg.code >= __v0.ERROR_OK;
	},
	/**
	 * Set success result
	 * @param primitive res
	 * @return Message
	 */
	success: function(ctx, response, message, code)
	{
		if (message == undefined) message = "";
		if (code == undefined) code = 1;
		return (ctx, msg) => 
		{
			return msg.copy(ctx, use("Runtime.Dict").from({"code":code,"error":"","success_message":message,"response":response}));
		};
	},
	/**
	 * Set fail result
	 * @param primitive res
	 * @return Message
	 */
	fail: function(ctx, response, error, code, error_name)
	{
		if (error == undefined) error = "";
		if (code == undefined) code = -1;
		if (error_name == undefined) error_name = "";
		return (ctx, msg) => 
		{
			return msg.copy(ctx, use("Runtime.Dict").from({"code":code,"error":error,"error_name":error_name,"response":response}));
		};
	},
	/**
	 * Set exception
	 * @param primitive res
	 * @return Message
	 */
	exception: function(ctx, e)
	{
		return (ctx, msg) => 
		{
			msg = msg.copy(ctx, use("Runtime.Dict").from({"code":e.getErrorCode(ctx),"error":e.getErrorMessage(ctx),"error_name":e.getClassName(ctx),"response":null}));
			var __v0 = use("Runtime.Exceptions.ApiException");
			if (e instanceof __v0)
			{
				msg = Runtime.rtl.setAttr(ctx, msg, Runtime.Collection.from(["response"]), e.response);
			}
			return msg;
		};
	},
	/**
	 * End pipe
	 */
	end: function(ctx, m)
	{
		if (m.err == null)
		{
			return m;
		}
		var __v0 = use("Runtime.Monad");
		var __v1 = use("Runtime.MessageRPC");
		return new __v0(ctx, new __v1(ctx, use("Runtime.Dict").from({"error":m.err.getErrorMessage(ctx),"error_name":m.err.getClassName(ctx),"code":m.err.getErrorCode(ctx),"response":m.err})));
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
			a.push("success_message");
			a.push("error");
			a.push("error_name");
			a.push("error_trace");
			a.push("response");
			a.push("logs");
			a.push("have_answer");
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
		if (field_name == "success_message") return new IntrospectionInfo(ctx, {
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
		if (field_name == "error_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.MessageRPC",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_trace") return new IntrospectionInfo(ctx, {
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
		if (field_name == "have_answer") return new IntrospectionInfo(ctx, {
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