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
var Vector = require('./Vector.js');
class re{
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	static match(r, s){
		
		return s.match( new RegExp(r, "g") ) != null;
	}
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	static matchAll(r, s){
		return null;
	}
	/**
	 * Replace with regular expression
	 * @param string r - regular expression
	 * @param string replace - new value
	 * @param string s - replaceable string
	 * @return string
	 */
	static replace(r, replace, s){
		
		return s.replace(new RegExp(r, "g"), replace);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.re";}
	static getCurrentClassName(){return "Runtime.re";}
	static getParentClassName(){return "";}
}
module.exports = re;