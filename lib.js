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
/* Lambda Functions */
Runtime.lib = function(ctx)
{
};
Object.assign(Runtime.lib.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.lib"))
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
		return "Runtime.lib";
	},
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(ctx, class_name)
	{
		return (ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.is_instanceof(ctx, item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(ctx, class_name)
	{
		return (ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.is_implements(ctx, item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(ctx, class_name)
	{
		return (ctx, item) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.class_implements(ctx, item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(ctx, class_name)
	{
		return (ctx, data) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.newInstance(ctx, class_name, use("Runtime.Collection").from([data]));
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(ctx, value)
	{
		return (ctx, item) => 
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(ctx, value)
	{
		return (ctx, item) => 
		{
			return item != value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(ctx, key, value)
	{
		return (ctx, item1) => 
		{
			return (item1 != null) ? (item1.takeValue(ctx, key) == value) : (false);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(ctx, key, value)
	{
		return (ctx, item1) => 
		{
			return (item1 != null) ? (item1.takeValue(ctx, key) != value) : (false);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalMethod: function(ctx, method_name, value)
	{
		return (ctx, item1) => 
		{
			if (item1 == null)
			{
				return false;
			}
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(item1, method_name);
			return f(ctx) == value;
		};
	},
	/**
	 * Returns key value of obj
	 */
	get: function(ctx, key, def_value)
	{
		return (ctx, obj) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.attr(ctx, obj, use("Runtime.Collection").from([key]), def_value);
		};
	},
	/**
	 * Set value
	 */
	set: function(ctx, key, value)
	{
		return (ctx, obj) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.setAttr(ctx, obj, use("Runtime.Collection").from([key]), value);
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(ctx, path, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, obj) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.attr(ctx, obj, path, def_value);
		};
	},
	/**
	 * Set dict attr
	 */
	setAttr: function(ctx, path, value)
	{
		return (ctx, obj) => 
		{
			var __v0 = use("Runtime.rtl");
			return __v0.setAttr(ctx, obj, path, value);
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(ctx, items, start)
	{
		if (start == undefined) start = 0;
		return items.reduce(ctx, (ctx, value, item) => 
		{
			return (item.id > value) ? (item.id) : (value);
		}, start);
	},
	/**
	 * Copy object
	 */
	copy: function(ctx, d)
	{
		return (ctx, item) => 
		{
			return item.copy(ctx, d);
		};
	},
	/**
	 * Take dict
	 */
	takeDict: function(ctx, fields)
	{
		return (ctx, item) => 
		{
			return item.takeDict(ctx, fields);
		};
	},
	/**
	 * Map
	 */
	map: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.map(ctx, f);
		};
	},
	/**
	 * Filter
	 */
	filter: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.filter(ctx, f);
		};
	},
	/**
	 * Sort
	 */
	sort: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.sortIm(ctx, f);
		};
	},
	/**
	 * Transition
	 */
	transition: function(ctx, f)
	{
		return (ctx, m) => 
		{
			return m.transition(ctx, f);
		};
	},
	/**
	 * Sort asc
	 */
	sortAsc: function(ctx, a, b)
	{
		return (a > b) ? (1) : ((a < b) ? (-1) : (0));
	},
	/**
	 * Sort desc
	 */
	sortDesc: function(ctx, a, b)
	{
		return (a > b) ? (-1) : ((a < b) ? (1) : (0));
	},
	/**
	 * Convert monad by type
	 */
	to: function(ctx, type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			var __v0 = use("Runtime.Monad");
			var __v1 = use("Runtime.rtl");
			return new __v0(ctx, (m.err == null) ? (__v1.convert(m.value(ctx), type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad by type
	 */
	default: function(ctx, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (ctx, m) => 
		{
			var __v0 = use("Runtime.Monad");
			return (m.err != null || m.val === null) ? (new __v0(ctx, def_value)) : (m);
		};
	},
	/**
	 * Set monad new value
	 */
	newValue: function(ctx, value, clear_error)
	{
		if (value == undefined) value = null;
		if (clear_error == undefined) clear_error = false;
		return (ctx, m) => 
		{
			var __v0 = use("Runtime.Monad");
			var __v1 = use("Runtime.Monad");
			return (clear_error == true) ? (new __v0(ctx, value)) : ((m.err == null) ? (new __v1(ctx, value)) : (m));
		};
	},
	/**
	 * Clear error
	 */
	clearError: function(ctx)
	{
		return (ctx, m) => 
		{
			var __v0 = use("Runtime.Monad");
			return new __v0(ctx, m.val);
		};
	},
	/**
	 * Returns monad
	 */
	monad: function(ctx, m)
	{
		return m;
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.lib",
			"name": "Runtime.lib",
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
});use.add(Runtime.lib);
module.exports = Runtime.lib;