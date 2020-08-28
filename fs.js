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
Runtime.fs = function(ctx)
{
};
Object.assign(Runtime.fs.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.fs"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
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
	addFirstSlash: function(ctx, s)
	{
		var __v0 = use("Runtime.re");
		return __v0.replace(ctx, "//", "/", this.DIRECTORY_SEPARATOR + use("Runtime.rtl").toStr(s));
	},
	/**
	 * Add last slash
	 */
	addLastSlash: function(ctx, s)
	{
		var __v0 = use("Runtime.re");
		return __v0.replace(ctx, "//", "/", s + use("Runtime.rtl").toStr(this.DIRECTORY_SEPARATOR));
	},
	/**
	 * Concat
	 */
	concat: function(ctx, base_path, file_name)
	{
		var __v0 = use("Runtime.re");
		return __v0.replace(ctx, "//", "/", base_path + use("Runtime.rtl").toStr("/") + use("Runtime.rtl").toStr(file_name));
	},
	/**
	 * Concat array
	 */
	concatArr: function(ctx, arr)
	{
		var res = arr.reduce(ctx, (ctx, res, item) => 
		{
			return res + use("Runtime.rtl").toStr(this.DIRECTORY_SEPARATOR) + use("Runtime.rtl").toStr(item);
		}, "");
		var __v0 = use("Runtime.re");
		return __v0.replace(ctx, "//", "/", res);
	},
	/**
	 * Relative
	 */
	relative: function(ctx, path, to)
	{
		var mpath = require("path");
		return mpath.relative(path, to);
		return "";
	},
	/**
	 * Exists
	 */
	exists: async function(ctx, path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var filepath = chroot + use("Runtime.rtl").toStr(path);
		var res = await fileExists(filepath);
		return Promise.resolve( res );
		return Promise.resolve(false);
	},
	/**
	 * Save local file
	 */
	saveFile: async function(ctx, path, content, ch, chroot)
	{
		if (content == undefined) content = "";
		if (ch == undefined) ch = "utf8";
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var filepath = chroot + use("Runtime.rtl").toStr(path);
		await writeFile( resolve(filepath), content, { "encoding": ch } );
		return Promise.resolve("");
	},
	/**
	 * Read local file
	 */
	readFile: async function(ctx, path, ch, chroot)
	{
		if (ch == undefined) ch = "utf8";
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var filepath = chroot + use("Runtime.rtl").toStr(path);
		var content = await readFile( resolve(filepath), { "encoding": ch } );
		return Promise.resolve( content );
		return Promise.resolve("");
	},
	/**
	 * Make dir
	 */
	mkdir: async function(ctx, path, chroot, mode)
	{
		if (chroot == undefined) chroot = "";
		if (mode == undefined) mode = "0755";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var filepath = chroot + use("Runtime.rtl").toStr(path);
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
	symlink: async function(ctx, target, link_name, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var target_path = target;
		var link_name_path = link_name;
		var __v0 = use("Runtime.rs");
		if (__v0.substr(ctx, target_path, 0, 2) != "..")
		{
			target_path = chroot + use("Runtime.rtl").toStr(target);
		}
		var __v0 = use("Runtime.rs");
		if (__v0.substr(ctx, link_name_path, 0, 2) != "..")
		{
			link_name_path = chroot + use("Runtime.rtl").toStr(link_name);
		}
		if (target_path.substr(0, 2) != "..") target_path = resolve(target_path);
		if (link_name_path.substr(0, 2) != "..") link_name_path = resolve(link_name_path);
		await symlink(target_path, link_name_path);
		return Promise.resolve("");
	},
	/**
	 * Unlink
	 */
	unlink: async function(ctx, path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var filepath = chroot + use("Runtime.rtl").toStr(path);
		filepath = resolve(filepath);
		var exists = await fileExists(filepath);
		if (exists)
		{
			await unlink(filepath);
		}
		return Promise.resolve("");
	},
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean
	 */
	isDir: async function(ctx, path, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var dirpath = chroot + use("Runtime.rtl").toStr(path);
		dirpath = resolve(dirpath);
		var stat = await lstat(dirpath);
		return Promise.resolve( stat.isDirectory() );
	},
	/**
	 * Scan directory
	 */
	readDir: async function(ctx, dirname, chroot)
	{
		if (chroot == undefined) chroot = "";
		var __v0 = use("Runtime.rs");
		if (chroot != "" && __v0.substr(ctx, chroot, -1) != "/")
		{
			chroot += use("Runtime.rtl").toStr("/");
		}
		var dirpath = chroot + use("Runtime.rtl").toStr(dirname);
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
	readDirectoryRecursive: async function(ctx, dirname, chroot, parent_name)
	{
		if (chroot == undefined) chroot = "";
		if (parent_name == undefined) parent_name = "";
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		var items = await this.readDir(ctx, dirname, chroot);
		for (var i = 0;i < items.count(ctx);i++)
		{
			var item_name = items.item(ctx, i);
			var item_path = this.concat(ctx, dirname, item_name);
			var __v1 = use("Runtime.fs");
			var item_name2 = __v1.concat(ctx, parent_name, item_name);
			if (item_name == "." || item_name == "..")
			{
				continue;
			}
			res.push(ctx, item_name2);
			var is_dir = await this.isDir(ctx, item_path, chroot);
			if (is_dir)
			{
				var sub_items = await this.readDirectoryRecursive(ctx, item_path, chroot, item_name2);
				res.appendVector(ctx, sub_items);
			}
		}
		return Promise.resolve(res.toCollection(ctx));
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.fs",
			"name": "Runtime.fs",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "DIRECTORY_SEPARATOR") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.fs",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
			"exists",
			"saveFile",
			"readFile",
			"mkdir",
			"symlink",
			"unlink",
			"isDir",
			"readDir",
			"readDirectoryRecursive",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.fs);
module.exports = Runtime.fs;