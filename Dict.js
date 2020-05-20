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
var use = require('bayrell').use; use.platform = "nodejs";
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(ctx, map)
{
	this._map = {};
	if (map != undefined && typeof map == 'object')
	{
		if (map instanceof Runtime.Dict)
		{
			for (var i in map._map)
			{
				this._map[i] = map._map[i];
			}
		}
		else
		{
			for (var i in map)
			{
				this._map["|" + i] = map[i];
			}
		}
	}
	this.__uq__ = Symbol();
	return this;
}
Runtime._Map.prototype = Object.create(Map.prototype);
Runtime._Map.prototype.constructor = Runtime._Map;
Object.assign(Runtime._Map.prototype,
{
	toStr: function(value)
	{ 
		return use("Runtime.rtl").toStr(value);
	},
	toObject: function()
	{
		var obj = {};
		for (var key in this._map)
		{
			obj[key.substring(1)] = this._map[key];
		}
		return obj;
	},
	getClassName: function(){ return "Runtime._Map"; },
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var res = this.Instance(null);
		for (var i in map)
		{
			res._map["|" + i] = map[i];
		}
		return res;
	},
	getCurrentNamespace: function(){ return "Runtime"; },
	getCurrentClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
use.add(Runtime._Map);
Runtime.Dict = function(ctx)
{
	use("Runtime._Map").apply(this, arguments);
};
Runtime.Dict.prototype = Object.create(use("Runtime._Map").prototype);
Runtime.Dict.prototype.constructor = Runtime.Dict;
Object.assign(Runtime.Dict.prototype,
{
	/**
	 * Copy instance
	 */
	cp: function(ctx)
	{
		var new_obj = this.constructor.Instance(ctx);
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return Dict<T>
	 */
	clone: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance(ctx);
		if (fields != null)
		{
			for (var key in fields)
			{
				if (typeof obj["|" + key] == undefined)
					new_obj._map["|" + key] = this._map["|" + key];
			}
		}
		return new_obj;
	},
	/**
	 * Returns copy of Dict
	 * @param int pos - position
	 */
	copy: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance(ctx);
		new_obj._map = Object.assign({}, this._map);
		if (obj != null)
		{
			var _Dict = use("Runtime.Dict");
			if (obj instanceof _Dict) 
			{
				obj = obj._map;
				for (var key in obj)
				{
					new_obj._map[key] = obj[key];
				}
			}
			else
			{
				for (var key in obj)
				{
					new_obj._map["|" + key] = obj[key];
				}
			}
		}
		return new_obj;
	},
	/**
	 * Convert to dict
	 */
	toDict: function(ctx)
	{
		var Dict = use ("Runtime.Dict");
		return new Dict(ctx, this);
	},
	/**
	 * Convert to dict
	 */
	toMap: function(ctx)
	{
		var Map = use ("Runtime.Map");
		return new Map(ctx, this);
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	contains: function(ctx, key)
	{
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(ctx, key)
	{
		return this.contains(ctx, key);
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	get: function(ctx, key, default_value)
	{
		key = this.toStr(key);
		var val = this._map["|" + key];
		if (typeof val == "undefined") return default_value;
		return val;
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	attr: function(ctx, items, default_value)
	{
		var __v0 = use("Runtime.rtl");
		return __v0.attr(ctx, this, items, default_value);
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	item: function(ctx, key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(key);
		}
		var val = this._map["|" + key];
		if (val === null || typeof val == "undefined") return null;
		return val;
	},
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setIm: function(ctx, key, value)
	{
		var res = this.cp(ctx);
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeIm: function(ctx, key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			var res = this.cp();
			delete res._map["|" + key];
			return res;
		}
		return this;
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function(ctx)
	{
		var res = new Runtime.Collection(ctx);
		for (var key in this._map) res.push(key.substring(1));
		return res;
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function(ctx)
	{
		var res = new Runtime.Collection(ctx);
		for (var key in this._map) res.push( this._map[key] );
		return res;
	},
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	map: function(ctx, f)
	{
		var obj = this.constructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = f(ctx, this._map[key], new_key);
			obj._map[key] = new_val;
		}
		return obj;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(ctx, f)
	{
		var obj = this.contstructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(ctx, value, new_key);
			if (flag) obj._map[key] = new_val;
		}
		return obj;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(ctx, f)
	{
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(ctx, value, new_key);
		}
	},
	/**
	 * Transition Dict to Collection
	 * @param fn f
	 * @return Collection
	 */
	transition: function(ctx, f)
	{
		var Collection = use("Runtime.Collection");
		var arr = new Collection(ctx);
		for (var key in this._map)
		{
			var new_value = f(ctx, this._map[key], key.substring(1));
			Array.prototype.push.call(arr, new_value);
		}
		return arr;
	},
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(ctx, f, init_value)
	{
		for (var key in this._map)
		{
			init_value = f(ctx, init_value, this._map[key], key.substring(1));
		}
		return init_value;
	},
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	concat: function(ctx, map)
	{
		if (map == undefined) map = null;
		if (map == null) return this;
		var res = this.cp(ctx);
		for (var key in map._map)
		{
			res._map[key] = map._map[key];
		}
		return res;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Dict"))
		{
		}
		use("Runtime._Map").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime._Map").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime._Map").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Dict";
	},
});
Object.assign(Runtime.Dict, use("Runtime._Map"));
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(ctx)
	{
		var __v0 = use("Runtime.Dict");
		return new __v0(ctx);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(ctx, obj)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, obj]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Dict";
	},
	getParentClassName: function()
	{
		return "Runtime._Map";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Dict",
			"name": "Runtime.Dict",
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
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
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
});use.add(Runtime.Dict);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Dict = Runtime.Dict;