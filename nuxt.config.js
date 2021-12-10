

/*
*   Nuxt.js 配置文件
*/

module.exports = {
    router: {
        // base: '/abc',
        // routes 一个数组，路由配置表
        // resolve 解析路由组件路径
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 清除 Nuxt.js基于Pages目录默认生成的路由表规则
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '',   // 默认子路由
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/'),
                        },
                        {
                            path: '/login',     // 登录
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/'),
                        },
                        {
                            path: '/register',  //  注册
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/'),
                        },
                        {
                            path: '/profile/:username',  //  用户信息
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/'),
                        },
                        {
                            path: '/settings',  //  用户设置
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/'),
                        },
                        {
                            path: '/editor',  //  文章编辑
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/'),
                        },
                        {
                            path: '/article/:slug',  //  文章
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/'),
                        }
                    ]
                }
            ])
            // routes.push({
            //     name: 'custom',
            //     path: '*',
            //     component: resolve(__dirname, 'pages/404.vue')
            // })
        }
    }
}