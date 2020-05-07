import ContentfulPlugin from '@/plugins/contentful/ContentfulPlugin';

declare module 'vue/types/vue' {
  interface Vue {
    $contentful: ContentfulPlugin;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $contentful: ContentfulPlugin;
  }
}
