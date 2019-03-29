import Vue from 'vue'
import isArray from "lodash/isArray"
import log from './util.log'

const util = {
	log
}
 
util.baseUrl = 'http://192.168.3.70:8080' //http://192.168.3.70:8080
//sessionStorage  
util.session = function (key, value) {
	if (value === void (0)) {
		var lsVal = sessionStorage.getItem(key);
		if (lsVal && lsVal.indexOf('autostringify-') === 0) {
			return JSON.parse(lsVal.split('autostringify-')[1]);
		} else {
			return lsVal;
		}
	} else {
		if (typeof (value) === "object" || Array.isArray(value)) {
			value = 'autostringify-' + JSON.stringify(value);
		}
		return sessionStorage.setItem(key, value);
	}
} 
//生成随机数
util.getUUID = function (len) {
	len = len || 6;
	len = parseInt(len, 10);
	len = isNaN(len) ? 6 : len;
	var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
	var seedLen = seed.length - 1;
	var uuid = "";
	while (len--) {
		uuid += seed[Math.round(Math.random() * seedLen)];
	}
	return uuid;
};
//深拷贝
util.deepcopy = function (source) {
	if (!source) {
		return source;
	}
	let sourceCopy = source instanceof Array ? [] : {};
	for (let item in source) {
		sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
	}
	return sourceCopy;
};

//日期格式化
util.dateFormat = function (source, ignore_minute) {
	var myDate;
	var separate = '-';
	var minute = '';
	if (source === void (0)) {
		source = new Date();
	}
	if (source) {
		if (source.split) {
			source = source.replace(/\-/g, '/');
		} else if (isNaN(parseInt(source))) {
			source = source.toString().replace(/\-/g, '/');
		} else {
			source = new Date(source);
		}

		if (new Date(source) && (new Date(source)).getDate) {
			myDate = new Date(source);
			if (!ignore_minute) {
				minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
			}
			return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
		} else {
			return source.slice(0, 16);
		}
	} else {
		return source
	}
}
//对象转formdata格式
util.objToFormData = function(config) {
	let formData = new FormData();
	let obj = config.data;
	let arrayKey = config.arrayKey;
	for (var i in obj) {
		if (isArray(obj[i])) {
			obj[i].map(item => {
				if (!arrayKey) {
					formData.append(i, item)
				} else {
					formData.append(i + '[]', item)
				}
			})
		} else {
			formData.append(i, obj[i])
		}
	}
	return formData;
}
util.formatDateTime = function(date) {
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
}

// 更改标题
util.title = function (titleText) {
	const processTitle = process.env.VUE_APP_TITLE || '赛事管理平台'
	window.document.title = `${titleText ? `${titleText} | ` : ''}${processTitle}`
}

export default util
