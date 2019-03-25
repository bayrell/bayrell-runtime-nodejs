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
	VERSION: '0.7.1',
};

/* Exceptions */
ObjectAssign(module.exports, require("./Exceptions/AssignStructValueError.js"));
ObjectAssign(module.exports, require("./Exceptions/IndexOutOfRange.js"));
ObjectAssign(module.exports, require("./Exceptions/KeyNotFound.js"));
ObjectAssign(module.exports, require("./Exceptions/RuntimeException.js"));
ObjectAssign(module.exports, require("./Exceptions/UnknownError.js"));

/* Interfaces */
ObjectAssign(module.exports, require("./Interfaces/CloneableInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/ContextInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/FactoryInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/ModuleDescriptionInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/SerializeInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/StringInterface.js"));
ObjectAssign(module.exports, require("./Interfaces/SubscribeInterface.js"));

/* Root */
ObjectAssign(module.exports, require("./AsyncTask.js"));
ObjectAssign(module.exports, require("./AsyncThread.js"));
ObjectAssign(module.exports, require("./Collection.js"));
ObjectAssign(module.exports, require("./Container.js"));
ObjectAssign(module.exports, require("./Context.js"));
ObjectAssign(module.exports, require("./ContextObject.js"));
ObjectAssign(module.exports, require("./CoreEvent.js"));
ObjectAssign(module.exports, require("./CoreObject.js"));
ObjectAssign(module.exports, require("./CoreStruct.js"));
ObjectAssign(module.exports, require("./DateTime.js"));
ObjectAssign(module.exports, require("./Dict.js"));
ObjectAssign(module.exports, require("./Emitter.js"));
ObjectAssign(module.exports, require("./IntrospectionInfo.js"));
ObjectAssign(module.exports, require("./Map.js"));
ObjectAssign(module.exports, require("./Maybe.js"));
ObjectAssign(module.exports, require("./ModuleDescription.js"));
ObjectAssign(module.exports, require("./re.js"));
ObjectAssign(module.exports, require("./Reference.js"));
ObjectAssign(module.exports, require("./rs.js"));
ObjectAssign(module.exports, require("./rtl.js"));
ObjectAssign(module.exports, require("./RuntimeConstant.js"));
ObjectAssign(module.exports, require("./RuntimeUtils.js"));
ObjectAssign(module.exports, require("./UIStruct.js"));
ObjectAssign(module.exports, require("./Vector.js"));

}
else{
module.exports = {
	VERSION: '0.7.1',
	'Exceptions': {
		'AssignStructValueError': require("./Exceptions/AssignStructValueError.js"),
		'IndexOutOfRange': require("./Exceptions/IndexOutOfRange.js"),
		'KeyNotFound': require("./Exceptions/KeyNotFound.js"),
		'RuntimeException': require("./Exceptions/RuntimeException.js"),
		'UnknownError': require("./Exceptions/UnknownError.js"),
	},
	'Interfaces': {
		'CloneableInterface': require("./Interfaces/CloneableInterface.js"),
		'ContextInterface': require("./Interfaces/ContextInterface.js"),
		'FactoryInterface': require("./Interfaces/FactoryInterface.js"),
		'ModuleDescriptionInterface': require("./Interfaces/ModuleDescriptionInterface.js"),
		'SerializeInterface': require("./Interfaces/SerializeInterface.js"),
		'StringInterface': require("./Interfaces/StringInterface.js"),
		'SubscribeInterface': require("./Interfaces/SubscribeInterface.js"),
	},
	'AsyncTask': require("./AsyncTask.js"),
	'AsyncThread': require("./AsyncThread.js"),
	'Collection': require("./Collection.js"),
	'Container': require("./Container.js"),
	'Context': require("./Context.js"),
	'ContextObject': require("./ContextObject.js"),
	'CoreEvent': require("./CoreEvent.js"),
	'CoreObject': require("./CoreObject.js"),
	'CoreStruct': require("./CoreStruct.js"),
	'DateTime': require("./DateTime.js"),
	'Dict': require("./Dict.js"),
	'Emitter': require("./Emitter.js"),
	'Map': require("./Map.js"),
	'Maybe': require("./Maybe.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	're': require("./re.js"),
	'Reference': require("./Reference.js"),
	'rs': require("./rs.js"),
	'rtl': require("./rtl.js"),
	'RuntimeConstant': require("./RuntimeConstant.js"),
	'RuntimeUtils': require("./RuntimeUtils.js"),
	'UIStruct': require("./UIStruct.js"),
	'Vector': require("./Vector.js"),
};
}