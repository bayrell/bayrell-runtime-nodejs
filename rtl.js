"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var StringInterface = require('./Interfaces/StringInterface.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
class rtl{
	static isBrowser(){
		
		return typeof window !== "undefined";
		return false;
	}
	
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	static find_class(class_name){
		if (class_name instanceof Function)
			return class_name;
		
		var class_name_arr = class_name.split('.');
		if (class_name_arr.length < 2)
			return null;
		
		var module_name = class_name_arr[0];
		var last_name = class_name_arr[ class_name_arr.length - 1 ];
		
		if (module_name == 'Runtime') 
			module_name = 'BayrellRuntime';
		
		module_name = rtl.convertNodeJSModuleName(module_name);
		var obj = require(module_name);
		for (var i=1; i<class_name_arr.length - 1; i++){
			if (!this.exists(obj[class_name_arr[i]])){
				obj = null;
				break;
			}
			obj = obj[ class_name_arr[i] ];
		}
		
		if (!this.exists(obj))
			return null;
		
		obj = obj[last_name];
		return obj;
	}
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	
	static is_instanceof(obj, class_name){
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	}
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	
	static implements(obj, interface_name){
		if (obj == undefined) return false;
		if (obj.__implements__ == undefined) return false;
		return obj.__implements__.indexOf(interface_name) != -1;
	}
	static is_implements(obj, interface_name){
		return this.implements(obj, interface_name);
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	
	static class_exists(class_name){
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		return true;
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	
	static class_implements(class_name, interface_name){
		var obj = this.find_class(class_name);
		var obj2 = this.find_class(interface_name);
		
		while (obj != null){
			if (obj.__static_implements__){
				if (obj.__static_implements__.indexOf( obj2 ) > -1 ){
					return true;
				}
			}
			obj = obj.__proto__;
		}
		
		return false;
	}
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	
	static method_exists(class_name, method_name){
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		if (
			!this.exists(obj[method_name]) && 
			!this.exists(obj.prototype) && 
			!this.exists(obj.prototype[method_name])
		) return false;
		return true;
	}
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	
	static newInstance(class_name, args){
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined) args = [];
		args = args.slice(); 
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	}
	/**
	 * Call method
	 * @return Object
	 */
	static f(f){
		return f;
	}
	/**
	 * Returns callback
	 * @return fun
	 */
	
	static method(obj, method_name){
		if (!(obj instanceof Object))
		{
			obj = this.find_class(obj);
		}
		return obj[method_name].bind(obj);
	}
	/**
	 * Returns callback
	 * @return fun
	 */
	
	static methodAwait(obj, method_name){
		if (!(obj instanceof Object))
		{
			obj = this.find_class(obj);
		}
		return function ()
		{
			var thread = new Runtime.AsyncThread();
			thread.run( obj[method_name].apply(obj, arguments) );
		}
	}
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	static convert(value, type_value, def_value, type_template){
		if (def_value == undefined) def_value=null;
		if (type_template == undefined) type_template="";
		if (type_value == "mixed" || type_value == "primitive" || type_value == "var" || type_value == "fun"){
			return value;
		}
		if (type_value == ""){
			return def_value;
		}
		if (value != null){
			if (type_value == "int" || type_value == "float" || type_value == "double" || type_value == "bool" || type_value == "string"){
				try{
					if (type_value == "int"){
						var val = rtl.toInt(value);
						return val;
					}
					else if (type_value == "float" || type_value == "double"){
						var val = rtl.toFloat(value);
						return val;
					}
					else if (type_value == "bool"){
						var val = rtl.toBool(value);
						return val;
					}
					else if (type_value == "string"){
						var val = rtl.toString(value);
						return val;
					}
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
					}
					else { throw _the_exception; }
				}
			}
			else if ((type_value == "Runtime.Vector" || type_value == "Runtime.Map" || type_value == "Runtime.Collection" || type_value == "Runtime.Dict") && type_template != ""){
				
				if (this.is_instanceof(value, "Runtime.Collection") || this.is_instanceof(value, "Runtime.Dict"))
				{
					return value._correctItemsByType(type_template);
				}
				return null;
			}
			else if (rtl.is_instanceof(value, type_value)){
				return value;
			}
		}
		return def_value;
	}
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	static checkValue(value, tp){
		if (tp == "int"){
			return rtl.isInt(value);
		}
		if (tp == "float" || tp == "double"){
			return rtl.isDouble(value);
		}
		if (tp == "string"){
			return rtl.isString(value);
		}
		if (tp == "bool" || tp == "boolean"){
			return rtl.isBoolean(value);
		}
		if (rtl.is_instanceof(value, tp)){
			return true;
		}
		return false;
	}
	/**
	 * Clone var
	 * @param {var} value - Variable
	 * @return {var} result
	 */
	
