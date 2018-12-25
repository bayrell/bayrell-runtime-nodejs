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
var Context = require('./Context.js');
var Map = require('./Map.js');
var rs = require('./rs.js');
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
class RuntimeUtils{
	/* ================================ Context Functions ================================ */
	/**
	 * Returns global context
	 * @return ContextInterface
	 */
	static getContext(){
		
		return RuntimeUtils._global_context;
	}
	/**
	 * Set global context
	 * @param ContextInterface context
	 */
	static setContext(context){
		
		if (isBrowser()) Runtime.RuntimeUtils._global_context = context;
		else RuntimeUtils._global_context = context;
		return context;
	}
	/**
	 * Register global Context
	 */
	static createContext(modules){
		if (modules == undefined) modules=null;
		var context = new Context();
		if (modules != null){
			modules.each((module) => {
				context.registerModule(module);
			});
		}
		return context;
	}
	/**
	 * Register global Context
	 */
	static registerGlobalContext(modules){
		if (modules == undefined) modules=null;
		var context = RuntimeUtils.createContext(modules);
		context.init();
		RuntimeUtils.setContext(context);
		return context;
	}
	/* ========================== Class Introspection Functions ========================== */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	static getParents(class_name){
		var res = new Vector();
		while (class_name != ""){
			class_name = rtl.callStaticMethod(class_name, "getParentClassName");
			if (class_name != ""){
				res.push(class_name);
			}
		}
		return res;
	}
	/**
	 * Returns true if class exists
	 * @return Vector<string>
	 */
	
