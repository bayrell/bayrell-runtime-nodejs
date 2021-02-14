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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ApiException = function(message, code, response, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (response == undefined) response = null;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, message, code, prev);
	this.response = response;
};
Runtime.Exceptions.ApiException.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.ApiException.prototype.constructor = Runtime.Exceptions.ApiException;
Object.assign(Runtime.Exceptions.ApiException.prototype,
{
	_init: function()
	{
		this.response = null;
		Runtime.Exceptions.RuntimeException.prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.ApiException";
	},
});
Object.assign(Runtime.Exceptions.ApiException, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.ApiException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
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
			a.push("response");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "response") return Dict.from({
			"t": "var",
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
});use.add(Runtime.Exceptions.ApiException);
module.exports = Runtime.Exceptions.ApiException;