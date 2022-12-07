'use strict';

/**
 *  数据加载动态圈风格
 * @param property 参数对象
 *  property 参数对象详细属性设置↓
 * content 加载提示内容
 * shadowColor 背景阴影颜色-建议使用带透明的颜色
 * loadingBoxColor  加载背景色
 * loadingPointColor  转圈点颜色
 * loadingContentColor  加载提示内容字体颜色
 */
  function initDiyLoading(property) {
	//动态添加动画样式
  property = property || {};
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.setAttribute("type","text/css");
	style.innerHTML = 'body .loading-box-shadow-omg{width:-webkit-fill-available;height:-webkit-fill-available;background-color:#211f1f5c;position:absolute;top:0;z-index:99999999999}body .loading-box-shadow-omg .loading-box{background-color:white;border-radius:5px;position:absolute;top:50%;left:50%;width:200px;height:150px;margin-left:-100px;margin-top: -75px;}body .loading-box-shadow-omg .loading-box .loading-circle{width:80px;height:80px;background-color:transparent;position:absolute;left:50%;margin-left:-40px;top:10%;animation:init-circle 1s linear infinite}body .loading-box-shadow-omg .loading-box .loading-content{position:absolute;bottom:5%;font-weight:bold;color:rebeccapurple;width:100%;text-align:center}body .loading-box-shadow-omg .loading-box .loading-circle>div{background-color:#292961;border-radius:20px;position:absolute}@keyframes init-circle{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}';
	head.appendChild(style);

	this.body = document.getElementsByTagName('body')[0];
	var loading_box_shadow_omg = this.body.getElementsByClassName("loading-box-shadow-omg")[0];
	if(loading_box_shadow_omg) this.body.removeChild(loading_box_shadow_omg);


	var nodeHtml = '<div class="loading-box">';
	nodeHtml += '<div class="loading-circle"></div><div class="loading-content"></div></div>';

	var html = '<div style="top: 5%;left: 53%;width: 5px;height: 5px;"></div>';
	html += '<div style="top: 11%;left: 30%;width: 7px; height: 7px;"></div>';
	html += '<div style="top: 26%;left: 12%;width: 9px;height: 9px;"></div>';
	html += '<div style="top: 48%;left: 7%;width: 9px;height: 9px;"></div>';
	html += '<div style="top: 70%;left: 15%;width: 9px;height: 9px;"></div>';
	html += '<div style="top: 85%;left: 33%;width: 9px;height: 9px;"></div>';
	html += '<div style="top: 89%;left: 54%;width: 9px;height: 9px;"></div>';
	html += '<div style="top: 80%;left: 75%;width: 9px;height: 9px;"></div>';



	this.content = property.content || 'Loading...';//加载内容
	this.shadowColor = property.shadowColor || 'rgba(0,0,0,0.3)';//背景颜色
	this.loadingBoxColor = property.loadingBoxColor || '#fff';//加载框颜色
	this.loadingPointColor = property.loadingPointColor || '#292961';//动态点颜色
	this.loadingContentColor = property.loadingContentColor || 'rebeccapurple';//提示内容颜色

	this.loading_box_shadow_omg = document.createElement('div');//加载框大背景节点
	this.loading_box_shadow_omg.setAttribute("class","loading-box-shadow-omg");
	this.loading_box_shadow_omg.style.backgroundColor = this.shadowColor;
	this.loading_box_shadow_omg.innerHTML = nodeHtml;


	//加载动态圈点
	this.loading_box = this.loading_box_shadow_omg.getElementsByClassName("loading-box")[0];
	this.loading_box.style.backgroundColor = this.loadingBoxColor;
	this.loading_circle = this.loading_box_shadow_omg.getElementsByClassName("loading-circle")[0];
	this.loading_circle.innerHTML = html;
	this.loading_circle_div = this.loading_circle.getElementsByTagName("div");
	var len = this.loading_circle_div.length;
	for(var i=0;i<len;i++){
		this.loading_circle_div[i].style.backgroundColor = this.loadingPointColor;
	}

	//加载提示内容
	this.loading_content = this.loading_box_shadow_omg.getElementsByClassName("loading-content")[0];
	this.loading_content.innerText = this.content;
	this.loading_content.style.color = this.loadingContentColor;

	//this.body.appendChild(this.loading_box_shadow_omg);

}//动态删除并添加一个加载圈
initDiyLoading.prototype.addEle = function(){
  var loading_box_shadow_omg = this.body.getElementsByClassName("loading-box-shadow-omg")[0];
  if(loading_box_shadow_omg){
    loading_box_shadow_omg.style.display = "block";
  }else {
    this.body.appendChild(this.loading_box_shadow_omg);
  } 
	// this.removeEle();
	// this.body.appendChild(this.loading_box_shadow_omg);
};
//删除加载圈
initDiyLoading.prototype.removeEle = function(){
	var loading_box_shadow_omg = this.body.getElementsByClassName("loading-box-shadow-omg")[0];
	if(loading_box_shadow_omg) this.body.removeChild(loading_box_shadow_omg);
};
initDiyLoading.prototype.hideEle = function(){
	var loading_box_shadow_omg = this.body.getElementsByClassName("loading-box-shadow-omg")[0];
	if(loading_box_shadow_omg) loading_box_shadow_omg.style.display = "none";
};


