// 栏目模块

import { column } from "../../api/api";

const content = {
	state: {
		columns: [], // 所有栏目
		//dataDictes: [] // 所有数据字典类型
	},
	mutations: {
		updateColumns(state, payload) {
			state.columns = payload.columns
		}
	},
	getters: {
		cascaderColumns: state => {
			if (!state.columns.length) {
				return [{ value: '', label: '空' }]
			}
			let arr = [];
			for (let column of state.columns) {
				arr[column.level] == undefined ? arr[column.level] = Array({ value: column.id, label: column.name, parentId: column.parentId }) : arr[column.level].push({ value: column.id, label: column.name, id: column.id, parentId: column.parentId })
			}
			for (let i = arr.length - 2; i > 0; i--) { // arr 数组没有arr[0],因为层级level是从 1 开始的； 循环 arr[3], arr[2],arr[1]
				for (let j = 0; j < arr[i].length; j++) { // 循环 arr[3]  arr[2], arr[1] 中的每一项
					for (let k = 0; k < arr[i + 1].length; k++) { // 循环 arr[4], arr[3],arr[2] 中的每一项
						if (arr[i + 1][k].parentId == arr[i][j].value) {
							arr[i][j].children == undefined ? arr[i][j].children = Array(arr[i + 1][k]) : arr[i][j].children.push(arr[i + 1][k])
						}
					}
				}
			}
			return [...arr[1], { value: '', label: '空' }];
		},
		keyValueColumns: state => {
			let obj = {}
			for (let column of state.columns) {
				obj[column.id] = column.name
			}
			return obj
		}
	},
	actions: {
		async getAllColumns({ commit }) {
			await column.getColumns.r({ pageSize: 1000, pageNum: 1, tenantCode: '1' }).then(res => {
				let result = res.data.data;
				commit('updateColumns', { columns: result.datas })
			})
		}
	}
}

export default content