<template lang="pug">
div
  SiteHeader
  AppSidebar
  nuxt
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

<style lang="scss" scoped></style>
