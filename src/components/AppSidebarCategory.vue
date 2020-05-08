<template lang="pug">
ol
  li(v-for="category in categories")
    NuxtLink(:to="$utils.url($C.PAGES.BLOG_CATEGORY, { slug: category.fields.slug })") {{ category.fields.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Entry } from 'contentful';
import { BlogPost } from '@/types';

@Component
export default class AppSidebarCategory extends Vue {
  @Prop({ type: Array, required: true })
  categories!: Entry<BlogPost>[];
}
</script>

<style lang="scss" scoped></style>
