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
class LambdaChain extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.LambdaChain";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.LambdaChain";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.POS_LOW = -100;
		this.POS_NORMAL = 0;
		this.POS_HIGHT = 100;
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__value = null;
		if (names.indexOf("value") == -1)Object.defineProperty(this, "value", { get: function() { return this.__value; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("value") }});
		this.__pos = 0;
		if (names.indexOf("pos") == -1)Object.defineProperty(this, "pos", { get: function() { return this.__pos; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("pos") }});
	}
	assignObject(obj){
		if (obj instanceof LambdaChain){
			this.__name = obj.__name;
			this.__value = obj.__value;
			this.__pos = obj.__pos;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "value")this.__value = rtl.convert(value,"fun",null,"");
		else if (variable_name == "pos")this.__pos = rtl.convert(value,"int",0,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "name") return this.__name;
		else if (variable_name == "value") return this.__value;
		else if (variable_name == "pos") return this.__pos;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("name");
			names.push("value");
			names.push("pos");
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
LambdaChain.POS_LOW = -100;
LambdaChain.POS_NORMAL = 0;
LambdaChain.POS_HIGHT = 100;
module.exports = LambdaChain;