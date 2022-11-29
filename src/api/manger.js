import request from '@/utils/request'
import qs from 'qs'
// post
export function postAction(url, parameter) {
  return request({
    url: url,
    method: 'post',
    data: parameter
  })
}

// get
export function getAction(params) {
  return request({
    baseURL:process.env.VUE_APP_DEV_API,
    ...params
  })
}

// get
export async function getActionAsync(url, parameter) {
  var result = await request({
    url: url,
    method: 'get',
    params: parameter
  })
  return result
}
