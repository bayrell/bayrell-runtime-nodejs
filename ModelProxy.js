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
Runtime.ModelProxy = function(ctx, container, path)
{
	if (path == undefined) path = null;
	use("Runtime.BaseObject").call(this, ctx);
	var __v0 = use("Runtime.BaseStruct");
	if (container instanceof __v0)
	{
		var __v1 = use("Runtime.Reference");
		this.container = new __v1(ctx, container);
		this.path = use("Runtime.Vector").from(["ref"]).concat(ctx, path);
	}
	else
	{
		this.container = container;
		this.path = path;
	}
};
Runtime.ModelProxy.prototype = Object.create(use("Runtime.BaseObject").prototype);
Runtime.ModelProxy.prototype.constructor = Runtime.ModelProxy;
Object.assign(Runtime.ModelProxy.prototype,
{
	/**
     * Returns path
     */
	getPath: function(ctx)
	{
		return (this.path) ? (this.path) : (use("Runtime.Vector").from([]));
	},
	/**
	 * Returns model data by path
	 */
	data: function(ctx, model_path)
	{
		if (model_path == undefined) model_path = null;
		if (model_path == null)
		{
			model_path = use("Runtime.Vector").from([]);
		}
		var __v0 = use("Runtime.rtl");
		return __v0.attr(ctx, this.container, this.getPath(ctx).concat(ctx, model_path));
	},
	attr: function(ctx, model_path)
	{
		if (model_path == undefined) model_path = null;
		return this.data(ctx, model_path);
	},
	model: function(ctx, model_path)
	{
		if (model_path == undefined) model_path = null;
		return this.data(ctx, model_path);
	},
	/**
	 * Set new model
	 */
	setNewModel: function(ctx, new_model)
	{
		var old_model = this.data(ctx);
		var __v0 = use("Runtime.rtl");
		this.container = __v0.setAttr(ctx, this.container, this.getPath(ctx), new_model);
		var __v1 = use("Runtime.rtl");
		if (__v1.method_exists(ctx, this.container, "onUpdateModel"))
		{
			this.container.onUpdateModel(ctx, this.getPath(ctx), old_model, new_model);
		}
	},
	/**
	 * Call method name
	 */
	call: function(ctx, method_name)
	{
		var args = null;
		var old_model = this.data(ctx);
		var value = null;
		if (old_model == null)
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(ctx, "model is null")
		}
		var class_name = old_model.constructor.getClassName(ctx);
		var __v0 = use("Runtime.rtl");
		var __v3 = use("Runtime.rtl");
		if (__v0.method_exists(ctx, old_model, method_name))
		{
			var __v1 = use("Runtime.rtl");
			var f = __v1.method(ctx, old_model, method_name);
			var __v2 = use("Runtime.rtl");
			value = __v2.apply(ctx, f, args);
		}
		else if (__v3.method_exists(ctx, class_name, method_name))
		{
			var __v4 = use("Runtime.rtl");
			var f = __v4.method(ctx, class_name, method_name);
			args = args.prependIm(ctx, this);
			var __v5 = use("Runtime.rtl");
			value = __v5.apply(ctx, f, args);
		}
		else
		{
			var __v6 = use("Runtime.Exceptions.FileNotFound");
			throw new __v6(ctx, class_name + use("Runtime.rtl").toStr("::") + use("Runtime.rtl").toStr(method_name), "Method")
		}
		return value;
	},
	/**
	 * Call method name
	 */
	callAsync: async function(ctx, method_name)
	{
		var args = null;
		var old_model = this.data(ctx);
		var value = null;
		if (old_model == null)
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(ctx, "model is null")
		}
		var class_name = old_model.constructor.getClassName(ctx);
		var __v0 = use("Runtime.rtl");
		var __v3 = use("Runtime.rtl");
		if (__v0.method_exists(ctx, old_model, method_name))
		{
			var __v1 = use("Runtime.rtl");
			var f = __v1.method(ctx, old_model, method_name);
			var __v2 = use("Runtime.rtl");
			value = await __v2.applyAsync(ctx, f, args);
		}
		else if (__v3.method_exists(ctx, class_name, method_name))
		{
			var __v4 = use("Runtime.rtl");
			var f = __v4.method(ctx, class_name, method_name);
			args = args.prependIm(ctx, this);
			var __v5 = use("Runtime.rtl");
			value = await __v5.applyAsync(ctx, f, args);
		}
		else
		{
			var __v6 = use("Runtime.Exceptions.FileNotFound");
			throw new __v6(ctx, class_name + use("Runtime.rtl").toStr("::") + use("Runtime.rtl").toStr(method_name), "Method")
		}
		return Promise.resolve(value);
	},
	/**
	 * Commit model
	 */
	commit: function(ctx, method_name)
	{
		var args = null;
		var old_model = this.data(ctx);
		var new_model = null;
		if (old_model == null)
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(ctx, "model is null")
		}
		var class_name = old_model.constructor.getClassName(ctx);
		var __v0 = use("Runtime.rtl");
		var __v2 = use("Runtime.rtl");
		if (__v0.method_exists(ctx, old_model, method_name))
		{
			var __v1 = use("Runtime.Callback");
			var f = new __v1(ctx, use("Runtime.Map").from({"obj":old_model,"name":method_name}));
			new_model = f.call(ctx, args);
			this.setNewModel(ctx, new_model);
		}
		else if (__v2.method_exists(ctx, class_name, method_name))
		{
			var __v3 = use("Runtime.Callback");
			var f = new __v3(ctx, use("Runtime.Map").from({"obj":class_name,"name":method_name}));
			args = args.prependIm(ctx, this);
			new_model = f.call(ctx, args);
		}
		else
		{
			var __v4 = use("Runtime.Exceptions.FileNotFound");
			throw new __v4(ctx, class_name + use("Runtime.rtl").toStr("::") + use("Runtime.rtl").toStr(method_name), "Method")
		}
	},
	/**
	 * Commit model
	 */
	commitAsync: async function(ctx, method_name)
	{
		var res = null;
		var args = null;
		var model = this.data(ctx);
		var class_name = model.constructor.getClassName(ctx);
		var __v0 = use("Runtime.rtl");
		if (__v0.method_exists(ctx, class_name, method_name))
		{
			var __v1 = use("Runtime.Callback");
			var f = new __v1(ctx, use("Runtime.Map").from({"obj":class_name,"name":method_name}));
			args = args.prependIm(ctx, this);
			res = await f.callAsync(ctx, args);
		}
		else
		{
			var __v2 = use("Runtime.Exceptions.FileNotFound");
			throw new __v2(ctx, class_name + use("Runtime.rtl").toStr("::") + use("Runtime.rtl").toStr(method_name), "Method")
		}
		return Promise.resolve(res);
	},
	/**
	 * Get child model
	 */
	proxy: function(ctx, path)
	{
		var __v0 = use("Runtime.rtl");
		if (__v0.isString(ctx, path))
		{
			path = use("Runtime.Vector").from([path]);
		}
		var __v0 = use("Runtime.ModelProxy");
		return new __v0(ctx, this.container, this.getPath(ctx).concat(ctx, path));
	},
	/**
	 * Get parent proxy
	 */
	parentProxy: function(ctx)
	{
		var __v0 = use("Runtime.ModelProxy");
		return new __v0(ctx, this.container, this.getPath(ctx).removeLastIm(ctx));
	},
	/**
	 * fork proxy
	 */
	fork: function(ctx, path)
	{
		var __v0 = use("Runtime.rtl");
		if (__v0.isString(ctx, path))
		{
			path = use("Runtime.Vector").from([path]);
		}
		var __v0 = use("Runtime.ModelProxy");
		return new __v0(ctx, this.container, path);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseObject").prototype._init.call(this,ctx);
		this.container = null;
		this.path = null;
	},
});
Object.assign(Runtime.ModelProxy, use("Runtime.BaseObject"));
Object.assign(Runtime.ModelProxy,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.ModelProxy";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
});use.add(Runtime.ModelProxy);
module.exports = Runtime.ModelProxy;