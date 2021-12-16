
// 基于axios封闭的请求模块
import axios from 'axios'


const q = 'https://api.realworld.io'
const q2 = 'https://conduit.productionready.io'

const request = axios.create({
    baseURL: 'https://api.realworld.io'
})

// 请求拦截器
request.interceptors.request.use(function (config){

    config.headers.Authorization = `Token `
    return config;
}, function (error) {
    // 如果请求失败（此时请求还没有发出去），就会进入这里
    return Promise.reject(error);
})



// 响应拦截器



export default request