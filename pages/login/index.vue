<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Have an account?</nuxt-link>
            <nuxt-link v-else to="/login">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{ isLogin ? "Sign in" : "Sign up" }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";

// 仅在客户端加载js-cookie包， process.client由Nuxt提供
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "LoginIndex", 
  // 在路由匹配组件渲染之前，先执行中间件， 如果多个中间件执行，写成数组
  middleware: "notAuthenticated",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    // 提交表单，请求登陆
    async onSubmit() {
      const user = { user: this.user };
      try {
        const { data } = this.isLogin ? await login(user) : await register(user);
        // 保存登录状态
        this.$store.commit("setUser", data.user);

        // 为了防止刷新页面数据丢失，把数据持久化
        Cookie.set("user", JSON.stringify(data.user));


        // 跳转首页
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style></style>
