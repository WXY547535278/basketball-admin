import request from '@/utils/request'
/**
 *  获取用户团队
 */

export function getUserTeam(query) {
  var url = '/team?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.userId) { // 用户id
    url += '&userId=' + query.userId
  }
  if (query.leekId) { // 下级id
    url += '&leekId=' + query.leekId
  }
  if (query.leekRank) { // 下级等级
    url += '&leekRank=' + query.leekRank
  }
  if (query.type) { // 下级类型
    url += '&type=' + query.type
  }
  if (query.masterRank) { // 上级的等级
    url += '&masterRank=' + query.masterRank
  }
  if (query.leekStatus) { // 下级状态
    url += '&leekStatus=' + query.leekStatus
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 通过id获取用户列表
export function getUserTeamById(id) {
  return request({
    url: '/team/' + id,
    method: 'get'
  })
}

// 删除用户
export function delUserTeam(unionid) {
  return request({
    url: '/team/' + unionid,
    method: 'delete'
  })
}
