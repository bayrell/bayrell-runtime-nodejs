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
Runtime.Exceptions.FileNotFound = function(ctx, name, object, code, prev)
{
	if (object == undefined) object = "File";
	if (code == undefined) code = -5;
	if (prev == undefined) prev = null;
	use("Runtime.Exceptions.RuntimeException").call(this, ctx, ctx.constructor.translate(ctx, "Runtime", "%object% '%name%' not found", use("Runtime.Dict").from({"name":name,"object":object})), code, prev);
};
Runtime.Exceptions.FileNotFound.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Runtime.Exceptions.FileNotFound.prototype.constructor = Runtime.Exceptions.FileNotFound;
Object.assign(Runtime.Exceptions.FileNotFound.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Exceptions.FileNotFound"))
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
		return "Runtime.Exceptions.FileNotFound";
	},
});
Object.assign(Runtime.Exceptions.FileNotFound, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.FileNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.FileNotFound";
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
			"class_name": "Runtime.Exceptions.FileNotFound",
			"name": "Runtime.Exceptions.FileNotFound",
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
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
});use.add(Runtime.Exceptions.FileNotFound);
module.exports = Runtime.Exceptions.FileNotFound;