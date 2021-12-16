<template>
  <div>
    <form class="card comment-form" @submit.prevent="onPublish">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
          ><img :src="comment.author.image" class="comment-author-img"
        /></nuxt-link>
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{ comment.createdAt | date("MMM DD, YYYY") }}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-block">
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">Jacob Schmidt</a>
        <span class="date-posted">Dec 29th</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, publishComments } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      comment: "", // 待输入的评论
    };
  },
  async mounted() {
    this.getCommentsList();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async getCommentsList() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async onPublish() {
      const { data } = await publishComments(this.article.slug, { comment: { body: this.comment } });
      this.comments.unshift(data.comment)
      // await this.getCommentsList();
    },
  },
};
</script>

<style></style>