	static clone(val, context){
		if (isBrowser()) return Runtime.rtl._clone(val, context);
		else return rtl._clone(val, context);
	}
	static _clone(val){
		if (val == null)
			return null;
		
		else if (val instanceof Number || typeof val == "number"){
			return val;
		}
		else if (val instanceof String || typeof val == "string"){
			return (new String(val)).toString();
		}
		else if (val instanceof Boolean || typeof val == "boolean"){
			return val;
		}
		else if (val instanceof Date){
			return new Date(val);
		}
		else if (typeof val == 'object' && val.nodeType && typeof val.cloneNode == "function"){
			return val.cloneNode(true);
		}
		else if (typeof val == 'object' && 
			val.createNewInstance && typeof val.createNewInstance == "function" &&
			val.assignObject && typeof val.assignObject == "function")
		{
			var res = val.createNewInstance();
			if (res) res.assignObject(val);
			return res;
		}
		else if (typeof val == 'object' && 
			val.getClassName && typeof val.getClassName == "function" &&
			val.assignObject && typeof val.assignObject == "function")
		{
			var res = null;
			if (isBrowser()) res = Runtime.rtl.newInstance( val.getClassName() );
			else res = rtl.newInstance( val.getClassName() );
			if (res) res.assignObject(val);
			return res;
		}
		else if (Array.isArray(val)){	
			var res = [];
			for (var i=0;i<val.length;i++){
				if (isBrowser()) res[i] = Runtime.rtl._clone(val[i]);
				else res[i] = rtl._clone(val[i]);
			}
			return res;
		}
		
		return null;
	}
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return boolean
	 */
	
	static exists(value){
		return (value != null) && (value != undefined);
	}
	/**
	 * Returns true if value is scalar value
	 * @return boolean 
	 */
	static isScalarValue(value){
		if (value == null){
			return true;
		}
		if (rtl.isString(value)){
			return true;
		}
		if (rtl.isNumber(value)){
			return true;
		}
		if (rtl.isBoolean(value)){
			return true;
		}
		return false;
	}
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return boolean
	 */
	static isBoolean(value){
		if (value === false || value === true){
			return true;
		}
		return false;
	}
	/**
	 * Return true if value is number
	 * @param var value
	 * @return boolean
	 */
	
	static isInt(value){
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
	}
	/**
	 * Return true if value is number
	 * @param var value
	 * @return boolean
	 */
	
	static isDouble(value){
		if (typeof value == "number") return true;
		return false;
	}
	/**
	 * Return true if value is number
	 * @param var value
	 * @return boolean
	 */
	
	static isNumber(value){
		if (typeof value == "number") return true;
		return false;
	}
	/**
	 * Return true if value is string
	 * @param var value
	 * @return boolean
	 */
	
	static isString(value){
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	}
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	
	static toString(value){
		var _StringInterface = null;
		if (isBrowser()) _StringInterface = Runtime.Interfaces.StringInterface; 
		else _StringInterface = StringInterface;
		if (typeof value == 'string') return value;
		if (value instanceof String) return ""+value;
		if (this.implements(value, _StringInterface)) return value.toString();
		return ""+value;
	}
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	
	static toInt(val){
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		throw new Error("Error convert to int");
	}
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	
	static toBool(val){
		var res = false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		throw new Error("Error convert to boolean");
	}
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	
	static toFloat(val){
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		throw new Error("Error convert to float");
	}
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	
	static ceil(value){
		return Math.ceil(value);
	}
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	
	static floor(value){
		return Math.floor(value);
	}
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	
	static round(value){
		return Math.round(value);
	}
	/**
	 * Convert module name to node js package
	 */
	