var xhb_plugin = {
  //
    initDiyLoading:initDiyLoading,
   //模仿jquery  的 $.extend()函数
    extend:function(json,prop){
		function F(){
			
		}  	
	  
		if(typeof json == "function"){
			F.prototype = json.prototype;
			for(var i in prop){
				F.prototype[i] = prop[i];
			}
		}
	  
		if(typeof json == "object"){
			for(var i in json){
				F.prototype[i] = json[i];
			}
		}
		return new F();
    },
   /**
    * 对象拓展函数,如果为数组，数组为哈希数组才有效
    * @param {Boolean} deep 是否深拷贝，
    * @param {Object||Array} target 目标对象或者数组
    * @param {Object||Array} options 要并集的对象或者数组(即后面的对象覆盖前面的对象)
    * */
    _extend:function(deep, target, options) {
		var _this = this;
		for (name in options) {
			copy = options[name];
			if (deep && copy instanceof Array) {
				target[name] = _this.extend(deep, [], copy);
			} else if (deep && copy instanceof Object) {
				target[name] = _this.extend(deep, {}, copy);
			} else {
				target[name] = options[name];
			}
		}
		return target;
    },
  /**
   * 浏览器地址指定携带的参数参数，返回指定的键值
   * @param {String} name 要查询的地址参数的键
   * @return {String}
   * */
  getQueryString: function(name) {
  	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  	var r = window.location.search.substr(1).match(reg);
  	if (r != null) {
  		return unescape(r[2]);
  	}
  	return null;
  },
  /**
   * 获取地址栏所有参数，返回json数据格式
   * @return {Object}
   **/
  oGetParam: function() {
  	var search = location.search.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分//
  	if (!search) {
  		return {};
  	}
  	var searchStr = search[0];
  	var searchHash = searchStr.split('&');

  	var ret = {};
  	for (var i = 0, len = searchHash.length; i < len; i++) { //这里可以调用each方法
  		var pair = searchHash[i];
  		if ((pair = pair.split('='))[0]) {
  			var key = decodeURIComponent(pair.shift());
  			var value = pair.length > 1 ? pair.join('=') : pair[0];

  			if (value != undefined) {
  				value = decodeURIComponent(value);
  			}
  			if (key in ret) {
  				if (ret[key].constructor != Array) {
  					ret[key] = [ret[key]];
  				}
  				ret[key].push(value);
  			} else {
  				ret[key] = value;
  			}
  		}
  	}
  	return ret;
  },
  //父页面和当前页面刷新加载
  pageReLoad: function() {
  	if (window.parent.parent.parent.parent) {
  		parent.parent.parent.parent.location.reload();
  	} else if (window.parent.parent.parent) {
  		parent.parent.parent.location.reload();
  	} else if (window.parent.parent) {
  		parent.parent.location.reload();
  	} else if (window.parent) {
  		parent.location.reload();
  	} else {
  		window.location.reload();
  	}
  },
  /**
   * 当前页面和父页面跳转到其他页面
   * @param {String} Url Url指的是要跳转的路劲页面，如index.html
   * */
  toNewPage: function(Url) {
  	if (window.parent.parent.parent.parent) {
  		parent.parent.parent.parent.location.href = Url;
  	} else if (window.parent.parent.parent) {
  		parent.parent.parent.location.href = Url;
  	} else if (window.parent.parent) {
  		parent.parent.location.href = Url;
  	} else if (window.parent) {
  		parent.location.href = Url;
  	} else {
  		window.location.href = Url;
  	}
  },
  /**
   * 判断是否移动端，
   * @@return {Boolean}
   * */
  isMoblie: function() {
  	var sUserAgent = navigator.userAgent.toLowerCase();
  	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  	var bIsAndroid = sUserAgent.match(/android/i) == "android";
  	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { //移动端
  		return true;
  	} else {
  		return false;
  	}
  },
  /**
   * 判断值是否为空，回调函数
   * @param {String} tmp 要判断的值
   * @@return {Boolean}
   * */
  isNull: function(tmp) {
  	if (!tmp && typeof(tmp) != "undefined" && tmp != 0) { //null
  		return true;
  	} else {
  		return false;
  	}
  },
  /**
   * 返回浏览器的类型和版本
   * @return {Object}
   * */
  getExplorerInfo: function() {
  	var explorer = window.navigator.userAgent.toLowerCase();
  	//ie
  	if (explorer.indexOf("msie") >= 0) {
  		var ver = explorer.match(/msie ([\d.]+)/)[1];
  		return {
  			type: "IE",
  			version: ver
  		};
  	}
  	//firefox
  	else if (explorer.indexOf("firefox") >= 0) {
  		var ver = explorer.match(/firefox\/([\d.]+)/)[1];
  		return {
  			type: "Firefox",
  			version: ver
  		};
  	}
  	//Chrome
  	else if (explorer.indexOf("chrome") >= 0) {
  		var ver = explorer.match(/chrome\/([\d.]+)/)[1];
  		return {
  			type: "Chrome",
  			version: ver
  		};
  	}
  	//Opera
  	else if (explorer.indexOf("opera") >= 0) {
  		var ver = explorer.match(/opera.([\d.]+)/)[1];
  		return {
  			type: "Opera",
  			version: ver
  		};
  	}
  	//Safari
  	else if (explorer.indexOf("Safari") >= 0) {
  		var ver = explorer.match(/version\/([\d.]+)/)[1];
  		return {
  			type: "Safari",
  			version: ver
  		};
  	}

  },
  /**
   * 获取两个GPS经纬度之间的距离
   * @param {Number} lat1 第一点的纬度
   * @param {Number} lng1 第一点的经度
   * @param {Number} lat2 第二点的纬度
   * @param {Number} lng2 第二点的经度
   * @returns {Number}
   */
  getDistance: function(lat1, lng1, lat2, lng2) {
  	function toRad(d) {
  		var PI = Math.PI;
  		return d * PI / 180.0;
  	}
  	var dis = 0;
  	var radLat1 = toRad(lat1);
  	var radLat2 = toRad(lat2);
  	var deltaLat = radLat1 - radLat2;
  	var deltaLng = toRad(lng1) - toRad(lng2);
  	var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
  		Math.pow(Math.sin(deltaLng / 2), 2)));

  	return Math.ceil(dis * 6378137);
  },
  /**
   * 含有规律的字符串数据转化为数组；（以字符串中的某个字段截取生成数组）
   * @param {String} str 指的是大字符串
   * @param {String} chart 指的是大字符串中的某个子字符串
   * @param {Array}
   * */
  stringToArray: function(str, chart) {
  	var arrPerssion = [];
  	if (str.indexOf(chart) >= 0) {
  		var tempArray = str.split(chart);
  		var returnArr = new Array();
  		var i, len = tempArray.length;
  		for (i = 0; i < len; i++) {
  			returnArr.push(tempArray[i]);
  		}

  		return returnArr;
  	} else {
  		arrPerssion.push(str);
  		return arrPerssion;
  	}
  },
  /**
   * 判断某字符串是否含有某个子字符串，如有，打印其第一次或者最后一次的索引
   * @param {String} stringText 指的是整个字符串变量，
   * @param {String} littleStr 指的是整个字符串变量中可能存在的字段,
   * @param {Number} isFrist 是数值，为0，则是返回第一次出现的索引，为1，则是返回最后一次的索引
   * @return {Number}
   * */
  hasStr: function(stringText, littleStr, isFrist) {
  	var str = stringText;
  	var str2 = littleStr;
  	var d = str.length - str.indexOf(str2);
  	if (d > str.length) {
  		return -1;
  	} else {

  		if (isFrist && isFrist == 0) {
  			return str.indexOf(str2)
  		} else if (isFrist && isFrist == 1) {
  			return str.lastIndexOf(str2);
  		}

  	}
  },
  /**
   * 序列化表单的字符串转化为对象
   * @param {String} serializedParams 序列化表单的字符串。序列化的form数据，通过$("form").serialize()获取的，如：name=xhb&pwd=123
   * @return {Object}
   * */
  serializeToObj: function(serializedParams) {
  	var obj = {};

  	function evalThem(str) {
  		var strAry = new Array();
  		strAry = str.split("=");
  		//使用decodeURIComponent解析uri 组件编码
  		for (var i = 0; i < strAry.length; i++) {
  			strAry[i] = decodeURIComponent(strAry[i]);
  		}
  		var attributeName = strAry[0];
  		var attributeValue = strAry[1].trim();
  		//如果值中包含"="符号，需要合并值
  		if (strAry.length > 2) {
  			for (var i = 2; i < strAry.length; i++) {
  				attributeValue += "=" + strAry[i].trim();
  			}
  		}
  		if (!attributeValue) {
  			return;
  		}
  		var attriNames = attributeName.split("."),
  			curObj = obj;
  		for (var i = 0; i < (attriNames.length - 1); i++) {
  			curObj[attriNames[i]] ? "" : (curObj[attriNames[i]] = {});
  			curObj = curObj[attriNames[i]];
  		}
  		//使用赋值方式obj[attributeName] = attributeValue.trim();替换
  		//eval("obj."+attributeName+"=\""+attributeValue.trim()+"\";");
  		//解决值attributeValue中包含单引号、双引号时无法处理的问题
  		curObj[attriNames[i]] = attributeValue.trim();
  	}  	var properties = serializedParams.split("&");
  	for (var i = 0; i < properties.length; i++) {
  		//处理每一个键值对
  		evalThem(properties[i]);
  	}  	return obj;
  },
  /**
   * 对象转化为键值对拼接形式
   * @@param {Object} item 
   * @@return {String}
   */
  objToKeyValue:function(item){
	var params = '?';
	  if (item) {
	    for (var key in item) {
	      params += key + '=' + item[key] + '&';
	    }
	  } else {
	    return '';
	  }
	  return params.slice(0, params.length - 1);  
  },

  //数组排序
  arrSort: function(arr) {
  	return arr.sort(function(a, b) { //排序
  		return a < b ? -1 : 1;
  	});
  },
  //数组去重
  delRepetition: function(arr) {
  	Array.prototype.unique2 = function() {
  		this.sort(); //先排序
  		var res = [this[0]];
  		for (var i = 1; i < this.length; i++) {
  			if (this[i] !== res[res.length - 1]) {
  				res.push(this[i]);
  			}
  		}
  		return res;
  	};
  	return arr.unique2();
  },
  //数组扁平化（二维数组一维处理）
  flattening: function(arr) {
  	var flattened = Array.prototype.concat.apply([], arr);
  	return flattened;
  },
  /**
   * 统计数组中所有的值出现的次数,并以对象的形式返回
   * @param {Array} arr 要统计的数组
   * @return {Object}
   * */
  countif: function(arr) {
  	return arr.reduce(function(prev, next) {
  		//				console.log(prev); //obj，其属性为数组的每一个值，属性值为对应属性在数组中出现的次数
  		//				console.log(next); //数组的每一个值
  		prev[next] = (prev[next] + 1) || 1;
  		return prev;
  	}, {});
  },

  /**
   * 数组对象，将数组中具有相同值的对象 取出组成新的数组，返回新数组
   * @param {Array} arr 数组对象（哈希数组）
   * @param {String} str 数组对象中相同值的属性字符串
   * @return {Array}
   * */
  getSameVal: function(arr, str) {
  	var _arr = [],
  		_t = [],
  		// 临时的变量
  		_tmp;

  	// 按照特定的参数将数组排序将具有相同值得排在一起
  	arr = arr.sort(function(a, b) {
  		var s = a[str],
  			t = b[str];

  		return s < t ? -1 : 1;
  	});

  	if (arr.length) {
  		_tmp = arr[0][str];
  	}
  	// console.log( arr );
  	// 将相同类别的对象添加到统一个数组
  	for (var i in arr) {
  		if (arr[i][str] === _tmp) {
  			_t.push(arr[i]);
  		} else {
  			_tmp = arr[i][str];
  			_arr.push(_t);
  			_t = [arr[i]];
  		}
  	}
  	// 将最后的内容推出新数组
  	_arr.push(_t);
  	return _arr;
  },
  /**
   * 延迟加载器
   * @param {Function} fn 回调函数
   * @param {Number} wait 时间（毫秒）
   * */
  debounce: function(fn, wait) { //fn指的是函数，wait指的是时间数值（秒）
  	//设定默认的延迟时间
  	wait = wait || 500;
  	//清除定时器
  	keyupTimer && clearTimeout(keyupTimer);
  	//定时器执行
  	keyupTimer = setTimeout(fn, wait);
  },
  /**
   * 随机生成n个大写字母 ,返回数组
   * @param {Number} n 字母个数
   * @return {Array}
   * */
  getCapital: function(n) {
  	var result = [];
  	for (var i = 0; i < n; i++) {
  		var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
  		//大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
  		result.push(String.fromCharCode(65 + ranNum));
  	}
  	return result;

  },
  /**
   * 随机生成范围数字：min最小数字，max最大数字（打印数字为最小到最大的范围）
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @return {Number}
   * */
  randNum: function(min, max) {
  	var num = Math.floor(Math.random() * (max - min) + min);
  	return num;
  },

  /**
   * 获取鼠标位置
   * @param {Event} event 事件参数标示，必传event
   * @return {Object}
   * */
  getMousePos: function(event) {
  	var e = event || window.event;
  	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  	var x = e.pageX || e.clientX + scrollX;
  	var y = e.pageY || e.clientY + scrollY;
  	return {
  		'x': x,
  		'y': y
  	};
  },
  /**
   *
   * 获取当前静态所有时间
   * @param {String} oTime 时间格式参数
   *  'y-m-d' ==> 年月日
  	 'm-d' ==> 年月
  	 'm-d' ==> 月日
  	 'h-m-s' ==> 时分秒
  	 'h-m' ==> 时分
  	 'm-s' ==> 分秒
  	 'w' ==>星期
  	 'ZW' ==>中文年月日时分秒
  	 '' ==>年月日 时分秒
   * */
  getOnTime: function(oTime) {
  	//获取当前具体时间
  	var oDate = new Date();
  	var nYear = oDate.getFullYear();
  	var nMonth = oDate.getMonth() * 1 + 1;
  	if (nMonth < 10) nMonth = "0" + nMonth;
  	var nDate = oDate.getDate();
  	if (nDate < 10) nDate = "0" + nDate;
  	var nHours = oDate.getHours();
  	var nMinutes = oDate.getMinutes();
  	var nSeconds = oDate.getSeconds();

  	(nHours < 10) && (nHours = "0" + nHours);
  	(nMinutes < 10) && (nMinutes = "0" + nMinutes);
  	(nSeconds < 10) && (nSeconds = "0" + nSeconds);

  	switch (true) {
  		case (oTime === 'y-m-d'):
  			return nYear + "-" + nMonth + "-" + nDate;
  		case (oTime === 'y-m'):
  			return nYear + "-" + nMonth;
  		case (oTime === 'm-d'):
  			return nMonth + "-" + nDate;
  		case (oTime === 'h-m-s'):
  			return nHours + ":" + nMinutes + ":" + nSeconds;
  		case (oTime === 'm-s'):
  			return nMinutes + ":" + nSeconds;
  		case (oTime === 'h-m'):
  			return nHours + ":" + nMinutes;
  		case (oTime === 'y'):
  			return nYear;
  		case (oTime === 'd'):
  			return nDate;
  		case (oTime === 'w'):
  			return "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
  		case (oTime === 'ZW'):
  			return nYear + "年" + nMonth + "月" + nDate + "日  " + nHours + ":" + nMinutes + ":" + nSeconds;
  		default:
  			return nYear + "-" + nMonth + "-" + nDate + " " + nHours + ":" + nMinutes + ":" + nSeconds;
  	}
  },

  /**
   * yyyy-mm-dd hh:mm:ss转换为时间戳
   * @param {String} s yyyy-mm-dd hh:mm:ss时间格式
   * @return {Number}
   * */
  backDateNum: function(s) {
  	if (s) {
  		var date = new Date(s.replace(/-/g, '/'));
  		return Date.parse(date) / 1000;
  	}

  },
  /**
   * 标准时间返回 y-m-d h:m:s格式
   * @param {Object} date 当前时间对象
   * @return {String}
   * */
  formatDateTime: function(date) {
	  if(typeof date == "string") return date;
  	var y = date.getFullYear();
  	var m = date.getMonth() + 1;
  	m = m < 10 ? ('0' + m) : m;
  	var d = date.getDate();
  	d = d < 10 ? ('0' + d) : d;
  	var h = date.getHours();
  	h = h < 10 ? ('0' + h) : h;
  	var minute = date.getMinutes();
  	minute = minute < 10 ? ('0' + minute) : minute;
  	var second = date.getSeconds();
  	second = second < 10 ? ('0' + second) : second;
  	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },

  //获取当前时间的时间戳
  getCurrTimestamp: function() {
  	var sTime = this.formatDateTime(new Date());
  	return this.backDateNum(sTime);
  },
  /**
   * 时间戳转换格式
   * @param {Number} timestamp3 时间戳
   * @param {String} sFormat 要转换的数据格式
  	 sFormat格式字符串:
  	'yyyy-MM-dd h:m:s'年月日时分秒
  	'yyyy-MM-dd'
  	'yyyy-MM'
   	'h:m'
   	'yyyy'
   	.....
   */
  timestampToTime: function(timestamp3, sFormat) {
  	function addZero(n) {
  		return (n <= 9 ? ("0" + n) : n);
  	}
  	var newDate = new Date();
  	newDate.setTime(timestamp3 * 1000);
  	Date.prototype.format = function(format) {
  		var date = {
  			"M+": addZero(this.getMonth() + 1),
  			"d+": addZero(this.getDate()),
  			"h+": addZero(this.getHours()),
  			"m+": addZero(this.getMinutes()),
  			"s+": addZero(this.getSeconds()),
  			"q+": Math.floor((this.getMonth() + 3) / 3),
  			"S+": this.getMilliseconds()
  		};
  		if (/(y+)/i.test(format)) {
  			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  		}
  		for (var k in date) {
  			if (new RegExp("(" + k + ")").test(format)) {
  				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
  					date[k] : ("00" + date[k]).substr(("" + date[k]).length));
  			}
  		}

  		return format;
  	};
  	return newDate.format(sFormat);
  },
  /**
   * 根据年月日时间计算星期几
   * @param {String} sDate 年月日时间，有可能是yyyy-mm-dd格式，也有可能是yyyy/mm/dd格式
   * @return {String} 返回星期几
   * */
  getWeeDay: function(sDate) {
  	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  	if (sDate.indexOf("/") > -1) { //yyyy/mm/dd格式
  		var myDate = new Date(Date.parse(sDate));
  		return weekDay[myDate.getDay()];
  	} else if (sDate.indexOf("-") > -1) { //yyyy-mm-dd格式
  		var myDate = new Date(Date.parse(sDate.replace(/-/g, '/')));
  		return weekDay[myDate.getDay()];
  	} else {
  		alert("日期格式不对");
  	}
  },
  incrementInitDate: 0, //增量初始时间戳
  incrementTimer: null, //增量定时器变量
  decrementInitDate: 0, //减量初始时间戳
  decrementTimer: null, //减量定时器变量
  dd_currTime: null, //增量减量对象
  /**
   * 增量时间（顺时钟）
   * @param {Number} nIncrement 增量（指某一刻平均递增的秒数）
   * @param {Number} nSpeed 增速 （指平均多少ms执行一次函数的增速）
   * @param {Function} callback 回调函数，参数为递增的时间对象
   * @param {String} sInitDate 初始时间（包含年月日时分秒 yyyy-mm-ss hh:mm:ss格式）(可选)
   * */
  incrementTime: function(nIncrement, nSpeed, callback, sInitDate) {
  	var _this = this;
  	if (sInitDate == undefined || !sInitDate) { //加载本地时间
  		this.incrementInitDate = this.getCurrTimestamp(); //初始化增量时间，转化时间戳
  	} else {
  		this.incrementInitDate = this.backDateNum(sInitDate); //初始化增量时间，转化时间戳
  	}
  	this.incrementTimer = setInterval(function() {
  		_this.incrementInitDate += nIncrement;
  		_this.dd_currTime = _this.timestampToTime(_this.incrementInitDate, "yyyy-MM-dd h:m:s");
  		_this.nIndex = _this.dd_currTime.indexOf(" ");

  		_this.oDate = {
  			cTime: _this.dd_currTime.slice(_this.nIndex + 1, _this.dd_currTime.length), //计算时分秒
  			cDate: _this.dd_currTime.slice(0, _this.nIndex), //计算年月日
  			cWeek: _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)) //计算周几
  		};
  		callback(_this.oDate);
  		//					console.log(JSON.stringify(_this.oDate));
  		_this.cTime = _this.dd_currTime.slice(_this.nIndex, _this.dd_currTime.length); //计算时分秒
  		_this.cDate = _this.dd_currTime.slice(0, _this.nIndex); //计算年月日
  		_this.cWeek = _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)); //计算周几
  	}, nSpeed);
  },

  /**
   * 减量时间（逆时钟）
   * @param {Number} nDecrement 减量（指某一刻平均递减的秒数）
   * @param {Number} nSpeed 减速 （指平均多少ms执行一次函数的减速）
   * @param {Function} callback 回调函数，参数为递增的时间对象
   * @param {String} sInitDate 初始时间（包含年月日时分秒 yyyy-mm-ss hh:mm:ss格式）(可选)
   * */
  decrementTime: function(nDecrement, nSpeed, callback, sInitDate) {
  	var _this = this;
  	if (sInitDate == undefined || !sInitDate) { //加载本地时间
  		this.decrementInitDate = this.getCurrTimestamp(); //初始化增量时间，转化时间戳
  	} else {
  		this.decrementInitDate = this.backDateNum(sInitDate); //初始化增量时间，转化时间戳
  	}
  	this.decrementTimer = setInterval(function() {
  		_this.decrementInitDate -= nDecrement;
  		_this.dd_currTime = _this.timestampToTime(_this.decrementInitDate, "yyyy-MM-dd h:m:s");
  		_this.nIndex = _this.dd_currTime.indexOf(" ");

  		_this.oDate = {
  			cTime: _this.dd_currTime.slice(_this.nIndex + 1, _this.dd_currTime.length), //计算时分秒
  			cDate: _this.dd_currTime.slice(0, _this.nIndex), //计算年月日
  			cWeek: _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)) //计算周几
  		};
  		callback(_this.oDate);
  		//					console.log(JSON.stringify(_this.oDate));
  		_this.cTime = _this.dd_currTime.slice(_this.nIndex, _this.dd_currTime.length); //计算时分秒
  		_this.cDate = _this.dd_currTime.slice(0, _this.nIndex); //计算年月日
  		_this.cWeek = _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)); //计算周几
  	}, nSpeed);
  },
  /**
   * 秒数转化为时分秒时间格式
   * @param {Number} ts 秒数
   * @return {String}
   * */
  secondToStr: function(ts) {
  	/**
  	 * zeroize值和长度（默认值是2）。
  	 * @param {Object} v
  	 * @param {Number} l
  	 * @return {String}
  	 */
  	function ultZeroize(v, l) {
  		var z = "";
  		l = l || 2;
  		v = String(v);
  		for (var i = 0; i < l - v.length; i++) {
  			z += "0";
  		}
  		return z + v;
  	}

  	if (isNaN(ts)) {
  		return "--:--:--";
  	}
  	var h = parseInt(ts / 3600);
  	var m = parseInt((ts % 3600) / 60);
  	var s = parseInt(ts % 60);
  	return (ultZeroize(h) + ":" + ultZeroize(m) + ":" + ultZeroize(s));
  },
  /**
   * 检测浏览器是否支持svg
   * @return {Boolean}
   * */
  isSupportSVG: function() {
  	var SVG_NS = 'http://www.w3.org/2000/svg';
  	return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
  },
  /**
   * 检测浏览器是否支持canvas
   * @return {Boolean}
   * */
  isSupportCanvas: function() {
  	if (document.createElement('canvas').getContext) {
  		return true;
  	} else {
  		return false;
  	}
  },

  /**
   * 十进制转换为各种进制字符（2到32进制）
   * @param {String} str 要转换其他进制的十进制字符串
   * @param {Number} num 十进制要转换的进制数（2到32）
   * @return {String}
   * */
  tenToAny: function(str, num) {
  	return str.toString(num);
  },

  /**
   * 其他进制（2到32）数据转换为十进制数据
   * @param {String} str 其他进制的字符数据
   * @param {Number} num 要转换为十进制的原进制数（2到32）
   * @return {String}
   * */
  AnyToTen: function(str, num) {
  	return parseInt(str, num);
  },

  /**
   * 动态加载外部js文件
   * @param {String} path 本地路径，注意：末尾不要加“.js”后缀
   * @param {Function} callback 动态加载js成功的回调函数
   * */
  _loadJs: function(path, callback) {
  	callback = !(typeof(callback) == "undefined") ? callback : function() {};
  	var oHead = document.getElementsByTagName('HEAD').item(0);
  	var script = document.createElement("script");
  	script.type = "text/javascript";
  	if (script.readyState) { //IE
  		script.onreadystatechange = function() {
  			if (script.readyState == "loaded" || script.readyState == "complete") {
  				script.onreadystatechange = null;
  				callback();
  			}
  		};
  	} else { //Others: Firefox, Safari, Chrome, and Opera
  		script.onload = function() {
  			callback();
  		};
  	}
  	script.src = path + ".js";
  	oHead.appendChild(script);
  },

  /**
   * 动态加载外部css文件
   * @param {String} path 本地路径，注意：末尾不要加“.css”后缀
   * */
  _loadCss: function(path) {
  	if (!path || path.length === 0) {
  		throw new Error('参数“path”是必需的!');
  	}
  	var head = document.getElementsByTagName('head')[0];
  	var links = document.createElement('link');
  	links.href = path + ".css";
  	links.rel = 'stylesheet';
  	links.type = 'text/css';
  	head.appendChild(links);
  },

  /**
   * 获取对象类型名
   * @param {Any} object 各种返回类型 ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
   * @return {String}
   * */
  _getType: function(object) {
  	return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
  },

  /**
   * 用来判断对象类型
   * @param {Any} object 需要判断的数据
   * @param {String} typeStr 预想的类型字符串
   * @return {Boolean}
   * */
  _isType: function(object, typeStr) {
  	return this._getType(object) == typeStr;
  },

  /**
   * 动态加载js文件,批量加载js,css文件，path可以是数组格式或用逗号隔开的字符串
   * @param {String||Array} path path可以是数组格式或用逗号隔开的字符串,指的是需要加载的js或者css组，如["jquery","layer"]
   * @param {String} fileType 指定要动态加载的统一的类型，js或者css
   * */
  _import: function(path, fileType) {
  	var loadfun;
  	switch (fileType) {
  		case "js":
  			loadfun = this._loadJs;
  			break;
  		case "css":
  			loadfun = this._loadCss;
  			break;
  		default:
  			alert("请检查文件类型");
  	}
  	//如果path是以逗号隔开的字符串
  	if (this._is(path, "String")) {
  		if (path.indexOf(",") >= 0) {
  			path = path.split(",");
  		} else {
  			path = [path];
  		}
  	}
  	//循环加载文件
  	for (var i = 0; i < path.length; i++) {
  		loadfun(path[i]);
  	}
  },
  /**
   * 对象数据序列化为带特定字符为分隔符的字符串
   * @param {Object} obj 需要序列化为带特地字符分割的对象
   * @param {String} symbol 分隔符字符串
   * @return {String}
   * */
  objSerialize: function(obj, symbol) {
  	var str = "";
  	for (each in obj) {
  		str += each + "=" + obj[each] + symbol;
  	}
  	return str.slice(0, str.length - (symbol.length));
  },

  /**
   * 根据字符串获取其长度，中文汉字为2个长度，特殊字符长度有多有少
   * @param {String} str 要计算长度个数的字符串
   * @return {Number}
   * */
  strGetLength: function(str) {

  	var realLength = 0;
  	for (var i = 0; i < str.length; i++) {
  		charCode = str.charCodeAt(i);
  		if (charCode >= 0 && charCode <= 128)
  			realLength += 1;
  		else
  			realLength += 2;
  	}
  	return realLength;
  },
  //中文数组排序
  sortChinese: function(arr) { // 参数： 排序的数组
  	//			    arr.sort(function (item1, item2) {
  	//			      return item1.localeCompare(item2, 'zh-CN');
  	//			    })
  	if (arr.length > 0) {
  		return (arr.sort(function(a, b) {
  			return (a + '').localeCompare(b + '')
  		}))
  	}

  },
  /**
   * 动态添加外部js和删除原js，js加载完成，执行回调
   * @param {String} url       script的src的地址,要动态添加的脚本地址
   * @param {Function} callback  回调函数执行
   * @param {String} srckey    要删除的原脚本地址（虽然删除，方法还在）
   * */
  changeScript: function(url, srckey, callback) {

  	// 	// 删除之前的script
  	// 	const scripts = document.querySelectorAll('script');
  	// 	for(const script of scripts) {
  	// 		if(script.src.includes(srckey)) {
  	// 			script.parentNode.removeChild(script);
  	// 		}
  	// 	}
  	// 	document.execCommand('Refresh');

  	// 	// 重新创建script
  	// 	const script = document.createElement("script");
  	// 	script.type = "text/javascript";
  	// 	script.async = true;
  	// 	script.defer = true;
  	// 	if(script.readyState) { // IE
  	// 		script.onreadystatechange = function() {
  	// 			if(script.readyState === "loaded" || script.readyState === "complete") {
  	// 				script.onreadystatechange = null;
  	// 				callback();
  	// 			}
  	// 		};
  	// 	} else { // Others
  	// 		script.onload = function() {
  	// 			callback();
  	// 		};
  	// 	}
  	// 	script.src = url;
  	// 	document.getElementsByTagName("head")[0].appendChild(script);

  },
  /**
   * 动态添加js，js加载完毕，执行回调函数
   * @param {String} url  script的src的地址,要动态添加的脚本地址
   * @param {Function} callback  回调函数执行
   * */
  addScript: function(url, callback) {
  	// 创建script
  	const script = document.createElement("script");
  	script.type = "text/javascript";
  	script.async = true;
  	script.defer = true;
  	if (script.readyState) { // IE
  		script.onreadystatechange = function() {
  			if (script.readyState === "loaded" || script.readyState === "complete") {
  				script.onreadystatechange = null;
  				callback();
  			}
  		};
  	} else { // Others
  		script.onload = function() {
  			callback();
  		};
  	}
  	script.src = url;
  	document.getElementsByTagName("head")[0].appendChild(script);
  },
  /**
   * 以几分钟为间隔，获取两个时间范围内的所有时间点，返回数组
   * @param {String} startDate 开始时间（yyyy-mm-dd hh:mm:ss）
   * @param {String} endDate 结束时间（yyyy-mm-dd hh:mm:ss）
   * @param {Number} space 时间间隔（单位分钟），默认间隔30分钟
   * @param {Boolean} isReverse 时间点是否从结束时间开始计算返回，如true，则倒叙，否则或者不传为正序
   * @return {Array}
   * */
  getDateArr: function(startDate, endDate, space, isReverse) {
  	if (!startDate || !endDate) {
  		alert('时间参数缺省');
  		return;
  	}
  	var _startDate = new Date(startDate.replace(/-/g, "/"));
  	var _endDate = new Date(endDate.replace(/-/g, "/"));

  	if (!space) {
  		space = 30 * 60 * 1000;
  	} else {
  		space = space * 60 * 1000;
  	}
  	var endTime = _endDate.getTime();
  	var startTime = _startDate.getTime();
  	var mod = endTime - startTime;

  	if (mod <= space) {
  		return;
  	}
  	var dateArray = [];
  	if (isReverse) {
  		//倒叙插入
  		while (mod - space >= space) {
  			var d = new Date();
  			d.setTime(endTime - space);
  			dateArray.push(d);
  			mod = mod - space;
  			endTime = endTime - space;
  		}
  	} else {
  		//正序插入
  		while (mod >= space) {
  			var d = new Date();
  			d.setTime(startTime + space);
  			dateArray.push(d);
  			mod = mod - space;
  			startTime = startTime + space;
  		}
  	}
  	dateArray.reverse();
  	var aRes = [];
  	for (var i = dateArray.length - 1; i >= 0; i--) {
  		aRes.push(this.conversionTime(dateArray[i]));
  	}
  	return aRes;
  },
  /**
   * 系统时间格式转化为 yyyy-mm-dd hh-mm-ss时间格式
   * @param {String} dt 系统时间格式时间
   * @return {String}
   * */
  conversionTime: function(dt) {
  	return (
  		dt.getFullYear() +
  		"-" +
  		(dt.getMonth() + 1 < 10 ?
  			"0" + (dt.getMonth() + 1) :
  			dt.getMonth() + 1) +
  		"-" +
  		(dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) +
  		" " +
  		(dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) +
  		":" +
  		(dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) +
  		":" +
  		(dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds())
  	);
  },
  /**
   * 大于0的正整数转化为大写字母
   * @param {Number} num 大于零的正整数
   * @return {String}
   * */
  numToLetter: function(num) {
  	var stringName = "";
  	if (num > 0) {
  		if (num >= 1 && num <= 26) {
  			stringName = String.fromCharCode(64 + parseInt(num));
  		} else {
  			while (num > 26) {
  				var count = parseInt(num / 26);
  				var remainder = num % 26;
  				if (remainder == 0) {
  					remainder = 26;
  					count--;
  					stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
  				} else {
  					stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
  				}
  				num = count;
  			}
  			stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
  		}
  	}

  	return stringName;

  },
  //清除所有缓存
  clearCacheFn: function(callback) {
  	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  	if (keys) {
  		for (var i = keys.length; i--;) {
  			document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
  			document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
  			document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
  		}
  		if (callback) callback();
  	}
  },
  /**
   * 设置cookie
   * @param {String} name 设置的键
   * @param {String} value 设置的值
   * @param {Number} time 设置的过期时间，单位毫秒，如1000，则为1秒
   * */
  _set_cookie: function(name, value, time) {
  	var exp = new Date();
  	exp.setTime(exp.getTime() + time * 1);
  	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  /**
   * 读取cookie
   * @param {String} name 设置的键
   * */
  _get_cookie: function(name) {
  	var arr,
  		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
  	else return null;
  },
  /**
   * 删除cookie
   * @param {String} name 设置的键
   * */
  _del_cookie: function(name) {
  	var exp = new Date();
  	exp.setTime(exp.getTime() - 1);
  	var cval = this._get_cookie(name);
  	if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  /**
   * 获取元素的实际宽高，偏移量和x,y位置
   * @param {String} selector 元素的选择器，id要带#，class要带.
   * */
  getDOMTrueData: function(selector) {
  	return document.querySelector(selector).getBoundingClientRect();
  },
  /**
   * 获取昨天时间（返回年月日yyyy-mm-dd格式）
   * @return {String}
   * */
  getYesterdayDate: function() {
  	var today = this.getOnTime('y-m-d');
  	var nYesterday = this.backDateNum(today) - 86400; //昨天时间戳
  	return this.timestampToTime(nYesterday, "yyyy-MM-dd");
  },
  //阻止事件冒泡
  stopEventBubble: function() {
  	//阻止事件冒泡
  	window.event ? window.event.cancelBubble = true : e.stopPropagation();
  },
  /**
   * 获取video视频第一针图片，生成地址
   * @param {Object} jsObj js元素对象
   * @param {Function} fn 回调函数，返回参数是img地址
   * */
  getVideoImg: function(jsObj, fn) {
  	var video;
  	var scale = 0.8;
  	var initialize = function() {
  		video = jsObj;
  		video.addEventListener('loadeddata', captureImage); // 用于向指定元素添加事件句柄。
  	};

  	var captureImage = function() {
  		var canvas = document.createElement("canvas"); // 创建一个画布
  		canvas.width = video.videoWidth * scale;
  		canvas.height = video.videoHeight * scale;
  		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // getContext:设置画布环境；drawImage:画画
  		var imgUrl = canvas.toDataURL("image/png");
  		if (fn) fn(imgUrl);

  	};

  	initialize();
  },
  isLoad: true, //加个节流阀,避免尚未加载出的时间段里,上拉多次而导致加载太多

  /**
   * 监听window滚动条滚动到底部的事件
   * @param {Function} fn 回调函数
   * */
  window_to_bottom_fn: function(fn) {
    var _this = this;
  	//开启事件监听
  	window.addEventListener('scroll', function() {
  		var clientHeight = document.documentElement.clientHeight; //可视区高度

  		var scrollHeight = document.documentElement.scrollHeight; //文档流高度

  		var scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop ||
  			0; //滚动出去高度

  		//文档剩余区域的高度
  		// 文档高度-可视区高度-滚动出去的高度 = 文档剩余高度
  		var surplus = scrollHeight - clientHeight - scrollDistance; //尚未滚出来的文档流高度

  		//注意判断条件,当剩余文档流的高度小于0时

  		if (surplus <= 0 && _this.isLoad) {

  			_this.isLoad = false;

  			setTimeout(function() {
  				if (fn) fn();
  				_this.isLoad = true;

  			}, 100); //迟疑三秒再加载出来

  		}

  	}, false);
  },
  /**
   * Date.UTC() 格式的时间转化为中国时区的 “yyyy-mm-dd hh:mm:ss”时间格式
   * @param {Number} n Date.UTC()之后的时间串
   * */
  UTC_to_CTime: function(n) {
  	var t = 28800000;
  	var xVal = n;
  	var s_utc_time = new Date(xVal);
  	var sTime = s_utc_time.toUTCString(); //UTC时间转换为国际GMT时间
  	// var resTime = this.formatDateTime(new Date(sTime));
  	var nT = Date.parse(new Date(sTime)) - t; //转化时间戳
  	return this.timestampToTime(nT / 1000, "yyyy-MM-dd h:m:s");
  },
  /**
   * 根据年月返回该月份的天数
   * @param {Number} year 年份
   * @param {Number} month 月份
   * @return {Number}
   * */
  getDaysInMonth: function(year, month) {
  	month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
  	var temp = new Date(year, month, 0);
  	return temp.getDate();
  },
  /**
   * 根据指定年月日，获取该天前几天的天数返回数组
   * @param {Number} n 要返回的天数
   * @param {String} sDate 指定时间，“yyyy-mm-dd”格式 ,如果不传该参数，则默认未当前系统日期
   * */
  getPrevDays: function(n, sDate) {
  	var nDayC = 24 * 60 * 60; //一天的时间戳数。秒单位
  	if (sDate) {
  		var nTargetDate = this.backDateNum(sDate);
  	} else {
  		var curtime = this.getOnTime("y-m-d");
  		var nTargetDate = this.backDateNum(curtime);
  	}
  	var list = [];
  	for (var i = 0; i < n; i++) {
  		var nRes = nTargetDate - (nDayC * i);
  		var sRes = this.timestampToTime(nRes, "yyyy-MM-dd");
  		list.push(sRes);
  	}
  	return list;
  },
  /**
   * 根据指定年月日，获取该天后几天的天数返回数组
   * @param {Number} n 要返回的天数
   * @param {String} sDate 指定时间，“yyyy-mm-dd”格式 ,如果不传该参数，则默认未当前系统日期
   * */
  getNextDays: function(n, sDate) {
  	var nDayC = 24 * 60 * 60; //一天的时间戳数。秒单位
  	if (sDate) {
  		var nTargetDate = this.backDateNum(sDate);
  	} else {
  		var curtime = this.getOnTime("y-m-d");
  		var nTargetDate = this.backDateNum(curtime);
  	}
  	var list = [];
  	for (var i = 0; i < n; i++) {
  		var nRes = nTargetDate + (nDayC * i);
  		var sRes = this.timestampToTime(nRes, "yyyy-MM-dd");
  		list.push(sRes);
  	}
  	return list;
  },
  /**
   * 根据年月日，返回对应的星期
   * @param {String} sDate 日期年月日"yyyy-mm-dd"或者"yyyy/mm/dd"
   * @param {String} sLang 语言版本，cn代表中文星期名称，en代表英文星期名称
   * */
  getWeekName: function(sDate, sLang) {
  	var nWeek = new Date(sDate).getDay();
  	switch (nWeek) {
  		case 1:
  			return (sLang == "en" ? "Mon." : "星期一");
  		case 2:
  			return (sLang == "en" ? "Tue." : "星期二");
  		case 3:
  			return (sLang == "en" ? "Wed." : "星期三");
  		case 4:
  			return (sLang == "en" ? "Thur." : "星期四");
  		case 5:
  			return (sLang == "en" ? "Fri." : "星期五");
  		case 6:
  			return (sLang == "en" ? "Sat." : "星期六");
  		default:
  			return (sLang == "en" ? "Sun." : "星期日");
  	}
  },
  /**
   * UTC通用标准,以z来标识的时间 ，如2019-04-24T02:30:00.000+0000，转化为“yyyy-mm-dd HH:mm:ss”格式
   * @param {String} date UTC通用标准时间，如，2019-04-24T02:30:00.000+0000
   * @return {String}
   * */
  resolvingDate: function(date) {
  	//date是传入的时间
  	var d = new Date(date);

  	var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  	var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  	var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  	var sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

  	var times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

  	return times;
  },
  /**
   * 根据各种时间类型增量时间（年月日，年月，年）
   * @param {String} sType 要增量的时间类型 0，1，2，分别代表“yyyy-mm-dd”,"yyyy-mm","yyyy"格式时间
   * @param {String} sDate 要增量的时间 可能值：“yyyy-mm-dd”,"yyyy-mm","yyyy"
   * @param {Boolean} isLimiting 增量时间是否在当前现实时间范围内，如果传参数true，则增量后的时间必须不能大于 new Date()
   * */
  addAnyTime: function(sType, sDate, isLimiting) {
  	if (sType == "0") {
  		var speed = 1 * 60 * 60 * 24; //秒为单位进制
  		var nTime = this.backDateNum(sDate) + speed; //增量后时间戳
  		var cur_date = this.getOnTime('y-m-d');
  		var nCurrDate = this.backDateNum(cur_date); //当前现实时间戳间
  		if (isLimiting && nTime > nCurrDate) { //有限制
  			return cur_date;
  		}
  		var res = this.timestampToTime(nTime, "yyyy-MM-dd");
  		return res;
  	} else if (sType == "1") {
  		var oMonth = this.get_string(sDate);
  		var cur_date = this.getOnTime('y-m');
  		var oMonth2 = this.get_string(cur_date); //当前的时间（yyyy-mm）
  		if (oMonth.last === 12) {
  			oMonth.last = 1;
  			oMonth.first++;
  		} else {
  			oMonth.last++;
  		}

  		if (isLimiting) {
  			if (oMonth2.first < oMonth.first || (oMonth2.first == oMonth.first && oMonth2.last < oMonth.last)) { //有限制
  				return cur_date;
  			}
  		}
  		if (oMonth.last < 10) oMonth.last = 0 + "" + oMonth.last;
  		var res = oMonth.first + "-" + oMonth.last;
  		return res;
  	} else if (sType == "2") {
  		var currYear = this.getOnTime('y') * 1;
  		var newYear = sDate * 1 + 1;
  		return (newYear > currYear ? currYear : newYear);
  	}
  },
  /**
   * 根据各种时间类型减量时间（年月日，年月，年）
   * @param {String} sType 要减量的时间类型 0，1，2，分别代表“yyyy-mm-dd”,"yyyy-mm","yyyy"格式时间
   * @param {String} sDate 要减量的时间 可能值：“yyyy-mm-dd”,"yyyy-mm","yyyy"
   * */
  desAnyTime: function(sType, sDate) {
  	if (sType == "0") {
  		var speed = 1 * 60 * 60 * 24; //秒为单位进制
  		var nTime = this.backDateNum(sDate) - speed; //减量后时间戳
  		var res = this.timestampToTime(nTime, "yyyy-MM-dd");
  		return res;
  	} else if (sType == "1") {
  		var oMonth = this.get_string(sDate);
  		if (oMonth.last === 1) {
  			oMonth.last = 12;
  			oMonth.first--;
  		} else {
  			oMonth.last--;
  		}
  		if (oMonth.last < 10) oMonth.last = 0 + "" + oMonth.last;
  		var res = oMonth.first + "-" + oMonth.last;
  		return res;
  	} else if (sType == "2") {
  		var newYear = sDate * 1 - 1;
  		if (newYear < 0) {
  			return sDate;
  		} else {
  			return newYear;
  		}

  	}
  },
  /**
   * 截取带有“-”的字符串，分为两段
   * @param {String} location 带有一个“-”的字符串
   * @return {Object}
   * */
  get_string: function(location) {
  	var sign = location.indexOf("-");
  	var ra_x = location.slice(0, sign) * 1; //x轴数
  	var ra_y = location.slice(sign + 1, location.length) * 1; //y轴数
  	return {
  		first: ra_x,
  		last: ra_y
  	};
  },
  /**
   * 截取带有特殊字符的字符串，分为两段
   * @param {String} location 带有一个特殊字符的字符串
   * @param {String} str 特殊字符
   * @return {Object}
   * */
  get_string2: function(location, str) {
  	var sign = location.indexOf(str);
  	var ra_x = location.slice(0, sign) * 1; //第一个
  	var ra_y = location.slice(sign + 1, location.length) * 1; //第二个
  	return {
  		first: ra_x,
  		last: ra_y
  	};
  },
  /**
   * 数组中的两个元素互换位置
   * @param {Array} arr 数组
   * @param {Number} index1 数组元素1的索引
   * @param {Number} index2 数组元素2的索引
   * */
  swapArr: function(arr, index1, index2) {
  	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  	return arr;
  },
  //关闭当前页面
  closeCurrPage: function() {
  	if (navigator.userAgent.indexOf('MSIE') > 0) { // close IE
  		if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
  			window.opener = null;
  			window.close();
  		} else {
  			window.open('', '_top');
  			window.top.close();
  		}
  	} else { // close chrome;It is effective when it is only one.
  		window.opener = null;
  		window.open('', '_self');
  		window.close();
  	}
  },
  /**
   * 获取数组元素最大值
   * @param {Array} arr 一维数组(里面皆是数字)
   * @return {Number}
   * */
  max: function(arr) {
  	Array.prototype.max = function() {
  		var max = this[0];
  		var len = this.length;
  		for (var i = 1; i < len; i++) {
  			if (this[i] > max) {
  				max = this[i];
  			}
  		}
  		return max;
  	};
  	return arr.max();
  },
  /**
   * 获取数组元素最小值
   * @param {Array} arr 一维数组(里面皆是数字)
   * @return {Number}
   * */
  min: function(arr) {
  	Array.prototype.min = function() {
  		var min = this[0];
  		var len = this.length;
  		for (var i = 1; i < len; i++) {
  			if (this[i] < min) {
  				min = this[i];
  			}
  		}
  		return min;
  	};
  	return arr.min();
  },
  //时分秒转时间戳
  time_to_Timestamp: function(time) {
  	var s = 0;
  	var hour = time.split(':')[0];
  	var min = time.split(':')[1];
  	var sec = time.split(':')[2];
  	s = Number(hour * 3600) + Number(min * 60) + Number(sec);
  	return s;
  },
  /**
   * 时间戳转时分秒
   * @param {Number} mss 秒时间戳，
   * */
  Timestamp_to_time: function(mss) {
  	mss = mss * 1000;
  	var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  	var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  	var seconds = (mss % (1000 * 60)) / 1000;
  	hours = hours < 10 ? ('0' + hours) : hours;
  	minutes = minutes < 10 ? ('0' + minutes) : minutes;
  	seconds = seconds < 10 ? ('0' + seconds) : seconds;
  	return hours + ":" + minutes + ":" + seconds;
  },
  /**
   * 判断两个数字区间是否存在重叠交叉
   * @param {Object} A 区间对象，如{start:10,end:100}
   * @param {Object} B 区间对象，如{start:100,end:200}
   * */
  isUnion: function(A, B) {
  	var max = [A.start, B.start];
  	var min = [A.end, B.end];
  	if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
  		// alert("区间存在重叠交叉！");
  		return true;
  	} else {
  		return false;
  	}
  },
  /**
   * 数组所有子元素按照索引顺序相加
   * @param {Array} arr 所有元素都是数字的数组
   * @return {Number}
   * */
  arrAddFn: function(arr) {
  	function reducer(accumulator, currentValue) {
  		return accumulator + currentValue;
  	}
  	return arr.reduce(reducer);
  },
  /**
   * 数组所有子元素按照索引顺序相减
   * @param {Array} arr 所有元素都是数字的数组
   * @return {Number}
   * */
  arrDecFn: function(arr) {
  	function reducer(accumulator, currentValue) {
  		return accumulator - currentValue;
  	}
  	return arr.reduce(reducer);
  },
  /**
   * canvas画布转化为base64
   * @param {Object} canvas 画布DOM节点
   * @param {String} imgType 转化为bese64图片类型(png,jpg,jpge,gif.....)
   * @return {String} 返回base64
   * */
  canvasToBase64Fn: function(canvas, imgType) {
  	image = canvas.toDataURL("image/" + imgType);
  	return image;
  },
  /**
   * 下载base64格式图片到本地
   * @param {String} content base64图片字符串
   * @param {String} fileName 下载成图片的名称
   * */
  downBase64Img: function(content, fileName) {
  	var base64ToBlob = function(code) {
  		var parts = code.split(';base64,');
  		var contentType = parts[0].split(':')[1];
  		var raw = window.atob(parts[1]);
  		var rawLength = raw.length;
  		var uInt8Array = new Uint8Array(rawLength);
  		for (var i = 0; i < rawLength; ++i) {
  			uInt8Array[i] = raw.charCodeAt(i);
  		}
  		return new Blob([uInt8Array], {
  			type: contentType
  		});
  	};
  	var aLink = document.createElement('a');
  	var blob = base64ToBlob(content); //new Blob([content]);
  	var evt = document.createEvent("HTMLEvents");
  	evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  	aLink.download = fileName;
  	aLink.href = URL.createObjectURL(blob);
  	aLink.click();
  },
  /**
   * 为容器添加文件选择事件, 容器通常是一个按钮
   * @param {Object} container 点击按钮Dom节点
   * @param {Function} onselect 选择文件确定之后的回调函数
   * @param {Function} oncancel 选择取消之后的回调函数
   * @param {Object} fileOption 上传文件文件表单的属性配置，例如multiple，accept等属性
   */
  addFileSelect:function(container, onselect, oncancel, fileOption){
  	container.addEventListener('click', function() {
  			container.innerText = "上传中....";
  			var input = document.createElement('input');
  			input.type = 'file';
  			if (fileOption) { //文件配置
  				if (fileOption.multiple) {
  					input.multiple = "multiple";
  				}
  				if (fileOption.accept) {
  					input.accept = fileOption.accept;
  				}
  			}
  			input.click();
  			input.addEventListener("change", function() {
  				console.log("change");
  				console.log(input.files, "change");
  				onselect && onselect(input.files);
  			});
  			container.addEventListener('focus', function() {
  				console.log(input.value); // 大概先于onchange事件100ms执行, 所以一定是空串

  				var loop_count = 0; // 轮询次数
  				// 轮询
  				(function loop() {
  					// console.log(input.files,"focus");
  					if (input.value !== '') ; else if (++loop_count >= 10) {
  						// 基于轮询次数的判断
  						oncancel === null || oncancel === void 0 ? void 0 : oncancel(input.files);
  					} else {
  						// 暂时无法判断, 继续轮询
  						setTimeout(loop, 20);
  					}
  				})();
  			}, {
  				once: true
  			});
  		});
  },
  /**
   * 删除从0到n个数组中的子元素
   * @param {Array} arr 数组
   * @param {Number} n 要删除的数组元素的前n个
   * @param {Array}
   * */
  del_arr_child:function(arr,n){
  	var i = arr.length;
  	while(i--) {
  		// console.log(i + ' = ' + arr[i]);
  		if(i < n) {
  			arr.splice(i, 1);
  		}
  	}
  	return arr;
  },
	/**
	 * 根据年月日日期，获取该日期在一年中为第几天
	 * @param {String} date 日期 如：2021-12-12
	 * @return {Number}
	 */
	getDaySortByDate:function(date){
		var y, m, d;
		y = date.slice(0,4)*1;
		m = date.slice(5,7)*1;
		d = date.slice(8,10)*1;
		var total = 0;
		var arr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		for (var i = 0; i < m - 1; i++) {
			total = total + arr[i];
		}
		if ((y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) && m > 2) {
			total = total + d + 1;
		} else {
			total = total + d;
		}
		return total;
	},
	/**
	 * 数字超过千位格式化
	 * @param {Number} num 数字
	 * @return {String}
	 * */
	toThNum:function(num){
		
		var result = [ ], counter = 0;
	    num = (num || 0).toString().split('');
		var pointIndex = num.indexOf(".");
		var pointNum = '';
		if(pointIndex >= 0){
			pointNum = num.slice(pointIndex).join('');
			num = num.slice(0,pointIndex);
		}
	    for (var i = num.length - 1; i >= 0; i--) {
	        counter++;
	        result.unshift(num[i]);
	        if (!(counter % 3) && i != 0) { result.unshift(','); }
	    }
	    return result.join('') + pointNum;
	},
	/**
	 * 验证日期合法性
	 * @param {Number} YYYY 年
	 * @param {Number} MM 月
	 * @param {Number} DD 日
	 * @return {Object} 返回的对象 status为true标识合法，false标识不合法，txt是不合法原因
	 */
	checkIsDate:function(YYYY, MM, DD){
		function isRun(year) {
		    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
		        return true;
		    } else {
		        return false;
		    }
		}
		
		
		if (!(MM >= 1 && MM <= 12)) {
			return {
				txt:"月份不对",
				status:false
			};
		}
		switch (MM) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				if (!(DD >= 1 && DD <= 31)) {
					return {
						txt:"日期不对",
						status:false
					};
				}
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				if (!(DD >= 1 && DD <= 30)) {
					return {
						txt:"日期不对",
						status:false
					};
				}
				break;
			case 2:
				if (isRun(YYYY)) {
					if (!(DD >= 1 && DD <= 29)) {
						return {
							txt:"日期不对",
							status:false
						};
					}
				}else {
					 if (!(DD >= 1 && DD <= 28)) {
						return {
							txt:"日期不对",
							status:false
						};
					}
				}
		}
		return {
			txt:"",
			status:true
		};
	},
	/**
	 * 根据年月“yyyy-mm”，返回对应月份天数
	 * @param {String} sDate yyyy-mm年月
	 * @return {Number}
	 */
	getDayNumByYM:function(sDate){
		function isRun(year) {
		    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
		        return true;
		    } else {
		        return false;
		    }
		}
		var day_31 = [1,3,5,7,8,10,12];
		var day_30 = [4,6,9,11];
		var year = sDate.slice(0,4)*1;
		var month = sDate.slice(5)*1;
		if( day_31.includes(month) ){
			return 31;
		}else if( day_30.includes(month) ){
			return 30;
		}else {
			return isRun(year) ? 29 : 28;
		}
	},
	/**
	 * 根据“yyyy-mm-dd”年月日，或者“yyyy-mm”年月，返回日期月份内的数字数组
	 * @param {String} sDate yyyy-mm年月或者 yyyy-mm-dd年月日
	 * @return {Array || Boolean}
	 */
	getNumListByDate:function(sDate){
		var year = sDate.slice(0,4)*1;
		var currYear = new Date().getFullYear();
		var list = [];
		if(sDate.length === 7 || currYear > year){//年月
		  if(sDate.length === 10){
			sDate = sDate.slice(0,7);
		  }
		  var days = this.getDayNumByYM(sDate);
			for(var i=0;i<days;i++){
				list.push(i+1);
			}
			return list;
		}
		else if(sDate.length === 10){//年月日
			var num = sDate.slice(8)*1;
			for(var i=0;i<num;i++){
				list.push(i+1);
			}
			return list;
		}
		else {
			return false;
		}
	},
	/**
	 * 判断一个点是否在多边形内部
	 * @param {Array} points 多边形坐标集合，二维数组,例如：[[x,y],[x,y],[x,y]]
	 * @param {Array} testPoint 测试点：[x,y]
	 * @return {Boolean} 
	 */
	insidePolygon:function(points, testPoint){
		var x = testPoint[0], y = testPoint[1];  
		var inside = false;  
		for (var i = 0, j = points.length - 1; i < points.length; j = i++) {  
			var xi = points[i][0], yi = points[i][1];  
			var xj = points[j][0], yj = points[j][1];  
			  
			var intersect = ((yi > y) != (yj > y))  
					&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);  
			if (intersect) inside = !inside;  
		}  
		return inside;
	},
	/**
	 * 判断一个点是否在圆内部
	 * @param {Array} point 点坐标：[x,y]
	 * @param {Array} circle 圆点坐标：[x,y]
	 * @param {Number} r 圆半径
	 * @return {Boolean} 
	 */
	pointInsideCircle:function(point, circle, r){
		 if (r===0) return false;  
		var dx = circle[0] - point[0];  
		var dy = circle[1] - point[1];  
		return dx * dx + dy * dy <= r * r; 
	},
	//对象合并
	objExtend:function(obj1,obj2){
	  return Object.assign({},obj1,obj2);
	},
	/**
	 * 根据数组对象的某一属性排序，默认正序
	 * @@param {Array} arr 数组对象
	 * @@param {String} prop 数组对象某一要排序的属性
	 * @@param {type} isReverse 值true 为倒序
	 */
	arrSortByObjProp:function(arr,prop,isReverse){
		function compare(property) {
		  return function (a, b) {
		    var value1 = a[property];
		    var value2 = b[property];
			if(isReverse){
				return value2 - value1;
			}
		    return value1 - value2;
		  }
		}
		return arr.sort( compare(prop) );
	},
};
xhb_plugin.initDiyLoading;
xhb_plugin.extend;
xhb_plugin._extend;
xhb_plugin.getQueryString;
xhb_plugin.oGetParam;
xhb_plugin.pageReLoad;
xhb_plugin.toNewPage;
xhb_plugin.isMoblie;
xhb_plugin.isNull;
xhb_plugin.getExplorerInfo;
xhb_plugin.getDistance;
xhb_plugin.stringToArray;
xhb_plugin.hasStr;
xhb_plugin.serializeToObj;
xhb_plugin.objToKeyValue;
xhb_plugin.arrSort;
xhb_plugin.delRepetition;
xhb_plugin.flattening;
xhb_plugin.countif;
xhb_plugin.getSameVal;
xhb_plugin.debounce;
xhb_plugin.getCapital;
xhb_plugin.randNum;
xhb_plugin.getMousePos;
xhb_plugin.getOnTime;
xhb_plugin.backDateNum;
xhb_plugin.formatDateTime;
xhb_plugin.getCurrTimestamp;
xhb_plugin.timestampToTime;
xhb_plugin.getWeeDay;
xhb_plugin.incrementInitDate;
xhb_plugin.incrementTimer;
xhb_plugin.decrementInitDate;
xhb_plugin.decrementTimer;
xhb_plugin.dd_currTime;
xhb_plugin.incrementTime;
xhb_plugin.decrementTime;
xhb_plugin.secondToStr;
xhb_plugin.isSupportSVG;
xhb_plugin.isSupportCanvas;
xhb_plugin.tenToAny;
xhb_plugin.AnyToTen;
xhb_plugin._loadJs;
xhb_plugin._loadCss;
xhb_plugin._getType;
xhb_plugin._isType;
xhb_plugin._import;
xhb_plugin.objSerialize;
xhb_plugin.strGetLength;
xhb_plugin.sortChinese;
xhb_plugin.changeScript;
xhb_plugin.addScript;
xhb_plugin.getDateArr;
xhb_plugin.conversionTime;
xhb_plugin.numToLetter;
xhb_plugin.clearCacheFn;
xhb_plugin._set_cookie;
xhb_plugin._get_cookie;
xhb_plugin._del_cookie;
xhb_plugin.getDOMTrueData;
xhb_plugin.getYesterdayDate;
xhb_plugin.stopEventBubble;
xhb_plugin.getVideoImg;
xhb_plugin.isLoad;
xhb_plugin.window_to_bottom_fn;
xhb_plugin.UTC_to_CTime;
xhb_plugin.getDaysInMonth;
xhb_plugin.getPrevDays;
xhb_plugin.getNextDays;
xhb_plugin.getWeekName;
xhb_plugin.resolvingDate;
xhb_plugin.addAnyTime;
xhb_plugin.desAnyTime;
xhb_plugin.get_string;
xhb_plugin.get_string2;
xhb_plugin.swapArr;
xhb_plugin.closeCurrPage;
xhb_plugin.max;
xhb_plugin.min;
xhb_plugin.time_to_Timestamp;
xhb_plugin.Timestamp_to_time;
xhb_plugin.isUnion;
xhb_plugin.arrAddFn;
xhb_plugin.arrDecFn;
xhb_plugin.canvasToBase64Fn;
xhb_plugin.downBase64Img;
xhb_plugin.addFileSelect;
xhb_plugin.del_arr_child;
xhb_plugin.getDaySortByDate;
xhb_plugin.toThNum;
xhb_plugin.checkIsDate;
xhb_plugin.getDayNumByYM;
xhb_plugin.getNumListByDate;
xhb_plugin.insidePolygon;
xhb_plugin.pointInsideCircle;
xhb_plugin.objExtend;
xhb_plugin.arrSortByObjProp;

// import xhb from './xhb.plugin.js'

console.log(xhb_plugin.getOnTime('y-m-d'));

module.exports = xhb_plugin;
