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
Runtime.BaseDriver = function(object_name, entity)
{
	if (object_name == undefined) object_name = "";
	if (entity == undefined) entity = null;
	Runtime.BaseObject.call(this);
	this.object_name = object_name;
	this.entity = entity;
};
Runtime.BaseDriver.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseDriver.prototype.constructor = Runtime.BaseDriver;
Object.assign(Runtime.BaseDriver.prototype,
{
	/**
	 * Returns object name
	 */
	getObjectName: function()
	{
		return this.object_name;
	},
	/**
	 * Returns entity
	 */
	getEntity: function()
	{
		return this.entity;
	},
	/**
	 * Start driver
	 */
	startDriver: async function()
	{
	},
	_init: function()
	{
		this.object_name = "";
		this.entity = null;
		Runtime.BaseObject.prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.BaseDriver";
	},
});
Object.assign(Runtime.BaseDriver, Runtime.BaseObject);
Object.assign(Runtime.BaseDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.BaseDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("object_name");
			a.push("entity");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "object_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entity") return Dict.from({
			"t": "Runtime.Entity",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Runtime.BaseDriver);
module.exports = Runtime.BaseDriver;