<template lang="pug">
div
  h1 {{ blogPost.fields.title }}
  p {{ blogPost.fields.body }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { Entry } from 'contentful';
import { BlogPost } from '@/types';

@Component
export default class PostDetailPage extends Vue {
  /** ブログポスト */
  blogPost!: Entry<BlogPost>;

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
