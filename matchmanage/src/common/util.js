import Vue from 'vue'
 
//const baseUrl = 'http://192.168.3.70:8080' //http://192.168.3.70:8080
const baseUrl = 'http://172.16.1.177'
//sessionStorage  
const session = function (key, value) {
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
const getUUID = function (len) {
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
const deepcopy = function (source) {
	if (!source) {
		return source;
	}
	let sourceCopy = source instanceof Array ? [] : {};
	for (let item in source) {
		sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
	}
	return sourceCopy;
};
//菜单数据组织  将路由数据转化为 {xxxx, children: []} 嵌套的父子结构
const buildMenu = function (array, ckey) {
	let menuData = [];
	let indexKeys = Array.isArray(array) ? array.map((e) => { return e.id }) : [];
	ckey = ckey || 'parent_id';
	array.forEach(function (e) {
		//一级菜单
		if (!e[ckey] || (e[ckey] === e.id)) {
			delete e[ckey];
			menuData.push(deepcopy(e)); //深拷贝
		} else if (Array.isArray(indexKeys)) {
			//检测ckey有效性
			let parentIndex = indexKeys.findIndex(function (id) {
				return id == e[ckey];
			});
			if (parentIndex === -1) {
				menuData.push(e);
			}
		}
	});
	let findChildren = function (parentArr) {
		if (Array.isArray(parentArr) && parentArr.length) {
			parentArr.forEach(function (parentNode) {
				array.forEach(function (node) {
					if (parentNode.id === node[ckey]) {
						if (parentNode.children) {
							parentNode.children.push(node);
						} else {
							parentNode.children = [node];
						}
					}
				});
				if (parentNode.children) {
					findChildren(parentNode.children);
				}
			});
		}
	};
	findChildren(menuData);
	return menuData;
}
//日期格式化
const dateFormat = function (source, ignore_minute) {
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
};
//ajax错误处理
const catchError = function (error) {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				Vue.prototype.$message({
					message: error.response.data.message || '请求参数异常',
					type: 'error',
					duration: 2000,
				});
				break;
			case 401:
				sessionStorage.removeItem('user');
				Vue.prototype.$message({
					message: error.response.data.message || '密码错误或账号不存在！',
					type: 'warning',
					duration: 2000,
					onClose: function () {
						location.reload();
					}
				});
				break;
			case 403:
				Vue.prototype.$message({
					message: error.response.data.message || '无访问权限，请联系企业管理员',
					type: 'warning',
					duration: 2000,
				});
				break;
			default:
				Vue.prototype.$message({
					message: error.response.data.message || '服务端异常，请联系技术支持',
					type: 'error',
					duration: 2000,
				});
		}
	}else {
		Vue.prototype.$message({
			message: '服务端异常，请联系技术支持',
			type: 'error',
			duration: 2000,
		});
	}
	return Promise.reject(error);
}

export default {
	baseUrl,
	session,
	getUUID,
	deepcopy,
	buildMenu,
	dateFormat,
	catchError,
}
