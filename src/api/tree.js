import request from '@/utils/request'

/**
 *  获取组织架构列表
 */

export function getTreeList(query) {
    var url = '/tree?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.id) { // 用户id
        url += '&id=' + query.id
    }
    if (query.userId) { // 上级id
        url += '&userId=' + query.userId
    }
    if (query.leekId) { // 下级id
        url += '&leekId=' + query.leekId
    }
    if (query.rank) { // 等级
        url += '&rank=' + query.rank
    }
    if (query.leekPhone) { // 下级电话
        url += '&leekPhone=' + query.leekPhone
    }
    if (query.leekStatus) { // 下级(自己)状态
        url += '&leekStatus=' + query.leekStatus
    }
    return request({
        url: url,
        method: 'get'
    })
}