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
Runtime.ModuleDescription = function(ctx)
{
};
Object.assign(Runtime.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.ModuleDescription"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.ModuleDescription";
	},
});
Object.assign(Runtime.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Runtime";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.8.2";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return null;
	},
	/**
	 * Compatibility with older versions
	 */
	getRequiredModules: function(ctx)
	{
		return this.requiredModules(ctx);
	},
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	assets: function(ctx)
	{
		return use("Runtime.Collection").from(["Runtime/rtl","Runtime/rs","Runtime/re","Runtime/lib","Runtime/Collection","Runtime/CoreObject","Runtime/Dict","Runtime/RuntimeConstant","Runtime/RuntimeUtils","Runtime/Exceptions/RuntimeException","Runtime/Interfaces/AssetsInterface","Runtime/Interfaces/BusInterface","Runtime/Interfaces/ModuleDescriptionInterface","Runtime/Interfaces/SerializeInterface","Runtime/Interfaces/StringInterface","Runtime/CoreStruct","Runtime/CoreProvider","Runtime/CoreEvent","Runtime/Map","Runtime/Message","Runtime/MessageRPC","Runtime/PathInfo","Runtime/ModuleDescription","Runtime/Reference","Runtime/Vector","Runtime/Exceptions/ApiException","Runtime/Exceptions/IndexOutOfRange","Runtime/Exceptions/KeyNotFound","Runtime/Exceptions/UnknownError","Runtime/DateTime","Runtime/Annotations/Entity","Runtime/Annotations/IntrospectionClass","Runtime/Annotations/IntrospectionInfo","Runtime/Annotations/LambdaChain","Runtime/Annotations/LambdaChainDeclare","Runtime/Annotations/Driver","Runtime/Annotations/Provider","Runtime/UIStruct","Runtime/Context","Runtime/AsyncAwait"]);
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		var __v0 = use("Runtime.Annotations.LambdaChainDeclare");
		return use("Runtime.Collection").from([new __v0(ctx, use("Runtime.Dict").from({"name":"Runtime.Entities"}))]);
	},
	/**
	 * Returns enities
	 */
	resources: function(ctx)
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.ModuleDescription",
			"name": "Runtime.ModuleDescription",
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
		use("Runtime.Interfaces.ModuleDescriptionInterface"),
		use("Runtime.Interfaces.AssetsInterface"),
	],
});use.add(Runtime.ModuleDescription);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.ModuleDescription = Runtime.ModuleDescription;