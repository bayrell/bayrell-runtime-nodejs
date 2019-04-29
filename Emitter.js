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
var rtl = require('./rtl.js');
var CoreEvent = require('./CoreEvent.js');
var CoreObject = require('./CoreObject.js');
var Map = require('./Map.js');
var Vector = require('./Vector.js');
var SubscribeInterface = require('./Interfaces/SubscribeInterface.js');
class Emitter extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(val){
		if (val == undefined) val=null;
		super();
		this.methods = new Map();
		this.emitters = new Vector();
		if (val != null){
			this.addMethod(val);
		}
	}
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		if (obj instanceof Emitter){
			this.methods = obj.methods;
			this.emitters = obj.emitters;
		}
		super.assignObject(obj);
	}
	/**
	 * Add method by name
	 * @param callback f
	 * @param string name
	 */
	addMethodByName(f, name){
		if (!this.methods.has(name)){
			this.methods.set(name, new Vector());
		}
		var v = this.methods.item(name);
		if (v.indexOf(f) == -1){
			v.push(f);
		}
	}
	/**
	 * Add method
	 * @param callback f
	 * @param Vector<string> events
	 * @return callback
	 */
	addMethod(f, events){
		if (events == undefined) events=null;
		if (events == null){
			this.addMethodByName(f, "");
		}
		else {
			events.each((item) => {
				this.addMethodByName(f, item);
			});
		}
		return f;
	}
	/**
	 * Remove method
	 * @param callback f
	 */
	removeMethod(f, events){
		if (events == undefined) events=null;
		if (events == null){
			events = this.methods.keys();
		}
		events.each((name) => {
			var v = this.methods.get(name, null);
			if (v == null){
				return ;
			}
			v.removeItem(f);
		});
	}
	/**
	 * Add object
	 * @param Emitter emitter
	 */
	addEmitter(emitter){
		this.emitters.push(emitter);
		return emitter;
	}
	/**
	 * Remove object
	 * @param Emitter emitter
	 */
	removeEmitter(emitter){
		this.emitters.removeItem(emitter);
	}
	/**
	 * Dispatch event
	 * @param CoreEvent e
	 */
	dispatch(e){
		var keys = null;
		/* Copy items */
		var methods = this.methods.map((key, items) => {
			return items.slice();
		});
		/* Call self handler */
		this.handlerEvent(e);
		/* Call methods */
		keys = methods.keys();
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var items = methods.item(key);
			if (key != "" && e.getClassName() != key && !rtl.is_instanceof(e, key)){
				continue;
			}
			for (var j = 0; j < items.count(); j++){
				var f = items.item(j);
				f(e);
				/*rtl::call(f, [e]);*/
			}
		}
		/* Call emitters */
		var emitters = this.emitters.copy();
		for (var i = 0; i < emitters.count(); i++){
			var emitter = this.emitters.item(i);
			emitter.dispatch(e);
		}
	}
	/**
	 * Handler Event
	 */
	handlerEvent(e){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Emitter";}
	static getCurrentClassName(){return "Runtime.Emitter";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.methods = null;
		this.emitters = null;
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
module.exports = Emitter;