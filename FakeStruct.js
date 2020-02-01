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
Runtime.FakeStruct = function(ctx, obj)
{
	use("Runtime.CoreObject").call(this, ctx);
	if (obj != null)
	{
		var __v0 = use("Runtime.Dict");
		if (!(obj instanceof __v0))
		{
			var _Dict = use("Runtime.Dict");
				if (typeof obj == "object") obj = _Dict.create(obj);
		}
		var rtl = use("Runtime.rtl");
			for (var key in obj._map)
			{
				this.assignValue(ctx, key.substring(1), obj._map[key]);
			}
		this.initData(ctx, null, obj);
	}
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
};
Runtime.FakeStruct.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.FakeStruct.prototype.constructor = Runtime.FakeStruct;
Object.assign(Runtime.FakeStruct.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(ctx, old, changed)
	{
		if (changed == undefined) changed = null;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return FakeStruct
	 */
	copy: function(ctx, obj)
	{
		if (obj == undefined) obj = null;
		var _rtl = use("Runtime.rtl");
		var _Dict = use("Runtime.Dict");
		if (obj == null){}
		else if (obj instanceof _Dict)
		{
			for (var key in obj._map)
			{
				this[key.substring(1)] = _rtl.clone(ctx, obj._map[key]);
			}
		}
		else
		{
			for (var key in obj)
			{
				this[key] = _rtl.clone(ctx, obj[key]);
			}
		}
		
		this.initData(this, obj);
		
		return this;
		return this;
	},
	/**
	 * Clone this struct with same values
	 * @param Map obj = null
	 * @return FakeStruct
	 */
	clone: function(ctx, fields)
	{
		if (fields == undefined) fields = null;
		var __v0 = use("Runtime.Map");
		var obj = new __v0(ctx);
		if (fields != null)
		{
			fields.each(ctx, (ctx, field_name) => 
			{
				var __v0 = use("Runtime.rtl");
				obj.set(ctx, field_name, __v0.clone(ctx, this.takeValue(ctx, field_name)));
			});
		}
		else
		{
			var __v0 = use("Runtime.RuntimeUtils");
			var names = __v0.getVariablesNames(ctx, this.getClassName(ctx));
			for (var i = 0;i < names.count(ctx);i++)
			{
				var field_name = names.item(ctx, i);
				var __v0 = use("Runtime.rtl");
				obj.set(ctx, field_name, __v0.clone(ctx, this.takeValue(ctx, field_name)));
			}
		}
		/* Return object */
		var res = this.constructor.newInstance(ctx, obj.toDict(ctx));
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return FakeStruct
	 */
	map: function(ctx, field_name, f)
	{
		var __v0 = use("Runtime.Map");
		return this.copy(ctx, (new __v0(ctx)).set(ctx, field_name, f(ctx, this.takeValue(ctx, field_name))).toDict(ctx));
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.FakeStruct"))
		{
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime.CoreObject").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.FakeStruct";
	},
});
Object.assign(Runtime.FakeStruct, use("Runtime.CoreObject"));
Object.assign(Runtime.FakeStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(ctx, items)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, items]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.FakeStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.FakeStruct",
			"name": "Runtime.FakeStruct",
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
	__implements__:
	[
		use(""),
		use("Runtime.Interfaces.SerializeInterface"),
	],
});use.add(Runtime.FakeStruct);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.FakeStruct = Runtime.FakeStruct;