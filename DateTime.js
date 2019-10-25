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
Runtime.DateTime = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.DateTime.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function(__ctx)
	{
		var dt = this.getDatetime(obj);
		return dt.getDay();
		return null;
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function(__ctx)
	{
		var dt = this.getDatetime(obj);
		return dt.getTime();
		return null;
	},
	/**
	 * Set timestamp
	 * @param int timestamp
	 * @return DateTime instance
	 */
	setTimestamp: function(__ctx, timestamp)
	{
		return null;
	},
	/**
	 * Change time zone
	 * @param string tz
	 * @return DateTime instance
	 */
	changeTimezone: function(__ctx, tz)
	{
		return obj;
		return null;
	},
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	getRFC822: function(__ctx)
	{
		var y,m,d,h,i,s,dow,dow_s,m_s,tz;
		
		y = obj.y % 100;
		y = (y < 10) ? "0" + y : "" + y;
		m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		dow = this.getDayOfWeek(obj);
		
		dow_s = "";
		if (dow == 0) dow_s = "Sun";
		if (dow == 1) dow_s = "Mon";
		if (dow == 2) dow_s = "Tue";
		if (dow == 3) dow_s = "Wed";
		if (dow == 4) dow_s = "Thu";
		if (dow == 5) dow_s = "Fri";
		if (dow == 6) dow_s = "Sat";
		
		m = obj.m;
		m_s = "";
		if (m == 1) m_s = "Jan";
		if (m == 2) m_s = "Feb";
		if (m == 3) m_s = "Mar";
		if (m == 4) m_s = "Apr";
		if (m == 5) m_s = "May";
		if (m == 6) m_s = "Jun";
		if (m == 7) m_s = "Jul";
		if (m == 8) m_s = "Aug";
		if (m == 9) m_s = "Sep";
		if (m == 10) m_s = "Oct";
		if (m == 11) m_s = "Nov";
		if (m == 12) m_s = "Dec";
		
		tz = this.getTimezoneOffsetString(obj);
		
		return dow_s + ", " + d + " " + m_s + " " + y + " " + h + ":" + i + ":" + s + " " + tz;
		return "";
	},
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	getISO8601: function(__ctx)
	{
		var m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		var d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		var h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		var i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		var s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		var tz = this.getTimezoneOffsetString(obj);
		return obj.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz;
		return "";
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	getDBTime: function(__ctx)
	{
		var m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		var d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		var h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		var i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		var s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		return obj.y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		return "";
	},
	/**
	 * Return datetime by UTC
	 * @return string
	 */
	getUTC: function(__ctx)
	{
		var dt = this.getDatetime(obj);
		var y = Number(dt.getUTCFullYear());
		var m = Number(dt.getUTCMonth()) + 1;
		var d = Number(dt.getUTCDate());
		var h = Number(dt.getUTCHours());
		var i = Number(dt.getUTCMinutes());
		var s = Number(dt.getUTCSeconds());
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		return y + "-" + m + "-" + d + " " +
			h + ":" + i + ":" + s;
		return "";
	},
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__y = 0;
		if (a.indexOf("y") == -1) defProp(this, "y");
		this.__m = 0;
		if (a.indexOf("m") == -1) defProp(this, "m");
		this.__d = 0;
		if (a.indexOf("d") == -1) defProp(this, "d");
		this.__h = 0;
		if (a.indexOf("h") == -1) defProp(this, "h");
		this.__u = 0;
		if (a.indexOf("u") == -1) defProp(this, "u");
		this.__s = 0;
		if (a.indexOf("s") == -1) defProp(this, "s");
		this.__ms = 0;
		if (a.indexOf("ms") == -1) defProp(this, "ms");
		this.__tz = "UTC";
		if (a.indexOf("tz") == -1) defProp(this, "tz");
		use("Runtime.CoreStruct").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.DateTime"))
		{
			this.__y = o.__y;
			this.__m = o.__m;
			this.__d = o.__d;
			this.__h = o.__h;
			this.__u = o.__u;
			this.__s = o.__s;
			this.__ms = o.__ms;
			this.__tz = o.__tz;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "y")this.__y = v;
		else if (k == "m")this.__m = v;
		else if (k == "d")this.__d = v;
		else if (k == "h")this.__h = v;
		else if (k == "u")this.__u = v;
		else if (k == "s")this.__s = v;
		else if (k == "ms")this.__ms = v;
		else if (k == "tz")this.__tz = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.__y;
		else if (k == "m")return this.__m;
		else if (k == "d")return this.__d;
		else if (k == "h")return this.__h;
		else if (k == "u")return this.__u;
		else if (k == "s")return this.__s;
		else if (k == "ms")return this.__ms;
		else if (k == "tz")return this.__tz;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.DateTime";
	},
});
Object.assign(Runtime.DateTime, use("Runtime.CoreStruct"));
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	timestamp: function(__ctx, time, tz)
	{
		if (tz == undefined) tz = "UTC";
		var dt = new Date(time*1000);
		return this.fromObject(dt, tz);
		return null;
	},
	/**
	 * Output dbtime
	 */
	dbtime: function(__ctx, time, tz)
	{
		if (tz == undefined) tz = "UTC";
		var dt = new Date(time*1000);
		var obj = this.fromObject(dt, tz);
		return obj.getDBTime();
		return "";
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function(__ctx, tz)
	{
		if (tz == undefined) tz = "UTC";
		var dt = new Date();
		return this.createDatetime(dt, tz);
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.DateTime";
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
			"class_name": "Runtime.DateTime",
			"name": "Runtime.DateTime",
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
			a.push("y");
			a.push("m");
			a.push("d");
			a.push("h");
			a.push("u");
			a.push("s");
			a.push("ms");
			a.push("tz");
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
});use.add(Runtime.DateTime);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.DateTime = Runtime.DateTime;