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
Runtime.rs = function(ctx)
{
};
Object.assign(Runtime.rs.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.rs"))
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
		return "Runtime.rs";
	},
});
Object.assign(Runtime.rs,
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	strlen: function(ctx, s)
	{
		return use("Runtime.rtl").toStr(s).length;
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(s).length;
		return rtl.toStr(s).length;
		*/
	},
	/**
	 * Search 'search' in s.
	 */
	search: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		/*
		if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		if (!_rtl.exists(offset)) offset = 0;
		*/
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * Is start
	 */
	start: function(ctx, s, search)
	{
		return this.search(ctx, s, search) == 0;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(ctx, s, start, length)
	{
		if (length == undefined) length = null;
		/*
		var _rtl = null; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _rs = null; if (isBrowser()) _rs = Runtime.rs; else _rs = rs;
		*/
		var _rtl = use("Runtime.rtl");
		var _rs = use("Runtime.rs");
		if (start < 0) start = s.length + start;
		if (length === null){
			return _rtl.toStr(s).substring(start);
		}
		var end = start + length;
		if (length < 0){
			var sz = _rs.strlen(s);
			end = sz + length;
		}
		return _rtl.toStr(s).substring(start, end);
	},
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	charAt: function(ctx, s, pos)
	{
		var sz = this.strlen(ctx, s);
		if (pos >= 0 && pos < sz)
		{
			return this.substr(ctx, s, pos, 1);
		}
		return "";
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ctx, ch)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(ch).charCodeAt(0);
		return rtl.toStr(ch).charCodeAt(0);
		*/
		
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s 
	 * @return string
	 */
	strtolower: function(ctx, s)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(s).toLowerCase();
		return rtl.toStr(s).toLowerCase();
		*/
		
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(ctx, s)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toStr(s).toUpperCase();
		return rtl.toStr(s).toUpperCase();
		*/
		
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(ctx, search, item, s)
	{
		return s.replace(new RegExp(search, "g"), item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(ctx, s, n)
	{
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	split: function(ctx, delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp(delimiter, "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	splitArr: function(ctx, delimiters, s, limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp("[" + delimiters.join("") + "]", "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
	},
	/**
	 * Соединяет строки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	join: function(ctx, ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(ctx, s, ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
		/*
		if (isBrowser()) s = Runtime.rtl.toStr(s);
		else s = rtl.toStr(s);
		*/
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"").replace(new RegExp("[" + ch + "]+$", "g"),"");
	},
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	json_encode_primitive: function(ctx, s, flags)
	{
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	},
	/**
	 * Json encode data
	 * @param var data
	 * @return string
	 */
	json_encode: function(ctx, data)
	{
		var __v0 = use("Runtime.rtl");
		var f = __v0.method(ctx, "Runtime.RuntimeUtils", "json_encode");
		return f(ctx, data);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var
	 */
	json_decode: function(ctx, obj)
	{
		var __v0 = use("Runtime.rtl");
		var f = __v0.method(ctx, "Runtime.RuntimeUtils", "json_decode");
		return f(ctx, obj);
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(ctx, s)
	{
		if (s instanceof Runtime.Collection) return s;
		var obj = {
			"<":"&lt;",
			">": "&gt;", 
			"&": "&amp;",
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};
		return (new String(s)).replace(/[<>&"'`=]/g, function(v){ return obj[v]; });
	},
	escapeHtml: function(ctx, s)
	{
		return this.htmlEscape(ctx, s);
	},
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	pathinfo: function(ctx, filepath)
	{
		var arr1 = this.explode(ctx, ".", filepath).toVector(ctx);
		var arr2 = this.explode(ctx, "/", filepath).toVector(ctx);
		var filepath = filepath;
		var extension = arr1.pop(ctx);
		var basename = arr2.pop(ctx);
		var dirname = this.join(ctx, "/", arr2);
		var ext_length = this.strlen(ctx, extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(ctx, basename, 0, -1 * ext_length);
		var __v0 = use("Runtime.PathInfo");
		return new __v0(ctx, use("Runtime.Dict").from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename}));
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.basename;
		var ext = ret.extension;
		if (ext != "")
		{
			var __v0 = use("Runtime.rs");
			var sz = 0 - __v0.strlen(ctx, ext) - 1;
			var __v1 = use("Runtime.rs");
			res = __v1.substr(ctx, res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.basename;
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.extension;
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(ctx, filepath)
	{
		var ret = Runtime.rs.pathinfo(ctx, filepath);
		var res = ret.dirname;
		return res;
	},
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	relativePath: function(ctx, filepath, basepath, ch)
	{
		if (ch == undefined) ch = "/";
		var __v0 = use("Runtime.rs");
		var source = __v0.explode(ctx, ch, filepath);
		var __v1 = use("Runtime.rs");
		var base = __v1.explode(ctx, ch, basepath);
		source = source.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		base = base.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		var i = 0;
		while (source.count(ctx) > 0 && base.count(ctx) > 0 && source.item(ctx, 0) == base.item(ctx, 0))
		{
			source.shift(ctx);
			base.shift(ctx);
		}
		base.each(ctx, (ctx, s) => 
		{
			source.unshift(ctx, "..");
		});
		var __v2 = use("Runtime.rs");
		return __v2.implode(ctx, ch, source);
	},
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	normalize: function(ctx, filepath)
	{
		return filepath;
	},
	/**
	 * New line to br
	 */
	nl2br: function(ctx, s)
	{
		return this.replace(ctx, "\n", "<br/>", s);
	},
	/**
	 * Remove spaces
	 */
	spaceless: function(ctx, s)
	{
		var __v0 = use("Runtime.re");
		s = __v0.replace(ctx, " +", " ", s);
		var __v1 = use("Runtime.re");
		s = __v1.replace(ctx, "\t", "", s);
		var __v2 = use("Runtime.re");
		s = __v2.replace(ctx, "\n", "", s);
		return s;
	},
	/* =================== Deprecated =================== */
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	explode: function(ctx, delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	implode: function(ctx, ch, arr)
	{
		return arr.join(ctx, ch);
	},
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	strpos: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		/*var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;*/
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * URL encode
	 * @param string s
	 * @return string
	 */
	url_encode: function(ctx, s)
	{
		return encodeURIComponent(s);
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode: function(ctx, s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode: function(ctx, s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode_url: function(ctx, s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode_url: function(ctx, s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(ctx, s, key, value)
	{
		var pos = this.strpos(ctx, s, "?");
		var s1 = this.substr(ctx, s, 0, pos);
		var s2 = (pos >= 0) ? (this.substr(ctx, s, pos + 1)) : ("");
		var find = false;
		var arr = this.explode(ctx, "&", s2);
		arr = arr.map(ctx, (ctx, s) => 
		{
			var arr = this.explode(ctx, "=", s);
			if (value == "")
			{
				return "";
			}
			if (Runtime.rtl.get(ctx, arr, 0) == key)
			{
				find = true;
				return key + use("Runtime.rtl").toStr("=") + use("Runtime.rtl").toStr(this.htmlEscape(ctx, value));
			}
			return s;
		}).filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (!find && value != "")
		{
			arr = arr.appendIm(ctx, key + use("Runtime.rtl").toStr("=") + use("Runtime.rtl").toStr(this.htmlEscape(ctx, value)));
		}
		s = s1;
		s2 = this.join(ctx, "&", arr);
		if (s2 != "")
		{
			s = s + use("Runtime.rtl").toStr("?") + use("Runtime.rtl").toStr(s2);
		}
		return s;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.rs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.rs",
			"name": "Runtime.rs",
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.rs);
module.exports = Runtime.rs;