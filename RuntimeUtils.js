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
Runtime.RuntimeUtils = function()
{
};
Object.assign(Runtime.RuntimeUtils.prototype,
{
	getClassName: function()
	{
		return "Runtime.RuntimeUtils";
	},
});
Object.assign(Runtime.RuntimeUtils,
{
	_variables_names: null,
	JSON_PRETTY: 1,
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		var value1 = Runtime.RuntimeUtils.ObjectToPrimitive(value, force_class_name);
		var value2 = Runtime.RuntimeUtils.PrimitiveToNative(value1);
		return value2;
	},
	NativeToObject: function(value)
	{
		var value1 = Runtime.RuntimeUtils.NativeToPrimitive(value);
		var value2 = Runtime.RuntimeUtils.PrimitiveToObject(value1);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		if (obj === null)
		{
			return null;
		}
		var __v0 = Runtime.rtl;
		if (__v0.isScalarValue(obj))
		{
			return obj;
		}
		var __v0 = Runtime.Collection;
		if (obj instanceof __v0)
		{
			return obj.map((value) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
		}
		var __v0 = Runtime.Dict;
		if (obj instanceof __v0)
		{
			obj = obj.map((value, key) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
			return obj.toDict();
		}
		var __v0 = Runtime.Date;
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = Runtime.DateTime;
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = Runtime.BaseStruct;
		if (obj instanceof __v0)
		{
			var __v1 = Runtime.Map;
			var values = new __v1();
			var __v2 = Runtime.rtl;
			var names = __v2.getFields(obj.getClassName());
			for (var i = 0;i < names.count();i++)
			{
				var variable_name = names.item(i);
				var value = obj.get(variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(value, force_class_name);
				values.setValue(variable_name, value);
			}
			if (force_class_name)
			{
				values.setValue("__class_name__", obj.getClassName());
			}
			return values.toDict();
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(obj)
	{
		if (obj === null)
		{
			return null;
		}
		var __v0 = Runtime.rtl;
		if (__v0.isScalarValue(obj))
		{
			return obj;
		}
		var __v0 = Runtime.Collection;
		if (obj instanceof __v0)
		{
			var __v1 = Runtime.Vector;
			var res = new __v1();
			for (var i = 0;i < obj.count();i++)
			{
				var value = obj.item(i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.pushValue(value);
			}
			return res.toCollection();
		}
		var __v0 = Runtime.Dict;
		if (obj instanceof __v0)
		{
			var __v1 = Runtime.Map;
			var res = new __v1();
			var keys = obj.keys();
			for (var i = 0;i < keys.count();i++)
			{
				var key = keys.item(i);
				var value = obj.item(key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.setValue(key, value);
			}
			if (!res.has("__class_name__"))
			{
				return res.toDict();
			}
			if (res.item("__class_name__") == "Runtime.Map" || res.item("__class_name__") == "Runtime.Dict")
			{
				res.remove("__class_name__");
				return res.toDict();
			}
			var class_name = res.item("__class_name__");
			var __v2 = Runtime.rtl;
			if (!__v2.class_exists(class_name))
			{
				return null;
			}
			var __v2 = Runtime.rtl;
			if (!__v2.class_implements(class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var __v2 = Runtime.Map;
			var obj = new __v2();
			var __v3 = Runtime.rtl;
			var names = __v3.getFields(class_name);
			for (var i = 0;i < names.count();i++)
			{
				var variable_name = names.item(i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(variable_name, null);
					obj.setValue(variable_name, value);
				}
			}
			/* New instance */
			var __v4 = Runtime.rtl;
			var instance = __v4.newInstance(class_name, Runtime.Collection.from([obj]));
			return instance;
		}
		return null;
	},
	NativeToPrimitive: function(value)
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
			new_value = new_value.map((val)=>{
				return _Utils.NativeToPrimitive(val);
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
			new_value = new_value.map((val, key)=>{
				return _Utils.NativeToPrimitive(val);
			});
			return new_value;
		}
		
		return value;
	},
	PrimitiveToNative: function(value)
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
			value = value.toDict().setIm("__class_name__", "Runtime.Date");
		}
		else if (value instanceof _DateTime)
		{
			value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
		}
		
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
			value.each((v, k)=>{
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
	json_encode: function(value, flags, convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (convert) value = _Utils.ObjectToPrimitive(value);
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
	json_decode: function(obj)
	{
		try{
			
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
			return _Utils.PrimitiveToObject(obj);
		}
		catch(e){
			throw e;
		}
		return null;
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
		if (field_name == "_variables_names") return Dict.from({
			"t": "Runtime.Map",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "JSON_PRETTY") return Dict.from({
			"t": "int",
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
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Runtime.RuntimeUtils);
module.exports = Runtime.RuntimeUtils;