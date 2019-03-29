import { post } from '@/plugin/axios'

export function queryParentEvent(data) {
  return post('/event-api/parentEvent/queryParentEvent', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function deleteParentEvent(data) {
  return post('/event-api/parentEvent/deleteParentEvent', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function addParentEvent(data) {
  return post('/event-api/parentEvent/addParentEvent', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function updateParentEvent(data) {
  return post('/event-api/parentEvent/updateParentEvent', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}