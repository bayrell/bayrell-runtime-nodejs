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
Runtime.BusResult = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.BusResult.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.BusResult.prototype.constructor = Runtime.BusResult;
Object.assign(Runtime.BusResult.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__success = false;
		if (a.indexOf("success") == -1) defProp(this, "success");
		this.__code = 0;
		if (a.indexOf("code") == -1) defProp(this, "code");
		this.__error = "";
		if (a.indexOf("error") == -1) defProp(this, "error");
		this.__url = "";
		if (a.indexOf("url") == -1) defProp(this, "url");
		this.__api_name = "";
		if (a.indexOf("api_name") == -1) defProp(this, "api_name");
		this.__interface_name = "";
		if (a.indexOf("interface_name") == -1) defProp(this, "interface_name");
		this.__method_name = "";
		if (a.indexOf("method_name") == -1) defProp(this, "method_name");
		this.__text = "";
		if (a.indexOf("text") == -1) defProp(this, "text");
		this.__data = null;
		if (a.indexOf("data") == -1) defProp(this, "data");
		this.__params = null;
		if (a.indexOf("params") == -1) defProp(this, "params");
		this.__logs = null;
		if (a.indexOf("logs") == -1) defProp(this, "logs");
		use("Runtime.CoreStruct").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.BusResult"))
		{
			this.__success = o.__success;
			this.__code = o.__code;
			this.__error = o.__error;
			this.__url = o.__url;
			this.__api_name = o.__api_name;
			this.__interface_name = o.__interface_name;
			this.__method_name = o.__method_name;
			this.__text = o.__text;
			this.__data = o.__data;
			this.__params = o.__params;
			this.__logs = o.__logs;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "success")this.__success = v;
		else if (k == "code")this.__code = v;
		else if (k == "error")this.__error = v;
		else if (k == "url")this.__url = v;
		else if (k == "api_name")this.__api_name = v;
		else if (k == "interface_name")this.__interface_name = v;
		else if (k == "method_name")this.__method_name = v;
		else if (k == "text")this.__text = v;
		else if (k == "data")this.__data = v;
		else if (k == "params")this.__params = v;
		else if (k == "logs")this.__logs = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "success")return this.__success;
		else if (k == "code")return this.__code;
		else if (k == "error")return this.__error;
		else if (k == "url")return this.__url;
		else if (k == "api_name")return this.__api_name;
		else if (k == "interface_name")return this.__interface_name;
		else if (k == "method_name")return this.__method_name;
		else if (k == "text")return this.__text;
		else if (k == "data")return this.__data;
		else if (k == "params")return this.__params;
		else if (k == "logs")return this.__logs;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.BusResult";
	},
});
Object.assign(Runtime.BusResult, use("Runtime.CoreStruct"));
Object.assign(Runtime.BusResult,
{
	/**
	 * Returns true if success
	 * @return bool
	 */
	isSuccess: function(__ctx, bus)
	{
		var __v0 = use("Runtime.RuntimeConstant");
		return bus.success && bus.code >= __v0.ERROR_OK;
	},
	/**
	 * Set error data
	 * @param int code
	 * @param string error
	 * @return BusResult
	 */
	setError: function(__ctx, bus, error, code)
	{
		if (error == undefined) error = "";
		return bus.copy(__ctx, use("Runtime.Dict").from({"code":code,"error":error,"success":false}));
	},
	/**
	 * Set result
	 * @param primitive res
	 * @return BusResult
	 */
	setSuccess: function(__ctx, bus, res)
	{
		var __v0 = use("Runtime.RuntimeConstant");
		return bus.copy(__ctx, use("Runtime.Dict").from({"code":__v0.ERROR_OK,"error":"","success":true,"data":res}));
	},
	/**
	 * Set result
	 * @param primitive res
	 * @return BusResult
	 */
	setResult: function(__ctx, bus, res)
	{
		return bus.copy(__ctx, res.takeDict(__ctx));
	},
	/**
	 * Set result
	 * @param primitive res
	 * @return BusResult
	 */
	create: function(__ctx, res)
	{
		var __v0 = use("Runtime.BusResult");
		var __v1 = use("Runtime.RuntimeConstant");
		return new __v0(__ctx, use("Runtime.Dict").from({"code":__v1.ERROR_OK,"error":"","success":true,"data":res}));
	},
	/**
	 * Set result
	 * @param primitive res
	 * @return BusResult
	 */
	fail: function(__ctx, res, error, code)
	{
		if (error == undefined) error = "";
		if (code == undefined) code = -1;
		var __v0 = use("Runtime.BusResult");
		return new __v0(__ctx, use("Runtime.Dict").from({"code":code,"error":error,"success":false,"data":res}));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.BusResult";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.BusResult",
			"name": "Runtime.BusResult",
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
			a.push("success");
			a.push("code");
			a.push("error");
			a.push("url");
			a.push("api_name");
			a.push("interface_name");
			a.push("method_name");
			a.push("text");
			a.push("data");
			a.push("params");
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
});use.add(Runtime.BusResult);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.BusResult = Runtime.BusResult;