import {
  ContentfulClientApi,
  Entry,
  EntryCollection,
  createClient,
} from 'contentful';
import { Context } from '@nuxt/types';
import { BlogCategory, BlogPost, ContentfulEntry } from '@/types';
import { ContentfulContentType } from '@/constants';
import { Store } from '@/store';

/** エントリーの１ページあたりの取得数 */
const ENTRIES_PER_PAGE = 1000;

/**
 * Contentfulのデータを管理するプラグイン
 */
class ContentfulPlugin {
  /** Contentful Client */
  private client: ContentfulClientApi;

  constructor(private context: Context, space?: string, accessToken?: string) {
    if (!space || !accessToken) {
      throw new Error('space_id or access_token is unspecified.');
    }

    this.client = createClient({ space, accessToken });
  }

  /** ContentfulのEntries */
  public get entries(): Entry<ContentfulEntry>[] {
    return this.store.state.contentfulEntries;
  }

  /** すべてのブログポスト */
  public get allBlogPosts(): Entry<BlogPost>[] {
    return this.entries.filter((entry): entry is Entry<BlogPost> => {
      return entry.sys.contentType.sys.id === ContentfulContentType.BLOG_POST;
    });
  }

  /** すべてのカテゴリ */
  public get allCategories(): Entry<BlogCategory>[] {
    return this.entries.filter((entry): entry is Entry<BlogCategory> => {
      return entry.sys.contentType.sys.id === ContentfulContentType.CATEGORY;
    });
  }

  /** Vuex Storeのインスタンス */
  private get store(): Store {
    return this.context.store as any;
  }

  /**
   * すべてのエントリーを取得する
   */
  public async fetchAllEntries(): Promise<Entry<ContentfulEntry>[]> {
    const { items } = await this.fetchEntries();

    return items;
  }

  /**
   * エントリーを取得する
   * @param skip
   * @param limit
   */
  public async fetchEntries(
    skip = 0,
    limit = ENTRIES_PER_PAGE
  ): Promise<EntryCollection<ContentfulEntry>> {
    return await this.client.getEntries({ skip, limit });
  }

  /**
   * ブログポストの一覧を取得する
   * @param skip
   * @param limit
   */
  getBlogPosts(
    skip = 0,
    limit = this.context.app.$C.BLOG_POST_PER_PAGE
  ): Entry<BlogPost>[] {
    return this.allBlogPosts.slice(skip * limit, skip * limit + limit);
  }

  /**
   * スラッグからブログポストを取得する
   * @param slug スラッグ
   */
  getBlogPost(slug: string): Entry<BlogPost> | undefined {
    return this.allBlogPosts.find((post) => post.fields.slug === slug);
  }

  /**
   * スラッグからカテゴリを取得する
   * @param slug
   */
  getCategory(slug: string): Entry<BlogCategory> | undefined {
    return this.allCategories.find((entry) => entry.fields.slug === slug);
  }

  /**
   * スラッグからカテゴリのブログポストの一覧を取得する
   * @param slug
   */
  getAllCategoryBlogPosts(slug: string): Entry<BlogPost>[] {
    return this.allBlogPosts.filter(
      (post) => post.fields.category.fields.slug === slug
    );
  }

  /**
   * カテゴリのスラッグからブログポストの一覧を取得する
   * @param slug
   * @param skip
   * @param limit
   */
  getCategoryBlogPosts(
    slug: string,
    skip = 0,
    limit = this.context.app.$C.BLOG_POST_PER_PAGE
  ): Entry<BlogPost>[] {
    return this.getAllCategoryBlogPosts(slug).slice(
      skip * limit,
      skip * limit + limit
    );
  }
}

export default ContentfulPlugin;
