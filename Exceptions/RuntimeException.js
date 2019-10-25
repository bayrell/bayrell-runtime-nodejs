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
	_init: function(){},
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getCurrentNamespace: function(){ return "Runtime.Exceptions"; },
	getCurrentClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
use.add(Runtime.Exceptions.ClassException);
Runtime.Exceptions.RuntimeException = function(__ctx, message, code, context, prev)
{
	use("Runtime.Exceptions.ClassException").call(this, __ctx, message, code, prev);
	this._init(__ctx);
	this.error_str = message;
	this.error_code = code;
	this.context = context;
	this.prev = prev;
	this.updateError(__ctx);
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(use("Runtime.Exceptions.ClassException").prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
	getPreviousException: function(__ctx)
	{
		return this.prev;
	},
	getErrorMessage: function(__ctx)
	{
		return this.error_message;
	},
	getErrorString: function(__ctx)
	{
		return this.error_str;
	},
	getErrorCode: function(__ctx)
	{
		return this.error_code;
	},
	getFileName: function(__ctx)
	{
		return this.error_file;
	},
	getErrorLine: function(__ctx)
	{
		return this.error_line;
	},
	getErrorPos: function(__ctx)
	{
		return this.error_pos;
	},
	toString: function(__ctx)
	{
		return this.buildMessage(__ctx);
	},
	buildMessage: function(__ctx)
	{
		var error_str = this.error_str;
		var file = this.getFileName(__ctx);
		var line = this.getErrorLine(__ctx);
		var pos = this.getErrorPos(__ctx);
		if (line != -1)
		{
			error_str += use("Runtime.rtl").toStr(" at Ln:" + use("Runtime.rtl").toStr(line) + use("Runtime.rtl").toStr(((pos != "") ? ", Pos:" + use("Runtime.rtl").toStr(pos) : "")));
		}
		if (file != "")
		{
			error_str += use("Runtime.rtl").toStr(" in file:'" + use("Runtime.rtl").toStr(file) + use("Runtime.rtl").toStr("'"));
		}
		return error_str;
	},
	updateError: function(__ctx)
	{
		this.error_message = this.buildMessage(__ctx);
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function(__ctx)
	{
	},
	_init: function(__ctx)
	{
		this.context = null;
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = -1;
		this.error_pos = -1;
		use("Runtime.Exceptions.ClassException").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Exceptions.RuntimeException"))
		{
			this.context = o.context;
			this.prev = o.prev;
			this.error_message = o.error_message;
			this.error_str = o.error_str;
			this.error_code = o.error_code;
			this.error_file = o.error_file;
			this.error_line = o.error_line;
			this.error_pos = o.error_pos;
		}
		use("Runtime.Exceptions.ClassException").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "context")this.context = v;
		else if (k == "prev")this.prev = v;
		else if (k == "error_message")this.error_message = v;
		else if (k == "error_str")this.error_str = v;
		else if (k == "error_code")this.error_code = v;
		else if (k == "error_file")this.error_file = v;
		else if (k == "error_line")this.error_line = v;
		else if (k == "error_pos")this.error_pos = v;
		else use("Runtime.Exceptions.ClassException").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "context")return this.context;
		else if (k == "prev")return this.prev;
		else if (k == "error_message")return this.error_message;
		else if (k == "error_str")return this.error_str;
		else if (k == "error_code")return this.error_code;
		else if (k == "error_file")return this.error_file;
		else if (k == "error_line")return this.error_line;
		else if (k == "error_pos")return this.error_pos;
		return use("Runtime.Exceptions.ClassException").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Exceptions.RuntimeException";
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, use("Runtime.Exceptions.ClassException"));
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.ClassException";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": "Runtime.Exceptions.RuntimeException",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("context");
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
});use.add(Runtime.Exceptions.RuntimeException);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Exceptions == undefined) module.exports.Runtime.Exceptions = {};
module.exports.Runtime.Exceptions.RuntimeException = Runtime.Exceptions.RuntimeException;