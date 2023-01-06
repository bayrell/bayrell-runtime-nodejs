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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ClassException = function()
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
}
Runtime.Exceptions.ClassException.prototype = Object.create(Error.prototype);
Runtime.Exceptions.ClassException.prototype.constructor = Runtime.Exceptions.ClassException;
Object.assign(Runtime.Exceptions.ClassException.prototype,
{
	_init: function(ctx){},
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getNamespace: function(){ return "Runtime.Exceptions"; },
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
use.add(Runtime.Exceptions.ClassException);
Runtime.Exceptions.RuntimeException = function(ctx, message, code, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.ClassException.call(this, message, code, prev);
	this._init(ctx);
	this.error_str = message;
	this.error_code = code;
	this.prev = prev;
	this.updateError(ctx);
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(use("Runtime.Exceptions.ClassException").prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
	getPreviousException: function(ctx)
	{
		return this.prev;
	},
	getErrorMessage: function(ctx)
	{
		return this.error_message;
	},
	getErrorString: function(ctx)
	{
		return this.error_str;
	},
	getErrorCode: function(ctx)
	{
		return this.error_code;
	},
	getFileName: function(ctx)
	{
		return this.error_file;
	},
	getErrorLine: function(ctx)
	{
		return this.error_line;
	},
	getErrorPos: function(ctx)
	{
		return this.error_pos;
	},
	toString: function(ctx)
	{
		return this.buildMessage(ctx);
	},
	buildMessage: function(ctx)
	{
		return this.error_str;
	},
	updateError: function(ctx)
	{
		this.error_message = this.buildMessage(ctx);
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function(ctx)
	{
	},
	_init: function(ctx)
	{
		use("Runtime.Exceptions.ClassException").prototype._init.call(this,ctx);
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = -1;
		this.error_pos = -1;
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, use("Runtime.Exceptions.ClassException"));
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.ClassException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("prev");
			a.push("error_message");
			a.push("error_str");
			a.push("error_code");
			a.push("error_file");
			a.push("error_line");
			a.push("error_pos");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "prev") return Dict.from({
			"t": "Object",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_message") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_str") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_code") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_file") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_line") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "error_pos") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Exceptions.RuntimeException);
module.exports = Runtime.Exceptions.RuntimeException;