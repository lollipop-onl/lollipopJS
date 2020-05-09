<template lang="pug">
header.site-header
  .container
    NuxtLink.site-header-logo(:to="$C.PAGES.TOP") lollipopJS
    ul.site-header-menu.menu
      li.item
        NuxtLink.link(:to="$C.PAGES.TOP") HOME
      li.item
        NuxtLink.link(:to="$C.PAGES.BLOG_POSTS") ARCHIVES
      li.item
        NuxtLink.link(:to="$C.PAGES.DIARY") DIARY BLOG
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class SiteHeader extends Vue {}
</script>

<style lang="scss" scoped>
.site-header {
  & {
    width: 100%;
    height: $site-header-height;
    background: $_white;
  }

  & > .container {
    display: flex;
    width: $container-width-wide;
    margin: 0 auto;
  }

  & > .container > .menu {
    margin-left: auto;
  }
}

.site-header-logo {
  & {
    font-family: $font-family-accent;
    font-size: 28px;
    line-height: $site-header-height;
    color: $_black;
    text-indent: 0.2em;
    letter-spacing: 0.2em;
  }
}

.site-header-menu {
  & {
    display: flex;
  }

  & > .item > .link {
    position: relative;
    display: block;
    height: $site-header-height;
    margin-left: 48px;
    font-family: $font-family-accent;
    font-size: 12px;
    font-weight: bold;
    line-height: $site-header-height;
    color: $_black;
    text-indent: 0.5em;
    letter-spacing: 0.5em;
  }

  & > .item > .link::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    content: '';
    background: $_black;
    opacity: 0;
  }

  & > .item > .link:hover::before,
  & > .item > .link.-current::before {
    opacity: 1;
  }
}
</style>
