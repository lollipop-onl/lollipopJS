import { Configuration } from '@nuxt/types';

const config: Configuration = {
  srcDir: 'src',
  build: {
    postcss: {
      plugins: { 'postcss-short': {} },
    },
  },
  buildModules: ['@nuxt/typescript-build'],
};

module.exports = config;
