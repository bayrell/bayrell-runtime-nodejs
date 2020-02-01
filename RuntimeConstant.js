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
Runtime.RuntimeConstant = function(ctx)
{
};
Object.assign(Runtime.RuntimeConstant.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.RuntimeConstant"))
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
		return "Runtime.RuntimeConstant";
	},
});
Object.assign(Runtime.RuntimeConstant,
{
	CHAIN_ENTITIES: "Runtime.Entities",
	BUS_INTERFACE: "Runtime.Interfaces.BusInterface",
	LOG_FATAL: 0,
	LOG_CRITICAL: 2,
	LOG_ERROR: 4,
	LOG_WARNING: 6,
	LOG_INFO: 8,
	LOG_DEBUG: 10,
	LOG_DEBUG2: 12,
	STATUS_PLAN: 0,
	STATUS_DONE: 1,
	STATUS_PROCESS: 100,
	STATUS_FAIL: -1,
	ERROR_NULL: 0,
	ERROR_OK: 1,
	ERROR_PROCCESS: 100,
	ERROR_FALSE: -100,
	ERROR_UNKNOWN: -1,
	ERROR_INDEX_OUT_OF_RANGE: -2,
	ERROR_KEY_NOT_FOUND: -3,
	ERROR_STOP_ITERATION: -4,
	ERROR_FILE_NOT_FOUND: -5,
	ERROR_OBJECT_DOES_NOT_EXISTS: -5,
	ERROR_OBJECT_ALLREADY_EXISTS: -6,
	ERROR_ASSERT: -7,
	ERROR_REQUEST: -8,
	ERROR_RESPONSE: -9,
	ERROR_CSRF_TOKEN: -10,
	ERROR_RUNTIME: -11,
	ERROR_VALIDATION: -12,
	ERROR_PARSE_SERIALIZATION_ERROR: -14,
	ERROR_ASSIGN_DATA_STRUCT_VALUE: -15,
	ERROR_AUTH: -16,
	ERROR_DUPLICATE: -17,
	ERROR_API_NOT_FOUND: -18,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.RuntimeConstant";
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
			"class_name": "Runtime.RuntimeConstant",
			"name": "Runtime.RuntimeConstant",
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
		if (field_name == "CHAIN_ENTITIES") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "BUS_INTERFACE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_FATAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_CRITICAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_ERROR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_WARNING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_INFO") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "LOG_DEBUG2") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PLAN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_DONE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_PROCESS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "STATUS_FAIL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_NULL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PROCCESS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FALSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_UNKNOWN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_INDEX_OUT_OF_RANGE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_KEY_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_STOP_ITERATION") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FILE_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_DOES_NOT_EXISTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_OBJECT_ALLREADY_EXISTS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSERT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_REQUEST") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RESPONSE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_CSRF_TOKEN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_RUNTIME") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_VALIDATION") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_PARSE_SERIALIZATION_ERROR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_ASSIGN_DATA_STRUCT_VALUE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_AUTH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_DUPLICATE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_API_NOT_FOUND") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_FATAL") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_CONTINUE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_SWITCH") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_PROCESSING") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_OK") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ERROR_HTTP_BAD_GATEWAY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeConstant",
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
});use.add(Runtime.RuntimeConstant);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.RuntimeConstant = Runtime.RuntimeConstant;