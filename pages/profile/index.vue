<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>{{ user.bio }}</p>

            <nuxt-link v-if="isUser" to="/settings" class="btn btn-sm btn-outline-secondary action-btn"
              ><i class="ion-gear-a"></i>Edit Profile Settings</nuxt-link
            >
            <button class="btn btn-sm btn-outline-secondary action-btn" v-else-if="user.following">
              <i class="ion-plus-round"></i>
              &nbsp; Follow
            </button>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-else>
              <i class="ion-heart"></i>
              &nbsp; Following
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my_articles',
                  }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles',
                      author: user.username,
                    },
                  }"
                  exact
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited_articles',
                  }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles',
                      favorited: user.username,
                    },
                  }"
                  exact
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.article">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i>{{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- <div v-if="articles.length">No articles are here... yet.</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfiles } from "@/api/profiles";
import { getArticles } from "@/api/article";

export default {
  name: "UserProfile",
  // 在路由匹配组件渲染之前，先执行中间件， 如果多个中间件执行，写成数组
  middleware: "authenticated",
  computed: {},
  watchQuery: ["tab", "isUser"],
  data() {
    return { user: null };
  },
  async asyncData({ params, query, store }) {
    const rUserName = params.username || false;
    const sUserName = store.state.user.username;
    const { author, tab, favorited } = query;
    const isUser = rUserName === sUserName;
    let user = null;
    if (isUser) {
      user = { ...store.state.user };
    }
    const { data: ProFileData } = await getProfiles(rUserName);
    user = ProFileData.profile;

    const { data: ArticleData } = await getArticles({
      author: author || rUserName,
      favorited,
    });

    return {
      articles: ArticleData.articles,
      isUser,
      user,
      tab: tab || "my_articles",
    };
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style></style>
