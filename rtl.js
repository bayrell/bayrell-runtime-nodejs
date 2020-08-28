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
Runtime.rtl = function(ctx)
{
};
Object.assign(Runtime.rtl.prototype,
{
	/**
	 * Returns unix timestamp
	 */
	utime: function(ctx)
	{
		return (new Date()).getTime() * 1000;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.rtl"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.rtl";
	},
});
Object.assign(Runtime.rtl,
{
	LOG_FATAL: 0,
	LOG_CRITICAL: 2,
	LOG_ERROR: 4,
	LOG_WARNING: 6,
	LOG_INFO: 8,
	LOG_DEBUG: 10,
	LOG_DEBUG2: 12,
	STATUS_PLAN: 0,
	STATUS_DONE: 1,
	STATUS_PROCESS: 100,
	STATUS_FAIL: -1,
	ERROR_NULL: 0,
	ERROR_OK: 1,
	ERROR_PROCCESS: 100,
	ERROR_FALSE: -100,
	ERROR_UNKNOWN: -1,
	ERROR_INDEX_OUT_OF_RANGE: -2,
	ERROR_KEY_NOT_FOUND: -3,
	ERROR_STOP_ITERATION: -4,
	ERROR_FILE_NOT_FOUND: -5,
	ERROR_ITEM_NOT_FOUND: -5,
	ERROR_OBJECT_DOES_NOT_EXISTS: -5,
	ERROR_OBJECT_ALLREADY_EXISTS: -6,
	ERROR_ASSERT: -7,
	ERROR_REQUEST: -8,
	ERROR_RESPONSE: -9,
	ERROR_CSRF_TOKEN: -10,
	ERROR_RUNTIME: -11,
	ERROR_VALIDATION: -12,
	ERROR_PARSE_SERIALIZATION_ERROR: -14,
	ERROR_ASSIGN_DATA_STRUCT_VALUE: -15,
	ERROR_AUTH: -16,
	ERROR_DUPLICATE: -17,
	ERROR_API_NOT_FOUND: -18,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	isBrowser: function()
	{
		return typeof window !== "undefined";
		return false;
	},
	/**
	 * Define props
	 */
	defProp: function(obj, name)
	{
		Object.defineProperty
		(
			obj,
			name,
			{
				get:() => { return obj["__" + name] },
				set:(value) => {
					var AssignStructValueError = use("Runtime.Exceptions.AssignStructValueError");
					throw new AssignStructValueError(null, name); 
				}
			}
		);
	},
	/**
	 * Define class
	 */
	defClass: function(obj)
	{
	},
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	find_class: function(class_name)
	{
		if (class_name instanceof Function)
			return class_name;
		
		return use(class_name);
	},
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	is_instanceof: function(ctx, obj, class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(ctx, obj, interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(ctx, class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(ctx, class_name, interface_name)
	{
		var obj = this.find_class(class_name);
		var obj2 = this.find_class(interface_name);
		
		while (obj != null){
			if (obj.__implements__){
				if (obj.__implements__.indexOf( obj2 ) > -1 ){
					return true;
				}
			}
			obj = obj.__proto__;
		}
		
		return false;
	},
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	getInterfaces: function(ctx, class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(ctx, class_name, method_name)
	{
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		if (this.exists(ctx, obj[method_name])) return true;
		return false;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(ctx, class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined || args == null) args = [];
		args = args.slice(); 
		args.unshift(ctx);
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(ctx, obj, method_name)
	{
		var save = obj;
		if (!(obj instanceof Object))
		{
			var find_obj = this.find_class(obj);
			if (find_obj == null)
			{
				throw new Error("Object " + obj + " not found");
			}
			obj = find_obj;
		}
		
		if (obj[method_name] == null || obj[method_name] == "undefined")
		{
			var class_name = "";
			if (obj.getClassName != undefined) class_name = obj.getClassName();
			else if (obj.getCurrentClassName != undefined) class_name = obj.getCurrentClassName();
			else class_name = save;
			throw new Error("Method " + method_name + " not found in " + class_name);
		}
		
		return obj[method_name].bind(obj);
		return function(obj, method_name){ return function () {
			return obj[method_name].apply(obj, arguments);
		}}(obj, method_name);
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	apply: function(ctx, f, args)
	{
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		args.unshift(ctx);
		if (this.isString(ctx, f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
			res = f.apply(c, args);
		}
		else
		{
			res = f.apply(null, args);
		}
		
		return res;
	},
	/**
	 * Call await method
	 * @return fn
	 */
	applyAsync: async function(ctx, f, args)
	{
		await f.apply(null, args);
	},
	/**
	 * Run thread
	 */
	runThread: function(ctx, f)
	{
		/*
		args.unshift(ctx);
		var t = new Runtime.AsyncThread(ctx, {
			"tasks": Runtime.Collection.from([
				new Runtime.AsyncTask(ctx, {
					"pos": "0",
					"f": f.apply(null, args),
				})
			])
		});
		Runtime.AsyncThread.run(ctx, t);
		*/
	},
	/**
	 * Returns value
	 */
	get: function(ctx, item, key, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (item === null)
		{
			return def_val;
		}
		if (item == undefined) return def_val;
		if (item instanceof Runtime.Dict || item instanceof Runtime.Collection)
		{
			return item.get(ctx, key, def_val);
		}
		return item[key];
		return def_val;
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(ctx, item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (typeof path == "string") path = Collection.from([path]);
		else if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (path.count() == 0)
		{
			return item;
		}
		var key = path.first(ctx);
		var path = path.removeFirstIm(ctx);
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			item = item.get(ctx, key, def_val);
			val = this.attr(ctx, item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			item = item.takeValue(ctx, key, def_val);
			val = this.attr(ctx, item, path, def_val);
			return val;
		}
		return val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(ctx, item, attrs, new_value)
	{
		var Collection = use("Runtime.Collection");
		if (typeof attrs == "string") attrs = Collection.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Collection.from(attrs);
		var f = (ctx, attrs, data, new_value, f) => 
		{
			if (attrs.count(ctx) == 0)
			{
				return new_value;
			}
			if (data == null)
			{
				data = use("Runtime.Dict").from({});
			}
			var new_data = null;
			var attr_name = attrs.first(ctx);
			var __v0 = use("Runtime.BaseStruct");
			var __v2 = use("Runtime.Dict");
			var __v3 = use("Runtime.Collection");
			if (data instanceof __v0)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				var __v1 = use("Runtime.Map");
				new_data = data.copy(ctx, (new __v1(ctx)).set(ctx, attr_name, res));
			}
			else if (data instanceof __v2)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data.setIm(ctx, attr_name, res);
			}
			else if (data instanceof __v3)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data.setIm(ctx, attr_name, res);
			}
			return new_data;
		};
		var new_item = f(ctx, attrs, item, new_value, f);
		return new_item;
	},
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	to: function(v, o)
	{
		var e = o.e;
		if (e == "mixed" || e == "primitive" || e == "var" || e == "fn" || e == "callback")
		{
			return v;
		}
		var __v0 = use("Runtime.rtl");
		if (e == "bool")
		{
			return this.toBool(null, v);
		}
		else if (e == "string")
		{
			return this.toString(null, v);
		}
		else if (e == "int")
		{
			return this.toInt(null, v);
		}
		else if (e == "float")
		{
			return this.toFloat(null, v);
		}
		else if (__v0.is_instanceof(null, v, e))
		{
			return v;
		}
		return v;
	},
	/**
	 * Convert monad by type
	 */
	m_to: function(ctx, type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			var __v0 = use("Runtime.Monad");
			return new __v0(ctx, (m.err == null) ? (this.convert(m.value(ctx), type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad to default value
	 */
	m_def: function(ctx, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			var __v0 = use("Runtime.Monad");
			return (m.err != null || m.val === null) ? (new __v0(ctx, def_value)) : (m);
		};
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	convert: function(value, type_value, def_value, type_template)
	{
		if (def_value == undefined) def_value = null;
		if (type_template == undefined) type_template = "";
		return value;
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(ctx, value, tp)
	{
		if (tp == "int")
		{
			return Runtime.rtl.isInt(ctx, value);
		}
		if (tp == "float" || tp == "double")
		{
			return Runtime.rtl.isDouble(ctx, value);
		}
		if (tp == "string")
		{
			return Runtime.rtl.isString(ctx, value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return Runtime.rtl.isBoolean(ctx, value);
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.is_instanceof(ctx, value, tp))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(ctx, value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(ctx, value)
	{
		if (value == null)
		{
			return true;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isString(ctx, value))
		{
			return true;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isNumber(ctx, value))
		{
			return true;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isBoolean(ctx, value))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBoolean: function(ctx, value)
	{
		if (value === false || value === true)
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(ctx, value)
	{
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isDouble: function(ctx, value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(ctx, value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(ctx, value)
	{
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(ctx, value)
	{
		var _StringInterface = use("Runtime.Interfaces.StringInterface");
		
		if (value === null) return "";
		if (typeof value == 'string') return value;
		if (value instanceof String) return "" + value;
		if (this.is_implements(null, value, _StringInterface)) return value.toString();
		return ""+value;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toStr: function(value)
	{
		return this.toString(null, value);
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(ctx, val)
	{
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	toBool: function(ctx, val)
	{
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return false;
	},
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	toFloat: function(ctx, val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(ctx, value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(ctx, value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(ctx, value)
	{
		return Math.round(value);
	},
	/**
	 * Json encode data
	 * @param var data
	 * @return string
	 */
	json_encode: function(ctx, data)
	{
		var f = this.method(ctx, "Runtime.RuntimeUtils", "json_encode");
		return f(ctx, data);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var
	 */
	json_decode: function(ctx, obj)
	{
		var f = this.method(ctx, "Runtime.RuntimeUtils", "json_decode");
		return f(ctx, obj);
	},
	/* ====================== Chains ====================== */
	/**
	 * Apply async chain
	 */
	chainAwait: async function(ctx, chain, args)
	{
		for (var i = 0;i < chain.count(ctx);i++)
		{
			var chain_name = chain.item(ctx, i);
			var __v0 = use("Runtime.rtl");
			args = await __v0.apply(ctx, chain_name, args);
		}
		return Promise.resolve(args);
	},
	/**
	 * Apply chain
	 */
	chain: function(ctx, chain, args)
	{
		for (var i = 0;i < chain.count(ctx);i++)
		{
			var chain_name = chain.item(ctx, i);
			var __v0 = use("Runtime.rtl");
			args = __v0.apply(ctx, chain_name, args);
		}
		return args;
	},
	_memorizeValidHKey: function(hkey, key)
	{
	},
	/**
	 * Clear memorize cache
	 */
	_memorizeClear: function()
	{
		this._memorize_cache = null;
	},
	/**
	 * Returns cached value
	 */
	_memorizeValue: function(name, args)
	{
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				if (arr[hkey] == undefined) return this._memorize_not_found;
				return arr[hkey];
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
		
		return this._memorize_not_found;
	},
	/**
	 * Returns cached value
	 */
	_memorizeSave: function(name, args, value)
	{
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				arr[hkey] = value;
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
	},
	/* ================ Dirty functions ================ */
	/**
	 * Sleep in ms
	 */
	sleep: async function(ctx, time)
	{
		await new Promise((f, e) => setTimeout(f, time));
	},
	/**
	 * Sleep in microseconds
	 */
	usleep: async function(ctx, time)
	{
		setTimeout
		(
			(function (__async_t)
			{
				return function()
				{
					__async_t.resolve(ctx, null);
				};
			})(__async_t),
			Math.round(time / 1000)
		);
		return;
	},
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	unique: function(ctx, flag)
	{
		if (flag == undefined) flag = true;
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(ctx, a, b)
	{
		if (window != undefined && window.crypto != undefined && window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	time: function(ctx)
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Clone var
	 * @param {var} value - Variable
	 * @return {var} result
	 */
	clone: function(ctx, val)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseObject = use("Runtime.BaseObject");
		var BaseStruct = use("Runtime.BaseStruct");
		var FakeStruct = use("Runtime.FakeStruct");
		var Reference = use("Runtime.Reference");
		
		if (val == null)
			return null;
		
		else if (val instanceof Number || typeof val == "number")
		{
			return val;
		}
		else if (val instanceof String || typeof val == "string")
		{
			return (new String(val)).toString();
		}
		else if (val instanceof Boolean || typeof val == "boolean")
		{
			return val;
		}
		else if (typeof val == "symbol")
		{
			return Symbol();
		}
		else if (val instanceof Date)
		{
			return new Date(val);
		}
		else if (typeof val == 'object' && val.nodeType && typeof val.cloneNode == "function")
		{
			return val.cloneNode(true);
		}
		else if (val instanceof Collection)
		{
			var res = val.constructor.Instance();
			for (var i=0;i<val.length;i++)
			{
				res.push(ctx, this.clone(ctx, val[i]));
			}
			return res;
		}
		else if (val instanceof Dict)
		{
			var res = val.constructor.Instance();
			for (var key in val._map)
			{
				res._map[key] = this.clone(ctx, val._map[key]);
			}
			return res;
		}
		else if (Array.isArray(val))
		{	
			var proto = Object.getPrototypeOf(val);
			var res = Object.create(proto);
			for (var i=0;i<val.length;i++)
			{
				res.push(ctx, this.clone(ctx, val[i]));
			}
			return res;
		}
		else if (val instanceof BaseStruct)
		{
			return val;
		}
		else if (val instanceof FakeStruct)
		{
			return val.clone(ctx);
		}
		else if (val instanceof Reference)
		{
			return new Reference(ctx, val.ref);
		}
		else if (val instanceof BaseObject || typeof val == 'object')
		{
			var proto = Object.getPrototypeOf(val);
			var res = Object.create(proto);
			var a = Object.getOwnPropertyNames(val);
			for (var i=0;i<a.length;i++)
			{
				var key = a[i];
				res[key] = this.clone(ctx, val[key]);
			}
			return res;
		}
		
		return null;
	},
	/**
	 * Convert to timestamp
	 */
	timestamp: function(ctx, s)
	{
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.rtl";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.rtl",
			"name": "Runtime.rtl",
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
		if (field_name == "LOG_FATAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_CRITICAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_ERROR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_WARNING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_INFO") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG2") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PLAN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_DONE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PROCESS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_FAIL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_NULL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PROCCESS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FALSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_UNKNOWN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_INDEX_OUT_OF_RANGE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_KEY_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_STOP_ITERATION") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FILE_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ITEM_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_DOES_NOT_EXISTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_ALLREADY_EXISTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSERT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_REQUEST") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RESPONSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_CSRF_TOKEN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RUNTIME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_VALIDATION") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PARSE_SERIALIZATION_ERROR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSIGN_DATA_STRUCT_VALUE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_AUTH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_DUPLICATE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FATAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_CONTINUE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_SWITCH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_PROCESSING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_BAD_GATEWAY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_cache") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_not_found") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_hkey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
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
});use.add(Runtime.rtl);
module.exports = Runtime.rtl;
if (typeof rtl != 'undefined') rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
if (typeof Runtime != 'undefined') Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};