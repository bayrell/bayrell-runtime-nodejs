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
Runtime.Monad = function(value, err)
{
	if (err == undefined) err = null;
	this.val = value;
	this.err = err;
};
Object.assign(Runtime.Monad.prototype,
{
	/**
	 * Return attr of object
	 */
	attr: function(attr_name)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var __v0 = Runtime.Monad;
		var __v1 = Runtime.rtl;
		return new __v0(__v1.attr(this.val, Runtime.Collection.from([attr_name]), null));
	},
	/**
	 * Call function on value
	 */
	call: function(f)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		var __v0 = Runtime.Exceptions.RuntimeException;
		try
		{
			res = f(this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = Runtime.Monad;
		return new __v0(res, err);
	},
	/**
	 * Call async function on value
	 */
	callAsync: async function(f)
	{
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		var __v0 = Runtime.Exceptions.RuntimeException;
		try
		{
			res = await f(this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = Runtime.Monad;
		return Promise.resolve(new __v0(res, err));
	},
	/**
	 * Call method on value
	 */
	callMethod: function(f, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		var __v1 = Runtime.Exceptions.RuntimeException;
		try
		{
			var __v0 = Runtime.rtl;
			res = __v0.apply(f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof __v1)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = Runtime.Monad;
		return new __v0(res, err);
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: async function(f, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		var __v1 = Runtime.Exceptions.RuntimeException;
		try
		{
			var __v0 = Runtime.rtl;
			res = await __v0.applyAsync(f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof __v1)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = Runtime.Monad;
		return Promise.resolve(new __v0(res, err));
	},
	/**
	 * Call function on monad
	 */
	monad: function(f)
	{
		return f(this);
	},
	/**
	 * Returns value
	 */
	value: function()
	{
		if (this.err != null)
		{
			throw this.err
		}
		if (this.val === null || this.err != null)
		{
			return null;
		}
		return this.val;
	},
	_init: function()
	{
		this.val = null;
		this.err = null;
	},
	getClassName: function()
	{
		return "Runtime.Monad";
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Monad";
	},
	getParentClassName: function()
	{
		return "";
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
			a.push("val");
			a.push("err");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "val") return Dict.from({
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "err") return Dict.from({
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
});use.add(Runtime.Monad);
module.exports = Runtime.Monad;