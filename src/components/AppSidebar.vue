<template lang="pug">
aside.app-sidebar
  .section
    .title CATEGORY
    AppSidebarCategory(:categories="$contentful.allCategories")
  .section
    .title ARCHIVE
    AppSidebarArchive
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppSidebarCategory from '@/components/AppSidebarCategory.vue';
import AppSidebarArchive from '@/components/AppSidebarArchive.vue';
import FontAwesome from '@/components/FontAwesome.vue';

@Component({
  components: {
    AppSidebarArchive,
    AppSidebarCategory,
    FontAwesome,
  },
})
export default class AppSidebar extends Vue {
  mounted(): void {
    console.log(this.$contentful.allBlogPosts);
  }
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  & {
  }

  & > .section {
    margin-bottom: 24px;
  }

  & > .section > .title {
    padding: 24px 0;
    font-family: $font-family-accent;
    font-size: 16px;
    text-align: center;
    text-indent: 0.2em;
    letter-spacing: 0.2em;
  }
}
</style>
