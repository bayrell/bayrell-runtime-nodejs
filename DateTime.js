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
Runtime.DateTime = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.DateTime.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * Shift time
	 */
	shiftTime: function(ctx, shift)
	{
		var timestamp = this.getTimestamp(ctx) + shift;
		var dt = this.constructor.create(ctx, timestamp, this.tz);
		return dt;
	},
	/**
	 * Shift tz
	 */
	shift: function(ctx, tz)
	{
		var timestamp = this.getTimestamp(ctx);
		var dt = this.constructor.create(ctx, timestamp, tz);
		return dt;
	},
	/**
	 * Set week number
	 */
	setWeekNumber: function(ctx, week)
	{
		var dt = new Date(this.y, 0, 1, 0, 0, 0);
		var year_begin = Math.round(dt.getTime() / 1000) - dt.getTimezoneOffset() * 60;
		var day_begin = dt.getDay();
		var shift = (day_begin - 1) * 86400;
		var week_begin = year_begin - shift;
		week_begin = week_begin + week * 604800 + dt.getTimezoneOffset() * 60;
		return this.constructor.fromObject(ctx, new Date(week_begin*1000), this.tz, false);
		return this;
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function(ctx)
	{
		var dt = this.toObject(ctx);
		return Math.round(dt.getTime() / 1000);
		return null;
	},
	timestamp: function(ctx)
	{
		return this.getTimestamp(ctx);
	},
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function(ctx)
	{
		var dt = this.toObject(ctx);
		return dt.getDay();
		return null;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	getDateTime: function(ctx, tz)
	{
		if (tz == undefined) tz = "";
		var offset = 0;
		var dt = this.toObject(ctx);
		if (tz == "") tz = this.tz;
		
		offset = this.constructor.getTimezoneOffset(ctx, tz);
		offset = offset - dt.getTimezoneOffset();
		dt = this.constructor.shiftOffset(ctx, dt, -offset);
		
		var y = Number(dt.getFullYear());
		var m = Number(dt.getMonth()) + 1;
		var d = Number(dt.getDate());
		var h = Number(dt.getHours());
		var i = Number(dt.getMinutes());
		var s = Number(dt.getSeconds());
		
		var m = (m < 10) ? "0" + m : "" + m;
		var d = (d < 10) ? "0" + d : "" + d;
		var h = (h < 10) ? "0" + h : "" + h;
		var i = (i < 10) ? "0" + i : "" + i;
		var s = (s < 10) ? "0" + s : "" + s;
		return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		return "";
	},
	/**
	 * Return date
	 * @return string
	 */
	getDate: function(ctx, tz)
	{
		if (tz == undefined) tz = "";
		var value = this.getDateTime(ctx, tz);
		var __v0 = use("Runtime.rs");
		return __v0.substr(ctx, value, 0, 10);
	},
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	getRFC822: function(ctx)
	{
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		var dt = new Date(y, m - 1, d, h, i, s);
		
		y = (y < 10) ? "0" + y : "" + y;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		
		var dow = dt.getDay();
		var dow_s = "";
		if (dow == 0) dow_s = "Sun";
		if (dow == 1) dow_s = "Mon";
		if (dow == 2) dow_s = "Tue";
		if (dow == 3) dow_s = "Wed";
		if (dow == 4) dow_s = "Thu";
		if (dow == 5) dow_s = "Fri";
		if (dow == 6) dow_s = "Sat";
		
		var m_s = "";
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
		
		return dow_s + ", " + d + " " + m_s + " " + y + " " + h + ":" + i + ":" + s + " " + this.tz;
		return "";
	},
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	getISO8601: function(ctx)
	{
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		var tz = Math.ceil(-this.constructor.getTimezoneOffset(ctx, this.tz) / 60);
		if (tz < 10 && tz >= 0) tz = "0" + tz;
		if (tz >= 0) tz = "+" + tz;
		return this.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz + "00";
		return "";
	},
	/**
	 * Normalize date time
	 */
	normalize: function(ctx)
	{
		return this;
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.y = 1970;
		this.m = 1;
		this.d = 1;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.tz = "UTC";
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.y;
		else if (k == "m")return this.m;
		else if (k == "d")return this.d;
		else if (k == "h")return this.h;
		else if (k == "i")return this.i;
		else if (k == "s")return this.s;
		else if (k == "ms")return this.ms;
		else if (k == "tz")return this.tz;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Runtime.DateTime, use("Runtime.BaseStruct"));
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	create: function(ctx, time, tz)
	{
		if (time == undefined) time = -1;
		if (tz == undefined) tz = "UTC";
		var dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		return this.fromObject(ctx, dt, tz);
		return null;
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function(ctx, tz)
	{
		if (tz == undefined) tz = "UTC";
		return this.create(ctx, -1, tz);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.DateTime";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
	getFieldsList: function(ctx)
	{
		var a = [];
		if (f==undefined) f=0;
		a.push("y");
		a.push("m");
		a.push("d");
		a.push("h");
		a.push("i");
		a.push("s");
		a.push("ms");
		a.push("tz");
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "y") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "m") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "d") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "h") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "i") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "s") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ms") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"create",
			"now",
			"shiftTime",
			"shift",
			"setWeekNumber",
			"getTimestamp",
			"timestamp",
			"getDayOfWeek",
			"getDateTime",
			"getDate",
			"getRFC822",
			"getISO8601",
			"normalize",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.DateTime);
