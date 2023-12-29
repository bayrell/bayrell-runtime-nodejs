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
	/**
	 * Init struct data
	 */
	_init_data: function(ctx, obj)
	{
		return obj;
	},
	/**
	 * Assign new values
	 */
	_assign_values: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		if (typeof obj == 'object' && !(obj instanceof Runtime.Dict))
		{
			obj = new Runtime.Dict(obj);
		}
		if (obj == null)
		{
			return ;
		}
		if (obj.keys(ctx).count(ctx) == 0)
		{
			return ;
		}
		var check_types = false;
		var class_name = this.constructor.getClassName(ctx);
		obj = this._init_data(ctx, obj);
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
				this[real_key] = value;
			}
		}
		else
		{
			for (var key in obj)
			{
				var value = obj[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(ctx, class_name, key);
					if (info)
					{
						value = rtl.convert(ctx, value, info.get(ctx, "t"), null);
					}
				}
				this[key] = value;
			}
		}
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
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		return use("Runtime.Vector").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
		];
		return use("Runtime.Vector").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.BaseObject);
module.exports = Runtime.BaseObject;