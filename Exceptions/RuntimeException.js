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
var ContextInterface = require('../Interfaces/ContextInterface.js');

class ClassException extends Error { _init(){} }
class RuntimeException extends ClassException{
	constructor(message, code, context, prev){
		if (message == undefined) message="";
		if (code == undefined) code=0;
		if (context == undefined) context=null;
		if (prev == undefined) prev=null;
		super(message, code, prev);
		this.error_str = message;
		this.context = context;
		this.message = message;
		this.code = code;
		this.prev = prev;
	}
	getPreviousException(){
		return this.prev;
	}
	getErrorMessage(){
		return this.message;
	}
	getErrorCode(){
		return this.code;
	}
	getFileName(){
		return this.file;
	}
	setFileName(file){
		this.file = file;
	}
	getErrorLine(){
		return this.line;
	}
	setErrorLine(line){
		this.line = line;
	}
	getErrorPos(){
		return this.pos;
	}
	setErrorPos(pos){
		this.pos = pos;
	}
	toString(){
		return this.message;
	}
	buildMessage(){
		this.message = this.error_str;
		if (this.line != -1 && this.pos != -1){
			this.message += " at Ln:"+rtl.toString(this.line)+", Pos:"+rtl.toString(this.pos);
		}
		if (this.file != ""){
			this.message += " in file:'"+rtl.toString(this.file)+"'";
		}
	}
	/**
	 * Apply function and return new container
	 * @param fun f
	 * @return RuntimeException
	 */
	map(f){
		return this;
	}
	/**
	 * Return values of the container
	 * @return mixed
	 */
	value(){
		return null;
	}
	/**
	 * Returns true if value is empty
	 */
	isEmpty(){
		return true;
	}
	/**
	 * Returns true if is error
	 */
	isError(){
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Exceptions.RuntimeException";}
	static getCurrentNamespace(){return "Runtime.Exceptions";}
	static getCurrentClassName(){return "Runtime.Exceptions.RuntimeException";}
	static getParentClassName(){return "Runtime.Exceptions.ClassException";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.context = null;
		this.prev = null;
		this.error_str = "";
		this.message = "";
		this.code = 0;
		this.file = "";
		this.line = -1;
		this.pos = -1;
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
module.exports = RuntimeException;