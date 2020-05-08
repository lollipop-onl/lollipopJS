import { createClient, Entry } from 'contentful';
import { ContentfulContentType, PAGES } from '../constants';
import { BlogPost, ContentfulEntry } from '../types';
import { url } from './url';

/** EntryがBlogPostかどうか */
const isBlogPostEntry = (entry: Entry<unknown>): entry is Entry<BlogPost> => {
  return entry.sys.contentType.sys.id === ContentfulContentType.BLOG_POST;
};

/**
 * 動的パスを取得する
 */
const getDynamicRoutePaths = async (
  space?: string,
  accessToken?: string
): Promise<string[]> => {
  if (!space || !accessToken) {
    throw new Error('space_id or access_token is unspecified.');
  }

  const client = createClient({ space, accessToken });
  const { items } = await client.getEntries<ContentfulEntry>({
    skip: 0,
    limit: 1000,
  });

  return items.reduce<string[]>((routes, entry) => {
    if (isBlogPostEntry(entry)) {
      routes.push(url(PAGES.BLOG_POST, { slug: entry.fields.slug }));
    }

    return routes;
  }, []);
};

export default getDynamicRoutePaths;
