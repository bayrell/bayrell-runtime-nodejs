"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.RuntimeUtils = function(__ctx)
{
};
Object.assign(Runtime.RuntimeUtils.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.RuntimeUtils"))
		{
		}
	},
	assignValue: function(__ctx,k,v)
	{
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(__ctx)
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
	getContext: function(__ctx)
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
	getParents: function(__ctx, class_name)
	{
		var __v0 = use("Runtime.Vector");
		var res = new __v0(__ctx);
		res.push(__ctx, class_name);
		while (class_name != "")
		{
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(__ctx, class_name, "getParentClassName");
			class_name = f(__ctx);
			if (class_name != "")
			{
				res.push(__ctx, class_name);
			}
		}
		return res.toCollection(__ctx);
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getVariablesNames: function(__ctx, class_name, flag)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getVariablesNames", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 2;
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(__ctx, class_name);
		var __v0 = use("Runtime.Vector");
		var names = class_names.reduce(__ctx, (__ctx, names, item_class_name) => 
		{
			var item_fields = null;
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(__ctx, item_class_name, "getFieldsList");
			try
			{
				item_fields = f(__ctx, flag);
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
				names.appendVector(__ctx, item_fields);
			}
			return names;
		}, new __v0(__ctx));
		var __memorize_value = names.toCollection(__ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getVariablesNames", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospection: function(__ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getClassIntrospection", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var class_info = null;
		var __v0 = use("Runtime.Map");
		var fields = new __v0(__ctx);
		var __v0 = use("Runtime.Map");
		var methods = new __v0(__ctx);
		var info = null;
		/* Append annotations */
		var appendAnnotations = (__ctx, arr, name, info) => 
		{
			if (!arr.has(__ctx, name))
			{
				var __v0 = use("Runtime.Vector");
				arr.set(__ctx, name, new __v0(__ctx));
			}
			var v = arr.item(__ctx, name);
			v.appendVector(__ctx, info.annotations);
		};
		/* Get Class Info */
		try
		{
			var __v0 = use("Runtime.rtl");
			info = __v0.method(__ctx, class_name, "getClassInfo")(__ctx);
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
		var class_names = Runtime.RuntimeUtils.getParents(__ctx, class_name);
		for (var i = 0;i < class_names.count(__ctx);i++)
		{
			var item_class_name = class_names.item(__ctx, i);
			/* Get fields introspection */
			var item_fields = null;
			try
			{
				var __v0 = use("Runtime.rtl");
				item_fields = __v0.method(__ctx, item_class_name, "getFieldsList")(__ctx, 3);
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
			for (var j = 0;j < item_fields.count(__ctx);j++)
			{
				var field_name = item_fields.item(__ctx, j);
				var __v0 = use("Runtime.rtl");
				info = __v0.method(__ctx, item_class_name, "getFieldInfoByName")(__ctx, field_name);
				appendAnnotations(__ctx, fields, field_name, info);
			}
			/* Get methods introspection */
			var item_methods = null;
			try
			{
				var __v0 = use("Runtime.rtl");
				item_methods = __v0.method(__ctx, item_class_name, "getMethodsList")(__ctx);
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
			for (var j = 0;j < item_methods.count(__ctx);j++)
			{
				var method_name = item_methods.item(__ctx, j);
				var __v0 = use("Runtime.rtl");
				info = __v0.method(__ctx, item_class_name, "getMethodInfoByName")(__ctx, method_name);
				appendAnnotations(__ctx, methods, method_name, info);
			}
		}
		/* To Collection */
		methods = methods.map(__ctx, (__ctx, item, name) => 
		{
			return item.toCollection(__ctx);
		});
		fields = fields.map(__ctx, (__ctx, item, name) => 
		{
			return item.toCollection(__ctx);
		});
		var __v0 = use("Runtime.Annotations.IntrospectionClass");
		var __v1 = use("Runtime.rtl");
		var __memorize_value = new __v0(__ctx, use("Runtime.Dict").from({"class_name":class_name,"class_info":(class_info != null) ? class_info.toCollection(__ctx) : null,"fields":fields.toDict(__ctx),"methods":methods.toDict(__ctx),"interfaces":__v1.getInterfaces(__ctx, class_name)}));
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(__ctx, value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = false;
		value = Runtime.RuntimeUtils.ObjectToPrimitive(__ctx, value, force_class_name);
		value = Runtime.RuntimeUtils.PrimitiveToNative(__ctx, value);
		return value;
	},
	NativeToObject: function(__ctx, value)
	{
		value = Runtime.RuntimeUtils.NativeToPrimitive(__ctx, value);
		value = Runtime.RuntimeUtils.PrimitiveToObject(__ctx, value);
		return value;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(__ctx, obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = false;
		if (obj === null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(__ctx, obj))
		{
			return obj;
		}
		var __v0 = use("Runtime.Collection");
		if (obj instanceof __v0)
		{
			return obj.map(__ctx, (__ctx, value) => 
			{
				return this.ObjectToPrimitive(__ctx, value, force_class_name);
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
			obj = obj.map(__ctx, (__ctx, key, value) => 
			{
				return this.ObjectToPrimitive(__ctx, value, force_class_name);
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
				obj = obj.setIm(__ctx, "__class_name__", "Runtime.Dict");
			}
			return obj.toDict(__ctx);
		}
		var __v0 = use("Runtime.Interfaces.SerializeInterface");
		if (Runtime.rtl.is_implements(obj, __v0))
		{
			var __v1 = use("Runtime.Map");
			var values = new __v1(__ctx);
			var names = this.getVariablesNames(__ctx, obj.getClassName(__ctx), 1);
			for (var i = 0;i < names.count(__ctx);i++)
			{
				var variable_name = names.item(__ctx, i);
				var value = obj.takeValue(__ctx, variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(__ctx, value, force_class_name);
				values.set(__ctx, variable_name, value);
			}
			values.set(__ctx, "__class_name__", obj.getClassName(__ctx));
			return values.toDict(__ctx);
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(__ctx, obj)
	{
		if (obj === null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(__ctx, obj))
		{
			return obj;
		}
		var __v0 = use("Runtime.Collection");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Vector");
			var res = new __v1(__ctx);
			for (var i = 0;i < obj.count(__ctx);i++)
			{
				var value = obj.item(__ctx, i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(__ctx, value);
				res.push(__ctx, value);
			}
			return res.toCollection(__ctx);
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Map");
			var res = new __v1(__ctx);
			var keys = obj.keys(__ctx);
			for (var i = 0;i < keys.count(__ctx);i++)
			{
				var key = keys.item(__ctx, i);
				var value = obj.item(__ctx, key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(__ctx, value);
				res.set(__ctx, key, value);
			}
			if (!res.has(__ctx, "__class_name__"))
			{
				return res;
			}
			if (res.item(__ctx, "__class_name__") == "Runtime.Map" || res.item(__ctx, "__class_name__") == "Runtime.Dict")
			{
				res.remove(__ctx, "__class_name__");
				return res.toDict(__ctx);
			}
			var class_name = res.item(__ctx, "__class_name__");
			var __v1 = use("Runtime.rtl");
			if (!__v1.class_exists(__ctx, class_name))
			{
				return null;
			}
			var __v1 = use("Runtime.rtl");
			if (!__v1.class_implements(__ctx, class_name, "Runtime.Interfaces.SerializeInterface"))
			{
				return null;
			}
			/* New instance */
			var __v1 = use("Runtime.rtl");
			var instance = __v1.newInstance(__ctx, class_name, null);
			/* Assign values */
			var __v1 = use("Runtime.Map");
			var obj = new __v1(__ctx);
			var names = this.getVariablesNames(__ctx, class_name, 1);
			for (var i = 0;i < names.count(__ctx);i++)
			{
				var variable_name = names.item(__ctx, i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(__ctx, variable_name, null);
					obj.set(__ctx, variable_name, value);
					instance.assignValue(__ctx, variable_name, value);
				}
			}
			var __v1 = use("Runtime.CoreStruct");
			if (instance instanceof __v1)
			{
				instance.initData(__ctx, null, obj);
			}
			return instance;
		}
		return null;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(__ctx, value, flags, convert)
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
		
		if (convert) value = _Utils.ObjectToPrimitive(__ctx, value);
		return JSON.stringify(value, function (key, value){
			if (_rtl.isScalarValue(value)) return value;
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			return null;
		});
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(__ctx, s)
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
			
			var obj = JSON.parse(s, function (key, value){
				if (value == null) return value;
				if (Array.isArray(value)){
					return _Collection.from(value);
				}
				if (typeof value == 'object'){
					return _Dict.from(value);
				}
				return value;
			});
			return _Utils.PrimitiveToObject(__ctx, obj);
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
	base64_encode: function(__ctx, s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	base64_decode: function(__ctx, s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	base64_encode_url: function(__ctx, s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	base64_decode_url: function(__ctx, s)
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
	randomString: function(__ctx, length, options)
	{
		if (length == undefined) length = 16;
		if (options == undefined) options = "abc";
		var s = "";
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(__ctx, options, "a") >= 0)
		{
			s += use("Runtime.rtl").toStr("abcdefghjkmnpqrstuvwxyz");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(__ctx, options, "b") >= 0)
		{
			s += use("Runtime.rtl").toStr("ABCDEFGHJKMNPQRSTUVWXYZ");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(__ctx, options, "c") >= 0)
		{
			s += use("Runtime.rtl").toStr("1234567890");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(__ctx, options, "d") >= 0)
		{
			s += use("Runtime.rtl").toStr("!@#$%^&?*_-+=~(){}[]<>|/,.:;\\");
		}
		var __v0 = use("Runtime.rs");
		if (__v0.strpos(__ctx, options, "e") >= 0)
		{
			s += use("Runtime.rtl").toStr("`\"'");
		}
		var res = "";
		var __v0 = use("Runtime.rs");
		var c = __v0.strlen(__ctx, s);
		for (var i = 0;i < length;i++)
		{
			var __v0 = use("Runtime.rtl");
			var k = __v0.random(__ctx, 0, c - 1);
			res += use("Runtime.rtl").toStr(s[k]);
		}
		return res;
	},
	/**
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	isPrimitiveValue: function(__ctx, value)
	{
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(__ctx, value))
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
	bytesToString: function(__ctx, arr, charset)
	{
		if (charset == undefined) charset = "utf8";
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param charset - Result bytes charset. Default utf8
	 * @return Collection<byte> output collection
	 */
	toString: function(__ctx, arr, charset)
	{
		if (charset == undefined) charset = "utf8";
		return this.bytesToString(__ctx, arr, charset);
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param Vector<byte> arr - output vector
	 * @param charset - Result bytes charset. Default utf8
	 */
	stringToBytes: function(__ctx, s, arr, charset)
	{
		if (charset == undefined) charset = "utf8";
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param charset - Result bytes charset. Default utf8
	 * @return Collection<byte> output collection
	 */
	toBytes: function(__ctx, s, charset)
	{
		if (charset == undefined) charset = "utf8";
		return this.stringToBytes(__ctx, s, charset);
	},
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Dict params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(__ctx, message, params, locale, context)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		if (context == undefined) context = null;
		if (context == null)
		{
			context = Runtime.RuntimeUtils.getContext(__ctx);
		}
		if (context != null)
		{
			context.translate(__ctx, message, params, locale);
		}
		return message;
	},
	/**
	 * Retuns css hash 
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(__ctx, s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getCssHash", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(__ctx, s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			var __v1 = use("Runtime.rs");
			var c = __v0.ord(__ctx, __v1.substr(__ctx, s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			var __v0 = use("Runtime.rs");
			r += use("Runtime.rtl").toStr(__v0.substr(__ctx, a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Normalize UIStruct
	 */
	normalizeUIVector: function(__ctx, data)
	{
		var __v0 = use("Runtime.Collection");
		var __v1 = use("Runtime.UIStruct");
		var __v2 = use("Runtime.rtl");
		if (data instanceof __v0)
		{
			var __v1 = use("Runtime.Vector");
			var res = new __v1(__ctx);
			for (var i = 0;i < data.count(__ctx);i++)
			{
				var item = data.item(__ctx, i);
				var __v1 = use("Runtime.Collection");
				var __v2 = use("Runtime.UIStruct");
				var __v3 = use("Runtime.rtl");
				if (item instanceof __v1)
				{
					var new_item = this.normalizeUIVector(__ctx, item);
					res.appendVector(__ctx, new_item);
				}
				else if (item instanceof __v2)
				{
					res.push(__ctx, item);
				}
				else if (__v3.isString(__ctx, item))
				{
					var __v4 = use("Runtime.UIStruct");
					var __v5 = use("Runtime.UIStruct");
					var __v6 = use("Runtime.rtl");
					res.push(__ctx, new __v4(__ctx, use("Runtime.Dict").from({"kind":__v5.TYPE_RAW,"content":__v6.toString(__ctx, item)})));
				}
			}
			return res.toCollection(__ctx);
		}
		else if (data instanceof __v1)
		{
			var __v2 = use("Runtime.Collection");
			return new __v2(__ctx, this.normalizeUI(__ctx, data));
		}
		else if (__v2.isString(__ctx, data))
		{
			var __v3 = use("Runtime.Collection");
			return new __v3(__ctx, this.normalizeUI(__ctx, data));
		}
		return null;
	},
	/**
	 * Normalize UIStruct
	 */
	normalizeUI: function(__ctx, data)
	{
		var __v0 = use("Runtime.UIStruct");
		var __v1 = use("Runtime.rtl");
		if (data instanceof __v0)
		{
			var obj = use("Runtime.Dict").from({"children":this.normalizeUIVector(__ctx, data.children)});
			var __v1 = use("Runtime.Map");
			if (data.props != null && data.props instanceof __v1)
			{
				obj.set(__ctx, "props", data.props.toDict(__ctx));
			}
			return data.copy(__ctx, obj);
		}
		else if (__v1.isString(__ctx, data))
		{
			var __v2 = use("Runtime.UIStruct");
			var __v3 = use("Runtime.UIStruct");
			var __v4 = use("Runtime.rtl");
			return new __v2(__ctx, use("Runtime.Dict").from({"kind":__v3.TYPE_RAW,"content":__v4.toString(__ctx, data)}));
		}
		return null;
	},
	/* Lambda Functions */
	isInstance: function(__ctx, class_name)
	{
		return (__ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.is_instance(__ctx, item, class_name);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(__ctx, value)
	{
		return (__ctx, item) => 
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(__ctx, value)
	{
		return (__ctx, item) => 
		{
			return item != value;
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(__ctx, key, def_value)
	{
		return (__ctx, item1) => 
		{
			return item1.takeValue(__ctx, key, def_value);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalItemKey: function(__ctx, key)
	{
		return (__ctx, item1, value) => 
		{
			return item1.takeValue(__ctx, key) == value;
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(__ctx, items, start)
	{
		if (start == undefined) start = 0;
		return items.reduce(__ctx, (__ctx, value, item) => 
		{
			return (item.id > value) ? item.id : value;
		}, start);
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
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.RuntimeUtils",
			"name": "Runtime.RuntimeUtils",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.RuntimeUtils);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.RuntimeUtils = Runtime.RuntimeUtils;