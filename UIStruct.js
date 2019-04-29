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
class UIStruct extends CoreStruct{
	/**
	 * Returns true if component
	 * @return bool
	 */
	static isComponent(ui){
		return ui.kind == UIStruct.TYPE_COMPONENT;
	}
	/**
	 * Returns true if element
	 * @return bool
	 */
	static isElement(ui){
		return ui.kind == UIStruct.TYPE_ELEMENT;
	}
	/**
	 * Returns true if string
	 * @return bool
	 */
	static isString(ui){
		return ui.kind == UIStruct.TYPE_STRING || ui.kind == UIStruct.TYPE_RAW;
	}
	/**
	 * Returns model
	 * @return CoreStruct
	 */
	static getModel(ui){
		if (ui.model != null){
			return ui.model;
		}
		if (ui.kind == UIStruct.TYPE_COMPONENT){
			var model_name = rtl.method(ui.name, "modelName")();
			if (model_name == ""){
				return null;
			}
			var model = rtl.newInstance(model_name, (new Vector()).push(ui.props));
			return model;
		}
		return null;
	}
	/**
	 * Returns key path
	 * @return string
	 */
	static getKey(ui, index){
		return (ui.key !== "") ? (ui.key) : (index);
	}
	/**
	 * Returns key path
	 * @return string
	 */
	static getKeyPath(ui, key_path, index){
		return (key_path !== "") ? (rtl.toString(key_path)+"."+rtl.toString(this.getKey(ui, index))) : (this.getKey(ui, index));
	}
	/**
	 * Returns attrs
	 */
	static getAttrs(ui){
		if (ui.props != null){
			return ui.props.filter((key, value) => {
				return rs.strpos(key, "@") != 0 || key == "@class" || key == "@style";
			});
		}
		return new Dict();
	}
	/**
	 * Returns props
	 */
	static getProps(ui){
		if (ui.props != null){
			return ui.props.filter((key, value) => {
				return rs.strpos(key, "@") == 0 && rs.strpos(key, "@on") != 0 && key != "@class";
			});
		}
		return new Dict();
	}
	/**
	 * Returns events
	 */
	static getEvents(ui){
		if (ui.props != null){
			return ui.props.filter((key, value) => {
				return rs.strpos(key, "@on") == 0;
			});
		}
		return new Dict();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.UIStruct";}
	static getCurrentClassName(){return "Runtime.UIStruct";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.TYPE_ELEMENT = "element";
		this.TYPE_COMPONENT = "component";
		this.TYPE_STRING = "string";
		this.TYPE_RAW = "raw";
		this.__class_name = "";
		if (names.indexOf("class_name") == -1)Object.defineProperty(this, "class_name", { get: function() { return this.__class_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("class_name") }});
		this.__key = "";
		if (names.indexOf("key") == -1)Object.defineProperty(this, "key", { get: function() { return this.__key; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("key") }});
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__space = "";
		if (names.indexOf("space") == -1)Object.defineProperty(this, "space", { get: function() { return this.__space; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("space") }});
		this.__kind = "element";
		if (names.indexOf("kind") == -1)Object.defineProperty(this, "kind", { get: function() { return this.__kind; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("kind") }});
		this.__content = "";
		if (names.indexOf("content") == -1)Object.defineProperty(this, "content", { get: function() { return this.__content; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("content") }});
		this.__controller = "";
		if (names.indexOf("controller") == -1)Object.defineProperty(this, "controller", { get: function() { return this.__controller; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("controller") }});
		this.__model = null;
		if (names.indexOf("model") == -1)Object.defineProperty(this, "model", { get: function() { return this.__model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("model") }});
		this.__props = null;
		if (names.indexOf("props") == -1)Object.defineProperty(this, "props", { get: function() { return this.__props; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("props") }});
		this.__children = null;
		if (names.indexOf("children") == -1)Object.defineProperty(this, "children", { get: function() { return this.__children; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("children") }});
	}
	assignObject(obj){
		if (obj instanceof UIStruct){
			this.__class_name = obj.__class_name;
			this.__key = obj.__key;
			this.__name = obj.__name;
			this.__space = obj.__space;
			this.__kind = obj.__kind;
			this.__content = obj.__content;
			this.__controller = obj.__controller;
			this.__model = obj.__model;
			this.__props = obj.__props;
			this.__children = obj.__children;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "class_name")this.__class_name = rtl.convert(value,"string","","");
		else if (variable_name == "key")this.__key = rtl.convert(value,"string","","");
		else if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "space")this.__space = rtl.convert(value,"string","","");
		else if (variable_name == "kind")this.__kind = rtl.convert(value,"string","element","");
		else if (variable_name == "content")this.__content = rtl.convert(value,"string","","");
		else if (variable_name == "controller")this.__controller = rtl.convert(value,"string","","");
		else if (variable_name == "model")this.__model = rtl.convert(value,"Runtime.CoreStruct",null,"");
		else if (variable_name == "props")this.__props = rtl.convert(value,"Runtime.Dict",null,"primitive");
		else if (variable_name == "children")this.__children = rtl.convert(value,"Runtime.Collection",null,"Runtime.UIStruct");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "class_name") return this.__class_name;
		else if (variable_name == "key") return this.__key;
		else if (variable_name == "name") return this.__name;
		else if (variable_name == "space") return this.__space;
		else if (variable_name == "kind") return this.__kind;
		else if (variable_name == "content") return this.__content;
		else if (variable_name == "controller") return this.__controller;
		else if (variable_name == "model") return this.__model;
		else if (variable_name == "props") return this.__props;
		else if (variable_name == "children") return this.__children;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("class_name");
			names.push("key");
			names.push("name");
			names.push("space");
			names.push("kind");
			names.push("content");
			names.push("controller");
			names.push("model");
			names.push("props");
			names.push("children");
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
UIStruct.TYPE_ELEMENT = "element";
UIStruct.TYPE_COMPONENT = "component";
UIStruct.TYPE_STRING = "string";
UIStruct.TYPE_RAW = "raw";
module.exports = UIStruct;