<template lang="pug">
ol.app-sidebar-archive
  li.item(v-for="archive in $contentful.blogPostArchives")
    NuxtLink.link(
      :to="$utils.url($C.PAGES.BLOG_ARCHIVE, { year: archive.year, month: archive.month + 1})"
    ) {{ archive.year }}/{{ archive.month + 1 }} ({{archive.count }})
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AppSidebarArchive extends Vue {}
</script>

<style lang="scss" scoped>
.app-sidebar-archive {
  & > .item {
    padding: 8px 0;
  }

  & > .item > .link {
    font-size: 12px;
    line-height: 1.6;
    color: $_black;
  }
}
</style>
