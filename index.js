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


var exports = {
	VERSION: '0.10.2',
	MODULE_NAME: 'Runtime',
}

function add(name)
{
	var module_name = exports.MODULE_NAME;
	
	name = name
		.substr(module_name.length + 1)
		.replace(".", "/")
	;
	
	var path = __dirname + "/" + name + ".js";
	var obj = require(path);
}

add("Runtime.lib");
add("Runtime.re");
add("Runtime.rtl");
add("Runtime.rs");
add("Runtime.fs");
add("Runtime.Collection");
add("Runtime.Dict");
add("Runtime.Map");
add("Runtime.Monad");
add("Runtime.Mutex");
add("Runtime.Vector");
add("Runtime.BaseObject");
add("Runtime.BaseStruct");
add("Runtime.DateTime");
add("Runtime.PathInfo");
add("Runtime.Reference");
add("Runtime.RuntimeUtils");
add("Runtime.Annotations.IntrospectionClass");
add("Runtime.Annotations.IntrospectionInfo");
add("Runtime.Exceptions.RuntimeException");
add("Runtime.Exceptions.ApiException");
add("Runtime.Exceptions.AssignStructValueError");
add("Runtime.Exceptions.IndexOutOfRange");
add("Runtime.Exceptions.KeyNotFound");
add("Runtime.Exceptions.UnknownError");
add("Runtime.Interfaces.AssetsInterface");
add("Runtime.Interfaces.ContextInterface");
add("Runtime.Interfaces.ModuleDescriptionInterface");
add("Runtime.Interfaces.StringInterface");
add("Runtime.ModuleDescription");

module.exports = exports;