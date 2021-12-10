
// 验证是否登录的中间件，如果已登录，则跳转回首页

export default function ({ store, redirect }) {
    console.log('进来了', store.state.user);
    if (store.state.user) {
        console.log('有user');
        return redirect('/')
    }
}