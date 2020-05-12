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
    img {
      max-width: 100%;
      margin: 0 auto;
    }

    .code-block {
      display: block;
      border-top: 2px solid $_primary;
    }

    .code-block-header {
      & {
        display: flex;
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
        background: $_primary;
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
        color: #888;
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
        opacity: 0;
        content: 'Code copied!';
        visibility: hidden;
        transition: transform 0.12s ease, opacity 0.12s ease, visibility 0s 0.12s;
        transform: translate3d(8px, -50%, 0);
      }

      & > .copy.-copied::before {
        visibility: visible;
        opacity: 1;
        transform: translate3d(0, -50%, 0);
        transition: transform 0.12s ease, opacity 0.12s ease, visibility 0s ease;
      }
    }

    // highlight.js theme
    .hljs {
      display: block;
      padding: 0.5em;
      overflow-x: scroll;
      font-size: 16px;
      line-height: 1.5;
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