module.exports = Runtime.DateTime;
Runtime.DateTime.getTimezoneOffset = function(ctx, tz)
{
	if (tz == "UTC") return 0;
	if (tz == "GMT") return 0;
	if (tz == "GMT+1") return -60;
	if (tz == "GMT+2") return -120;
	if (tz == "GMT+3") return -180;
	if (tz == "GMT+4") return -240;
	if (tz == "GMT+5") return -300;
	if (tz == "GMT+6") return -360;
	if (tz == "GMT+7") return -420;
	if (tz == "GMT+8") return -480;
	if (tz == "GMT+9") return -540;
	if (tz == "GMT+10") return -600;
	if (tz == "GMT+11") return -660;
	if (tz == "GMT+13") return -780;
	if (tz == "GMT+14") return -840;
	if (tz == "GMT-1") return 60;
	if (tz == "GMT-2") return 120;
	if (tz == "GMT-3") return 180;
	if (tz == "GMT-4") return 240;
	if (tz == "GMT-5") return 300;
	if (tz == "GMT-6") return 360;
	if (tz == "GMT-7") return 420;
	if (tz == "GMT-8") return 480;
	if (tz == "GMT-9") return 540;
	if (tz == "GMT-10") return 600;
	if (tz == "GMT-11") return 660;
	if (tz == "GMT-12") return 720;
	return 0;
}

Runtime.DateTime.shiftOffset = function(ctx, dt, offset)
{
	var h = Math.floor(offset / 60);
	var m = offset % 60;
	dt.setMinutes(dt.getMinutes() + m);
	dt.setHours(dt.getHours() + h);
	return dt;
}

Runtime.DateTime.prototype.toObject = function(ctx)
{
	var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
	var offset = this.constructor.getTimezoneOffset(ctx, this.tz);
	var offset = offset - dt.getTimezoneOffset();
	dt = this.constructor.shiftOffset(ctx, dt, offset);
	return dt;
}

Runtime.DateTime.fromObject = function(ctx, dt, tz, is_shift)
{
	if (is_shift == undefined) is_shift = true;
	var Dict = use("Runtime.Dict");
	if (is_shift)
	{
		var offset = this.getTimezoneOffset(ctx, tz);
		var offset = offset - dt.getTimezoneOffset();
		dt = this.shiftOffset(ctx, dt, -offset);
	}
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var h = Number(dt.getHours());
	var i = Number(dt.getMinutes());
	var s = Number(dt.getSeconds());
	var dt = new Runtime.DateTime(ctx, Dict.from({"y":y,"m":m,"d":d,"h":h,"i":i,"s":s,"tz":tz}));
	return dt;
}