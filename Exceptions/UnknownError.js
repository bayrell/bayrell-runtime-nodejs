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
Runtime.Exceptions.UnknownError = function(ctx, context, prev)
{
	if (context == undefined) context = null;
	if (prev == undefined) prev = null;
	var __v0 = use("Runtime.rtl");
	var __v1 = use("Runtime.RuntimeConstant");
	use("Runtime.Exceptions.RuntimeException").call(this, ctx, __v0.translate(ctx, "Unknown error", null, "", context), __v1.ERROR_UNKNOWN, context, prev);
};
Runtime.Exceptions.UnknownError.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Runtime.Exceptions.UnknownError.prototype.constructor = Runtime.Exceptions.UnknownError;
Object.assign(Runtime.Exceptions.UnknownError.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Exceptions.UnknownError"))
		{
		}
		use("Runtime.Exceptions.RuntimeException").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime.Exceptions.RuntimeException").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Exceptions.RuntimeException").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Exceptions.UnknownError";
	},
});
Object.assign(Runtime.Exceptions.UnknownError, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.UnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.UnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.UnknownError",
			"name": "Runtime.Exceptions.UnknownError",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
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
});use.add(Runtime.Exceptions.UnknownError);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Exceptions == undefined) module.exports.Runtime.Exceptions = {};
module.exports.Runtime.Exceptions.UnknownError = Runtime.Exceptions.UnknownError;