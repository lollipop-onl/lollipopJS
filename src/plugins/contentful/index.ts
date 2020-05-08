import { Plugin } from '@nuxt/types';
import ContentfulPlugin from './ContentfulPlugin';

const plugin: Plugin = (context, inject) => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = context.env;

  const contentfulPlugin = new ContentfulPlugin(
    context,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN
  );

  inject('contentful', contentfulPlugin);
};

export default plugin;
