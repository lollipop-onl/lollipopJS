<template lang="pug">
ol.app-sidebar-category
  li.item(v-for="category in categories")
    NuxtLink.link(:to="$utils.url($C.PAGES.BLOG_CATEGORY, { slug: category.fields.slug })") {{ category.fields.name }}
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

<style lang="scss" scoped>
.app-sidebar-category {
  & > .item {
    padding: 8px 0;
  }

  & > .item > .link {
    font-size: 14px;
    line-height: 1.6;
    color: $_black;
  }
}
</style>
