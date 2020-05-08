<template lang="pug">
div
  AppSidebar
  nuxt
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppSidebar from '@/components/AppSidebar.vue';

@Component({
  components: {
    AppSidebar,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped></style>
