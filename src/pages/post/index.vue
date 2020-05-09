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
      :to="$C.PAGES.BLOG_POSTS"
      :total="$contentful.allBlogPosts.length"
      :perPage="$C.BLOG_POST_PER_PAGE"
      :page="page"
    )
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { Entry } from 'contentful';
import AppPagination from '@/components/AppPagination.vue';
import { BlogPost } from '@/types';

@Component({
  components: {
    AppPagination,
  },
})
export default class ArchivesPage extends Vue {
  /** 表示中のページ番号 */
  get page(): number {
    const { query } = this.$route;
    const p = this.$utils.qv(query, 'p') || '1';

    return +p;
  }

  /** ページに表示するブログポスト */
  get blogPosts(): Array<Entry<BlogPost>> {
    return this.$contentful.getBlogPosts(this.page - 1);
  }

  /** ライフサイクルフック */
  validate({ app, query }: Context): boolean {
    const p = app.$utils.qv(query, 'p') || '1';

    return !Number.isNaN(+p);
  }
}
</script>

<style lang="scss" scoped></style>
