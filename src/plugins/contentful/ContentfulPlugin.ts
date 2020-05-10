import {
  ContentfulClientApi,
  Entry,
  EntryCollection,
  createClient,
} from 'contentful';
import { Context } from '@nuxt/types';
import dayjs from 'dayjs';
import {
  BlogCategory,
  BlogPost,
  BlogPostArchive,
  ContentfulEntry,
  DiaryPost,
} from '@/types';
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
    return this.getContentTypeIdEntries<BlogPost>(
      ContentfulContentType.BLOG_POST
    );
  }

  /** すべてのカテゴリ */
  public get allCategories(): Entry<BlogCategory>[] {
    return this.getContentTypeIdEntries<BlogCategory>(
      ContentfulContentType.CATEGORY
    );
  }

  /** ブログポストの月別記事一覧を取得する */
  public get blogPostArchives(): BlogPostArchive[] {
    return this.allBlogPosts.reduce<BlogPostArchive[]>((archives, entry) => {
      const date = dayjs(entry.sys.createdAt);
      const index = archives.findIndex(
        ({ year, month }) => year === date.year() && month === date.month()
      );

      if (index === -1) {
        archives.push({ year: date.year(), month: date.month(), count: 1 });
      } else {
        archives[index].count += 1;
      }

      return archives;
    }, []);
  }

  /**
   * すべての日記のポスト
   */
  public get allDiaryPosts(): Entry<DiaryPost>[] {
    return this.getContentTypeIdEntries<DiaryPost>(
      ContentfulContentType.DIARY_POST
    );
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
   * コンテンツタイプIDからエントリをすべて取得する
   * @param contentTypeId
   */
  getContentTypeIdEntries<T extends ContentfulEntry>(
    contentTypeId: ContentfulContentType
  ): Entry<T>[] {
    return this.entries.filter((entry): entry is Entry<T> => {
      return entry.sys.contentType.sys.id === contentTypeId;
    });
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
   * ブログポストの月ごとの一覧を取得する
   * @param year
   * @param month
   * @param skip
   * @param limit
   */
  getBlogPostArchives(
    year: number,
    month: number,
    skip = 0,
    limit = this.context.app.$C.BLOG_POST_PER_PAGE
  ): Entry<BlogPost>[] {
    return this.allBlogPosts
      .filter((entry) => {
        const date = dayjs(entry.sys.createdAt);

        return date.year() === year && date.month() === month;
      })
      .slice(skip * limit, skip * limit + limit);
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

  /**
   * 日記のポストの一覧を取得する
   * @param skip
   * @param limit
   */
  getDiaryPosts(skip = 0, limit = ENTRIES_PER_PAGE): Entry<DiaryPost>[] {
    return this.allDiaryPosts.slice(skip * limit, skip * limit + limit);
  }

  /**
   * IDから日記のポストを取得する
   * @param id
   */
  getDiaryPost(id: string): Entry<DiaryPost> | undefined {
    return this.allDiaryPosts.find((entry) => entry.sys.id === id);
  }
}

export default ContentfulPlugin;
