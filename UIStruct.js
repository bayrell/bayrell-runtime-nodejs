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
Runtime.UIStruct = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.UIStruct.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.UIStruct.prototype.constructor = Runtime.UIStruct;
Object.assign(Runtime.UIStruct.prototype,
{
	/**
	 * Returns true if component
	 * @return bool
	 */
	getTag: function(ctx)
	{
		if (this.props == null)
		{
			return null;
		}
		return this.props.get(ctx, "@tag", null);
	},
	/**
	 * Returns true if component
	 * @return bool
	 */
	isComponent: function(ctx)
	{
		return this.kind == Runtime.UIStruct.TYPE_COMPONENT;
	},
	/**
	 * Returns true if element
	 * @return bool
	 */
	isElement: function(ctx)
	{
		return this.kind == Runtime.UIStruct.TYPE_ELEMENT;
	},
	/**
	 * Returns true if string
	 * @return bool
	 */
	isString: function(ctx)
	{
		return this.kind == Runtime.UIStruct.TYPE_STRING || this.kind == Runtime.UIStruct.TYPE_RAW;
	},
	/**
	 * Returns model
	 * @return CoreStruct
	 */
	getModel: function(ctx)
	{
		return this.model;
		if (this.model != null)
		{
			return this.model;
		}
		if (this.kind == Runtime.UIStruct.TYPE_COMPONENT)
		{
			var __v0 = use("Runtime.rtl");
			var modelName = __v0.method(this.name, "modelName");
			var model_name = modelName(ctx);
			if (model_name == "")
			{
				return null;
			}
			var __v0 = use("Runtime.rtl");
			var model = __v0.newInstance(ctx, model_name, use("Runtime.Collection").from([this.props]));
			return model;
		}
		return null;
	},
	/**
	 * Returns key path
	 * @return string
	 */
	getKey: function(ctx, index)
	{
		return (this.key !== "") ? this.key : index;
	},
	/**
	 * Returns key path
	 * @return string
	 */
	getKeyPath: function(ctx, key_path, index)
	{
		return (key_path !== "") ? key_path + use("Runtime.rtl").toStr(".") + use("Runtime.rtl").toStr(this.getKey(ctx, index)) : this.getKey(ctx, index);
	},
	/**
	 * Returns attrs
	 */
	getAttrs: function(ctx)
	{
		if (this.props != null)
		{
			return this.props.filter(ctx, (ctx, key, value) => 
			{
				var __v0 = use("Runtime.rs");
				return __v0.strpos(ctx, key, "@") != 0 || key == "@class" || key == "@style";
			});
		}
		var __v0 = use("Runtime.Dict");
		return new __v0(ctx);
	},
	/**
	 * Returns props
	 */
	getProps: function(ctx)
	{
		if (this.props != null)
		{
			return this.props.filter(ctx, (ctx, key, value) => 
			{
				var __v0 = use("Runtime.rs");
				var __v1 = use("Runtime.rs");
				return __v0.strpos(ctx, key, "@") == 0 && __v1.strpos(ctx, key, "@on") != 0 && key != "@class";
			});
		}
		var __v0 = use("Runtime.Dict");
		return new __v0(ctx);
	},
	/**
	 * Returns events
	 */
	getEvents: function(ctx)
	{
		if (this.props != null)
		{
			return this.props.filter(ctx, (ctx, key, value) => 
			{
				var __v0 = use("Runtime.rs");
				return __v0.strpos(ctx, key, "@on") == 0;
			});
		}
		var __v0 = use("Runtime.Dict");
		return new __v0(ctx);
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.class_name = "";
		this.key = "";
		this.name = "";
		this.bind = "";
		this.kind = "element";
		this.content = "";
		this.reference = "";
		this.value = null;
		this.layout = null;
		this.model = null;
		this.props = null;
		this.annotations = null;
		this.children = null;
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.UIStruct"))
		{
			this.class_name = o.class_name;
			this.key = o.key;
			this.name = o.name;
			this.bind = o.bind;
			this.kind = o.kind;
			this.content = o.content;
			this.reference = o.reference;
			this.value = o.value;
			this.layout = o.layout;
			this.model = o.model;
			this.props = o.props;
			this.annotations = o.annotations;
			this.children = o.children;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "class_name")this.class_name = v;
		else if (k == "key")this.key = v;
		else if (k == "name")this.name = v;
		else if (k == "bind")this.bind = v;
		else if (k == "kind")this.kind = v;
		else if (k == "content")this.content = v;
		else if (k == "reference")this.reference = v;
		else if (k == "value")this.value = v;
		else if (k == "layout")this.layout = v;
		else if (k == "model")this.model = v;
		else if (k == "props")this.props = v;
		else if (k == "annotations")this.annotations = v;
		else if (k == "children")this.children = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.class_name;
		else if (k == "key")return this.key;
		else if (k == "name")return this.name;
		else if (k == "bind")return this.bind;
		else if (k == "kind")return this.kind;
		else if (k == "content")return this.content;
		else if (k == "reference")return this.reference;
		else if (k == "value")return this.value;
		else if (k == "layout")return this.layout;
		else if (k == "model")return this.model;
		else if (k == "props")return this.props;
		else if (k == "annotations")return this.annotations;
		else if (k == "children")return this.children;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.UIStruct";
	},
});
Object.assign(Runtime.UIStruct, use("Runtime.CoreStruct"));
Object.assign(Runtime.UIStruct,
{
	TYPE_ELEMENT: "element",
	TYPE_COMPONENT: "component",
	TYPE_STRING: "string",
	TYPE_RAW: "raw",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.UIStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.UIStruct",
			"name": "Runtime.UIStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("key");
			a.push("name");
			a.push("bind");
			a.push("kind");
			a.push("content");
			a.push("reference");
			a.push("value");
			a.push("layout");
			a.push("model");
			a.push("props");
			a.push("annotations");
			a.push("children");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "TYPE_ELEMENT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "TYPE_COMPONENT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "TYPE_STRING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "TYPE_RAW") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "key") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "bind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "reference") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "layout") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "model") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "props") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "children") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.UIStruct",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
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
});use.add(Runtime.UIStruct);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.UIStruct = Runtime.UIStruct;