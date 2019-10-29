import request from '@/utils/request'

/**
 *  获取等级
 */

export function getRankList(query) {
    var url = '/rank?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
        // if (query.id) { // 评价id
        //     url += '&id=' + query.id
        // }
        // if (query.userId) { // 评价人(就是下单人)id
        //     url += '&userId=' + query.userId
        // }
        // if (query.orderId) { // 对应订单号
        //     url += '&orderId=' + query.orderId
        // }
        // if (query.type) { // 评价类型
        //     url += '&type=' + query.type
        // }
    return request({
        url: url,
        method: 'get'
    })
}

// 通过id获取等级
export function getRankById(id) {
    return request({
        url: '/rank/' + id,
        method: 'get'
    })
}

// 删除等级
export function delRank(unionid) {
    return request({
        url: '/rank/' + unionid,
        method: 'delete'
    })
}

// 修改等级
export function putRank(data) {
    return request({
        url: '/rank',
        method: 'put',
        data
    })
}