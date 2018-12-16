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

if (false){

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.6.0',
};

/* Exceptions */
ObjectAssign(module.exports, require("./Exceptions/IndexOutOfRange.js"));
ObjectAssign(module.exports, require("./Exceptions/KeyNotFound.js"));
ObjectAssign(module.exports, require("./Exceptions/RuntimeException.js"));
ObjectAssign(module.exports, require("./Exceptions/UnknownError.js"));

/* Interfaces */
ObjectAssign(module.exports, require("./Interfaces/AssetsInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/CloneableInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/ContextInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/FactoryInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/ModuleDescriptionInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/SerializeInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/StringInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/SubscribeInterface.js"));

/* Root */
ObjectAssign(module.exports, require("./Context.js"));
ObjectAssign(module.exports, require("./ContextObject.js"));
ObjectAssign(module.exports, require("./CoreObject.js"));
ObjectAssign(module.exports, require("./CoreStruct.js"));
ObjectAssign(module.exports, require("./DateTime.js"));
ObjectAssign(module.exports, require("./Emitter.js"));
ObjectAssign(module.exports, require("./IntrospectionInfo.js"));
ObjectAssign(module.exports, require("./Map.js"));
ObjectAssign(module.exports, require("./ModuleDescription.js"));
ObjectAssign(module.exports, require("./re.js"));
ObjectAssign(module.exports, require("./rs.js"));
ObjectAssign(module.exports, require("./rtl.js"));
ObjectAssign(module.exports, require("./RuntimeAssets.js"));
ObjectAssign(module.exports, require("./RuntimeConstant.js"));
ObjectAssign(module.exports, require("./RuntimeUtils.js"));
ObjectAssign(module.exports, require("./Vector.js"));

}
else{
module.exports = {
	VERSION: '0.6.0',
	'Exceptions': {
		'IndexOutOfRange': require("./Exceptions/IndexOutOfRange.js"),
		'KeyNotFound': require("./Exceptions/KeyNotFound.js"),
		'RuntimeException': require("./Exceptions/RuntimeException.js"),
		'UnknownError': require("./Exceptions/UnknownError.js"),
	},
	'Interfaces': {
		'AssetsInterface': require("./Interfaces/AssetsInterface.js"),
		'CloneableInterface': require("./Interfaces/CloneableInterface.js"),
		'ContextInterface': require("./Interfaces/ContextInterface.js"),
		'FactoryInterface': require("./Interfaces/FactoryInterface.js"),
		'ModuleDescriptionInterface': require("./Interfaces/ModuleDescriptionInterface.js"),
		'SerializeInterface': require("./Interfaces/SerializeInterface.js"),
		'StringInterface': require("./Interfaces/StringInterface.js"),
		'SubscribeInterface': require("./Interfaces/SubscribeInterface.js"),
	},
	'Context': require("./Context.js"),
	'ContextObject': require("./ContextObject.js"),
	'CoreObject': require("./CoreObject.js"),
	'DateTime': require("./DateTime.js"),
	'Emitter': require("./Emitter.js"),
	'Map': require("./Map.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	're': require("./re.js"),
	'rs': require("./rs.js"),
	'rtl': require("./rtl.js"),
	'RuntimeAssets': require("./RuntimeAssets.js"),
	'RuntimeConstant': require("./RuntimeConstant.js"),
	'RuntimeUtils': require("./RuntimeUtils.js"),
	'Vector': require("./Vector.js"),
};
}