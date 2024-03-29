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
Runtime.Context = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.Context.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Add provider
	 */
	addProvider: function(ctx, provider_name, provider)
	{
		var c = this;
		if (this.providers.has(ctx, provider_name))
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(ctx, "Provider + '" + provider_name + "' already registered")
		}
		var __v0 = use("Runtime.BaseProvider");
		if (!(provider instanceof __v0))
		{
			var __v1 = use("Runtime.Exceptions.RuntimeException");
			throw new __v1(ctx, "Provider + '" + provider_name + "' must be intstanceof BaseProvider")
		}
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["providers"]), c.providers.setIm(ctx, provider_name, provider));
		return c;
	},
	/**
	 * Returns provider by name
	 */
	provider: function(ctx, provider_name)
	{
		if (!this.providers.has(ctx, provider_name))
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(ctx, "Provider '" + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr("' not found"))
		}
		return this.providers.get(ctx, provider_name);
	},
	/**
	 * Return environment
	 */
	env: function(ctx, name)
	{
		var value = Runtime.rtl.attr(ctx, this.environments, name);
		var __v0 = use("Runtime.Hooks.RuntimeHook");
		var hook_res = this.callHook(ctx, __v0.ENV, use("Runtime.Map").from({"name":name,"value":value}));
		return Runtime.rtl.attr(ctx, hook_res, "value");
	},
	/**
	 * Init
	 */
	init: async function(ctx)
	{
		var hook_res;
		var c = this;
		if (c.initialized)
		{
			return Promise.resolve(c);
		}
		/* Create app */
		if (c.entry_point != "")
		{
			var __v0 = use("Runtime.rtl");
			c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["app"]), __v0.newInstance(ctx, c.entry_point));
		}
		/* Add start modules */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["start_modules"]), c.modules);
		/* Get modules */
		var modules = c.modules;
		if (modules.indexOf(ctx, "Runtime"))
		{
			modules = modules.prependIm(ctx, "Runtime");
		}
		/* Extends modules */
		var modules = this.constructor.getRequiredModules(ctx, modules);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["modules"]), modules);
		/* Extends app modules */
		var __v0 = use("Runtime.rtl");
		if (c.app != null && __v0.method_exists(ctx, c.app, "modules"))
		{
			c = await c.app.modules(ctx, c);
		}
		/* Get modules entities */
		var entities = this.constructor.getEntitiesFromModules(ctx, c.modules);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entities"]), entities);
		/* Create providers */
		var __v0 = use("Runtime.lib");
		var providers = c.entities.filter(ctx, __v0.isInstance(ctx, "Runtime.Entity.Provider"));
		for (var i = 0; i < providers.count(ctx); i++)
		{
			var info = Runtime.rtl.attr(ctx, providers, i);
			if (info.value)
			{
				var provider = null;
				var __v1 = use("Runtime.BaseProvider");
				var __v2 = use("Runtime.rtl");
				if (info.value instanceof __v1)
				{
					provider = info.value;
				}
				else if (__v2.isString(ctx, info.value))
				{
					var __v3 = use("Runtime.rtl");
					provider = __v3.newInstance(ctx, info.value);
				}
				if (provider)
				{
					c = c.addProvider(ctx, info.name, provider);
				}
				else if (info.value)
				{
					var __v1 = use("Runtime.Exceptions.RuntimeException");
					throw new __v1(ctx, "Wrong declare provider '" + use("Runtime.rtl").toStr(info.name) + use("Runtime.rtl").toStr("'"))
				}
			}
		}
		/* Init providers */
		var providers_names = c.providers.keys(ctx);
		for (var i = 0; i < providers_names.count(ctx); i++)
		{
			var provider_name = Runtime.rtl.attr(ctx, providers_names, i);
			var provider = Runtime.rtl.attr(ctx, c.providers, provider_name);
			c = await provider.init(ctx, c);
		}
		/* Hook init app */
		var __v1 = use("Runtime.Hooks.RuntimeHook");
		hook_res = await c.callAsyncHook(ctx, __v1.INIT, use("Runtime.Map").from({"context":c}));
		c = Runtime.rtl.attr(ctx, hook_res, "context");
		/* Init app */
		var __v2 = use("Runtime.rtl");
		if (c.app != null && __v2.method_exists(ctx, c.app, "init"))
		{
			c = await c.app.init(ctx, c);
		}
		/* Set initialized */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["initialized"]), true);
		return Promise.resolve(c);
	},
	/**
	 * Start context
	 */
	start: async function(ctx)
	{
		/* Start providers */
		var providers_names = this.providers.keys(ctx);
		for (var i = 0; i < providers_names.count(ctx); i++)
		{
			var provider_name = Runtime.rtl.attr(ctx, providers_names, i);
			var provider = Runtime.rtl.attr(ctx, this.providers, provider_name);
			if (!provider.started)
			{
				await provider.start(ctx);
				provider.started = true;
			}
		}
		/* Hook start app */
		var __v0 = use("Runtime.Hooks.RuntimeHook");
		await this.callAsyncHook(ctx, __v0.START, use("Runtime.Map").from({}));
		/* Start app */
		var __v1 = use("Runtime.rtl");
		if (this.app && __v1.method_exists(ctx, this.app, "start"))
		{
			await this.app.start(ctx);
		}
		/* Hook launched app */
		var __v1 = use("Runtime.Hooks.RuntimeHook");
		await this.callAsyncHook(ctx, __v1.LAUNCHED, use("Runtime.Map").from({}));
	},
	/**
	 * Run context
	 */
	run: async function(ctx)
	{
		var code = 0;
		/* Run app */
		if (this.app == null)
		{
			return Promise.resolve();
		}
		/* Run entry_point */
		var __v0 = use("Runtime.rtl");
		if (__v0.method_exists(ctx, this.app, "main"))
		{
			/* Hook launched app */
			var __v1 = use("Runtime.Hooks.RuntimeHook");
			await this.callAsyncHook(ctx, __v1.RUN, use("Runtime.Map").from({}));
			code = await this.app.main(ctx);
		}
		return Promise.resolve(code);
	},
	/**
	 * Call hook
	 */
	callHook: function(ctx, hook_name, d)
	{
		var hook = this.provider(ctx, "hook");
		var methods_list = hook.getMethods(ctx, hook_name);
		for (var i = 0; i < methods_list.count(ctx); i++)
		{
			var info = Runtime.rtl.attr(ctx, methods_list, i);
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, Runtime.rtl.attr(ctx, info, "obj"), Runtime.rtl.attr(ctx, info, "method_name"));
			d = f(ctx, d);
		}
		return d;
	},
	/**
	 * Call async hook
	 */
	callAsyncHook: async function(ctx, hook_name, d)
	{
		var hook = this.provider(ctx, "hook");
		var methods_list = hook.getMethods(ctx, hook_name);
		for (var i = 0; i < methods_list.count(ctx); i++)
		{
			var info = Runtime.rtl.attr(ctx, methods_list, i);
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, Runtime.rtl.attr(ctx, info, "obj"), Runtime.rtl.attr(ctx, info, "method_name"));
			d = await f(ctx, d);
		}
		return Promise.resolve(d);
	},
	/**
	 * Translate message
	 */
	translate: function(ctx, module, s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		return this.format(ctx, s, params);
	},
	/**
	 * Format string
	 */
	format: function(ctx, s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		params.each(ctx, (ctx, value, key) => 
		{
			var __v0 = use("Runtime.rs");
			s = __v0.replace(ctx, "%" + use("Runtime.rtl").toStr(key) + use("Runtime.rtl").toStr("%"), value, s);
		});
		return s;
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.app = null;
		this.base_path = "";
		this.entry_point = "";
		this.start_modules = use("Runtime.Vector").from([]);
		this.cli_args = use("Runtime.Vector").from([]);
		this.environments = use("Runtime.Map").from({});
		this.modules = use("Runtime.Vector").from([]);
		this.providers = use("Runtime.Map").from({});
		this.entities = use("Runtime.Vector").from([]);
		this.start_time = 0;
		this.tz = "UTC";
		this.initialized = false;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "app")return this.app;
		else if (k == "base_path")return this.base_path;
		else if (k == "entry_point")return this.entry_point;
		else if (k == "start_modules")return this.start_modules;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "environments")return this.environments;
		else if (k == "modules")return this.modules;
		else if (k == "providers")return this.providers;
		else if (k == "entities")return this.entities;
		else if (k == "start_time")return this.start_time;
		else if (k == "tz")return this.tz;
		else if (k == "initialized")return this.initialized;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.Context, use("Runtime.BaseStruct"));
