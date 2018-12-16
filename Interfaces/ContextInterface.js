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
var CoreObject = require('../CoreObject.js');
class ContextInterface{
	/**
	 * Register module
	 */
	registerModule(module_name){
	}
	/**
	 * Register provider
	 * @param string provider_name
	 * @param FactoryInterface factory
	 */
	registerProviderFactory(provider_name, factory){
	}
	/**
	 * Register manager
	 * @param string manager_name
	 * @param CoreObject obj
	 */
	registerManager(manager_name, obj){
	}
	/**
	 * Returns provider
	 * @params string provider_name
	 * @return CoreObject
	 */
	createProvider(provider_name){
	}
	/**
	 * Returns manager
	 * @params string manager_name
	 * @return CoreObject
	 */
	getManager(manager_name){
	}
	/**
	 * Set application locale
	 * @params string locale
	 */
	setLocale(locale){
	}
	/**
	 * Get application locale
	 * @params string locale
	 */
	getLocale(){
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	/*string translate(string message, Map params = null, string locale = "");*/
	/**
	 * For current context
	 * @return ContextInterface
	 */
	fork(){
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
	}
	/**
	 * Set context value
	 * @param string name
	 */
	setValue(name, value){
	}
	/* ======================= Class Init Functions ======================= */
}
module.exports = ContextInterface;