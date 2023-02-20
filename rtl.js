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
Runtime.rtl = function(ctx)
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
	ERROR_USER: -10000,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	_global_context: null,
	JSON_PRETTY: 1,
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
		if (!this.exists(ctx, obj) || !(obj instanceof Function))
			throw new Runtime.Exceptions.FileNotFound(class_name, "class name");
		if (args == undefined || args == null){ args = []; } else { args = args.toArray(); }
		args = args.slice(); 
		if (typeof ctx != "undefined") args.unshift(ctx);
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
		var is_ctx = false;
		is_ctx = true;
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift(ctx);
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
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift(ctx);
		if (this.isString(ctx, f))
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
	methodApply: function(ctx, class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var __v0 = use("Runtime.rtl");
		var f = __v0.method(ctx, class_name, method_name);
		var __v1 = use("Runtime.rtl");
		return __v1.apply(ctx, f, args);
	},
	applyMethod: function(ctx, class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return this.methodApply(ctx, class_name, method_name, args);
	},
	/**
	 * Apply method async
	 * @return var
	 */
	methodApplyAsync: async function(ctx, class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var __v0 = use("Runtime.rtl");
		var f = __v0.method(ctx, class_name, method_name);
		var __v1 = use("Runtime.rtl");
		return Promise.resolve(await __v1.applyAsync(ctx, f, args));
	},
	applyMethodAsync: async function(ctx, class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(ctx, class_name, method_name, args);
	},
	/**
	 * Returns value
	 */
	get: function(ctx, item, key, def_val)
	{
		if (def_val == undefined) def_val = null;
		return this.attr(ctx, item, key, def_val);
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(ctx, item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (path === null)
		{
			return def_val;
		}
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		var BaseObject = use("Runtime.BaseObject");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (item === undefined) return def_val;
		if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (this.isScalarValue(ctx, path)) path = Collection.from([path]);
		if (!(path instanceof Collection)) return def_val;
		if (path.count(ctx) == 0)
		{
			return item;
		}
		var key = path.first(ctx);
		var path = path.removeFirstIm(ctx);
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			var new_item = item.get(ctx, key, def_val);
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			var new_item = item.get(ctx, key, def_val);
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseObject)
		{
			item = item.takeValue(ctx, key, def_val);
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		else
		{
			var new_item = item[key] || def_val;
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		return def_val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(ctx, item, attrs, new_value)
	{
		if (attrs == null)
		{
			return item;
		}
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
			var __v2 = use("Runtime.BaseObject");
			var __v3 = use("Runtime.Dict");
			var __v4 = use("Runtime.Collection");
			if (data instanceof __v0)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				var __v1 = use("Runtime.Map");
				var d = (new __v1(ctx)).setValue(ctx, attr_name, res);
				new_data = data.copy(ctx, d);
			}
			else if (data instanceof __v2)
			{
				var attr_data = data.takeValue(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data;
				new_data.assignValue(ctx, attr_name, res);
			}
			else if (data instanceof __v3)
			{
				var attr_data = data.get(ctx, attr_name, null);
				var res = f(ctx, attrs.removeFirstIm(ctx), attr_data, new_value, f);
				new_data = data.setIm(ctx, attr_name, res);
			}
			else if (data instanceof __v4)
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
		var ctx = null;
		var e = "";
		if (e == "mixed" || e == "primitive" || e == "var" || e == "fn" || e == "callback")
		{
			return v;
		}
		var __v0 = use("Runtime.rtl");
		if (e == "bool")
		{
			return this.toBool(ctx, v);
		}
		else if (e == "string")
		{
			return this.toString(ctx, v);
		}
		else if (e == "int")
		{
			return this.toInt(ctx, v);
		}
		else if (e == "float")
		{
			return this.toFloat(ctx, v);
		}
		else if (__v0.is_instanceof(ctx, v, e))
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
			return new __v0(ctx, (m.err == null) ? (this.convert(ctx, m.val, type_value, def_value)) : (def_value));
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
	convert: function(ctx, v, t, d)
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
			return this.toBool(ctx, v);
		}
		else if (t == "string")
		{
			return this.toString(ctx, v);
		}
		else if (t == "int")
		{
			return this.toInt(ctx, v);
		}
		else if (t == "float" || t == "double")
		{
			return this.toFloat(ctx, v);
		}
		else if (this.is_instanceof(ctx, v, t))
		{
			return v;
		}
		return this.toObject(ctx, v, t, d);
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
			return this.isInt(ctx, value);
		}
		if (tp == "float" || tp == "double")
		{
			return this.isDouble(ctx, value);
		}
		if (tp == "string")
		{
			return this.isString(ctx, value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return this.isBoolean(ctx, value);
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.is_instanceof(ctx, value, tp))
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
	isEmpty: function(ctx, value)
	{
		return !this.exists(ctx, value) || value === null || value === "" || value === false || value === 0;
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
	 * Returns true if value is scalar array
	 * @return bool
	 */
	isArray: function(ctx, value)
	{
		var __v0 = use("Runtime.Collection");
		if (value instanceof __v0)
		{
			return true;
		}
		if (value instanceof Array) return true;
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
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBool: function(ctx, value)
	{
		return this.isBoolean(ctx, value);
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
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	isFn: function(ctx, value)
	{
		if (typeof(value) == 'function') return true;
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
		return this.toString(value);
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
	 * Convert to object
	 */
	toObject: function(ctx, v, t, d)
	{
		if (d == undefined) d = null;
		if (this.is_instanceof(ctx, v, t))
		{
			return v;
		}
		if (t == "Runtime.Collection")
		{
			var __v0 = use("Runtime.Collection");
			return __v0.from(v);
		}
		if (t == "Runtime.Vector")
		{
			var __v0 = use("Runtime.Vector");
			return __v0.from(v);
		}
		if (t == "Runtime.Dict")
		{
			var __v0 = use("Runtime.Dict");
			return __v0.from(v);
		}
		if (t == "Runtime.Map")
		{
			var __v0 = use("Runtime.Map");
			return __v0.from(v);
		}
		try
		{
			var newInstance = this.method(ctx, t, "newInstance");
			return newInstance(ctx, v);
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
		await new Promise((f, e) => setTimeout(f, Math.round(time / 1000)));
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
	 * Generate uuid
	 */
	uid: function(ctx)
	{
	},
	/**
	 * Generate timestamp based uuid
	 */
	time_uid: function(ctx)
	{
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
	 * Returns unix timestamp
	 */
	utime: function(ctx)
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
	/**
	 * Run context
	 * @param Dict d
	 */
	createContext: async function(d)
	{
		var ctx = null;
		var __v0 = use("Runtime.Context");
		var context = __v0.create(ctx, d);
		/* Init context */
		context = await context.init();
		/* Setup global context */
		this.setContext(context);
		return Promise.resolve(context);
	},
	/**
	 * Run application
	 * @param Dict d
	 */
	runApp: async function(module_name, class_name, d)
	{
		if (d == undefined) d = null;
		if (d == null)
		{
			d = use("Runtime.Dict").from({});
		}
		let ctx = null;
		d = Runtime.rtl.setAttr(ctx, d, Runtime.Collection.from(["entry_point"]), class_name);
		d = Runtime.rtl.setAttr(ctx, d, Runtime.Collection.from(["modules"]), use("Runtime.Collection").from([module_name]));
		let code = 0;
		
		try
		{
			let context = await Runtime.rtl.createContext(d);
			await context.start(context);
			code = await context.run(context);
		}
		catch (e)
		{
			process.stderr.write("\x1B[0;91m");
			process.stderr.write(e.stack);
			process.stderr.write("\x1B[0m\n");
		}
		
		process.exit(code);
	},
	/* ============================= Runtime Utils Functions ============================= */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		while (class_name != "")
		{
			res.pushValue(ctx, class_name);
			class_name = this.methodApply(ctx, class_name, "getParentClassName");
		}
		var __memorize_value = res.toCollection(ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations
	 */
	getClassAnnotations: function(ctx, class_name, res)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getClassAnnotations", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = use("Runtime.Collection").from([]);
		}
		var info = this.methodApply(ctx, class_name, "getClassInfo");
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, Runtime.rtl.get(ctx, info, "annotations"));
		var __v2 = use("Runtime.rtl");
		__v1 = __v1.monad(ctx, __v2.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var arr = __v1.value(ctx);
		var __memorize_value = res.concat(ctx, arr);
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getClassAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations with parents
	 */
	getClassAnnotationsWithParents: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getClassAnnotationsWithParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var res = use("Runtime.Dict").from({});
		var parents = this.getParents(ctx, class_name);
		for (var i = 0;i < parents.count(ctx);i++)
		{
			var parent_class_name = Runtime.rtl.get(ctx, parents, i);
			res = this.getClassAnnotations(ctx, parent_class_name, res);
		}
		var __memorize_value = res;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getClassAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfo: function(ctx, class_name, field_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getFieldInfo", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var res = this.methodApply(ctx, class_name, "getFieldInfoByName", use("Runtime.Collection").from([field_name]));
		var __memorize_value = res;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getFieldInfo", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfoWithParents: function(ctx, class_name, field_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getFieldInfoWithParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var parents = this.getParents(ctx, class_name);
		for (var i = 0;i < parents.count(ctx);i++)
		{
			var parent_class_name = Runtime.rtl.get(ctx, parents, i);
			var res = this.methodApply(ctx, parent_class_name, "getFieldInfoByName", use("Runtime.Collection").from([field_name]));
			if (res != null)
			{
				var __memorize_value = res;
				use("Runtime.rtl")._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = null;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields of class
	 */
	getFields: function(ctx, class_name, flag)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getFields", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 255;
		var __v0 = use("Runtime.Vector");
		var names = new __v0(ctx);
		var parents = this.getParents(ctx, class_name);
		for (var i = 0;i < parents.count(ctx);i++)
		{
			var parent_class_name = Runtime.rtl.get(ctx, parents, i);
			var item_fields = this.methodApply(ctx, parent_class_name, "getFieldsList", use("Runtime.Collection").from([flag]));
			if (item_fields != null)
			{
				names.appendVector(ctx, item_fields);
			}
		}
		var __memorize_value = names.toCollection(ctx).removeDuplicatesIm(ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getFields", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations
	 */
	getFieldsAnnotations: function(ctx, class_name, res)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getFieldsAnnotations", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = use("Runtime.Dict").from({});
		}
		var methods = this.methodApply(ctx, class_name, "getFieldsList", use("Runtime.Collection").from([255]));
		for (var i = 0;i < methods.count(ctx);i++)
		{
			var method_name = Runtime.rtl.get(ctx, methods, i);
			var info = this.methodApply(ctx, class_name, "getFieldInfoByName", use("Runtime.Collection").from([method_name]));
			var annotations = Runtime.rtl.get(ctx, info, "annotations");
			var __v0 = use("Runtime.Monad");
			var __v1 = new __v0(ctx, Runtime.rtl.get(ctx, res, method_name));
			var __v2 = use("Runtime.rtl");
			__v1 = __v1.monad(ctx, __v2.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			var arr = __v1.value(ctx);
			res = Runtime.rtl.setAttr(ctx, res, Runtime.Collection.from([method_name]), arr.concat(ctx, annotations));
		}
		var __memorize_value = res;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getFieldsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations with parents
	 */
	getFieldsAnnotationsWithParents: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getFieldsAnnotationsWithParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var res = use("Runtime.Dict").from({});
		var parents = this.getParents(ctx, class_name);
		for (var i = 0;i < parents.count(ctx);i++)
		{
			var parent_class_name = Runtime.rtl.get(ctx, parents, i);
			res = this.getFieldsAnnotations(ctx, parent_class_name, res);
		}
		var __memorize_value = res;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getFieldsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations
	 */
	getMethodsAnnotations: function(ctx, class_name, res)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getMethodsAnnotations", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = use("Runtime.Dict").from({});
		}
		var methods = this.methodApply(ctx, class_name, "getMethodsList", use("Runtime.Collection").from([255]));
		for (var i = 0;i < methods.count(ctx);i++)
		{
			var method_name = Runtime.rtl.get(ctx, methods, i);
			var info = this.methodApply(ctx, class_name, "getMethodInfoByName", use("Runtime.Collection").from([method_name]));
			var annotations = Runtime.rtl.get(ctx, info, "annotations");
			var __v0 = use("Runtime.Monad");
			var __v1 = new __v0(ctx, Runtime.rtl.get(ctx, res, method_name));
			var __v2 = use("Runtime.rtl");
			__v1 = __v1.monad(ctx, __v2.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			var arr = __v1.value(ctx);
			res = Runtime.rtl.setAttr(ctx, res, Runtime.Collection.from([method_name]), arr.concat(ctx, annotations));
		}
		var __memorize_value = res;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getMethodsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations with parents
	 */
	getMethodsAnnotationsWithParents: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rtl.getMethodsAnnotationsWithParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var res = use("Runtime.Dict").from({});
		var parents = this.getParents(ctx, class_name);
		for (var i = 0;i < parents.count(ctx);i++)
		{
			var parent_class_name = Runtime.rtl.get(ctx, parents, i);
			res = this.getMethodsAnnotations(ctx, parent_class_name, res);
		}
		var __memorize_value = res;
		use("Runtime.rtl")._memorizeSave("Runtime.rtl.getMethodsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(ctx, value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		var value1 = this.ObjectToPrimitive(ctx, value, force_class_name);
		var value2 = this.PrimitiveToNative(ctx, value1);
		return value2;
	},
	NativeToObject: function(ctx, value)
	{
		var value1 = this.NativeToPrimitive(ctx, value);
		var value2 = this.PrimitiveToObject(ctx, value1);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(ctx, obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		if (obj === null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(ctx, obj))
		{
			return obj;
		}
		var __v0 = use("Runtime.Collection");
		if (obj instanceof __v0)
		{
			return obj.map(ctx, (ctx, value) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			obj = obj.map(ctx, (ctx, value, key) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
			return obj.toDict(ctx);
		}
		var __v0 = use("Runtime.Date");
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = use("Runtime.DateTime");
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = use("Runtime.BaseStruct");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Map");
			var values = new __v1(ctx);
			var __v2 = use("Runtime.rtl");
			var names = __v2.getFields(ctx, obj.getClassName(ctx));
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				var value = obj.get(ctx, variable_name, null);
				var value = this.ObjectToPrimitive(ctx, value, force_class_name);
				values.setValue(ctx, variable_name, value);
			}
			if (force_class_name)
			{
				values.setValue(ctx, "__class_name__", obj.getClassName(ctx));
			}
			return values.toDict(ctx);
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(ctx, obj)
	{
		if (obj === null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(ctx, obj))
		{
			return obj;
		}
		var __v0 = use("Runtime.Collection");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Vector");
			var res = new __v1(ctx);
			for (var i = 0;i < obj.count(ctx);i++)
			{
				var value = obj.item(ctx, i);
				value = this.PrimitiveToObject(ctx, value);
				res.pushValue(ctx, value);
			}
			return res.toCollection(ctx);
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Map");
			var res = new __v1(ctx);
			var keys = obj.keys(ctx);
			for (var i = 0;i < keys.count(ctx);i++)
			{
				var key = keys.item(ctx, i);
				var value = obj.item(ctx, key);
				value = this.PrimitiveToObject(ctx, value);
				res.setValue(ctx, key, value);
			}
			if (!res.has(ctx, "__class_name__"))
			{
				return res.toDict(ctx);
			}
			if (res.item(ctx, "__class_name__") == "Runtime.Map" || res.item(ctx, "__class_name__") == "Runtime.Dict")
			{
				res.remove(ctx, "__class_name__");
				return res.toDict(ctx);
			}
			var class_name = res.item(ctx, "__class_name__");
			var __v2 = use("Runtime.rtl");
			if (!__v2.class_exists(ctx, class_name))
			{
				return null;
			}
			var __v2 = use("Runtime.rtl");
			if (!__v2.class_implements(ctx, class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var __v2 = use("Runtime.Map");
			var obj = new __v2(ctx);
			var __v3 = use("Runtime.rtl");
			var names = __v3.getFields(ctx, class_name);
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(ctx, variable_name, null);
					obj.setValue(ctx, variable_name, value);
				}
			}
			/* New instance */
			var __v4 = use("Runtime.rtl");
			var instance = __v4.newInstance(ctx, class_name, use("Runtime.Collection").from([obj]));
			return instance;
		}
		var __v0 = use("Runtime.Date");
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = use("Runtime.DateTime");
		if (obj instanceof __v0)
		{
			return obj;
		}
		return null;
	},
	NativeToPrimitive: function(ctx, value)
	{
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (Array.isArray(value))
		{
			var new_value = _Collection.from(value);
			new_value = new_value.map(ctx, (ctx, val)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		if (typeof value == 'object')
		{
			if (value["__class_name__"] == "Runtime.Date")
			{
				var new_value = _Date.from(value);
				return new_value;
			}
			if (value["__class_name__"] == "Runtime.DateTime")
			{
				var new_value = _DateTime.from(value);
				return new_value;
			}
			var new_value = _Dict.from(value);
			new_value = new_value.map(ctx, (ctx, val, key)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		
		return value;
	},
	PrimitiveToNative: function(ctx, value)
	{
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _DateTime = use("Runtime.DateTime");
		var _Date = use("Runtime.Date");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (value instanceof _Date)
		{
			value = value.toDict(ctx).setIm(ctx, "__class_name__", "Runtime.Date");
		}
		else if (value instanceof _DateTime)
		{
			value = value.toDict(ctx).setIm(ctx, "__class_name__", "Runtime.DateTime");
		}
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each(ctx, (ctx, v)=>{
				arr.push( _Utils.PrimitiveToNative(ctx, v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each(ctx, (ctx, v, k)=>{
				obj[k] = _Utils.PrimitiveToNative(ctx, v);
			});
			return obj;
		}
		return value;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(ctx, value, flags, convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		
		if (convert) value = _Utils.ObjectToPrimitive(ctx, value);
		return JSON.stringify(value, (key, value) => {
			if (value instanceof _Date) value = value.toDict().setIm("__class_name__", "Runtime.Date");
			if (value instanceof _DateTime) value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			if (_rtl.isScalarValue(value)) return value;
			return null;
		});
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(ctx, obj)
	{
		try{
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			var res = null;
			try
			{
				res = JSON.parse(obj, function (key, value){
					if (value == null) return value;
					if (Array.isArray(value)){
						return _Collection.from(value);
					}
					if (typeof value == 'object'){
						return _Dict.from(value);
					}
					return value;
				});
			}
			catch (e)
			{
				res = null;
			}
			return this.PrimitiveToObject(ctx, res);
		}
		catch(e){
			throw e;
		}
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
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
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"defClass",
			"find_class",
			"is_instanceof",
			"is_implements",
			"class_exists",
			"class_implements",
			"getInterfaces",
			"method_exists",
			"newInstance",
			"method",
			"apply",
			"applyAsync",
			"methodApply",
			"applyMethod",
			"methodApplyAsync",
			"applyMethodAsync",
			"get",
			"attr",
			"setAttr",
			"to",
			"m_to",
			"m_def",
			"convert",
			"checkValue",
			"isEmpty",
			"exists",
			"isScalarValue",
			"isArray",
			"isBoolean",
			"isBool",
			"isInt",
			"isDouble",
			"isNumber",
			"isString",
			"isFn",
			"toString",
			"toStr",
			"toInt",
			"toBool",
			"toFloat",
			"toObject",
			"ceil",
			"floor",
			"round",
			"_memorizeValidHKey",
			"_memorizeClear",
			"_memorizeValue",
			"_memorizeSave",
			"sleep",
			"usleep",
			"unique",
			"uid",
			"time_uid",
			"random",
			"time",
			"utime",
			"trace",
			"getContext",
			"setContext",
			"createContext",
			"runApp",
			"getParents",
			"getClassAnnotations",
			"getClassAnnotationsWithParents",
			"getFieldInfo",
			"getFieldInfoWithParents",
			"getFields",
			"getFieldsAnnotations",
			"getFieldsAnnotationsWithParents",
			"getMethodsAnnotations",
			"getMethodsAnnotationsWithParents",
			"ObjectToNative",
			"NativeToObject",
			"ObjectToPrimitive",
			"PrimitiveToObject",
			"NativeToPrimitive",
			"PrimitiveToNative",
			"json_encode",
			"json_decode",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.rtl);
module.exports = Runtime.rtl;
if (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};