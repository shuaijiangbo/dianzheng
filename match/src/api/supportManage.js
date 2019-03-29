import { post } from '@/plugin/axios'

export function enitEventSupport(data) {
  return post('event-api/management/enitEventSupport', data, { 'Content-Type': 'multipart/form-data' })
}

export function pageEventSupport(data) {
  return post('event-api/management/pageEventSupport', data)
}