Object.assign(Runtime.Context,
{
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(ctx, modules)
	{
		var __v0 = use("Runtime.Vector");
		var entities = new __v0(ctx);
		for (var i = 0; i < modules.count(ctx); i++)
		{
			var module_class_name = modules.item(ctx, i) + use("Runtime.rtl").toStr(".ModuleDescription");
			var __v1 = use("Runtime.rtl");
			if (__v1.method_exists(ctx, module_class_name, "entities"))
			{
				var __v2 = use("Runtime.rtl");
				var f = __v2.method(ctx, module_class_name, "entities");
				var arr = f(ctx);
				entities.appendVector(ctx, arr);
			}
		}
		return entities.removeDuplicates(ctx).toCollection(ctx);
	},
	/**
	 * Create context
	 */
	create: function(ctx, d)
	{
		var __v0 = use("Runtime.Dict");
		if (!(d instanceof __v0))
		{
			var __v1 = use("Runtime.Dict");
			d = __v1.from(d);
		}
		if (!d.has(ctx, "start_time"))
		{
			d = d.setIm(ctx, "start_time", Date.now());
		}
		let Collection = use("Runtime.Collection");
		let Dict = use("Runtime.Dict");
		
		if (!d.has(ctx, "cli_args"))
		{
			d = d.setIm(ctx, "cli_args", Collection.from(process.argv.slice(1)));
		}
		if (!d.has(ctx, "base_path"))
		{
			d = d.setIm(ctx, "base_path", process.cwd());
		}
		if (!d.has(ctx, "environments"))
		{
			d = d.setIm(ctx, "environments", Dict.from(process.env));
		}
		if (d.has(ctx, "modules"))
		{
			var modules = d.get(ctx, "modules");
			var __v0 = use("Runtime.Collection");
			if (!(modules instanceof __v0))
			{
				var __v1 = use("Runtime.Collection");
				d = Runtime.rtl.setAttr(ctx, d, Runtime.Collection.from(["modules"]), __v1.from(modules));
			}
		}
		/* Setup default environments */
		if (!d.has(ctx, "environments"))
		{
			var __v0 = use("Runtime.Dict");
			d = Runtime.rtl.setAttr(ctx, d, Runtime.Collection.from(["environments"]), new __v0(ctx));
		}
		var env = Runtime.rtl.attr(ctx, d, "environments");
		if (!env.has(ctx, "DEBUG"))
		{
			env = Runtime.rtl.setAttr(ctx, env, Runtime.Collection.from(["DEBUG"]), false);
		}
		if (!env.has(ctx, "LOCALE"))
		{
			env = Runtime.rtl.setAttr(ctx, env, Runtime.Collection.from(["LOCALE"]), "en_US");
		}
		if (!env.has(ctx, "LOCALE_CODE"))
		{
			env = Runtime.rtl.setAttr(ctx, env, Runtime.Collection.from(["LOCALE_CODE"]), "en");
		}
		d = Runtime.rtl.setAttr(ctx, d, Runtime.Collection.from(["environments"]), env);
		var __v0 = use("Runtime.rtl");
		var instance = __v0.newInstance(ctx, this.getClassName(ctx), use("Runtime.Vector").from([d]));
		return instance;
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(ctx, res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(ctx, filter);
		}
		for (var i = 0; i < modules.count(ctx); i++)
		{
			var module_name = modules.item(ctx, i);
			if (cache.get(ctx, module_name, false) == false)
			{
				cache.setValue(ctx, module_name, true);
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(ctx, module_name + use("Runtime.rtl").toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f(ctx);
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys(ctx);
					this._getRequiredModules(ctx, res, cache, sub_modules);
				}
				res.pushValue(ctx, module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(ctx, modules)
	{
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		var __v1 = use("Runtime.Map");
		var cache = new __v1(ctx);
		this._getRequiredModules(ctx, res, cache, modules);
		res = res.removeDuplicates(ctx);
		return res.toCollection(ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		a.push("app");
		a.push("base_path");
		a.push("entry_point");
		a.push("start_modules");
		a.push("cli_args");
		a.push("environments");
		a.push("modules");
		a.push("providers");
		a.push("entities");
		a.push("start_time");
		a.push("tz");
		a.push("initialized");
		return use("Runtime.Vector").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
		];
		return use("Runtime.Vector").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Context);
module.exports = Runtime.Context;