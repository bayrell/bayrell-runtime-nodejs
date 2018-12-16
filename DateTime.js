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
var CoreObject = require('./CoreObject.js');
var CloneableInterface = require('./Interfaces/CloneableInterface.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');
class DateTime extends CoreObject{
	/**
	 * Set date
	 * @param int y - Year
	 * @param int m - Month
	 * @param int d - Day
	 * @return DateTime instance
	 */
	setDate(y, m, d){
		this.y = y;
		this.m = m;
		this.d = d;
		return this;
	}
	/**
	 * Set time
	 * @param int h - Hour
	 * @param int i - Minute
	 * @param int s - Second
	 * @return DateTime instance
	 */
	setTime(h, i, s){
		this.h = h;
		this.i = i;
		this.s = s;
		return this;
	}
	/**
	 * Set year
	 * @param int y - Year
	 * @return DateTime instance
	 */
	setYear(y){
		this.y = y;
		return this;
	}
	/**
	 * Set month
	 * @param int m - Month
	 * @return DateTime instance
	 */
	setMonth(m){
		this.m = m;
		return this;
	}
	/**
	 * Set day
	 * @param int d - Day
	 * @return DateTime instance
	 */
	setDay(d){
		this.d = d;
		return this;
	}
	/**
	 * Set hour
	 * @param int h - Hour
	 * @return DateTime instance
	 */
	setHour(h){
		this.h = h;
		return this;
	}
	/**
	 * Set minute
	 * @param int i - Minute
	 * @return DateTime instance
	 */
	setMinute(i){
		this.i = i;
		return this;
	}
	/**
	 * Set second
	 * @param int s - Second
	 * @return DateTime instance
	 */
	setSecond(s){
		this.s = s;
		return this;
	}
	/**
	 * Set microsecond
	 * @param int ms - Microsecond
	 * @return DateTime instance
	 */
	setMicrosecond(ms){
		this.ms = ms;
		return this;
	}
	/**
	 * Set time zone
	 * @param string tz
	 * @return DateTime instance
	 */
	setTimezone(tz){
		this.tz = tz;
		return this;
	}
	/**
	 * Returns year
	 * @return int
	 */
	getYear(){
		return this.y;
	}
	/**
	 * Returns month
	 * @return int
	 */
	getMonth(){
		return this.m;
	}
	/**
	 * Returns day
	 * @return int
	 */
	getDay(){
		return this.d;
	}
	/**
	 * Returns hour
	 * @return int
	 */
	getHour(){
		return this.h;
	}
	/**
	 * Returns minute
	 * @return int
	 */
	getMinute(){
		return this.i;
	}
	/**
	 * Returns second
	 * @return int
	 */
	getSecond(){
		return this.s;
	}
	/**
	 * Returns microsecond
	 * @return int
	 */
	getMicrosecond(){
		return this.ms;
	}
	/**
	 * Returns time zone
	 * @return string
	 */
	getTimezone(){
		return this.tz;
	}
	
