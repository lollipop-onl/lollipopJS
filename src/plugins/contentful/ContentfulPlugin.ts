import {
  ContentfulClientApi,
  Entry,
  EntryCollection,
  createClient,
} from 'contentful';
import { Context } from '@nuxt/types';
import { BlogCategory, BlogPost, BlogTag } from '@/types';
import { Store } from '@/store';

/** エントリーの１ページあたりの取得数 */
const ENTRIES_PER_PAGE = 1000;
/** ブログポストのID */
const BLOG_POST_CONTENT_TYPE_ID = 'blogPost';
/** ブログポストの１ページあたりの記事数 */
const BLOG_POST_PER_PAGE = 30;

/**
 * Contentfulのデータを管理するプラグイン
 */
class ContentfulPlugin {
  /** Contentful Client */
  private client: ContentfulClientApi;

  constructor(private context: Context, space?: string, accessToken?: string) {
    if (!space || !accessToken) {
      throw new Error('Error msg');
    }

    this.client = createClient({ space, accessToken });
  }

  /** ContentfulのEntries */
  public get entries(): Array<Entry<BlogPost | BlogCategory | BlogTag>> {
    return this.store.state.contentfulEntries;
  }

  /**  */
  public get allBlogPosts(): Array<Entry<BlogPost>> {
    return this.entries.filter((entry): entry is Entry<BlogPost> => {
      return entry.sys.contentType.sys.id === BLOG_POST_CONTENT_TYPE_ID;
    });
  }

  /** Vuex Storeのインスタンス */
  private get store(): Store {
    return this.context.store as any;
  }

  /**
   * エントリーを取得する
   * @param skip
   * @param limit
   */
  public async fetchEntries(
    skip = 0,
    limit = ENTRIES_PER_PAGE
  ): Promise<EntryCollection<BlogPost | BlogCategory | BlogTag>> {
    return await this.client.getEntries({ skip, limit });
  }

  /**
   * ブログポストの一覧を取得する
   * @param skip
   * @param limit
   */
  getBlogPosts(skip = 0, limit = BLOG_POST_PER_PAGE): Array<Entry<BlogPost>> {
    return this.allBlogPosts.slice(skip * limit, skip * limit + limit);
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
