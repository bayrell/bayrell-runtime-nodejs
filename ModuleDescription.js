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
var Emitter = require('./Emitter.js');
var Map = require('./Map.js');
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
		return "Runtime";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.7.3";
	}
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules(){
		return null;
	}
	/**
	 * Compatibility with older versions
	 */
	static getRequiredModules(){
		return this.requiredModules();
	}
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	static getModuleFiles(){
		return (new Vector()).push("Runtime.rs").push("Runtime.re").push("Runtime.rtl").push("Runtime.Collection").push("Runtime.Container").push("Runtime.CoreObject").push("Runtime.Dict").push("Runtime.Emitter").push("Runtime.RuntimeConstant").push("Runtime.RuntimeUtils").push("Runtime.Exceptions.RuntimeException").push("Runtime.Interfaces.CloneableInterface").push("Runtime.Interfaces.ContextInterface").push("Runtime.Interfaces.FactoryInterface").push("Runtime.Interfaces.ModuleDescriptionInterface").push("Runtime.Interfaces.SerializeInterface").push("Runtime.Interfaces.StringInterface").push("Runtime.Interfaces.SubscribeInterface").push("Runtime.AsyncTask").push("Runtime.AsyncThread").push("Runtime.Context").push("Runtime.ContextObject").push("Runtime.CoreStruct").push("Runtime.CoreEvent").push("Runtime.Map").push("Runtime.Maybe").push("Runtime.ModuleDescription").push("Runtime.Reference").push("Runtime.Vector").push("Runtime.Exceptions.IndexOutOfRange").push("Runtime.Exceptions.KeyNotFound").push("Runtime.Exceptions.UnknownError").push("Runtime.DateTime").push("Runtime.IntrospectionInfo").push("Runtime.LambdaChain").push("Runtime.Provider").push("Runtime.UIStruct");
	}
	/**
	 * Returns enities
	 */
	static entities(){
		return null;
	}
	/**
	 * Register lambda filters
	 */
	static lambdaFilters(){
		return null;
	}
	/**
	 * Called then module registed in context
	 * @param ContextInterface context
	 */
	static onRegister(context){
	}
	/**
	 * Called then context read config
	 * @param ContextInterface context
	 * @param Map<mixed> config
	 */
	static onReadConfig(context, config){
	}
	/**
	 * Init context
	 * @param ContextInterface context
	 */
	static onInitContext(context){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.ModuleDescription";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.ModuleDescription";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
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
ModuleDescription.__static_implements__ = [];
ModuleDescription.__static_implements__.push(ModuleDescriptionInterface)
module.exports = ModuleDescription;