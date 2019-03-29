import { post } from '@/plugin/axios'

export function queryPageEnroll(data) {
  return post('/event-api/enroll/queryPageEnroll', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function queryEnrollForUniqueIdentifier(data) {
  return post('/event-api/enroll/queryEnrollForUniqueIdentifier', data)
}

export function queryEnrollData(data) {
  return post('/event-api/enroll/queryEnrollData', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function queryEnroll(data) {
  return post('/event-api/enroll/queryEnroll', data)
}

export function listEnroll(data) {
  return post('/event-api/enroll/listEnroll', data)
}

export function excelExportEnroll(data) {
  return post('/event-api/enroll/excelExportEnroll', data, { 'Content-Type': 'application/x-www-form-urlencoded', 'responseType': 'blob' })
}

export function updateAudit(data) {
  return post('/event-api/enroll/updateAudit', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function queryEnrollForEnrollNum(data) {
  return post('/event-api/enroll/queryEnrollForEnrollNum', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}
