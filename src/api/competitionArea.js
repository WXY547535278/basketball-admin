import request from '@/utils/request'

/**
 *  获取赛区列表
 */

export function getCompetitionAreaList(query) {
  var url = '/competitionArea?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.id) { // id
    url += '&id=' + query.id
  }
  if (query.name) { // 赛区名
    url += '&name=' + query.name
  }
  if (query.derail) { // 开关
    url += '&derail=' + query.derail
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 通过id获取赛区详情
export function getCompetitionAreaById(id) {
  return request({
    url: '/competitionArea/' + id,
    method: 'get'
  })
}

// 删除赛区
export function delCompetitionArea(unionid) {
  return request({
    url: '/competitionArea/' + unionid,
    method: 'delete'
  })
}

// 修改赛区
export function putCompetitionArea(data) {
  return request({
    url: '/competitionArea',
    method: 'put',
    data
  })
}

// 新增赛区
export function postCompetitionArea(data) {
  return request({
    url: '/competitionArea',
    method: 'post',
    data
  })
}
