import { Plugin } from '@nuxt/types';
import WebFont from 'webfontloader';

const plugin: Plugin = () => {
  WebFont.load({
    google: {
      families: [
        'M+PLUS+Rounded+1c:wght@300;700',
        'Quicksand:wght@400;700',
        'DM+Mono:ital@0,300;1,300',
      ],
    },
  });
};

export default plugin;
