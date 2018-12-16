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
var Map = require('./Map.js');
var Vector = require('./Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
class Context extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this._modules = new Vector();
		this._providers_names = new Map();
		this._managers = new Map();
		this._values = new Map();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Returns registed modules
	 * @return Vector<string>
	 */
	getModules(){
		return this._modules.slice();
	}
	/**
	 * Register module
	 */
	registerModule(module_name){
		var module_description_class_name = rtl.toString(module_name)+".ModuleDescription";
		if (this._modules.indexOf(module_description_class_name) != -1){
			return ;
		}
		this._modules.push(module_description_class_name);
		/* Call onRegister */
		var args = (new Vector()).push(this);
		rtl.callStaticMethod(module_description_class_name, "onRegister", args);
		/* Register required Modules*/
		var modules = rtl.callStaticMethod(module_description_class_name, "getRequiredModules", args);
		if (modules != null){
			var keys = modules.keys();
			var sz = keys.count();
			for (var i = 0; i < sz; i++){
				var module_name = keys.item(i);
				this.registerModule(module_name);
			}
		}
		return this;
	}
	/**
	 * Register module
	 * @param string provider_name
	 * @param FactoryInterface factory
	 */
	registerProviderFactory(provider_name, factory){
		if (!this._providers_names.has(provider_name)){
			this._providers_names.set(provider_name, factory);
		}
		return this;
	}
	/**
	 * Register manager
	 * @param string manager_name
	 * @param FactoryInterface factory
	 */
	registerManager(manager_name, obj){
		if (!this._managers.has(manager_name)){
			this._managers.set(manager_name, obj);
		}
		return this;
	}
	/**
	 * Read config
	 */
	readConfig(config){
		var args = new Vector();
		args.push(this);
		args.push(config);
		var sz = this._modules.count();
		for (var i = 0; i < sz; i++){
			var module_description_class_name = this._modules.item(i);
			rtl.callStaticMethod(module_description_class_name, "onReadConfig", args);
		}
		return this;
	}
	/**
	 * Init context
	 */
	init(){
		var args = new Vector();
		args.push(this);
		var sz = this._modules.count();
		for (var i = 0; i < sz; i++){
			var module_description_class_name = this._modules.item(i);
			rtl.callStaticMethod(module_description_class_name, "initContext", args);
		}
		return this;
	}
	/**
	 * Returns provider
	 *
	 * @params string provider_name
	 * @return CoreObject
	 */
	createProvider(provider_name){
		if (!this._providers_names.has(provider_name)){
			return null;
		}
		var factory_obj = this._providers_names.item(provider_name);
		if (factory_obj == null){
			return null;
		}
		var obj = factory_obj.newInstance(this);
		return obj;
	}
	/**
	 * Returns manager
	 *
	 * @params string manager_name
	 * @return CoreObject
	 */
	getManager(manager_name){
		if (this._managers.has(manager_name)){
			return this._managers.item(manager_name);
		}
		return null;
	}
	/**
	 * Set application locale
	 * @params string locale
	 */
	setLocale(locale){
		this._values.set("default.locale", locale);
	}
	/**
	 * Get application locale
	 * @params string locale
	 */
	getLocale(){
		return this._values.get("default.locale", "en", "string");
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate(message, params, locale){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		return message;
	}
	/**
	 * Fork current context
	 * @return ContextInterface
	 */
	fork(){
		var class_name = this.getClassName();
		var obj = rtl.newInstance(class_name);
		/* Add modules */
		this._modules.each((item) => {
			obj._modules.push(item);
		});
		/* Add managers */
		this._managers.each((key, value) => {
			obj._managers.set(key, value);
		});
		/* Add provider names */
		this._providers_names.each((key, value) => {
			obj._providers_names.set(key, value);
		});
		return obj;
	}
	/**
	 * Realease context resources
	 */
	release(){
	}
	/**
	 * Returns context value
	 * @param string name
	 * @return mixed
	 */
	getValue(name, default_value, type_value, type_template){
		if (default_value == undefined) default_value=null;
		if (type_value == undefined) type_value="mixed";
		if (type_template == undefined) type_template="";
		return this._values.get(name, default_value, type_value, type_template);
	}
	/**
	 * Set context value
	 * @param string name
	 * @param mixed value
	 */
	setValue(name, value){
		this._values.set(name, value);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Context";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this._modules = null;
		this._values = null;
		this._managers = null;
		this._providers_names = null;
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ContextInterface);
	}
}
Context.__static_implements__ = [];
Context.__static_implements__.push(ContextInterface)
module.exports = Context;