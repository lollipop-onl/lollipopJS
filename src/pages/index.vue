<template lang="pug">
div
  ol
    li(v-for="post in latestBlogPosts")
      NuxtLink(:to="$utils.url($C.PAGES.BLOG_POST, { slug: post.fields.slug })") {{ post.fields.title }}
  NuxtLink(:to="$C.PAGES.BLOG_ARCHIVES") すべてのポストをみる
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Entry } from 'contentful';
import { BlogPost } from '@/types';

@Component({
  head(this: IndexPage) {
    return {
      title: 'lollipopJS - FrontEnd Diary of lollipop.onl',
      titleTemplate: '%s',
    };
  },
})
export default class IndexPage extends Vue {
  /** 最新のブログポスト一覧 */
  get latestBlogPosts(): Entry<BlogPost>[] {
    return this.$contentful.getBlogPosts(0, 3);
  }
}
</script>

<style lang="scss" scoped></style>
