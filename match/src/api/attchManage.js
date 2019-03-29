import { get, post } from '@/plugin/axios'

export function pageEventFile(data) {
  return post('/event-api/management/pageEventFile', data, { 'Content-Type': 'multipart/form-data' })
}