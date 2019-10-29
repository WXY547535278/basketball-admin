import request from '@/utils/request'

export function getGalleryType(id) {
    return request({
        url: '/galleryType/' + id,
        method: 'get'
    })
}

/**
 * 获取轮播图列表
 * @param {obj} data 查询条件
 */
export function getGalleryTypeList(query) {
    var url = '/galleryType?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
        // if (query.type) {
        //     url += '&type=' + query.type
        // }
    return request({
        url: url,
        method: 'get'
    })
}

// 新增
export function postGalleryType(data) {
    return request({
        url: '/galleryType',
        method: 'post',
        data: data
    })
}
// 修改
export function putGalleryType(data) {
    return request({
        url: '/galleryType',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteGalleryType(id) {
    return request({
        url: '/galleryType/' + id,
        method: 'delete'
    })
}