import { post } from '@/plugin/axios'

export function queryScore(data) {
  return post('/event-api/score/queryScore', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function issueScore(data) {
  return post('/event-api/score/issueScore', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

export function updateScore(data) {
  return post('/event-api/score/updateScore', data, { 'Content-Type': 'application/x-www-form-urlencoded' })
}