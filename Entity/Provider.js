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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Provider = function(ctx, name, value)
{
	use("Runtime.Entity").call(this, ctx, use("Runtime.Map").from({"name":name,"value":value}));
};
Runtime.Entity.Provider.prototype = Object.create(use("Runtime.Entity").prototype);
Runtime.Entity.Provider.prototype.constructor = Runtime.Entity.Provider;
Object.assign(Runtime.Entity.Provider.prototype,
{
	_init: function(ctx)
	{
		use("Runtime.Entity").prototype._init.call(this,ctx);
		this.value = "";
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		return use("Runtime.Entity").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.Entity.Provider, use("Runtime.Entity"));
Object.assign(Runtime.Entity.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
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
		a.push("value");
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
});use.add(Runtime.Entity.Provider);
module.exports = Runtime.Entity.Provider;