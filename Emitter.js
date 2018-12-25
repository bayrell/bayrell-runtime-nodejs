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
		this.subscribers = new Map();
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
			this.subscribers = obj.subscribers;
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
	 * Add object by name
	 * @param callback f
	 * @param string name
	 */
	addObjectByName(f, name){
		if (!this.subscribers.has(name)){
			this.subscribers.set(name, new Vector());
		}
		var v = this.subscribers.item(name);
		if (v.indexOf(f) == -1){
			v.push(f);
		}
	}
	/**
	 * Add object
	 * @param SubscribeInterface f
	 * @param Vector<string> events
	 */
	addObject(f, events){
		if (events == undefined) events=null;
		if (events == null){
			this.addObjectByName(f, "");
		}
		else {
			events.each((item) => {
				this.addObjectByName(f, item);
			});
		}
		return f;
	}
	/**
	 * Remove object
	 * @param SubscribeInterface f
	 */
	removeObject(f, events){
		if (events == undefined) events=null;
		if (events == null){
			events = this.subscribers.keys();
		}
		events.each((name) => {
			var v = this.subscribers.get(name, null);
			if (v == null){
				return ;
			}
			v.removeItem(f);
		});
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
		var subscribers = this.subscribers.map((key, items) => {
			return items.slice();
		});
		/* Call self handler */
		this.handlerEvent(e);
		/* Call methods */
		keys = methods.keys();
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var items = methods.item(key);
			if (key != "" && e.getClassName() != key){
				continue;
			}
			for (var j = 0; j < items.count(); j++){
				var f = items.item(j);
				rtl.call(f, (new Vector()).push(e));
			}
		}
		/* Call subscribers */
		keys = subscribers.keys();
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var items = subscribers.item(key);
			if (key != "" && e.getClassName() != key){
				continue;
			}
			for (var j = 0; j < items.count(); j++){
				var obj = items.item(j);
				obj.handlerEvent(e);
			}
		}
	}
	/**
	 * Handler Event
	 */
	handlerEvent(e){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Emitter";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this.methods = null;
		this.subscribers = null;
	}
}
module.exports = Emitter;