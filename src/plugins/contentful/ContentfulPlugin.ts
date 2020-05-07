import {
  ContentfulClientApi,
  Entry,
  EntryCollection,
  createClient,
} from 'contentful';
import { BlogPost, BlogTag } from '@/types';

/** エントリーの１ページあたりの取得数 */
const ENTRIES_PER_PAGE = 1000;
/** ブログポストのID */
const BLOG_POST_CONTENT_TYPE_ID = 'blogPost';

/**
 * Contentfulのデータを管理するプラグイン
 */
class ContentfulPlugin {
  /** Contentful Client */
  private client: ContentfulClientApi;

  /** Entry Collection */
  private entries: Array<Entry<BlogPost | BlogTag>> = [];

  constructor(space?: string, accessToken?: string) {
    if (!space || !accessToken) {
      throw new Error('Error msg');
    }

    this.client = createClient({ space, accessToken });
  }

  /**  */
  public get allBlogPosts(): Array<Entry<BlogPost>> {
    return this.entries.filter((entry): entry is Entry<BlogPost> => {
      return entry.sys.contentType.sys.id === BLOG_POST_CONTENT_TYPE_ID;
    });
  }

  /**
   * データを取得する
   */
  public async fetchContentfulData(): Promise<void> {
    const { items } = await this.fetchEntries(0, ENTRIES_PER_PAGE);

    this.entries = items;
  }

  /**
   * エントリーを取得する
   * @param skip
   * @param limit
   */
  private async fetchEntries(
    skip = 0,
    limit = 1000
  ): Promise<EntryCollection<BlogPost | BlogTag>> {
    return await this.client.getEntries({ skip, limit });
  }

  /**
   * スラッグからブログポストを取得する
   * @param slug スラッグ
   */
  getBlogPost(slug: string): Entry<BlogPost> | undefined {
    return this.allBlogPosts.find((post) => post.fields.slug === slug);
  }
}

export default ContentfulPlugin;
