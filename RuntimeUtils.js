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
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
Runtime.RuntimeUtils = function(ctx)
{
};
Object.assign(Runtime.RuntimeUtils.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.RuntimeUtils"))
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
		return "Runtime.RuntimeUtils";
	},
});
Object.assign(Runtime.RuntimeUtils,
{
	_global_context: null,
	_variables_names: null,
	JSON_PRETTY: 1,
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		return RuntimeUtils._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		/*if (isBrowser()) Runtime.RuntimeUtils._global_context = context;
		else RuntimeUtils._global_context = context;*/
		use("Runtime.RuntimeUtils")._global_context = context;
		return context;
	},
	/* ========================== Class Introspection Functions ========================== */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(ctx, class_name)
	{
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		res.push(ctx, class_name);
		while (class_name != "")
		{
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, class_name, "getParentClassName");
			class_name = f(ctx);
			if (class_name != "")
			{
				res.push(ctx, class_name);
			}
		}
		return res.toCollection(ctx);
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getVariablesNames: function(ctx, class_name, flag)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getVariablesNames", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 2;
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		var __v0 = use("Runtime.Vector");
		var names = class_names.reduce(ctx, (ctx, names, item_class_name) => 
		{
			var item_fields = null;
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, item_class_name, "getFieldsList");
			try
			{
				item_fields = f(ctx, flag);
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
			if (item_fields != null)
			{
				names.appendVector(ctx, item_fields);
			}
			return names;
		}, new __v0(ctx));
		var __memorize_value = names.toCollection(ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getVariablesNames", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospection: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getClassIntrospection", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var class_info = null;
		var __v0 = use("Runtime.Map");
		var fields = new __v0(ctx);
		var __v0 = use("Runtime.Map");
		var methods = new __v0(ctx);
		var info = null;
		var __v0 = use("Runtime.rtl");
		if (!__v0.class_exists(ctx, class_name))
		{
			var __memorize_value = null;
			use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
			return __memorize_value;
		}
		/* Append annotations */
		var appendAnnotations = (ctx, arr, name, info) => 
		{
			if (info == null)
			{
				return ;
			}
			if (!arr.has(ctx, name))
			{
				var __v0 = use("Runtime.Vector");
				arr.set(ctx, name, new __v0(ctx));
			}
			var v = arr.item(ctx, name);
			v.appendVector(ctx, info.annotations);
		};
		/* Get Class Info */
		try
		{
			var __v0 = use("Runtime.rtl");
			info = __v0.method(ctx, class_name, "getClassInfo")(ctx);
			if (info != null)
			{
				class_info = info.annotations;
			}
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
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		for (var i = 0;i < class_names.count(ctx);i++)
		{
			var item_class_name = class_names.item(ctx, i);
			/* Get fields introspection */
			var item_fields = null;
			try
			{
				var __v0 = use("Runtime.rtl");
				item_fields = __v0.method(ctx, item_class_name, "getFieldsList")(ctx, 3);
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
			for (var j = 0;j < item_fields.count(ctx);j++)
			{
				var field_name = item_fields.item(ctx, j);
				var __v0 = use("Runtime.rtl");
				info = __v0.method(ctx, item_class_name, "getFieldInfoByName")(ctx, field_name);
				appendAnnotations(ctx, fields, field_name, info);
			}
			/* Get methods introspection */
			var item_methods = null;
			try
			{
				var __v0 = use("Runtime.rtl");
				item_methods = __v0.method(ctx, item_class_name, "getMethodsList")(ctx);
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
			for (var j = 0;j < item_methods.count(ctx);j++)
			{
				var method_name = item_methods.item(ctx, j);
				var __v0 = use("Runtime.rtl");
				info = __v0.method(ctx, item_class_name, "getMethodInfoByName")(ctx, method_name);
				appendAnnotations(ctx, methods, method_name, info);
			}
		}
		/* To Collection */
		methods = methods.map(ctx, (ctx, item, name) => 
		{
			return item.toCollection(ctx);
		});
		fields = fields.map(ctx, (ctx, item, name) => 
		{
			return item.toCollection(ctx);
		});
		var __v0 = use("Runtime.Annotations.IntrospectionClass");
		var __v1 = use("Runtime.rtl");
		var __memorize_value = new __v0(ctx, use("Runtime.Dict").from({"class_name":class_name,"class_info":(class_info != null) ? class_info.toCollection(ctx) : null,"fields":fields.toDict(ctx),"methods":methods.toDict(ctx),"interfaces":__v1.getInterfaces(ctx, class_name)}));
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(ctx, value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = false;
		var value1 = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
		var value2 = Runtime.RuntimeUtils.PrimitiveToNative(ctx, value1);
		return value2;
	},
	NativeToObject: function(ctx, value)
	{
		var value1 = Runtime.RuntimeUtils.NativeToPrimitive(ctx, value);
		var value2 = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value1);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(ctx, obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = false;
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
			/*
			Vector<var> res = new Vector();
			for (int i=0; i<obj.count(); i++)
			{
				var value = obj.item(i);
				value = self::ObjectToPrimitive( value, force_class_name );
				res.push(value);
			}
			return res.toCollection();
			*/
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			obj = obj.map(ctx, (ctx, value, key) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
			/*
			Map<var> res = new Map();
			Vector<string> keys = obj.keys();
			
			for (int i=0; i<keys.count(); i++)
			{
				string key = keys.item(i);
				var value = obj.item(key);
				value = self::ObjectToPrimitive( value, force_class_name );
				res.set(key, value);
			}
			
			delete keys;
			*/
			if (force_class_name)
			{
				obj = obj.setIm(ctx, "__class_name__", "Runtime.Dict");
			}
			return obj.toDict(ctx);
		}
		var __v0 = use("Runtime.Interfaces.SerializeInterface");
		if (Runtime.rtl.is_implements(obj, __v0))
		{
			var __v1 = use("Runtime.Map");
			var values = new __v1(ctx);
			var names = this.getVariablesNames(ctx, obj.getClassName(ctx), 1);
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				var value = obj.takeValue(ctx, variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
				values.set(ctx, variable_name, value);
			}
			values.set(ctx, "__class_name__", obj.getClassName(ctx));
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
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.push(ctx, value);
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
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.set(ctx, key, value);
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
			var __v1 = use("Runtime.rtl");
			if (!__v1.class_exists(ctx, class_name))
			{
				return null;
			}
			var __v1 = use("Runtime.rtl");
			if (!__v1.class_implements(ctx, class_name, "Runtime.Interfaces.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var __v1 = use("Runtime.Map");
			var obj = new __v1(ctx);
			var names = this.getVariablesNames(ctx, class_name, 1);
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(ctx, variable_name, null);
					obj.set(ctx, variable_name, value);
				}
			}
			/* New instance */
			var __v1 = use("Runtime.rtl");
			var instance = __v1.newInstance(ctx, class_name, use("Runtime.Collection").from([obj]));
			return instance;
		}
		return null;
	},
	NativeToPrimitive: function(ctx, value)
	{
		/*var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Vector=null; if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null; if (isBrowser()) _Map=Runtime.Map; else _Map=Map;*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (Array.isArray(value)){
			var new_value = _Collection.from(value);
			new_value = new_value.map(ctx, (ctx, val)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		if (typeof value == 'object'){
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
		/*var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=Utils;
		var _Collection=null; if (isBrowser()) _Collection=Runtime.Collection; else _Collection=Collection;
		var _Dict=null; if (isBrowser()) _Dict=Runtime.Dict; else _Dict=Dict;*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each((v)=>{
				arr.push( _Utils.PrimitiveToNative(v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each((k, v)=>{
				obj[k] = _Utils.PrimitiveToNative(v);
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
		/*
		var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Collection=null;if (isBrowser()) _Collection=Runtime.Collection; else _Collection=Collection;
		var _Dict=null;if (isBrowser()) _Dict=Runtime.Dict; else _Dict=Dict;
		var _rtl=null;if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (convert) value = _Utils.ObjectToPrimitive(ctx, value);
		return JSON.stringify(value, (key, value) => {
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
			/*
			var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
			var _Vector=null;if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
			var _Map=null;if (isBrowser()) _Map=Runtime.Map; else _Map=Map;	
			*/
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			
			var obj = JSON.parse(obj, function (key, value){
				if (value == null) return value;
				if (Array.isArray(value)){
					return _Collection.from(value);
				}
				if (typeof value == 'object'){
					return _Dict.from(value);
				}
				return value;
			});
			return _Utils.PrimitiveToObject(ctx, obj);
		}
		catch(e){
			throw e;
		}
		return null;
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	base64_encode: function(ctx, s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	base64_decode: function(ctx, s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	base64_encode_url: function(ctx, s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	base64_decode_url: function(ctx, s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
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
	randomString: function(ctx, length, options)
	{
		if (length == undefined) length = 16;
		if (options == undefined) options = "abc";
		var s = "";
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(ctx, options, "a") >= 0)
		{
			s += use("Runtime.rtl").toStr("abcdefghjkmnpqrstuvwxyz");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(ctx, options, "b") >= 0)
		{
			s += use("Runtime.rtl").toStr("ABCDEFGHJKMNPQRSTUVWXYZ");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(ctx, options, "c") >= 0)
		{
			s += use("Runtime.rtl").toStr("1234567890");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(ctx, options, "d") >= 0)
		{
			s += use("Runtime.rtl").toStr("!@#$%^&?*_-+=~(){}[]<>|/,.:;\\");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(ctx, options, "e") >= 0)
		{
			s += use("Runtime.rtl").toStr("`\"'");
		}
		var res = "";
		var __v0 = use("Runtime.rs");
		var c = __v0.strlen(ctx, s);
		for (var i = 0;i < length;i++)
		{
			var __v0 = use("Runtime.rtl");
			var k = __v0.random(ctx, 0, c - 1);
			res += use("Runtime.rtl").toStr(s[k]);
		}
		return res;
	},
	/**
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	isPrimitiveValue: function(ctx, value)
	{
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(ctx, value))
		{
			return true;
		}
		var __v0 = use("Runtime.Vector");
		if (value instanceof __v0)
		{
			return true;
		}
		var __v0 = use("Runtime.Map");
		if (value instanceof __v0)
		{
			return true;
		}
		return false;
	},
	/**
	 * Convert bytes to string
	 * @param Vector<byte> arr - vector of the bytes
	 * @string charset - charset of the bytes vector. Default utf8
	 * @return string
	 */
	bytesToString: function(ctx, arr, charset)
	{
		if (charset == undefined) charset = "utf8";
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param charset - Result bytes charset. Default utf8
	 * @return Collection<byte> output collection
	 */
	toString: function(ctx, arr, charset)
	{
		if (charset == undefined) charset = "utf8";
		return this.bytesToString(ctx, arr, charset);
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param Vector<byte> arr - output vector
	 * @param charset - Result bytes charset. Default utf8
	 */
	stringToBytes: function(ctx, s, arr, charset)
	{
		if (charset == undefined) charset = "utf8";
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param charset - Result bytes charset. Default utf8
	 * @return Collection<byte> output collection
	 */
	toBytes: function(ctx, s, charset)
	{
		if (charset == undefined) charset = "utf8";
		return this.stringToBytes(ctx, s, charset);
	},
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Dict params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(ctx, message, params, locale, context)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		if (context == undefined) context = null;
		if (context == null)
		{
			context = Runtime.RuntimeUtils.getContext(ctx);
		}
		if (context != null)
		{
			context.translate(ctx, message, params, locale);
		}
		return message;
	},
	/**
	 * Retuns css hash 
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(ctx, s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getCssHash", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			var __v1 = use("Runtime.rs");
			var c = __v0.ord(ctx, __v1.substr(ctx, s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			var __v0 = use("Runtime.rs");
			r += use("Runtime.rtl").toStr(__v0.substr(ctx, a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.RuntimeUtils";
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
			"class_name": "Runtime.RuntimeUtils",
			"name": "Runtime.RuntimeUtils",
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
		if (field_name == "_global_context") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_variables_names") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "JSON_PRETTY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
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
});use.add(Runtime.RuntimeUtils);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.RuntimeUtils = Runtime.RuntimeUtils;