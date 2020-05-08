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
    postcss: {
      plugins: { 'postcss-short': {} },
    },
  },
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/dotenv', { path: __dirname }],
  ],
  css: ['reset-css'],
  plugins: ['~/plugins/contentful', '~/plugins/globals'],
  generate: {
    fallback: true,
    routes() {
      const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

      return generateRoutePaths(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN);
    },
  },
};

module.exports = config;
