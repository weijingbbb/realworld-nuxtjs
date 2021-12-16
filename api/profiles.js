import { request } from '@/plugins/request'

// 获取个人资料
export const getProfiles = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`,
    })
}