	static convertNodeJSModuleName(name){
		name = new String(name);
		var arr1 = "qazwsxedcrfvtgbyhnujmikolp";
		var arr2 = "01234567890";
		var res = "";
		var sz = name.length;
		var previsbig = false;
		for (var i = 0; i < sz; i++){
			var ch = name[i];
			var ch2 = ch.toUpperCase();
			var ch3 = ch.toLowerCase();
			var isAlpha = arr1.indexOf(ch3) != -1;
			var isNum = arr2.indexOf(ch3) != -1;
			if (i > 0 && ch == ch2 && !previsbig && isAlpha){
				res += "-";
			}
			res += ch3;
			if (ch == ch2 && isAlpha){
				previsbig = true;
			}
			else {
				previsbig = false;
			}
			if (!isAlpha && !isNum){
				previsbig = true;
			}
		}
		res += "-nodejs";
		return res;
	}
	/* ================ Memorize functions ================ */
	/**
	 * Clear memorize cache
	 */
	static _memorizeClear(){
		this._memorize_cache = null;
	}
	/**
	 * Returns cached value
	 */
	
	static _memorizeValue(name, args, f)
	{
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
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
	}
	/**
	 * Returns cached value
	 */
	
	static _memorizeSave(name, args, value)
	{
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
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
	}
	/* ================ Dirty functions ================ */
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	
	static unique(flag){
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	}
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	
	static dump(value){
		console.log(value);
	}
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	
	static random(a, b){
		if (window != undefined && window.crypto != undefined && window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		return Math.floor(Math.random() * (b - a + 1) + a);
	}
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	
	static time(){
		return Math.round((new Date()).getTime() / 1000);
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	static translate(message, params, locale, context){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		if (context == undefined) context=null;
		
		return this.callStaticMethod("Runtime.RuntimeUtils", "translate", [message, params, locale, context]);
	}
	/**
	 * Json encode data
	 * @param mixed data
	 * @return string
	 */
	static json_encode(data){
		
		return this.callStaticMethod("Runtime.RuntimeUtils", "json_encode", [data]);
	}
	/**
	 * Normalize UIStruct
	 * @param mixed data
	 * @return UIStruct
	 */
	static normalizeUI(data){
		
		return this.callStaticMethod("Runtime.RuntimeUtils", "normalizeUI", [data]);
	}
	/**
	 * Normalize UIStruct
	 * @param mixed data
	 * @return UIStruct
	 */
	static normalizeUIVector(data){
		
		return this.callStaticMethod("Runtime.RuntimeUtils", "normalizeUIVector", [data]);
	}
	/* =================== Deprecated =================== */
	/**
	 * Call method
	 * @return Object
	 */
	
	static call(f, args){
		if (args == undefined) return f.apply(null);
		return f.apply(null, args);
	}
	/**
	 * Call method
	 * @return Object
	 */
	
	static callMethod(obj, method_name, args){
		var f = obj[method_name];
		return f.apply(obj, args);
	}
	/**
	 * Call method
	 * @return Object
	 */
	
	static callStaticMethod(class_name, method_name, args){
		var obj = this.find_class(class_name);
		var f = obj[method_name];
		if (f == null || f == undefined){
			throw new Error(class_name + "." + method_name + " not found");
		}
		return f.apply(obj, args);
	}
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	static correct(value, type_value, def_value, type_template){
		if (def_value == undefined) def_value=null;
		if (type_template == undefined) type_template="";
		return this.convert(value, type_value, def_value, type_template);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.rtl";}
	static getCurrentClassName(){return "Runtime.rtl";}
	static getParentClassName(){return "";}
}
rtl._memorize_cache = null;
module.exports = rtl;

rtl._memorize_not_found = {'s':'memorize_key_not_found'};