"use strict;"
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
var CoreStruct = require('./CoreStruct.js');
var Dict = require('./Dict.js');
var Map = require('./Map.js');
var rs = require('./rs.js');
var rtl = require('./rtl.js');
var Collection = require('./Collection.js');
var Vector = require('./Vector.js');
class Provider extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Provider";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.Provider";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__value = "";
		if (names.indexOf("value") == -1)Object.defineProperty(this, "value", { get: function() { return this.__value; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("value") }});
		this.__init = null;
		if (names.indexOf("init") == -1)Object.defineProperty(this, "init", { get: function() { return this.__init; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("init") }});
	}
	assignObject(obj){
		if (obj instanceof Provider){
			this.__name = obj.__name;
			this.__value = obj.__value;
			this.__init = obj.__init;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "value")this.__value = rtl.convert(value,"string","","");
		else if (variable_name == "init")this.__init = rtl.convert(value,"fun",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "name") return this.__name;
		else if (variable_name == "value") return this.__value;
		else if (variable_name == "init") return this.__init;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("name");
			names.push("value");
			names.push("init");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = Provider;