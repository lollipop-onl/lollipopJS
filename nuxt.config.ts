import { Configuration } from '@nuxt/types';

const config: Configuration = {
  srcDir: 'src',
  build: {
    postcss: {
      plugins: { 'postcss-short': {} },
    },
  },
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/dotenv', { path: __dirname }],
  ],
  css: ['reset-css'],
  plugins: ['~/plugins/contentful'],
};

module.exports = config;
