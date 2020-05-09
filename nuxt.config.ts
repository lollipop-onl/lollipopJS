import { Configuration } from '@nuxt/types';
import generateRoutePaths from './src/utils/generateRoutePaths';

require('dotenv').config();

const {
  NODE_ENV = 'development',
  CONTENTFUL_SPACE_ID = '',
  CONTENTFUL_ACCESS_TOKEN = '',
  GA_TRACKING_ID = 'UA-158121040-2',
} = process.env;

const config: Configuration = {
  srcDir: 'src',
  env: {
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID,
  },
  head: {
    titleTemplate: '%s - lollipopJS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  build: {
    transpile: ['lodash-es'],
    postcss: {
      plugins: { 'postcss-short': {} },
    },
  },
  buildModules: [
    '@nuxt/typescript-build',
    [
      '@nuxtjs/google-analytics',
      { id: GA_TRACKING_ID, debug: { sendHitTask: NODE_ENV === 'production' } },
    ],
    ['@nuxtjs/dotenv', { path: __dirname }],
  ],
  modules: [
    '@nuxtjs/style-resources',
    [
      'nuxt-vitals',
      {
        trackingID: GA_TRACKING_ID,
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
