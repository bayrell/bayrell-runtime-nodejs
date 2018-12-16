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
var CloneableInterface = require('./Interfaces/CloneableInterface.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');
class CoreEvent extends CoreObject{
	constructor(sender){
		if (sender == undefined) sender=null;
		super();
		this.sender = sender;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.CoreEvent";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this.sender = null;
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(CloneableInterface);
		this.__implements__.push(SerializeInterface);
	}
}
CoreEvent.__static_implements__ = [];
CoreEvent.__static_implements__.push(CloneableInterface)
CoreEvent.__static_implements__.push(SerializeInterface)
module.exports = CoreEvent;