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
var rs = require('./rs.js');
var rtl = require('./rtl.js');
var CoreObject = require('./CoreObject.js');
var LambdaChain = require('./LambdaChain.js');
var Provider = require('./Provider.js');
var Dict = require('./Dict.js');
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
		this._entities = new Vector();
		this._modules = new Vector();
		this._providers = new Map();
		this._providers_obj = new Map();
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
		return this._modules.toCollection();
	}
	/**
	 * Returns providers names
	 */
	getProviders(){
		return this._providers.keys().toCollection();
	}
	/**
	 * Returns helper
	 *
	 * @params string provider_name
	 * @return CoreStruct
	 */
	createProvider(provider_name){
		if (this._providers.has(provider_name)){
			var info = this._providers.item(provider_name);
			var obj = rtl.newInstance(info.value);
			if (info.init){
				var f = info.init;
				obj = f(this, obj);
			}
			else {
				var f = rtl.method(info.value, "init");
				obj = f(this, obj);
			}
			obj = this.chain(info.value, obj);
			return obj;
		}
		return null;
	}
	/**
	 * Returns helper
	 *
	 * @params string provider_name
	 * @return CoreStruct
	 */
	getProvider(provider_name){
		if (this._providers_obj.has(provider_name)){
			return this._providers_obj.item(provider_name);
		}
		if (this._providers.has(provider_name)){
			var provider = this.createProvider(provider_name);
			this._providers_obj.set(provider_name, provider);
			return provider;
		}
		return null;
	}
	/**
	 * Register module
	 */
	registerModule(module_name){
		if (this._modules.indexOf(module_name) != -1){
			return ;
		}
		var module_description_class_name = rtl.toString(module_name)+".ModuleDescription";
		if (!rtl.class_exists(module_description_class_name)){
			return this;
		}
		this._modules.push(module_name);
		/* Register required Modules*/
		var modules = rtl.callStaticMethod(module_description_class_name, "requiredModules", (new Vector()));
		if (modules != null){
			var keys = modules.keys();
			var sz = keys.count();
			for (var i = 0; i < sz; i++){
				var module_name = keys.item(i);
				this.registerModule(module_name);
			}
		}
		var entities = rtl.callStaticMethod(module_description_class_name, "entities", (new Vector()).push(this));
		if (entities != null){
			this._entities = this._entities.appendVector(entities);
		}
		rtl.callStaticMethod(module_description_class_name, "onRegister", (new Vector()).push(this));
		return this;
	}
	/**
	 * Apply Lambda Chain
	 */
	chain(filter_name, obj){
		if (obj == undefined) obj=null;
		var entities = this._entities.filter((item) => {
			return item instanceof LambdaChain;
		});
		entities = entities.filter((item) => {
			return item.name == filter_name;
		});
		entities = entities.sortIm((a, b) => {
			return a.pos > b.pos;
		});
		for (var i = 0; i < entities.count(); i++){
			var item = entities.item(i);
			var f = item.value;
			obj = f(this, obj);
		}
		return obj;
	}
	/**
	 * Read config
	 */
	readConfig(config){
		this.config = config;
		/* Set base path */
		var runtime = config.get("Runtime", null);
		if (runtime != null && runtime instanceof Dict){
			var base_path = runtime.get("base_path", null, "string");
			if (base_path != null){
				this.base_path = base_path;
			}
		}
		return this;
		var args = new Vector();
		args.push(this);
		args.push(config);
		var sz = this._modules.count();
		for (var i = 0; i < sz; i++){
			var module_name = this._modules.item(i);
			var module_description_class_name = rtl.toString(module_name)+".ModuleDescription";
			rtl.callStaticMethod(module_description_class_name, "onReadConfig", args);
		}
		return this;
	}
	getConfig(){
		return this.config;
	}
	/**
	 * Init context
	 */
	init(){
		/* Register providers */
		var providers = this._entities.filter((item) => {
			return item instanceof Provider;
		});
		for (var i = 0; i < providers.count(); i++){
			var item = providers.item(i);
			this._providers.set(item.name, item);
		}
		/* Call onInitContext */
		var args = new Vector();
		args.push(this);
		var sz = this._modules.count();
		for (var i = 0; i < sz; i++){
			var module_name = this._modules.item(i);
			var module_description_class_name = rtl.toString(module_name)+".ModuleDescription";
			rtl.callStaticMethod(module_description_class_name, "onInitContext", args);
		}
		return this;
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
		/* Add services */
		this._drivers.each((key, value) => {
			obj._drivers.set(key, value);
		});
		/* Add provider names */
		this._providers_names.each((key, value) => {
			obj._providers_names.set(key, value);
		});
		/* Add values */
		this._values.each((key, value) => {
			obj._values.set(key, value);
		});
		return obj;
	}
	/**
	 * Realease context resources
	 */
	release(){
	}
	/**
	 * Returns base path
	 * @return string
	 */
	getBasePath(){
		return this.base_path;
	}
	/**
	 * Call api
	 * @param string class_name
	 * @param string method_name
	 * @param ApiRequest request
	 * @return mixed The result of the api
	 */
	
	callApi(class_name, interface_name, method_name, data)
	{
		var bus = this.getProvider("core.ui.bus");
		method_name = (interface_name != "") ? interface_name + "." + method_name : method_name;
		return (ctx) => {
			bus.sendApi(
				class_name,
				method_name,
				data,
				(function (ctx){
					return function (data){
						var res = new Core.Http.ApiResult( data );
						return ctx.resolve(res);
					}
				})(ctx)
			);
			return null;
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Context";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.Context";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.base_path = null;
		this.config = null;
		this._modules = null;
		this._entities = null;
		this._drivers = null;
		this._providers = null;
		this._providers_obj = null;
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ContextInterface);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
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
Context.__static_implements__ = [];
Context.__static_implements__.push(ContextInterface)
module.exports = Context;