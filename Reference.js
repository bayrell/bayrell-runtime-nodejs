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
var CoreObject = require('./CoreObject.js');
var rtl = require('./rtl.js');
class Reference extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(ref){
		if (ref == undefined) ref=null;
		super();
		this.ref = ref;
	}
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		if (obj instanceof Reference){
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		super.assignObject(obj);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Reference";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.Reference";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.uq = rtl.unique();
		this.ref = null;
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
module.exports = Reference;