
// Nuxt已经集成vuex， 直接使用

const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把state定义成一个函数，返回数据对象

const state = () => {
    return {
        // 当前用户登录状态
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {
    // nuxtServerInit 特殊的action方法，会在服务端渲染期间自动调用
    // 作用：初始化容器数据，传递给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        // 如果请求头中有 Cookie
        if (req.headers.cookie) {
            // 把cookie字符串转为js对象
            const parsed = cookieparser.parse(req.headers.cookie)
            console.log(parsed);
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {                
                console.log(error);
            }
        }

        commit('setUser', user)
    }
}