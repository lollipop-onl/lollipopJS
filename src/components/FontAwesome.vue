<template lang="pug">
span(:class="classNames")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class FontAwesome extends Vue {
  @Prop({ type: String, required: true })
  icon!: string;

  @Prop({ type: Boolean, default: false })
  fas!: boolean;

  @Prop({ type: Boolean, default: false })
  far!: boolean;

  get classNames(): string[] {
    const iconClassName = `fa-${this.icon}`;
    const classNames = [iconClassName];

    if (this.fas) {
      classNames.push('fas');
    }

    if (this.far) {
      classNames.push('far');
    }

    return classNames;
  }
}
</script>

<style lang="scss" scoped></style>
