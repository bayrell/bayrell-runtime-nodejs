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
Runtime.fs = function()
{
};
Object.assign(Runtime.fs.prototype,
{
	getClassName: function()
	{
		return "Runtime.fs";
	},
});
Object.assign(Runtime.fs,
{
	DIRECTORY_SEPARATOR: "/",
	/**
	 * Add first slash
	 */
	addFirstSlash: function(s)
	{
		var __v0 = Runtime.re;
		return __v0.replace("//", "/", this.DIRECTORY_SEPARATOR + Runtime.rtl.toStr(s));
	},
	/**
	 * Add last slash
	 */
	addLastSlash: function(s)
	{
		var __v0 = Runtime.re;
		return __v0.replace("//", "/", s + Runtime.rtl.toStr(this.DIRECTORY_SEPARATOR));
	},
	/**
	 * Concat
	 */
	concat: function()
	{
		var arr = Runtime.Collection.from([]);
		var Collection = use("Runtime.Collection");
		for (var i=1; i<arguments.length; i++) arr.push( arguments[i] );
		arr = Collection.from(arr);
		return this.concatArr(arr);
	},
	/**
	 * Concat array
	 */
	concatArr: function(arr)
	{
		var res = arr.reduce((res, item) => 
		{
			return res + Runtime.rtl.toStr(this.DIRECTORY_SEPARATOR) + Runtime.rtl.toStr(item);
		}, "");
		var __v0 = Runtime.re;
		return __v0.replace("\\/\\/", "/", res);
	},
	/**
	 * Relative
	 */
	relative: function(path, to)
	{
		var mpath = require("path");
		return mpath.relative(path, to);
		return "";
	},
	/**
	 * Exists
	 */
	exists: async function(path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var filepath = chroot + Runtime.rtl.toStr(path);
		var res = await fileExists(filepath);
		return Promise.resolve( res );
		return Promise.resolve(false);
	},
	/**
	 * Save local file
	 */
	saveFile: async function(path, content, chroot, ch)
	{
		if (content == undefined) content = "";
		if (chroot == undefined) chroot = "";
		if (ch == undefined) ch = "utf8";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var filepath = chroot + Runtime.rtl.toStr(path);
		await writeFile( resolve(filepath), content, { "encoding": ch } );
		return Promise.resolve("");
	},
	/**
	 * Read local file
	 */
	readFile: async function(path, chroot, ch)
	{
		if (chroot == undefined) chroot = "";
		if (ch == undefined) ch = "utf8";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var filepath = chroot + Runtime.rtl.toStr(path);
		var content = await readFile( resolve(filepath), { "encoding": ch } );
		return Promise.resolve( content );
		return Promise.resolve("");
	},
	/**
	 * Rename file
	 */
	renameFile: async function(path, new_path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var filepath = chroot + Runtime.rtl.toStr(path);
		var filepath_new = chroot + Runtime.rtl.toStr(new_path);
		return Promise.resolve("");
	},
	/**
	 * Make dir
	 */
	mkdir: async function(path, chroot, mode)
	{
		if (chroot == undefined) chroot = "";
		if (mode == undefined) mode = "755";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var filepath = chroot + Runtime.rtl.toStr(path);
		filepath = resolve(filepath);
		var exists = await fileExists(filepath);
		if (!exists)
		{
			await mkdir(filepath, { "mode": mode, "recursive": true });
		}
		return Promise.resolve("");
	},
	/**
	 * Synlink
	 */
	symlink: async function(target, link_name, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var target_path = target;
		var link_name_path = link_name;
		var __v0 = Runtime.rs;
		if (__v0.substr(target_path, 0, 2) != "..")
		{
			target_path = chroot + Runtime.rtl.toStr(target);
		}
		var __v0 = Runtime.rs;
		if (__v0.substr(link_name_path, 0, 2) != "..")
		{
			link_name_path = chroot + Runtime.rtl.toStr(link_name);
		}
		if (target_path.substr(0, 2) != "..") target_path = resolve(target_path);
		if (link_name_path.substr(0, 2) != "..") link_name_path = resolve(link_name_path);
		await symlink(target_path, link_name_path);
		return Promise.resolve("");
	},
	/**
	 * Remove
	 */
	remove: async function(path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var filepath = chroot + Runtime.rtl.toStr(path);
		filepath = resolve(filepath);
		var exists = await fileExists(filepath);
		if (exists)
		{
			await unlink(filepath);
		}
		return Promise.resolve("");
	},
	unlink: async function(path, chroot)
	{
		if (chroot == undefined) chroot = "";
		return this.remove(path, chroot);
	},
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean
	 */
	isDir: async function(path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var dirpath = chroot + Runtime.rtl.toStr(path);
		dirpath = resolve(dirpath);
		var stat = await lstat(dirpath);
		return Promise.resolve( stat.isDirectory() );
	},
	/**
	 * Scan directory
	 */
	readDir: async function(dirname, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = Runtime.rs;
		if (chroot != "" && __v0.substr(chroot, -1) != "/")
		{
			chroot += Runtime.rtl.toStr("/");
		}
		var dirpath = chroot + Runtime.rtl.toStr(dirname);
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
	readDirectoryRecursive: async function(dirname, chroot, parent_name)
	{
		if (chroot == undefined) chroot = "";
		if (parent_name == undefined) parent_name = "";
		var __v0 = Runtime.Vector;
		var res = new __v0();
		var items = await this.readDir(dirname, chroot);
		for (var i = 0;i < items.count();i++)
		{
			var item_name = items.item(i);
			var item_path = this.concat(dirname, item_name);
			var __v1 = Runtime.fs;
			var item_name2 = __v1.concat(parent_name, item_name);
			if (item_name == "." || item_name == "..")
			{
				continue;
			}
			res.push(item_name2);
			var is_dir = await this.isDir(item_path, chroot);
			if (is_dir)
			{
				var sub_items = await this.readDirectoryRecursive(item_path, chroot, item_name2);
				res.appendVector(sub_items);
			}
		}
		return Promise.resolve(res.toCollection());
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.fs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "DIRECTORY_SEPARATOR") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Runtime.fs);
module.exports = Runtime.fs;