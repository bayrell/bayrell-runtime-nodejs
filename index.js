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
	VERSION: '0.8.1',
};

}
else{

var use = require('bayrell').use;

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.8.1',
	'rs': require(__dirname + "/rs.js"),
	'rtl': require(__dirname + "/rtl.js"),
	'lib': require(__dirname + "/lib.js"),
	'Collection': require(__dirname + "/Collection.js"),
	'Dict': require(__dirname + "/Dict.js"),
	'Map': require(__dirname + "/Map.js"),
	'Vector': require(__dirname + "/Vector.js"),
	'CoreObject': require(__dirname + "/CoreObject.js"),
	'CoreStruct': require(__dirname + "/CoreStruct.js"),
	'FakeStruct': require(__dirname + "/FakeStruct.js"),
	'BusResult': require(__dirname + "/BusResult.js"),
	'Context': require(__dirname + "/Context.js"),
	'CoreDriver': require(__dirname + "/CoreDriver.js"),
	'CoreEvent': require(__dirname + "/CoreEvent.js"),
	'CoreProvider': require(__dirname + "/CoreProvider.js"),
	'DateTime': require(__dirname + "/DateTime.js"),
	'lib': require(__dirname + "/lib.js"),
	'ModuleDescription': require(__dirname + "/ModuleDescription.js"),
	'PathInfo': require(__dirname + "/PathInfo.js"),
	're': require(__dirname + "/re.js"),
	'Reference': require(__dirname + "/Reference.js"),
	'RuntimeConstant': require(__dirname + "/RuntimeConstant.js"),
	'RuntimeUtils': require(__dirname + "/RuntimeUtils.js"),
	'Session': require(__dirname + "/Session.js"),
	'UIStruct': require(__dirname + "/UIStruct.js"),
	'Annotations': {
		'Entity': require(__dirname + "/Annotations/Entity.js"),
	},
	'Exceptions': {
		'RuntimeException': require(__dirname + "/Exceptions/RuntimeException.js"),
	},
};

//console.log( "Runtime.Exceptions.RuntimeException" );
//console.log( use("Runtime.Exceptions.RuntimeException") );

ObjectAssign(module.exports, {
	'Annotations': {
		'Driver': require(__dirname + "/Annotations/Driver.js"),
		'IntrospectionClass': require(__dirname + "/Annotations/IntrospectionClass.js"),
		'IntrospectionInfo': require(__dirname + "/Annotations/IntrospectionInfo.js"),
		'LambdaChain': require(__dirname + "/Annotations/LambdaChain.js"),
		'LambdaChainDeclare': require(__dirname + "/Annotations/LambdaChainDeclare.js"),
		'Provider': require(__dirname + "/Annotations/Provider.js"),
	},
	'Exceptions': {
		'ApiException': require(__dirname + "/Exceptions/ApiException.js"),
		'AssignStructValueError': require(__dirname + "/Exceptions/AssignStructValueError.js"),
		'IndexOutOfRange': require(__dirname + "/Exceptions/IndexOutOfRange.js"),
		'KeyNotFound': require(__dirname + "/Exceptions/KeyNotFound.js"),
		'UnknownError': require(__dirname + "/Exceptions/UnknownError.js"),
	},
	'Interfaces': {
		'AssetsInterface': require(__dirname + "/Interfaces/AssetsInterface.js"),
		'BusInterface': require(__dirname + "/Interfaces/BusInterface.js"),
		'ModuleDescriptionInterface': require(__dirname + "/Interfaces/ModuleDescriptionInterface.js"),
		'SerializeInterface': require(__dirname + "/Interfaces/SerializeInterface.js"),
		'StringInterface': require(__dirname + "/Interfaces/StringInterface.js"),
	},
});



require('bayrell').use.add_exports(module.exports);

}