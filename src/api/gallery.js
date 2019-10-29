import request from '@/utils/request'

export function getGallery(id) {
  return request({
    url: '/gallery/' + id,
    method: 'get'
  })
}

/**
 * 获取轮播图列表
 * @param {obj} data 查询条件
 */
export function getGalleryList(query) {
  var url = '/gallery?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.textLike) {
    url += '&textLike=' + query.textLike
  }
  if (query.typeId) {
    url += '&typeId=' + query.typeId
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 新增
export function postGallery(data) {
  return request({
    url: '/gallery',
    method: 'post',
    data: data
  })
}
// 修改
export function putGallery(data) {
  return request({
    url: '/gallery',
    method: 'put',
    data: data
  })
}
// 修改对应图库类型的图库顺序
export function reverseOrder(typeId) {
  return request({
    url: '/gallery/reverseOrder/' + typeId,
    method: 'put'
  })
}
// 删除
export function deleteGallery(id) {
  return request({
    url: '/gallery/' + id,
    method: 'delete'
  })
}
