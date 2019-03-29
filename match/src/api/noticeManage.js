import { get, post } from '@/plugin/axios'

export function pageEventNotice(data) {
  return post('/event-api/management/pageEventNotice', data, { 'Content-Type': 'multipart/form-data' })
}

export function addEventNotice(data) {
  return post('/event-api/management/addEventNotice', data, { 'Content-Type': 'multipart/form-data' })
}

export function deleteEventNotice(data) {
  return get('/event-api/management/deleteEventNotice', data)
}

export function publishEventNotice(params) {
  return get('/event-api/management/publishEventNotice', params)
}

export function enitEventNotice(data) {
  return post('/event-api/management/enitEventNotice', data, { 'Content-Type': 'multipart/form-data' })
}