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
var rtl = require('../rtl.js');
var RuntimeConstant = require('../RuntimeConstant.js');
var RuntimeException = require('./RuntimeException.js');
var ContextInterface = require('../Interfaces/ContextInterface.js');
class UnknownError extends RuntimeException{
	constructor(context, prev){
		if (context == undefined) context=null;
		if (prev == undefined) prev=null;
		super(rtl.translate("Unknown error", null, "", context), RuntimeConstant.ERROR_UNKNOWN, context, prev);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Exceptions.UnknownError";}
	static getCurrentNamespace(){return "Runtime.Exceptions";}
	static getCurrentClassName(){return "Runtime.Exceptions.UnknownError";}
	static getParentClassName(){return "Runtime.Exceptions.RuntimeException";}
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
module.exports = UnknownError;