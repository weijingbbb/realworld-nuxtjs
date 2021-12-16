<template>
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
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <template v-if="isUser">
      <button class="btn btn-sm btn-outline-secondary" @click="editArticle"><i class="ion-edit"></i> Edit Article</button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-danger" @click="deleteArticle"><i class="ion-trash-a"></i>Delete Article</button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following }">
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
import { deleteArticle } from "@/api/article";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isUser() {
      return this.article.author.username === this.$store.state.user.username;
    },
  },
  methods: {
    editArticle() {
      this.$router.push({
        name: "editor",
        params: {
          type: "edit",
          article: {
            title: this.article.title,
            description: this.article.description,
            body: this.article.body,
            tagList: this.article.tagList,
          },
        },
      });
    },
    async deleteArticle() {
      await deleteArticle(this.article.slug)
      this.$router.push({
        name: 'profile',
        params: {
          username: this.$store.state.user.username
        }
      })
    },
  },
};
</script>

<style></style>
