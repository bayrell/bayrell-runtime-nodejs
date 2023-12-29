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
/* Math Functions */
Runtime.math = function(ctx)
{
};
Object.assign(Runtime.math.prototype,
{
});
Object.assign(Runtime.math,
{
	/**
	 * Round double
	 */
	round: function(ctx, a)
	{
		return Math.round(a);
	},
	/**
	 * Floor double
	 */
	floor: function(ctx, a)
	{
		return Math.floor(a);
	},
	/**
	 * Floor ceil
	 */
	ceil: function(ctx, a)
	{
		return Math.ceil(a);
	},
	/**
	 * Returns max
	 */
	max: function(ctx, a, b)
	{
		if (a > b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/**
	 * Returns min
	 */
	min: function(ctx, a, b)
	{
		if (a < b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.math";
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
});use.add(Runtime.math);
module.exports = Runtime.math;