	getTimezoneOffset(){
		if (this.tz == "GMT") return 0;
		if (this.tz == "GMT+1") return -60;
		if (this.tz == "GMT+2") return -120;
		if (this.tz == "GMT+3") return -180;
		if (this.tz == "GMT+4") return -240;
		if (this.tz == "GMT+5") return -300;
		if (this.tz == "GMT+6") return -360;
		if (this.tz == "GMT+7") return -420;
		if (this.tz == "GMT+8") return -480;
		if (this.tz == "GMT+9") return -540;
		if (this.tz == "GMT+10") return -600;
		if (this.tz == "GMT+11") return -660;
		if (this.tz == "GMT+13") return -780;
		if (this.tz == "GMT+14") return -840;
		if (this.tz == "GMT-1") return 60;
		if (this.tz == "GMT-2") return 120;
		if (this.tz == "GMT-3") return 180;
		if (this.tz == "GMT-4") return 240;
		if (this.tz == "GMT-5") return 300;
		if (this.tz == "GMT-6") return 360;
		if (this.tz == "GMT-7") return 420;
		if (this.tz == "GMT-8") return 480;
		if (this.tz == "GMT-9") return 540;
		if (this.tz == "GMT-10") return 600;
		if (this.tz == "GMT-11") return 660;
		if (this.tz == "GMT-12") return 720;		
		return 0;
	}
	getTimezoneOffsetString(){
		var offset = this.getTimezoneOffset();
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
	shiftTimezone(dt, offset){
		var h = Math.floor(offset / 60);
		var m = offset % 60;
		dt.setMinutes(dt.getMinutes() + m);
		dt.setHours(dt.getHours() + h);
		return dt;
	}
	assignDatetime(dt){
		var offset = dt.getTimezoneOffset() - this.getTimezoneOffset();
		this.shiftTimezone(dt, offset);
		this.y = Number(dt.getFullYear());
		this.m = Number(dt.getMonth()) + 1;
		this.d = Number(dt.getDate());
		this.h = Number(dt.getHours());
		this.i = Number(dt.getMinutes());
		this.s = Number(dt.getSeconds());
	}
	getDatetime(){
		var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
		var offset = this.getTimezoneOffset() - dt.getTimezoneOffset();
		this.shiftTimezone(dt, offset);
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
		var obj = new Runtime.DateTime();
		obj.setTimezone(tz);
		obj.assignDatetime(dt);
		return obj;
		return null;
	}
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek(){
		
		var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
		return dt.getDay();
		return null;
	}
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp(){
		
		var dt = this.getDatetime();
		return dt.getTime();
		return null;
	}
	/**
	 * Set timestamp
	 * @param int timestamp
	 * @return DateTime instance
	 */
	setTimestamp(timestamp){
		
		var dt = new Date();
		dt.setTime(timestamp);
		this.assignDatetime(timestamp);
		return this;
	}
	/**
	 * Change time zone
	 * @param string tz
	 * @return DateTime instance
	 */
	changeTimezone(tz){
		
		var dt = this.getDatetime();
		this.setTimezone(tz);
		this.assignDatetime(dt);
		return this;
	}
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	getRFC822(){
		
		var y,m,d,h,i,s,dow,dow_s,m_s,tz;
		
		y = this.y % 100;
		y = (y < 10) ? "0" + y : "" + y;
		m = (this.m < 10) ? "0" + this.m : "" + this.m;
		d = (this.d < 10) ? "0" + this.d : "" + this.d;
		h = (this.h < 10) ? "0" + this.h : "" + this.h;
		i = (this.i < 10) ? "0" + this.i : "" + this.i;
		s = (this.s < 10) ? "0" + this.s : "" + this.s;
		dow = this.getDayOfWeek();
		
		dow_s = "";
		if (dow == 0) dow_s = "Sun";
		if (dow == 1) dow_s = "Mon";
		if (dow == 2) dow_s = "Tue";
		if (dow == 3) dow_s = "Wed";
		if (dow == 4) dow_s = "Thu";
		if (dow == 5) dow_s = "Fri";
		if (dow == 6) dow_s = "Sat";
		
		m = this.m;
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
		
		tz = this.getTimezoneOffsetString();
		
		return dow_s + ", " + d + " " + m_s + " " + y + " " + h + ":" + i + ":" + s + " " + tz;
		return "";
	}
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	getISO8601(){
		
		var m = (this.m < 10) ? "0" + this.m : "" + this.m;
		var d = (this.d < 10) ? "0" + this.d : "" + this.d;
		var h = (this.h < 10) ? "0" + this.h : "" + this.h;
		var i = (this.i < 10) ? "0" + this.i : "" + this.i;
		var s = (this.s < 10) ? "0" + this.s : "" + this.s;
		var tz = this.getTimezoneOffsetString();
		return this.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz;
		return "";
	}
	/**
	 * Return datetime by GMT
	 * @return string
	 */
	getGMT(){
		
		var m = (this.m < 10) ? "0" + this.m : "" + this.m;
		var d = (this.d < 10) ? "0" + this.d : "" + this.d;
		var h = (this.h < 10) ? "0" + this.h : "" + this.h;
		var i = (this.i < 10) ? "0" + this.i : "" + this.i;
		var s = (this.s < 10) ? "0" + this.s : "" + this.s;
		return this.y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		return "";
	}
	/**
	 * Return datetime by UTC
	 * @return string
	 */
	getUTC(){
		
		var dt = this.getDatetime();
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
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this.y = 0;
		this.m = 0;
		this.d = 0;
		this.h = 0;
		this.u = 0;
		this.s = 0;
		this.ms = 0;
		this.tz = "UTC";
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(CloneableInterface);
		this.__implements__.push(SerializeInterface);
	}
	assignObject(obj){
		if (obj instanceof DateTime){
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
DateTime.__static_implements__ = [];
DateTime.__static_implements__.push(CloneableInterface)
DateTime.__static_implements__.push(SerializeInterface)
module.exports = DateTime;