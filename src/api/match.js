import request from '@/utils/request'

export function getMatch(id) {
  return request({
    url: '/match/' + id,
    method: 'get'
  })
}

/**
 * 获取球队列表
 * @param {obj} data 查询条件
 */
export function getMatchList(query) {
  var url = '/match?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.id) { // 球队id
    url += '&id=' + query.id
  }
  if (query.status) { // 比赛状态
    url += '&status=' + query.status
  }
  if (query.now) { // 根据时间查询
    url += '&now=' + query.now
  }
  return request({
    url: url,
    method: 'get'
  })
}
// 删除
export function deleteMatch(id) {
  return request({
    url: '/match/' + id,
    method: 'delete'
  })
}

// 修改
export function putMatch(data) {
  return request({
    url: '/match',
    method: 'put',
    data
  })
}
