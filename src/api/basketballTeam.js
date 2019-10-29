import request from '@/utils/request'

export function getTeam(id) {
  return request({
    url: '/team/' + id,
    method: 'get'
  })
}

/**
 * 获取球队列表
 * @param {obj} data 查询条件
 */
export function getTeamList(query) {
  var url = '/team?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.id) { // 球队id
    url += '&id=' + query.id
  }
  if (query.status) { // 球队的申请状态
    url += '&status=' + query.status
  }
  if (query.name) { // 球队名
    url += '&name=' + query.name
  }
  if (query.phone) { // 球队联系电话
    url += '&phone=' + query.phone
  }
  return request({
    url: url,
    method: 'get'
  })
}
// 获取球队的队员
export function getPlayer(id) {
  return request({
    url: '/player?teamId=' + id,
    method: 'get'
  })
}
// 删除
export function deleteTeam(id) {
  return request({
    url: '/team/' + id,
    method: 'delete'
  })
}

// 修改
export function putTeam(data) {
  return request({
    url: '/team',
    method: 'put',
    data
  })
}
