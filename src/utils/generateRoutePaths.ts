import { createClient, Entry } from 'contentful';
import dayjs from 'dayjs';
import { ContentfulContentType, PAGES } from '../constants';
import { BlogCategory, BlogPost, ContentfulEntry, DiaryPost } from '../types';
import { url } from './url';

/** EntryがBlogPostかどうか */
const isBlogPostEntry = (entry: Entry<unknown>): entry is Entry<BlogPost> => {
  return entry.sys.contentType.sys.id === ContentfulContentType.BLOG_POST;
};

/** EntryがCategoryかどうか */
const isCategoryEntry = (
  entry: Entry<unknown>
): entry is Entry<BlogCategory> => {
  return entry.sys.contentType.sys.id === ContentfulContentType.CATEGORY;
};

/** EntryがDiaryPostかどうか */
const isDiaryPostEntry = (entry: Entry<unknown>): entry is Entry<DiaryPost> => {
  return entry.sys.contentType.sys.id === ContentfulContentType.DIARY_POST;
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

      const date = dayjs(entry.sys.createdAt);
      const path = url(PAGES.BLOG_ARCHIVE, {
        year: date.year(),
        month: date.month() + 1,
      });

      if (!routes.includes(path)) {
        routes.push(path);
      }
    }

    if (isCategoryEntry(entry)) {
      routes.push(url(PAGES.BLOG_CATEGORY, { slug: entry.fields.slug }));
    }

    if (isDiaryPostEntry(entry)) {
      routes.push(url(PAGES.DIARY_POST, { id: entry.sys.id }));
    }

    return routes;
  }, []);
};

export default getDynamicRoutePaths;
