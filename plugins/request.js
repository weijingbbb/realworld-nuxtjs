// 基于axios封闭的请求模块
import axios from 'axios'

export const request = axios.create({
    // baseURL: 'https://api.realworld.io'
    baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 通过插件机制获取到上下文
export default ({ store }) => {

    // 请求拦截器
    request.interceptors.request.use(function (config) {

        const { user } = store.state
        if (user && user.token){
        config.headers.Authorization = `Token ${user.token}`
    }

    return config;
}, function (error) {
    // 如果请求失败（此时请求还没有发出去），就会进入这里
    return Promise.reject(error);
})

}



// 响应拦截器

