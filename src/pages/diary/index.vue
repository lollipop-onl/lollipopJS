<template lang="pug">
div
  ol
    li(v-for="post in diaryPosts")
      NuxtLink(:to="$utils.url($C.PAGES.DIARY_POST, { id: post.sys.id })") {{ post.fields.title }}
  AppPagination(
    :to="$C.PAGES.DIARY"
    :total="$contentful.allDiaryPosts.length"
    :perPage="$C.BLOG_POST_PER_PAGE"
    :page="page"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Entry } from 'contentful';
import { Context } from '@nuxt/types';
import AppPagination from '@/components/AppPagination.vue';
import { DiaryPost } from '@/types';

@Component({
  components: {
    AppPagination,
  },
  head(this:DiaryPage){
    return {
      title: 'Diary entries'
    }
  }
})
export default class DiaryPage extends Vue {
  /** 表示中のページ番号 */
  get page(): number {
    const { query } = this.$route;
    const p = this.$utils.qv(query, 'p') || '1';

    return +p;
  }

  /** ページに表示するブログポスト */
  get diaryPosts(): Array<Entry<DiaryPost>> {
    return this.$contentful.getDiaryPosts(this.page - 1);
  }

  /** ライフサイクルフック */
  validate({ app, query }: Context): boolean {
    const p = app.$utils.qv(query, 'p') || '1';

    return !Number.isNaN(+p);
  }
}
</script>

<style lang="scss" scoped></style>
