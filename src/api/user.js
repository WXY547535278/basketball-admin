import request from '@/utils/request'
/**
 * 管理员登录
 */
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

/**
 *  获取用户列表
 */

export function getUserList(query) {
  var url = '/user?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.id) { // 用户id
    url += '&id=' + query.id
  }
  if (query.name) { // 用户姓名
    url += '&name=' + query.name
  }
  if (query.phone) { // 手机号
    url += '&phone=' + query.phone
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 通过id获取用户列表
export function getUserById(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}
// 新增平台用户
export function postUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}
// 修改平台用户
export function putUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(unionid) {
  return request({
    url: '/user/' + unionid,
    method: 'delete'
  })
}

// 发送短信
export function sendMsgToOne(data) {
  return request({
    url: '/sms',
    method: 'post',
    data
  })
}
