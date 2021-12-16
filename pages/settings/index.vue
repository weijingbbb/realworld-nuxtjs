<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onUpdate">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image" />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email" required />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
              <button class="btn btn-outline-danger pull-xs-left" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/api/user";
// 仅在客户端加载js-cookie包， process.client由Nuxt提供
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "SettingsIndex",
  // 在路由匹配组件渲染之前，先执行中间件， 如果多个中间件执行，写成数组
  middleware: "authenticated",
  data() {
    return {
      user: {
        email: "",
        bio: "",
        image: "",
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.user = Object.assign(this.user, this.$store.state.user);
  },
  methods: {
    async onUpdate() {
      const { data } = await updateUser({ user: this.user });
      // 保存登录状态
      this.$store.commit("setUser", data.user);

      // 为了防止刷新页面数据丢失，把数据持久化
      Cookie.set("user", JSON.stringify(data.user));
      this.$router.push({
        name: "profile",
        params: {
          username: data.user.username,
        },
      });
    },
    logout () {
      this.$store.commit("setUser", null);
      Cookie.set("user", null);
      this.$router.push('/');
    }
  },
};
</script>

<style></style>
