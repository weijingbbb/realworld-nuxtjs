
// 验证是否登录的中间件，如果已登录，则跳转回首页

export default function ({ store, redirect }) {
    if (store.state.user) {
        return redirect('/')
    }
}