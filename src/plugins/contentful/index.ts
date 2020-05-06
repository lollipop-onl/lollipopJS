import * as contentful from 'contentful';
import { Plugin } from '@nuxt/types';

/**
 * Contentful Clientを取得する
 * @param space Space ID
 * @param accessToken Access Token
 */
const getContentfulClient = (space: string, accessToken: string) => {
  return contentful.createClient({ space, accessToken });
};

const plugin: Plugin = ({ env }, inject): void => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = env;

  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(
      'CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN is not the specified.'
    );
  }

  const client = getContentfulClient(
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN
  );

  inject('contentful', client);
};

export default plugin;
