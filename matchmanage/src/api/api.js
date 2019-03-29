import axios from 'axios';

import { get, post} from './fetch.js'

// 系统登录
export const system = {
    dologin: { r: params => post('/auth-api/sports-auth/back/dologin', params)},
    getResource: { r: params => post('/auth-api/sports-auth/back/getResource', params)}
}
 
// 用户角色
export const userrole = {
    insertRole: { p: ['post,/uc-api/sports-uc/userrole/addOrUpdate'], r: params => post('/uc-api/sports-uc/userrole/addOrUpdate', params)},
    getUserRole: { p: ['post,/uc-api/sports-uc/userrole/getUserRole'], r: params => post('/uc-api/sports-uc/userrole/getUserRole', params)},
}

// 角色资源
export const roleresource = {
    insertResource: { p: ['post,/uc-api/sports-uc/roleresource/addOrUpdate'], r: params => post('/uc-api/sports-uc/roleresource/addOrUpdate', params)},
    getRoleResource: { p: ['post,/uc-api/sports-uc/roleresource/getRoleResource'], r: params => post('/uc-api/sports-uc/roleresource/getRoleResource', params)},
}

// 权限/资源管理
export const resource = {
    addResource: { p: ['post,/uc-api/sports-uc/resource/add'], r: params => post('/uc-api/sports-uc/resource/add', params)},
    deleteResource: { p: ['post,/uc-api/sports-uc/resource/delete'], r: params => post('/uc-api/sports-uc/resource/delete', params)},
    detailResource: { p: ['post,/uc-api/sports-uc/resource/detail'], r: params => post('/uc-api/sports-uc/resource/detail', params)},
    getResources: { p: ['get,/uc-api/sports-uc/resource/list'], r: params => get('/uc-api/sports-uc/resource/list', params)},
    updateResource: { p: ['post,/uc-api/sports-uc/resource/update'], r: params => post('/uc-api/sports-uc/resource/update', params)},
    batchDelete: { p: ['post,/uc-api/sports-uc/resource/batchDelete'], r: params => post('/uc-api/sports-uc/resource/batchDelete', params) },
}

// 角色管理
export const role = {
    addRole: { p: ['post,/uc-api/sports-uc/role/add'], r: params => post('/uc-api/sports-uc/role/add', params)},
    deleteRole: { p: ['post,/uc-api/sports-uc/role/delete'], r: params => post('/uc-api/sports-uc/role/delete', params)},
    detailRole: { p: ['post,/uc-api/sports-uc/role/detail'], r: params => post('/uc-api/sports-uc/role/detail', params)},
    getRoles: { p: ['get,/uc-api/sports-uc/role/list'], r: params => get('/uc-api/sports-uc/role/list', params)},
    updateRole: { p: ['post,/uc-api/sports-uc/role/update'], r: params => post('/uc-api/sports-uc/role/update', params)},
    batchDelete: { p: ['post,/uc-api/sports-uc/role/batchDelete'], r: params => post('/uc-api/sports-uc/role/batchDelete', params) },
}


// 用户管理
export const user = {
    addUser: { p: ['post,/uc-api/sports-uc/user/add'], r: params => post('/uc-api/sports-uc/user/add', params)},
    deleteUser: { p: ['post,/uc-api/sports-uc/user/delete'], r: params => post('/uc-api/sports-uc/user/delete', params)},
    detailUser: { p: ['post,/uc-api/sports-uc/user/detail'], r: params => post('/uc-api/sports-uc/user/detail', params)},
    getUserRoleResource: { p: ['post,/uc-api/sports-uc/user/getUserRoleResource'], r: params => post('/uc-api/sports-uc/user/getUserRoleResource', params)},
    getUsers: { p: ['get,/uc-api/sports-uc/user/list'], r: params => get('/uc-api/sports-uc/user/list', params)},
    updateUser: { p: ['post,/uc-api/sports-uc/user/update'], r: params => post('/uc-api/sports-uc/user/update', params)},
    batchDelete: { p: ['post,/uc-api/sports-uc/user/batchDelete'], r: params => post('/uc-api/sports-uc/user/batchDelete', params) },
}

