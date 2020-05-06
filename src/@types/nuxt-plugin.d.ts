import { ContentfulClientApi } from 'contentful';

declare module 'vue/types/vue' {
  interface Vue {
    $contentful: ContentfulClientApi;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $contentful: ContentfulClientApi;
  }
}
