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
Runtime.re = function(ctx)
{
};
Object.assign(Runtime.re.prototype,
{
});
Object.assign(Runtime.re,
{
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	split: function(ctx, delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp(delimiter, "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	match: function(ctx, r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.match( new RegExp(r, pattern) ) != null;
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	matchAll: function(ctx, r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		
		var arr = [];
		var r = new RegExp(r, pattern);
		
		if (s.matchAll == undefined)
		{
			while ((m = r.exec(s)) !== null)
			{
				arr.push(m);
			}
		}
		else arr = [...s.matchAll(r)];
		
		if (arr.length == 0) return null;
		return Runtime.Collection.from( arr.map( (v) => Runtime.Collection.from(v) ) );
		return null;
	},
	/**
	 * Replace with regular expression
	 * @param string r - regular expression
	 * @param string replace - new value
	 * @param string s - replaceable string
	 * @return string
	 */
	replace: function(ctx, r, replace, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.replace(new RegExp(r, pattern), replace);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.re";
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
});use.add(Runtime.re);
module.exports = Runtime.re;