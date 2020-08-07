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
if (typeof Runtime.Interfaces == 'undefined') Runtime.Interfaces = {};
Runtime.Interfaces.ModuleDescriptionInterface = function(ctx)
{
};
Object.assign(Runtime.Interfaces.ModuleDescriptionInterface.prototype,
{
	getClassName: function(ctx)
	{
		return "Runtime.Interfaces.ModuleDescriptionInterface";
	},
});
Object.assign(Runtime.Interfaces.ModuleDescriptionInterface,
{
	getCurrentNamespace: function()
	{
		return "Runtime.Interfaces";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Interfaces.ModuleDescriptionInterface";
	},
});use.add(Runtime.Interfaces.ModuleDescriptionInterface);
module.exports = Runtime.Interfaces.ModuleDescriptionInterface;