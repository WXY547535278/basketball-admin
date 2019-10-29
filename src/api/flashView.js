import request from '@/utils/request'

export function getFlashView(id) {
  return request({
    url: '/flashView/' + id,
    method: 'get'
  })
}

/**
 * 获取轮播图列表
 * @param {obj} data 查询条件
 */
export function getFlashViewList(query) {
  var url = '/flashView?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  // if (query.type) {
  //     url += '&type=' + query.type
  // }
  return request({
    url: url,
    method: 'get'
  })
}

// 新增
export function postFlashView(data) {
  return request({
    url: '/flashView',
    method: 'post',
    data: data
  })
}
// 修改
export function putFlashView(data) {
  return request({
    url: '/flashView',
    method: 'put',
    data: data
  })
}
// 删除
export function deleteFlashView(id) {
  return request({
    url: '/flashView/' + id,
    method: 'delete'
  })
}
