"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('./rtl.js');
var CoreStruct = require('./CoreStruct.js');
class DateTime extends CoreStruct{
	
	static getTimezoneOffset(obj)
	{
		if (obj.tz == "GMT") return 0;
		if (obj.tz == "GMT+1") return -60;
		if (obj.tz == "GMT+2") return -120;
		if (obj.tz == "GMT+3") return -180;
		if (obj.tz == "GMT+4") return -240;
		if (obj.tz == "GMT+5") return -300;
		if (obj.tz == "GMT+6") return -360;
		if (obj.tz == "GMT+7") return -420;
		if (obj.tz == "GMT+8") return -480;
		if (obj.tz == "GMT+9") return -540;
		if (obj.tz == "GMT+10") return -600;
		if (obj.tz == "GMT+11") return -660;
		if (obj.tz == "GMT+13") return -780;
		if (obj.tz == "GMT+14") return -840;
		if (obj.tz == "GMT-1") return 60;
		if (obj.tz == "GMT-2") return 120;
		if (obj.tz == "GMT-3") return 180;
		if (obj.tz == "GMT-4") return 240;
		if (obj.tz == "GMT-5") return 300;
		if (obj.tz == "GMT-6") return 360;
		if (obj.tz == "GMT-7") return 420;
		if (obj.tz == "GMT-8") return 480;
		if (obj.tz == "GMT-9") return 540;
		if (obj.tz == "GMT-10") return 600;
		if (obj.tz == "GMT-11") return 660;
		if (obj.tz == "GMT-12") return 720;		
		return 0;
	}
	static getTimezoneOffsetString(obj)
	{
		var offset = this.getTimezoneOffset(obj);
		var sign = 1;
		if (offset <= 0){ sign = -1; offset = -offset; }
		var h = Math.floor(offset / 60);
		var m = offset % 60;
		h = (h < 10) ? "0" + h : "" + h;
		m = (m < 10) ? "0" + m : "" + m;
		var s = h + m;
		if (sign == 1) s = "-" + s; else s = "+" + s;
		return s;
	}
	static shiftTimezone(dt, offset)
	{
		var h = Math.floor(offset / 60);
		var m = offset % 60;
		dt.setMinutes(dt.getMinutes() + m);
		dt.setHours(dt.getHours() + h);
		return dt;
	}
	static assignDatetime(dt, obj)
	{
		var offset = dt.getTimezoneOffset() - this.getTimezoneOffset(obj);
		dt = this.shiftTimezone(dt, offset);
		var y = Number(dt.getFullYear());
		var m = Number(dt.getMonth()) + 1;
		var d = Number(dt.getDate());
		var h = Number(dt.getHours());
		var i = Number(dt.getMinutes());
		var s = Number(dt.getSeconds());
		return obj.copy( new Map({"y":y, "m":m, "d":d, "h":h, "i":i, "s":s}) );
	}
	static createDatetime(dt, tz)
	{
		return this.assignDatetime(dt, new Runtime.DateTime( new Map({"tz":tz}) ));
	}
	static getDatetime(obj)
	{
		var dt = new Date(obj.y, obj.m - 1, obj.d, obj.h, obj.i, obj.s);
		var offset = this.getTimezoneOffset(obj) - dt.getTimezoneOffset();
		dt = this.shiftTimezone(dt, offset);
		return dt;
	}
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	static now(tz){
		if (tz == undefined) tz="UTC";
		
		var dt = new Date();
		return this.createDatetime(dt, tz);
		return null;
	}
	/**
	 * Returns day of week
	 * @param DateTime obj
	 * @return int
	 */
	static getDayOfWeek(obj){
		
		var dt = this.getDatetime(obj);
		return dt.getDay();
		return null;
	}
	/**
	 * Returns timestamp
	 * @param DateTime obj
	 * @return int
	 */
	static getTimestamp(obj){
		
		var dt = this.getDatetime(obj);
		return dt.getTime();
		return null;
	}
	/**
	 * Set timestamp
	 * @param int timestamp
	 * @param DateTime obj
	 * @return DateTime instance
	 */
	static setTimestamp(timestamp, obj){
		return null;
	}
	/**
	 * Change time zone
	 * @param string tz
	 * @param DateTime obj
	 * @return DateTime instance
	 */
	static changeTimezone(tz, obj){
		
		return obj;
		return null;
	}
	/**
	 * Return datetime in RFC822
	 * @param DateTime obj
	 * @return string
	 */
	static getRFC822(obj){
		
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
	}
	/**
	 * Return datetime in ISO8601
	 * @param DateTime obj
	 * @return string
	 */
	static getISO8601(obj){
		
		var m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		var d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		var h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		var i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		var s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		var tz = this.getTimezoneOffsetString(obj);
		return obj.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz;
		return "";
	}
	/**
	 * Return datetime by GMT
	 * @param DateTime obj
	 * @return string
	 */
	static getGMT(obj){
		
		var m = (obj.m < 10) ? "0" + obj.m : "" + obj.m;
		var d = (obj.d < 10) ? "0" + obj.d : "" + obj.d;
		var h = (obj.h < 10) ? "0" + obj.h : "" + obj.h;
		var i = (obj.i < 10) ? "0" + obj.i : "" + obj.i;
		var s = (obj.s < 10) ? "0" + obj.s : "" + obj.s;
		return obj.y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		return "";
	}
	/**
	 * Return datetime by UTC
	 * @param DateTime obj
	 * @return string
	 */
	static getUTC(obj){
		
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
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.DateTime";}
	static getCurrentClassName(){return "Runtime.DateTime";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__y = 0;
		Object.defineProperty(this, "y", { get: function() { return this.__y; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("y") }});
		this.__m = 0;
		Object.defineProperty(this, "m", { get: function() { return this.__m; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("m") }});
		this.__d = 0;
		Object.defineProperty(this, "d", { get: function() { return this.__d; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("d") }});
		this.__h = 0;
		Object.defineProperty(this, "h", { get: function() { return this.__h; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("h") }});
		this.__u = 0;
		Object.defineProperty(this, "u", { get: function() { return this.__u; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("u") }});
		this.__s = 0;
		Object.defineProperty(this, "s", { get: function() { return this.__s; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("s") }});
		this.__ms = 0;
		Object.defineProperty(this, "ms", { get: function() { return this.__ms; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ms") }});
		this.__tz = "UTC";
		Object.defineProperty(this, "tz", { get: function() { return this.__tz; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("tz") }});
	}
	assignObject(obj){
		if (obj instanceof DateTime){
			this.__y = obj.__y;
			this.__m = obj.__m;
			this.__d = obj.__d;
			this.__h = obj.__h;
			this.__u = obj.__u;
			this.__s = obj.__s;
			this.__ms = obj.__ms;
			this.__tz = obj.__tz;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "y")this.__y = rtl.convert(value,"int",0,"");
		else if (variable_name == "m")this.__m = rtl.convert(value,"int",0,"");
		else if (variable_name == "d")this.__d = rtl.convert(value,"int",0,"");
		else if (variable_name == "h")this.__h = rtl.convert(value,"int",0,"");
		else if (variable_name == "u")this.__u = rtl.convert(value,"int",0,"");
		else if (variable_name == "s")this.__s = rtl.convert(value,"int",0,"");
		else if (variable_name == "ms")this.__ms = rtl.convert(value,"int",0,"");
		else if (variable_name == "tz")this.__tz = rtl.convert(value,"string","UTC","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "y") return this.__y;
		else if (variable_name == "m") return this.__m;
		else if (variable_name == "d") return this.__d;
		else if (variable_name == "h") return this.__h;
		else if (variable_name == "u") return this.__u;
		else if (variable_name == "s") return this.__s;
		else if (variable_name == "ms") return this.__ms;
		else if (variable_name == "tz") return this.__tz;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("y");
			names.push("m");
			names.push("d");
			names.push("h");
			names.push("u");
			names.push("s");
			names.push("ms");
			names.push("tz");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = DateTime;