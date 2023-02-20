"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
		use("Runtime.Exceptions.RuntimeException").prototype._init.call(this,ctx);
		this.response = null;
	},
});
Object.assign(Runtime.Exceptions.ApiException, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
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
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		a.push("response");
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "response") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"constructor",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Exceptions.ApiException);
module.exports = Runtime.Exceptions.ApiException;