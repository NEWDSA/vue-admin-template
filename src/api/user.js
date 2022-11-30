import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


/***
 * 智联结算登录
 */
// 登录
export function loginReq(data) {
  return request({
    url: '/lion-oauth2-authorization-serve/oauth/token',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: true
  })
}

// 用户信息
export function getInfoReq() {
  return request({
    url: `${userPath}/current/user/details`,
    method: 'get',
    isParams: true,
    isAlertErrorMsg: true
  })
}
