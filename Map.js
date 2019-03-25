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
var _Dict = require('./Dict.js');
Runtime.Map = class extends _Dict
{

	/**
	 * Returns new Instance
	 * @return Object
	 */
	static createNewInstance(obj)
	{
		if (obj == undefined) obj = null;
		return new Runtime.Map(obj);
	}
	
	
	
	/**
	 * Assign objects
	 */
	assignObject(obj)
	{
		if (obj instanceof Runtime.Map)
		{
			obj.each(
				(key, value) => {
					if (isBrowser()) this.set(key, Runtime.rtl._clone(value));
					else this.set(key, rtl._clone(value));
				}
			);
		}
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param T pos - position
	 * @param T value 
	 */
	set(key, value)
	{
		key = this.toString(key);
		super.set(key, value);
		return this;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param T key
	 */
	remove(key)
	{
		key = this.toString(key);
		if (super.has(key)){
			super.delete(key);
		}
		return this;
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	clear()
	{
		super.clear();
		return this;
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