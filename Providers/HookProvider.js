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
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.HookProvider = function(ctx)
{
	use("Runtime.BaseProvider").apply(this, arguments);
};
Runtime.Providers.HookProvider.prototype = Object.create(use("Runtime.BaseProvider").prototype);
Runtime.Providers.HookProvider.prototype.constructor = Runtime.Providers.HookProvider;
Object.assign(Runtime.Providers.HookProvider.prototype,
{
	/**
	 * Init provider
	 */
	init: async function(ctx, c)
	{
		var __v0 = use("Runtime.lib");
		var hooks = c.entities.filter(ctx, __v0.isInstance(ctx, "Runtime.Entity.Hook"));
		var __v1 = use("Runtime.Vector");
		var base_hooks = new __v1(ctx);
		for (var i = 0;i < hooks.count(ctx);i++)
		{
			var hook = Runtime.rtl.get(ctx, hooks, i);
			var __v2 = use("Runtime.rtl");
			var base_hook = __v2.newInstance(ctx, hook.name);
			base_hooks.pushValue(ctx, base_hook);
			base_hook.hook = this;
			base_hook.register_hooks(ctx);
			base_hooks.pushValue(ctx, base_hook);
		}
		this.base_hooks = base_hooks.toCollection(ctx);
		return Promise.resolve(c);
	},
	/**
	 * Start provider
	 */
	start: async function(ctx)
	{
	},
	/**
	 * Register hook
	 */
	register: function(ctx, hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 0;
		if (!this.hooks.has(ctx, hook_name))
		{
			var __v0 = use("Runtime.Map");
			this.hooks.setValue(ctx, hook_name, new __v0(ctx));
		}
		var priorities = Runtime.rtl.get(ctx, this.hooks, hook_name);
		if (!priorities.has(ctx, priority))
		{
			var __v0 = use("Runtime.Vector");
			priorities.setValue(ctx, priority, new __v0(ctx));
		}
		var methods_list = priorities.get(ctx, priority);
		methods_list.pushValue(ctx, use("Runtime.Dict").from({"obj":obj,"method_name":method_name}));
	},
	/**
	 * Remove hook
	 */
	remove: function(ctx, hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 0;
		if (!this.hooks.has(ctx, hook_name))
		{
			var __v0 = use("Runtime.Map");
			this.hooks.setValue(ctx, hook_name, new __v0(ctx));
		}
		var priorities = Runtime.rtl.get(ctx, this.hooks, hook_name);
		if (!priorities.has(ctx, priority))
		{
			var __v0 = use("Runtime.Vector");
			priorities.setValue(ctx, priority, new __v0(ctx));
		}
		var methods_list = priorities.get(ctx, priority);
		var index = methods_list.find(ctx, (ctx, info) => 
		{
			return Runtime.rtl.get(ctx, info, "obj") == obj && Runtime.rtl.get(ctx, info, "method_name") == method_name;
		});
		if (index > -1)
		{
			methods_list.removePosition(ctx, index);
		}
	},
	/**
	 * Returns method list
	 */
	getMethods: function(ctx, hook_name)
	{
		if (!this.hooks.has(ctx, hook_name))
		{
			return use("Runtime.Collection").from([]);
		}
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		var priorities = Runtime.rtl.get(ctx, this.hooks, hook_name);
		var priorities_keys = priorities.keys(ctx).sort(ctx);
		for (var i = 0;i < priorities_keys.count(ctx);i++)
		{
			var priority = Runtime.rtl.get(ctx, priorities_keys, i);
			var methods_list = priorities.get(ctx, priority);
			res.appendVector(ctx, methods_list);
		}
		return res.toCollection(ctx);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseProvider").prototype._init.call(this,ctx);
		var __v0 = use("Runtime.Map");
		this.base_hooks = use("Runtime.Collection").from([]);
		this.hooks = new __v0(ctx);
	},
});
Object.assign(Runtime.Providers.HookProvider, use("Runtime.BaseProvider"));
Object.assign(Runtime.Providers.HookProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.HookProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
		a.push("base_hooks");
		a.push("hooks");
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "base_hooks") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseHook"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "hooks") return Dict.from({
			"t": "Runtime.Map",
			"s": ["Runtime.Map"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"init",
			"start",
			"register",
			"remove",
			"getMethods",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Providers.HookProvider);
module.exports = Runtime.Providers.HookProvider;