import ContentfulPlugin from '@/plugins/contentful/ContentfulPlugin';
import * as C from '@/constants';
import * as utils from '@/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $contentful: ContentfulPlugin;
    $C: typeof C;
    $utils: typeof utils;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $contentful: ContentfulPlugin;
    $C: typeof C;
    $utils: typeof utils;
  }
}
