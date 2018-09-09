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
class DateTime extends CoreObject{
	getClassName(){return "Runtime.DateTime";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this.year = 0;
		this.month = 0;
		this.day = 0;
		this.hour = 0;
		this.minute = 0;
		this.second = 0;
		this.microseconds = 0;
		this.timezone = "UTC";
	}
	assignValue(variable_name, value){
		if (variable_name == "year") this.year = rtl.correct(value, "int", 0, "");
		else if (variable_name == "month") this.month = rtl.correct(value, "int", 0, "");
		else if (variable_name == "day") this.day = rtl.correct(value, "int", 0, "");
		else if (variable_name == "hour") this.hour = rtl.correct(value, "int", 0, "");
		else if (variable_name == "minute") this.minute = rtl.correct(value, "int", 0, "");
		else if (variable_name == "second") this.second = rtl.correct(value, "int", 0, "");
		else if (variable_name == "microseconds") this.microseconds = rtl.correct(value, "int", 0, "");
		else if (variable_name == "timezone") this.timezone = rtl.correct(value, "string", "UTC", "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "year") return this.year;
		else if (variable_name == "month") return this.month;
		else if (variable_name == "day") return this.day;
		else if (variable_name == "hour") return this.hour;
		else if (variable_name == "minute") return this.minute;
		else if (variable_name == "second") return this.second;
		else if (variable_name == "microseconds") return this.microseconds;
		else if (variable_name == "timezone") return this.timezone;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("year");
		names.push("month");
		names.push("day");
		names.push("hour");
		names.push("minute");
		names.push("second");
		names.push("microseconds");
		names.push("timezone");
	}
	constructor(){
	}
	now(){
	}
	setDate(year, month, day){
	}
	setTime(hour, minute, second){
	}
	setTimestamp(unixtime){
	}
	setTimezone(timezone){
	}
	getYear(){
	}
	getMonth(){
	}
	getDay(){
	}
	getHour(){
	}
	getMinute(){
	}
	getSecond(){
	}
	getMicrosecond(){
	}
	getTimestamp(){
	}
	getRFC822(){
	}
	getISO8601(){
	}
	getUTC(){
	}
}
module.exports = DateTime;