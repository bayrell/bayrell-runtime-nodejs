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
var CoreObject = require('./CoreObject.js');
var CoreStruct = require('./CoreStruct.js');
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
class IntrospectionInfo extends CoreStruct{
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	hasAnnotation(class_name){
		if (this.annotations == null){
			return false;
		}
		for (var i = 0; i < this.annotations.count(); i++){
			var item = this.annotations.item(i);
			if (rtl.is_instanceof(item, class_name)){
				return true;
			}
		}
		return false;
	}
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	filterAnnotations(class_name){
		if (this.annotations == null){
			return null;
		}
		return this.annotations.filter((item) => {
			return rtl.is_instanceof(item, class_name);
		});
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.IntrospectionInfo";}
	static getParentClassName(){return "CoreStruct";}
	_init(){
		super._init();
		this.class_name = "";
		this.kind = "";
		this.name = "";
		this.annotations = null;
	}
	assignObject(obj){
		if (obj instanceof IntrospectionInfo){
			this.class_name = rtl._clone(obj.class_name);
			this.kind = rtl._clone(obj.kind);
			this.name = rtl._clone(obj.name);
			this.annotations = rtl._clone(obj.annotations);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "class_name") this.class_name = rtl.correct(value, "string", "", "");
		else if (variable_name == "kind") this.kind = rtl.correct(value, "string", "", "");
		else if (variable_name == "name") this.name = rtl.correct(value, "string", "", "");
		else if (variable_name == "annotations") this.annotations = rtl.correct(value, "Runtime.Vector", null, "Runtime.CoreObject");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "class_name") return this.class_name;
		else if (variable_name == "kind") return this.kind;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "annotations") return this.annotations;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("class_name");
		names.push("kind");
		names.push("name");
		names.push("annotations");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
IntrospectionInfo.ITEM_CLASS = "class";
IntrospectionInfo.ITEM_FIELD = "field";
IntrospectionInfo.ITEM_METHOD = "method";
module.exports = IntrospectionInfo;