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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ApiException = function(ctx, message, code, response, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (response == undefined) response = null;
	if (prev == undefined) prev = null;
	use("Runtime.Exceptions.RuntimeException").call(this, ctx, message, code, prev);
	this.response = response;
};
Runtime.Exceptions.ApiException.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Runtime.Exceptions.ApiException.prototype.constructor = Runtime.Exceptions.ApiException;
Object.assign(Runtime.Exceptions.ApiException.prototype,
{
	_init: function(ctx)
	{
		this.response = null;
		use("Runtime.Exceptions.RuntimeException").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Exceptions.ApiException"))
		{
			this.response = o.response;
		}
		use("Runtime.Exceptions.RuntimeException").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "response")this.response = v;
		else use("Runtime.Exceptions.RuntimeException").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "response")return this.response;
		return use("Runtime.Exceptions.RuntimeException").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.ApiException";
	},
});
Object.assign(Runtime.Exceptions.ApiException, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.ApiException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.ApiException",
			"name": "Runtime.Exceptions.ApiException",
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
			a.push("response");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "response") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Exceptions.ApiException",
			"t": "var",
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
});use.add(Runtime.Exceptions.ApiException);
module.exports = Runtime.Exceptions.ApiException;