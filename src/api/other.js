import request from '@/utils/request'

/**
 *  获取素材列表
 */

export function getOtherLists(query) {
    var url = '/material?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.type) { // 评价类型
        url += '&type=' + query.type
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 通过id获取素材
export function getOtherById(id) {
    return request({
        url: '/material/' + id,
        method: 'get'
    })
}
// 新增
export function postOther(data) {
    return request({
        url: '/material',
        method: 'post',
        data: data
    })
}
// 修改
export function putOther(data) {
    return request({
        url: '/material',
        method: 'put',
        data: data
    })
}
// 删除素材
export function delOther(unionid) {
    return request({
        url: '/material/' + unionid,
        method: 'delete'
    })
}