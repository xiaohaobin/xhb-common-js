const oComFn = {
	/**
	 * 动态添加外部js和删除原js，js加载完成，执行回调
	 * @param {String} url       script的src的地址,要动态添加的脚本地址
	 * @param {Function} callback  回调函数执行
	 * @param {String} srckey    要删除的原脚本地址（虽然删除，方法还在）
	 * */
	changeScript: function(url, srckey, callback) {
	
			// 删除之前的script
			const scripts = document.querySelectorAll('script');
			for(const script of scripts) {
				if(script.src.includes(srckey)) {
					script.parentNode.removeChild(script);
				}
			}
			document.execCommand('Refresh');
	
			// 重新创建script
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;
			script.defer = true;
			if(script.readyState) { // IE
				script.onreadystatechange = function() {
					if(script.readyState === "loaded" || script.readyState === "complete") {
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
};