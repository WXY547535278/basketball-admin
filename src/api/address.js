import request from '@/utils/request'

/**
 *  获取地址列表
 */

export function getAddressList(query) {
    var url = '/address?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.id) { // 评价id
        url += '&id=' + query.id
    }
    if (query.userId) { // 评价人(就是下单人)id
        url += '&userId=' + query.userId
    }
    if (query.orderId) { // 对应订单号
        url += '&orderId=' + query.orderId
    }
    if (query.type) { // 评价类型
        url += '&type=' + query.type
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 通过id获取地址详情
export function getAddressById(id) {
    return request({
        url: '/address/' + id,
        method: 'get'
    })
}

// 删除地址
export function delAddress(unionid) {
    return request({
        url: '/address/' + unionid,
        method: 'delete'
    })
}