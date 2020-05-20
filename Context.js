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
Runtime.Context = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Context.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		var __v0 = use("Runtime.Vector");
		this.base_path = null;
		this.entrypoint = "";
		this.enviroments = null;
		this.settings = null;
		this.modules = null;
		this.entities = null;
		this.cli_args = null;
		this.drivers = null;
		this.providers = null;
		this.tags = null;
		this.initialized = false;
		this.started = false;
		this.start_time = 0;
		this.logs = new __v0(ctx);
		this.main_class = "";
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Context"))
		{
			this.base_path = o.base_path;
			this.entrypoint = o.entrypoint;
			this.enviroments = o.enviroments;
			this.settings = o.settings;
			this.modules = o.modules;
			this.entities = o.entities;
			this.cli_args = o.cli_args;
			this.drivers = o.drivers;
			this.providers = o.providers;
			this.tags = o.tags;
			this.initialized = o.initialized;
			this.started = o.started;
			this.start_time = o.start_time;
			this.logs = o.logs;
			this.main_class = o.main_class;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "base_path")this.base_path = v;
		else if (k == "entrypoint")this.entrypoint = v;
		else if (k == "enviroments")this.enviroments = v;
		else if (k == "settings")this.settings = v;
		else if (k == "modules")this.modules = v;
		else if (k == "entities")this.entities = v;
		else if (k == "cli_args")this.cli_args = v;
		else if (k == "drivers")this.drivers = v;
		else if (k == "providers")this.providers = v;
		else if (k == "tags")this.tags = v;
		else if (k == "initialized")this.initialized = v;
		else if (k == "started")this.started = v;
		else if (k == "start_time")this.start_time = v;
		else if (k == "logs")this.logs = v;
		else if (k == "main_class")this.main_class = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_path")return this.base_path;
		else if (k == "entrypoint")return this.entrypoint;
		else if (k == "enviroments")return this.enviroments;
		else if (k == "settings")return this.settings;
		else if (k == "modules")return this.modules;
		else if (k == "entities")return this.entities;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "drivers")return this.drivers;
		else if (k == "providers")return this.providers;
		else if (k == "tags")return this.tags;
		else if (k == "initialized")return this.initialized;
		else if (k == "started")return this.started;
		else if (k == "start_time")return this.start_time;
		else if (k == "logs")return this.logs;
		else if (k == "main_class")return this.main_class;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
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
	appName: function(ctx)
	{
		return "";
	},
	/**
	 * Returns context settings
	 * @return Dict<string>
	 */
	getSettings: function(ctx, env)
	{
		return null;
	},
	/**
	 * Extends entities
	 */
	getEntities: function(ctx, entities)
	{
		return null;
	},
	/**
	 * Returns enviroment by eky
	 */
	env: function(ctx, key, def_value)
	{
		if (def_value == undefined) def_value = "";
		return (ctx, c) => 
		{
			var __v0 = new Runtime.Monad(ctx, c);
			__v0 = __v0.attr(ctx, "enviroments");
			var __v1 = use("Runtime.lib");
			__v0 = __v0.call(ctx, __v1.get(ctx, key, def_value));
			return __v0.value(ctx);
		};
	},
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	config: function(ctx, items, d)
	{
		if (d == undefined) d = null;
		return (ctx, c) => 
		{
			var __v0 = new Runtime.Monad(ctx, c);
			__v0 = __v0.attr(ctx, "settings");
			var __v1 = use("Runtime.lib");
			__v0 = __v0.call(ctx, __v1.get(ctx, "config", null));
			var __v2 = use("Runtime.lib");
			__v0 = __v0.call(ctx, __v2.attr(ctx, items, d));
			return __v0.value(ctx);
		};
	},
	/**
	 * Returns docker secret key
	 */
	secret: function(ctx, key)
	{
		return (ctx, c) => 
		{
			var __v0 = new Runtime.Monad(ctx, c);
			__v0 = __v0.attr(ctx, "settings");
			var __v1 = use("Runtime.lib");
			__v0 = __v0.call(ctx, __v1.get(ctx, key, ""));
			return __v0.value(ctx);
		};
	},
	/**
	 * Create context
	 *
	 * @params Dict env
	 * @params Collection<string> modules
	 * @params Dict settings
	 * @return Context
	 */
	create: function(ctx, main_module, env)
	{
		if (env == undefined) env = null;
		var main_module_class_name = "";
		var settings = use("Runtime.Dict").from({});
		/* Get settings */
		if (main_module)
		{
			main_module_class_name = main_module + use("Runtime.rtl").toStr(".ModuleDescription");
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, main_module_class_name, "appSettings");
			settings = f(ctx, env);
		}
		/* Context data */
		var obj = use("Runtime.Dict").from({"enviroments":env,"settings":settings,"main_class":main_module_class_name,"modules":use("Runtime.Collection").from([])});
		/* Add main module */
		if (main_module)
		{
			obj = Runtime.rtl.setAttr(ctx, obj, Runtime.Collection.from(["modules"]), obj.item(ctx, "modules").pushIm(ctx, main_module));
		}
		/* Create context */
		var ctx = this.newInstance(ctx, obj);
		return ctx;
	},
	/**
	 * Init context
	 */
	init: function(ctx, c)
	{
		if (c.initialized)
		{
			return c;
		}
		/* Extends modules */
		var modules = this.getRequiredModules(ctx, c.modules);
		/* Get modules entities */
		var entities = this.getEntitiesFromModules(ctx, modules);
		entities = entities.prependCollectionIm(ctx, this.getEntities(ctx, c.env));
		/* Base path */
		var __v0 = use("Runtime.rtl");
		var base_path = (c.base_path != "") ? (c.base_path) : (__v0.attr(ctx, c.env, use("Runtime.Collection").from(["BASE_PATH"]), "", "string"));
		/* Add entities */
		if (c.entities != null)
		{
			entities = entities.appendCollectionIm(ctx, c.entities);
		}
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entities"]), entities);
		/* Extend entities */
		var __v0 = new Runtime.Monad(ctx, c);
		__v0 = __v0.callMethod(ctx, "chain", Runtime.Collection.from(["Runtime.Entities", use("Runtime.Collection").from([c,entities])]));
		entities = __v0.value(ctx);
		entities = this.extendEntities(ctx, c, entities);
		entities = this.getRequiredEntities(ctx, entities);
		/* Get providers */
		var providers = this.getProvidersFromEntities(ctx, c, entities);
		/* Register drivers */
		var drivers = this.getDriversFromEntities(ctx, c, entities);
		return c.copy(ctx, use("Runtime.Dict").from({"modules":modules,"entities":entities,"providers":providers,"drivers":drivers,"base_path":base_path,"initialized":true}));
	},
	/**
	 * Start context
	 */
	start: function(ctx, c)
	{
		var drivers,i,driver_name,driver;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				if (c.started)
				{
					return __async_t.ret(ctx, c);
				}
				drivers = c.drivers.keys(ctx);
				return __async_t.jump(ctx, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos(ctx) == "1.0")
			{
				i = 0;
				return __async_t.jump(ctx, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos(ctx) == "1.1")
			{
				var __async_var = i < drivers.count(ctx);
				if (__async_var)
				{
					return __async_t.jump(ctx, "1.2");
				}
				return __async_t.jump(ctx, "2");
			}
			/* Loop */
			else if (__async_t.pos(ctx) == "1.2")
			{
				i++;
				driver_name = drivers.item(ctx, i);
				driver = c.drivers.item(ctx, driver_name);
				return __async_t.jump(ctx, "1.3").call(ctx, driver.startDriver(ctx),"__v0");
			}
			else if (__async_t.pos(ctx) == "1.3")
			{
				return __async_t.jump(ctx, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos(ctx) == "2")
			{
				return __async_t.ret(ctx, c.copy(ctx, use("Runtime.Dict").from({"started":true})));
			}
			return __async_t.ret_void(ctx);
		};
	},
	/* ---------------------- Driver -------------------- */
	/**
	 * Get driver
	 *
	 * @params string driver_name
	 * @return Runtime.anager
	 */
	getDriver: function(ctx, driver_name)
	{
		return (ctx, c) => 
		{
			if (c.drivers.has(ctx, driver_name))
			{
				return c.drivers.item(ctx, driver_name);
			}
			return null;
		};
	},
	/* --------------------- Provider ------------------- */
	/**
	 * Create provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	createProvider: function(ctx, provider_name, params, settings_name)
	{
		if (params == undefined) params = null;
		if (settings_name == undefined) settings_name = "default";
		return (ctx, c) => 
		{
			var provider = null;
			if (c.providers.has(ctx, provider_name))
			{
				var info = c.providers.item(ctx, provider_name);
				var __v0 = use("Runtime.Annotations.Provider");
				if (info.kind == __v0.KIND_INTERFACE)
				{
					var __v1 = use("Runtime.Exceptions.RuntimeException");
					throw new __v1(ctx, "Provider " + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr(" does not declared"))
				}
				var class_name = info.className(ctx);
				/* Set default params */
				if (params == null)
				{
					var __v0 = use("Runtime.rtl");
					params = __v0.attr(ctx, c.settings, use("Runtime.Collection").from(["providers",class_name,settings_name]));
				}
				if (params == null)
				{
					params = use("Runtime.Dict").from({});
				}
				var __v0 = use("Runtime.rtl");
				provider = __v0.newInstance(ctx, class_name, use("Runtime.Collection").from([params]));
				var __v0 = new Runtime.Monad(ctx, c);
				__v0 = __v0.callMethod(ctx, "chain", Runtime.Collection.from([class_name, use("Runtime.Collection").from([provider])]));
				provider = __v0.value(ctx);
				if (provider_name != class_name)
				{
					var __v0 = new Runtime.Monad(ctx, c);
					__v0 = __v0.callMethod(ctx, "chain", Runtime.Collection.from([provider_name, use("Runtime.Collection").from([provider])]));
					provider = __v0.value(ctx);
				}
			}
			else
			{
				var __v0 = use("Runtime.Exceptions.RuntimeException");
				throw new __v0(ctx, "Provider " + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr(" not found"))
			}
			return provider;
		};
	},
	/**
	 * Returns provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	getProvider: function(ctx, provider_name, settings_name)
	{
		if (settings_name == undefined) settings_name = "default";
		return this.createProvider(ctx, provider_name, null, settings_name);
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(ctx, chain_name, args)
	{
		return (ctx, c) => 
		{
			var entities = c.entities.filter(ctx, (ctx, item) => 
			{
				var __v0 = use("Runtime.Annotations.LambdaChain");
				return item instanceof __v0 && item.name == chain_name && item.is_async == false;
			});
			entities = entities.sortIm(ctx, (a, b) => 
			{
				return a.pos > b.pos;
			});
			for (var i = 0;i < entities.count(ctx);i++)
			{
				var item = entities.item(ctx, i);
				var item_chain_name = item.chain;
				if (item_chain_name != "")
				{
					var res = c.chain(ctx, item_chain_name, args);
					args = args.setIm(ctx, args.count(ctx) - 1, res);
				}
				else
				{
					var __v0 = use("Runtime.rs");
					var arr = __v0.split(ctx, "::", item.value);
					var class_name = arr.get(ctx, 0, "");
					var method_name = arr.get(ctx, 1, "");
					var __v0 = use("Runtime.rtl");
					var f = __v0.method(ctx, class_name, method_name);
					var __v0 = use("Runtime.rtl");
					var res = __v0.apply(ctx, f, args);
					args = args.setIm(ctx, args.count(ctx) - 1, res);
				}
			}
			var res = args.last(ctx);
			return res;
		};
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAwait: function(ctx, chain_name, args)
	{
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				return __async_t.ret(ctx, (ctx, c) => 
				{
					var entities = c.entities.filter(ctx, (ctx, item) => 
					{
						var __v0 = use("Runtime.Annotations.LambdaChain");
						return item instanceof __v0 && item.name == chain_name;
					});
					entities = entities.sortIm(ctx, (a, b) => 
					{
						return a.pos > b.pos;
					});
					for (var i = 0;i < entities.count(ctx);i++)
					{
						var item = entities.item(ctx, i);
						var item_chain_name = item.chain;
						if (item_chain_name != "")
						{
							var res = this.chainAwait(ctx, item_chain_name, args);
							args = args.setIm(ctx, args.count(ctx) - 1, res);
						}
						else
						{
							var __v0 = use("Runtime.rs");
							var arr = __v0.split(ctx, "::", item.value);
							var class_name = arr.get(ctx, 0, "");
							var method_name = arr.get(ctx, 1, "");
							var __v0 = use("Runtime.rtl");
							var f = __v0.method(ctx, class_name, method_name);
							if (item.is_async)
							{
								var __v0 = use("Runtime.rtl");
								var res = __v0.apply(ctx, f, args);
								args = args.setIm(ctx, args.count(ctx) - 1, res);
							}
							else
							{
								var __v0 = use("Runtime.rtl");
								var res = __v0.apply(ctx, f, args);
								args = args.setIm(ctx, args.count(ctx) - 1, res);
							}
						}
					}
					var res = args.last(ctx);
					return res;
				});
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Translate message
	 * @params string space - message space
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(ctx, c, space, message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		message = (params == null) ? (message) : (params.reduce(ctx, (ctx, message, value, key) => 
		{
			var __v0 = use("Runtime.rs");
			return __v0.replace(ctx, "%" + use("Runtime.rtl").toStr(key) + use("Runtime.rtl").toStr("%"), value, message);
		}, message));
		return message;
	},
	/* ----------------------- Bus ---------------------- */
	/**
	 * Send message
	 * @param Message msg
	 * @return Message
	 */
	send: function(ctx, msg)
	{
		return (ctx, c) => 
		{
			return (__async_t) =>
			{
				if (__async_t.pos(ctx) == "0")
				{
					var __v0 = new Runtime.Monad(ctx, c);
					var __v1 = use("Runtime.RuntimeConstant");
					__v0 = __v0.callMethod(ctx, "getProvider", Runtime.Collection.from([__v1.BUS_INTERFACE, "default"]));
					return __async_t.jump(ctx, "1").call(ctx, __v0.callMethodAsync(ctx, "sendMessage", Runtime.Collection.from([msg])),"__v0");
				}
				else if (__async_t.pos(ctx) == "1")
				{
					var __v0 = __async_t.getVar(ctx, "__v0");
					var __v2 = use("Runtime.MessageRPC");
					__v0 = __v0.monad(ctx, __v2.end);
					return __async_t.ret(ctx, __v0.value(ctx));
				}
				return __async_t.ret_void(ctx);
			};
		};
	},
	/**
	 * Send rpc message
	 * @param Dict items
	 * @return Message
	 */
	sendMessage: function(ctx, items)
	{
		return (ctx, c) => 
		{
			return (__async_t) =>
			{
				if (__async_t.pos(ctx) == "0")
				{
					var __v0 = new Runtime.Monad(ctx, c);
					var __v1 = use("Runtime.RuntimeConstant");
					__v0 = __v0.callMethod(ctx, "getProvider", Runtime.Collection.from([__v1.BUS_INTERFACE, "default"]));
					var __v2 = use("Runtime.MessageRPC");
					return __async_t.jump(ctx, "1").call(ctx, __v0.callMethodAsync(ctx, "sendMessage", Runtime.Collection.from([__v2.create(ctx, items)])),"__v0");
				}
				else if (__async_t.pos(ctx) == "1")
				{
					var __v0 = __async_t.getVar(ctx, "__v0");
					var __v3 = use("Runtime.MessageRPC");
					__v0 = __v0.monad(ctx, __v3.end);
					return __async_t.ret(ctx, __v0.value(ctx));
				}
				return __async_t.ret_void(ctx);
			};
		};
	},
	/* ---------------------- Logs ---------------------- */
	/**
	 * Log message
	 * @param string message
	 * @param int loglevel
	 */
	debug: function(ctx, message, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
		return (ctx, c) => 
		{
			this.logs.push(ctx, message + use("Runtime.rtl").toStr("\n"));
		};
	},
	/**
	 * Timer message
	 * @param string message
	 * @param int loglevel
	 */
	log_timer: function(ctx, message, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
		return (ctx, c) => 
		{
			var __v0 = new Runtime.Monad(ctx, c);
			__v0 = __v0.callMethod(ctx, "utime", null);
			var time = __v0.value(ctx);
			time = time - c.start_time;
			var __v0 = use("Runtime.rtl");
			var s = "[" + use("Runtime.rtl").toStr(__v0.round(ctx, time * 1000)) + use("Runtime.rtl").toStr("]ms ") + use("Runtime.rtl").toStr(message) + use("Runtime.rtl").toStr("\n");
			c.logs.push(ctx, s);
		};
	},
	/**
	 * Dump var to log
	 * @param var v
	 * @param int loglevel
	 */
	dump: function(ctx, v, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
		return (ctx, c) => 
		{
		};
	},
	/**
	 * Append logs message
	 * @param Collection<string> logs
	 */
	logAppend: function(ctx, logs)
	{
		return (ctx, c) => 
		{
			/*this.logs.appendVector(logs);*/
		};
	},
	/**
	 * Return logs
	 */
	getLogs: function(ctx)
	{
		return (ctx, c) => 
		{
			/*return this.logs.toCollection();*/
			return use("Runtime.Collection").from([]);
		};
	},
	/* ---------------------- Tags ---------------------- */
	/**
	 * Set tag
	 */
	setTagIm: function(ctx, tag_name, value)
	{
		return (ctx, c) => 
		{
			return c.copy(ctx, use("Runtime.Dict").from({"tags":c.tags.setIm(ctx, c, tag_name, value)}));
		};
	},
	/**
	 * Returns tag
	 */
	getTag: function(ctx, tag_name)
	{
		return (ctx, c) => 
		{
			return c.tags.get(ctx, c, tag_name, null);
		};
	},
	/* ---------------------- Other --------------------- */
	/**
	 * Returns unix timestamp
	 */
	time: function(ctx)
	{
	},
	/**
	 * Returns unix timestamp
	 */
	utime: function(ctx)
	{
	},
	/* -------------------- Functions ------------------- */
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
		for (var i = 0;i < modules.count(ctx);i++)
		{
			var module_name = modules.item(ctx, i);
			if (cache.get(ctx, module_name, false) == false)
			{
				cache.set(ctx, module_name, true);
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(ctx, module_name + use("Runtime.rtl").toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f(ctx);
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys(ctx);
					this._getRequiredModules(ctx, res, cache, sub_modules);
				}
				res.push(ctx, module_name);
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
		var __v0 = use("Runtime.Map");
		var cache = new __v0(ctx);
		this._getRequiredModules(ctx, res, cache, modules);
		res = res.removeDublicatesIm(ctx);
		return res.toCollection(ctx);
	},
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
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, module_class_name, "entities");
			var arr = f(ctx);
			entities.appendVector(ctx, arr);
		}
		return entities.toCollection(ctx);
	},
	/**
	 * Extend entities
	 */
	getRequiredEntities: function(ctx, entities)
	{
		var e = entities.toVector(ctx);
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item1 = entities.item(ctx, i);
			var item1_class_name = item1.getClassName(ctx);
			if (item1_class_name == "Runtime.Annotations.Entity")
			{
				var class_name = (item1.value != "") ? (item1.value) : (item1.name);
				var __v0 = use("Runtime.RuntimeUtils");
				var info = __v0.getClassIntrospection(ctx, class_name);
				if (info != null && info.class_info)
				{
					for (var j = 0;j < info.class_info.count(ctx);j++)
					{
						var item2 = info.class_info.item(ctx, j);
						var item2_class_name = item2.getClassName(ctx);
						var __v0 = use("Runtime.Annotations.Entity");
						if (item2 instanceof __v0 && item2_class_name != "Runtime.Annotations.Entity")
						{
							item2 = item2.copy(ctx, use("Runtime.Dict").from({"name":class_name}));
							e.push(ctx, item2);
						}
					}
				}
			}
		}
		return e.toCollection(ctx);
	},
	/**
	 * Returns providers from entities
	 */
	getProvidersFromEntities: function(ctx, c, entities)
	{
		var arr = entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.Provider");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var providers = new __v0(ctx);
		for (var i = 0;i < arr.count(ctx);i++)
		{
			var item = arr.item(ctx, i);
			providers.set(ctx, item.name, item);
		}
		return providers.toDict(ctx);
	},
	/**
	 * Register drivers
	 */
	getDriversFromEntities: function(ctx, c, entities)
	{
		var arr = entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.Driver");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var drivers = new __v0(ctx);
		for (var i = 0;i < arr.count(ctx);i++)
		{
			var item = arr.item(ctx, i);
			var driver_name = item.name;
			var class_name = item.value;
			if (class_name == "")
			{
				class_name = item.name;
			}
			var __v0 = use("Runtime.rtl");
			var driver = __v0.newInstance(ctx, class_name, use("Runtime.Collection").from([]));
			var __v0 = new Runtime.Monad(ctx, c);
			__v0 = __v0.callMethod(ctx, "chain", Runtime.Collection.from([class_name, use("Runtime.Collection").from([driver])]));
			driver = __v0.value(ctx);
			if (class_name != driver_name)
			{
				var __v0 = new Runtime.Monad(ctx, c);
				__v0 = __v0.callMethod(ctx, "chain", Runtime.Collection.from([driver_name, use("Runtime.Collection").from([driver])]));
				driver = __v0.value(ctx);
			}
			drivers.set(ctx, item.name, driver);
		}
		return drivers.toDict(ctx);
	},
	/**
	 * Extends entities
	 */
	extendEntities: function(ctx, c, entities)
	{
		return entities;
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Context",
			"name": "Runtime.Context",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("base_path");
			a.push("entrypoint");
			a.push("enviroments");
			a.push("settings");
			a.push("modules");
			a.push("entities");
			a.push("cli_args");
			a.push("drivers");
			a.push("providers");
			a.push("tags");
			a.push("initialized");
			a.push("started");
			a.push("start_time");
			a.push("logs");
			a.push("main_class");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "base_path") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entrypoint") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enviroments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "settings") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cli_args") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "drivers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "providers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "started") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "logs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
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
});use.add(Runtime.Context);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Context = Runtime.Context;