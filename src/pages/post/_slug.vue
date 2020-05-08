<template lang="pug">
div
  a(:href="editLink") Edit this entry
  h1 {{ blogPost.fields.title }}
  AppMarkdown(:source="blogPost.fields.body")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { Entry } from 'contentful';
import AppMarkdown from '@/components/AppMarkdown.vue';
import { BlogPost } from '@/types';

@Component({
  components: {
    AppMarkdown,
  },
})
export default class PostDetailPage extends Vue {
  /** ブログポスト */
  blogPost!: Entry<BlogPost>;

  /** 編集リンク */
  get editLink(): string {
    const { sys } = this.blogPost;
    const spaceId = sys.space?.sys.id;
    const entryId = sys.id;

    return this.$utils.url(
      'https://app.contentful.com/spaces/_spaceId/entries/_entryId',
      { spaceId, entryId }
    );
  }

  /** Lifecycle hooks */
  asyncData({ app, error, params }: Context): any {
    const { slug } = params;
    const blogPost = app.$contentful.getBlogPost(slug);

    if (!blogPost) {
      error({ statusCode: 404 });

      return;
    }

    return {
      blogPost,
    };
  }
}
</script>

<style lang="scss" scoped></style>
