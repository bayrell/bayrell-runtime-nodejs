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
	getClassName(){return "Runtime.RuntimeUtils";}
	static getParentClassName(){return "";}
	/**
	 * Returns global context
	 * @return ContextInterface
	 */
	static globalContext(){
		
		if (isBrowser()) return Runtime.RuntimeUtils._global_context;
		return RuntimeUtils._global_context;
	}
	/**
	 * Set global context
	 * @param ContextInterface context
	 */
	static setGlobalContext(context){
		
		if (isBrowser()) Runtime.RuntimeUtils._global_context = context;
		else RuntimeUtils._global_context = context;
		return context;
	}
	/**
	 * Returns global context
	 * @param Context context
	 */
	static getGlobalContext(){
		return RuntimeUtils.globalContext();
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
		RuntimeUtils.setGlobalContext(context);
		return context;
	}
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
	 * Get value from object
	 */
	static get(obj, key, default_value){
		if (default_value == undefined) default_value=null;
		if (obj instanceof Vector){
			return obj.get(key, default_value);
		}
		if (obj instanceof Map){
			return obj.get(key, default_value);
		}
		
		if (typeof obj == 'object'){
			if (typeof obj[key] != undefined) 
				return obj[key];
		}
		return default_value;
	}
	/**
	 * Set value to object
	 */
	static set(obj, key, value){
		if (value == undefined) value=null;
		if (obj instanceof Vector){
			obj.set(key, value);
		}
		if (obj instanceof Map){
			obj.set(key, value);
		}
		
		if (typeof obj == 'object'){
			obj[key] = value;
		}
	}
	/**
	 * Call each
	 */
	static each(obj, f){
		if (obj instanceof Vector){
			obj.each(f);
		}
		if (obj instanceof Map){
			obj.each(f);
		}
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
	/**
	 * Compare 2 Vectors, Returns true if arr1 and arr2 have same class names
	 * @param Vector<string> arr1
	 * @param Vector<string> arr2
	 * @return bool
	 */
	static equalsVectors(arr1, arr2){
		for (var i = 0; i < arr1.count(); i++){
			var item = arr1.item(i);
			if (arr2.indexOf(item) == -1){
				return false;
			}
		}
		for (var i = 0; i < arr2.count(); i++){
			var item = arr2.item(i);
			if (arr1.indexOf(item) == -1){
				return false;
			}
		}
		return true;
	}
	/**
	 * Returns object to primitive value
	 * @param mixed obj
	 * @return mixed
	 */
	static ObjectToPrimitive(obj){
		if (obj === null){
			return null;
		}
		if (rtl.isScalarValue(obj)){
			return obj;
		}
		if (obj instanceof Vector){
			return obj.map((value) => {
				return RuntimeUtils.ObjectToPrimitive(value);
			});
		}
		if (obj instanceof Map){
			obj = obj.map((key, value) => {
				return RuntimeUtils.ObjectToPrimitive(value);
			});
			return obj;
		}
		if (rtl.implements(obj, SerializeInterface)){
			var names = new Vector();
			var values = new Map();
			obj.getVariablesNames(names);
			names.each((variable_name) => {
				var value = obj.takeValue(variable_name, null);
				var value = RuntimeUtils.ObjectToPrimitive(value);
				values.set(variable_name, value);
			});
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
			return obj.map((value) => {
				return RuntimeUtils.PrimitiveToObject(value);
			});
		}
		if (obj instanceof Map){
			obj = obj.map((key, value) => {
				return RuntimeUtils.PrimitiveToObject(value);
			});
			if (!obj.has("__class_name__")){
				return obj;
			}
			if (obj.item("__class_name__") == "Runtime.Map"){
				obj.remove("__class_name__");
				return obj;
			}
			var class_name = obj.item("__class_name__");
			if (!rtl.class_exists(class_name)){
				return null;
			}
			if (!rtl.class_implements(class_name, "Runtime.Interfaces.SerializeInterface")){
				return null;
			}
			var instance = rtl.newInstance(class_name, null);
			var names = new Vector();
			instance.getVariablesNames(names);
			names.each((variable_name) => {
				if (variable_name == "__class_name__"){
					return ;
				}
				var value = obj.get(variable_name, null);
				instance.assignValue(variable_name, value);
			});
			return instance;
		}
		return null;
	}
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	
	static json_encode(value, convert){
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
		if (context == undefined) context = null;
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
			return _Utils.PrimitiveToObject(obj,context);
		}
		catch(e){
			return null;
		}
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
	static ObjectToNative(value){
		value = RuntimeUtils.ObjectToPrimitive(value);
		value = RuntimeUtils.PrimitiveToNative(value);
		return value;
	}
	static NativeToObject(value){
		value = RuntimeUtils.NativeToPrimitive(value);
		value = RuntimeUtils.PrimitiveToObject(value);
		return value;
	}
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
}
RuntimeUtils._global_context = null;
module.exports = RuntimeUtils;