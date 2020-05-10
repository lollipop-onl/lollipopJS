<template lang="pug">
div
  ol
    li(v-for="post in blogPosts")
      NuxtLink(:to="$utils.url($C.PAGES.BLOG_POST, { slug: post.fields.slug })") {{ post.fields.title }}
      p
        | Category:
        NuxtLink(:to="$utils.url($C.PAGES.BLOG_CATEGORY, { slug: post.fields.category.fields.slug })") {{ post.fields.category.fields.name }}
      p {{ $store.state.count }}
  AppPagination(
    :to="$utils.url($C.PAGES.BLOG_ARCHIVE, { year, month: month + 1 })"
    :total="allBlogPosts.length"
    :perPage="$C.BLOG_POST_PER_PAGE"
    :page="page"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Entry } from 'contentful';
import { Context } from '@nuxt/types';
import AppPagination from '@/components/AppPagination.vue';
import { BlogPost } from '@/types';

@Component({
  components: {
    AppPagination,
  },
})
export default class BlogArchivePage extends Vue {
  /** 表示中の年 */
  get year(): number {
    return +this.$route.params.year;
  }

  /** 表示中の月 */
  get month(): number {
    return +this.$route.params.month - 1;
  }

  /** 表示中のページ番号 */
  get page(): number {
    const { query } = this.$route;
    const p = this.$utils.qv(query, 'p') || '1';

    return +p;
  }

  /** この月のすべてのブログポスト */
  get allBlogPosts() {
    return this.$contentful.getBlogPostArchives(
      this.year,
      this.month,
      0,
      9999
    );
  }

  /** ページに表示するブログポスト */
  get blogPosts(): Array<Entry<BlogPost>> {
    return this.$contentful.getBlogPostArchives(
      this.year,
      this.month,
      this.page - 1
    );
  }

  /** ライフサイクルフック */
  validate({ app, params, query }: Context): boolean {
    const { year, month } = params;
    const p = app.$utils.qv(query, 'p') || '1';

    return !Number.isNaN(+p) || !Number.isNaN(+year) || !Number.isNaN(+month);
  }
}
</script>

<style lang="scss" scoped></style>
