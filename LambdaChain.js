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
Runtime.LambdaChain = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.LambdaChain.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.LambdaChain.prototype.constructor = Runtime.LambdaChain;
Object.assign(Runtime.LambdaChain.prototype,
{
	logName: function()
	{
		return this.getClassName() + Runtime.rtl.toStr(" -> ") + Runtime.rtl.toStr(this.name) + Runtime.rtl.toStr(" -> [") + Runtime.rtl.toStr(this.pos) + Runtime.rtl.toStr("] ") + Runtime.rtl.toStr(this.value);
	},
	addClassItem: function(class_name, class_method_name, class_item, info)
	{
		return this.copy(Runtime.Dict.from({"value":class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(class_method_name)}));
	},
	_init: function()
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.name = "";
		this.value = "";
		this.chain = "";
		this.pos = 0;
		this.is_async = false;
		Runtime.BaseStruct.prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.LambdaChain";
	},
});
Object.assign(Runtime.LambdaChain, Runtime.BaseStruct);
Object.assign(Runtime.LambdaChain,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.LambdaChain";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
		if ((f&3)==3)
		{
			a.push("name");
			a.push("value");
			a.push("chain");
			a.push("pos");
			a.push("is_async");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "chain") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return Dict.from({
			"t": "double",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_async") return Dict.from({
			"t": "bool",
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
});use.add(Runtime.LambdaChain);
module.exports = Runtime.LambdaChain;