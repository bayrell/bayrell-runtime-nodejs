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
Runtime.BaseHook = function(ctx)
{
	use("Runtime.BaseObject").apply(this, arguments);
};
Runtime.BaseHook.prototype = Object.create(use("Runtime.BaseObject").prototype);
Runtime.BaseHook.prototype.constructor = Runtime.BaseHook;
Object.assign(Runtime.BaseHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(ctx, hook_name)
	{
		return "";
	},
	/**
	 * Register hook
	 */
	register: function(ctx, hook_name, priority)
	{
		if (priority == undefined) priority = 0;
		var method_name = this.getMethodName(ctx, hook_name);
		if (method_name == "")
		{
			return ;
		}
		this.hook.register(ctx, hook_name, this, method_name, priority);
	},
	/**
	 * Register hooks
	 */
	register_hooks: function(ctx)
	{
	},
	_init: function(ctx)
	{
		use("Runtime.BaseObject").prototype._init.call(this,ctx);
		this.hook = null;
	},
});
Object.assign(Runtime.BaseHook, use("Runtime.BaseObject"));
Object.assign(Runtime.BaseHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("hook");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "hook") return Dict.from({
			"t": "Runtime.Providers.HookProvider",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
			"getMethodName",
			"register",
			"register_hooks",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.BaseHook);
module.exports = Runtime.BaseHook;