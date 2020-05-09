import { Configuration } from '@nuxt/types';
import generateRoutePaths from './src/utils/generateRoutePaths';

require('dotenv').config();

const { CONTENTFUL_SPACE_ID = '', CONTENTFUL_ACCESS_TOKEN = '' } = process.env;

const config: Configuration = {
  srcDir: 'src',
  env: {
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID,
  },
  build: {
    transpile: ['lodash-es'],
    postcss: {
      plugins: { 'postcss-short': {} },
    },
  },
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/dotenv', { path: __dirname }],
  ],
  modules: [
    '@nuxtjs/style-resources',
    [
      'nuxt-vitals',
      {
        trackingID: 'UA-158121040-2',
      },
    ],
  ],
  css: ['reset-css', '@/assets/styles/globals/entry.scss'],
  plugins: [
    '~/plugins/contentful',
    '~/plugins/globals',
    { src: '~/plugins/webfont', mode: 'client' },
  ],
  generate: {
    fallback: true,
    routes() {
      const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

      return generateRoutePaths(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN);
    },
  },
  styleResources: {
    scss: ['@/assets/styles/vars/*.scss', '@/assets/styles/helpers/*.scss'],
  },
};

module.exports = config;
