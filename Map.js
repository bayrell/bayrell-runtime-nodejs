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
var Vector = require('./Vector.js');
var KeyNotFound = require('./Exceptions/KeyNotFound.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof Runtime == "undefined") Runtime = {};

Runtime.Map = class extends Map{
	
	
	/**
	 * Correct items
	 */
	_correctItemsByType(type){
		return this.map((key, value) =>{
			if (isBrowser()) return Runtime.rtl.correct(value, type, null);
			return rtl.correct(value, type, null);
		});
	}
	
	
	
	/**
	 * Convert to string
	 * @param var value
	 * @return value
	 */
	toString(value){
		if (isBrowser()) return Runtime.rtl.toString(value);
		return rtl.toString(value);
	}
	
	
	
	/**
	 * Returns new Instance
	 * @param ContextInterface context
	 * @param Map<string, mixed> values
	 * @return CoreObject
	 */
	createNewInstance(){
		if (isBrowser()) return new Runtime.Map();
		return new Runtime.Map();
	}
	
	
	
	/**
	 * Assign objects
	 */
	assignObject(obj){
		if (obj instanceof Runtime.Map){
			obj.each((key, value) => {
				if (isBrowser()) this.set(key, Runtime.rtl._clone(value));
				else this.set(key, rtl._clone(value));
			});
		}
	}
	
	
	
	/**
	 * Map constructor
	 */
	constructor(map){
		super();
		var _Map = null; if (isBrowser()) _Map = Runtime.Map; else _Map = Map;
		if (map != undefined && typeof map == 'object'){		
			if (map instanceof Map){
				var keys = map.keys();
				keys.each((key)=>{
					super.set(key, map.item(key));
				});		
			}
			else{
				for (var i in map){
					super.set(i, map[i]);
				}
			}
		}
	}
	
	
	/**
	 * Returns value from position
	 * @param T key
	 * @param T default_value
	 * @return T
	 */
	get(key, default_value, type_value = "mixed", type_template = ""){
		key = this.toString(key);
		var val = super.get(key);
		if (val == undefined) return default_value;
		if (isBrowser()) return Runtime.rtl.correct(val, type_value, default_value, type_template);
		return rtl.correct(val, type_value, default_value, type_template);
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param T key - position
	 * @return T
	 */
	item(key){
		key = this.toString(key);
		if (!super.has(key)){
			if (isBrowser()) throw new Runtime.Exceptions.KeyNotFound(null, key);
			throw new KeyNotFound(null, key);
		}
		var val = super.get(key);
		if (val === null || val == undefined) return null;
		return val;
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param T pos - position
	 * @param T value 
	 */
	set(key, value){
		key = this.toString(key);
		super.set(key, value);
		return this;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param T key
	 */
	remove(key){
		key = this.toString(key);
		if (super.has(key)){
			super.delete(key);
		}
		return this;
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param T key
	 * @return bool var
	 */
	contains(key){
		key = this.toString(key);
		return super.has(key);
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param T key
	 * @return bool var
	 */
	has(key){
		key = this.toString(key);
		return super.has(key);
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	clear(){
		super.clear();
		return this;
	}

	
	
	/**
	 * Returns count items in vector
	 */
	count(){
		return this.size;
	}
	
	
	
	/**
	 * Returns vector of the keys
	 * @return Vector<T>
	 */
	keys(){
		var it = super.keys();
		var res = new Runtime.Vector();
		var next = it.next();
		while (!next.done){
			res.push( next.value );
			next = it.next();
		}
		return res;
	}
	
	
	
	/**
	 * Returns vector of the values
	 * @return Vector<T>
	 */
	values(){
		var it = super.values();
		var res = new Runtime.Vector();
		var next = it.next();
		while (!next.done){
			res.push( next.value );
			next = it.next();
		}
		return res;
	}
	
	
	
	/**
	 * Call function for each item
	 * @param func f
	 */
	each(f){
		var keys = this.keys();
		keys.each((key)=>{
			var value = this.item(key);
			f(key, value);
		});
		return this;
	}
	
	
	
	/**
	 * Call function map
	 * @param func f
	 * @return Map
	 */
	map(f){
		var _Map = null; if (isBrowser()) _Map = Runtime.Map; else _Map = Map;
		var res = new _Map();
		this.each((key, value)=>{
			res.set(key, f(key, value));
		});
		return res;
	}
	
	
	
	/**
	 * Reduce
	 * @param func f
	 * @param mixed init_value
	 * @return init_value
	 */
	reduce(f, init_value){
		var res = init_value;
		this.each((key, value) => {
			res = f(res, key, value);
		});
		return res;
	}
	
	
	
	/**
	 * Add values from other map
	 * @param Map<T, T> map
	 * @return self
	 */
	addMap(map){
		if (map != null)
			map.each((key)=>{
				this.set(key, map.item(key));
			});
		return this;
	}
	
	
	
	/**
	 * Convert Map to Object
	 */
	toObject(){
		var obj = {};
		this.each((key)=>{obj[key]=this.get(key, null);});
		return obj;
	}
	
	
	
	/**
	 * Returns copy of the current Map
	 */
	copy(){
		var instance = this.createNewInstance();
		this.each((key, value) => {
			instance.set(key, value);
		});
		return instance;
	}
}
if (false){

module.exports = {
	"Map": Runtime.Map
}

}
else{

module.exports = Runtime.Map;

}