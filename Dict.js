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
		else if (typeof map == "object" && !(map instanceof Runtime._Collection))
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
/*Runtime._Map.prototype = Object.create(Map.prototype);
Runtime._Map.prototype.constructor = Runtime._Map;*/
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
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var ctx = null;
		var res = this.Instance(ctx, map);
		return res;
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Map"; },
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
		if (default_value == undefined) default_value = null;
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
			throw new _KeyNotFound(ctx, key);
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
	set1: function(ctx, key, value)
	{
		return this.setIm(ctx, key, value);
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
	remove1: function(ctx, key)
	{
		return this.removeIm(ctx, key);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeKeys: function(ctx, keys)
	{
		return (keys != null) ? (keys.reduce(ctx, (ctx, item, key) => 
		{
			return item.removeIm(ctx, key);
		}, this)) : (this);
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function(ctx)
	{
		var res = new Runtime.Vector(ctx);
		for (var key in this._map) res.pushValue(ctx, key.substring(1));
		return res.toCollection();
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function(ctx)
	{
		var res = new Runtime.Vector(ctx);
		for (var key in this._map) res.pushValue( this._map[key] );
		return res.toCollection();
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
		var obj = this.constructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(ctx, value, new_key);
			if (flag) obj._map[key] = value;
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
		if (map == null)
		{
			return this;
		}
		var _map = {};
		var f = false;
		var Dict = use("Runtime.Dict");
		if (map == null) return this;
		if (map instanceof Dict) _map = map._map;
		else if (typeof map == "object") { _map = map; f = true; }
		var res = this.cp(ctx);
		for (var key in _map)
		{
			res._map[(f ? "|" : "") + key] = _map[key];
		}
		return res;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(ctx, fields, skip_empty)
	{
		if (fields == undefined) fields = null;
		if (skip_empty == undefined) skip_empty = true;
		if (fields == null)
		{
			return use("Runtime.Dict").from({});
		}
		var __v0 = use("Runtime.Map");
		var obj = new __v0(ctx);
		fields.each(ctx, (ctx, field_name) => 
		{
			if (skip_empty && !this.has(ctx, field_name))
			{
				return ;
			}
			obj.setValue(ctx, field_name, this.get(ctx, field_name, null));
		});
		return obj.toDict(ctx);
	},
	/**
	 * Check equal
	 */
	equal: function(ctx, item)
	{
		if (item == null)
		{
			return false;
		}
		var __v0 = use("Runtime.Collection");
		var keys = (new __v0(ctx)).concat(ctx, this.keys(ctx)).concat(ctx, item.keys(ctx)).removeDuplicatesIm(ctx);
		for (var i = 0;i < keys.count(ctx);i++)
		{
			var key = Runtime.rtl.get(ctx, keys, i);
			if (!this.has(ctx, key))
			{
				return false;
			}
			if (!item.has(ctx, key))
			{
				return false;
			}
			if (this.get(ctx, key) != item.get(ctx, key))
			{
				return false;
			}
		}
		return true;
	},
});
Object.assign(Runtime.Dict, use("Runtime._Map"));
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(ctx, val)
	{
		if (val == undefined) val = null;
		var __v0 = use("Runtime.Dict");
		return new __v0(ctx, val);
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
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
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
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
			"Instance",
			"cp",
			"create",
			"clone",
			"copy",
			"toDict",
			"toMap",
			"contains",
			"has",
			"get",
			"attr",
			"item",
			"setIm",
			"set1",
			"removeIm",
			"remove1",
			"removeKeys",
			"keys",
			"values",
			"map",
			"filter",
			"each",
			"transition",
			"reduce",
			"concat",
			"intersect",
			"equal",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Dict);
module.exports = Runtime.Dict;