<template lang="pug">
ul
  li(v-for="n in totalPages")
    NuxtLink(
      v-if="n >= page - beforeOffset && n <= page + afterOffset"
      :to="getPaginationLink(n)"
      :aria-current="n === page ? 'page' : false"
    ) {{ n }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { RawLocation } from 'vue-router';

@Component
export default class AppPagination extends Vue {
  /** リンク先 */
  @Prop({ type: String, required: true })
  to!: string;

  /** 合計の要素数 */
  @Prop({ type: Number, required: true })
  total!: number;

  /** １ページあたりの表示数 */
  @Prop({ type: Number, required: true })
  perPage!: number;

  /** 現在のページ */
  @Prop({ type: Number, required: true })
  page!: number;

  /** 前に表示するページのオフセット */
  @Prop({ type: Number, default: 3 })
  beforeOffset!: number;

  /** 後に表示するページのオフセット */
  @Prop({ type: Number, default: 3 })
  afterOffset!: number;

  /** 合計のページ数 */
  get totalPages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  /**
   * ページ番号付きのリンク先
   * @param page ページ番号
   */
  getPaginationLink(page: number): RawLocation {
    return {
      path: this.to,
      query: {
        p: `${page}`,
      },
    };
  }
}
</script>

<style lang="scss" scoped></style>
