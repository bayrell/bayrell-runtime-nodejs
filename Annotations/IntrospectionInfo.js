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
Runtime.Annotations.IntrospectionInfo = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Annotations.IntrospectionInfo.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Annotations.IntrospectionInfo.prototype.constructor = Runtime.Annotations.IntrospectionInfo;
Object.assign(Runtime.Annotations.IntrospectionInfo.prototype,
{
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	filterAnnotations: function(__ctx, class_name)
	{
		if (this.annotations == null)
		{
			return null;
		}
		var __v0 = use("Runtime.lib");
		return this.annotations.filter(__ctx, __v0.isInstance(__ctx, class_name)).toCollection(__ctx);
	},
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__class_name = "";
		if (a.indexOf("class_name") == -1) defProp(this, "class_name");
		this.__kind = "";
		if (a.indexOf("kind") == -1) defProp(this, "kind");
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__annotations = null;
		if (a.indexOf("annotations") == -1) defProp(this, "annotations");
		use("Runtime.CoreStruct").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Annotations.IntrospectionInfo"))
		{
			this.__class_name = o.__class_name;
			this.__kind = o.__kind;
			this.__name = o.__name;
			this.__annotations = o.__annotations;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "class_name")this.__class_name = v;
		else if (k == "kind")this.__kind = v;
		else if (k == "name")this.__name = v;
		else if (k == "annotations")this.__annotations = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.__class_name;
		else if (k == "kind")return this.__kind;
		else if (k == "name")return this.__name;
		else if (k == "annotations")return this.__annotations;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Annotations.IntrospectionInfo";
	},
});
Object.assign(Runtime.Annotations.IntrospectionInfo, use("Runtime.CoreStruct"));
Object.assign(Runtime.Annotations.IntrospectionInfo,
{
	ITEM_CLASS: "class",
	ITEM_FIELD: "field",
	ITEM_METHOD: "method",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.IntrospectionInfo";
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
			"class_name": "Runtime.Annotations.IntrospectionInfo",
			"name": "Runtime.Annotations.IntrospectionInfo",
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
			a.push("kind");
			a.push("name");
			a.push("annotations");
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
});use.add(Runtime.Annotations.IntrospectionInfo);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Annotations == undefined) module.exports.Runtime.Annotations = {};
module.exports.Runtime.Annotations.IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;