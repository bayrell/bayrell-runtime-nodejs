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
var CoreObject = require('./CoreObject.js');
var Dict = require('./Dict.js');
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');
class CoreStruct extends CoreObject{
	/** 
	 * Constructor
	 */
	constructor(obj){
		if (obj == undefined) obj=null;
		super();
		if (obj != null){
			this.assignMap(obj);
			this.initData();
		}
		
		if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
	}
	/**
	 * Init struct data
	 */
	initData(){
	}
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	copy(obj){
		if (obj == undefined) obj=null;
		if (obj == null){
			return this;
		}
		var res = rtl.newInstance(this.getClassName(), (new Vector()));
		res.assignObject(this);
		res.setMap(obj);
		res.initData();
		/* Return object */
		return res;
	}
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fun f
	 * @return CoreStruct
	 */
	map(field_name, f){
		return this.copy((new Map()).set(field_name, f(this.takeValue(field_name))));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.CoreStruct";}
	static getCurrentClassName(){return "Runtime.CoreStruct";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(SerializeInterface);
	}
}
CoreStruct.__static_implements__ = [];
CoreStruct.__static_implements__.push(SerializeInterface)
module.exports = CoreStruct;