"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.BaseObject = function(ctx)
{
	/* Init object */
	this._init(ctx);
};
Object.assign(Runtime.BaseObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function(ctx)
	{
	},
});
Object.assign(Runtime.BaseObject,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(ctx, items)
	{
		return null;
	},
	/**
	 * Init struct data
	 */
	_init_data: function(ctx, old, changed)
	{
		return changed;
	},
	/**
	 * Assign
	 */
	_assign: function(ctx, new_item, old_item, obj)
	{
		var __v0 = use("Runtime.rtl");
		obj = __v0.convert(ctx, obj, "Runtime.Dict");
		obj = new_item.constructor._init_data(ctx, old_item, obj);
		if (obj == null)
		{
			return ;
		}
		var check_types = false;
		var class_name = new_item.constructor.getClassName(ctx);
		var _Dict = use("Runtime.Dict");
		var rtl = use("Runtime.rtl");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map)
			{
				var real_key = key.substring(1);
				var value = obj._map[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(ctx, class_name, real_key);
					if (info)
					{
						value = rtl.convert(ctx, value, info.get(ctx, "t"), null);
					}
				}
				new_item[real_key] = value;
			}
		}
		else
		{
			for (var key in obj)
			{
				var value = obj[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(ctx, new_item.getClassName(), key);
					if (info)
					{
						value = rtl.convert(ctx, value, info.get(ctx, "t"), null);
					}
				}
				new_item[key] = value;
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseObject";
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
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.BaseObject);
module.exports = Runtime.BaseObject;