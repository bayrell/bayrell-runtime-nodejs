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
var PathInfo = require('./PathInfo.js');
var Vector = require('./Vector.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
class rs{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	
	static strlen(s){
		if (isBrowser())
			return Runtime.rtl.toString(s).length;
		return rtl.toString(s).length;
	}
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	
	static substr(s, start, length){
		var _rtl = null; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _rs = null; if (isBrowser()) _rs = Runtime.rs; else _rs = rs;
		var end = start + length;
		if (length == undefined){
			return _rtl.toString(s).substring(start);
		}
		if (length < 0){
			var sz = _rs.strlen(s);
			end = sz + length;
		}
		return _rtl.toString(s).substring(start, end);
	}
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	static charAt(s, pos){
		var sz = this.strlen(s);
		if (pos >= 0 && pos < sz){
			return s[pos];
		}
		return "";
	}
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	
	static ord(s){
		if (isBrowser())
			return Runtime.rtl.toString(s).charCodeAt(0);
		return rtl.toString(s).charCodeAt(0);
	}
	/**
	 * Convert string to lower case
	 * @param string s 
	 * @return string
	 */
	
	static strtolower(s){
		if (isBrowser())
			return Runtime.rtl.toString(s).toLowerCase();
		return rtl.toString(s).toLowerCase();
	}
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	
	static strtoupper(s){
		if (isBrowser())
			return Runtime.rtl.toString(s).toUpperCase();
		return rtl.toString(s).toUpperCase();
	}
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	
	static strpos(s, search, offset){
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toString(s).indexOf(search);
		return res;
	}
	/**
	 * Заменяет одну строку на другую
	 */
	
	static replace(search, item, s){
		return s.replace(search, item);
	}
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	
	static str_repeat(s, n){
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	}
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	
	static split(delimiters, s, limit)
	{
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Vector; if (isBrowser()) _Vector = Runtime.Vector; else _Vector = Vector;
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
		return (new _Vector()).concat(arr);
	}
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	
	static explode(delimiter, s, limit){
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Vector; if (isBrowser()) _Vector = Runtime.Vector; else _Vector = Vector;
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return (new _Vector()).concat(arr);
	}
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	
	static implode(ch, arr){
		return arr.join(ch);
	}
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	
	static trim(s, ch){
		if (ch == undefined) ch = "";
		if (isBrowser()) s = Runtime.rtl.toString(s);
		else s = rtl.toString(s);
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"").replace(new RegExp("[" + ch + "]+$", "g"),"");
	}
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	
	static json_encode(obj, flags = 0){
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	}
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	
	static htmlEscape(s){
		if (s instanceof Runtime.Collection) return s;
		if (s instanceof Runtime.UIStruct) return s;
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
	}
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	static pathinfo(filepath){
		var arr1 = rs.explode(".", filepath);
		var arr2 = rs.explode("/", filepath);
		var ret = new PathInfo();
		ret.filepath = filepath;
		ret.extension = arr1.pop();
		ret.basename = arr2.pop();
		ret.dirname = rs.implode("/", arr2);
		var ext_length = rs.strlen(ret.extension);
		if (ext_length > 0){
			ext_length++;
		}
		ret.filename = rs.substr(ret.basename, 0, -1 * ext_length);
		return ret;
	}
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static filename(filepath){
		var ret = rs.pathinfo(filepath);
		var res = ret.basename;
		var ext = ret.extension;
		if (ext != ""){
			var sz = 0 - rs.strlen(ext) - 1;
			res = rs.substr(res, 0, sz);
		}
		return res;
	}
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static basename(filepath){
		var ret = rs.pathinfo(filepath);
		var res = ret.basename;
		return res;
	}
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	static extname(filepath){
		var ret = rs.pathinfo(filepath);
		var res = ret.extension;
		return res;
	}
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	static dirname(filepath){
		var ret = rs.pathinfo(filepath);
		var res = ret.dirname;
		return res;
	}
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	static relativePath(filepath, basepath, ch){
		if (ch == undefined) ch="/";
		var source = rs.explode(ch, filepath);
		var base = rs.explode(ch, basepath);
		source = source.filter((s) => {
			return s != "";
		});
		base = base.filter((s) => {
			return s != "";
		});
		var i = 0;
		while (source.count() > 0 && base.count() > 0 && source.item(0) == base.item(0)){
			source.shift();
			base.shift();
		}
		base.each((s) => {
			source.unshift("..");
		});
		return rs.implode(ch, source);
	}
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	static normalize(filepath){
		return filepath;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.rs";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.rs";}
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
module.exports = rs;