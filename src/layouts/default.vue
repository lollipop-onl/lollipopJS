<template lang="pug">
.default-layout
  SiteHeader
  .container
    .main
      nuxt
    .sidebar
      AppSidebar
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppSidebar from '@/components/AppSidebar.vue';
import SiteHeader from '@/components/SiteHeader.vue';

@Component({
  components: {
    AppSidebar,
    SiteHeader,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
$sidebar-margin: 32px;

.default-layout {
  & > .container {
    display: flex;
    width: $container-width;
    margin: 0 auto;
  }

  & > .container > .main {
    flex-grow: 1;
    width: calc(100% - #{$sidebar-width} - #{$sidebar-margin});
  }

  & > .container > .sidebar {
    flex-shrink: 0;
    width: $sidebar-width;
    margin-left: $sidebar-margin;
  }
}
</style>
