<template lang="pug">
aside.app-sidebar
  .section
    .title カテゴリ
    AppSidebarCategory(:categories="$contentful.allCategories")
    .title アーカイブ
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppSidebarCategory from '@/components/AppSidebarCategory.vue';

@Component({
  components: {
    AppSidebarCategory,
  },
})
export default class AppSidebar extends Vue {}
</script>

<style lang="scss" scoped>
.app-sidebar {
  & {
  }

  & > .section {
  }

  & > .section > .title {
  }
}
</style>
