import request from '@/utils/request'

export function getComplaint(id) {
    return request({
        url: '/complaint/' + id,
        method: 'get'
    })
}

/**
 * 获取投诉列表
 * @param {obj} data 查询条件
 */
export function getComplaintList(query) {
    var url = '/complaint?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.masterId) { // 投诉人id
        url += '&masterId=' + query.masterId
    }
    if (query.slaverId) { // 被投诉人id
        url += '&slaverId=' + query.slaverId
    }
    if (query.masterName) { // 投诉人 姓名
        url += '&masterName=' + query.masterName
    }
    if (query.masterPhone) { // 投诉人 电话
        url += '&masterPhone=' + query.masterPhone
    }
    if (query.slaverName) { // 被投诉人 姓名
        url += '&slaverName=' + query.slaverName
    }
    if (query.slaverPhone) { // 被投诉人电话
        url += '&slaverPhone=' + query.slaverPhone
    }
    if (query.status) { // 投诉状态
        url += '&status=' + query.status
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 新增
export function postComplaint(data) {
    return request({
        url: '/complaint',
        method: 'post',
        data: data
    })
}
// 申诉投诉
export function putComplaint(id, status) {
    return request({
        url: '/complaint/apply/' + id + '/' + status,
        method: 'put',
        data: {}
    })
}
// 删除
export function deleteComplaint(id) {
    return request({
        url: '/complaint/' + id,
        method: 'delete'
    })
}