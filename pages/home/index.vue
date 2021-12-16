<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>

              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  exact
                  >#{{ tag }}</nuxt-link
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
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: article.favorited }" @click="onFavorite(article)" :disabled="article.favoriteDisabled">
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

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ active: item === page }" v-for="item in totalPage" :key="item">
                <!-- <nuxt-link class="page-link" to="/">{{ item }}</nuxt-link> -->
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tag,
                    tab: 'tag',
                  },
                }"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "HomeIndex",
  // asyncData 默认情况下，不会在查询字符串更改时调用该 方法。如果您想更改此行为，例如在构建分页组件时，您可以设置应使用watchQuery 页面组件的属性监听的参数 。
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query, store }) {
    // 参数是上下文
    const page = +query.page || 1;
    const limit = 20;
    const { tag } = query;
    const tab = query.tab || "global_feed";
    const loadArticles = store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    articles.forEach(article => article.favoriteDisabled = false);

    return {
      articles,
      articlesCount,
      tags: tags.slice(0, 20),
      tag,
      limit,
      page,
      tab: query.tab || "global_feed",
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug);
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    },
  },
};
</script>

<style></style>
