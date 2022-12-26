"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
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
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.base_path = "";
		this.cli_args = use("Runtime.Collection").from([]);
		this.modules = use("Runtime.Collection").from([]);
		this.enviroments = use("Runtime.Dict").from({});
		this.providers = use("Runtime.Dict").from({});
		this.entities = use("Runtime.Collection").from([]);
		this.settings = use("Runtime.Dict").from({});
		this.start_time = 0;
		this.tz = "UTC";
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Context"))
		{
			this.base_path = o.base_path;
			this.cli_args = o.cli_args;
			this.modules = o.modules;
			this.enviroments = o.enviroments;
			this.providers = o.providers;
			this.entities = o.entities;
			this.settings = o.settings;
			this.start_time = o.start_time;
			this.tz = o.tz;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "base_path")this.base_path = v;
		else if (k == "cli_args")this.cli_args = v;
		else if (k == "modules")this.modules = v;
		else if (k == "enviroments")this.enviroments = v;
		else if (k == "providers")this.providers = v;
		else if (k == "entities")this.entities = v;
		else if (k == "settings")this.settings = v;
		else if (k == "start_time")this.start_time = v;
		else if (k == "tz")this.tz = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_path")return this.base_path;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "modules")return this.modules;
		else if (k == "enviroments")return this.enviroments;
		else if (k == "providers")return this.providers;
		else if (k == "entities")return this.entities;
		else if (k == "settings")return this.settings;
		else if (k == "start_time")return this.start_time;
		else if (k == "tz")return this.tz;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.Context, use("Runtime.BaseStruct"));
Object.assign(Runtime.Context,
{
	/**
	 * Init
	 */
	init: async function(ctx, c)
	{
		ctx = c;
		if (c.initialized)
		{
			return Promise.resolve(c);
		}
		/* Base path */
		var __v0 = use("Runtime.rtl");
		var base_path = (c.base_path != "") ? (c.base_path) : (__v0.attr(ctx, c.env, use("Runtime.Collection").from(["BASE_PATH"]), "", "string"));
		/* Get modules entities */
		var entities = this.getEntitiesFromModules(ctx, c.modules);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entities"]), entities);
		return Promise.resolve(c);
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
			a.push("base_path");
			a.push("cli_args");
			a.push("modules");
			a.push("enviroments");
			a.push("providers");
			a.push("entities");
			a.push("settings");
			a.push("start_time");
			a.push("tz");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "base_path") return Dict.from({
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
		if (field_name == "modules") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enviroments") return Dict.from({
			"t": "Runtime.Dict",
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