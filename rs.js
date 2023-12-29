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
Runtime.rs = function(ctx)
{
};
Object.assign(Runtime.rs.prototype,
{
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
		return this.substr(ctx, s, pos, 1);
	},
	/**
	 * Returns ASCII symbol by code
	 * @param int code
	 */
	chr: function(ctx, code)
	{
		return String.fromCharCode(code);
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ctx, ch)
	{
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	strtolower: function(ctx, s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(ctx, s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	lower: function(ctx, s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	upper: function(ctx, s)
	{
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
	 * @return Collection<string>
	 */
	splitArr: function(ctx, delimiters, s, limit)
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
	join: function(ctx, ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Join
	 */
	join_path: function(ctx, arr)
	{
		var path = this.join(ctx, "/", arr);
		var __v0 = use("Runtime.re");
		path = __v0.replace(ctx, "\\/+", "/", path);
		var __v1 = use("Runtime.re");
		path = __v1.replace(ctx, "\\/\\.\\/", "/", path);
		var __v2 = use("Runtime.re");
		path = __v2.replace(ctx, "\\/+$", "", path);
		return path;
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
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"")
			.replace(new RegExp("[" + ch + "]+$", "g"),"")
		;
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
		var extension = arr1.popValue(ctx);
		var basename = arr2.popValue(ctx);
		var dirname = this.join(ctx, "/", arr2);
		var ext_length = this.strlen(ctx, extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(ctx, basename, 0, -1 * ext_length);
		return use("Runtime.Map").from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename});
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(ctx, filepath)
	{
		var ret = this.pathinfo(ctx, filepath);
		var res = Runtime.rtl.attr(ctx, ret, "basename");
		var ext = Runtime.rtl.attr(ctx, ret, "extension");
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
		var ret = this.pathinfo(ctx, filepath);
		var res = Runtime.rtl.attr(ctx, ret, "basename");
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(ctx, filepath)
	{
		var ret = this.pathinfo(ctx, filepath);
		var res = Runtime.rtl.attr(ctx, ret, "extension");
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(ctx, filepath)
	{
		var ret = this.pathinfo(ctx, filepath);
		var res = Runtime.rtl.attr(ctx, ret, "dirname");
		return res;
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
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	indexOf: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	strpos: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		return this.indexOf(ctx, s, search, offset);
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
	 * Parser url
	 * @param string s The string
	 * @return int
	 */
	parse_url: function(ctx, s)
	{
		var pos;
		var uri;
		var query;
		var hash;
		pos = this.strpos(ctx, s, "#");
		s = (pos >= 0) ? (this.substr(ctx, s, 0, pos)) : (s);
		hash = (pos >= 0) ? (this.substr(ctx, s, pos + 1)) : ("");
		pos = this.strpos(ctx, s, "?");
		uri = (pos >= 0) ? (this.substr(ctx, s, 0, pos)) : (s);
		query = (pos >= 0) ? (this.substr(ctx, s, pos + 1)) : ("");
		var arr = this.explode(ctx, "&", query);
		var arr2 = arr.filter(ctx, (ctx, s) => 
		{
			return s != "";
		}).transition(ctx, (ctx, item) => 
		{
			var arr = this.explode(ctx, "=", item);
			return use("Runtime.Vector").from([Runtime.rtl.attr(ctx, arr, 1),Runtime.rtl.attr(ctx, arr, 0)]);
		});
		return use("Runtime.Map").from({"uri":uri,"query":query,"query_arr":arr2,"hash":hash});
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(ctx, s, key, value)
	{
		var r = this.parse_url(ctx, s);
		var s1 = Runtime.rtl.attr(ctx, r, "uri");
		var s2 = Runtime.rtl.attr(ctx, r, "query");
		var find = false;
		var arr = this.explode(ctx, "&", s2);
		arr = arr.map(ctx, (ctx, s) => 
		{
			var arr = this.explode(ctx, "=", s);
			if (Runtime.rtl.attr(ctx, arr, 0) == key)
			{
				find = true;
				if (value != "")
				{
					return key + use("Runtime.rtl").toStr("=") + use("Runtime.rtl").toStr(this.htmlEscape(ctx, value));
				}
				return "";
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
	/**
	 * Strip tags
	 */
	strip_tags: function(ctx, content, allowed_tags)
	{
		if (allowed_tags == undefined) allowed_tags = null;
		if (allowed_tags == null)
		{
			var __v0 = use("Runtime.re");
			content = __v0.replace(ctx, "<[^>]+>", "", content);
			var __v1 = use("Runtime.rs");
			var __v2 = use("Runtime.rs");
			content = __v1.trim(ctx, __v2.spaceless(ctx, content));
			return content;
		}
		var __v0 = use("Runtime.re");
		var matches = __v0.matchAll(ctx, "<[^>]+>", content, "i");
		if (matches)
		{
			for (var i = 0; i < matches.count(ctx); i++)
			{
				var match = Runtime.rtl.attr(ctx, matches, i);
				var tag_str = Runtime.rtl.attr(ctx, match, 0);
				var __v1 = use("Runtime.re");
				var tag_match = __v1.matchAll(ctx, "<(\\/|)([a-zA-Z]+)(|[^>]*)>", tag_str, "i");
				if (tag_match)
				{
					var tag_name = this.strtolower(ctx, Runtime.rtl.attr(ctx, Runtime.rtl.attr(ctx, tag_match, 0), 2));
					if (allowed_tags.indexOf(ctx, tag_name) == -1)
					{
						content = this.replace(ctx, tag_str, "", content);
					}
				}
			}
		}
		var __v1 = use("Runtime.rs");
		var __v2 = use("Runtime.rs");
		content = __v1.trim(ctx, __v2.spaceless(ctx, content));
		return content;
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
	 * Search 'search' in s.
	 */
	search: function(ctx, s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
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
	 * Hex decode
	 */
	hexdec: function(ctx, s)
	{
		return parseInt(s, 16);
	},
	/**
	 * From rgb
	 */
	rgbToInt: function(ctx, color)
	{
		var ch = this.substr(ctx, color, 0, 1);
		if (ch == "#")
		{
			color = this.substr(ctx, color, 1);
		}
		var r = "";
		var g = "";
		var b = "";
		var sz = this.strlen(ctx, color);
		if (sz == 3)
		{
			var __v0 = use("Runtime.rs");
			r = __v0.substr(ctx, color, 0, 1);
			r += use("Runtime.rtl").toStr(r);
			var __v1 = use("Runtime.rs");
			g = __v1.substr(ctx, color, 1, 1);
			g += use("Runtime.rtl").toStr(g);
			var __v2 = use("Runtime.rs");
			b = __v2.substr(ctx, color, 2, 1);
			b += use("Runtime.rtl").toStr(b);
		}
		else if (sz == 6)
		{
			var __v3 = use("Runtime.rs");
			r = __v3.substr(ctx, color, 0, 2);
			var __v4 = use("Runtime.rs");
			g = __v4.substr(ctx, color, 2, 2);
			var __v5 = use("Runtime.rs");
			b = __v5.substr(ctx, color, 4, 2);
		}
		r = this.hexdec(ctx, r);
		g = this.hexdec(ctx, g);
		b = this.hexdec(ctx, b);
		return use("Runtime.Vector").from([r,g,b]);
	},
	/**
	 * From rgb
	 */
	intToRgb: function(ctx, r, g, b)
	{
		r = r.toString(16).padStart(2, '0');
		g = g.toString(16).padStart(2, '0');
		b = b.toString(16).padStart(2, '0');
		
		return r + g + b;
	},
	/**
	 * Brightness
	 */
	brightness: function(ctx, color, percent)
	{
		var color = this.rgbToInt(ctx, color);
		var r = Runtime.rtl.attr(ctx, color, 0);
		var g = Runtime.rtl.attr(ctx, color, 1);
		var b = Runtime.rtl.attr(ctx, color, 2);
		var __v0 = use("Runtime.math");
		r = __v0.round(ctx, r + r * percent / 100);
		var __v1 = use("Runtime.math");
		g = __v1.round(ctx, g + g * percent / 100);
		var __v2 = use("Runtime.math");
		b = __v2.round(ctx, b + b * percent / 100);
		if (r > 255)
		{
			r = 255;
		}
		if (g > 255)
		{
			g = 255;
		}
		if (b > 255)
		{
			b = 255;
		}
		if (r < 0)
		{
			r = 0;
		}
		if (g < 0)
		{
			g = 0;
		}
		if (b < 0)
		{
			b = 0;
		}
		return "#" + use("Runtime.rtl").toStr(this.intToRgb(ctx, r, g, b));
	},
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	hash: function(ctx, s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rs.hash", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		var h = 0;
		for (var i = 0; i < sz; i++)
		{
			var __v1 = use("Runtime.rs");
			var __v2 = use("Runtime.rs");
			var c = __v1.ord(ctx, __v2.substr(ctx, s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			var __v1 = use("Runtime.rs");
			r += use("Runtime.rtl").toStr(__v1.substr(ctx, a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		use("Runtime.rtl")._memorizeSave("Runtime.rs.hash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns css hash
	 */
	getCssHash: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.rs.getCssHash", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.Monad");
		var __v2 = use("Runtime.rtl");
		var __v1 = new __v0(ctx, __v2.getParents(ctx, class_name));
		__v1 = __v1.callMethod(ctx, "filter", [(ctx, class_name) => 
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Web.Component";
		}]);
		__v1 = __v1.callMethod(ctx, "map", [(ctx, class_name) => 
		{
			return "h-" + use("Runtime.rtl").toStr(this.hash(ctx, class_name));
		}]);
		var __v3 = use("Runtime.lib");
		__v1 = __v1.call(ctx, __v3.join(ctx, " "));
		var __memorize_value = __v1.value(ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.rs.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Escape html
	 */
	_escape_html: function(ctx, s)
	{
		var __v0 = use("Runtime.rtl");
		if (__v0.isString(ctx, s))
		{
			var __v1 = use("Runtime.rs");
			return __v1.escapeHtml(ctx, s);
		}
		var __v0 = use("Runtime.Collection");
		if (s instanceof __v0)
		{
			var __v1 = use("Runtime.rs");
			return __v1.join(ctx, "", s);
		}
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rtl");
		return __v0.escapeHtml(ctx, __v1.toString(ctx, s));
	},
	/**
	 * To html
	 */
	_to_html: function(ctx, s)
	{
		return s;
	},
	/**
	 * Concat attr
	 */
	_concat_attrs: function(ctx, arr1, arr2)
	{
		var __v0 = use("Runtime.rtl");
		if (__v0.isString(ctx, arr2))
		{
			arr2 = use("Runtime.Vector").from([arr2]);
		}
		return (arr1 != null) ? (arr1.concat(ctx, arr2)) : (arr2);
	},
	/**
	 * Merge attrs
	 */
	_merge_attrs: function(ctx, res, attr2)
	{
		var __v0 = use("Runtime.rtl");
		if (!__v0.exists(ctx, attr2))
		{
			return res;
		}
		return Object.assign(res, attr2.toObject());
		return res;
	},
	/**
	 * Join attrs to string
	 */
	_join_attrs: function(ctx, attrs)
	{
		var __v0 = use("Runtime.rtl");
		var __v1 = use("Runtime.rs");
		return (__v0.exists(ctx, attrs)) ? (__v1.join(ctx, " ", attrs.map(ctx, (ctx, k, v) => 
		{
			return k + use("Runtime.rtl").toStr("= '") + use("Runtime.rtl").toStr(this._escape_attr(ctx, v)) + use("Runtime.rtl").toStr("'");
		}))) : ("");
	},
	/**
	 * Escape attr
	 */
	_escape_attr: function(ctx, s)
	{
		var __v0 = use("Runtime.Dict");
		if (s instanceof __v0)
		{
			s = s.reduce(ctx, (ctx, s, val, key) => 
			{
				return s + use("Runtime.rtl").toStr(key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(val) + use("Runtime.rtl").toStr(";");
			}, "");
		}
		var __v0 = use("Runtime.rs");
		return __v0.escapeHtml(ctx, s);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		return use("Runtime.Vector").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Vector = use("Runtime.Vector");
		var Map = use("Runtime.Map");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
		];
		return use("Runtime.Vector").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.rs);
module.exports = Runtime.rs;