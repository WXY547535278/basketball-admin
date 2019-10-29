import request from '@/utils/request'

export function getApply(id) {
    return request({
        url: '/apply/' + id,
        method: 'get'
    })
}

/**
 * 获取升级审核列表
 * @param {obj} data 查询条件
 */
export function getApplyList(query) {
    var url = '/apply?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.orderId) { // 对应订单id
        url += '&orderId=' + query.orderId
    }
    if (query.masterName) { // 审核人名字
        url += '&masterName=' + query.masterName
    }
    if (query.masterPhone) { // 审核人 电话
        url += '&masterPhone=' + query.masterPhone
    }
    if (query.leekName) { // 申请人 名字
        url += '&leekName=' + query.leekName
    }
    if (query.leekPhone) { // 申请人 电话
        url += '&leekPhone=' + query.leekPhone
    }
    if (query.status) { // 投诉状态
        url += '&status=' + query.status
    }
    if (query.type) { // 审核类型
        url += '&type=' + query.type
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 新增
export function postApply(data) {
    return request({
        url: '/apply',
        method: 'post',
        data: data
    })
}
// 申诉投诉
export function putApply(id, status) {
    return request({
        url: '/apply/apply/' + id + '/' + status,
        method: 'put',
        data: {}
    })
}
// 删除
export function deleteApply(id) {
    return request({
        url: '/apply/' + id,
        method: 'delete'
    })
}