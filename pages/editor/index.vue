<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" required />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description" required />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tag" @keyup.enter="entryTag($event)" />
                <div class="tag-list">
                  <span class="tag-default tag-pill" v-for="(tag, index) in article.tagList" :key="index">
                    <i class="ion-close-round" @click="removeTag(index)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";

export default {
  name: "EditorIndex",
  // 在路由匹配组件渲染之前，先执行中间件， 如果多个中间件执行，写成数组
  middleware: "authenticated",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
    };
  },
  mounted() {
    const { type, article } = this.$route.params;
    if (type === "edit" && article) {
      this.article = article;
    }
  },
  methods: {
    entryTag(e) {
      console.log(e);
      this.article.tagList.push(this.tag);
      this.tag = "";
      e.preventDefault();
    },
    removeTag(index) {
      this.article.tagList.splice(index, 1);
    },
    async onSubmit() {
      const { data } = await createArticle({ article: this.article });
      this.$router.push({
        name: "article",
        params: {
          slug: data.article.slug,
        },
      });
    },
  },
};
</script>

<style></style>
