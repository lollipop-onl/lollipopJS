<template lang="pug">
  pre {{ post }}
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class PostDetailPage extends Vue {
  post = null;

  async asyncData({ app, params }: Context): Promise<any> {
    const { slug } = params;

    const post = await app.$contentful.getEntry(slug);

    return { post };
  }
}
</script>

<style lang="scss" scoped></style>
