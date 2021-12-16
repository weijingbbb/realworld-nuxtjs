<template>
  <div>
    <template v-if="articles.length">
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
    </template>
    <div v-else>No articles are here... yet.</div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    articles: {
      type: Array,
    },
  },
};
</script>

<style></style>
