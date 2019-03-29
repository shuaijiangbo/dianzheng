import axios from 'axios';
import util from '@/common/util.js'
import Vue from 'vue'

var qs = require('qs');
axios.defaults.timeout = 15000;
axios.defaults.baseURL = util.baseUrl;

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
	return response;
}, util.catchError)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {

		axios.get(url, {
			params: params
		})
			.then(response => {
				if (response.data.status !== 200) {
					switch (response.data.status) {
						case 400:
							Vue.prototype.$message({
								message: response.data.message || '请求参数异常',
								type: 'error',
								duration: 1500,
							});
							break;
						case 401:
							sessionStorage.removeItem('user');
							Vue.prototype.$message({
								message: response.data.message || '密码错误或账号不存在！',
								type: 'warning',
								duration: 1500,
								onClose: function () {
									location.reload();
								}
							});
							break;
						case 403:
							Vue.prototype.$message({
								message: response.data.message || '无访问权限，请联系企业管理员',
								type: 'warning',
								duration: 1500,
							});
							break;
						default:
							Vue.prototype.$message({
								message: response.data.message || '服务端异常，请联系技术支持',
								type: 'error',
								duration: 1500,
							});
					}
					return reject(response);
				}
				resolve(response)
			})
			.catch(err => {
				reject(err)
			})
	})
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data, headers) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url,
			data,
			headers
		})
			.then(response => {
				if (response.data.status !== 200) {
					switch (response.data.status) {
						case 400:
							Vue.prototype.$message({
								message: response.data.message || '请求参数异常',
								type: 'error',
								duration: 1500,
							});
							break;
						case 401:
							sessionStorage.removeItem('user');
							Vue.prototype.$message({
								message: response.data.message || '密码错误或账号不存在！',
								type: 'warning',
								duration: 1500,
								onClose: function () {
									location.reload();
								}
							});
							break;
						case 403:
							Vue.prototype.$message({
								message: response.data.message || '无访问权限，请联系企业管理员',
								type: 'warning',
								duration: 1500,
							});
							break;
						default:
							Vue.prototype.$message({
								message: response.data.message || '服务端异常，请联系技术支持',
								type: 'error',
								duration: 1500,
							});
					}
					return reject(response.data);
				}
				resolve(response.data)
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

