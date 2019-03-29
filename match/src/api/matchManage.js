import { get, post } from '@/plugin/axios'

export function getMatchsByPage(data) {
  return post('/event-api/management/pageEvent', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function getListDicts(params) {
  return get('/event-api/base/listDictionary', params)
}

export function getEventPreview(params) {
  return get('/event-api/management/getEventPreview', params)
}

export function listDictionaryByPid(params) {
  return get('/event-api/base/listDictionaryByPid', params)
}

export function getTotalMatchs(data) {
  return post('/event-api/parentEvent/queryParentEvent', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function findEvent(params) {
  return get('event-api/management/findEvent', params)
}

export function publishEvent(params) {
  return get('event-api/management/publishEvent', params)
}

export function deleteEvent(params) {
  return get('event-api/management/deleteEvent', params)
}

export function enitStartEnroll(params) {
  return get('event-api/management/enitStartEnroll', params)
}

// 创建赛事 1. 新增赛事基本信息
export function addMatchBasicInfo(data) {
  return post('/event-api/management/addEvent', data, { 'Content-Type': 'multipart/form-data' })
}

// 创建赛事 2. 新增组别信息
export function addEventGroup(data) {
  return post('/event-api/eventGroup/addEventGroup', data)
}
// 创建赛事 2. 查询赛事组别信息
export function getListEventGroup(data) {
  return get('/event-api/eventGroup/listEventGroup', data)
}
// 创建赛事 2. 删除赛事组别信息
export function deleteEventGroup(params) {
  return get('/event-api/eventGroup/deleteEventGroup', params)
}

// 创建赛事 3. 新增信息组
export function addEventColumn(data) {
  return post('/event-api/eventColumn/addEventColumn', data)
}
// 创建赛事 3. 查询所有信息组
export function listEventColumn(data) {
  return post('/event-api/eventColumn/listEventColumn', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}
// 创建赛事 3. 删除信息组 字段
export function deleteEventColumn(params) {
  return get('/event-api/eventColumn/deleteEventColumn', params)
}

// 创建赛事 4. 新增规章
export function addEventRules(data) {
  return post('/event-api/management/saveEventRules', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}
// 创建赛事 4. 查询赛事规章
export function findEventRules(data) {
  return post('/event-api/management/findEventRules', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

// 创建赛事 5. 查询赛事资料
export function listEventInformation(params) {
  return get('event-api/management/listEventInformation', params)
}

// 创建赛事 5. 删除赛事资料
export function deleteEventInformation(params) {
  return get('event-api/management/deleteEventInformation', params)
}

// 创建赛事 5. 保存赛事上传的资料
export function addEventInformation(data) {
  return post('/event-api/management/saveEventInformation', data, { 'Content-Type': 'multipart/form-data' })
}

// 创建赛事 6. 保存赛事支持方
export function addEventEventSupports(data) {
  return post('/event-api/management/saveEventEventSupports', data, { 'Content-Type': 'multipart/form-data' })
}
// 创建赛事 6. 查询所有赛事支持方
export function listEventSupports(params) {
  return get('event-api/management/listEventSupports', params)
}
// 创建赛事 6. 删除赛事支持方
export function deleteEventSupports(params) {
  return get('event-api/management/deleteEventSupports', params)
}
