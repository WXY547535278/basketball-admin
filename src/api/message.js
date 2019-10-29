import request from '@/utils/request'

/**
 *  获取短信列表
 */

export function getMessageList(query) {
  var url = '/sms?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  // if (query.status) {
  //   url += '&status=' + query.status
  // }
  if (query.phone) { // 手机号
    url += '&phone=' + query.phone
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 通过id获取短信详情
export function getMessageById(id) {
  return request({
    url: '/sms/' + id,
    method: 'get'
  })
}

// 删除短信
export function delMessage(unionid) {
  return request({
    url: '/sms/' + unionid,
    method: 'delete'
  })
}

// 发送短信
export function SendMessage(param) {
  return request({
    url: '/sms/batch?param=' + param,
    method: 'post'
  })
}
