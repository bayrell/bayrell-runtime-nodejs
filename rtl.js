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
Runtime.rtl = function()
{
};
Object.assign(Runtime.rtl.prototype,
{
	/**
	 * Debug
	 */
	trace: function()
	{
	},
	getClassName: function()
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
	ERROR_API_WRONG_FORMAT: -19,
	ERROR_API_WRONG_APP_NAME: -20,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	_global_context: null,
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
	is_instanceof: function(obj, class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(obj, interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(class_name, interface_name)
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
	getInterfaces: function(class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(class_name, method_name)
	{
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		if (this.exists(obj[method_name])) return true;
		return false;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined || args == null){ args = []; } else { args = args.toArray(); }
		args = args.slice(); 
		args.unshift();
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(obj, method_name)
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
	apply: function(f, args)
	{
		var is_ctx = false;
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift();
		if (this.isString(f))
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
	applyAsync: async function(f, args)
	{
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift();
		if (this.isString(f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
			res = await f.apply(c, args);
		}
		else
		{
			res = await f.apply(null, args);
		}
		
		return res;
	},
	/**
	 * Apply method
	 * @return var
	 */
	methodApply: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var __v0 = Runtime.rtl;
		var f = __v0.method(class_name, method_name);
		var __v1 = Runtime.rtl;
		return __v1.apply(f, args);
	},
	applyMethod: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return this.methodApply(class_name, method_name, args);
	},
	/**
	 * Apply method async
	 * @return var
	 */
	methodApplyAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var __v0 = Runtime.rtl;
		var f = __v0.method(class_name, method_name);
		var __v1 = Runtime.rtl;
		return Promise.resolve(await __v1.applyAsync(f, args));
	},
	applyMethodAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	/**
	 * Returns value
	 */
	get: function(item, key, def_val)
	{
		if (def_val == undefined) def_val = null;
		return this.attr(item, key, def_val);
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (path === null)
		{
			return def_val;
		}
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (item === undefined) return def_val;
		if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (this.isScalarValue(path)) path = Collection.from([path]);
		if (!(path instanceof Collection)) return def_val;
		if (path.count() == 0)
		{
			return item;
		}
		var key = path.first();
		var path = path.removeFirstIm();
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else
		{
			var new_item = item[key] || def_val;
			val = this.attr(new_item, path, def_val);
			return val;
		}
		return val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(item, attrs, new_value)
	{
		if (attrs == null)
		{
			return item;
		}
		var Collection = use("Runtime.Collection");
		if (typeof attrs == "string") attrs = Collection.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Collection.from(attrs);
		var f = (attrs, data, new_value, f) => 
		{
			if (attrs.count() == 0)
			{
				return new_value;
			}
			if (data == null)
			{
				data = Runtime.Dict.from({});
			}
			var new_data = null;
			var attr_name = attrs.first();
			var __v0 = Runtime.BaseStruct;
			var __v2 = Runtime.Dict;
			var __v3 = Runtime.Collection;
			if (data instanceof __v0)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				var __v1 = Runtime.Map;
				new_data = data.copy((new __v1()).setValue(attr_name, res));
			}
			else if (data instanceof __v2)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			else if (data instanceof __v3)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			return new_data;
		};
		var new_item = f(attrs, item, new_value, f);
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
		var __v0 = Runtime.rtl;
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
	m_to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			var __v0 = Runtime.Monad;
			return new __v0((m.err == null) ? (this.convert(m.val, type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad to default value
	 */
	m_def: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			var __v0 = Runtime.Monad;
			return (m.err != null || m.val === null) ? (new __v0(def_value)) : (m);
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
	convert: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (v === null)
		{
			return d;
		}
		if (t == "mixed" || t == "primitive" || t == "var" || t == "fn" || t == "callback")
		{
			return v;
		}
		if (t == "bool" || t == "boolean")
		{
			return this.toBool(v);
		}
		else if (t == "string")
		{
			return this.toString(v);
		}
		else if (t == "int")
		{
			return this.toInt(v);
		}
		else if (t == "float" || t == "double")
		{
			return this.toFloat(v);
		}
		else if (this.is_instanceof(v, t))
		{
			return v;
		}
		return this.toObject(v, t, d);
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(value, tp)
	{
		if (tp == "int")
		{
			return Runtime.rtl.isInt(value);
		}
		if (tp == "float" || tp == "double")
		{
			return Runtime.rtl.isDouble(value);
		}
		if (tp == "string")
		{
			return Runtime.rtl.isString(value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return Runtime.rtl.isBoolean(value);
		}
		var __v0 = Runtime.rtl;
		if (__v0.is_instanceof(value, tp))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is empty
	 * @param var value
	 * @return bool
	 */
	isEmpty: function(value)
	{
		return !this.exists(value) || value === null || value === "" || value === false || value === 0;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(value)
	{
		if (value == null)
		{
			return true;
		}
		var __v0 = Runtime.rtl;
		if (__v0.isString(value))
		{
			return true;
		}
		var __v0 = Runtime.rtl;
		if (__v0.isNumber(value))
		{
			return true;
		}
		var __v0 = Runtime.rtl;
		if (__v0.isBoolean(value))
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
	isBoolean: function(value)
	{
		if (value === false || value === true)
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
	isBool: function(value)
	{
		return this.isBoolean(value);
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(value)
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
	isDouble: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(value)
	{
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	},
	/**
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	isFn: function(value)
	{
		if (typeof(value) == 'function') return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(value)
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
		return this.toString(value);
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(val)
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
	toBool: function(val)
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
	toFloat: function(val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert to object
	 */
	toObject: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (this.is_instanceof(v, t))
		{
			return v;
		}
		if (t == "Runtime.Collection")
		{
			var __v0 = Runtime.Collection;
			return __v0.from(v);
		}
		if (t == "Runtime.Vector")
		{
			var __v0 = Runtime.Vector;
			return __v0.from(v);
		}
		if (t == "Runtime.Dict")
		{
			var __v0 = Runtime.Dict;
			return __v0.from(v);
		}
		if (t == "Runtime.Map")
		{
			var __v0 = Runtime.Map;
			return __v0.from(v);
		}
		try
		{
			var newInstance = this.method(t, "newInstance");
			return newInstance(v);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		return d;
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(value)
	{
		return Math.round(value);
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
	sleep: async function(time)
	{
		await new Promise((f, e) => setTimeout(f, time));
	},
	/**
	 * Sleep in microseconds
	 */
	usleep: async function(time)
	{
		setTimeout
		(
			(function (__async_t)
			{
				return function()
				{
					__async_t.resolve(null);
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
	unique: function(flag)
	{
		if (flag == undefined) flag = true;
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	},
	/**
	 * Generate uuid
	 */
	uid: function()
	{
	},
	/**
	 * Generate timestamp based uuid
	 */
	time_uid: function()
	{
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(a, b)
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
	time: function()
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Returns unix timestamp
	 */
	utime: function()
	{
		return (new Date()).getTime() * 1000;
	},
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		return rtl._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		use("Runtime.rtl")._global_context = context;
		return context;
	},
	/* ============================= Runtime Utils Functions ============================= */
	/**
	 * Json encode data
	 * @param var data
	 * @return string
	 */
	json_encode: function(data)
	{
		var f = this.method("Runtime.RuntimeUtils", "json_encode");
		return f(data);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var
	 */
	json_decode: function(obj)
	{
		var f = this.method("Runtime.RuntimeUtils", "json_decode");
		return f(obj);
	},
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __v0 = Runtime.Vector;
		var res = new __v0();
		while (class_name != "")
		{
			res.pushValue(class_name);
			class_name = this.methodApply(class_name, "getParentClassName");
		}
		var __memorize_value = res.toCollection();
		Runtime.rtl._memorizeSave("Runtime.rtl.getParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations
	 */
	getClassAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getClassAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Collection.from([]);
		}
		var info = this.methodApply(class_name, "getClassInfo");
		var __v0 = new Runtime.Monad(Runtime.rtl.get(info, "annotations"));
		var __v1 = Runtime.rtl;
		__v0 = __v0.monad(__v1.m_to("Runtime.Collection", Runtime.Collection.from([])));
		var arr = __v0.value();
		var __memorize_value = res.concat(arr);
		Runtime.rtl._memorizeSave("Runtime.rtl.getClassAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations with parents
	 */
	getClassAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getClassAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getClassAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getClassAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfo: function(class_name, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldInfo", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = this.methodApply(class_name, "getFieldInfoByName", Runtime.Collection.from([field_name]));
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfo", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfoWithParents: function(class_name, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldInfoWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			var res = this.methodApply(parent_class_name, "getFieldInfoByName", Runtime.Collection.from([field_name]));
			if (res != null)
			{
				var __memorize_value = res;
				Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = null;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields of class
	 */
	getFields: function(class_name, flag)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFields", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 255;
		var __v0 = Runtime.Vector;
		var names = new __v0();
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			var item_fields = this.methodApply(parent_class_name, "getFieldsList", Runtime.Collection.from([flag]));
			if (item_fields != null)
			{
				names.appendVector(item_fields);
			}
		}
		var __memorize_value = names.toCollection().removeDuplicatesIm();
		Runtime.rtl._memorizeSave("Runtime.rtl.getFields", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations
	 */
	getFieldsAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldsAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Dict.from({});
		}
		var methods = this.methodApply(class_name, "getFieldsList", Runtime.Collection.from([255]));
		for (var i = 0;i < methods.count();i++)
		{
			var method_name = Runtime.rtl.get(methods, i);
			var info = this.methodApply(class_name, "getFieldInfoByName", Runtime.Collection.from([method_name]));
			var annotations = Runtime.rtl.get(info, "annotations");
			var __v0 = new Runtime.Monad(Runtime.rtl.get(res, method_name));
			var __v1 = Runtime.rtl;
			__v0 = __v0.monad(__v1.m_to("Runtime.Collection", Runtime.Collection.from([])));
			var arr = __v0.value();
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from([method_name]), arr.concat(annotations));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations with parents
	 */
	getFieldsAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldsAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getFieldsAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations
	 */
	getMethodsAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getMethodsAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Dict.from({});
		}
		var methods = this.methodApply(class_name, "getMethodsList", Runtime.Collection.from([255]));
		for (var i = 0;i < methods.count();i++)
		{
			var method_name = Runtime.rtl.get(methods, i);
			var info = this.methodApply(class_name, "getMethodInfoByName", Runtime.Collection.from([method_name]));
			var annotations = Runtime.rtl.get(info, "annotations");
			var __v0 = new Runtime.Monad(Runtime.rtl.get(res, method_name));
			var __v1 = Runtime.rtl;
			__v0 = __v0.monad(__v1.m_to("Runtime.Collection", Runtime.Collection.from([])));
			var arr = __v0.value();
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from([method_name]), arr.concat(annotations));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getMethodsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations with parents
	 */
	getMethodsAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getMethodsAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Dict.from({});
		var parents = this.getParents(class_name);
		for (var i = 0;i < parents.count();i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getMethodsAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getMethodsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns module path. For backend only
	 */
	getModulePath: function(module_name)
	{
		return "";
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
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "LOG_FATAL") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_CRITICAL") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_ERROR") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_WARNING") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_INFO") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG2") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PLAN") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_DONE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PROCESS") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_FAIL") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_NULL") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OK") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PROCCESS") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FALSE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_UNKNOWN") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_INDEX_OUT_OF_RANGE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_KEY_NOT_FOUND") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_STOP_ITERATION") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FILE_NOT_FOUND") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ITEM_NOT_FOUND") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_DOES_NOT_EXISTS") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_ALLREADY_EXISTS") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSERT") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_REQUEST") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RESPONSE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_CSRF_TOKEN") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RUNTIME") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_VALIDATION") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PARSE_SERIALIZATION_ERROR") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSIGN_DATA_STRUCT_VALUE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_AUTH") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_DUPLICATE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_NOT_FOUND") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_WRONG_FORMAT") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_WRONG_APP_NAME") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FATAL") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_CONTINUE") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_SWITCH") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_PROCESSING") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_OK") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_BAD_GATEWAY") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_cache") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_not_found") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_hkey") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_global_context") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
			"getModulePath",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Runtime.rtl);
module.exports = Runtime.rtl;
if (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};