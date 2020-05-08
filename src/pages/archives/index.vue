<template lang="pug">
  div
    ol
      li(v-for="post in blogPosts")
        NuxtLink(:to="$utils.url($C.PAGES.BLOG_POST, { slug: post.fields.slug })") {{ post.fields.title }}
        p
          | Category:
          NuxtLink(:to="$utils.url($C.PAGES.BLOG_CATEGORY, { slug: post.fields.category.fields.slug })") {{ post.fields.category.fields.name }}
        p {{ $store.state.count }}
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
    const { query } = this.$route;
    const p = this.$utils.qv(query, 'p') || '1';
    const pageNumber = +p - 1;

    return this.$contentful.getBlogPosts(pageNumber);
  }

  /** ライフサイクルフック */
  validate({ app, query }: Context): boolean {
    const p = app.$utils.qv(query, 'p') || '1';

    return !Number.isNaN(+p);
  }
}
</script>

<style lang="scss" scoped></style>
