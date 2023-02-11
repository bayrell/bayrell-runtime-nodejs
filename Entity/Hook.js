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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Hook = function(ctx, name)
{
	use("Runtime.Entity").call(this, ctx, use("Runtime.Dict").from({"name":name}));
};
Runtime.Entity.Hook.prototype = Object.create(use("Runtime.Entity").prototype);
Runtime.Entity.Hook.prototype.constructor = Runtime.Entity.Hook;
Object.assign(Runtime.Entity.Hook.prototype,
{
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Entity").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.Entity.Hook, use("Runtime.Entity"));
Object.assign(Runtime.Entity.Hook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Hook";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
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
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
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
});use.add(Runtime.Entity.Hook);
module.exports = Runtime.Entity.Hook;