<template lang="pug">
.app-markdown(v-html="html")
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

<style lang="scss" scoped>
/* stylelint-disable rscss/class-format, rscss/no-descendant-combinator */
.app-markdown {
  ::v-deep {
    p {
      margin: 0 32px 16px;
      line-height: 1.5;
    }

    h1 {
      position: relative;
      padding-left: 16px;
      margin: 0 32px 24px;
      font-size: 24px;
    }

    h1::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 24px;
      border-radius: 2px;
      background: $_primary;
      content: '';
    }

    img {
      max-width: 100%;
      margin: 0 auto;
    }

    .code-block {
      display: block;
      margin: 32px 0;
      border-top: 2px solid #555;
    }

    .code-block-header {
      & {
        display: flex;
        margin-bottom: 8px;
      }

      & > .name {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 16px 0 8px;
        margin-bottom: 8px;
        font-family: $font-family-accent;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        background: #555;
      }

      & > .name > .icon {
        width: 1.5em;
        margin-right: 8px;
        font-size: 14px;
        text-align: center;
      }

      & > .copy {
        position: relative;
        width: 42px;
        height: 42px;
        margin-left: auto;
        font-size: 18px;
        line-height: 42px;
        color: #999;
        text-align: center;
        cursor: pointer;
        background: transparent;
        border: none;
        outline: none;
      }

      & > .copy:focus,
      & > .copy:hover {
        color: $_primary;
      }

      & > .copy::before {
        position: absolute;
        top: 50%;
        right: 100%;
        font-family: $font-family-accent;
        font-size: 12px;
        font-weight: bold;
        color: #888;
        visibility: hidden;
        content: 'Code copied!';
        opacity: 0;
        transition: transform 0.12s ease, opacity 0.12s ease,
          visibility 0s 0.12s;
        transform: translate3d(8px, -50%, 0);
      }

      & > .copy.-copied::before {
        visibility: visible;
        opacity: 1;
        transition: transform 0.12s ease, opacity 0.12s ease, visibility 0s ease;
        transform: translate3d(0, -50%, 0);
      }
    }

    // highlight.js theme
    .hljs {
      display: block;
      padding: 8px 50px 16px;
      overflow-x: scroll;
      font-size: 16px;
      line-height: 1.4;
      color: #4d4d4d;
      background: #fff;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: bold;
    }

    .hljs-comment,
    .hljs-quote {
      color: #8e908c;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-tag,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-regexp,
    .hljs-deletion {
      color: #c82829;
    }

    .hljs-number,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params,
    .hljs-meta,
    .hljs-link {
      color: #f5871f;
    }

    .hljs-attribute {
      color: #eab700;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet,
    .hljs-addition {
      color: #718c00;
    }

    .hljs-title,
    .hljs-section {
      color: #4271ae;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #8959a8;
    }
  }
}
</style>
