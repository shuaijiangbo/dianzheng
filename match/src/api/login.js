import { get, post } from '@/plugin/axios'

export function AccountLogin (data) {
  return post('uc-api/system/orgLogin', data)
}