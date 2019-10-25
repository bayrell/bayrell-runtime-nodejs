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
if (typeof Runtime.Annotations == 'undefined') Runtime.Annotations = {};
Runtime.Annotations.IntrospectionClass = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Annotations.IntrospectionClass.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Annotations.IntrospectionClass.prototype.constructor = Runtime.Annotations.IntrospectionClass;
Object.assign(Runtime.Annotations.IntrospectionClass.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__class_name = "";
		if (a.indexOf("class_name") == -1) defProp(this, "class_name");
		this.__class_info = null;
		if (a.indexOf("class_info") == -1) defProp(this, "class_info");
		this.__fields = null;
		if (a.indexOf("fields") == -1) defProp(this, "fields");
		this.__methods = null;
		if (a.indexOf("methods") == -1) defProp(this, "methods");
		this.__interfaces = null;
		if (a.indexOf("interfaces") == -1) defProp(this, "interfaces");
		use("Runtime.CoreStruct").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Annotations.IntrospectionClass"))
		{
			this.__class_name = o.__class_name;
			this.__class_info = o.__class_info;
			this.__fields = o.__fields;
			this.__methods = o.__methods;
			this.__interfaces = o.__interfaces;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "class_name")this.__class_name = v;
		else if (k == "class_info")this.__class_info = v;
		else if (k == "fields")this.__fields = v;
		else if (k == "methods")this.__methods = v;
		else if (k == "interfaces")this.__interfaces = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.__class_name;
		else if (k == "class_info")return this.__class_info;
		else if (k == "fields")return this.__fields;
		else if (k == "methods")return this.__methods;
		else if (k == "interfaces")return this.__interfaces;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Annotations.IntrospectionClass";
	},
});
Object.assign(Runtime.Annotations.IntrospectionClass, use("Runtime.CoreStruct"));
Object.assign(Runtime.Annotations.IntrospectionClass,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.IntrospectionClass";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Annotations.IntrospectionClass",
			"name": "Runtime.Annotations.IntrospectionClass",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("class_info");
			a.push("fields");
			a.push("methods");
			a.push("interfaces");
		}
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
});use.add(Runtime.Annotations.IntrospectionClass);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Annotations == undefined) module.exports.Runtime.Annotations = {};
module.exports.Runtime.Annotations.IntrospectionClass = Runtime.Annotations.IntrospectionClass;