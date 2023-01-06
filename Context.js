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
			throw new __v0(ctx, "Provider + '" + provider_name + "' not found")
		}
		return this.providers.get(ctx, provider_name);
	},
	/**
	 * Return environment
	 */
	env: function(ctx, name)
	{
		var value = Runtime.rtl.get(ctx, this.environments, name);
		var __v0 = use("Runtime.Hooks.AppHook");
		var hook_res = this.callHook(ctx, __v0.ENV, use("Runtime.Dict").from({"name":name,"value":value}));
		return Runtime.rtl.get(ctx, hook_res, "value");
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
		/* Get modules */
		var modules = c.modules;
		if (modules.indexOf(ctx, "Runtime"))
		{
			modules = modules.prependIm(ctx, "Runtime");
		}
		/* Get modules entities */
		var entities = this.constructor.getEntitiesFromModules(ctx, modules);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entities"]), entities);
		/* Create providers */
		var __v0 = use("Runtime.lib");
		var providers = c.entities.filter(ctx, __v0.isInstance(ctx, "Runtime.Provider"));
		for (var i = 0;i < providers.count(ctx);i++)
		{
			var info = Runtime.rtl.get(ctx, providers, i);
			if (info.value)
			{
				var __v1 = use("Runtime.rtl");
				var provider = __v1.newInstance(ctx, info.value);
				c = c.addProvider(ctx, info.name, provider);
			}
		}
		/* Create app */
		if (this.entry_point != "")
		{
			var __v1 = use("Runtime.rtl");
			c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["app"]), __v1.newInstance(ctx, this.entry_point));
		}
		/* Init hooks */
		/*
		var hook = c.provider("hook");
		if (hook)
		{
			await hook.init();
		}
		*/
		/* Init providers */
		var providers_names = this.providers.keys(ctx);
		for (var i = 0;i < providers_names.count(ctx);i++)
		{
			var provider_name = Runtime.rtl.get(ctx, providers_names, i);
			var provider = Runtime.rtl.get(ctx, this.providers, provider_name);
			c = await provider.init(ctx, c);
		}
		/* Hook init app */
		var __v1 = use("Runtime.Hooks.AppHook");
		hook_res = await c.callAsyncHook(ctx, __v1.INIT, use("Runtime.Dict").from({"context":c}));
		c = Runtime.rtl.get(ctx, hook_res, "context");
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
	 * Run context
	 */
	run: async function(ctx)
	{
		var code = 0;
		/* Start providers */
		var providers_names = this.providers.keys(ctx);
		for (var i = 0;i < providers_names.count(ctx);i++)
		{
			var provider_name = Runtime.rtl.get(ctx, providers_names, i);
			var provider = Runtime.rtl.get(ctx, this.providers, provider_name);
			if (!provider.started)
			{
				await provider.start(ctx);
			}
		}
		/* Run app */
		if (this.app == null)
		{
			return Promise.resolve();
		}
		/* Hook start app */
		var __v0 = use("Runtime.Hooks.AppHook");
		await this.callAsyncHook(ctx, __v0.START, use("Runtime.Dict").from({}));
		/* Start app */
		var __v1 = use("Runtime.rtl");
		if (__v1.method_exists(ctx, this.app, "start"))
		{
			await this.app.start(ctx);
		}
		/* Run entry_point */
		var __v1 = use("Runtime.rtl");
		if (__v1.method_exists(ctx, this.app, "main"))
		{
			code = await this.app.main(ctx);
		}
		return Promise.resolve(code);
	},
	/**
	 * Call hook
	 */
	callHook: function(ctx, hook_name, d)
	{
		return d;
	},
	/**
	 * Call async hook
	 */
	callAsyncHook: async function(ctx, hook_name, d)
	{
		return Promise.resolve(d);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.app = null;
		this.base_path = "";
		this.entry_point = "";
		this.cli_args = use("Runtime.Collection").from([]);
		this.environments = use("Runtime.Dict").from({});
		this.modules = use("Runtime.Collection").from([]);
		this.providers = use("Runtime.Dict").from({});
		this.entities = use("Runtime.Collection").from([]);
		this.settings = use("Runtime.Dict").from({});
		this.start_time = 0;
		this.tz = "UTC";
		this.initialized = false;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Context"))
		{
			this.app = o.app;
			this.base_path = o.base_path;
			this.entry_point = o.entry_point;
			this.cli_args = o.cli_args;
			this.environments = o.environments;
			this.modules = o.modules;
			this.providers = o.providers;
			this.entities = o.entities;
			this.settings = o.settings;
			this.start_time = o.start_time;
			this.tz = o.tz;
			this.initialized = o.initialized;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "app")this.app = v;
		else if (k == "base_path")this.base_path = v;
		else if (k == "entry_point")this.entry_point = v;
		else if (k == "cli_args")this.cli_args = v;
		else if (k == "environments")this.environments = v;
		else if (k == "modules")this.modules = v;
		else if (k == "providers")this.providers = v;
		else if (k == "entities")this.entities = v;
		else if (k == "settings")this.settings = v;
		else if (k == "start_time")this.start_time = v;
		else if (k == "tz")this.tz = v;
		else if (k == "initialized")this.initialized = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "app")return this.app;
		else if (k == "base_path")return this.base_path;
		else if (k == "entry_point")return this.entry_point;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "environments")return this.environments;
		else if (k == "modules")return this.modules;
		else if (k == "providers")return this.providers;
		else if (k == "entities")return this.entities;
		else if (k == "settings")return this.settings;
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
		for (var i = 0;i < modules.count(ctx);i++)
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
		var __v0 = use("Runtime.rtl");
		var instance = __v0.newInstance(ctx, this.getClassName(ctx), use("Runtime.Collection").from([d]));
		return instance;
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
		if ((f&3)==3)
		{
			a.push("app");
			a.push("base_path");
			a.push("entry_point");
			a.push("cli_args");
			a.push("environments");
			a.push("modules");
			a.push("providers");
			a.push("entities");
			a.push("settings");
			a.push("start_time");
			a.push("tz");
			a.push("initialized");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "app") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "base_path") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entry_point") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cli_args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "environments") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "providers") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.BaseObject"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseStruct"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "settings") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["var"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return Dict.from({
			"t": "bool",
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
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Context);
module.exports = Runtime.Context;