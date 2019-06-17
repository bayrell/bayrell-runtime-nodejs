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
var Maybe = require('./Maybe.js');
var rtl = require('./rtl.js');
var Collection = require('./Collection.js');
class IntrospectionInfo extends CoreStruct{
	/* lambda isInstanceOf(string class_name) => bool (CoreStruct item) => rtl::is_instanceof(item, class_name); */
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	static filterAnnotations(class_name, info){
		if (info.annotations == null){
			return null;
		}
		return info.annotations.filter((item) => {
			return rtl.is_instanceof(item, class_name);
		}).toCollection();
	}
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	hasAnnotationOld(class_name){
		/*
		return Maybe::of(this.annotations)
			.map( 
				rtl::findFirst(
					bool (CoreStruct item) use (class_name)
					{
						return rtl::is_instanceof(item, class_name);
					}
				) 
			)
			.value() != null
		;
		
		*/
		/* return 
			( 
				pipe(this.annotations) >> 
				rtl::findFirst(self::isInstanceOf(class_name))
			).value() != null
		; 
		*/
		/* return Maybe.of(this.annotations).map( rtl::findFirst( self::isInstanceOf(class_name) ) ).value() != null; */
		/*
		if (this.annotations == null)
		{
			return false;
		}
		
		for (int i=0; i<this.annotations.count(); i++)
		{
			CoreStruct item = this.annotations.item(i);
			if (rtl::is_instanceof(item, class_name))
			{
				return true;
			}
		}
		
		return false;
		*/
	}
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	filterAnnotationsOld(class_name){
		/*
		return Maybe.of(this.annotations)
			.map( 
				rtl::filter(
					bool (CoreStruct item) use (class_name)
					{
						return rtl::is_instanceof(item, class_name);
					}
				) 
			)
			.value()
		;
		*/
		/* return Maybe.of(this.annotations).map( rtl::filter( self::isInstanceOf(class_name) ) ).value() != null; */
		/*
		if (this.annotations == null)
		{
			return null;
		}
		
		return this.annotations.filter(
			bool (CoreStruct item) use (class_name)
			{
				return rtl::is_instanceof(item, class_name);
			}
		);
		*/
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.IntrospectionInfo";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.IntrospectionInfo";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.ITEM_CLASS = "class";
		this.ITEM_FIELD = "field";
		this.ITEM_METHOD = "method";
		this.__class_name = "";
		if (names.indexOf("class_name") == -1)Object.defineProperty(this, "class_name", { get: function() { return this.__class_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("class_name") }});
		this.__kind = "";
		if (names.indexOf("kind") == -1)Object.defineProperty(this, "kind", { get: function() { return this.__kind; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("kind") }});
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__annotations = null;
		if (names.indexOf("annotations") == -1)Object.defineProperty(this, "annotations", { get: function() { return this.__annotations; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("annotations") }});
	}
	assignObject(obj){
		if (obj instanceof IntrospectionInfo){
			this.__class_name = obj.__class_name;
			this.__kind = obj.__kind;
			this.__name = obj.__name;
			this.__annotations = obj.__annotations;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "class_name")this.__class_name = rtl.convert(value,"string","","");
		else if (variable_name == "kind")this.__kind = rtl.convert(value,"string","","");
		else if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "annotations")this.__annotations = rtl.convert(value,"Runtime.Collection",null,"Runtime.CoreStruct");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "class_name") return this.__class_name;
		else if (variable_name == "kind") return this.__kind;
		else if (variable_name == "name") return this.__name;
		else if (variable_name == "annotations") return this.__annotations;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("class_name");
			names.push("kind");
			names.push("name");
			names.push("annotations");
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
IntrospectionInfo.ITEM_CLASS = "class";
IntrospectionInfo.ITEM_FIELD = "field";
IntrospectionInfo.ITEM_METHOD = "method";
module.exports = IntrospectionInfo;