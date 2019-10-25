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
Runtime.CoreObject = function(__ctx)
{
	this._init(__ctx);
};
Object.assign(Runtime.CoreObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function(__ctx)
	{
	},
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeValue: function(__ctx, variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
		return this.takeVirtualValue(__ctx, variable_name, default_value);
	},
	/**
	 * Returns virtual values
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeVirtualValue: function(__ctx, variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
		return default_value;
	},
	/**
	 * Set new value
	 * @param string variable_name
	 * @param var value
	 */
	assignValue: function(__ctx, variable_name, value)
	{
		this.assignVirtualValue(__ctx, variable_name, value);
	},
	/**
	 * Assign virtual value
	 * @param string variable_name
	 * @param var value
	 */
	assignVirtualValue: function(__ctx, variable_name, value)
	{
	},
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject: function(__ctx, obj)
	{
	},
	/**
	 * Set new values instance by Map
	 * @param Map<var> map
	 * @return CoreObject
	 */
	assignDict: function(__ctx, values)
	{
		if (values == undefined) values = null;
		if (values == null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		var f = __v0.method("Runtime.RuntimeUtils", "getVariablesNames");
		var names = f(__ctx, this.getClassName(__ctx), 2);
		for (var i = 0;i < names.count(__ctx);i++)
		{
			var name = names.item(__ctx, i);
			this.assignValue(__ctx, name, values.get(__ctx, name, null));
		}
		return this;
	},
	/**
	 * Set new values instance by Map
	 * @param Dict<var> map
	 * @return CoreObject
	 */
	setDict: function(__ctx, values)
	{
		if (values == undefined) values = null;
		if (values == null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		values.each(__ctx, __v0.method(this, "assignValue"));
		return this;
	},
	/**
	 * Dump serializable object to Map
	 * @return Map<var>
	 */
	takeDict: function(__ctx, fields, flag)
	{
		if (fields == undefined) fields = null;
		if (flag == undefined) flag = 2;
		var __v0 = use("Runtime.Map");
		var values = new __v0(__ctx);
		if (fields == null)
		{
			var __v0 = use("Runtime.rtl");
			var f = __v0.method("Runtime.RuntimeUtils", "getVariablesNames");
			var names = f(__ctx, this.getClassName(__ctx), flag);
			for (var i = 0;i < names.count(__ctx);i++)
			{
				var name = names.item(__ctx, i);
				values.set(__ctx, name, this.takeValue(__ctx, name, null));
			}
		}
		else
		{
			for (var i = 0;i < fields.count(__ctx);i++)
			{
				var name = fields.item(__ctx, i);
				values.set(__ctx, name, this.takeValue(__ctx, name, null));
			}
		}
		return values.toDict(__ctx);
	},
	staticMethod: function(method_name)
	{
		var __v0 = use("Runtime.rtl");
		return __v0.method(null, this.getClassName(), method_name);
	},
	callStatic: function(__ctx, method_name)
	{
		return null;
	},
	callStaticParent: function(__ctx, method_name)
	{
		return null;
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.CoreObject"))
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
		return "Runtime.CoreObject";
	},
});
Object.assign(Runtime.CoreObject,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreObject";
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
			"class_name": "Runtime.CoreObject",
			"name": "Runtime.CoreObject",
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
});use.add(Runtime.CoreObject);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.CoreObject = Runtime.CoreObject;