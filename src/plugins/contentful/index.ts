import * as contentful from 'contentful';
import { Plugin } from '@nuxt/types';
import ContentfulPlugin from './ContentfulPlugin';

const plugin: Plugin = async ({ env }, inject): Promise<void> => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = env;

  const contentfulPlugin = new ContentfulPlugin(
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN
  );

  await contentfulPlugin.fetchContentfulData();

  inject('contentful', contentfulPlugin);
};

export default plugin;
