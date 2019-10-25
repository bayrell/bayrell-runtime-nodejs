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
/* Lambda Functions */
Runtime.lib = function(__ctx)
{
};
Object.assign(Runtime.lib.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.lib"))
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
		return "Runtime.lib";
	},
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(__ctx, class_name)
	{
		return (__ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.is_instanceof(__ctx, item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(__ctx, class_name)
	{
		return (__ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.is_implements(__ctx, item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(__ctx, class_name)
	{
		return (__ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.class_implements(__ctx, item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(__ctx, class_name)
	{
		return (__ctx, data) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.newInstance(__ctx, class_name, use("Runtime.Collection").from([data]));
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
			return (item1 != null) ? item1.takeValue(__ctx, key, def_value) : def_value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(__ctx, key, value)
	{
		return (__ctx, item1) => 
		{
			return (item1 != null) ? item1.takeValue(__ctx, key) == value : false;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(__ctx, key, value)
	{
		return (__ctx, item1) => 
		{
			return (item1 != null) ? item1.takeValue(__ctx, key) != value : false;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalMethod: function(__ctx, method_name, value)
	{
		return (__ctx, item1) => 
		{
			if (item1 == null)
			{
				return false;
			}
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(item1, method_name);
			return f(__ctx) == value;
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
	/**
	 * Take dict
	 */
	takeDict: function(__ctx, fields)
	{
		return (__ctx, item) => 
		{
			return item.takeDict(__ctx, fields);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.lib";
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
			"class_name": "Runtime.lib",
			"name": "Runtime.lib",
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
});use.add(Runtime.lib);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.lib = Runtime.lib;