<template lang="pug">
  h1 Hello world.
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class IndexPage extends Vue {
  mounted(): void {
    console.log(this.$contentful.allBlogPosts);
  }
}
</script>

<style lang="scss" scoped></style>
