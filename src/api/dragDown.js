import request from '@/utils/request'

/**
 *  获取用户列表
 */

export function getdragDownList(query) {
    var url = '/dragDown?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.id) { // 用户id
        url += '&id=' + query.id
    }
    if (query.userId) { // 用户id
        url += '&userId=' + query.userId
    }
    if (query.leekId) { // 下级用户id
        url += '&leekId=' + query.leekId
    }
    return request({
        url: url,
        method: 'get'
    })
}