	static getInterfaces(class_name){
		return new Vector();
	}
	/**
	 * Returns names of variables to serialization
	 * @param Vector<string>
	 */
	static getVariablesNames(class_name, names){
		var classes = RuntimeUtils.getParents(class_name);
		classes.prepend(class_name);
		classes.each((class_name) => {
			try{
				rtl.callStaticMethod(class_name, "getFieldsList", (new Vector()).push(names));
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			try{
				rtl.callStaticMethod(class_name, "getVirtualFieldsList", (new Vector()).push(names));
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
		});
		names.removeDublicates();
	}
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	static getIntrospection(class_name){
		var res = new Vector();
		var class_names = RuntimeUtils.getParents(class_name);
		class_names.prepend(class_name);
		class_names.each((item_class_name) => {
			var names = new Vector();
			/* Get fields introspection */
			try{
				rtl.callStaticMethod(item_class_name, "getFieldsList", (new Vector()).push(names));
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			names.each((field_name) => {
				var info = null;
				try{
					info = rtl.callStaticMethod(item_class_name, "getFieldInfoByName", (new Vector()).push(field_name));
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
						info = null;
					}
					else { throw _the_exception; }
				}
				if (info != null){
					info.class_name = item_class_name;
					res.push(info);
				}
			});
			/* Get virtual fields introspection */
			names.clear();
			try{
				rtl.callStaticMethod(item_class_name, "getVirtualFieldsList", (new Vector()).push(names));
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			names.each((field_name) => {
				var info = null;
				try{
					info = rtl.callStaticMethod(item_class_name, "getVirtualFieldInfo", (new Vector()).push(field_name));
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
						info = null;
					}
					else { throw _the_exception; }
				}
				if (info != null){
					info.class_name = item_class_name;
					res.push(info);
				}
			});
			/* Get methods introspection */
			names.clear();
			try{
				rtl.callStaticMethod(item_class_name, "getMethodsList", (new Vector()).push(names));
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			names.each((method_name) => {
				var info = null;
				try{
					info = rtl.callStaticMethod(item_class_name, "getMethodInfoByName", (new Vector()).push(method_name));
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
						info = null;
					}
					else { throw _the_exception; }
				}
				if (info != null){
					info.class_name = item_class_name;
					res.push(info);
				}
			});
			/* Get class introspection */
			try{
				info = rtl.callStaticMethod(item_class_name, "getClassInfo", (new Vector()));
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
					info = null;
				}
				else { throw _the_exception; }
			}
			if (info != null){
				info.class_name = item_class_name;
				res.push(info);
			}
		});
		return res;
	}
	/* ============================= Serialization Functions ============================= */
	static ObjectToNative(value, force_class_name){
		if (force_class_name == undefined) force_class_name=false;
		value = RuntimeUtils.ObjectToPrimitive(value, force_class_name);
		value = RuntimeUtils.PrimitiveToNative(value);
		return value;
	}
	static NativeToObject(value){
		value = RuntimeUtils.NativeToPrimitive(value);
		value = RuntimeUtils.PrimitiveToObject(value);
		return value;
	}
	/**
	 * Returns object to primitive value
	 * @param mixed obj
	 * @return mixed
	 */
	static ObjectToPrimitive(obj, force_class_name){
		if (force_class_name == undefined) force_class_name=false;
		if (obj === null){
			return null;
		}
		if (rtl.isScalarValue(obj)){
			return obj;
		}
		if (obj instanceof Vector){
			var res = new Vector();
			for (var i = 0; i < obj.count(); i++){
				var value = obj.item(i);
				value = RuntimeUtils.ObjectToPrimitive(value, force_class_name);
				res.push(value);
			}
			return res;
		}
		if (obj instanceof Map){
			var res = new Map();
			var keys = obj.keys();
			for (var i = 0; i < keys.count(); i++){
				var key = keys.item(i);
				var value = obj.item(key);
				value = RuntimeUtils.ObjectToPrimitive(value, force_class_name);
				res.set(key, value);
			}
			if (force_class_name){
				res.set("__class_name__", "Runtime.Map");
			}
			return res;
		}
		if (rtl.implements(obj, SerializeInterface)){
			var names = new Vector();
			var values = new Map();
			obj.getVariablesNames(names);
			for (var i = 0; i < names.count(); i++){
				var variable_name = names.item(i);
				var value = obj.takeValue(variable_name, null);
				var value = RuntimeUtils.ObjectToPrimitive(value, force_class_name);
				values.set(variable_name, value);
			}
			values.set("__class_name__", obj.getClassName());
			return values;
		}
		return null;
	}
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return mixed
	 */
	static PrimitiveToObject(obj){
		if (obj === null){
			return null;
		}
		if (rtl.isScalarValue(obj)){
			return obj;
		}
		if (obj instanceof Vector){
			var res = new Vector();
			for (var i = 0; i < obj.count(); i++){
				var value = obj.item(i);
				value = RuntimeUtils.PrimitiveToObject(value);
				res.push(value);
			}
			return res;
		}
		if (obj instanceof Map){
			var res = new Map();
			var keys = obj.keys();
			for (var i = 0; i < keys.count(); i++){
				var key = keys.item(i);
				var value = obj.item(key);
				value = RuntimeUtils.PrimitiveToObject(value);
				res.set(key, value);
			}
			if (!res.has("__class_name__")){
				return res;
			}
			if (res.item("__class_name__") == "Runtime.Map"){
				res.remove("__class_name__");
				return res;
			}
			var class_name = res.item("__class_name__");
			if (!rtl.class_exists(class_name)){
				return null;
			}
			if (!rtl.class_implements(class_name, "Runtime.Interfaces.SerializeInterface")){
				return null;
			}
			var instance = rtl.newInstance(class_name, null);
			var names = new Vector();
			instance.getVariablesNames(names);
			for (var i = 0; i < names.count(); i++){
				var variable_name = names.item(i);
				if (variable_name != "__class_name__"){
					var value = res.get(variable_name, null);
					instance.assignValue(variable_name, value);
				}
			}
			return instance;
		}
		return null;
	}
	
	static NativeToPrimitive(value){
		
		var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Vector=null; if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null; if (isBrowser()) _Map=Runtime.Map; else _Map=Map;
		
		if (value === null)
			return null;
		
		if (Array.isArray(value)){
			var new_value = (new _Vector()).concat(value);
			new_value = new_value.map((val)=>{
				return _Utils.NativeToPrimitive(val);
			});
			return new_value;
		}
		if (typeof value == 'object'){
			var new_value = new _Map(value);
			new_value = new_value.map((key, val)=>{
				return _Utils.NativeToPrimitive(val);
			});
			return new_value;
		}
		
		return value;
	}
	static PrimitiveToNative(value){
		
		var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=Utils;
		var _Vector=null; if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null; if (isBrowser()) _Map=Runtime.Map; else _Map=Map;
		
		if (value === null)
			return null;
		
		if (value instanceof _Vector){
			var arr = [];
			value.each((v)=>{
				arr.push( _Utils.PrimitiveToNative(v) );
			});
			return arr;
		}
		if (value instanceof _Map){
			var obj = {};
			value.each((k, v)=>{
				obj[k] = _Utils.PrimitiveToNative(v);
			});
			return obj;
		}
		
		return value;
	}
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	
	static json_encode(value, flags, convert){
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Vector=null;if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null;if (isBrowser()) _Map=Runtime.Map; else _Map=Map;
		var _rtl=null;if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		if (convert) value = _Utils.ObjectToPrimitive(value);
		return JSON.stringify(value, function (key, value){
			if (_rtl.isScalarValue(value)) return value;
			if (value instanceof _Vector) return value;
			if (value instanceof _Map) return value.toObject();
			return undefined;
		});
	}
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return mixed 
	 */
	
	static json_decode(s, context){
		try{
			var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
			var _Vector=null;if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
			var _Map=null;if (isBrowser()) _Map=Runtime.Map; else _Map=Map;			
			var obj = JSON.parse(s, function (key, value){
				if (Array.isArray(value)){
					return new _Vector(value);
				}
				if (typeof value == 'object'){
					return new _Map(value);
				}
				
				return value;
			});
			return _Utils.PrimitiveToObject(obj);
		}
		catch(e){
			return null;
		}
	}
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	
	static base64_encode(s){
		return Buffer.from(s).toString('base64');
	}
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	
	static base64_decode(s){
		return Buffer.from(s, 'base64').toString('ascii');
	}
	/* ================================= Other Functions ================================= */
	/*
	 * Generate password
	 *
	 * @param int length The lenght of the password
	 * @param string options What kinds of the char can be in password
	 *   a - lower case chars
	 *   b - upper case chars
	 *   c - numbers
	 *   d - special chars !@#$%^&?*_-+=~(){}[]<>|/,.:;\\
	 *   e - quotes `"'
	 */
	static randomString(length, options){
		if (length == undefined) length=16;
		if (options == undefined) options="abc";
		var s = "";
		if (rs.strpos(options, "a") >= 0){
			s += "abcdefghjkmnpqrstuvwxyz";
		}
		if (rs.strpos(options, "b") >= 0){
			s += "ABCDEFGHJKMNPQRSTUVWXYZ";
		}
		if (rs.strpos(options, "c") >= 0){
			s += "1234567890";
		}
		if (rs.strpos(options, "d") >= 0){
			s += "!@#$%^&?*_-+=~(){}[]<>|/,.:;\\";
		}
		if (rs.strpos(options, "e") >= 0){
			s += "`\"'";
		}
		var res = "";
		var c = rs.strlen(s);
		for (var i = 0; i < length; i++){
			var k = rtl.random(0, c - 1);
			res += s[k];
		}
		return res;
	}
	/**
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	static isPrimitiveValue(value){
		if (rtl.isScalarValue(value)){
			return true;
		}
		if (value instanceof Vector){
			return true;
		}
		if (value instanceof Map){
			return true;
		}
		return false;
	}
	/**
	 * Convert bytes to string
	 * @param Vector<byte> arr - vector of the bytes
	 * @string charset - charset of the bytes vector. Default utf8
	 * @return string
	 */
	bytesToString(arr, charset){
		if (charset == undefined) charset="utf8";
	}
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param Vector<byte> arr - output vector
	 * @param charset - Result bytes charset. Default utf8
	 */
	stringToBytes(s, arr, charset){
		if (charset == undefined) charset="utf8";
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
		if (context == null){
			context = RuntimeUtils.globalContext();
		}
		if (context != null){
			var args = (new Vector()).push(message).push(params).push(locale);
			return rtl.callMethod(context, "translate", args);
		}
		return message;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.RuntimeUtils";}
	static getParentClassName(){return "";}
}
RuntimeUtils._global_context = null;
RuntimeUtils.JSON_PRETTY = 1;
module.exports = RuntimeUtils;