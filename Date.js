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
Runtime.Date = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.Date.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.Date.prototype.constructor = Runtime.Date;
Object.assign(Runtime.Date.prototype,
{
	/**
	 * Return date
	 * @return string
	 */
	getDate: function(ctx)
	{
		return this.y + use("Runtime.rtl").toStr("-") + use("Runtime.rtl").toStr(this.m) + use("Runtime.rtl").toStr("-") + use("Runtime.rtl").toStr(this.d);
	},
	/**
	 * Normalize date time
	 */
	normalize: function(ctx)
	{
		return this;
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.y = 0;
		this.m = 0;
		this.d = 0;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.y;
		else if (k == "m")return this.m;
		else if (k == "d")return this.d;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.Date, use("Runtime.BaseStruct"));
Object.assign(Runtime.Date,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Date";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
	getFieldsList: function(ctx)
	{
		var a = [];
		a.push("y");
		a.push("m");
		a.push("d");
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "y") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "m") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "d") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"getDate",
			"normalize",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Date);
module.exports = Runtime.Date;
Runtime.Date.prototype.toObject = function(ctx)
{
	var dt = new Date(this.y, this.m - 1, this.d);
	return dt;
}
Runtime.Date.fromObject = function(ctx, dt)
{
	var Dict = use("Runtime.Dict");
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var dt = new Runtime.Date( ctx, Dict.from({"y":y,"m":m,"d":d}) );
	return dt;
}