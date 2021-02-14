"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.SerializeInterface = function()
{
};
Object.assign(Runtime.SerializeInterface.prototype,
{
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	get: function(variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
	},
	getClassName: function()
	{
		return "Runtime.SerializeInterface";
	},
});
Object.assign(Runtime.SerializeInterface,
{
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.SerializeInterface";
	},
});use.add(Runtime.SerializeInterface);
module.exports = Runtime.SerializeInterface;