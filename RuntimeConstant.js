"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
class RuntimeConstant{
	/* Log level */
	/**
	 * Fatal error. Application stoped
	 */
	/**
	 * Critical error. Application damaged, but works
	 */
	/**
	 * Any Application error or exception
	 */
	/**
	 * Log warning. Developer should attention to this
	 */
	/**
	 * Information about any event
	 */
	/**
	 * Debug level 1
	 */
	/**
	 * Debug level 2
	 */
	/* Status codes */
	/* Errors */
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.RuntimeConstant";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.RuntimeConstant";}
	static getParentClassName(){return "";}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
RuntimeConstant.LOG_FATAL = 0;
RuntimeConstant.LOG_CRITICAL = 2;
RuntimeConstant.LOG_ERROR = 4;
RuntimeConstant.LOG_WARNING = 6;
RuntimeConstant.LOG_INFO = 8;
RuntimeConstant.LOG_DEBUG = 10;
RuntimeConstant.LOG_DEBUG2 = 12;
RuntimeConstant.STATUS_PLAN = 0;
RuntimeConstant.STATUS_DONE = 1;
RuntimeConstant.STATUS_PROCESS = 100;
RuntimeConstant.STATUS_FAIL = -1;
RuntimeConstant.ERROR_NULL = 0;
RuntimeConstant.ERROR_OK = 1;
RuntimeConstant.ERROR_PROCCESS = 100;
RuntimeConstant.ERROR_FALSE = -100;
RuntimeConstant.ERROR_UNKNOWN = -1;
RuntimeConstant.ERROR_INDEX_OUT_OF_RANGE = -2;
RuntimeConstant.ERROR_KEY_NOT_FOUND = -3;
RuntimeConstant.ERROR_STOP_ITERATION = -4;
RuntimeConstant.ERROR_OBJECT_DOES_NOT_EXISTS = -5;
RuntimeConstant.ERROR_OBJECT_ALLREADY_EXISTS = -6;
RuntimeConstant.ERROR_ASSERT = -7;
RuntimeConstant.ERROR_REQUEST = -8;
RuntimeConstant.ERROR_RESPONSE = -9;
RuntimeConstant.ERROR_CSRF_TOKEN = -10;
RuntimeConstant.ERROR_RUNTIME = -11;
RuntimeConstant.ERROR_VALIDATION = -12;
RuntimeConstant.ERROR_PARSE_SERIALIZATION_ERROR = -14;
RuntimeConstant.ERROR_ASSIGN_DATA_STRUCT_VALUE = -15;
RuntimeConstant.ERROR_FILE_NOT_FOUND = -16;
RuntimeConstant.ERROR_FATAL = -99;
module.exports = RuntimeConstant;