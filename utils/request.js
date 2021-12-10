
// 基于axios封闭的请求模块
import axios from 'axios'


const q = 'https://api.realworld.io'
const q2 = 'https://conduit.productionready.io'

const request = axios.create({
    baseURL: 'https://api.realworld.io'
})

// 请求拦截器




// 响应拦截器



export default request