// 文章
export const article = {
    addArticle: { p: ['post,/cms-api/sports-cms/article/add'], r: (params, headers = {}) => post('/cms-api/sports-cms/article/add', params, headers)},
    deleteArticle: { p: ['post,/cms-api/sports-cms/article/delete'], r: params => post('/cms-api/sports-cms/article/delete', params)},
    updateArticle: { p: ['post,/cms-api/sports-cms/article/update'], r: params => post('/cms-api/sports-cms/article/update', params)},
    getArticle: { p: ['post,/cms-api/sports-cms/article/detail'], r: params => post('/cms-api/sports-cms/article/detail', params)},
    getArticles: { p: ['get,/cms-api/sports-cms/article/list'], r: params => get('/cms-api/sports-cms/article/list', params)},
    auditArticles: { p: ['post,/cms-api/sports-cms/article/audit'], r: params => post('/cms-api/sports-cms/article/audit', params)},
    submitArticles: { p: ['post,/cms-api/sports-cms/article/submit'], r: params => post('/cms-api/sports-cms/article/submit', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/article/batchDelete'], r: params => post('/cms-api/sports-cms/article/batchDelete', params)},
}

// 栏目
export const column = {
    addColumn: { p: ['post,/cms-api/sports-cms/column/add'], r: (params, headers = {}) => post('/cms-api/sports-cms/column/add', params, headers)},
    deleteColumn: { p: ['post,/cms-api/sports-cms/column/delete'], r: (params, headers = {}) => post('/cms-api/sports-cms/column/delete', params, headers) },
    updateColumn: { p: ['post,/cms-api/sports-cms/column/update'], r: (params, headers = {}) => post('/cms-api/sports-cms/column/update', params, headers)},
    getColumn: { p: ['post,/cms-api/sports-cms/column/detail'], r: params => post('/cms-api/sports-cms/column/detail', params)},
    getColumns: { p: ['get,/cms-api/sports-cms/column/list'], r: params => get('/cms-api/sports-cms/column/list', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/column/batchDelete'], r: params => post('/cms-api/sports-cms/column/batchDelete', params)},
    getParents: { p: ['get,/cms-api/sports-cms/column/parents'], r: params => get('/cms-api/sports-cms/column/parents', params)},
    offline: { p: ['post,/cms-api/sports-cms/column/offline'], r: params => post('/cms-api/sports-cms/column/offline', params)},
    online: { p: ['post,/cms-api/sports-cms/column/online'], r: params => post('/cms-api/sports-cms/column/online', params)},
}

// 视频
export const video = {
    addVideo: { p: ['post,/cms-api/sports-cms/video/add'], r: params => post('/cms-api/sports-cms/video/add', params)},
    deleteVideo: { p: ['post,/cms-api/sports-cms/video/delete'], r: params => post('/cms-api/sports-cms/video/delete', params)},
    updateVideo: { p: ['post,/cms-api/sports-cms/video/update'], r: params => post('/cms-api/sports-cms/video/update', params) },
    getVideo: { p: ['post,/cms-api/sports-cms/video/detail'], r: params => post('/cms-api/sports-cms/video/detail', params)},
    getVideos: { p: ['get,/cms-api/sports-cms/video/list'], r: params => get('/cms-api/sports-cms/video/list', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/video/batchDelete'], r: params => post('/cms-api/sports-cms/video/batchDelete', params)},
    auditVideo: { p: ['post,/cms-api/sports-cms/video/audit'], r: params => post('/cms-api/sports-cms/video/audit', params)},
    submitVideo: { p: ['post,/cms-api/sports-cms/video/submit'], r: params => post('/cms-api/sports-cms/video/submit', params)},
}

// 图集
export const atlas = {
    addImage: { p: ['post,/cms-api/sports-cms/imageCollection/add'], r: params => post('/cms-api/sports-cms/imageCollection/add', params)},
    deleteImage: { p: ['post,/cms-api/sports-cms/imageCollection/delete'], r: params => post('/cms-api/sports-cms/imageCollection/delete', params)},
    updateImage: { p: ['post,/cms-api/sports-cms/imageCollection/update'], r: params => post('/cms-api/sports-cms/imageCollection/update', params)},
    getImage: { p: ['post,/cms-api/sports-cms/imageCollection/detail'], r: params => post('/cms-api/sports-cms/imageCollection/detail', params)},
    getImages: { p: ['get,/cms-api/sports-cms/imageCollection/list'], r: params => get('/cms-api/sports-cms/imageCollection/list', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/imageCollection/batchDelete'], r: params => post('/cms-api/sports-cms/imageCollection/batchDelete', params)},
    auditImages: { p: ['post,/cms-api/sports-cms/imageCollection/audit'], r: params => post('/cms-api/sports-cms/imageCollection/audit', params)},
    submitImages: { p: ['post,/cms-api/sports-cms/imageCollection/submit'], r: params => post('/cms-api/sports-cms/imageCollection/submit', params)},
}

// 图片
export const image = {
    addImage: { p: ['post,/cms-api/sports-cms/image/add'], r: params => post('/cms-api/sports-cms/image/add', params)},
    batchAddImage: { p: ['post,/cms-api/sports-cms/image/batchAdd'], r: (params, headers = {}) => post('/cms-api/sports-cms/image/batchAdd', params, headers)},
    getImages: { p: ['get,/cms-api/sports-cms/image/list'], r: params => get('/cms-api/sports-cms/image/list', params)},
    deleteImage: { p: ['post,/cms-api/sports-cms/image/delete'], r: params => post('/cms-api/sports-cms/image/delete', params)}
}

// 附件/资料
export const attachmente = {
    addDatum: { p: ['post,/cms-api/sports-cms/datum/add'], r: params => post('/cms-api/sports-cms/datum/add', params)},
    deleteDatum: { p: ['post,/cms-api/sports-cms/datum/delete'], r: params => post('/cms-api/sports-cms/datum/delete', params)},
    updateDatum: { p: ['post,/cms-api/sports-cms/datum/update'], r: params => post('/cms-api/sports-cms/datum/update', params)},
    getDatum: { p: ['post,/cms-api/sports-cms/datum/detail'], r: params => post('/cms-api/sports-cms/datum/detail', params)},
    getDatums: { p: ['get,/cms-api/sports-cms/datum/list'], r: params => get('/cms-api/sports-cms/datum/list', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/datum/batchDelete'], r: params => post('/cms-api/sports-cms/datum/batchDelete', params)},
    auditDatum: { p: ['post,/cms-api/sports-cms/datum/audit'], r: params => post('/cms-api/sports-cms/datum/audit', params)},
    submitDatum: { p: ['post,/cms-api/sports-cms/datum/submit'], r: params => post('/cms-api/sports-cms/datum/submit', params)},
}

// 数据字典类型
export const dataDictType = {
    addDataDictType: { p: ['post,/cms-api/sports-cms/cms/dataDictType/add'], r: params => post('/cms-api/sports-cms/cms/dataDictType/add', params)},
    deleteDataDictType: { p: ['post,/cms-api/sports-cms/cms/dataDictType/delete'], r: params => post('/cms-api/sports-cms/cms/dataDictType/delete', params)},
    updateDataDictType: { p: ['post,/cms-api/sports-cms/cms/dataDictType/update'], r: params => post('/cms-api/sports-cms/cms/dataDictType/update', params)},
    getDataDictTypes: { p: ['get,/cms-api/sports-cms/cms/dataDictType/list'], r: params => get('/cms-api/sports-cms/cms/dataDictType/list', params)},
    getDataDictType: { p: ['get,/cms-api/sports-cms/cms/dataDictType'], r: params => get('/cms-api/sports-cms/cms/dataDictType', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/dataDictType/batchDelete'], r: params => post('/cms-api/cms-api/sports-cms/cms/dataDictType/batchDelete', params)},
}

// 数据字典
export const dataDict = { 
    addDataDict: { p: ['post,/cms-api/sports-cms/cms/dataDict/add'], r: params => post('/cms-api/sports-cms/cms/dataDict/add', params)},
    deleteDataDictById: { p: ['post,/cms-api/sports-cms/cms/dataDict/delete'], r: params => post('/cms-api/sports-cms/cms/dataDict/delete', params)},
    updateDataDict: { p: ['post,/cms-api/sports-cms/cms/dataDict/update'], r: params => post('/cms-api/sports-cms/cms/dataDict/update', params)},
    getDataDictDatagrid: { p: ['get,/getDataDictDatagrid'], r: params => get('/getDataDictDatagrid', params)},
    getDataDictList: { p: ['get,/cms-api/sports-cms/cms/dataDict/list'], r: params => get('/cms-api/sports-cms/cms/dataDict/list', params)},
    selectDataDictById: { p: ['get,/selectDataDictById'], r: params => get('/selectDataDictById', params)},
    batchDelete: { p: ['post,/cms-api/sports-cms/cms/dataDict/batchDelete'], r: params => post('/cms-api/sports-cms/cms/dataDict/batchDelete', params)},

}



