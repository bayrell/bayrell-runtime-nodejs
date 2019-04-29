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
var rtl = require('./rtl.js');
var Map = require('./Map.js');
var Vector = require('./Vector.js');
class CoreObject{
	/** 
	 * Constructor
	 */
	constructor(){
		
		this._init();
	}
	
	_init(){
		this.__implements__ = new Array();
	}
	
	_del(){
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		return this.takeVirtualValue(variable_name, default_value);
	}
	/**
	 * Returns virtual values
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeVirtualValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		return default_value;
	}
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
	}
	/**
	 * Set new values instance by Map
	 * @param Map<mixed> map
	 * @return CoreObject
	 */
	assignMap(values){
		if (values == undefined) values=null;
		if (values == null){
			return ;
		}
		var names = new Vector();
		this.getVariablesNames(names, 2);
		names.each((name) => {
			this.assignValue(name, values.get(name, null));
		});
		return this;
	}
	/**
	 * Set new values instance by Map
	 * @param Map<mixed> map
	 * @return CoreObject
	 */
	setMap(values){
		if (values == undefined) values=null;
		if (values == null){
			return ;
		}
		values.each((key, value) => {
			this.assignValue(key, value);
		});
		return this;
	}
	/**
	 * Dump serializable object to Map
	 * @return Map<mixed>
	 */
	takeMap(flag){
		if (flag == undefined) flag=2;
		var values = new Map();
		var names = new Vector();
		this.getVariablesNames(names, flag);
		names.each((name) => {
			values.set(name, this.takeValue(name, null));
		});
		return values;
	}
	/**
	 * Call static method of the current class
	 * @param string method_name
	 * @param Vector args
	 * @return mixed
	 */
	callStaticMethod(method_name, args){
		if (args == undefined) args=null;
		return rtl.callStaticMethod(this.getClassName(), method_name, args);
	}
	/**
	 * Returns field info by field_name
	 * @param string field_name
	 * @return IntrospectionInfo
	 */
	static getFieldInfoByName(field_name){
	}
	/**
	 * Returns virtual field info by field_name
	 * @param string field_name
	 * @return IntrospectionInfo
	 */
	static getVirtualFieldInfo(field_name){
		return null;
	}
	/**
	 * Returns public fields list
	 * @param Vector<string> names
	 */
	static getFieldsList(names, flag){
		if (flag == undefined) flag=0;
	}
	/**
	 * Returns public virtual fields names
	 * @param Vector<string> names
	 */
	static getVirtualFieldsList(names, flag){
		if (flag == undefined) flag=0;
	}
	/**
	 * Returns info of the public method by name
	 * @param string method_name
	 * @return IntrospectionInfo
	 */
	static getMethodInfoByName(method_name){
		return null;
	}
	/**
	 * Returns list of the public methods
	 * @param Vector<string> methods
	 */
	static getMethodsList(methods){
	}
	/**
	 * Returns names of variables to serialization
	 * @param Vector<string>
	 */
	getVariablesNames(names, flag){
		if (flag == undefined) flag=0;
		rtl.callStaticMethod("Runtime.RuntimeUtils", "getVariablesNames", (new Vector()).push(this.getClassName()).push(names).push(flag));
	}
	/**
	 * Returns info of the public variable by name
	 * @param string variable_name
	 * @return IntrospectionInfo
	 */
	getFieldInfo(variable_name){
		var classes = rtl.callStaticMethod("Runtime.RuntimeUtils", "getParents", (new Vector()).push(this.getClassName()));
		for (var i = 0; i < classes.count(); i++){
			var class_name = classes.item(i);
			var info = rtl.callStaticMethod(class_name, "getFieldInfoByName", (new Vector()).push(variable_name));
			if (info != null && item.kind == IntrospectionInfo.ITEM_FIELD){
				return info;
			}
			try{
				var info = rtl.callStaticMethod(class_name, "getVirtualFieldInfo", (new Vector()).push(variable_name));
				if (info != null && item.kind == IntrospectionInfo.ITEM_FIELD){
					return info;
				}
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
		}
		return null;
	}
	/**
	 * Returns names of methods
	 * @param Vector<string>
	 */
	getMethodsNames(names){
		var classes = rtl.callStaticMethod("Runtime.RuntimeUtils", "getParents", (new Vector()).push(this.getClassName()));
		for (var i = 0; i < classes.count(); i++){
			var class_name = classes.item(i);
			rtl.callStaticMethod(class_name, "getMethodsList", (new Vector()).push(names));
		}
	}
	/**
	 * Returns info of the public method by name
	 * @param string method_name
	 * @return IntrospectionInfo
	 */
	getMethodInfo(method_name){
		var classes = rtl.callStaticMethod("Runtime.RuntimeUtils", "getParents", (new Vector()).push(this.getClassName()));
		for (var i = 0; i < classes.count(); i++){
			var class_name = classes.item(i);
			var info = rtl.callStaticMethod(class_name, "getMethodInfoByName", (new Vector()).push(method_name));
			if (info != null && item.kind == IntrospectionInfo.ITEM_METHOD){
				return info;
			}
		}
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.CoreObject";}
	static getCurrentClassName(){return "Runtime.CoreObject";}
	static getParentClassName(){return "";}
}
module.exports = CoreObject;