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
Runtime.rs = function()
{
};
Object.assign(Runtime.rs.prototype,
{
	getClassName: function()
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
	strlen: function(s)
	{
		return use("Runtime.rtl").toStr(s).length;
	},
	/**
	 * Search 'search' in s.
	 */
	search: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * Is start
	 */
	start: function(s, search)
	{
		return this.search(s, search) == 0;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(s, start, length)
	{
		if (length == undefined) length = null;
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
	charAt: function(s, pos)
	{
		var sz = this.strlen(s);
		if (pos >= 0 && pos < sz)
		{
			return this.substr(s, pos, 1);
		}
		return "";
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ch)
	{
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s 
	 * @return string
	 */
	strtolower: function(s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(search, item, s)
	{
		return s.replace(new RegExp(search, "g"), item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(s, n)
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
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
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
	splitArr: function(delimiters, s, limit)
	{
		if (limit == undefined) limit = -1;
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
	join: function(ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(s, ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
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
	json_encode_primitive: function(s, flags)
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
	json_encode: function(data)
	{
		var __v0 = Runtime.rtl;
		var f = __v0.method("Runtime.RuntimeUtils", "json_encode");
		return f(data);
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var
	 */
	json_decode: function(obj)
	{
		var __v0 = Runtime.rtl;
		var f = __v0.method("Runtime.RuntimeUtils", "json_decode");
		return f(obj);
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(s)
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
	escapeHtml: function(s)
	{
		return this.htmlEscape(s);
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
	pathinfo: function(filepath)
	{
		var arr1 = this.explode(".", filepath).toVector();
		var arr2 = this.explode("/", filepath).toVector();
		var filepath = filepath;
		var extension = arr1.popValue();
		var basename = arr2.popValue();
		var dirname = this.join("/", arr2);
		var ext_length = this.strlen(extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(basename, 0, -1 * ext_length);
		return Runtime.Dict.from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename});
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "basename");
		var ext = Runtime.rtl.get(ret, "extension");
		if (ext != "")
		{
			var __v0 = Runtime.rs;
			var sz = 0 - __v0.strlen(ext) - 1;
			var __v1 = Runtime.rs;
			res = __v1.substr(res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "basename");
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "extension");
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "dirname");
		return res;
	},
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	relativePath: function(filepath, basepath, ch)
	{
		if (ch == undefined) ch = "/";
		var __v0 = Runtime.rs;
		var source = __v0.explode(ch, filepath);
		var __v1 = Runtime.rs;
		var base = __v1.explode(ch, basepath);
		source = source.filter((s) => 
		{
			return s != "";
		});
		base = base.filter((s) => 
		{
			return s != "";
		});
		var i = 0;
		while (source.count() > 0 && base.count() > 0 && source.item(0) == base.item(0))
		{
			source.shift();
			base.shift();
		}
		base.each((s) => 
		{
			source.unshift("..");
		});
		var __v2 = Runtime.rs;
		return __v2.implode(ch, source);
	},
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	normalize: function(filepath)
	{
		return filepath;
	},
	/**
	 * New line to br
	 */
	nl2br: function(s)
	{
		return this.replace("\n", "<br/>", s);
	},
	/**
	 * Remove spaces
	 */
	spaceless: function(s)
	{
		var __v0 = Runtime.re;
		s = __v0.replace(" +", " ", s);
		var __v1 = Runtime.re;
		s = __v1.replace("\t", "", s);
		var __v2 = Runtime.re;
		s = __v2.replace("\n", "", s);
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
	explode: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
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
	implode: function(ch, arr)
	{
		return arr.join(ch);
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
	strpos: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
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
	url_encode: function(s)
	{
		return encodeURIComponent(s);
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode: function(s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode: function(s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode_url: function(s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode_url: function(s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(s, key, value)
	{
		var pos = this.strpos(s, "?");
		var s1 = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		var s2 = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		var find = false;
		var arr = this.explode("&", s2);
		arr = arr.map((s) => 
		{
			var arr = this.explode("=", s);
			if (Runtime.rtl.get(arr, 0) == key)
			{
				find = true;
				return key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value));
			}
			return s;
		}).filter((s) => 
		{
			return s != "";
		});
		if (!find && value != "")
		{
			arr = arr.appendIm(key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value)));
		}
		s = s1;
		s2 = this.join("&", arr);
		if (s2 != "")
		{
			s = s + Runtime.rtl.toStr("?") + Runtime.rtl.toStr(s2);
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
});use.add(Runtime.rs);
module.exports = Runtime.rs;