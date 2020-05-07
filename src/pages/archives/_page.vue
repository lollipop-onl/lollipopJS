<template lang="pug">
div
  ol
    li(v-for="post in blogPosts")
      NuxtLink(:to="$utils.url($C.PAGES.BLOG_POST, { slug: post.fields.slug })") {{ post.fields.title }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { Entry } from 'contentful';
import { BlogPost } from '@/types';

@Component
export default class ArchivesPage extends Vue {
  /** ページに表示するブログポスト */
  get blogPosts(): Array<Entry<BlogPost>> {
    const { page = '1' } = this.$route.params;
    const pageNumber = +page - 1;

    return this.$contentful.getBlogPosts(pageNumber);
  }

  /** ライフサイクルフック */
  validate({ params }: Context): boolean {
    const { page } = params;

    return page == null || /^[0-9]+$/.test(page);
  }

  /** ライフサイクルフック */
  fetch(): void {
    if (this.blogPosts.length === 0) {
      this.$nuxt.error({ statusCode: 404 });
    }
  }
}
</script>

<style lang="scss" scoped></style>
