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
var rtl = require('./rtl.js');
var AsyncTask = require('./AsyncTask.js');
var CoreObject = require('./CoreObject.js');
var Vector = require('./Vector.js');
class AsyncThread extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.reset();
	}
	/**
	 * Reset AsyncThread
	 */
	reset(){
		this.pos = "0";
		this.res = null;
		this.err = null;
		this.run_stack = new Vector();
		this.catch_stack = new Vector();
	}
	/**
	 * Returns current position
	 * @return string
	 */
	current(){
		return this.pos;
	}
	/**
	 * Returns result of the prev function
	 * @return mixed
	 */
	result(){
		return this.res;
	}
	/**
	 * Returns error of the prev function
	 * @return mixed
	 */
	getError(){
		return this.err;
	}
	/**
	 * Clear error
	 */
	clearError(){
		this.err = null;
	}
	/**
	 * Resolve thread with result
	 * @param mixed res
	 */
	resolve(res){
		this.res = res;
		this.next();
		this.forward();
		return "resolve";
	}
	/**
	 * Set position
	 * @param string pos
	 */
	jump(pos){
		this.pos = pos;
		return "jump";
	}
	/**
	 * Resolve Exception
	 * @param mixed res
	 */
	error(err){
		if (this.catch_stack.count() == 0){
			this.err = err;
			this.next(true);
		}
		else {
			this.err = err;
			this.pos = this.catch_stack.pop();
		}
		this.forward();
		return "error";
	}
	/**
	 * Push catch
	 * @param string pos
	 */
	catchPush(pos){
		this.catch_stack.push(pos);
	}
	/**
	 * Pop catch
	 */
	catchPop(){
		this.catch_stack.pop();
	}
	/**
	 * Call next
	 */
	next(is_error){
		if (is_error == undefined) is_error=false;
		if (this.run_stack.count() == 0){
			this.pos = "-1";
			return ;
		}
		var task = this.run_stack.pop();
		/* Restore pos */
		this.f = task.f;
		this.pos = task.pos;
		this.catch_stack = task.catch_stack;
		if (is_error){
			if (this.catch_stack.count() == 0){
				this.pos = "-1";
			}
			else {
				this.pos = this.catch_stack.pop();
			}
		}
		return "next";
	}
	/**
	 * Forward call
	 */
	forward(){
		var is_browser = rtl.isBrowser();
		
		var _rtl; if (is_browser) _rtl = Runtime.rtl; else _rtl = rtl;
		var _AsyncTask; if (is_browser) _AsyncTask = Runtime.AsyncTask; else _AsyncTask = AsyncTask;
		var _Vector; if (is_browser) _Vector = Runtime.Vector; else _Vector = Vector;
		setTimeout( 
			()=>{
				if (this.pos == "-1"){
					if (this.err != null){
						throw this.err;
					}
					return;
				}
				
				/* Call task function */
				var res = null;
				try{
					res = _rtl.call(this.f, [this]);
				}
				catch (e){
					res = null;
					this.error(e);
				}
				
				/* If can forward */
				if (res != null){
				
					/* If return next async function */
					if (res instanceof Function){
						var task = new _AsyncTask();
						task.f = this.f;
						task.pos = this.pos;
						task.catch_stack = this.catch_stack;
						this.run_stack.push(task);
						this.catch_stack = new _Vector();
						this.pos = "0";
						this.f = res;
					}
					
					/* Call forward */
					if (res != "error" && res != "resolve"){
						this.forward();
					}
				}
			}, 1);
		return "forward";
	}
	/**
	 * Run async await
	 */
	run(f){
		this.pos = "0";
		this.f = f;
		this.forward();
	}
	/**
	 * Call if thread is ended
	 */
	end(){
		this.pos = "-1";
		return "end";
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.AsyncThread";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.AsyncThread";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.f = null;
		this.pos = "0";
		this.res = null;
		this.err = null;
		this.run_stack = null;
		this.catch_stack = null;
	}
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
module.exports = AsyncThread;