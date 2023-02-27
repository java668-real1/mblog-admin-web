import request from '@/utils/mblog-request'

export function fetchList(params) {
  return request({
    url: '/user/page',
    method: 'get',
    params: params
  })
}
