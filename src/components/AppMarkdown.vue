<template lang="pug">
div(v-html="html")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppMarkdown extends Vue {
  /** Markdownのソース */
  @Prop({ type: String, required: true })
  source!: string;

  /** 変換されたHTML */
  get html(): string {
    return this.$utils.markdown(this.source);
  }
}
</script>

<style lang="scss" scoped></style>
