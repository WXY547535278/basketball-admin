import request from '@/utils/request'

export function getOrder(id) {
    return request({
        url: '/order/' + id,
        method: 'get'
    })
}

/**
 * 获取升级订单列表
 * @param {obj} data 查询条件
 */
export function getOrderList(query) {
    var url = '/order?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.id) { // 订单id
        url += '&id=' + query.id
    }
    if (query.leekName) { // 下单人id
        url += '&leekName=' + query.leekName
    }
    if (query.leekPhone) { // 订单id
        url += '&leekPhone=' + query.leekPhone
    }
    if (query.leekId) { // 下单人id
        url += '&leekId=' + query.leekId
    }
    if (query.shopId) { // 购买的店铺id
        url += '&shopId=' + query.shopId
    }
    if (query.rank) { // 下单人当前等级
        url += '&rank=' + query.rank
    }
    if (query.deliveryType) { // 配送类型
        url += '&deliveryType=' + query.deliveryType
    }
    if (query.status) { // 订单状态
        url += '&status=' + query.status
    }
    return request({
        url: url,
        method: 'get'
    })
}
// 获取订单详情
export function getOrderDetail(id) {
    return request({
        url: '/orderDetail?orderId=' + id,
        method: 'get'
    })
}
// 删除
export function deleteOrder(id) {
    return request({
        url: '/order/' + id,
        method: 'delete'
    })
}