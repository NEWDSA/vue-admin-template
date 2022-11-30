import request from '@/utils/request'
import qs from 'qs'

/***
 * 项目管理 api
 * params
 */


// 项目
 export function getProject(params) {
  return request({
    baseURL:process.env.VUE_APP_DEV_ZHI,
    ...params
  })
}
