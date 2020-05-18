<template lang="pug">
.blog-post
  h1.title {{ blogPost.fields.title }}
  .information
    NuxtLink.category(:to="categoryLink") {{ blogPost.fields.category.fields.name }}
    .date {{ publishDate }}
    a.edit(:href="editLink")
      span.fas.fa-edit
  .thumbnail
    img.image(
      :alt="blogPost.fields.image.fields.title"
      :src="blogPost.fields.image.fields.file.url"
    )
  .body
    AppMarkdown(:source="blogPost.fields.body")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { RawLocation } from 'vue-router';
import { Entry } from 'contentful';
import dayjs from 'dayjs';
import AppMarkdown from '@/components/AppMarkdown.vue';
import { BlogPost } from '@/types';

@Component({
  components: {
    AppMarkdown,
  },
  head(this: PostDetailPage) {
    return {
      title: this.blogPost.fields.title,
    };
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

  /** カテゴリのリンク */
  get categoryLink(): RawLocation {
    const { slug } = this.blogPost.fields.category.fields;

    return this.$utils.url(this.$C.PAGES.BLOG_CATEGORY, { slug });
  }

  /** 日付 */
  get publishDate(): string {
    const d = dayjs(new Date(this.blogPost.sys.createdAt));

    return d.format('YYYY/MM/DD ddd.');
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

<style lang="scss" scoped>
.blog-post {
  & > .thumbnail {
    position: relative;
    width: 100%;
  }

  & > .thumbnail::before {
    display: block;
    content: '';
    padding-top: 56.25%;
  }

  & > .thumbnail > .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > .body {
    padding-top: 40px;
    overflow: hidden;
    background: $_white;
  }
}
</style>
