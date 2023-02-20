"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');

const fileExists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const symlink = promisify(fs.symlink);
const unlink = promisify(fs.unlink);
const lstat = promisify(fs.lstat);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
Runtime.fs = function(ctx)
{
};
Object.assign(Runtime.fs.prototype,
{
});
Object.assign(Runtime.fs,
{
	DIRECTORY_SEPARATOR: "/",
	removeFirstSlash: function(ctx, path)
	{
		var __v0 = use("Runtime.re");
		return __v0.replace(ctx, "^/+", "", path);
	},
	removeLastSlash: function(ctx, path)
	{
		var __v0 = use("Runtime.re");
		return __v0.replace(ctx, "/+$", "", path);
	},
	/**
	 * Join
	 */
	join: function(ctx, arr)
	{
		var __v0 = use("Runtime.rs");
		var path = __v0.join(ctx, this.DIRECTORY_SEPARATOR, arr);
		var __v1 = use("Runtime.re");
		path = __v1.replace(ctx, "\\/+", "/", path);
		var __v2 = use("Runtime.re");
		path = __v2.replace(ctx, "\\/\\.\\/", "/", path);
		var __v3 = use("Runtime.re");
		path = __v3.replace(ctx, "\\/+$", "", path);
		return path;
	},
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean
	 */
	isDir: async function(ctx, dirpath)
	{
		var is_exists = await fileExists(dirpath);
		if (!is_exists) return Promise.resolve( false );
		
		dirpath = resolve(dirpath);
		var stat = await lstat(dirpath);
		return Promise.resolve( stat.isDirectory() );
	},
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean
	 */
	isFile: async function(ctx, filepath)
	{
		var is_exists = await fileExists(filepath);
		if (!is_exists) return Promise.resolve( false );
		
		filepath = resolve(filepath);
		var stat = await lstat(filepath);
		return Promise.resolve( stat.isFile() );
	},
	/**
	 * Read local file
	 */
	readFile: async function(ctx, filepath, ch)
	{
		if (ch == undefined) ch = "utf8";
		var content = await readFile( resolve(filepath), { "encoding": ch } );
		return Promise.resolve( content );
		return Promise.resolve("");
	},
	/**
	 * Save local file
	 */
	saveFile: async function(ctx, filepath, content, ch)
	{
		if (content == undefined) content = "";
		if (ch == undefined) ch = "utf8";
		await writeFile( resolve(filepath), content, { "encoding": ch } );
		return Promise.resolve("");
	},
	/**
	 * Scan directory
	 */
	listDir: async function(ctx, dirpath)
	{
		dirpath = resolve(dirpath);
		var Collection = use("Runtime.Collection");
		var arr = await readdir(dirpath);
		arr = arr.filter( (s) => s != "." && s != ".." ).sort();
		arr = Collection.from(arr);
		return Promise.resolve(arr);
		return Promise.resolve(null);
	},
	/**
	 * Scan directory recursive
	 */
	listDirRecursive: async function(ctx, dirpath, parent_name)
	{
		if (parent_name == undefined) parent_name = "";
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		var items = await this.listDir(ctx, dirpath);
		for (var i = 0;i < items.count(ctx);i++)
		{
			var item_name = items.item(ctx, i);
			var item_path = this.join(ctx, use("Runtime.Collection").from([dirpath,item_name]));
			var item_name2 = this.join(ctx, use("Runtime.Collection").from([parent_name,item_name]));
			if (item_name == "." || item_name == "..")
			{
				continue;
			}
			item_name2 = this.removeFirstSlash(ctx, item_name2);
			res.pushValue(ctx, item_name2);
			var is_dir = await this.isDir(ctx, item_path);
			if (is_dir)
			{
				var sub_items = await this.listDirRecursive(ctx, item_path, item_name2);
				res.appendVector(ctx, sub_items);
			}
		}
		return Promise.resolve(res.toCollection(ctx));
	},
	/**
	 * Make dir recursive
	 */
	mkdir: async function(ctx, filepath, mode)
	{
		if (mode == undefined) mode = "755";
		filepath = resolve(filepath);
		var exists = await fileExists(filepath);
		if (!exists)
		{
			await mkdir(filepath, { "mode": mode, "recursive": true });
		}
		return Promise.resolve("");
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.fs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"removeFirstSlash",
			"removeLastSlash",
			"join",
			"isDir",
			"isFile",
			"readFile",
			"saveFile",
			"listDir",
			"listDirRecursive",
			"mkdir",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.fs);
module.exports = Runtime.fs;