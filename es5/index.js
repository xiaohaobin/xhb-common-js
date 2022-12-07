'use strict';

var oComFn = {
	/**
  * 动态添加外部js和删除原js，js加载完成，执行回调
  * @param {String} url       script的src的地址,要动态添加的脚本地址
  * @param {Function} callback  回调函数执行
  * @param {String} srckey    要删除的原脚本地址（虽然删除，方法还在）
  * */
	changeScript: function changeScript(url, srckey, callback) {

		// 删除之前的script
		var scripts = document.querySelectorAll('script');
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = scripts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _script = _step.value;

				if (_script.src.includes(srckey)) {
					_script.parentNode.removeChild(_script);
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		document.execCommand('Refresh');

		// 重新创建script
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.defer = true;
		if (script.readyState) {
			// IE
			script.onreadystatechange = function () {
				if (script.readyState === "loaded" || script.readyState === "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			// Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
};