"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Context = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Context.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		return message;
	},
	/* ----------------------- Bus ---------------------- */
	/**
	 * Local bus call
	 * @param string class_name
	 * @param string method_name
	 * @param ApiRequest request
	 * @return var The result of the api
	 */
	busCall: function(class_name, interface_name, method_name, data)
	{
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				/*BusInterface provider = static::getProvider(this, "Runtime.Interfaces.LocalBusInterface");
		BusResult res = await provider::call(provider, this, class_name, interface_name, method_name, data);
		return res;*/
			}
			return __async_t.ret_void();
		};
	},
	/**
	 * Local bus call
	 * @param string class_name
	 * @param string method_name
	 * @param ApiRequest request
	 * @return var The result of the api
	 */
	busCallRoute: function(url, data)
	{
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				/*BusInterface provider = this.getProvider("Runtime.Interfaces.LocalBusInterface");
		BusResult res = await provider::callRoute(provider, this, url, data);
		return res;*/
			}
			return __async_t.ret_void();
		};
	},
	/* ---------------------- Logs ---------------------- */
	/**
	 * Log message
	 * @param string message
	 * @param int loglevel
	 */
	log: function(message, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
		/*this.logs.push(message ~ "\n");*/
	},
	/**
	 * Dump var to log
	 * @param var v
	 * @param int loglevel
	 */
	dump: function(v, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
	},
	/**
	 * Append logs message
	 * @param Collection<string> logs
	 */
	logAppend: function(logs)
	{
		/*this.logs.appendVector(logs);*/
	},
	/**
	 * Return logs
	 */
	getLogs: function()
	{
		/*return this.logs.toCollection();*/
		return use("Runtime.Collection").from([]);
	},
	/* ---------------------- Tags ---------------------- */
	/**
	 * Set tag
	 */
	setTagIm: function(tag_name, value)
	{
		return this.copy(use("Runtime.Dict").from({"tags":this._tags.setIm(this, tag_name, value)}));
	},
	/**
	 * Returns tag
	 */
	getTag: function(tag_name)
	{
		return this._tags.get(this, tag_name, null);
	},
	/* ---------------------- Other --------------------- */
	/**
	 * Returns unix timestamp
	 */
	time: function()
	{
	},
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__base_path = null;
		if (a.indexOf("base_path") == -1) defProp(this, "base_path");
		this.__env = null;
		if (a.indexOf("env") == -1) defProp(this, "env");
		this.__settings = null;
		if (a.indexOf("settings") == -1) defProp(this, "settings");
		this.__modules = null;
		if (a.indexOf("modules") == -1) defProp(this, "modules");
		this.__entities = null;
		if (a.indexOf("entities") == -1) defProp(this, "entities");
		this.__drivers = null;
		if (a.indexOf("drivers") == -1) defProp(this, "drivers");
		this.__providers = null;
		if (a.indexOf("providers") == -1) defProp(this, "providers");
		this.__tags = null;
		if (a.indexOf("tags") == -1) defProp(this, "tags");
		this.__initialized = false;
		if (a.indexOf("initialized") == -1) defProp(this, "initialized");
		this.__started = false;
		if (a.indexOf("started") == -1) defProp(this, "started");
		use("Runtime.CoreStruct").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Context"))
		{
			this.__base_path = o.__base_path;
			this.__env = o.__env;
			this.__settings = o.__settings;
			this.__modules = o.__modules;
			this.__entities = o.__entities;
			this.__drivers = o.__drivers;
			this.__providers = o.__providers;
			this.__tags = o.__tags;
			this.__initialized = o.__initialized;
			this.__started = o.__started;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "base_path")this.__base_path = v;
		else if (k == "env")this.__env = v;
		else if (k == "settings")this.__settings = v;
		else if (k == "modules")this.__modules = v;
		else if (k == "entities")this.__entities = v;
		else if (k == "drivers")this.__drivers = v;
		else if (k == "providers")this.__providers = v;
		else if (k == "tags")this.__tags = v;
		else if (k == "initialized")this.__initialized = v;
		else if (k == "started")this.__started = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_path")return this.__base_path;
		else if (k == "env")return this.__env;
		else if (k == "settings")return this.__settings;
		else if (k == "modules")return this.__modules;
		else if (k == "entities")return this.__entities;
		else if (k == "drivers")return this.__drivers;
		else if (k == "providers")return this.__providers;
		else if (k == "tags")return this.__tags;
		else if (k == "initialized")return this.__initialized;
		else if (k == "started")return this.__started;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Context";
	},
});
Object.assign(Runtime.Context, use("Runtime.CoreStruct"));
Object.assign(Runtime.Context,
{
	/**
	 * Returns app name
	 * @return string
	 */
	appName: function()
	{
		return "";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	getModules: function(env)
	{
		return null;
	},
	/**
	 * Extend entities
	 */
	getEntities: function(env)
	{
		return null;
	},
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	getSettings: function(env)
	{
		return null;
	},
	/**
	 * Create context
	 *
	 * @params Dict env
	 * @params Collection<string> modules
	 * @params Dict settings
	 * @return Context
	 */
	create: function(env, modules, settings)
	{
		if (modules == undefined) modules = null;
		if (settings == undefined) settings = null;
		/* Get modules */
		if (modules == null)
		{
			var m = this.getModules(env);
			modules = (m != null) ? m.keys(null) : use("Runtime.Collection").from([]);
		}
		/* Get settings */
		if (settings == null)
		{
			settings = this.getSettings(env);
		}
		/* Extends modules */
		modules = this.getRequiredModules(modules);
		/* Get modules entities */
		var entities = this.getModulesEntities(modules);
		entities = entities.prependCollectionIm(null, this.getEntities(env));
		/* Base path */
		var __v0 = use("Runtime.rtl");
		var base_path = __v0.attr(null, settings, use("Runtime.Collection").from(["base_path"]), "", "string");
		if (base_path == "")
		{
			var __v0 = use("Runtime.rtl");
			base_path = __v0.attr(null, env, use("Runtime.Collection").from(["BASE_PATH"]), "", "string");
		}
		/* Context data */
		var obj = use("Runtime.Dict").from({"env":env,"settings":settings,"modules":modules,"entities":entities,"base_path":base_path});
		/* Create context */
		var context = this.newInstance(null, obj);
		return context;
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(null, filter);
		}
		for (var i = 0;i < modules.count(null);i++)
		{
			var module_name = modules.item(null, i);
			if (cache.get(null, module_name, false) == false)
			{
				cache.set(null, module_name, true);
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(null, module_name + use("Runtime.rtl").toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f(null);
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys(null);
					this._getRequiredModules(res, cache, sub_modules);
				}
				res.push(null, module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var __v0 = use("Runtime.Vector");
		var res = new __v0(null);
		var __v0 = use("Runtime.Map");
		var cache = new __v0(null);
		this._getRequiredModules(res, cache, modules);
		res = res.removeDublicatesIm(null);
		return res.toCollection(null);
	},
	/**
	 * Returns modules entities
	 */
	getModulesEntities: function(modules)
	{
		var __v0 = use("Runtime.Vector");
		var entities = new __v0(null);
		for (var i = 0;i < modules.count(null);i++)
		{
			var module_class_name = modules.item(null, i) + use("Runtime.rtl").toStr(".ModuleDescription");
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(null, module_class_name, "entities");
			var arr = f(null);
			entities.appendVector(null, arr);
		}
		return entities.toCollection(null);
	},
	/**
	 * Extend entities
	 */
	extendEntities: function(entities, context)
	{
		var e = entities.toVector(context);
		for (var i = 0;i < entities.count(context);i++)
		{
			var item1 = entities.item(context, i);
			var item1_class_name = item1.getClassName();
			if (item1_class_name == "Runtime.Annotations.Entity")
			{
				var class_name = (item1.value != "") ? item1.value : item1.name;
				var __v0 = use("Runtime.RuntimeUtils");
				var info = __v0.getClassIntrospection(context, class_name);
				if (info.class_info)
				{
					for (var j = 0;j < info.class_info.count(context);j++)
					{
						var item2 = info.class_info.item(context, j);
						var item2_class_name = item2.getClassName();
						var __v0 = use("Runtime.Annotations.Entity");
						if (item2 instanceof __v0 && item2_class_name != "Runtime.Annotations.Entity")
						{
							item2 = item2.copy(context, use("Runtime.Dict").from({"name":class_name}));
							e.push(context, item2);
						}
					}
				}
			}
		}
		return e.toCollection(context);
	},
	/**
	 * Init context
	 */
	init: function(context)
	{
		if (context.initialized)
		{
			return context;
		}
		var entities = context.entities;
		/* Extend entities */
		entities = this.extendEntities(entities, context);
		entities = this.chain("Runtime.Entities", use("Runtime.Collection").from([context,entities]), context);
		/* Get providers */
		var providers = this.getProvidersFromEntities(context);
		/* Register drivers */
		var drivers = this.getDriversFromEntities(context);
		return context.copy(context, use("Runtime.Dict").from({"entities":entities,"providers":providers,"drivers":drivers,"initialized":true}));
	},
	/**
	 * Start context
	 */
	start: function(context)
	{
		var drivers,i,driver_name,driver;
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				if (context.started)
				{
					return __async_t.ret(__async_t, context);
				}
				drivers = context.drivers.keys(context);
				return __async_t.jump(__async_t, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos() == "1.0")
			{
				i = 0;
				return __async_t.jump(__async_t, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos() == "1.1")
			{
				var __async_var = i < drivers.count(context);
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.2");
				}
				return __async_t.jump(__async_t, "2");
			}
			/* Loop */
			else if (__async_t.pos() == "1.2")
			{
				i++;
				driver_name = drivers.item(context, i);
				driver = context.drivers.item(context, driver_name);
				return __async_t.jump(__async_t,"1.3").call(__async_t,driver.startDriver(context),"__v0");
			}
			else if (__async_t.pos() == "1.3")
			{
				return __async_t.jump(__async_t, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos() == "2")
			{
				return __async_t.ret(__async_t, context.copy(context, use("Runtime.Dict").from({"started":true})));
			}
			return __async_t.ret_void();
		};
	},
	/**
	 * Returns providers from entities
	 */
	getProvidersFromEntities: function(context)
	{
		var arr = context.entities.filter(context, (__ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.Provider");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var providers = new __v0(context);
		for (var i = 0;i < arr.count(context);i++)
		{
			var item = arr.item(context, i);
			providers.set(context, item.name, item);
		}
		return providers.toDict(context);
	},
	/**
	 * Register drivers
	 */
	getDriversFromEntities: function(context)
	{
		var arr = context.entities.filter(context, (__ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.Driver");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var drivers = new __v0(context);
		for (var i = 0;i < arr.count(context);i++)
		{
			var item = arr.item(context, i);
			var driver_name = item.name;
			var class_name = item.value;
			if (class_name == "")
			{
				class_name = item.name;
			}
			var __v0 = use("Runtime.rtl");
			var driver = __v0.newInstance(context, class_name, use("Runtime.Collection").from([]));
			driver = this.chain(context, class_name, use("Runtime.Collection").from([context,driver]));
			if (class_name != driver_name)
			{
				driver = this.chain(context, driver_name, use("Runtime.Collection").from([context,driver]));
			}
			drivers.set(context, item.name, driver);
		}
		return drivers.toDict(context);
	},
	/* ---------------------- Driver -------------------- */
	/**
	 * Get driver
	 *
	 * @params string driver_name
	 * @return Runtime.anager
	 */
	getDriver: function(context, driver_name)
	{
		if (context.drivers.has(context, driver_name))
		{
			return context.drivers.item(context, driver_name);
		}
		return null;
	},
	/* --------------------- Provider ------------------- */
	/**
	 * Create provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	createProvider: function(provider_name, params, context)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = use("Runtime.Dict").from({});
		}
		var provider = null;
		if (context.providers.has(context, provider_name))
		{
			var info = context.providers.item(context, provider_name);
			if (info.kind == "interface")
			{
				var __v0 = use("Runtime.Exceptions.RuntimeException");
				throw new __v0(context, "Provider " + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr(" does not declared"))
			}
			var class_name = info.value;
			if (class_name == "")
			{
				class_name = info.name;
			}
			var __v0 = use("Runtime.rtl");
			provider = __v0.newInstance(context, class_name, use("Runtime.Collection").from([params]));
			provider = this.chain(context, class_name, use("Runtime.Collection").from([context,provider]));
			if (provider_name != class_name)
			{
				provider = this.chain(context, provider_name, use("Runtime.Collection").from([context,provider]));
			}
		}
		else
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(context, "Provider " + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr(" not found"))
		}
		return provider;
	},
	/**
	 * Returns provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	getProvider: function(provider_name, settings_name, context)
	{
		if (settings_name == undefined) settings_name = "default";
		var __v0 = use("Runtime.rtl");
		var params = __v0.attr(context, context.settings, use("Runtime.Collection").from(["providers",provider_name,settings_name]));
		var provider = this.createProvider(provider_name, params, context);
		return provider;
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(chain_name, args, context)
	{
		var entities = context.entities.filter(context, (__ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.LambdaChain");
			return item instanceof __v0 && item.name == chain_name && item.is_async == false;
		});
		entities = entities.sortIm(context, (a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count(context);i++)
		{
			var item = entities.item(context, i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				var res = this.chain(item_chain_name, args, context);
				args = args.setIm(context, args.count(context) - 1, res);
			}
			else
			{
				var __v0 = use("Runtime.rs");
				var arr = __v0.split(context, "::", item.value);
				var class_name = arr.get(context, 0, "");
				var method_name = arr.get(context, 1, "");
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(context, class_name, method_name);
				var __v0 = use("Runtime.rtl");
				var res = __v0.apply(context, f, args);
				args = args.setIm(context, args.count(context) - 1, res);
			}
		}
		var res = args.last(context);
		return res;
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAwait: function(chain_name, args, context)
	{
		var entities,i,item,item_chain_name,res,arr,class_name,method_name,f;
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				entities = context.entities.filter(context, (__ctx, item) => 
				{
					var __v0 = use("Runtime.Annotations.LambdaChain");
					return item instanceof __v0 && item.name == chain_name;
				});
				entities = entities.sortIm(context, (a, b) => 
				{
					return a.pos > b.pos;
				});
				return __async_t.jump(__async_t, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos() == "1.0")
			{
				i = 0;
				return __async_t.jump(__async_t, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos() == "1.1")
			{
				var __async_var = i < entities.count(context);
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.2");
				}
				return __async_t.jump(__async_t, "2");
			}
			/* Loop */
			else if (__async_t.pos() == "1.2")
			{
				i++;
				item = entities.item(context, i);
				item_chain_name = item.chain;
				return __async_t.jump(__async_t, "1.3.0");
			}
			/* Start if */
			else if (__async_t.pos() == "1.3.0")
			{
				var __async_var = item_chain_name != "";
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.3.1");
				}
				return __async_t.jump(__async_t, "1.3.2");
			}
			/* If true */
			else if (__async_t.pos() == "1.3.1")
			{
				return __async_t.jump(__async_t,"1.3.3").call(__async_t,this.chainAwait(item_chain_name, args, context),"__v0");
			}
			else if (__async_t.pos() == "1.3.3")
			{
				res = __async_t.getVar("__v0");
				args = args.setIm(context, args.count(context) - 1, res);
				return __async_t.jump(__async_t, "1.4");
			}
			/* Next If */
			else if (__async_t.pos() == "1.3.2")
			{
				/* If false */
				var __v0 = use("Runtime.rs");
				arr = __v0.split(context, "::", item.value);
				class_name = arr.get(context, 0, "");
				method_name = arr.get(context, 1, "");
				var __v0 = use("Runtime.rtl");
				f = __v0.method(context, class_name, method_name);
				return __async_t.jump(__async_t, "1.3.4.0");
			}
			/* Start if */
			else if (__async_t.pos() == "1.3.4.0")
			{
				var __async_var = item.is_async;
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.3.4.1");
				}
				return __async_t.jump(__async_t, "1.3.4.2");
			}
			/* If true */
			else if (__async_t.pos() == "1.3.4.1")
			{
				var __v0 = use("Runtime.rtl");
				return __async_t.jump(__async_t,"1.3.4.3").call(__async_t,__v0.apply(context, f, args),"__v1");
			}
			else if (__async_t.pos() == "1.3.4.3")
			{
				res = __async_t.getVar("__v1");
				args = args.setIm(context, args.count(context) - 1, res);
				return __async_t.jump(__async_t, "1.3.5");
			}
			/* Next If */
			else if (__async_t.pos() == "1.3.4.2")
			{
				/* If false */
				var __v0 = use("Runtime.rtl");
				res = __v0.apply(context, f, args);
				args = args.setIm(context, args.count(context) - 1, res);
				return __async_t.jump(__async_t, "1.3.5");
			}
			/* End if */
			else if (__async_t.pos() == "1.3.5")
			{
				return __async_t.jump(__async_t, "1.4");
			}
			/* End if */
			else if (__async_t.pos() == "1.4")
			{
				return __async_t.jump(__async_t, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos() == "2")
			{
				res = args.last(context);
				return __async_t.ret(__async_t, res);
			}
			return __async_t.ret_void();
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Context",
			"name": "Runtime.Context",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("base_path");
			a.push("env");
			a.push("settings");
			a.push("modules");
			a.push("entities");
			a.push("drivers");
			a.push("providers");
			a.push("tags");
			a.push("initialized");
			a.push("started");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Context);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Context = Runtime.Context;