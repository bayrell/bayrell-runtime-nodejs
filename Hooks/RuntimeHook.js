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
if (typeof Runtime.Hooks == 'undefined') Runtime.Hooks = {};
Runtime.Hooks.RuntimeHook = function(ctx)
{
	use("Runtime.BaseHook").apply(this, arguments);
};
Runtime.Hooks.RuntimeHook.prototype = Object.create(use("Runtime.BaseHook").prototype);
Runtime.Hooks.RuntimeHook.prototype.constructor = Runtime.Hooks.RuntimeHook;
Object.assign(Runtime.Hooks.RuntimeHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(ctx, hook_name)
	{
		if (hook_name == this.constructor.INIT)
		{
			return "init";
		}
		if (hook_name == this.constructor.START)
		{
			return "start";
		}
		if (hook_name == this.constructor.LAUNCHED)
		{
			return "launched";
		}
		if (hook_name == this.constructor.ENV)
		{
			return "env";
		}
		return "";
	},
	/**
	 * Init context
	 */
	init: async function(ctx, d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init context
	 */
	start: async function(ctx, d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init context
	 */
	env: function(ctx, d)
	{
		return d;
	},
});
Object.assign(Runtime.Hooks.RuntimeHook, use("Runtime.BaseHook"));
Object.assign(Runtime.Hooks.RuntimeHook,
{
	INIT: "runtime::init",
	START: "runtime::start",
	LAUNCHED: "runtime::launched",
	ENV: "runtime::env",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Hooks.RuntimeHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
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
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "INIT") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "START") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LAUNCHED") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ENV") return Dict.from({
			"t": "string",
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
			"init",
			"start",
			"env",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Hooks.RuntimeHook);
module.exports = Runtime.Hooks.RuntimeHook;